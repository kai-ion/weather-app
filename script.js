// Fetches the current weather and 5-day forecast for a given city.
function getWeather() {
    const apiKey = 'bf54835bcdf0503b1832f790dcd02711'; // input your api key
    const city = document.getElementById('city').value;

    if (!isValidCity(city)) {
        alert('Please enter a valid city name');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;



    // Validate if the city exists
    validateCity(city)
        .then(isValid => {
            if (isValid) {
                const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

                // Fetch current weather data
                 // JSON data from current weather API:
                // data.name: City name
                // data.main.temp: Current temperature in Kelvin
                // data.weather[0].description: Weather description (e.g., clear sky, rain)
                // data.weather[0].icon: Weather icon code
                fetch(currentWeatherUrl)
                    .then(response => response.json())
                    .then(data => {
                        displayWeather(data);
                    })
                    .catch(error => {
                        console.error('Error fetching current weather data:', error);
                        alert('Error fetching current weather data. Please try again.');
                    });
                // Fetch 5-day forecast data
                // JSON data from forecast API:
                // data.list: Array of hourly forecast data
                // Each item contains:
                // item.dt: Timestamp for the forecast
                // item.main.temp: Temperature in Kelvin
                // item.weather[0].description: Weather description
                // item.weather[0].icon: Weather icon code
                
                fetch(forecastUrl)
                    .then(response => response.json())
                    .then(data => {
                        displayHourlyForecast(data.list);
                    })
                    .catch(error => {
                        console.error('Error fetching hourly forecast data:', error);
                        alert('Error fetching hourly forecast data. Please try again.');
                    });
            } else {
                alert('The entered city is not valid. Please enter a valid city name.');
            }

            // Clear the input field after processing
            clearInputField();
        })
        .catch(error => {
            console.error('Error validating city:', error);
            alert('Error validating city. Please try again.');
        });
}

// Retrieves the user's current location and fetches weather and forecast data based on that location.
function getUserLocation() {
    if (navigator.geolocation) {
        // Request the user's current position
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = 'bf54835bcdf0503b1832f790dcd02711'; // Input your API key here
            const locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            // Fetch the current weather data
            fetch(locationUrl)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data); // Display the weather data
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    alert('Error fetching weather data. Please try again.'); // Show an alert if an error occurs
                });

            // Fetch the hourly forecast data
            fetch(forecastUrl)
                .then(response => response.json())
                .then(data => {
                    displayHourlyForecast(data.list); // Display the hourly forecast data
                })
                .catch(error => {
                    console.error('Error fetching hourly forecast data:', error);
                    alert('Error fetching hourly forecast data. Please try again.'); // Show an alert if an error occurs
                });
        }, () => {
            alert('Unable to retrieve your location.'); // Show an alert if location retrieval fails
        });
    } else {
        alert('Geolocation is not supported by this browser.'); // Show an alert if geolocation is not supported
    }
}


// Validates the city input to ensure it's not empty and meets basic criteria.
function isValidCity(city) {
    // Basic validation: check if the city input is not empty and is a valid string.
    return city && city.trim().length > 0;
}

// Validates the city by making an API call to check if it exists.
function validateCity(city) {
    const apiKey = 'bf54835bcdf0503b1832f790dcd02711'; // Your API key
    const validationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    return fetch(validationUrl)
        .then(response => response.json())
        .then(data => {
            return data.cod === 200; // If the response code is 200, the city is valid
        })
        .catch(() => {
            return false; // If there's an error, assume the city is not valid
        });
}

// Clears the input field after the weather data has been processed.
function clearInputField() {
    document.getElementById('city').value = '';
}

// Updates the weather display section with current weather data in Fahrenheit and an appropriate icon.
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content from the weather and forecast sections
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        // Display error message if city is not found
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        // Extract and convert weather data
        const cityName = data.name;
        const temperature = Math.round((data.main.temp - 273.15) * 9/5 + 32); // Convert from Kelvin to Fahrenheit
        const description = data.weather[0].description;
        let iconCode = data.weather[0].icon;

        // Manually set icon for 'clear sky' based on time of day
        if (description.toLowerCase() === 'clear sky') {
            const currentHour = new Date().getHours();
            iconCode = (currentHour >= 6 && currentHour < 18) ? '01d' : '01n'; // Day or night clear sky icon
        }

        // Construct the URL for the weather icon
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        // Create HTML content for temperature and weather description
        const temperatureHTML = `
            <p>${temperature}°F</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        // Update the weather display section with new data
        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        // Show the weather icon
        showImage();
    }
}

// Returns the appropriate icon code based on the time of day for clear sky conditions.
function getIconCode(item) {
    const currentHour = new Date(item.dt * 1000).getHours();
    // Return the icon code for daytime or nighttime clear sky
    return (currentHour >= 6 && currentHour <= 18) ? '01d' : '01n';
}


// Updates the hourly weather forecast section by displaying weather data for every 24-hour interval in Fahrenheit.
function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Filter the data to get weather information for approximately every 24-hour interval
    // (roughly every 8 data points)
    const twentyFourHourIntervals = hourlyData.filter((item, index) => index % 8 === 0);

    // Clear previous content from the hourly forecast section
    hourlyForecastDiv.innerHTML = '';

    // Iterate over the filtered hourly data to generate and display forecast items
    twentyFourHourIntervals.forEach(item => {
        // Convert the timestamp to milliseconds and create a Date object
        const dateTime = new Date(item.dt * 1000);
        // Get the day of the week from the Date object
        const day = dateTime.toLocaleDateString('en-US', { weekday: 'long' });
        // Convert temperature from Kelvin to Fahrenheit
        const temperature = Math.round((item.main.temp - 273.15) * 9/5 + 32);
        // Get weather description and icon code
        const description = item.weather[0].description;
        let iconCode = item.weather[0].icon;

        // Apply custom logic for clear sky conditions
        if (description.toLowerCase() === 'clear sky') {
            iconCode = getIconCode(item);
        }

        // Construct the URL for the weather icon
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        // Create HTML for the hourly forecast item
        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${day}</span>
                <img src="${iconUrl}" alt="Daily Weather Icon">
                <span>${temperature}°F</span>
            </div>
        `;

        // Add the hourly forecast item to the hourly forecast section
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}



function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}

function showInfo() {
    const infoDiv = document.getElementById('info');
    infoDiv.style.display = infoDiv.style.display === 'none' ? 'block' : 'none';
}
/*
*    *
*  *
* *
* *
*  *
*    *
*/