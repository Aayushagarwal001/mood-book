import { useWeather } from '../hooks/useWeather';
import './WeatherDisplay.css';

const WeatherDisplay = ({ coords }) => {
  const { weather, error, loading } = useWeather(coords);

  if (!coords) {
    return (
      <div className="weather-container weather-unavailable">
        Enable location services to view weather
      </div>
    );
  }

  if (loading) {
    return <div className="weather-container weather-loading">Loading weather...</div>;
  }

  if (error) {
    return <div className="weather-container weather-error">{error}</div>;
  }

  if (!weather) {
    return <div className="weather-container weather-unavailable">Weather data unavailable</div>;
  }

  return (
    <div className="weather-container">
      <div className="weather-info">
        <div className="weather-icon">
          {getWeatherIcon(weather.condition)}
        </div>
        <div className="weather-details">
          <div className="weather-temp">{weather.temp}°C</div>
          <div className="weather-description">{weather.description}</div>
        </div>
      </div>
    </div>
  );
};

// Helper function for weather icons
const getWeatherIcon = (condition) => {
  const iconMap = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Snow: '❄️',
    Thunderstorm: '⛈️',
    Drizzle: '🌦️',
    Mist: '🌫️',
    Fog: '🌁'
  };
  return iconMap[condition] || '🌤️';
};

export default WeatherDisplay;