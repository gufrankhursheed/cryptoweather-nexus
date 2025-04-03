"use client";

import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import Spinner from "./Spinner";

export default function Crypto() {
    const { data, status } = useSelector((state: RootState) => state.crypto)

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
            <h2 className="text-2xl font-bold mb-4">Cryptocurrency</h2>
            {status === "loading" &&
                <Spinner />
            }
            {status === "failed" && <p className="text-red-500">Failed to load data</p>}

            {data && data.map((coin) => (
                <div key={coin.id} className="flex items-center justify-between border-b border-gray-600 py-3">
                    <div className="flex items-center gap-4">
                        <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                        <p className="text-lg font-medium">{coin.name} ({coin.symbol.toUpperCase()})</p>
                    </div>
                    <p className={`text-lg font-bold ${coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                        ${coin.current_price.toFixed(2)}
                    </p>
                </div>
            ))}
        </div>
    )
}