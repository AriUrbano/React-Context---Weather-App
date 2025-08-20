// CitiesWeather.jsx
import React, { useContext } from 'react';
import { useWeather } from '../context/WeatherContext';import './CitiesWeather.css';

const CitiesWeather = () => {
    const { citiesData, convertTemp, loading, searchCity } = useContext(WeatherContext);

    const handleCityClick = (cityName) => {
        searchCity(cityName);
    };

    if (loading) {
        return (
            <div className="ciudades-clima">
                <h3 className="titulo-seccion">Otras Ciudades</h3>
                <div>Cargando...</div>
            </div>
        );
    }

    return (
        <div className="ciudades-clima">
            <h3 className="titulo-seccion">Otras Ciudades</h3>
            
            {citiesData.map((city, index) => (
                <div 
                    key={index} 
                    className="tarjeta-ciudad"
                    onClick={() => handleCityClick(city.name)}
                >
                    <h4 className="nombre-ciudad">{city.name}</h4>
                    <div className="clima-principal-ciudad">
                        <span className="temp-ciudad">{convertTemp(city.temp)}°</span>
                        <div className="icono-ciudad">{city.icon}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CitiesWeather;