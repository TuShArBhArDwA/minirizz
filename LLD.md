# Low-Level Design (LLD) - MiniRizz

## 1. Directory Structure
```
src/
├── app/
│   ├── api/generate/route.ts  # API Handler
│   ├── layout.tsx             # Root Layout (Theme, Fonts)
│   └── page.tsx               # Main Landing Page
├── components/
│   ├── landing/
│   │   ├── features.tsx       # Features Section & Grid
│   │   ├── feature-demos.tsx  # Micro-animations (Typing, Hearts, etc)
│   │   ├── how-it-works.tsx   # "How It Works" Section
│   │   ├── phone-demo.tsx     # Full Phone Simulation Component
│   │   ├── hero.tsx           # Hero Section
│   │   └── video-cards.tsx    # (Deprecated/Merged into features)
│   ├── ui/                    # Shadcn UI Components (Button, Card, etc)
│   ├── header.tsx             # Navigation Header
│   ├── footer.tsx             # Application Footer
│   ├── rizz-input.tsx         # Main Logic Component (Input + Results)
│   └── theme-provider.tsx     # Next-Themes Provider
└── lib/
    └── utils.ts               # CN Helper
```

## 2. Component Details

### 2.1 `RizzInput` Component
*   **State:**
    *   `input`: String (User text)
    *   `images`: File[] (User screenshots)
    *   `result`: Array (AI responses)
    *   `loading`: Boolean
    *   `language`: String (English/Hindi/Hinglish)
*   **Functions:**
    *   `handleImageChange()`: Processes file uploads/previews.
    *   `handleSubmit()`: Sends payload to `/api/generate`.
    *   `getGifUrl(mood)`: Returns relevant GIF based on mood string.
*   **Visuals:**
    *   Uses a "Breakout" container logic for the Results Flow layout (SVG Connectors).

### 2.2 `PhoneDemo` Component
*   **Logic:** Uses a `setInterval` loop to cycle through `steps` (0-9).
*   **States:**
    *   `step`: Controls the timeline of the animation.
    *   `app`: Switches between "whatsapp" and "browser" views.
*   **Animations:** `AnimatePresence` handles clean exits/entries between app switches.

## 3. API Logic (`/app/api/generate/route.ts`)
*   **Request:** `POST { text: string, image: base64, language: string }`
*   **Process:**
    1.  Initialize GoogleGenerativeAI client.
    2.  Construct prompt: "You are a dating coach..."
    3.  If images exist, append to prompt.
    4.  Request JSON output schema: `[{ reply: string, mood: string }]`.
    5.  Parse AI text response to JSON.
*   **Response:** `JSON { result: [...] }`

## 4. Design System & Styling
*   **Tailwind Config:** Custom colors, animation utilities (`animate-pulse`, `animate-spin-slow`).
*   **Theme:** Dark mode default, with "Premium SaaS" gradients (Pink/Violet/Emerald).
*   **Fonts:** Inter (Google Fonts).

## 5. Error Handling
*   **API:** Try/Catch blocks for Gemini API calls. Returns discrete error messages.
*   **UI:** Basic alerts for empty inputs. Fallback GIF for unknown moods.
