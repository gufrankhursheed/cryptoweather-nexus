import { RootState } from "@/store/store"
import { useSelector } from "react-redux"

export default function Crypto() {
    const {data, status} = useSelector((status: RootState) => status.crypto)

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Cryptocurrency</h2>
            {status === "loading" && <p>Loading...</p>}
            {data.map((coin) => (
                <div key={coin.id} className="mb-2">
                    <p className="text-lg">{coin.name} - ${coin.current_price}</p>
                </div>
            ))}
        </div>
    )
}