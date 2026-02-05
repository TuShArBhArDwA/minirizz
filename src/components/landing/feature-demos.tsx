"use client"

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, Heart, Ghost, Zap, Flame, MessageCircle, Send } from "lucide-react";

// Shared Card Container
const DemoCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden ${className}`}>
        {children}
    </div>
);

// 1. Instant Rizz Demo
export function InstantRizzDemo() {
    const [state, setState] = useState<"idle" | "thinking" | "done">("idle");

    useEffect(() => {
        const loop = setInterval(() => {
            setState("thinking");
            setTimeout(() => setState("done"), 800);
            setTimeout(() => setState("idle"), 3500);
        }, 4000);
        return () => clearInterval(loop);
    }, []);

    return (
        <DemoCard className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10">
            <div className="w-full max-w-[280px] bg-background/80 backdrop-blur-md border border-violet-500/20 rounded-2xl p-4 shadow-2xl">
                {/* Context: Incoming Message */}
                <div className="flex gap-3 mb-6 opacity-60">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none p-3 text-xs w-full space-y-2">
                        <div className="h-2 bg-gray-400/20 rounded w-3/4" />
                        <div className="h-2 bg-gray-400/20 rounded w-1/2" />
                    </div>
                </div>

                {/* The Solution: Instant Generation */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                    <div className="relative bg-background border border-violet-100 dark:border-violet-900/50 rounded-xl p-4 min-h-[80px] flex items-center shadow-sm">

                        {/* Status Icon */}
                        <div className="absolute top-2 right-2">
                            <motion.div
                                animate={{
                                    rotate: state === "thinking" ? 180 : 0,
                                    scale: state === "thinking" ? 1.2 : 1
                                }}
                                className="text-violet-500"
                            >
                                <Sparkles className="w-4 h-4" />
                            </motion.div>
                        </div>

                        {/* Content Switching */}
                        <div className="w-full">
                            {state === "idle" && (
                                <motion.span
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="text-muted-foreground/40 text-sm italic flex items-center gap-2"
                                >
                                    <span className="w-0.5 h-4 bg-violet-400 animate-pulse" />
                                    Staring at screen...
                                </motion.span>
                            )}

                            {state === "thinking" && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="flex items-center gap-2 text-sm text-violet-500 font-medium"
                                >
                                    <span>Cooking up rizz</span>
                                    <span className="flex gap-0.5">
                                        <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0 }}>.</motion.span>
                                        <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}>.</motion.span>
                                        <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}>.</motion.span>
                                    </span>
                                </motion.div>
                            )}

                            {state === "done" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 leading-snug"
                                >
                                    "Do you have a map? because I just got lost in your eyes. 🗺️"
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DemoCard>
    );
}

// 2. Romantic Demo
export function RomanticDemo() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep(prev => (prev + 1) % 3); // 2 -> 0 loop
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <DemoCard className="bg-gradient-to-br from-pink-500/10 to-rose-500/10">
            <div className="w-full max-w-[260px] flex flex-col items-center">

                {/* Mood Selector Animation */}
                <div className="flex gap-2 mb-8 bg-background/50 p-1.5 rounded-full border border-pink-200 dark:border-pink-900/30 backdrop-blur-sm">
                    {["😴", "❤️", "😈"].map((emoji, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: (step >= 0 && i === 1) ? 1.2 : 1, // Always highlight Heart in step 0, 1, 2 for demo purposes or strictly follow step
                                backgroundColor: (step >= 0 && i === 1) ? "rgba(236, 72, 153, 0.2)" : "transparent",
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-full text-lg"
                        >
                            {emoji}
                        </motion.div>
                    ))}
                </div>

                {/* Reply Card */}
                <motion.div
                    className="relative bg-background border border-pink-200 dark:border-pink-900 p-5 rounded-2xl shadow-xl w-full"
                    animate={{ y: step === 0 ? 20 : 0, opacity: step === 0 ? 0 : 1 }}
                >
                    <div className="absolute -top-3 left-4 bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-current" />
                        Romantic
                    </div>

                    {step === 1 ? (
                        <div className="flex gap-1 justify-center py-2">
                            <motion.div className="w-2 h-2 bg-pink-400 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity }} />
                            <motion.div className="w-2 h-2 bg-pink-400 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, delay: 0.2 }} />
                            <motion.div className="w-2 h-2 bg-pink-400 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, delay: 0.4 }} />
                        </div>
                    ) : (
                        <p className="text-sm font-medium text-foreground leading-relaxed">
                            "Are you a keyboard? Because you're just my type. 💘"
                        </p>
                    )}
                </motion.div>

                {/* Floating Hearts Particle Effect on Done */}
                {step === 2 && (
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 50, x: 0, opacity: 0 }}
                                animate={{ y: -100, x: (i % 2 === 0 ? 50 : -50) * Math.random(), opacity: [0, 1, 0] }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="absolute top-1/2 left-1/2 text-pink-500"
                            >
                                <Heart className="w-4 h-4 fill-current" />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </DemoCard>
    );
}

// 3. Ghost Proof Demo
export function GhostProofDemo() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep(prev => (prev + 1) % 4); // 0: Read -> 1: Activate -> 2: Typing -> 3: Show
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <DemoCard className="bg-gray-50 dark:bg-gray-900/50">
            <div className="w-full max-w-[260px] space-y-4">
                {/* 1. The 'Left on Read' Disaster */}
                <div className="flex flex-col items-end opacity-70">
                    <div className="bg-blue-500 text-white text-xs px-3 py-2 rounded-2xl rounded-tr-none mb-1">
                        Hey, you free later?
                    </div>
                    <div className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                        Read 10:45 AM
                        {step >= 1 && <span className="text-red-500 font-bold ml-1">(!?!)</span>}
                    </div>
                </div>

                {/* 2. The Intervention */}
                {step >= 1 && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-gray-900 dark:bg-black text-white p-3 rounded-xl flex items-center gap-3 shadow-lg"
                    >
                        <div className="bg-indigo-500 p-1.5 rounded-lg">
                            <Ghost className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <div className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Ghost Protocol</div>
                            <div className="text-xs font-bold text-indigo-300">Invoke Curiosity</div>
                        </div>
                    </motion.div>
                )}

                {/* 3. The Result */}
                {step >= 2 && (
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 flex items-center justify-center text-white text-[10px] font-bold shadow-md">
                            H
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm">
                            {step === 2 ? (
                                <div className="flex gap-1">
                                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity }} />
                                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, delay: 0.1 }} />
                                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, delay: 0.2 }} />
                                </div>
                            ) : (
                                <span className="text-sm text-foreground">typing...</span>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </DemoCard>
    );
}

// 4. Witty Demo
export function WittyDemo() {
    return (
        <DemoCard className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
            <div className="relative text-center w-full">
                <motion.div
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="inline-block relative"
                >
                    <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full transform rotate-12 shadow-md z-10 border border-white/20">
                        ROAST 🔥
                    </div>

                    <div className="bg-background/90 backdrop-blur-md border border-orange-500/30 p-4 rounded-2xl shadow-xl max-w-[220px] mx-auto">
                        <p className="text-sm font-bold text-foreground leading-snug">
                            "Bro thinks he's the main character 💀"
                        </p>
                    </div>
                </motion.div>

                {/* Laughing Emojis Background */}
                <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
                    {/* No extra elements needed, clean look */}
                </div>
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 50, opacity: 0, scale: 0.5 }}
                        animate={{ y: -100, opacity: [0, 1, 0], scale: 1.2 }}
                        transition={{
                            repeat: Infinity,
                            duration: 2.5,
                            delay: i * 0.4,
                            ease: "easeOut"
                        }}
                        className="absolute text-2xl"
                        style={{ left: `${15 + i * 15}%`, top: '50%' }}
                    >
                        {i % 2 === 0 ? "😂" : "💀"}
                    </motion.div>
                ))}
            </div>
        </DemoCard>
    );
}
