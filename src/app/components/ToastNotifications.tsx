"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "react-hot-toast";

export default function ToastNotifications() {
    const notifications = useSelector((state: RootState) => state.websocket.notifications)

    useEffect(() => {
      if (notifications.length > 0) {
        const lastNotification = notifications[notifications.length - 1]
        toast(lastNotification.message, { icon: lastNotification.type === "price_alert" ? "📈" : "🌦" })
      }
    }, [notifications])
  
    return null
}