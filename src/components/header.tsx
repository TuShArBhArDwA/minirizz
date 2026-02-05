"use client"

import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

export function Header() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 w-full z-50 flex justify-between items-center p-6 max-w-7xl mx-auto backdrop-blur-sm bg-transparent border-b border-transparent"
        >
            <div className="flex items-center gap-2">
                <img src="/logo.svg" alt="MiniRizz Logo" className="w-8 h-8 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                <span className="font-bold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-pink-500 to-violet-500">
                    minirizz
                </span>
            </div>
            <ThemeToggle />
        </motion.header>
    );
}
