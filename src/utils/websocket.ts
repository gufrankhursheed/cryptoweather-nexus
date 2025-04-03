const COINCAP_WS_URL = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,dogecoin"

export interface CryptoPriceUpdate {
    [key: string]: number; 
}

export const createWebSocket = (onMessage: (data: CryptoPriceUpdate) => void): WebSocket => {
    const socket = new WebSocket(COINCAP_WS_URL);

    socket.onopen = () => {
        console.log("WebSocket connected");
    };

    socket.onmessage = (event: MessageEvent) => {
        try {
            const data: CryptoPriceUpdate = JSON.parse(event.data);
            onMessage(data);
        } catch (error) {
            console.error("Error parsing WebSocket message:", error);
        }
    };

    socket.onerror = (error: Event) => {
        console.error("WebSocket Error:", error);
    };

    socket.onclose = () => {
        console.log("WebSocket disconnected");
        setTimeout(() => createWebSocket(onMessage), 5000); 
    };

    return socket;
};