import { RootState } from "@/store/store"
import { useSelector } from "react-redux"

export default function News() {
    const {data, status} = useSelector((status: RootState) => status.news)

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">📰 Latest News</h2>
            {status === "loading" && <p>Loading...</p>}
            {data.map((news, index) => (
                <div key={index} className="mb-2">
                    <a href={news.link} className="text-lg text-blue-400 hover:underline">{news.title}</a>
                </div>
            ))}
        </div>
    )
}