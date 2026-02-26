"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const detectiveQuotes = [
    "There is always only one truth.",
    "A detective who gets scared by danger is no detective at all.",
    "The darker the night, the brighter the stars.",
    "Every lie leaves a trace. You just have to find it.",
];

export default function Hero() {
    const [quoteIdx, setQuoteIdx] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setQuoteIdx((i) => (i + 1) % detectiveQuotes.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8 pt-20 md:pt-24 pb-12"
        >
            {/* Background Grid - Enhanced for mobile */}
            <div
                className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(224,201,122,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(224,201,122,0.15) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px"
                }}
            />

            {/* Enhanced Background Orbs - Mobile Optimized */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[200px] sm:w-[300px] md:w-[500px] h-[200px] sm:h-[300px] md:h-[500px] rounded-full bg-gradient-to-br from-accent/20 to-accent/10 blur-[40px] sm:blur-[60px] md:blur-[100px]" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[150px] sm:w-[250px] md:w-[400px] h-[150px] sm:h-[250px] md:h-[400px] rounded-full bg-gradient-to-tr from-gold/20 to-gold/10 blur-[40px] sm:blur-[60px] md:blur-[100px]" />
                <div className="absolute top-[40%] left-[40%] w-[120px] sm:w-[200px] md:w-[300px] h-[120px] sm:h-[200px] md:h-[300px] rounded-full bg-gradient-to-br from-purple/15 to-purple/5 blur-[30px] sm:blur-[50px] md:blur-[80px]" />
            </div>

            <div className="relative z-10 max-w-4xl w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Content */}
                <div className="space-y-4 md:space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-mono text-xs md:text-sm tracking-[0.2em] text-gold uppercase"
                    >
                        Case No. 001 · Est. 1994
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="font-display font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-white drop-shadow-lg"
                    >
                        <span className="block">DETECTIVE</span>
                        <span className="block text-gold italic tracking-wide bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">CONAN</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-auto md:h-20 min-h-[60px]"
                    >
                        <div className="border-l-4 border-gold pl-3 md:pl-4 py-1">
                            <p key={quoteIdx} className="font-display italic text-base md:text-lg lg:text-xl text-white/80 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                "{detectiveQuotes[quoteIdx]}"
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-2 md:pt-4"
                    >
                        <a href="#about" className="bg-gradient-to-r from-gold to-gold-light text-ink font-mono text-xs md:text-sm tracking-widest font-bold py-3.5 px-6 md:py-4 md:px-8 uppercase hover:from-gold-light hover:to-gold transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/30 text-center min-h-[44px] flex items-center justify-center">
                            Start Investigating
                        </a>
                        <a href="#news" className="flex items-center justify-center sm:justify-start gap-2 text-muted hover:text-white font-mono text-xs md:text-sm tracking-widest uppercase transition-all group min-h-[44px]">
                            Latest News <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </motion.div>
                </div>

                {/* Visual Element (Icon/Graphic) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="relative hidden md:flex justify-center"
                >
                    <div className="w-80 h-80 rounded-full border border-gold/20 flex items-center justify-center relative animate-[spin_60s_linear_infinite]">
                        <div className="w-[80%] h-[80%] rounded-full border border-gold/10 flex items-center justify-center">
                            <span className="text-9xl filter drop-shadow-[0_0_15px_rgba(201,168,76,0.5)]">🔎</span>
                        </div>
                    </div>

                    {/* Floating Badges */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute top-10 right-10 bg-card border border-gold/30 p-4 shadow-xl backdrop-blur-md"
                    >
                        <div className="font-mono text-xs text-gold tracking-widest">ONE TRUTH</div>
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-10 left-10 bg-card border border-accent/30 p-4 shadow-xl backdrop-blur-md"
                    >
                        <div className="font-mono text-xs text-accent tracking-widest">MANGA 1994</div>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-muted/50"
            >
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll to investigate</span>
                <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent" />
            </motion.div>
        </section>
    );
}
