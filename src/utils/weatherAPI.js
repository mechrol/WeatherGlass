import axios from 'axios';

// Mock weather data for demonstration
const mockWeatherData = {
  current: {
    location: 'New York, NY',
    temperature: 22,
    condition: 'sunny',
    description: 'Sunny',
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    uvIndex: 6,
    visibility: 10,
    feelsLike: 25
  },
  forecast: [
    { day: 'Today', high: 25, low: 18, condition: 'sunny', description: 'Sunny' },
    { day: 'Tomorrow', high: 23, low: 16, condition: 'cloudy', description: 'Partly Cloudy' },
    { day: 'Wednesday', high: 20, low: 14, condition: 'rainy', description: 'Light Rain' },
    { day: 'Thursday', high: 18, low: 12, condition: 'stormy', description: 'Thunderstorms' },
    { day: 'Friday', high: 24, low: 17, condition: 'cloudy', description: 'Cloudy' },
    { day: 'Saturday', high: 26, low: 19, condition: 'sunny', description: 'Sunny' },
    { day: 'Sunday', high: 28, low: 21, condition: 'sunny', description: 'Hot' }
  ],
  hourly: [
    { time: '12:00', temp: 22, condition: 'sunny' },
    { time: '13:00', temp: 24, condition: 'sunny' },
    { time: '14:00', temp: 25, condition: 'sunny' },
    { time: '15:00', temp: 24, condition: 'cloudy' },
    { time: '16:00', temp: 23, condition: 'cloudy' },
    { time: '17:00', temp: 21, condition: 'cloudy' }
  ]
};

const cities = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA'
];

export const fetchWeatherData = async (location = 'New York, NY') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data with location variation
  return {
    ...mockWeatherData,
    current: {
      ...mockWeatherData.current,
      location,
      temperature: Math.floor(Math.random() * 15) + 15, // 15-30°C
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 20) + 5 // 5-25 km/h
    }
  };
};

export const searchCities = async (query) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return cities.filter(city => 
    city.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};
