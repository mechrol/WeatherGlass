/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        weather: {
          sunny: '#FFD700',
          cloudy: '#87CEEB',
          rainy: '#4682B4',
          stormy: '#696969'
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'sunny-gradient': 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        'cloudy-gradient': 'linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)',
        'rainy-gradient': 'linear-gradient(135deg, #4682B4 0%, #2F4F4F 100%)',
        'night-gradient': 'linear-gradient(135deg, #191970 0%, #000080 100%)'
      },
      backdropBlur: {
        xs: '2px'
      },
      animation: {
        'weather-float': 'weatherFloat 3s ease-in-out infinite',
        'temperature-pulse': 'temperaturePulse 2s ease-in-out infinite',
        'forecast-slide': 'forecastSlide 0.5s ease-out'
      },
      keyframes: {
        weatherFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        temperaturePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        forecastSlide: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      }
    },
  },
  plugins: [],
}
