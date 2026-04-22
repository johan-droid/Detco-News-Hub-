"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const pathname = usePathname();

    const sections = [
        { id: "home", label: "Home", href: "/" },
        { id: "about", label: "About", href: "/#about" },
        { id: "characters", label: "Characters", href: "/#characters" },
        { id: "news", label: "News", href: "/#news" },
        { id: "author", label: "Author", href: "/author" },
    ];

    useEffect(() => {
        if (pathname !== "/") return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
        );

        ["about", "characters", "news"].forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        const onScroll = () => {
            if (window.scrollY < 100) setActiveSection("home");
        };

        window.addEventListener("scroll", onScroll);
        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", onScroll);
        };
    }, [pathname]);

    const currentActiveSection = pathname !== "/" ? (pathname === "/author" ? "author" : "home") : activeSection;

    return (
        <>
            <nav className="fixed top-4 left-1/2 z-50 w-[calc(100%-1.2rem)] max-w-6xl -translate-x-1/2 rounded-2xl border border-white/10 bg-ink/80 px-4 py-3 backdrop-blur-xl md:px-6">
                <div className="flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-2.5 select-none group">
                        <span className="rounded-lg border border-gold/40 bg-gold/10 p-1.5">
                            <Search className="h-4 w-4 text-gold transition-transform group-hover:scale-110" />
                        </span>
                        <span className="font-display text-sm font-bold tracking-[0.2em] text-white md:text-base">
                            DETCO<span className="text-gold">NEWS</span>HUB
                        </span>
                    </Link>

                    <div className="hidden items-center gap-3 md:flex">
                        {sections.map((section) => {
                            const isActive = currentActiveSection === section.id;
                            return (
                                <Link
                                    key={section.id}
                                    href={section.href}
                                    className={`rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-all ${
                                        isActive
                                            ? "bg-gold text-ink"
                                            : "text-muted hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    {section.label}
                                </Link>
                            );
                        })}
                        <Link href="/login" className="rounded-full border border-gold/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-gold hover:bg-gold hover:text-ink">
                            Admin
                        </Link>
                    </div>

                    <button
                        className="md:hidden text-gold"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {menuOpen && <div className="fixed inset-0 z-[60] bg-black/70 md:hidden" onClick={() => setMenuOpen(false)} />}

            {menuOpen && (
                <div className="fixed left-4 right-4 top-24 z-[70] rounded-2xl border border-white/15 bg-deep/95 p-2 backdrop-blur-xl md:hidden">
                    {sections.map((section) => {
                        const isActive = currentActiveSection === section.id;
                        return (
                            <Link
                                key={section.id}
                                href={section.href}
                                onClick={() => setMenuOpen(false)}
                                className={`block rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-widest ${
                                    isActive ? "bg-gold/20 text-gold" : "text-white hover:bg-white/10"
                                }`}
                            >
                                {section.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    );
}
