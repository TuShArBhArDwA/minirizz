import { GoogleGenerativeAI } from "@google/generative-ai";
import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

// Initialize Clients
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req: Request) {
    try {
        const { text, image, language = "English" } = await req.json();

        if (!text && !image) {
            return NextResponse.json({ error: "Input required" }, { status: 400 });
        }

        const languagePrompt = language === "Hindi" ? "Response MUST be in Hindi (Devanagari script)." :
            language === "Hinglish" ? "Response MUST be in Hinglish (Hindi mixed with English using Latin characters)." :
                "Response MUST be in English.";

        const systemPrompt = `You are a 'Rizz God', a Gen Z dating expert. Your goal is to provide a witty, smooth, and charismatic reply to the given text or screenshot of a chat. 
        
        ${languagePrompt}
        
        Provide EXACTLY 4 distinct options with different moods/styles in the following JSON format:
        [
            { "reply": "...", "mood": "Rizz (Smooth/Flirty)" },
            { "reply": "...", "mood": "Roast (Savage/Funny)" },
            { "reply": "...", "mood": "Funny (Witty/Light)" },
            { "reply": "...", "mood": "Sad (Emotional/Comforting)" }
        ]
        
        Keep replies short, punchy, and use Gen Z slang appropriately. DO NOT output markdown code blocks, just the raw JSON.`;

        let result = null;
        let usedProvider = "";
        let debugLog = [];

        // ---------------------------------------------------------
        // STRATEGY 1: TRY GEMINI (Primary - Multimodal Expert)
        // ---------------------------------------------------------
        try {
            if (!process.env.GEMINI_API_KEY) throw new Error("Gemini Key Missing");

            console.log("Attempting Gemini...");
            const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro"];

            let geminiPrompt = systemPrompt;
            if (text) geminiPrompt += `\n\nContext/Message: "${text}"`;

            const parts: any[] = [geminiPrompt];

            if (image) {
                if (Array.isArray(image)) {
                    image.forEach((img: any) => parts.push({ inlineData: { data: img.data, mimeType: img.mimeType || "image/jpeg" } }));
                } else {
                    parts.push({ inlineData: { data: image, mimeType: "image/jpeg" } });
                }
            }

            for (const modelName of modelsToTry) {
                try {
                    const model = genAI.getGenerativeModel({ model: modelName, generationConfig: { responseMimeType: "application/json" } });
                    const response = await model.generateContent(parts);
                    const outputText = response.response.text();
                    result = parseJSON(outputText);
                    usedProvider = `Gemini (${modelName})`;
                    break;
                } catch (e: any) {
                    console.log(`Gemini ${modelName} failed: ${e.message}`);
                    debugLog.push(`Gemini ${modelName}: ${e.message}`);
                }
            }
        } catch (e: any) {
            console.log("Gemini Provider Failed totally");
        }

        // ---------------------------------------------------------
        // STRATEGY 2: TRY GROQ (Failover - Fast & Reliable)
        // ---------------------------------------------------------
        if (!result && process.env.GROQ_API_KEY) {
            console.log("Failover to Groq...");
            try {
                // Determine model based on input type
                // Llama 3.2 11b Vision is great for images
                // Llama 3.3 70b Versatile is the current standard for text (replaced decommissioned llama3-70b-8192)
                const isVision = !!image;
                const modelId = isVision ? "llama-3.2-11b-vision-preview" : "llama-3.3-70b-versatile";

                let messages: any[] = [
                    { role: "system", content: systemPrompt }
                ];

                if (isVision && image) {
                    // Vision Request
                    // Note: Groq expects image_url with data URI
                    const imgData = Array.isArray(image) ? image[0].data : image; // Take first image for now if multi
                    const content = [
                        { type: "text", text: text ? `Context: ${text}` : "Analyze this chat screenshot." },
                        { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imgData}` } }
                    ];
                    messages.push({ role: "user", content: content });
                } else {
                    // Text Request
                    messages.push({ role: "user", content: text || "Generate generic rizz." });
                }

                const completion = await groq.chat.completions.create({
                    messages: messages,
                    model: modelId,
                    temperature: 0.7,
                    max_tokens: 1024,
                    response_format: { type: "json_object" }
                });

                const outputText = completion.choices[0]?.message?.content || "";
                result = parseJSON(outputText);
                usedProvider = `Groq (${modelId})`;

            } catch (e: any) {
                console.error("Groq Failed:", e.message);
                debugLog.push(`Groq: ${e.message}`);
            }
        }

        // ---------------------------------------------------------
        // FINAL CHECK
        // ---------------------------------------------------------
        if (!result) {
            console.error("All Providers Failed:", debugLog);
            // TRIGGER THE PREMIUM CTA on Frontend
            return NextResponse.json(
                { error: "RATE_LIMIT_EXCEEDED", message: "All AI providers exhausted." },
                { status: 429 }
            );
        }

        return NextResponse.json({ result: result, provider: usedProvider });

    } catch (error: any) {
        console.error("Critical AI Error:", error);
        return NextResponse.json({ error: "Failed to generate rizz." }, { status: 500 });
    }
}

function parseJSON(text: string) {
    try {
        // Sanitize
        const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const json = JSON.parse(cleaned);

        // Handle Groq sometimes returning { "options": [...] } wrapper
        if (json.options && Array.isArray(json.options)) return json.options;
        if (Array.isArray(json)) return json;

        // If single object, wrap
        return [json];
    } catch (e) {
        console.error("JSON Parse Error", text);
        return null;
    }
}
