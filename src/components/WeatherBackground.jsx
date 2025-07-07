import { motion } from 'framer-motion';

const WeatherBackground = ({ condition = 'sunny' }) => {
  const getBackgroundClass = () => {
    switch (condition) {
      case 'sunny':
        return 'bg-sunny-gradient';
      case 'cloudy':
        return 'bg-cloudy-gradient';
      case 'rainy':
        return 'bg-rainy-gradient';
      case 'stormy':
        return 'bg-gray-800';
      default:
        return 'bg-sunny-gradient';
    }
  };

  const getParticles = () => {
    switch (condition) {
      case 'rainy':
        return Array.from({ length: 50 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-4 bg-blue-200 opacity-60"
            initial={{ y: -10, x: Math.random() * window.innerWidth }}
            animate={{ 
              y: window.innerHeight + 10,
              x: Math.random() * window.innerWidth - 50
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ));
      case 'stormy':
        return Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-6 bg-gray-300 opacity-80"
            initial={{ y: -10, x: Math.random() * window.innerWidth }}
            animate={{ 
              y: window.innerHeight + 10,
              x: Math.random() * window.innerWidth - 100
            }}
            transition={{
              duration: Math.random() * 1.5 + 0.5,
              repeat: Infinity,
              delay: Math.random() * 1
            }}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`fixed inset-0 ${getBackgroundClass()} transition-all duration-1000`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {getParticles()}
      <div className="absolute inset-0 bg-black/10" />
    </motion.div>
  );
};

export default WeatherBackground;
