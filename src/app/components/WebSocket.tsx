import { updatePrices } from "@/store/slices/websocketSlice";
import { AppDispatch } from "@/store/store";
import { createWebSocket, CryptoPriceUpdate } from "@/utils/websocket";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


export default function WebSocket() {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        const socket = createWebSocket((data: CryptoPriceUpdate) => {
            dispatch(updatePrices(data))
        })

        return () => {
            socket.close();
        };
    }, [dispatch])

    return null
}