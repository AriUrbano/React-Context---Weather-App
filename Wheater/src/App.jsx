// components/App.jsx
import React from 'react';
import AppHeader from './components/AppHeader';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import CitiesWeather from './components/CitiesWeather';
import WeatherProvider from './context/WeatherProvider';
import './App.css';

const App = () => {
    return (
        <WeatherProvider>
            <div className="app-clima">
                <AppHeader />
                <div className="contenido-principal">
                    <div>
                        <CurrentWeather />
                        <WeatherDetails />
                    </div>
                    <div>
                        <HourlyForecast />
                        <DailyForecast />
                    </div>
                </div>
                <CitiesWeather />
            </div>
        </WeatherProvider>
    );
};

export default App;