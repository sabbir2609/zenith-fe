"use client";

import Image from 'next/image';
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
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
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

    function getGreeting() {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return 'Good morning';
        } else if (currentHour < 18) {
            return 'Good afternoon';
        } else {
            return 'Good evening';
        }
    }

    return (
        <div className="flex flex-col p-2 shadow-md bg-base-200 rounded-sm h-full"
            style={{ backgroundImage: "url('/static/image/dashboard/weatherCard-bg.jpg')", backgroundSize: 'cover' }}
        >
            <div className="flex flex-row items-center justify-between">
                <div className="text-4xl font-medium text-white">
                    {getGreeting()}
                </div>

                <div className="flex flex-wrap items-center gap-2 justify-end">
                    <div className="text-2xl font-medium text-white">
                        {weatherData.name}
                    </div>

                    <Image height={50} width={50} src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather icon" loading='lazy' />

                </div>
            </div>

            <div className='flex-grow'>
                <p className="capitalize text-white">
                    {weatherData.weather[0].description}
                </p>
                <p className="text-4xl font-bold text-white">
                    {Math.round(weatherData.main.temp - 273.15)}°C
                </p>
                <p className="text-sm font-sans italic text-white">
                    feels like {Math.round(weatherData.main.feels_like - 273.15)}°C
                </p>
            </div>

            <div>
                <p className="flex text-lg font-semibold text-white">
                    Today You Have 12 New Resident
                </p>
            </div>

        </div>
    );
};