# MiniRizz

**Your AI Wingman for the Digital Age.**

MiniRizz is a premium, AI-powered tool designed to help you craft the perfect witty, romantic, or savage responses for your chats. Upload a screenshot or paste text, and let our AI generate the "Rizz".

![MiniRizz Banner](https://img.shields.io/badge/Status-Active-success?style=flat-square) ![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

## Features

*   **Multimodal Input:** Text or Screenshot analysis.
*   **Mood-Based Modes:**
    *   **Rizz** (Smooth/Flirty)
    *   **Roast** (Savage/Witty)
    *   **Funny** (Humorous)
    *   **Ghost-Proof** (Engagement)
*   **Visual "Flow" Results:** Results displayed in a beautiful Mind Map layout.
*   **Multilingual:** Supports English, Hindi, and Hinglish.
*   **Privacy Focused:** No data storage; processing is transient.

## Tech Stack

*   **Frontend:** Next.js 14 (App Router), React, TypeScript
*   **Styling:** Tailwind CSS, Shadcn UI
*   **Animations:** Framer Motion
*   **AI:** Google Gemini 1.5 Flash + Groq (Llama 3.3) for redundancy
*   **Icons:** Lucide React

## Getting Started

### Prerequisites
*   Node.js 18+
*   Google Gemini API Key
*   Groq API Key (Optional, for failover)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/TuShArBhArDwA/minirizz.git
    cd minirizz
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file:
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    GROQ_API_KEY=your_groq_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

*   `src/app`: Next.js pages and API routes.
*   `src/components`: React components (UI, Landing, Logic).
*   `src/lib`: Utility functions.

## Documentation

| Document | Description |
|----------|-------------|
| [High-Level Design (HLD)](docs/HLD.md) | System architecture, components, and data flow |
| [Low-Level Design (LLD)](docs/LLD.md) | Database schema, API endpoints, and execution flow |

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Connect with me

If you'd like to connect, feel free to reach out — [Click here](https://minianonlink.vercel.app/tusharbhardwaj)
