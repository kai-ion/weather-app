// Fetches the current weather and 5-day forecast for a given city.
function getWeather() {
    const apiKey = 'bf54835bcdf0503b1832f790dcd02711'; // input your api key
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

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
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = 'bf54835bcdf0503b1832f790dcd02711'; // input your api key
            const locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            fetch(locationUrl)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    alert('Error fetching weather data. Please try again.');
                });

            fetch(forecastUrl)
                .then(response => response.json())
                .then(data => {
                    displayHourlyForecast(data.list);
                })
                .catch(error => {
                    console.error('Error fetching hourly forecast data:', error);
                    alert('Error fetching hourly forecast data. Please try again.');
                });
        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        let iconCode = data.weather[0].icon;

        // Manually set icon for clear sky
        if (description.toLowerCase() === 'clear sky') {
            const currentHour = new Date().getHours();
            if (currentHour >= 6 && currentHour < 18) {
                iconCode = '01d'; // Daytime clear sky icon
            } else {
                iconCode = '01n'; // Nighttime clear sky icon
            }
        }

        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function getIconCode(item) {
    const currentHour = new Date(item.dt * 1000).getHours();
    if (currentHour >= 6 && currentHour <= 18) {
        return '01d'; // Daytime clear sky icon
    } else {
        return '01n'; // Nighttime clear sky icon
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Filter the data to get every 24-hour interval
    const twentyFourHourIntervals = hourlyData.filter((item, index) => index % 8 === 0);

    // Clear previous content
    hourlyForecastDiv.innerHTML = '';

    twentyFourHourIntervals.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const day = dateTime.toLocaleDateString('en-US', { weekday: 'long' }); // Get the day of the week
        const temperature = Math.round(item.main.temp - 273.15); // Convert from Kelvin to Celsius
        const description = item.weather[0].description;
        let iconCode = item.weather[0].icon;

        // Apply custom logic for clear sky
        if (description.toLowerCase() === 'clear sky') {
            iconCode = getIconCode(item);
        }

        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${day}</span>
                <img src="${iconUrl}" alt="Daily Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

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
