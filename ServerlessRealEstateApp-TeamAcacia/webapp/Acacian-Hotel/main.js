        document.getElementById('price_min').addEventListener('input', function() {
            document.getElementById('price_min_value').textContent = this.value;
        });

        document.getElementById('price_max').addEventListener('input', function() {
            document.getElementById('price_max_value').textContent = this.value;
        });

        document.getElementById('searchForm').addEventListener('submit', async function(event) {
            event.preventDefault();

            // Show the loader
            document.getElementById('loader').style.display = 'block';

            const regionInput = document.getElementById('region_input').value;
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
                                let imageUrl = "";
                                let name = "";
                                let availability = "";
                                let price = "";
                                let reviews = "";
                                let rating = "";
                                let location = "";

                                if(hotel.propertyImage && hotel.propertyImage.image)
                                    imageUrl = hotel.propertyImage.image.url;
                                if(hotel.name)
                                    name = hotel.name;
                                if(hotel.availability)
                                    availability = hotel.availability.available ? 'Available' : 'Not Available';
                                if(hotel.price && hotel.price.lead)
                                    price = hotel.price.lead.formatted;
                                if(hotel.reviews){
                                    reviews = hotel.reviews.total;
                                    rating = hotel.reviews.score;
                                }
                                if(hotel.neighborhood)
                                    location = hotel.neighborhood.name;

                                html += `
                                    <h2>${name}</h2>
                                    <p>Availability: ${availability}</p>
                                    <img src="${imageUrl}" alt="Image of ${name}">
                                    <p>Price: ${price}</p>
                                    <p>Rating: ${rating} stars (${reviews} reviews)</p>
                                    <p>Location: ${location}</p>
                                `;
                            });
                            document.getElementById('hotelResults').innerHTML = html;
                        } else {
                            console.log('No properties found');
                        }
                        document.getElementById('loader').style.display = 'none';
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        document.getElementById('loader').style.display = 'none';
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('loader').style.display = 'none';
            }
        });
