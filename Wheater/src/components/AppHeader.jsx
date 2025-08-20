// components/AppHeader.jsx
import React, { useState } from 'react';
import useWeather from '../hooks/useWeather';
import './AppHeader.css';

const AppHeader = () => {
    const { unit, toggleUnit, searchCity } = useWeather();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            searchCity(searchQuery);
            setSearchQuery('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <header className="app-encabezado">
            <h1 className="app-titulo">Clima App</h1>
            
            <div className="contenedor-busqueda">
                <input
                    type="text"
                    className="entrada-busqueda"
                    placeholder="Buscar ciudad..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className="boton-busqueda" onClick={handleSearch}>
                    Buscar
                </button>
            </div>
            
            <div className="selector-unidad" onClick={toggleUnit}>
                <span className={unit === 'celsius' ? 'activo' : ''}>°C</span>
                <span className={unit === 'fahrenheit' ? 'activo' : ''}>°F</span>
            </div>
        </header>
    );
};

export default AppHeader;