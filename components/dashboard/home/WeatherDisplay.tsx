"use client";

import React, { useState, useEffect } from 'react';

interface WeatherData {
    name: string;
    main: {
        temp: number;
    };
    weather: {
        description: string;
    }[];
}

function WeatherDisplay() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [city, setCity] = useState<string>('');
    const [greeting, setGreeting] = useState<string>('');

    useEffect(() => {
        // Fetch current location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        if (weather) {
            // Set city name
            setCity(weather.name);

            // Set greeting based on time
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) {
                setGreeting('Good morning');
            } else if (hour >= 12 && hour < 18) {
                setGreeting('Good afternoon');
            } else {
                setGreeting('Good evening');
            }
        }
    }, [weather]);

    async function fetchWeather(latitude: number, longitude: number) {
        const API_KEY = `${process.env.WEATHER_API_KEY}`;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(url);
            const data: WeatherData = await response.json();
            setWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    return (
        <div>
            <h1>{greeting}</h1>
            {city && <p>Current City: {city}</p>}
            {weather && weather.main && (
                <div>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}

export default WeatherDisplay;

