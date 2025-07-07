import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WeatherBackground from './components/WeatherBackground';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import LocationSearch from './components/LocationSearch';
import HourlyForecast from './components/HourlyForecast';
import { useWeather } from './hooks/useWeather';

function App() {
  const { 
    weatherData, 
    loading, 
    error, 
    currentLocation, 
    loadWeatherData, 
    loadCurrentLocationWeather 
  } = useWeather();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLocationSelect = (location) => {
    loadWeatherData(location);
  };

  const handleCurrentLocation = () => {
    loadCurrentLocationWeather();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-red-500 flex items-center justify-center">
        <div className="glass-card p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="glass-button mt-4"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <WeatherBackground condition={weatherData?.current?.condition} />
      
      <div className="relative z-10 min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.header 
            className="text-center text-white mb-8 pt-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-thin mb-4">
              Weather<span className="font-light">Glass</span>
            </h1>
            <p className="text-lg opacity-80">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-sm opacity-60">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}
            </p>
          </motion.header>

          {/* Search */}
          <LocationSearch
            onLocationSelect={handleLocationSelect}
            currentLocation={currentLocation}
            onCurrentLocation={handleCurrentLocation}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weather Card */}
            <div className="lg:col-span-2">
              <WeatherCard weatherData={weatherData} loading={loading} />
              
              {weatherData && (
                <div className="mt-8">
                  <HourlyForecast hourlyData={weatherData.hourly} />
                </div>
              )}
            </div>

            {/* Forecast */}
            <div>
              {weatherData && (
                <ForecastList forecast={weatherData.forecast} />
              )}
            </div>
          </div>

          {/* Footer */}
          <motion.footer 
            className="text-center text-white/60 mt-16 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-sm">
              Built with React, Framer Motion & Glassmorphism Design
            </p>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}

export default App;
