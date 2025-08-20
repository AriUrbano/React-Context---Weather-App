// hooks/useWeather.js
import { useContext } from 'react';
import WeatherContext from '../context/WeatherContext';

const useWeather = () => {
  const context = useContext(WeatherContext);
  
  if (!context) {
    throw new Error('useWeather debe usarse dentro de un WeatherProvider');
  }
  
  return context;
};

export default useWeather;