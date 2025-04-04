"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Star, BarChart3 } from "lucide-react";
import Spinner from "@/app/components/Spinner";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoDetail, fetchCryptoHistory } from "@/store/slices/cryptoSlice";

interface CryptoDetail {
    id: string;
    name: string;
    symbol: string;
    image: { large: string };
    market_cap_rank: number;
    market_data: {
        current_price: { usd: number };
        market_cap: { usd: number };
        price_change_percentage_24h: number;
        market_cap_change_percentage_24h: number;
        high_24h: { usd: number };
        low_24h: { usd: number };
        ath: { usd: number };
        ath_date: string;
        circulating_supply: number;
        total_supply: number;
    };
}



export default function CryptoDetail() {
    const { id } = useParams()
    const dispatch: AppDispatch = useDispatch();
    const { cryptoDetail, detailStatus, historicalData, historyStatus, error } = useSelector((state: RootState) => state.crypto);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setLoading(true); 
            dispatch(fetchCryptoDetail(id as string));
            dispatch(fetchCryptoHistory(id as string));
        }
        setLoading(false)
    }, [dispatch, id]);

    if (detailStatus === "loading" || historyStatus === "loading" || loading) {
        return (
            <div className="flex bg-gray-900 items-center justify-center w-screen h-screen">
                <Spinner />
            </div>
        )
    }

    if (error) return <div className="text-red-500 text-center p-6">{error}</div>

    if (!cryptoDetail) {
        return <div className="text-center">No cryptocurrency data found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-3xl mx-auto bg-blue-800 text-white p-6 rounded-lg shadow-lg mt-5">
                <div className="flex items-center gap-4">
                    <img src={cryptoDetail.image.large} alt={cryptoDetail.name} className="w-12 h-12" />
                    <div>
                        <h2 className="text-2xl font-bold">{cryptoDetail.name} ({cryptoDetail.symbol.toUpperCase()})</h2>
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            Rank: #{cryptoDetail.market_cap_rank}
                        </p>
                    </div>
                </div>

                <div className="mt-4 space-y-2">
                    <p className="text-lg font-semibold">💰 Price: <span className="text-green-400">${cryptoDetail.market_data.current_price.usd.toFixed(2)}</span></p>
                    <p className="text-lg font-semibold">🏦 Market Cap: <span className="text-blue-400">${cryptoDetail.market_data.market_cap.usd.toLocaleString()}</span></p>
                    <p className={`text-lg font-semibold flex items-center ${cryptoDetail.market_data.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {cryptoDetail.market_data.price_change_percentage_24h >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                        24h Change: {cryptoDetail.market_data.price_change_percentage_24h.toFixed(2)}%
                    </p>
                </div>

                <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">Extended Metrics</h3>
                    <p>24h Low: <span className="text-red-400">${cryptoDetail.market_data.low_24h.usd.toFixed(2)}</span></p>
                    <p>24h High: <span className="text-green-400">${cryptoDetail.market_data.high_24h.usd.toFixed(2)}</span></p>
                    <p>All-Time High: <span className="text-yellow-400">${cryptoDetail.market_data.current_price.usd.toFixed(2)} (on {new Date(cryptoDetail.market_data.ath_date).toLocaleDateString()})</span></p>
                    <p>Circulating Supply: {cryptoDetail.market_data.circulating_supply.toLocaleString()}</p>
                    <p>Total Supply: {cryptoDetail.market_data.total_supply?.toLocaleString() || "N/A"}</p>
                </div>

                <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                        <BarChart3 className="w-5 h-5" /> 7-Day Price History
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={historicalData}>
                            <XAxis dataKey="date" stroke="#ccc" />
                            <YAxis stroke="#ccc" />
                            <Tooltip contentStyle={{ backgroundColor: "#1f2937", color: "#fff", borderRadius: "8px" }} />
                            <Line type="monotone" dataKey="price" stroke="#4ade80" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
