import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

// Load env manually since we are running a standalone script
const envLocalPath = path.resolve(process.cwd(), '.env.local');
let apiKey = process.env.GEMINI_API_KEY;

if (!apiKey && fs.existsSync(envLocalPath)) {
    const envContent = fs.readFileSync(envLocalPath, 'utf-8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (match) {
        apiKey = match[1].trim();
    }
}

if (!apiKey) {
    console.error("❌ No GEMINI_API_KEY found in environment or .env.local");
    process.exit(1);
}

console.log(`🔑 Found API Key: ${apiKey.substring(0, 4)}...`);

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        console.log("🔄 Fetching available models...");
        // Note: listModels is not directly exposed on genAI instance in some versions, 
        // but usually accessible via direct API call or ModelService. 
        // However, the node SDK usually exposes it via `genAI.getGenerativeModel`... 
        // Wait, the SDK doesn't always have a simple 'listModels' helper on the root client in earlier versions.
        // Let's try to just use a known model and generate 'hello' to verify access.

        // Testing specific models
        const modelsToTest = ["gemini-1.5-flash", "gemini-1.5-flash-001", "gemini-pro"];

        for (const modelName of modelsToTest) {
            console.log(`\nTesting model: ${modelName}...`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                const response = await result.response;
                console.log(`✅ ${modelName} WORKS! Response: ${response.text().substring(0, 20)}...`);
            } catch (e) {
                console.error(`❌ ${modelName} FAILED: ${e.message.split('\n')[0]}`);
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
