import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "../store/Provider";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import ToastNotifications from "./components/ToastNotifications";
import WebSocketProvider from "./context/WebsocketProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cryptoweather Nexus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <WebSocketProvider>
            <Navbar />
            <Toaster position="top-center" reverseOrder={false} />
            <ToastNotifications />
            {children}
          </WebSocketProvider>
        </Providers>
      </body>
    </html>
  );
}
