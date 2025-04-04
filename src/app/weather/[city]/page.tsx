"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useParams } from "next/navigation";
import { Sun, Cloud, CloudRain, Snowflake, Wind, Sunrise, Sunset, Thermometer, Droplets } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from "@/app/components/Spinner";
import { fetchWeather } from "@/store/slices/weatherSlice";

interface Weather {
    id: number;
    name: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
        gust?: number;
    };
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
}

export default function WeatherDetails() {
    const params = useParams();
    const city = params?.city ? decodeURIComponent(params.city as string) : null;

    const { data, status } = useSelector((state: RootState) => state.weather);
    const [weather, setWeather] = useState<Weather | null>(null);
    const dispatch: AppDispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data.length === 0) {
            dispatch(fetchWeather());
        }
    }, [dispatch, data]);

    useEffect(() => {
        if (city) {
            setLoading(true); 
            if (data.length > 0) {
                const foundCity = data.find((item) => item.name.toLowerCase() === city.toLowerCase());
                setWeather(foundCity || null);
                setLoading(false); 
            }
        }
    }, [city, data]);

    if (status === "loading" || loading) {
        return (
            <div className="flex items-center justify-center w-screen h-screen">
                <Spinner />
            </div>
        )
    }

    if (!weather) {
        return <div className="text-center text-gray-500 mt-10">Weather data not found.</div>
    }

    const tempCelsius = Math.round(weather.main.temp - 273.15)
    const feelsLikeCelsius = Math.round(weather.main.feels_like - 273.15)

    const sunriseTime = new Date(weather.sys.sunrise * 1000).toLocaleTimeString()
    const sunsetTime = new Date(weather.sys.sunset * 1000).toLocaleTimeString()

    const getWeatherIcon = (condition: string) => {
        switch (condition) {
            case "Clear":
                return <Sun className="text-yellow-500 w-14 h-14" />
            case "Clouds":
                return <Cloud className="text-gray-300 w-14 h-14" />
            case "Rain":
                return <CloudRain className="text-blue-400 w-14 h-14" />
            case "Snow":
                return <Snowflake className="text-blue-200 w-14 h-14" />
            default:
                return <Wind className="text-gray-400 w-14 h-14" />
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-blue-800 to-gray-800 text-white rounded-xl shadow-lg mt-10">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">{weather.name}, {weather.sys.country}</h1>
                    <p className="text-gray-300 text-lg">{weather.weather[0].description}</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-4">
                    {getWeatherIcon(weather.weather[0].main)}
                    <div className="text-center sm:text-left">
                        <p className="text-5xl font-semibold">{tempCelsius}°C</p>
                        <p className="text-gray-300">Feels like {feelsLikeCelsius}°C</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                    <div className="flex items-center gap-3">
                        <Thermometer className="text-red-500 w-6 h-6" />
                        <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Droplets className="text-blue-400 w-6 h-6" />
                        <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Wind className="text-gray-300 w-6 h-6" />
                        <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
                    </div>
                    {weather.wind.gust && (
                        <div className="flex items-center gap-3">
                            <Wind className="text-gray-400 w-6 h-6" />
                            <p><strong>Wind Gust:</strong> {weather.wind.gust} m/s</p>
                        </div>
                    )}
                    <div className="flex items-center gap-3">
                        <Sunrise className="text-orange-400 w-6 h-6" />
                        <p><strong>Sunrise:</strong> {sunriseTime}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Sunset className="text-red-500 w-6 h-6" />
                        <p><strong>Sunset:</strong> {sunsetTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
