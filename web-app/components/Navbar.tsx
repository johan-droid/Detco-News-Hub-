"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
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
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Track active section based on scroll position
    useEffect(() => {
        // If not on home page, set active based on pathname
        if (pathname !== "/") {
            if (pathname === "/author") {
                setActiveSection("author");
            }
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        const sectionElements = ["about", "characters", "news"].map((id) =>
            document.getElementById(id)
        );

        sectionElements.forEach((el) => {
            if (el) observer.observe(el);
        });

        // Handle hero section separately (when at top)
        const handleScroll = () => {
            if (window.scrollY < 100) {
                setActiveSection("home");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            sectionElements.forEach((el) => {
                if (el) observer.unobserve(el);
            });
            window.removeEventListener("scroll", handleScroll);
        };
    }, [pathname]);

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
                {sections.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                        <Link
                            key={section.id}
                            href={section.href}
                            className="relative font-mono text-sm tracking-widest uppercase transition-colors group"
                        >
                            <span className={`${isActive ? "text-gold" : "text-muted group-hover:text-white"}`}>
                                {section.label}
                            </span>
                            {/* Active indicator line */}
                            <span
                                className={`absolute -bottom-1 left-0 h-[2px] bg-gold transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            />
                        </Link>
                    );
                })}
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
                    {sections.map((section) => {
                        const isActive = activeSection === section.id;
                        return (
                            <Link
                                key={section.id}
                                href={section.href}
                                className={`relative font-mono text-left py-4 px-6 text-lg uppercase border-b border-white/5 last:border-0 transition-all ${isActive
                                        ? "text-gold bg-gold/10 border-l-4 border-l-gold"
                                        : "text-muted hover:text-white hover:bg-white/10 active:bg-gold/20 active:text-gold"
                                    }`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {section.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    );
}
