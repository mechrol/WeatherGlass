import { useState, useEffect } from 'react';
import { fetchWeatherData, getCurrentLocation } from '../utils/weatherAPI';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState('New York, NY');

  const loadWeatherData = async (location) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      setCurrentLocation(location);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentLocationWeather = async () => {
    try {
      const coords = await getCurrentLocation();
      // In a real app, you'd reverse geocode these coordinates
      await loadWeatherData('Current Location');
    } catch (err) {
      // Fallback to default location
      await loadWeatherData('New York, NY');
    }
  };

  useEffect(() => {
    loadWeatherData(currentLocation);
  }, []);

  return {
    weatherData,
    loading,
    error,
    currentLocation,
    loadWeatherData,
    loadCurrentLocationWeather
  };
};
