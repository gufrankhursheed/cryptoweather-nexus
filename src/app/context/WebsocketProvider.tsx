"use client";

import { addNotification, updateBTCPrice, updateETHPrice } from "@/store/slices/websocketSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function WebSocketProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch()

  useEffect(() => {
    const btcSocket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin")
    const ethSocket = new WebSocket("wss://ws.coincap.io/prices?assets=ethereum")

    let lastBTCPrice = 0
    let lastETHPrice = 0
    let lastToastTimeBTC = 0
    let lastToastTimeETH = 0

    const toastCooldown = 10000; 

    btcSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const now = Date.now()

      if (data.bitcoin) {
        const newPrice = parseFloat(data.bitcoin)
        const priceDiff = Math.abs(newPrice - lastBTCPrice)

        if (priceDiff > 10 || now - lastToastTimeBTC > toastCooldown) {
          lastBTCPrice = newPrice
          lastToastTimeBTC = now
          dispatch(updateBTCPrice(newPrice))
          dispatch(addNotification({ type: "price_alert", message: `BTC price updated: $${newPrice}` }))
        }
      }
    };

    ethSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const now = Date.now()

      if (data.ethereum) {
        const newPrice = parseFloat(data.ethereum)
        const priceDiff = Math.abs(newPrice - lastETHPrice)

        if (priceDiff > 5 || now - lastToastTimeETH > toastCooldown) {
          lastETHPrice = newPrice
          lastToastTimeETH = now
          dispatch(updateETHPrice(newPrice))
          dispatch(addNotification({ type: "price_alert", message: `ETH price updated: $${newPrice}` }))
        }
      }
    };

    btcSocket.onclose = () => console.log("BTC WebSocket disconnected.")
    ethSocket.onclose = () => console.log("ETH WebSocket disconnected.")

    return () => {
      btcSocket.close()
      ethSocket.close()
    };
  }, [dispatch]);
  
    useEffect(() => {
      const weatherInterval = setInterval(() => {
        const alerts = ["Storm warning!", "Heavy Rain expected!", "Heatwave approaching!"]
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)]
  
        dispatch(addNotification({ type: "weather_alert", message: randomAlert }))
      }, 30000)
  
      return () => clearInterval(weatherInterval)
    }, [dispatch])

    return <>{children}</>
}