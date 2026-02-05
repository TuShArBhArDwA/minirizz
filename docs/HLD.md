# High-Level Design (HLD) - MiniRizz

## 1. Introduction
MiniRizz is an AI-powered dating assistant application designed to help users generate witty, romantic, or funny responses to chat messages. It leverages modern web technologies and Generative AI to provide a premium, engaging user experience.

## 2. System Architecture
The application follows a **Monolithic Client-Server Architecture** using the Next.js framework, which handles both the frontend UI and the backend API routes.

### 2.1 High-Level Diagram
```mermaid
graph TD
    User[User (Browser)] <-->|HTTPS| CDN[Vercel Edge Network]
    CDN <-->|Next.js App Router| App[MiniRizz Application]
    
    subgraph "MiniRizz Application"
        UI[Frontend UI (React/Tailwind)]
        API[Backend API (/api/generate)]
    end
    
    UI -->|JSON Request| API
    API -->|Attempt 1| Gemini[Google Gemini AI]
    API -->|Attempt 2 (Failover)| Groq[Groq Llama 3]
    Gemini -->|Success| API
    Groq -->|Success| API
    API -->|JSON Response| UI
```

## 3. Key Components
1.  **Frontend (Client-Side):**
    *   **Landing Page:** Engaging hero section, feature showcase with micro-animations, and a "How It Works" phone simulation.
    *   **Rizz Generator:** Interactive input form (Text/Image) and "Flow" style result display.
    *   **Animations:** Uses `framer-motion` for complex sequences (Phone Demo, Card Flows).

2.  **Backend (Server-Side):**
    *   **API Route (`/api/generate`):** Handles requests, validates inputs, formats prompts for the AI model, and processes the AI response.

3.  **External Services:**
    *   **Google Gemini AI:** Primary multimodal models (1.5 Flash).
    *   **Groq Cloud:** Ultra-fast failover provider (Llama 3.3 70b / 3.2 11b Vision).

## 4. User Flow
1.  User lands on the application.
2.  User inputs a chat message (text) or uploads a screenshot (image).
3.  User selects a language (English, Hindi, Hinglish).
4.  User clicks "Rizz Me Up".
5.  System processes input -> Calls Gemini API -> Returns 4 distinct mood-based replies (Rizz, Roast, Funny, Sad).
6.  Results are displayed in a "Mind Map" flow layout.

## 5. Technology Stack
*   **Framework:** Next.js 14+ (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS + Shadcn UI
*   **Animations:** Framer Motion
*   **AI Model:** Google Gemini 1.5 Flash
*   **Icons:** Lucide React
