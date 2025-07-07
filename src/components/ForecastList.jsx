import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, Zap } from 'lucide-react';

const ForecastList = ({ forecast = [] }) => {
  const getWeatherIcon = (condition) => {
    const iconProps = { size: 24 };
    
    switch (condition) {
      case 'sunny':
        return <Sun {...iconProps} className="text-yellow-300" />;
      case 'cloudy':
        return <Cloud {...iconProps} className="text-gray-300" />;
      case 'rainy':
        return <CloudRain {...iconProps} className="text-blue-300" />;
      case 'stormy':
        return <Zap {...iconProps} className="text-purple-300" />;
      default:
        return <Sun {...iconProps} className="text-yellow-300" />;
    }
  };

  return (
    <motion.div
      className="glass-card p-6 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-xl font-light mb-6">7-Day Forecast</h3>
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <motion.div
            key={day.day}
            className="flex items-center justify-between p-4 glass-card hover:bg-white/20 transition-all duration-300"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ scale: 1.02, x: 5 }}
          >
            <div className="flex items-center space-x-4">
              {getWeatherIcon(day.condition)}
              <div>
                <p className="font-medium">{day.day}</p>
                <p className="text-sm opacity-70">{day.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{day.high}°</p>
              <p className="text-sm opacity-70">{day.low}°</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ForecastList;
