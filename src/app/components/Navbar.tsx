"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="bg-gray-900 text-white p-6 text-center">
        <h1 className="text-4xl font-bold">
            <Link 
                href="/" 
                className={`px-2 py-1 rounded-md transition-colors ${
                    pathname === "/" ? "bg-blue-800 text-white" : "text-white"
                }`}
            >
                Dashboard
            </Link>
        </h1>
    </div>
    )
}