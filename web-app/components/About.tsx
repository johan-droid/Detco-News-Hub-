"use client";

import { motion } from "framer-motion";
import { BookOpen, Film, Clock, Search, Tv } from "lucide-react";

const stats = [
    { label: "Episodes", value: "1100+", icon: Tv },
    { label: "Manga Volumes", value: "107+", icon: BookOpen },
    { label: "Movies", value: "28", icon: Film },
    { label: "Years Running", value: "30+", icon: Clock },
    { label: "Cases Solved", value: "1000+", icon: Search },
];

export default function About() {
    return (
        <section id="about" className="relative bg-deep py-12 md:py-20 px-4 md:px-8">
            {/* Stats Strip */}
            <div className="max-w-6xl mx-auto mb-12 md:mb-24">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 border-y border-white/5 py-6 md:py-8">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center justify-center text-center gap-1.5 md:gap-2 group"
                        >
                            <s.icon className="w-5 h-5 md:w-6 md:h-6 text-muted group-hover:text-gold transition-colors" />
                            <div className="font-display font-black text-2xl md:text-3xl text-gold">{s.value}</div>
                            <div className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-muted">{s.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-start">
                {/* Left Column: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4 md:space-y-6"
                >
                    <div className="flex items-center gap-3 md:gap-4 mb-2">
                        <span className="w-8 md:w-12 h-px bg-gold" />
                        <span className="font-mono text-xs tracking-widest text-gold uppercase">About the Anime</span>
                    </div>

                    <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
                        The World&apos;s Greatest <br />
                        <span className="text-accent italic">Little Detective</span>
                    </h2>

                    <div className="space-y-3 md:space-y-4 text-base md:text-lg text-muted/80 leading-relaxed font-body">
                        <p>
                            <strong className="text-gold">Detective Conan (Case Closed)</strong> is a Japanese manga series written
                            and illustrated by <strong className="text-gold">Gosho Aoyama</strong>, serialized in
                            <em> Weekly Shōnen Sunday</em> since January 19, <strong>1994</strong>.
                        </p>
                        <p>
                            The story follows <strong className="text-accent">Shinichi Kudo</strong>, a brilliant high school detective
                            who is shrunk into the body of a child after being poisoned by the mysterious
                            <strong className="text-red"> Black Organization</strong>. Adopting the alias
                            <strong className="text-accent"> Conan Edogawa</strong>, he solves cases while seeking a cure —
                            and hunting the criminals who did this to him.
                        </p>
                        <p className="border-l-2 border-gold/30 pl-3 md:pl-4 py-1 italic text-white/90 text-sm md:text-base">
                            &quot;There is always only one truth.&quot;
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 md:pt-4">
                        {["Mystery", "Thriller", "Shōnen", "Adventure", "Romance", "Crime"].map((tag) => (
                            <span key={tag} className="px-2.5 md:px-3 py-1 border border-white/10 text-[10px] md:text-xs font-mono uppercase tracking-wider text-muted hover:border-gold/50 hover:text-gold transition-colors cursor-default">
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Right Column: Info Card */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-card border border-white/5 p-8 relative"
                >
                    <div className="absolute top-0 right-0 p-2 opacity-5">
                        <Search size={120} />
                    </div>
                    <div className="font-mono text-gold text-xs tracking-widest uppercase mb-6 border-b border-white/5 pb-2">
                        📋 Series At A Glance
                    </div>

                    <div className="space-y-4 font-mono text-sm">
                        {[
                            ["Original Title", "名探偵コナン (Meitantei Conan)"],
                            ["Author", "Gosho Aoyama"],
                            ["Serialized In", "Weekly Shōnen Sunday"],
                            ["Manga Start", "January 19, 1994"],
                            ["Anime Start", "January 8, 1996"],
                            ["Studio", "TMS Entertainment"],
                        ].map(([k, v]) => (
                            <div key={k} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                                <span className="text-muted/60 uppercase text-[10px] tracking-wider">{k}</span>
                                <span className="text-white text-right">{v}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
