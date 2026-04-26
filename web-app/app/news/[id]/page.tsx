"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
// Import removed
import { Clock, User } from "lucide-react";
import BackButton from "@/components/BackButton";
import type { NewsItem } from "@/types";
import { motion } from "framer-motion";

const categoryColors: Record<string, string> = Object.freeze({
    BREAKING: "#c0392b",
    MANGA: "#c9a84c",
    ANIME: "#27ae60",
    THEORY: "#4A90D9",
    EVENTS: "#9B59B6",
    GENERAL: "#34495e",
});

export default function NewsDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewsItem = async () => {
            if (!id) return;

            try {
                const res = await fetch(`/api/news/${id}`);
                const json = await res.json();
                if (res.ok && json.data) {
                    setNewsItem(json.data);
                } else {
                    console.error("Error fetching news:", json.error);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
            setLoading(false);
        };

        fetchNewsItem();
    }, [id]);

    const formattedDate = useMemo(() => {
        if (!newsItem) return "";
        return new Date(newsItem.created_at).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric"
        });
    }, [newsItem]);

    const color = useMemo(() => {
        if (!newsItem) return "#c9a84c";
        return categoryColors[newsItem.category] || "#c9a84c";
    }, [newsItem]);

    if (loading) {
        return (
            <div className="min-h-screen bg-ink flex items-center justify-center text-gold font-mono animate-pulse">
                Accessing Case File...
            </div>
        );
    }

    if (!newsItem) {
        return (
            <div className="min-h-screen bg-ink flex flex-col items-center justify-center text-muted font-mono gap-4">
                <p>Case file not found or access denied.</p>
                <button
                    onClick={() => router.push("/#news")}
                    className="text-gold hover:text-white transition-colors uppercase text-xs tracking-widest border border-gold/20 px-4 py-2"
                >
                    Return to Archive
                </button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-ink font-body text-white selection:bg-gold/30 selection:text-white">
            <article className="mx-auto max-w-4xl px-4 pb-16 pt-28 md:pt-32">
                <BackButton className="mb-6" text="Back to News" />

                <motion.header
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-white/10 bg-card/70 p-6 backdrop-blur-sm md:p-8"
                >
                    <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                        <span className="rounded-full border px-3 py-1" style={{ color, borderColor: `${color}44`, backgroundColor: `${color}18` }}>
                            {newsItem.category}
                        </span>
                        <span className="inline-flex items-center gap-1"><Clock size={12} />{formattedDate}</span>
                        {newsItem.author && <span className="inline-flex items-center gap-1 text-white/70"><User size={12} />{newsItem.author}</span>}
                    </div>

                    <h1 className="font-display text-3xl font-bold leading-tight md:text-5xl">{newsItem.title}</h1>

                    {newsItem.updated_at && newsItem.updated_at !== newsItem.created_at && (
                        <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-accent">
                            Updated {new Date(newsItem.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                    )}
                </motion.header>

                {newsItem.image && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                        <img src={newsItem.image} alt={newsItem.title} className="max-h-[560px] w-full object-cover" />
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 rounded-3xl border border-white/10 bg-deep/80 p-6 prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-gold prose-a:text-accent md:p-10"
                >
                    {newsItem.content.split("\n").map((paragraph, idx) => (
                        <p key={idx} className="mb-4 text-white/85 leading-relaxed font-light">
                            {paragraph}
                        </p>
                    ))}
                </motion.div>
            </article>
        </main>
    );
}
