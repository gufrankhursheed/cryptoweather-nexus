"use client";

import { AppDispatch } from "@/store/store";
import Crypto from "./Crypto";
import News from "./News";
import Weather from "./Weather";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchWeather } from "@/store/slices/weatherSlice";
import { fetchCrypto } from "@/store/slices/cryptoSlice";
import { fetchNews } from "@/store/slices/newsSlice";

export default function Dashboard() {
    const dispatch: AppDispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchWeather());
        dispatch(fetchCrypto());
        dispatch(fetchNews());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-4xl font-bold text-center mb-6">Dashboard</h1>

            <div className="grid md:grid-cols-3 gap-6">
                <Weather />
                <Crypto />
                <News />
            </div>
        </div>
    );
}
