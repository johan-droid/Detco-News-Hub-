"use client";

import { motion } from "framer-motion";
import { PenTool, Calendar, Award, BookOpen, Star } from "lucide-react";
import BackButton from "@/components/BackButton";
import { useMemo } from "react";

const authorData = Object.freeze({
    name: "Gosho Aoyama",
    title: "Manga Artist & Creator",
    bio: "The legendary creator of Detective Conan (Case Closed), one of the longest-running and most beloved detective manga series in history.",
    skills: ["Manga Illustration", "Mystery Writing", "Character Design", "Storytelling", "Plot Development"],
    achievements: [
        { icon: BookOpen, title: "1000+ Chapters", description: "Over 1000 chapters of Detective Conan published" },
        { icon: Star, title: "Multiple Awards", description: "Winner of prestigious Shogakukan Manga Awards" },
        { icon: Award, title: "Cultural Icon", description: "Created one of Japan's most iconic detective series" }
    ]
});

export default function AuthorPage() {
    const skillsList = useMemo(() => authorData.skills, []);
    const achievementsList = useMemo(() => authorData.achievements, []);
    return (
        <main className="min-h-screen bg-ink text-white font-body selection:bg-gold/30 selection:text-white pt-24 pb-12">
            <div className="container mx-auto px-4">
                <BackButton className="mb-8" text="Back to Home" />
            </div>

            {/* Hero Section */}
            <section className="relative px-4 mb-24">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 text-[200px] text-white/5 font-display font-bold leading-none select-none">
                                GA
                            </div>
                            <h1 className="font-display font-bold text-5xl md:text-7xl mb-6 relative z-10">
                                {authorData.name.split(' ')[0]} <br />
                                <span className="text-gold italic">{authorData.name.split(' ')[1]}</span>
                            </h1>
                        </div>
                        <p className="text-muted text-lg leading-relaxed mb-8 border-l-2 border-gold/30 pl-6">
                            {authorData.bio}
                        </p>

                        <div className="flex gap-4 text-xs font-mono uppercase tracking-widest text-muted/60">
                            <span className="flex items-center gap-2"><PenTool size={14} className="text-gold" /> {authorData.title.split(' & ')[0]}</span>
                            <span className="flex items-center gap-2"><Star size={14} className="text-gold" /> {authorData.title.split(' & ')[1]}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-[3/4] rounded-lg overflow-hidden border border-white/10 bg-card/50 relative group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                            <img
                                src="https://detectiveconan.fandom.com/wiki/Special:FilePath/Gosho_Aoyama.jpg"
                                alt="Gosho Aoyama"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 p-8 z-20">
                                <div className="text-gold font-mono text-sm mb-1">Born June 21, 1963</div>
                                <div className="text-white font-bold text-xl">Hokuei, Tottori Prefecture, Japan</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Biography & Timeline */}
            <section className="px-4 max-w-4xl mx-auto mb-24">
                <div className="text-center mb-16">
                    <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">The Journey</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                </div>

                <div className="space-y-12 relative before:absolute before:left-[19px] md:before:left-1/2 before:top-0 before:w-px before:h-full before:bg-white/10">
                    {[
                        {
                            year: "1986",
                            title: "Debut",
                            desc: "Made his debut with 'Wait a Minute' (Chotto Matte), marking the start of his professional career.",
                            icon: PenTool
                        },
                        {
                            year: "1987",
                            title: "Magic Kaito",
                            desc: "Launched 'Magic Kaito', introducing the phantom thief Kaito Kid, a character who would later cross paths with Conan.",
                            icon: Star
                        },
                        {
                            year: "1988",
                            title: "Yaiba",
                            desc: "Started 'Yaiba', a samurai manga that won the 38th Shogakukan Manga Award for Children's Manga.",
                            icon: Award
                        },
                        {
                            year: "1994",
                            title: "Detective Conan Begins",
                            desc: "The first chapter of 'Meitantei Conan' was published in Weekly Shōnen Sunday. The legend begins.",
                            icon: BookOpen
                        },
                        {
                            year: "2001",
                            title: "Shogakukan Award",
                            desc: "Detective Conan won the 46th Shogakukan Manga Award for Shōnen category.",
                            icon: Award
                        },
                        {
                            year: "2017",
                            title: "1000th Chapter",
                            desc: "Detective Conan reached its 1000th chapter milestone, a rare feat in the manga industry.",
                            icon: Calendar
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`flex flex-col md:flex-row gap-8 items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            <div className="flex-1 md:text-right">
                                {i % 2 === 0 && (
                                    <div className="hidden md:block">
                                        <div className="text-gold font-bold text-2xl font-display">{item.year}</div>
                                        <div className="text-white font-bold text-xl mb-2">{item.title}</div>
                                        <p className="text-muted text-sm">{item.desc}</p>
                                    </div>
                                )}
                                {/* Mobile View (always visible on small screens, hidden on md if it's the right side item) */}
                                <div className="md:hidden">
                                    <div className="text-gold font-bold text-2xl font-display">{item.year}</div>
                                    <div className="text-white font-bold text-xl mb-2">{item.title}</div>
                                    <p className="text-muted text-sm">{item.desc}</p>
                                </div>
                            </div>

                            <div className="relative z-10 w-10 h-10 rounded-full bg-ink border-2 border-gold flex items-center justify-center shrink-0">
                                <item.icon size={16} className="text-gold" />
                            </div>

                            <div className="flex-1">
                                {i % 2 !== 0 && (
                                    <div className="hidden md:block">
                                        <div className="text-gold font-bold text-2xl font-display">{item.year}</div>
                                        <div className="text-white font-bold text-xl mb-2">{item.title}</div>
                                        <p className="text-muted text-sm">{item.desc}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

        </main>
    );
}
