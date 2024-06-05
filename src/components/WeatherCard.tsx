import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; // Importa o Button do React-Bootstrap
import './WeatherCard.css';

const WeatherCard: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any | null>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=eeb2955a3047c339352d64892f0a4122&units=metric`);
      if (!response.ok) {
        throw new Error('Falha ao buscar dados do clima.');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Erro ao buscar dados do clima:', error);
    }
  };

  const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  return (
    <div className="weather-card">
      <span className='weather-card container-button'><input 
        type="text" 
        value={location} 
        onChange={handleChangeLocation} 
        placeholder="Enter location" 
      />
      <Button variant="primary" onClick={handleSearch}>Buscar Clima</Button>
      </span>
      {weatherData && (
        <div>
          <h3>{weatherData.name}</h3>
          <p>Temperatura: {weatherData.main.temp} °C</p>
          <p>Condição: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
