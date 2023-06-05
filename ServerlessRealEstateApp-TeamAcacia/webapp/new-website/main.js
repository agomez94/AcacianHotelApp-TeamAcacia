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
        'X-RapidAPI-Key': '25ca8ed5e4msh28988a8a8c552bdp14fabdjsna8ad7cab82bc',
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
            'X-RapidAPI-Key': '25ca8ed5e4msh28988a8a8c552bdp14fabdjsna8ad7cab82bc',
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
                  <h2>${name}</h2>
                  <p>Availability: ${availability}</p>
                  <img src="${imageUrl}" alt="Image of ${name}" onerror="this.style.display='none'">
                  <p>Price: ${price}</p>
                  <p>Rating: ${rating} (${reviews} reviews)</p>
                  <p>Location: ${location}</p>
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
  
