"use client";

import { motion } from "framer-motion";
import { Watch, Mic, Zap, Footprints } from "lucide-react";

const gadgets = [
    {
        name: "Stun-Gun Wristwatch",
        icon: Watch,
        desc: "Fires a tranquilizer dart to put targets to sleep instantly. Essential for 'Sleeping Kogoro'.",
        color: "#E85D9A",
    },
    {
        name: "Voice-Changing Bowtie",
        icon: Mic,
        desc: "Modulates the user's voice to mimic anyone. The key to solving cases from the shadows.",
        color: "#c0392b",
    },
    {
        name: "Power-Enhancing Kick Shoes",
        icon: Footprints,
        desc: "Stimulates foot muscles to deliver kicks capable of knocking out criminals or destroying objects.",
        color: "#4A90D9",
    },
    {
        name: "Criminal Tracking Glasses",
        icon: Zap,
        desc: "Includes a radar, telescopic zoom, and night vision to track transmitters on fugitives.",
        color: "#f1c40f",
    },
    {
        name: "Solar-Powered Skateboard",
        icon: Zap,
        desc: "A high-speed skateboard with a solar engine. Capable of keeping up with cars and performing stunts.",
        color: "#f39c12",
    },
    {
        name: "Elasticity Suspenders",
        icon: Mic, // Using Mic as placeholder, or could import another icon like 'Move' or 'Minimize' if available, but staying safe with existing imports or generic.
        desc: "Suspenders that can extend and contract with immense force, allowing Conan to lift heavy objects.",
        color: "#27ae60",
    },
];

export default function Gadgets() {
    return (
        <section id="gadgets" className="bg-deep py-24 px-4 relative">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Zap size={300} />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-mono text-xs tracking-[0.3em] text-accent uppercase mb-4"
                    >
                        ⚡ Agasa's Inventions
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-display font-bold text-4xl md:text-5xl"
                    >
                        Detective <span className="text-gold italic">Gadgets</span>
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {gadgets.map((g, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-card/50 border border-white/5 p-6 rounded hover:bg-card hover:border-gold/20 transition-all group"
                        >
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                                style={{
                                    backgroundColor: `${g.color}22`,
                                    color: g.color
                                }}
                            >
                                <g.icon size={24} />
                            </div>

                            <h3 className="font-display font-bold text-xl mb-3 text-white group-hover:text-gold transition-colors">{g.name}</h3>
                            <p className="text-muted text-sm leading-relaxed">{g.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
