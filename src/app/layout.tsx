import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Header } from "@/components/header";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MiniRizz - Gen Z AI Rizz Generator",
  description: "Get the best rizz reply suggestions instantly. AI dating assistant.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen relative overflow-hidden bg-background items-center">
            {/* Abstract Background Elements */}
            <div className="fixed top-0 left-0 w-full h-[500px] bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/20 blur-[120px] rounded-full translate-y-1/2 pointer-events-none" />

            {/* Header Extracted */}
            <Header />

            <main className="flex-1 w-full max-w-5xl flex flex-col items-center justify-center p-4 pt-24 z-10">
              {children}
            </main>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
