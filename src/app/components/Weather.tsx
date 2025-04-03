import { RootState } from "@/store/store"
import { useSelector } from "react-redux"

export default function Weather() {
    const {data, status} = useSelector((status: RootState) => status.weather)

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Weather</h2>
            {status === "loading" && <p>Loading...</p>}
            {data.map((city) => (
                <div key={city.id} className="mb-2">
                    <p className="text-lg">{city.name} - {city.main.temp}°C</p>
                </div>
            ))}
        </div>
    )
}