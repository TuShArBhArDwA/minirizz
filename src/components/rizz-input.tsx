"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Upload, Sparkles, Loader2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleGenerativeAI } from "@google/generative-ai"

export function RizzInput() {
    const getGifUrl = (mood: string) => {
        // More specific/relevant GIF mappings
        if (mood.includes("Roast")) return "https://media.giphy.com/media/RdKjAkFTNZkWUGyRXF/giphy.gif"; // "Boom Roasted" / Fire
        if (mood.includes("Funny")) return "https://media.giphy.com/media/l3fQf1OEAq0iri9RC/giphy.gif"; // Genuine laugh
        if (mood.includes("Sad")) return "https://media.giphy.com/media/7SF5scGB2AFrgsXP63/giphy.gif"; // Crying cat/person
        if (mood.includes("Romantic") || mood.includes("Flirty")) return "https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif"; // Winking/Flirty
        return "https://media.giphy.com/media/W3H7yzvQowNSy124C8/giphy.gif"; // Thumbs up / Cool (Default Rizz)
    }

    const [input, setInput] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [result, setResult] = React.useState<Array<{ reply: string, mood: string }> | null>(null)
    const [language, setLanguage] = React.useState("English")

    // Helper Component for the Card content (to reuse in Desktop/Mobile layouts)
    const ResultCard = ({ item, index, copied, copyToClipboard, getGifUrl }: any) => (
        <Card className={`overflow-hidden border-0 bg-card/90 backdrop-blur-xl shadow-2xl transition-all hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] group w-full`}>
            {/* GIF/Video Section */}
            <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <img
                    src={getGifUrl(item.mood)}
                    alt={item.mood}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Mood Badge Overlay */}
                <div className="absolute top-3 left-3 z-20">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-2
                        ${item.mood.includes("Rizz") ? "bg-pink-500/80 text-white" :
                            item.mood.includes("Roast") ? "bg-orange-500/80 text-white" :
                                item.mood.includes("Funny") ? "bg-yellow-500/80 text-white" :
                                    "bg-blue-500/80 text-white"
                        }`}>
                        {item.mood.includes("Rizz") && <Sparkles className="w-3 h-3" />}
                        {item.mood.includes("Roast") && "🔥"}
                        {item.mood.includes("Funny") && "😂"}
                        {item.mood.includes("Sad") && "😢"}
                        {item.mood}
                    </div>
                </div>
            </div>

            <CardContent className="p-6 relative">
                <div className="absolute top-4 right-4 z-10">
                    <Button
                        onClick={() => copyToClipboard(item.reply, index)}
                        className="bg-accent/10 hover:bg-accent/20 p-2 h-auto text-foreground rounded-full"
                    >
                        {copied === index ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                </div>
                <div className="pr-10">
                    <p className="text-lg md:text-xl font-medium leading-relaxed tracking-tight">{item.reply}</p>
                </div>
            </CardContent>
        </Card>
    );

    const [images, setImages] = React.useState<File[]>([])
    const [imagePreviews, setImagePreviews] = React.useState<string[]>([])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            setImages(prev => [...prev, ...newFiles])

            newFiles.forEach(file => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setImagePreviews(prev => [...prev, reader.result as string])
                }
                reader.readAsDataURL(file)
            })
        }
    }


    const handlePaste = (e: React.ClipboardEvent) => {
        const items = e.clipboardData.items
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
                const file = items[i].getAsFile()
                if (file) {
                    setImages(prev => [...prev, file])
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        setImagePreviews(prev => [...prev, reader.result as string])
                    }
                    reader.readAsDataURL(file)
                    e.preventDefault()
                }
            }
        }
    }



    const handleSubmit = async () => {
        if (!input && images.length === 0) return

        setLoading(true)
        setResult(null)

        try {
            let body: any = { text: input, language: language }

            if (images.length > 0 && imagePreviews.length > 0) {
                body.image = images.map((img, idx) => ({
                    data: imagePreviews[idx].split(',')[1],
                    mimeType: img.type
                }))
            }

            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })

            const data = await response.json()
            if (data.error === "RATE_LIMIT_EXCEEDED" || response.status === 429) {
                setResult([{
                    reply: "SERVER_OVERLOAD_PREMIUM_CTA",
                    mood: "System"
                }]);
                return;
            }
            if (data.error) throw new Error(data.error)
            setResult(data.result)
        } catch (error) {
            console.error(error)
            setResult([{ reply: "OOF. Even the AI is speechless (or overloaded). Try again?", mood: "Error" }])
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text)
        setCopied(index)
        setTimeout(() => setCopied(false), 2000)
    }

    const [copied, setCopied] = React.useState<number | false>(false)


    return (
        <div className="w-full max-w-lg mx-auto">
            <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden relative z-30">
                <CardHeader>
                    <CardTitle className="text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-3xl font-extrabold">
                        Generate Rizz
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Textarea
                            placeholder="Paste the chat or describe the situation..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onPaste={handlePaste}
                            className="resize-none min-h-[100px] border-border/50 focus:border-primary/50 bg-background/50 text-foreground placeholder:text-muted-foreground"
                        />


                        <label htmlFor="image-upload" className="cursor-pointer inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors p-2 rounded-md hover:bg-muted/50">
                            <Upload className="w-4 h-4" />
                            {images.length > 0 ? "Add More" : "Upload Screenshot"}
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                        {images.length > 0 && <span className="text-xs text-green-500 truncate max-w-[150px]">{images.length} images selected</span>}


                        <div className="ml-auto flex gap-2">
                            {["English", "Hindi", "Hinglish"].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setLanguage(lang)}
                                    className={`text-xs px-3 py-1.5 rounded-full transition-all border ${language === lang
                                        ? "bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                                        : "border-border/50 text-muted-foreground hover:bg-muted/50"
                                        }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>


                    {imagePreviews.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {imagePreviews.map((preview, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative rounded-lg overflow-hidden border border-white/10 shrink-0"
                                >
                                    <img src={preview} alt={`Preview ${idx}`} className="w-20 h-20 object-cover" />
                                    <button
                                        onClick={() => {
                                            setImages(prev => prev.filter((_, i) => i !== idx))
                                            setImagePreviews(prev => prev.filter((_, i) => i !== idx))
                                        }}
                                        className="absolute top-0 right-0 bg-black/50 hover:bg-red-500/80 rounded-bl-lg p-1 text-white transition-colors"
                                    >
                                        ✕
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}



                    <Button
                        onClick={handleSubmit}
                        disabled={loading || (!input && images.length === 0)}

                        className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-6 text-lg shadow-lg shadow-purple-500/20"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Cooking...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-5 w-5" /> Rizz Me Up
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            <AnimatePresence>
                {result && Array.isArray(result) && result[0]?.reply === "SERVER_OVERLOAD_PREMIUM_CTA" ? (
                    <div className="relative w-full mt-12 flex justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-md bg-gradient-to-br from-gray-900 to-black border border-pink-500/50 rounded-2xl p-8 text-center shadow-[0_0_50px_rgba(236,72,153,0.3)]"
                        >
                            <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                <Sparkles className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-2">
                                Limit Reached!
                            </h3>
                            <p className="text-gray-400 mb-6">
                                You're too popular! Our free servers are smoking. upgrade to keep the Rizz flowing.
                            </p>
                            <Button className="w-full bg-gradient-to-r from-pink-600 to-violet-600 hover:opacity-90 text-white font-bold py-6 text-lg"
                                onClick={() => window.open("https://topmate.io/tusharbhardwaj", "_blank")}
                            >
                                Contact MiniAnon for Premium 💎
                            </Button>
                        </motion.div>
                    </div>
                ) : result && Array.isArray(result) && (
                    <div className="relative w-screen -ml-[calc(50vw-50%)] mt-12 flex justify-center">
                        <div className="w-full max-w-7xl px-4">

                            {/* Desktop Flow Layout (Hidden on Mobile) */}
                            <div className="hidden md:flex justify-between items-center w-full max-w-5xl mx-auto relative min-h-[500px]">

                                {/* SVG Connectors Layer */}
                                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
                                    <defs>
                                        <linearGradient id="gradientLineLeft" x1="100%" y1="50%" x2="0%" y2="50%">
                                            <stop offset="0%" stopColor="rgba(236, 72, 153, 0.5)" />
                                            <stop offset="100%" stopColor="rgba(236, 72, 153, 0)" />
                                        </linearGradient>
                                        <linearGradient id="gradientLineRight" x1="0%" y1="50%" x2="100%" y2="50%">
                                            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.5)" />
                                            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                                        </linearGradient>
                                    </defs>
                                    {/* Left Top Connection */}
                                    <path d="M 50% 50% C 40% 50%, 25% 20%, 15% 20%" fill="none" stroke="url(#gradientLineLeft)" strokeWidth="2" strokeDasharray="5 5" className="opacity-40" />
                                    {/* Left Bottom Connection */}
                                    <path d="M 50% 50% C 40% 50%, 25% 80%, 15% 80%" fill="none" stroke="url(#gradientLineLeft)" strokeWidth="2" strokeDasharray="5 5" className="opacity-40" />
                                    {/* Right Top Connection */}
                                    <path d="M 50% 50% C 60% 50%, 75% 20%, 85% 20%" fill="none" stroke="url(#gradientLineRight)" strokeWidth="2" strokeDasharray="5 5" className="opacity-40" />
                                    {/* Right Bottom Connection */}
                                    <path d="M 50% 50% C 60% 50%, 75% 80%, 85% 80%" fill="none" stroke="url(#gradientLineRight)" strokeWidth="2" strokeDasharray="5 5" className="opacity-40" />
                                </svg>

                                {/* Left Column */}
                                <div className="flex flex-col gap-32 z-10 w-[300px]">
                                    {[0, 2].map((idx) => result[idx] && (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + (idx * 0.1) }}
                                        >
                                            <ResultCard item={result[idx]} index={idx} copied={copied} copyToClipboard={copyToClipboard} getGifUrl={getGifUrl} />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Center Anchor */}
                                <div className="z-20 relative">
                                    <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-sm border border-pink-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.5)] animate-pulse">
                                        <img src="/logo.svg" alt="MiniRizz Logo" className="w-12 h-12" />
                                    </div>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-center whitespace-nowrap">
                                        <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Your Rizz</span>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="flex flex-col gap-32 z-10 w-[300px]">
                                    {[1, 3].map((idx) => result[idx] && (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + (idx * 0.1) }}
                                        >
                                            <ResultCard item={result[idx]} index={idx} copied={copied} copyToClipboard={copyToClipboard} getGifUrl={getGifUrl} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Stack Layout (Fallback) */}
                            <div className="md:hidden flex flex-col gap-6 w-full max-w-md mx-auto mt-8">
                                {result.map((item, index) => (
                                    <ResultCard key={index} item={item} index={index} copied={copied} copyToClipboard={copyToClipboard} getGifUrl={getGifUrl} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div >
    )
}
