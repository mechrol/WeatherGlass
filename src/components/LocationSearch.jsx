import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X } from 'lucide-react';
import { searchCities } from '../utils/weatherAPI';

const LocationSearch = ({ onLocationSelect, currentLocation, onCurrentLocation }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchLocations = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const results = await searchCities(query);
        setSuggestions(results);
      } catch (error) {
        console.error('Search error:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchLocations, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleLocationSelect = (location) => {
    onLocationSelect(location);
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for a city..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <motion.button
            onClick={onCurrentLocation}
            className="glass-button flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MapPin className="w-5 h-5" />
            <span className="hidden sm:inline">Current Location</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (suggestions.length > 0 || loading) && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-2 glass-card p-2 z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {loading ? (
                <div className="p-4 text-center text-white/60">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white/60 mx-auto"></div>
                </div>
              ) : (
                <div className="space-y-1">
                  {suggestions.map((city, index) => (
                    <motion.button
                      key={city}
                      onClick={() => handleLocationSelect(city)}
                      className="w-full text-left p-3 rounded-lg text-white hover:bg-white/20 transition-colors duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-white/60" />
                        <span>{city}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center text-white/80 mb-6">
        <p className="text-lg">Current location: <span className="font-medium">{currentLocation}</span></p>
      </div>
    </motion.div>
  );
};

export default LocationSearch;
