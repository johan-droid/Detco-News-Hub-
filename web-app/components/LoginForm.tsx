"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fallback to router.push or fallback href if hook behavior differs
    const router = useRouter();

    let redirectUrl = '/';
    try {
        const searchParams = useSearchParams();
        redirectUrl = searchParams.get('redirect') || '/';
    } catch {
        // useSearchParams might be restricted outside Suspense
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else if (data.session) {
                router.push(redirectUrl);
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md relative"
        >
            {/* Glassmorphism card */}
            <div className="bg-card/40 backdrop-blur-md border border-white/10 p-8 pt-10 shadow-2xl relative overflow-hidden">
                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                    <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-gold to-transparent"></div>
                    <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-gold to-transparent"></div>
                </div>

                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-16 h-16 bg-gold/10 bg-gradient-to-br from-gold/20 to-transparent mx-auto rounded-full flex items-center justify-center mb-4 border border-gold/30"
                    >
                        <Lock className="text-gold" size={28} />
                    </motion.div>
                    <h2 className="font-display font-bold text-3xl text-white mb-2">Restricted Area</h2>
                    <p className="text-sm font-mono text-muted uppercase tracking-widest">Authorized personnel only</p>
                </div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red/10 border border-red/30 text-red-400 p-3 mb-6 text-sm flex items-start gap-2 rounded-sm"
                        >
                            <AlertCircle size={16} className="mt-0.5 shrink-0" />
                            <span>{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleLogin} className="space-y-5 relative z-10">
                    <div className="space-y-1">
                        <label className="text-xs font-mono uppercase tracking-wider text-muted ml-1">Agent ID (Email)</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted group-focus-within:text-gold transition-colors">
                                <Mail size={16} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 text-white p-3 pl-10 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-mono text-sm"
                                placeholder="agent@metropolitan.police"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-mono uppercase tracking-wider text-muted ml-1">Passcode</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted group-focus-within:text-gold transition-colors">
                                <Lock size={16} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 text-white p-3 pl-10 pr-10 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-mono text-sm tracking-widest"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        type="submit"
                        className="w-full bg-gold hover:bg-gold/90 text-ink font-bold py-3 px-4 flex items-center justify-center gap-2 group transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? (
                            <span className="font-mono uppercase tracking-widest text-sm flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin"></span>
                                Verifying...
                            </span>
                        ) : (
                            <>
                                <span className="font-mono uppercase tracking-widest text-sm">Access Case Files</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </motion.button>
                </form>

                {/* Optional helper text */}
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <p className="text-xs font-mono text-muted/60">
                        Authentication is required to view classified case files.
                        Unauthorized access is strictly prohibited.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
