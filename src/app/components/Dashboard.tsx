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
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="grid md:grid-cols-3 gap-6">
                <Crypto />
                <Weather />
                <News />
            </div>
        </div>
    );
}
