"use client";

import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import Spinner from "./Spinner";
import Link from "next/link";
import Image from "next/image";

export default function Crypto() {
    const { data, status } = useSelector((state: RootState) => state.crypto)

    return (
        <div className="bg-gradient-to-r from-blue-800 to-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Cryptocurrency</h2>
            {status === "loading" &&
                <Spinner />
            }
            {status === "failed" && <p className="text-red-500">Failed to load data</p>}

            {data && data.map((coin) => (
                <Link key={coin.id} href={`/crypto/${coin.id}`}>
                    <div className="flex items-center justify-between border-b border-gray-600 py-3 group">
                        <div className="flex items-center gap-4">
                            <Image width={200} height={200} src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                            <p className="text-lg font-medium group-hover:underline">
                                {coin.name} ({coin.symbol.toUpperCase()})
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold">${coin.current_price.toFixed(2)}</p>
                            <p className={`text-sm ${coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </p>
                            <p className="text-sm text-gray-400">Market Cap: ${coin.market_cap.toLocaleString()}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}