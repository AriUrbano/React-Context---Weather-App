// components/WeatherDetails.jsx
import React from 'react';
import useWeather from '../hooks/useWeather';
import './WeatherDetails.css';

const WeatherDetails = () => {
    const { weatherData, convertTemp, loading } = useWeather();

    if (loading || !weatherData) return null;

    return (
        <div className="detalles-clima">
            <div className="item-detalle">
                <span className="etiqueta-detalle">Sensación térmica</span>
                <span className="valor-detalle">{convertTemp(weatherData.feelsLike)}°</span>
            </div>
            
            <div className="item-detalle">
                <span className="etiqueta-detalle">Viento</span>
                <span className="valor-detalle">{weatherData.wind} km/h</span>
            </div>
            
            <div className="item-detalle">
                <span className="etiqueta-detalle">Humedad</span>
                <span className="valor-detalle">{weatherData.humidity}%</span>
            </div>
            
            <div className="item-detalle">
                <span className="etiqueta-detalle">Máxima/Mínima</span>
                <span className="valor-detalle">
                    {convertTemp(weatherData.high)}° / {convertTemp(weatherData.low)}°
                </span>
            </div>
        </div>
    );
};

export default WeatherDetails;