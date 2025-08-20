// App.jsx
import React from 'react';
import AppHeader from './AppHeader';
import CurrentWeather from './CurrentWeather';
import WeatherDetails from './WeatherDetails';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import CitiesWeather from './CitiesWeather';
import { WeatherProvider } from './WeatherContext';
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