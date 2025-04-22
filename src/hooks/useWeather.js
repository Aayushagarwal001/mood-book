// src/hooks/useWeather.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Get from https://openweathermap.org/

export const useWeather = (coords) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!coords) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${API_KEY}`
        );
        setWeather({
          temp: Math.round(response.data.main.temp),
          condition: response.data.weather[0].main,
          icon: response.data.weather[0].icon,
          description: response.data.weather[0].description
        });
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coords]);

  return { weather, error, loading };
};