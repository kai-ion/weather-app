

# Weather App

A simple weather application that allows users to search for weather updates by city or use their current location to fetch real-time weather data. The app also displays a 5-day weather forecast.

Sure, here's the updated section with the live demo link:

---

## Live Demo

You can view the live demo of the Weather App [here](https://kai-ion.github.io/weather-app/).


## Features

- Search weather by city name.
- Use geolocation to get the current weather and forecast based on your location.
- Displays current weather conditions, temperature (in Fahrenheit), and a weather icon.
- 5-day weather forecast with temperature and weather icons.
- Simple and user-friendly interface.

## Technologies Used

- **HTML5**: For structuring the web page.
- **CSS3**: For styling the app and making it responsive.
- **JavaScript**: For fetching weather data and interacting with the OpenWeatherMap API.
- **OpenWeatherMap API**: Used to fetch real-time weather data and forecasts.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/kai-ion/weather-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weather-app
   ```

3. Open `index.html` in a web browser to use the app:

   ```bash
   open index.html
   ```

## Usage

1. **Search by City**: Enter the name of a city in the search bar and click "Search" to fetch the current weather and a 5-day forecast.
2. **Use My Location**: Click the "Use My Location" button to automatically get weather updates for your current location.
3. **Weather Information**: The app displays the temperature (in Fahrenheit), a weather icon, and a brief description of the weather.
4. **5-Day Forecast**: View the hourly forecast for every 24-hour interval over the next five days.
5. **Info Button**: Click "Info" to see more details about the app.

## API Reference

- The app uses the **OpenWeatherMap API** for weather data. You will need an API key from OpenWeatherMap to run the app.
- Get your API key from [OpenWeatherMap](https://openweathermap.org/).
- Update the `apiKey` variable in `script.js` with your API key.

  ```javascript
  const apiKey = 'your_api_key_here'; // Replace with your OpenWeatherMap API key
  ```

Here’s how you can describe the two API calls in the README, along with an explanation of the JSON responses you receive from each.

### API Calls

1. **Current Weather Data by City**

   **URL Format:**

   ```bash
   https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}
   ```

   - **Description**: This API call fetches the current weather data for a specified city.
   - **Parameters**:
     - `q`: The name of the city you want to get the weather for.
     - `appid`: Your API key from OpenWeatherMap.
   - **Example**:
     ```bash
     https://api.openweathermap.org/data/2.5/weather?q=London&appid=your_api_key
     ```

   **JSON Response Example:**

   ```json
   {
     "coord": { "lon": -0.1257, "lat": 51.5085 },
     "weather": [
       { "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }
     ],
     "main": {
       "temp": 289.15,
       "feels_like": 287.04,
       "temp_min": 288.71,
       "temp_max": 289.82,
       "pressure": 1013,
       "humidity": 76
     },
     "name": "London"
   }
   ```

   **Response Breakdown**:
   - `coord`: Contains the longitude and latitude of the city.
   - `weather`: Contains an array with details about the weather conditions, including an icon for display.
   - `main`: Contains key weather data such as temperature (`temp`), humidity, and pressure.
     - `temp`: Temperature in Kelvin, which can be converted to Celsius or Fahrenheit.
   - `name`: The name of the city.

---

2. **5-Day Forecast Data by City**

   **URL Format:**

   ```bash
   https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={apiKey}
   ```

   - **Description**: This API call fetches weather forecasts in 3-hour intervals over 5 days for a specified city.
   - **Parameters**:
     - `q`: The city name you want the forecast for.
     - `appid`: Your OpenWeatherMap API key.
   - **Example**:
     ```bash
     https://api.openweathermap.org/data/2.5/forecast?q=London&appid=your_api_key
     ```

   **JSON Response Example:**

   ```json
   {
     "list": [
       {
         "dt": 1632744000,
         "main": {
           "temp": 288.85,
           "feels_like": 288.14,
           "temp_min": 288.85,
           "temp_max": 289.36,
           "pressure": 1016,
           "humidity": 83
         },
         "weather": [
           { "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }
         ],
         "dt_txt": "2021-09-27 12:00:00"
       },
       {
         "dt": 1632754800,
         "main": {
           "temp": 289.15,
           "feels_like": 288.61,
           "temp_min": 289.15,
           "temp_max": 289.61,
           "pressure": 1016,
           "humidity": 82
         },
         "weather": [
           { "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02d" }
         ],
         "dt_txt": "2021-09-27 15:00:00"
       }
     ]
   }
   ```

   **Response Breakdown**:
   - `list`: Contains an array of forecast data for every 3 hours.
     - `dt`: The timestamp of the forecast (in Unix format).
     - `main`: Weather details for the given time, including temperature, pressure, and humidity.
       - `temp`: Temperature in Kelvin.
     - `weather`: Weather conditions such as "Rain" or "Clear", along with an icon for display.
     - `dt_txt`: The date and time of the forecast in human-readable format.

---

### Summary

- The **current weather API** returns data about the weather in real-time for the given city, including temperature, weather description, and a weather icon.
- The **5-day forecast API** provides detailed forecast data for every 3-hour interval, including the temperature and weather conditions, over the next 5 days.

## Contributing

If you'd like to contribute to this project, feel free to submit a pull request. For significant changes, please open an issue first to discuss what you'd like to change.

## License

This project is licensed under the MIT License.

---
