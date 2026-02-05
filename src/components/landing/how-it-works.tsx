"use client"

import { motion } from "framer-motion";
import { Upload, Sparkles, Copy, MessageCircle } from "lucide-react";
import { PhoneDemo } from "./phone-demo";

const steps = [
    {
        id: 1,
        title: "Screenshot Chat",
        desc: "Stuck in a conversation? Just take a screenshot.",
        icon: <Upload className="w-6 h-6" />
    },
    {
        id: 2,
        title: "Get Rizz",
        desc: "Our AI analyzes the mood and suggests 4 perfect replies.",
        icon: <Sparkles className="w-6 h-6" />
    },
    {
        id: 3,
        title: "Seal the Deal",
        desc: "Copy, paste, and watch the magic happen.",
        icon: <MessageCircle className="w-6 h-6" />
    }
];

export function HowItWorks() {
    return (
        <section className="py-24 w-full max-w-7xl mx-auto px-4 relative overflow-hidden">

            {/* Background Gradients Removed for better flow */}
            {/* <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" /> */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Visual Side (Phone) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex justify-center lg:justify-end relative"
                >
                    <div className="relative z-10">
                        <PhoneDemo />

                        {/* Decorative Blob behind phone */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-pink-500/30 to-violet-500/30 blur-3xl -z-10 rounded-full animate-pulse" />
                    </div>
                </motion.div>

                {/* Text Side */}
                <div className="space-y-12">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
                        >
                            Never Get Left on <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                                Read Again
                            </span>
                        </motion.h2>
                        <p className="text-lg text-muted-foreground">
                            See how MiniRizz turns awkward silences into dates.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                className="flex gap-4 items-start group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0 group-hover:bg-pink-500/20 group-hover:border-pink-500/50 transition-colors">
                                    <div className="text-foreground group-hover:text-pink-400 transition-colors">
                                        {step.icon}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1 group-hover:text-pink-400 transition-colors">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
