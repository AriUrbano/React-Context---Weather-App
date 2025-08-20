// context/WeatherProvider.jsx
import React, { useState, useEffect } from 'react';
import WeatherContext from './WeatherContext';

const WeatherProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [hourlyData, setHourlyData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [citiesData, setCitiesData] = useState([]);
    const [unit, setUnit] = useState('celsius');
    const [loading, setLoading] = useState(true);
    
    // TU API KEY DE OPENWEATHERMAP - REEMPLAZA CON TU KEY
    const API_KEY = 'b10560f1d5c8427e8397a675ceba8314';
    
    const fetchCurrentWeather = async (city = 'Buenos Aires') => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
            );
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ciudad no encontrada');
            }
            
            const data = await response.json();
            
            const currentWeather = {
                location: data.name + ', ' + data.sys.country,
                dateTime: new Date().toLocaleString('es-AR', { 
                    weekday: 'long', 
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit', 
                    minute: '2-digit' 
                }),
                temperature: Math.round(data.main.temp),
                weatherStatus: data.weather[0].description,
                weatherIcon: getWeatherIcon(data.weather[0].icon),
                wind: Math.round(data.wind.speed * 3.6), // Convertir m/s a km/h
                humidity: data.main.humidity,
                feelsLike: Math.round(data.main.feels_like),
                high: Math.round(data.main.temp_max),
                low: Math.round(data.main.temp_min)
            };
            
            setWeatherData(currentWeather);
            await fetchHourlyForecast(data.coord.lat, data.coord.lon);
            await fetchDailyForecast(data.coord.lat, data.coord.lon);
            await fetchCitiesWeather();
            
        } catch (error) {
            console.error('Error fetching weather:', error);
            // Datos de ejemplo como fallback
            setWeatherData({
                location: 'Buenos Aires, AR',
                dateTime: new Date().toLocaleString('es-AR', { 
                    weekday: 'long', 
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit', 
                    minute: '2-digit' 
                }),
                temperature: 22,
                weatherStatus: 'Parcialmente nublado',
                weatherIcon: '⛅',
                wind: 15,
                humidity: 65,
                feelsLike: 24,
                high: 25,
                low: 18
            });
        } finally {
            setLoading(false);
        }
    };
    
    const fetchHourlyForecast = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
            );
            
            if (!response.ok) throw new Error('Error en pronóstico por horas');
            
            const data = await response.json();
            // Tomamos las próximas 8 pronósticos (24 horas)
            const hourlyForecast = data.list.slice(0, 8).map(item => ({
                time: new Date(item.dt * 1000).toLocaleTimeString('es-AR', { 
                    hour: '2-digit' 
                }),
                temp: Math.round(item.main.temp),
                icon: getWeatherIcon(item.weather[0].icon)
            }));
            
            setHourlyData(hourlyForecast);
        } catch (error) {
            console.error('Error fetching hourly forecast:', error);
            // Datos de ejemplo como fallback
            setHourlyData([
                { time: '11:00', temp: 23, icon: '☁️' },
                { time: '14:00', temp: 24, icon: '⛅' },
                { time: '17:00', temp: 23, icon: '⛅' },
                { time: '20:00', temp: 21, icon: '🌙' },
                { time: '23:00', temp: 19, icon: '🌙' },
                { time: '02:00', temp: 18, icon: '🌙' },
                { time: '05:00', temp: 17, icon: '🌙' },
                { time: '08:00', temp: 19, icon: '☁️' }
            ]);
        }
    };
    
    const fetchDailyForecast = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
            );
            
            if (!response.ok) throw new Error('Error en pronóstico diario');
            
            const data = await response.json();
            
            // Agrupar por día
            const dailyForecastMap = {};
            data.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const dayKey = date.toDateString();
                
                if (!dailyForecastMap[dayKey]) {
                    dailyForecastMap[dayKey] = {
                        date: date,
                        temps: [],
                        icons: [],
                        dayName: date.toLocaleDateString('es-AR', { weekday: 'long' })
                    };
                }
                
                dailyForecastMap[dayKey].temps.push(item.main.temp);
                dailyForecastMap[dayKey].icons.push(item.weather[0].icon);
            });
            
            // Convertir a array y tomar próximos 5 días
            const dailyForecast = Object.values(dailyForecastMap)
                .slice(1, 6) // Excluir hoy y tomar próximos 5 días
                .map(day => ({
                    day: day.dayName,
                    icon: getWeatherIcon(getMostFrequentIcon(day.icons)),
                    high: Math.round(Math.max(...day.temps)),
                    low: Math.round(Math.min(...day.temps))
                }));
            
            setDailyData(dailyForecast);
        } catch (error) {
            console.error('Error fetching daily forecast:', error);
            // Datos de ejemplo como fallback
            setDailyData([
                { day: 'martes', icon: '⛅', high: 26, low: 19 },
                { day: 'miércoles', icon: '☀️', high: 28, low: 21 },
                { day: 'jueves', icon: '☀️', high: 29, low: 22 },
                { day: 'viernes', icon: '⛅', high: 27, low: 20 },
                { day: 'sábado', icon: '🌧️', high: 24, low: 18 }
            ]);
        }
    };
    
    // Función auxiliar para obtener el ícono más frecuente
    const getMostFrequentIcon = (icons) => {
        const frequency = {};
        icons.forEach(icon => {
            frequency[icon] = (frequency[icon] || 0) + 1;
        });
        return Object.keys(frequency).reduce((a, b) => 
            frequency[a] > frequency[b] ? a : b
        );
    };
    
    const fetchCitiesWeather = async () => {
        const cities = [
            { name: 'London', country: 'UK' },
            { name: 'Tokyo', country: 'JP' },
            { name: 'Sydney', country: 'AU' }
        ];
        
        const citiesWeather = [];
        
        for (const city of cities) {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=${API_KEY}&units=metric&lang=es`
                );
                
                if (response.ok) {
                    const data = await response.json();
                    citiesWeather.push({
                        name: data.name,
                        temp: Math.round(data.main.temp),
                        icon: getWeatherIcon(data.weather[0].icon)
                    });
                } else {
                    // Si falla la API, usar dato fijo
                    citiesWeather.push({
                        name: city.name,
                        temp: city.name === 'London' ? 15 : city.name === 'Tokyo' ? 28 : 22,
                        icon: city.name === 'London' ? '🌧️' : city.name === 'Tokyo' ? '☀️' : '⛅'
                    });
                }
            } catch (error) {
                console.error(`Error fetching weather for ${city.name}:`, error);
                // Datos de ejemplo como fallback
                citiesWeather.push({
                    name: city.name,
                    temp: city.name === 'London' ? 15 : city.name === 'Tokyo' ? 28 : 22,
                    icon: city.name === 'London' ? '🌧️' : city.name === 'Tokyo' ? '☀️' : '⛅'
                });
            }
        }
        
        setCitiesData(citiesWeather);
    };
    
    const getWeatherIcon = (iconCode) => {
        const iconMap = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '⛅',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌦️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        
        return iconMap[iconCode] || '☀️';
    };
    
    // Cargar datos iniciales
    useEffect(() => {
        fetchCurrentWeather('Buenos Aires');
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
        fetchCurrentWeather(city);
    };
    
    return (
        <WeatherContext.Provider value={{
            weatherData, hourlyData, dailyData, citiesData,
            unit, loading, convertTemp, toggleUnit, searchCity
        }}>
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherProvider;