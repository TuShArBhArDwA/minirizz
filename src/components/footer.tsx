import { Github, Twitter, Linkedin, Coffee } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t border-border/40 bg-background/50 backdrop-blur-md mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center p-6 gap-4">

                {/* Left: Buy Me a Coffee */}
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <span>Fuel my creativity?</span>
                    <a
                        href="https://buymeacoffee.com/tusharbhardwaj"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-pink-500 transition-colors border-b border-pink-500/30 hover:border-pink-500 pb-0.5"
                    >
                        <Coffee className="w-4 h-4" />
                        Buy me a coffee
                    </a>
                </div>

                {/* Right: Socials */}
                <div className="flex items-center gap-6">
                    <a href="https://github.com/TuShArBhArDwA" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors transform hover:scale-110">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://x.com/Tusharab2004" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors transform hover:scale-110">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/bhardwajtushar2004/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors transform hover:scale-110">
                        <Linkedin className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    )
}
