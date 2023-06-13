window.onload = function() {
  var username = localStorage.getItem('username');
  var loginLink = document.getElementById('loginLink');

  if (username) {
    loginLink.href = 'logout.html';
    loginLink.innerHTML = '<i class="fa fa-user"></i><span>Logout (' + username + ')</span>';
  }
};

async function fetchHotelDetails(hotelId) {
  console.log('Fetching details for hotel with id', hotelId);

  // Your API endpoint for fetching hotel details
  let url = `https://hotels-com-provider.p.rapidapi.com/v2/hotels/details?domain=US&locale=en_US&hotel_id=${hotelId}`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '38a52d2bb5mshcb854e4ae55afa0p105556jsnd2fbc6d4e74e      ',
      'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const hotelDetails = await response.json();

    console.log('Hotel details:', hotelDetails);

    const name = hotelDetails.summary.name || '';
    const description = hotelDetails.summary.overview.description || '';
    const rating = hotelDetails.summary.starRatingIcon ? generateStars(hotelDetails.summary.starRatingIcon) : 'No ratings';
    const location = hotelDetails.location && hotelDetails.location.address ? hotelDetails.location.address : '';

    const images = hotelDetails.propertyGallery.images.map(image => image.image.url);

    console.log('Name:', name);
    console.log('Description:', description);
    console.log('Rating:', rating);
    console.log('Location:', location);
    console.log('Images:', images);

    // Create HTML elements to display the hotel details
    const hotelContainer = document.getElementById('hotel-container');

    // Hotel Name
    const nameElement = document.createElement('h1');
    nameElement.textContent = name;
    hotelContainer.appendChild(nameElement);

    // Hotel Description
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    hotelContainer.appendChild(descriptionElement);

    // Hotel Rating
    const ratingElement = document.createElement('p');
    ratingElement.textContent = `Rating: ${rating}`;
    hotelContainer.appendChild(ratingElement);

    // Hotel Location
    const locationElement = document.createElement('p');
    locationElement.textContent = `Location: ${location}`;
    hotelContainer.appendChild(locationElement);

    // Hotel Images
    const imagesContainer = document.createElement('div');
    imagesContainer.setAttribute('class', 'image-container');

    images.forEach(imageUrl => {
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imagesContainer.appendChild(imageElement);
    });

    hotelContainer.appendChild(imagesContainer);

  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

function generateStars(rating, reviews) {
  let stars = '';
  for (let i = 0; i < Math.floor(rating); i++) {
    stars += '⭐';
  }
  if (rating % 1 !== 0) { // add a half star if rating is a decimal
    stars += '⭐';
  }
  return stars;
}

function toggleLoader(show) {
  const loader = document.getElementById('loader');
  loader.style.display = show ? 'block' : 'none';
}

async function searchAvailability(event) {
  event.preventDefault();

  // Show the loader
  toggleLoader(true);
  
    const regionInput = document.getElementById('location').value;
  
    const regionUrl = `https://hotels-com-provider.p.rapidapi.com/v2/regions?locale=en_US&query=${encodeURIComponent(regionInput)}&domain=US`;
    const regionOptions = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '38a52d2bb5mshcb854e4ae55afa0p105556jsnd2fbc6d4e74e        ',
        'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
      }
    };
  
    try {
      const regionResponse = await fetch(regionUrl, regionOptions);
      const regionData = await regionResponse.json();
      let gaiaId = null;
      if (regionData.data && regionData.data.length > 0) {
        const cityRegion = regionData.data.find(result => result.type === 'CITY');
        gaiaId = cityRegion ? cityRegion.gaiaId : null;
      }
  
      if (gaiaId) {
        let url = 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/search';
        let params = {
          domain: 'US',
          sort_order: document.getElementById('sort_order').value,
          locale: 'en_US',
          checkin_date: document.getElementById('checkin_date').value,
          checkout_date: document.getElementById('checkout_date').value,
          region_id: gaiaId,
          adults_number: document.getElementById('adults_number').value,
          guest_rating_min: document.getElementById('guest_rating_min').value,
          price_min: document.getElementById('price_min').value,
          price_max: document.getElementById('price_max').value
        };
  
        url += '?' + new URLSearchParams(params);
  
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '38a52d2bb5mshcb854e4ae55afa0p105556jsnd2fbc6d4e74e            ',
            'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
          }
        };
  
        fetch(url, options)
        .then(response => {
          if (!response.ok) {
            console.log('Error status:', response.status);
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.properties) {
            let html = "";
            data.properties.forEach(hotel => {
              let imageUrl = hotel.propertyImage && hotel.propertyImage.image && hotel.propertyImage.image.url ? hotel.propertyImage.image.url : "";
              let name = hotel.name || "";
              let availability = hotel.availability ? (hotel.availability.available ? 'Available' : 'Not Available') : "Unknown";
              let price = hotel.price ? (hotel.price.lead ? hotel.price.lead.formatted : "") : "";
              let reviews = hotel.reviews ? hotel.reviews.total : "";
              let rating = hotel.reviews ? generateStars(hotel.reviews.score, hotel.reviews.total) : "No ratings";
              let location = hotel.neighborhood ? hotel.neighborhood.name : "";
    
              html += `
              <div class="hotel-box" onclick="fetchHotelDetails(${hotel.id})">
                <div class="hotel-image">
                  <img src="${imageUrl}" alt="Image of ${name}" onerror="this.style.display='none'">
                </div>
                <div class="hotel-details">
                  <div class="hotel-name-location">
                    <h2>${name}</h2>
                    <p class="hotel-location">${location}</p>
                  </div>
                  <div class="hotel-availability-rating">
                    <p class="hotel-availability">${availability}</p>
                    <p class="hotel-rating">Rating: ${rating} (${reviews} reviews)</p>
                  </div>
                </div>
                <div class="hotel-price">
                  <p>Price: ${price}</p>
                </div>
              </div>
              `;
            });
            document.getElementById('hotel-container').innerHTML = html;
          } else {
            console.log('No properties found');
          }
          // Hide the loader
          toggleLoader(false);
        })
        .catch(error => {
          console.error('Error:', error);
          // Hide the loader
          toggleLoader(false);
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // Hide the loader
      toggleLoader(false);
    }
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('price_min').addEventListener('input', function () {
      document.getElementById('price_min_value').textContent = '';
    });
  
    document.getElementById('price_max').addEventListener('input', function () {
      document.getElementById('price_max_value').textContent = '';
    });
  
    document.getElementById('searchForm').addEventListener('submit', (event) => searchAvailability(event));
  
    function adjustFontSize() {
      const containers = document.querySelectorAll('.hotel-box');
      containers.forEach(container => {
        const fontSize = parseInt(window.getComputedStyle(container, null).getPropertyValue('height')) / 20; // Adjust the denominator as needed
        const textElements = container.querySelectorAll('.dynamic-font-size');
        textElements.forEach(el => {
          el.style.fontSize = `${fontSize}px`;
        });
      });
    }
    adjustFontSize();
    
    // Hide the loader
    toggleLoader(false);
  });
  
  // Slideshow functionality
  let slideIndex = 0;
  showSlides();

  function showSlides() {
    const slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].classList.add("active");
    setTimeout(showSlides, 7000); // Change slide every 7 seconds
  }