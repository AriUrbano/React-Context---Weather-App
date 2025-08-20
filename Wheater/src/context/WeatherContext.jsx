// context/WeatherContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto
export const WeatherContext = createContext();

// Hook personalizado para usar el contexto
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather debe usarse dentro de un WeatherProvider');
  }
  return context;
};

// Proveedor del contexto
export const WeatherProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [hourlyData, setHourlyData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [citiesData, setCitiesData] = useState([]);
    const [unit, setUnit] = useState('celsius');
    const [loading, setLoading] = useState(true);
    // Eliminamos setError ya que no se usa
    const [error] = useState(null);
    
    // Datos de ejemplo (en una app real, esto vendría de una API)
    const mockData = {
        current: {
            location: 'Nueva York',
            dateTime: 'Lunes, 10:00 AM',
            temperature: 22,
            weatherStatus: 'Nublado',
            weatherIcon: '☁️',
            wind: 12,
            humidity: 65,
            feelsLike: 24,
            high: 25,
            low: 18
        },
        hourly: [
            { time: '11 AM', temp: 23, icon: '☁️' },
            { time: '2 PM', temp: 24, icon: '⛅' },
            { time: '5 PM', temp: 23, icon: '⛅' },
            { time: '8 PM', temp: 21, icon: '🌙' },
            { time: '11 PM', temp: 19, icon: '🌙' },
            { time: '2 AM', temp: 18, icon: '🌙' },
            { time: '5 AM', temp: 17, icon: '🌙' },
            { time: '8 AM', temp: 19, icon: '☁️' }
        ],
        daily: [
            { day: 'Martes', icon: '⛅', high: 26, low: 19 },
            { day: 'Miércoles', icon: '☀️', high: 28, low: 21 },
            { day: 'Jueves', icon: '☀️', high: 29, low: 22 },
            { day: 'Viernes', icon: '⛅', high: 27, low: 20 },
            { day: 'Sábado', icon: '🌧️', high: 24, low: 18 }
        ],
        cities: [
            { name: 'Londres', temp: 15, icon: '🌧️' },
            { name: 'Tokio', temp: 28, icon: '☀️' },
            { name: 'Sídney', temp: 22, icon: '⛅' }
        ]
    };
    
    useEffect(() => {
        // Simular llamada a API
        setTimeout(() => {
            setWeatherData(mockData.current);
            setHourlyData(mockData.hourly);
            setDailyData(mockData.daily);
            setCitiesData(mockData.cities);
            setLoading(false);
        }, 1000);
    }, []);
    
    const convertTemp = (temp) => {
        if (unit === 'fahrenheit') {
            return Math.round((temp * 9/5) + 32);
        }
        return temp;
    };
    
    const toggleUnit = () => {
        setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
    };
    
    const searchCity = (city) => {
        setLoading(true);
        // En una app real, esto sería una llamada a API
        setTimeout(() => {
            const newData = {...mockData.current, location: city};
            setWeatherData(newData);
            setLoading(false);
        }, 1000);
    };
    
    return (
        <WeatherContext.Provider value={{
            weatherData, hourlyData, dailyData, citiesData,
            unit, loading, error, convertTemp, toggleUnit, searchCity
        }}>
            {children}
        </WeatherContext.Provider>
    );
};