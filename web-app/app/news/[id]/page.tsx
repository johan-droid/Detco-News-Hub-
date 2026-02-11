"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Clock, User, Tag } from "lucide-react";
import BackButton from "@/components/BackButton";
import type { NewsItem } from "@/types";
import { motion } from "framer-motion";

const categoryColors: Record<string, string> = Object.freeze({
    BREAKING: "#c0392b",
    MANGA: "#c9a84c",
    ANIME: "#27ae60",
    THEORY: "#4A90D9",
    EVENTS: "#9B59B6",
});

export default function NewsDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewsItem = async () => {
            if (!id) return;

            const { data, error } = await supabase
                .from("news")
                .select("*")
                .eq("id", id)
                .single();

            if (data) setNewsItem(data);
            if (error) console.error("Error fetching news:", error);
            setLoading(false);
        };

        fetchNewsItem();
    }, [id]);

    const formattedDate = useMemo(() => {
        if (!newsItem) return '';
        return new Date(newsItem.created_at).toLocaleDateString("en-US", {
            year: 'numeric', month: 'long', day: 'numeric'
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
        <main className="min-h-screen bg-ink text-white font-body selection:bg-gold/30 selection:text-white">
            <article className="max-w-4xl mx-auto px-4 py-12 md:py-20">
                {/* Header Navigation */}
                <BackButton className="mb-6" text="Back to News" />

                {/* Meta Info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center gap-4 mb-6 font-mono text-xs text-muted uppercase tracking-wider"
                >
                    <span
                        className="px-2 py-1 border"
                        style={{ color: color, borderColor: `${color}44`, backgroundColor: `${color}11` }}
                    >
                        {newsItem.category}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {formattedDate}
                    </span>
                    {newsItem.author && (
                        <span className="flex items-center gap-1 text-white/60">
                            <User size={12} />
                            {newsItem.author}
                        </span>
                    )}
                    {newsItem.updated_at && newsItem.updated_at !== newsItem.created_at && (
                        <span className="flex items-center gap-1 text-accent/80">
                            <Clock size={12} />
                            Last Updated: {new Date(newsItem.updated_at).toLocaleString('en-US', {
                                timeZone: 'UTC',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZoneName: 'short'
                            })}
                        </span>
                    )}
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-tight mb-8 text-white"
                >
                    {newsItem.title}
                </motion.h1>

                {/* Image */}
                {newsItem.image && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12 border border-white/10 rounded overflow-hidden"
                    >
                        <img
                            src={newsItem.image}
                            alt={newsItem.title}
                            className="w-full h-auto object-cover max-h-[600px]"
                        />
                    </motion.div>
                )}

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-gold prose-a:text-accent prose-blockquote:border-gold/30 prose-blockquote:bg-white/5 prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:not-italic"
                >
                    {/* Simple rendering for now, could use markdown parser if content is markdown */}
                    {newsItem.content.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-4 text-white/80 leading-relaxed font-light">
                            {paragraph}
                        </p>
                    ))}
                </motion.div>

            </article>
        </main>
    );
}
