"use client"

import { motion } from "framer-motion";

export function Hero() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 text-center py-10"
        >
            <div className="inline-block px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground mb-4">
                ✨ The AI Wingman You Deserve
            </div>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-tight">
                Master the Art of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 animate-gradient-x">
                    Digital Charisma
                </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Upload a chat or paste a text. Let AI craft the perfect reply.
                <br />Don't just reply, <span className="text-primary font-bold">Rizz 'em up.</span>
            </p>
        </motion.div>
    );
}
