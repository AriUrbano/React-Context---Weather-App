// HourlyForecast.jsx
import React, { useContext } from 'react';
import { useWeather } from '../context/WeatherContext';import './HourlyForecast.css';

const HourlyForecast = () => {
    const { hourlyData, convertTemp, loading } = useContext(WeatherContext);

    if (loading) {
        return (
            <div className="pronostico-horas">
                <h3 className="titulo-seccion">Próximas 24 horas</h3>
                <div>Cargando...</div>
            </div>
        );
    }

    return (
        <div className="pronostico-horas">
            <h3 className="titulo-seccion">Próximas 24 horas</h3>
            
            <div className="contenedor-horas">
                {hourlyData.map((hour, index) => (
                    <div key={index} className="item-hora">
                        <span className="hora">{hour.time}</span>
                        <div className="icono-hora">{hour.icon}</div>
                        <span className="temp-hora">{convertTemp(hour.temp)}°</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast;