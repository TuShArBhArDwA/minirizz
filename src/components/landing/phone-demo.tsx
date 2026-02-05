"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, Send, Mic, Globe, Copy, Check, Lock, Battery, Wifi } from "lucide-react";

export function PhoneDemo() {
    const [step, setStep] = useState(0);
    const [app, setApp] = useState<"whatsapp" | "browser">("whatsapp");

    // Script sequence
    // 0: WhatsApp - Crush sends "I'm bored lol"
    // 1: WhatsApp - User hesitation (Typing... then stops)
    // 2: Switch to Browser - Typing "minirizz.vercel.app"
    // 3: Browser - Paste Screenshot (Visual simulation)
    // 4: Browser - Generating Rizz (Loading)
    // 5: Browser - Result Card appears ("Let's go on an adventure")
    // 6: Browser - Click Copy
    // 7: Switch back to WhatsApp
    // 8: WhatsApp - Paste & Send
    // 9: WhatsApp - Crush replies (Sticker/Heart)

    useEffect(() => {
        const sequence = async () => {
            // Reset
            setStep(0); setApp("whatsapp");

            await wait(1000); setStep(1); // Msg received
            await wait(2000); // User reads

            // Switch to Browser
            setApp("browser");
            await wait(500); setStep(2); // Typing URL
            await wait(1500); setStep(3); // URL entered, Load App

            // Upload Action
            await wait(1000); setStep(4); // Uploading/Pasting

            // Generating
            await wait(1500); setStep(5); // Show Result

            // Copy Action
            await wait(1500); setStep(6); // Copied

            // Switch back
            await wait(1000); setApp("whatsapp");

            // Sending
            await wait(500); setStep(7); // Pasting text
            await wait(1000); setStep(8); // Sent

            // Reply
            await wait(2000); setStep(9); // Sticker reply

            // Loop
            await wait(4000);
            setStep(0);
        };

        const interval = setInterval(sequence, 18000); // Total loop time
        sequence(); // Start immediately

        return () => clearInterval(interval);
    }, []);

    const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

    return (
        <div className="relative mx-auto border-gray-800 bg-gray-900 border-[8px] rounded-[2.5rem] h-[580px] w-[300px] shadow-2xl overflow-hidden ring-1 ring-white/10">

            {/* Status Bar */}
            <div className="absolute top-0 w-full h-8 px-4 flex justify-between items-center text-white text-[10px] z-50 bg-black/20 backdrop-blur-md">
                <span>9:41</span>
                <div className="flex gap-1.5">
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-3 h-3" />
                </div>
            </div>

            {/* Dynamic Island / Notch */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full z-50"></div>

            {/* Screen Content */}
            <div className="w-full h-full bg-[#0b141a] relative overflow-hidden font-sans">

                <AnimatePresence mode="wait">
                    {app === "whatsapp" ? (
                        <WhatsAppView key="whatsapp" step={step} />
                    ) : (
                        <BrowserView key="browser" step={step} />
                    )}
                </AnimatePresence>

            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50"></div>
        </div>
    );
}

function WhatsAppView({ step }: { step: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full h-full flex flex-col bg-[#0b141a]"
        >
            {/* WA Header */}
            <div className="bg-[#202c33] p-3 pt-12 pb-3 flex items-center gap-3 border-b border-white/5 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-yellow-400" />
                <div className="flex flex-col">
                    <span className="text-white text-sm font-bold">Crush ❤️</span>
                    <span className="text-[10px] text-gray-400">Online</span>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-3 space-y-3 relative">
                <div className="absolute inset-0 opacity-5 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat" />

                {/* Messages */}
                <AnimatePresence>
                    {step >= 1 && (
                        <motion.div key="msg-incoming" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#202c33] self-start p-2 px-3 rounded-lg rounded-tl-none max-w-[80%] relative z-10 w-fit">
                            <p className="text-white text-sm">I'm bored lol</p>
                            <span className="text-[10px] text-gray-400 block text-right mt-1">9:41 PM</span>
                        </motion.div>
                    )}

                    {step >= 8 && (
                        <motion.div key="msg-reply" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#005c4b] ml-auto p-2 px-3 rounded-lg rounded-tr-none max-w-[85%] relative z-10 w-fit shadow-lg">
                            <p className="text-white text-sm">Let's go on an adventure then 😉 we can grab tacos?</p>
                            <span className="text-[10px] text-green-200/80 block text-right mt-1">9:43 PM</span>
                        </motion.div>
                    )}

                    {step >= 9 && (
                        <motion.div key="msg-sticker" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="ml-0 mr-auto relative z-10 w-fit mt-2">
                            {/* Sticker Simulation */}
                            <div className="w-24 h-24 bg-transparent mt-2">
                                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDVqZnk0eXF6bm54bm54bm54bm54bm54bm54bm54bm54bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MDJ9IbxxvDUQM/giphy.gif" alt="Cat sticker" className="w-full h-full object-contain drop-shadow-xl" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Bar */}
            <div className="bg-[#202c33] p-2 flex items-center gap-2 z-10 pb-6">
                <div className="bg-[#2a3942] rounded-full p-2"><span className="text-gray-400 text-lg">+</span></div>
                <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-sm text-white">
                    {step === 7 ? "Let's go on an..." : "Message"}
                </div>
                <div className="bg-[#005c4b] rounded-full p-2">
                    {step >= 7 ? <Send className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-white" />}
                </div>
            </div>
        </motion.div>
    )
}

function BrowserView({ step }: { step: number }) {
    return (
        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="w-full h-full flex flex-col bg-gray-950 text-white"
        >
            {/* URL Bar */}
            <div className="bg-gray-900 p-2 pt-12 pb-2 text-center border-b border-white/10 flex items-center justify-center gap-2">
                <Lock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-300 font-medium">
                    {step < 3 ? "mini..." : "minirizz.vercel.app"}
                </span>
            </div>

            {/* App Content */}
            <div className="flex-1 p-4 flex flex-col items-center pt-8">

                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center mb-4 shadow-lg shadow-pink-500/20">
                    <Sparkles className="text-white w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold mb-6 text-center">Generate Rizz</h3>

                {/* Simulated Input Area */}
                <div className="w-full bg-gray-900/50 border border-white/10 rounded-lg p-3 mb-4 min-h-[80px] relative">
                    {step >= 3 && step < 4 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center bg-gray-800/80 rounded-lg backdrop-blur-sm">
                            <span className="text-xs flex items-center gap-1"><Sparkles className="w-3 h-3 text-pink-500" /> Analyzing Mood...</span>
                        </motion.div>
                    ) : step >= 4 ? (
                        <div className="w-full h-16 bg-white/5 rounded overflow-hidden relative">
                            {/* Screenshot Thumbnail */}
                            <div className="absolute inset-0 bg-[#202c33] p-2">
                                <p className="text-[8px] text-white">I'm bored lol</p>
                            </div>
                        </div>
                    ) : (
                        <span className="text-xs text-gray-500">Paste chat...</span>
                    )}
                </div>

                {/* Generate Button */}
                <div className={`w-full py-2 rounded-lg text-xs font-bold text-center transition-all
                    ${step === 4 ? "bg-gray-700 text-gray-400" : "bg-gradient-to-r from-pink-600 to-violet-600 text-white shadow-lg shadow-purple-500/30"}`}>
                    {step === 4 ? "Cooking..." : "Rizz Me Up"}
                </div>

                {/* Result Card */}
                <AnimatePresence>
                    {step >= 5 && (
                        <motion.div
                            key="result-card"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full mt-6 bg-gray-900 border border-pink-500/30 rounded-xl p-3 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-violet-500" />
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded-full border border-pink-500/20">Rizz ✨</span>
                                {step >= 6 && <Check className="w-3 h-3 text-green-500" />}
                            </div>
                            <p className="text-xs text-gray-200 leading-relaxed">Let's go on an adventure then 😉 we can grab tacos?</p>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </motion.div>
    )
}
