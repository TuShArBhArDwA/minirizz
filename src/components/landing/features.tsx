"use client"

import { motion } from "framer-motion";
import { InstantRizzDemo, RomanticDemo, GhostProofDemo, WittyDemo } from "./feature-demos";

const features = [
    {
        demo: <InstantRizzDemo />,
        title: "Instant Rizz",
        description: "Get smooth replies in seconds. No more staring at the screen wondering what to say."
    },
    {
        demo: <RomanticDemo />,
        title: "Romantic & Flirty",
        description: "Perfect for sliding into DMs or keeping the spark alive."
    },
    {
        demo: <GhostProofDemo />,
        title: "Ghost-Proof",
        description: "Replies so good they can't leave you on read."
    },
    {
        demo: <WittyDemo />,
        title: "Witty & Funny",
        description: "Make them laugh with our curated humor engine."
    }
];

export function Features() {
    return (
        <section className="py-24 w-full max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
                >
                    Why Use MiniRizz?
                </motion.h2>
                <p className="text-muted-foreground mt-4 text-lg">More than just a chatbot. It's your wingman.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="group flex flex-col gap-4"
                    >
                        {/* Video Card Container */}
                        <div className="relative h-[320px] rounded-[2rem] overflow-hidden border border-border/50 bg-card/50 dark:bg-gray-900 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-emerald-500/20">
                            {feature.demo}

                            {/* Overlay Gradient for Text Readability (Optional if text is outside) */}
                            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" /> */}
                        </div>

                        {/* Text Content */}
                        <div className="text-center px-4">
                            <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-emerald-500 transition-colors">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
