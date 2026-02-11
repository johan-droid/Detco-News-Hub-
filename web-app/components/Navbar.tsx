"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link"; // Added Import

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const sections = [
        { id: "home", label: "Home" },
        { id: "about", label: "About Anime" },
        { id: "characters", label: "Characters" },
        { id: "news", label: "Latest News" },
    ];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-300 ${scrolled
                ? "bg-ink/95 backdrop-blur-md border-b border-gold/15 py-3"
                : "bg-transparent border-b border-transparent"
                }`}
        >
            <div
                className="flex items-center gap-2 cursor-pointer select-none group"
                onClick={() => scrollTo("home")}
            >
                <Search className="w-6 h-6 text-gold transition-transform group-hover:scale-110" />
                <span className="font-display font-bold text-lg tracking-widest text-white">
                    DETCO<span className="text-gold">NEWS</span>HUB
                </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex gap-8">
                {["Home", "About", "Characters", "News", "Author"].map((item) => (
                    <Link
                        key={item}
                        href={item === "Home" ? "/" : item === "Admin" ? "/admin" : item === "Author" ? "/author" : `/#${item.toLowerCase()}`}
                        className="font-mono text-sm tracking-widest text-muted hover:text-gold transition-colors uppercase"
                    >
                        {item}
                    </Link>
                ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden text-gold hover:text-white transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-full left-0 right-0 bg-ink border-b border-gold/20 flex flex-col p-4 md:hidden animate-in slide-in-from-top-2 shadow-2xl">
                    {["Home", "About", "Characters", "News", "Author"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Home" ? "/" : item === "Admin" ? "/admin" : item === "Author" ? "/author" : `/#${item.toLowerCase()}`}
                            className="font-mono text-left py-4 px-6 text-lg text-muted hover:text-white hover:bg-white/10 transition-all uppercase border-b border-white/5 last:border-0 active:bg-gold/20 active:text-gold"
                            onClick={() => setMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
