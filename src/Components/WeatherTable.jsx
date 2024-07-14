


import React, { useState, useEffect } from 'react';
import './WeatherTable.css'; // Import your custom CSS if needed

const WeatherTable = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual API key and 'kolkata' with the location you want
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=basanti&appid=d07ad1b762cffb2aa05d9fbbd01c3d89`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data); // Store the weather data
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }, [location]);

  return (
    <>
    <div className="weather-table-container">
      <h2>Weather Details of Sundarban</h2>
      {weatherData ? (
        <table>
          <thead>
            <tr>
              <th>Temperature (°C)</th>
              <th>Humidity (%)</th>
              <th>Wind Speed (km/h)</th>
              {/* Add more columns for other weather details */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{weatherData.main.temp}</td>
              <td>{weatherData.main.humidity}</td>
              <td>{weatherData.wind.speed}</td>
              {/* Add more cells for other weather details */}
            </tr>
          </tbody>
        </table>
        
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
    
    </>
  );
};

export default WeatherTable;
