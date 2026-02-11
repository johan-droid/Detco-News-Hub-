export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-ink border-t border-white/5 pt-16 pb-8 px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-center items-center gap-2 mb-8">
                    <span className="text-2xl animate-pulse">🔎</span>
                    <span className="font-display font-bold text-xl tracking-widest text-white">
                        DETCO<span className="text-gold">NEWS</span>HUB
                    </span>
                </div>

                <p className="font-display italic text-lg text-muted/80">
                    "There is always only one truth." — Shinichi Kudo
                </p>

                <div className="flex flex-wrap justify-center gap-8 py-8 border-y border-white/5">
                    {["Home", "About", "Characters", "News", "Author"].map((link) => (
                        <a
                            key={link}
                            href={link === "Home" ? "/" : link === "Admin" ? "/admin" : link === "Author" ? "/author" : `/#${link.toLowerCase()}`}
                            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-gold transition-colors"
                        >
                            {link}
                        </a>
                    ))}
                </div>

                <div className="space-y-4 text-muted/40 font-mono text-[10px] tracking-wide uppercase">
                    <p>
                        Detective Conan © 1994 Gosho Aoyama / Shogakukan · TMS Entertainment <br className="hidden md:block" />
                        All rights to original creators. This is a fan tribute website.
                    </p>
                    <p>
                        Built with 💙 by a devoted fan — Detco News Hub {currentYear}
                    </p>
                </div>
            </div>
        </footer>
    );
}
