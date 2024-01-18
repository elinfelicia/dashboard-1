// weatherAPI.js
import axios from 'axios';

export function fetchWeatherData(city, apiKey) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  return axios.get(apiUrl);
}

export function fetchWeatherForecast(city, apiKey) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  return axios.get(apiUrl);
}

export function comingDaysWeather(response) {
    const dailyData = response.data.list;
    const uniqueDays = [];
  
    dailyData.forEach(day => {
      const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
  
      if (!uniqueDays.find(uniqueDay => uniqueDay.date === date)) {
        uniqueDays.push({
          date,
          temperature: (day.main.temp - 273.15).toFixed(1),
          description: day.weather[0].description,
        });
      }
    });
  
    return uniqueDays.slice(0, 3);
  };

  
