"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import type { CharacterItem } from "@/types";

export default function Characters() {
    const [characters, setCharacters] = useState<CharacterItem[]>([]);
    const [selectedChar, setSelectedChar] = useState<CharacterItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const { data, error } = await supabase
                    .from("characters")
                    .select("*")
                    .order("created_at", { ascending: true });

                if (data) {
                    setCharacters(data);
                }
                if (error) {
                    console.error("Error fetching characters:", error);
                    // Show network error to user
                    if (error.message?.includes('fetch failed') || error.message?.includes('timeout')) {
                        console.error("Network connection issue - check internet connection");
                    }
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedChar) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [selectedChar]);

    return (
        <section id="characters" className="bg-ink py-12 md:py-24 px-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-mono text-xs tracking-[0.3em] text-gold uppercase mb-3 md:mb-4"
                    >
                        👥 The Cast
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-display font-bold text-3xl md:text-4xl lg:text-5xl"
                    >
                        Iconic <span className="text-accent italic">Characters</span>
                    </motion.h2>
                </div>

                {loading ? (
                    <div className="text-center text-gold font-mono animate-pulse">
                        Identifying suspects...
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {characters.map((c, i) => {
                            const color = c.color || "#c9a84c";
                            const colorGradient = `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`;
                            return (
                                <motion.div
                                    key={c.id}
                                    layoutId={`card-${c.id}`}
                                    onClick={() => setSelectedChar(c)}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="bg-card/60 border border-white/5 p-4 md:p-6 rounded-xl relative group overflow-hidden cursor-pointer h-[280px] md:h-[300px] flex flex-col justify-end transition-all hover:border-gold/30 backdrop-blur-sm"
                                    style={{ borderColor: `${color}33` }}
                                >
                                    {/* Enhanced Background Gradient & Glow */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-all duration-700"
                                        style={{ background: colorGradient }}
                                    />

                                    {/* Large Artistic Emoji/Icon Background */}
                                    <div
                                        className="absolute -top-4 -right-4 text-[120px] sm:text-[150px] opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 select-none grayscale group-hover:grayscale-0 rotate-12"
                                        style={{ filter: 'blur(2px)' }}
                                    >
                                        {c.emoji || "👤"}
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <div
                                                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl md:text-2xl border border-white/10 bg-black/20 backdrop-blur-sm shadow-lg"
                                                style={{ 
                                                    color: color, 
                                                    borderColor: color,
                                                    background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`
                                                }}
                                            >
                                                {c.emoji || "👤"}
                                            </div>
                                            {c.faction && (
                                                <span
                                                    className="text-[9px] md:text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-black/40 border border-white/10"
                                                    style={{ color: color }}
                                                >
                                                    {c.faction}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl mb-1 text-white group-hover:text-gold transition-colors">
                                            {c.name}
                                        </h3>

                                        {c.role && (
                                            <p className="font-mono text-[9px] md:text-xs text-muted mb-2 md:mb-3 uppercase tracking-widest">{c.role}</p>
                                        )}

                                        <p className="text-xs md:text-sm text-muted/80 line-clamp-2 mb-3 md:mb-4 group-hover:text-white/90 transition-colors">
                                            {c.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-gold text-[9px] md:text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                            <span>Access File</span>
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedChar && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        onClick={() => setSelectedChar(null)}
                    />

                    <motion.div
                        layoutId={`card-${selectedChar.id}`}
                        className="bg-card w-full max-w-2xl border border-gold/20 shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row max-h-[85vh] md:max-h-[80vh]"
                    >
                        <button
                            className="absolute top-2 right-2 md:top-4 md:right-4 z-20 text-white/50 hover:text-white transition-colors w-11 h-11 flex items-center justify-center text-2xl bg-black/50 rounded-full md:bg-transparent"
                            onClick={() => setSelectedChar(null)}
                        >
                            ✕
                        </button>

                        <div className="w-full md:w-1/3 bg-black/20 relative min-h-[180px] md:min-h-0">
                            {selectedChar.image ? (
                                <img src={selectedChar.image} alt={selectedChar.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-5xl md:text-6xl bg-gradient-to-b from-transparent to-black/50" style={{ color: selectedChar.color }}>
                                    {selectedChar.emoji || "👤"}
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 bg-gradient-to-t from-black/90 to-transparent">
                                <div className="font-mono text-[10px] md:text-xs text-gold uppercase tracking-widest mb-1">Role</div>
                                <div className="text-white font-bold text-sm md:text-base">{selectedChar.role || "Unknown"}</div>
                            </div>
                        </div>

                        <div className="p-5 md:p-8 md:w-2/3 overflow-y-auto">
                            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2" style={{ color: selectedChar.color }}>{selectedChar.name}</h2>
                            {selectedChar.real_name && (
                                <div className="font-mono text-xs md:text-sm text-muted mb-4 md:mb-6">Real Identity: <span className="text-white">{selectedChar.real_name}</span></div>
                            )}

                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <h3 className="font-mono text-xs text-gold uppercase tracking-widest mb-2 border-b border-white/10 pb-1">Profile</h3>
                                    <p className="text-muted leading-relaxed text-sm md:text-base">
                                        {selectedChar.description || "No detailed profile available for this character."}
                                    </p>
                                </div>

                                {selectedChar.faction && (
                                    <div>
                                        <h3 className="font-mono text-xs text-gold uppercase tracking-widest mb-2 border-b border-white/10 pb-1">Affiliation</h3>
                                        <div className="flex gap-2 flex-wrap">
                                            <span
                                                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white"
                                            >
                                                {selectedChar.faction}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </section>
    );
}
