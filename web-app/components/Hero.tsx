"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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
        <section id="home" className="relative overflow-hidden px-4 pb-16 pt-36 md:px-8 md:pt-40">
            <div className="absolute inset-0 z-0 opacity-20" style={{
                backgroundImage: `linear-gradient(rgba(224,201,122,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(224,201,122,0.12) 1px, transparent 1px)`,
                backgroundSize: "42px 42px"
            }} />

            <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
                <div className="space-y-7">
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                        Case Timeline · Since Jan 19, 1994
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl font-black leading-[0.95] sm:text-6xl lg:text-7xl">
                        Detective news,
                        <span className="block bg-gradient-to-r from-gold to-gold-light bg-clip-text italic text-transparent">designed like a case board.</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
                        Explore character dossiers, canon timeline insights, and breaking updates with a cinematic reading experience tuned for fans.
                    </motion.p>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="rounded-2xl border border-white/10 bg-card/70 p-4 backdrop-blur-sm">
                        <p key={quoteIdx} className="animate-in slide-in-from-bottom-2 font-display text-lg italic text-white/90 duration-500">
                            &ldquo;{detectiveQuotes[quoteIdx]}&rdquo;
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="#news" className="rounded-xl bg-gold px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-ink hover:bg-gold-light">
                            Open News Archive
                        </Link>
                        <Link href="/author" className="rounded-xl border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white hover:border-gold/40 hover:text-gold">
                            Meet the Creator
                        </Link>
                    </div>
                </div>

                <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative">
                    <div className="rounded-3xl border border-white/10 bg-card/80 p-6 backdrop-blur-lg">
                        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                            <span>Investigation Board</span>
                            <span className="text-gold">Live</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            {[
                                ["Episodes", "1100+"],
                                ["Movies", "28"],
                                ["Manga Volumes", "107+"],
                                ["Years Running", "30+"],
                            ].map(([k, v]) => (
                                <div key={k} className="rounded-xl border border-white/10 bg-ink/70 p-3">
                                    <div className="font-mono uppercase tracking-wide text-muted">{k}</div>
                                    <div className="mt-1 font-display text-2xl font-bold text-gold">{v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
