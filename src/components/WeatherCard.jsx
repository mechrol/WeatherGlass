import { motion } from 'framer-motion';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Zap, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye,
  Gauge
} from 'lucide-react';

const WeatherCard = ({ weatherData, loading }) => {
  if (loading) {
    return (
      <motion.div 
        className="glass-card p-8 text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        <p className="mt-4">Loading weather data...</p>
      </motion.div>
    );
  }

  if (!weatherData) return null;

  const { current } = weatherData;

  const getWeatherIcon = (condition) => {
    const iconProps = { size: 64, className: "animate-weather-float" };
    
    switch (condition) {
      case 'sunny':
        return <Sun {...iconProps} className="text-yellow-300 animate-weather-float" />;
      case 'cloudy':
        return <Cloud {...iconProps} className="text-gray-200 animate-weather-float" />;
      case 'rainy':
        return <CloudRain {...iconProps} className="text-blue-300 animate-weather-float" />;
      case 'stormy':
        return <Zap {...iconProps} className="text-purple-300 animate-weather-float" />;
      default:
        return <Sun {...iconProps} className="text-yellow-300 animate-weather-float" />;
    }
  };

  const weatherDetails = [
    { icon: Thermometer, label: 'Feels like', value: `${current.feelsLike}°C` },
    { icon: Droplets, label: 'Humidity', value: `${current.humidity}%` },
    { icon: Wind, label: 'Wind Speed', value: `${current.windSpeed} km/h` },
    { icon: Eye, label: 'Visibility', value: `${current.visibility} km` },
    { icon: Gauge, label: 'Pressure', value: `${current.pressure} hPa` },
    { icon: Sun, label: 'UV Index', value: current.uvIndex }
  ];

  return (
    <motion.div
      className="glass-card p-8 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-light mb-2">{current.location}</h2>
        <div className="flex items-center justify-center mb-4">
          {getWeatherIcon(current.condition)}
        </div>
        <motion.div 
          className="text-6xl font-thin mb-2 animate-temperature-pulse"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {current.temperature}°C
        </motion.div>
        <p className="text-xl opacity-80">{current.description}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {weatherDetails.map((detail, index) => (
          <motion.div
            key={detail.label}
            className="glass-card p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
          >
            <detail.icon className="w-6 h-6 mx-auto mb-2 opacity-80" />
            <p className="text-sm opacity-70">{detail.label}</p>
            <p className="font-semibold">{detail.value}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeatherCard;
