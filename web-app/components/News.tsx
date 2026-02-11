"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import type { NewsItem } from "@/types";

const categoryColors: Record<string, string> = {
    BREAKING: "#c0392b", // red
    MANGA: "#c9a84c", // gold
    ANIME: "#27ae60", // green
    THEORY: "#4A90D9", // blue
    EVENTS: "#9B59B6", // purple
};

export default function News() {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            const { data, error } = await supabase
                .from("news")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(4);

            if (data) {
                setNewsItems(data);
            }
            if (error) {
                console.error("Error fetching news:", error);
            }
            setLoading(false);
        };

        fetchNews();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };

    return (
        <section id="news" className="bg-ink py-24 px-4 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-mono text-xs tracking-[0.3em] text-red uppercase mb-4"
                    >
                        📰 Latest Updates
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-display font-bold text-4xl md:text-5xl"
                    >
                        Breaking <span className="text-white italic">News</span>
                    </motion.h2>
                </div>

                {loading ? (
                    <div className="text-center text-gold font-mono animate-pulse">
                        Scanning for evidence...
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {newsItems.map((n: NewsItem, i: number) => {
                            const color = categoryColors[n.category] || "#c9a84c";
                            return (
                                <motion.div
                                    key={n.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-card border border-white/5 p-8 group hover:border-gold/30 transition-all flex flex-col h-full relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <FileText size={100} />
                                    </div>

                                    <div className="flex justify-between items-start mb-6 relative z-10">
                                        <span
                                            className="font-mono text-[10px] px-3 py-1 border uppercase tracking-widest"
                                            style={{
                                                color: color,
                                                borderColor: `${color}44`,
                                                backgroundColor: `${color}11`
                                            }}
                                        >
                                            {n.category}
                                        </span>
                                        <span className="font-mono text-xs text-muted">
                                            {formatDate(n.created_at)}
                                        </span>
                                    </div>

                                    <h3 className="font-display font-bold text-2xl mb-4 group-hover:text-gold transition-colors duration-300 relative z-10">
                                        {n.title}
                                    </h3>

                                    <p className="text-muted leading-relaxed text-sm mb-8 line-clamp-3 relative z-10 flex-grow">
                                        {n.content}
                                    </p>

                                    <Link
                                        href={`/news/${n.id}`}
                                        className="relative z-10 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-colors group-hover:gap-3 py-2 border-b border-transparent hover:border-current self-start"
                                        style={{ color: color }}
                                    >
                                        Read Case File <ArrowRight size={14} />
                                    </Link>
                                </motion.div>
                            );
                        })}

                        {newsItems.length === 0 && (
                            <div className="col-span-2 text-center text-muted font-mono border border-dashed border-white/10 py-12">
                                No recent case files found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
