import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain } from 'lucide-react';

const HourlyForecast = ({ hourlyData = [] }) => {
  const getWeatherIcon = (condition) => {
    const iconProps = { size: 20 };
    
    switch (condition) {
      case 'sunny':
        return <Sun {...iconProps} className="text-yellow-300" />;
      case 'cloudy':
        return <Cloud {...iconProps} className="text-gray-300" />;
      case 'rainy':
        return <CloudRain {...iconProps} className="text-blue-300" />;
      default:
        return <Sun {...iconProps} className="text-yellow-300" />;
    }
  };

  return (
    <motion.div
      className="glass-card p-6 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-xl font-light mb-6">Hourly Forecast</h3>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {hourlyData.map((hour, index) => (
          <motion.div
            key={hour.time}
            className="flex-shrink-0 glass-card p-4 text-center min-w-[80px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <p className="text-sm opacity-70 mb-2">{hour.time}</p>
            <div className="flex justify-center mb-2">
              {getWeatherIcon(hour.condition)}
            </div>
            <p className="font-semibold">{hour.temp}°</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HourlyForecast;
