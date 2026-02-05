import fs from 'fs';
import path from 'path';

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
    console.error("❌ No GEMINI_API_KEY found");
    process.exit(1);
}

console.log(`🔑 Testing API Key: ${apiKey.substring(0, 5)}...`);

async function checkModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("❌ API Error:", JSON.stringify(data.error, null, 2));
            return;
        }

        console.log("✅ Available Models:");
        data.models.forEach(m => {
            if (m.name.includes("gemini")) {
                console.log(`- ${m.name} (${m.supportedGenerationMethods.join(', ')})`);
            }
        });

    } catch (error) {
        console.error("❌ Network Error:", error);
    }
}

checkModels();
