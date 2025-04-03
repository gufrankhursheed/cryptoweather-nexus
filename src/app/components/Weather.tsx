"use client";

import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { Cloud, Sun, CloudRain, Snowflake, Wind } from "lucide-react";
import Spinner from "./Spinner";
import Link from "next/link";

export default function Weather() {
    const { data, status } = useSelector((state: RootState) => state.weather)

    const getWeatherIcon = (weather: string) => {
        switch (weather) {
            case "Clear":
                return <Sun className="text-yellow-500 w-8 h-8" />
            case "Clouds":
                return <Cloud className="text-gray-300 w-8 h-8" />
            case "Rain":
                return <CloudRain className="text-blue-400 w-8 h-8" />
            case "Snow":
                return <Snowflake className="text-blue-200 w-8 h-8" />
            default:
                return <Wind className="text-gray-400 w-8 h-8" />
        }
    }

    if (status === "failed") {
        return (
            <div className="bg-gradient-to-r from-blue-800 to-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Weather</h2>
                <p className="text-red-500">Failed to load data</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-blue-800 to-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Weather</h2>
            {status === "loading" &&
                <Spinner />
            }
            {status === "failed" && <p className="text-red-500">Failed to load data</p>}
            {data && data.map((city) => (
                <Link key={city.id} href={`/weather/${encodeURIComponent(city.name)}`}>
                    <div className="mb-4 flex items-center gap-4">
                        {getWeatherIcon(city.weather?.[0]?.main)}
                        <div>
                            <p className="text-lg font-semibold">{city.name}</p>
                            <p className="text-sm text-gray-300">
                                {city.main.temp}°C | Humidity: {city.main.humidity}% | Wind: {city.wind.speed} km/h
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}