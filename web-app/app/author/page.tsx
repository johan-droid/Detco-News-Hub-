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

const timeline = [
    {
        year: "1986",
        title: "Debut",
        desc: "Made his debut with 'Wait a Minute' (Chotto Matte), marking the start of his professional career.",
        icon: PenTool
    },
    {
        year: "1987",
        title: "Magic Kaito",
        desc: "Launched 'Magic Kaito', introducing the phantom thief Kaito Kid.",
        icon: Star
    },
    {
        year: "1988",
        title: "Yaiba",
        desc: "Started 'Yaiba', and won the 38th Shogakukan Manga Award for Children's Manga.",
        icon: Award
    },
    {
        year: "1994",
        title: "Detective Conan Begins",
        desc: "The first chapter of 'Meitantei Conan' was published in Weekly Shōnen Sunday.",
        icon: BookOpen
    },
    {
        year: "2001",
        title: "Shogakukan Award",
        desc: "Detective Conan won the 46th Shogakukan Manga Award for the Shōnen category.",
        icon: Award
    },
    {
        year: "2017",
        title: "1000th Chapter",
        desc: "Detective Conan reached its 1000th chapter milestone.",
        icon: Calendar
    }
];

export default function AuthorPage() {
    const skillsList = useMemo(() => authorData.skills, []);
    const achievementsList = useMemo(() => authorData.achievements, []);

    return (
        <main className="min-h-screen bg-ink pb-14 pt-28 font-body text-white selection:bg-gold/30 selection:text-white">
            <div className="mx-auto w-full max-w-6xl px-4">
                <BackButton className="mb-8" text="Back to Home" />

                <section className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-card/70 p-7 backdrop-blur-sm md:p-10">
                        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Creator Dossier</p>
                        <h1 className="font-display text-5xl font-black leading-none md:text-7xl">
                            {authorData.name.split(" ")[0]}
                            <span className="block italic text-gold">{authorData.name.split(" ")[1]}</span>
                        </h1>
                        <p className="mt-5 max-w-xl border-l-2 border-gold/40 pl-4 text-muted">{authorData.bio}</p>

                        <div className="mt-8 grid gap-3 sm:grid-cols-3">
                            {achievementsList.map((item) => (
                                <div key={item.title} className="rounded-xl border border-white/10 bg-ink/60 p-4">
                                    <item.icon className="mb-2 h-5 w-5 text-gold" />
                                    <h3 className="font-display text-lg font-bold">{item.title}</h3>
                                    <p className="mt-1 text-xs text-muted">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="rounded-3xl border border-white/10 bg-card/70 p-4 backdrop-blur-sm">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10">
                            <img src="https://detectiveconan.fandom.com/wiki/Special:FilePath/Gosho_Aoyama.jpg" alt="Gosho Aoyama" className="h-full w-full object-cover" />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5">
                                <div className="font-mono text-[11px] uppercase tracking-wider text-gold">Born June 21, 1963</div>
                                <div className="text-sm text-white/90">Hokuei, Tottori Prefecture, Japan</div>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {skillsList.map((skill) => (
                                <span key={skill} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-muted">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </section>

                <section className="mt-14 rounded-3xl border border-white/10 bg-deep/80 p-6 md:p-10">
                    <h2 className="mb-8 font-display text-3xl font-bold md:text-4xl">Career Timeline</h2>
                    <div className="space-y-5">
                        {timeline.map((item) => (
                            <div key={item.year + item.title} className="flex gap-4 rounded-2xl border border-white/10 bg-ink/70 p-4">
                                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                                    <item.icon className="h-4 w-4 text-gold" />
                                </div>
                                <div>
                                    <div className="font-mono text-xs uppercase tracking-widest text-gold">{item.year}</div>
                                    <h3 className="font-display text-xl font-bold">{item.title}</h3>
                                    <p className="text-sm text-muted">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
