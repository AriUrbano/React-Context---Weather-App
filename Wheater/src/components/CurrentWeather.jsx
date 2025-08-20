// CurrentWeather.jsx
import React, { useContext } from 'react';
import { useWeather } from '../context/WeatherContext';import './CurrentWeather.css';

const CurrentWeather = () => {
    const { weatherData, convertTemp, loading } = useContext(WeatherContext);

    if (loading) {
        return <div className="clima-actual">Cargando...</div>;
    }

    if (!weatherData) {
        return <div className="clima-actual">No hay datos del clima</div>;
    }

    return (
        <div className="clima-actual">
            <h2 className="ubicacion">{weatherData.location}</h2>
            <p className="fecha-hora">{weatherData.dateTime}</p>
            
            <div className="clima-principal">
                <div className="temperatura">
                    {convertTemp(weatherData.temperature)}°
                </div>
                <div className="icono-clima">
                    {weatherData.weatherIcon}
                </div>
            </div>
            
            <div className="estado-clima">
                {weatherData.weatherStatus}
            </div>
        </div>
    );
};

export default CurrentWeather;