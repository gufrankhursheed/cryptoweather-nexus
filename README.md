# CryptoWeather Nexus

**CryptoWeather Nexus** is a real-time web application that combines live cryptocurrency prices with simulated weather alerts. It showcases WebSocket integration, Redux state management, and toast-based user notifications — all built with **Next.js 13 App Router** and **TypeScript**.

> Live Demo: https://cryptoweather-nexus-iota.vercel.app/

---

## Tech Stack

- **Next.js 13 (App Router)**
- **TypeScript**
- **Redux Toolkit**
- **WebSockets** (CoinCap API)
- **React Hot Toast**
- **Tailwind CSS** 

---

## Features

- Live cryptocurrency price updates
- Simulated weather alerts every 30 seconds
- Global toast notifications (price alerts and weather updates)
- Centralized state management via Redux Toolkit
- Real-time data via WebSocket API

---

## Getting Started

Follow the steps below to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/gufrankhursheed/cryptoweather-nexus
cd cryptoweather-nexus
2. Install dependencies
npm install
3. Run the development server
npm run dev
Open http://localhost:3000 in your browser to view the app.

WebSocket Integration
We use the CoinCap WebSocket API for live price updates:
wss://ws.coincap.io/prices?assets=bitcoin,ethereum
Each incoming message updates the Redux store and triggers a toast notification.

Toast Notifications
Notifications are displayed globally using react-hot-toast. The app listens for changes to the notifications array in the Redux store and displays the latest update:

BTC/ETH Price Updates

Simulated Weather Alerts (every 30s)

Design Decisions
WebSocketProvider manages the connection lifecycle and dispatches updates.

Redux Toolkit offers clean, maintainable state management for price and notification state.

ToastNotifications is a lightweight component that listens for new updates and triggers UI feedback.

Modular Architecture separates concerns into store, components, and context.

Deployment
The app is deployed publicly on Vercel:

https://cryptoweather-nexus-iota.vercel.app/

Author
Md Gufran Khursheed
gufranKhursheed7@gmail.com
https://github.com/gufrankhursheed

Feedback & Contributions
Got suggestions or want to contribute? Feel free to:

Open an Issue

Submit a Pull Request

© 2025 CryptoWeather Nexus — All rights reserved.

---

Let me know if you’d like this customized with your actual GitHub username, name, or email — or if you want a badge-filled version with GitHub shields