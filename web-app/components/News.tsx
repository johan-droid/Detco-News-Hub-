"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, FileText, AlertTriangle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { fallbackNews } from "@/lib/fallbackData";
import DataStatus from "@/components/DataStatus";
import Link from "next/link";
import type { NewsItem } from "@/types";

const categoryColors: Record<string, { main: string; light: string; gradient: string }> = {
    BREAKING: { 
        main: "#c0392b", 
        light: "#e74c3c", 
        gradient: "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)"
    },
    MANGA: { 
        main: "#c9a84c", 
        light: "#e8c96e", 
        gradient: "linear-gradient(135deg, #c9a84c 0%, #e8c96e 100%)"
    },
    ANIME: { 
        main: "#27ae60", 
        light: "#2ecc71", 
        gradient: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)"
    },
    THEORY: { 
        main: "#4A90D9", 
        light: "#5ba0e9", 
        gradient: "linear-gradient(135deg, #4A90D9 0%, #5ba0e9 100%)"
    },
    EVENTS: { 
        main: "#9B59B6", 
        light: "#a569bd", 
        gradient: "linear-gradient(135deg, #9B59B6 0%, #a569bd 100%)"
    },
    GENERAL: { 
        main: "#34495e", 
        light: "#4a5f7e", 
        gradient: "linear-gradient(135deg, #34495e 0%, #4a5f7e 100%)"
    },
};

export default function News() {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [usingFallback, setUsingFallback] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data, error } = await supabase
                    .from("news")
                    .select("*")
                    .order("created_at", { ascending: false })
                    .limit(4);

                if (data && data.length > 0) {
                    setNewsItems(data);
                    setUsingFallback(false);
                    setError(null);
                } else {
                    // Use fallback data if no data from Supabase
                    setNewsItems(fallbackNews);
                    setUsingFallback(true);
                    setError(null);
                    console.log("Using fallback news data");
                }
                if (error) {
                    console.error("Error fetching news:", error);
                    // Show network error to user
                    if (error.message?.includes('fetch failed') || error.message?.includes('timeout')) {
                        console.error("Network connection issue - using fallback data");
                        setNewsItems(fallbackNews);
                        setUsingFallback(true);
                        setError("Network connection issue - showing sample data");
                    }
                }
            } catch (err) {
                console.error("Unexpected error:", err);
                // Use fallback data on any error
                setNewsItems(fallbackNews);
                setUsingFallback(true);
                setError("Connection failed - showing sample data");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };

    return (
        <section id="news" className="bg-ink py-12 md:py-24 px-4 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-mono text-xs tracking-[0.3em] text-red uppercase mb-3 md:mb-4"
                    >
                        📰 Latest Updates
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-display font-bold text-3xl md:text-4xl lg:text-5xl"
                    >
                        Breaking <span className="text-white italic">News</span>
                    </motion.h2>
                </div>

                {loading ? (
                    <div className="text-center text-gold font-mono animate-pulse">
                        Scanning for evidence...
                    </div>
                ) : error ? (
                    <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-2 text-yellow-500">
                            <AlertTriangle size={20} />
                            <span className="font-mono text-sm">{error}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                            {newsItems.map((n: NewsItem, i: number) => {
                                const colors = categoryColors[n.category] || categoryColors.GENERAL;
                                return (
                                    <motion.div
                                        key={n.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-card/60 border border-white/5 p-5 md:p-8 group hover:border-gold/30 transition-all flex flex-col h-full relative overflow-hidden backdrop-blur-sm"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <FileText size={100} />
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-4 md:mb-6 relative z-10">
                                            <span
                                                className="font-mono text-[9px] md:text-[10px] px-2.5 md:px-3 py-1 border uppercase tracking-widest"
                                                style={{
                                                    background: colors.gradient,
                                                    borderColor: `${colors.main}44`,
                                                    color: colors.light
                                                }}
                                            >
                                                {n.category}
                                            </span>
                                            <span className="font-mono text-[10px] md:text-xs text-muted">
                                                {formatDate(n.created_at)}
                                            </span>
                                        </div>

                                        <h3 className="font-display font-bold text-xl md:text-2xl mb-3 md:mb-4 group-hover:text-gold transition-colors duration-300 relative z-10">
                                            {n.title}
                                        </h3>

                                        <p className="text-muted leading-relaxed text-sm mb-6 md:mb-8 line-clamp-3 relative z-10 flex-grow">
                                            {n.content}
                                        </p>

                                        <Link
                                            href={`/news/${n.id}`}
                                            className="relative z-10 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-all group-hover:gap-3 py-2.5 md:py-2 border-b border-transparent hover:border-current self-start min-h-[44px] md:min-h-0"
                                            style={{ color: colors.main }}
                                        >
                                            Read Case File <ArrowRight size={14} />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {newsItems.map((n: NewsItem, i: number) => {
                            const colors = categoryColors[n.category] || categoryColors.GENERAL;
                            return (
                                <motion.div
                                    key={n.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-card/60 border border-white/5 p-5 md:p-8 group hover:border-gold/30 transition-all flex flex-col h-full relative overflow-hidden backdrop-blur-sm"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <FileText size={100} />
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-4 md:mb-6 relative z-10">
                                        <span
                                            className="font-mono text-[9px] md:text-[10px] px-2.5 md:px-3 py-1 border uppercase tracking-widest"
                                            style={{
                                                background: colors.gradient,
                                                borderColor: `${colors.main}44`,
                                                color: colors.light
                                            }}
                                        >
                                            {n.category}
                                        </span>
                                        <span className="font-mono text-[10px] md:text-xs text-muted">
                                            {formatDate(n.created_at)}
                                        </span>
                                    </div>

                                    <h3 className="font-display font-bold text-xl md:text-2xl mb-3 md:mb-4 group-hover:text-gold transition-colors duration-300 relative z-10">
                                        {n.title}
                                    </h3>

                                    <p className="text-muted leading-relaxed text-sm mb-6 md:mb-8 line-clamp-3 relative z-10 flex-grow">
                                        {n.content}
                                    </p>

                                    <Link
                                        href={`/news/${n.id}`}
                                        className="relative z-10 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-all group-hover:gap-3 py-2.5 md:py-2 border-b border-transparent hover:border-current self-start min-h-[44px] md:min-h-0"
                                        style={{ color: colors.main }}
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
            <DataStatus usingFallback={usingFallback} error={error} />
        </section>
    );
}
