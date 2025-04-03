"use client";

import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import Spinner from "./Spinner";

export default function News() {
    const { data, status } = useSelector((state: RootState) => state.news)

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
            <h2 className="text-2xl font-bold mb-4">Latest News</h2>
            {status === "loading" &&
                <Spinner />
            }
            {status === "failed" && <p className="text-red-500">Failed to load news</p>}
            {data && <ul>
                {data.slice(0, 5).map((news) => (
                    <li key={news.article_id} className="mb-4 border-b border-gray-600 pb-4">
                        <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-400 hover:underline">
                            {news.title}
                        </a>
                        <p className="text-sm text-gray-300">{news.source_name} - {new Date(news.pubDate).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>}
        </div>
    )
}