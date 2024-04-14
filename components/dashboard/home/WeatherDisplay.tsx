"use client";

import { url } from 'inspector';
import { useState, useEffect } from 'react';

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feels_like: number;
}

interface WeatherData {
    weather: Weather[];
    main: Main;
    name: string;
}

export default function WeatherDisplay() {
    const [isClient, setIsClient] = useState(false);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        setIsClient(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
                    .then(response => response.json())
                    .then(data => setWeatherData(data));
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    if (!weatherData) return (
        <div className="flex flex-col gap-4 p-2">
            <div className="flex gap-4 items-center">
                <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
            <div className="skeleton h-24 w-full"></div>
        </div>
    );

    const backgroundImage = `https://source.unsplash.com/1600x900/?${weatherData.weather[0].main}`;
    console.log(weatherData.weather[0].main);

    return (
        <div className="flex flex-col p-2 shadow-md bg-base-200 rounded-sm h-full"
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
        >

            <div className="flex flex-wrap items-center gap-2">
                <div className="text-2xl font-medium text-base-content mix-blend-normal">
                    {weatherData.name}
                </div>

                <img className="h-12 w-12 rounded-sm" src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather icon" loading='lazy' />

            </div>

            <div className='flex-grow'>
                <p className="text-base-content capitalize mix-blend-normal">
                    {weatherData.weather[0].description}
                </p>
                <p className="text-base-content text-4xl font-bold mix-blend-normal">
                    {Math.round(weatherData.main.temp - 273.15)}°C
                </p>
                <p className="text-base-content text-sm font-sans italic mix-blend-normal">
                    feels like {Math.round(weatherData.main.feels_like - 273.15)}°C
                </p>
            </div>

            <div>
                <p className="flex text-base-content text-lg font-semibold bg-blend-saturation">
                    Today You Have 12 New Resident
                </p>
            </div>

        </div>
    );
};