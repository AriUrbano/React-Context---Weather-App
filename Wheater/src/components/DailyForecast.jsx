// DailyForecast.jsx
import React, { useContext } from 'react';
import { useWeather } from '../context/WeatherContext';import './DailyForecast.css';

const DailyForecast = () => {
    const { dailyData, convertTemp, loading } = useContext(WeatherContext);

    if (loading) {
        return (
            <div className="pronostico-diario">
                <h3 className="titulo-seccion">Próximos 5 días</h3>
                <div>Cargando...</div>
            </div>
        );
    }

    return (
        <div className="pronostico-diario">
            <h3 className="titulo-seccion">Próximos 5 días</h3>
            
            <div className="contenedor-dias">
                {dailyData.map((day, index) => (
                    <div key={index} className="item-dia">
                        <span className="dia">{day.day}</span>
                        <div className="icono-dia">{day.icon}</div>
                        <div className="temps-dia">
                            <span className="maxima-dia">{convertTemp(day.high)}°</span>
                            <span className="minima-dia">{convertTemp(day.low)}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyForecast;