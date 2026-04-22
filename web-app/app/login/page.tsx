import LoginForm from "@/components/LoginForm";
import BackButton from "@/components/BackButton";

export default function LoginPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-ink selection:bg-gold/30 selection:text-white">
            <div className="pointer-events-none absolute inset-0 opacity-25">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:26px_26px]" />
                <div className="absolute left-[-10%] top-[-10%] h-[42%] w-[42%] rounded-full bg-gold/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[42%] w-[42%] rounded-full bg-accent/10 blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col p-4 md:p-8">
                <div className="mb-8 flex items-center justify-between">
                    <BackButton text="Back to Home" />
                    <div className="hidden rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-gold md:block">
                        Secure Area
                    </div>
                </div>

                <div className="grid flex-1 items-center gap-8 lg:grid-cols-2">
                    <div className="hidden rounded-3xl border border-white/10 bg-card/70 p-8 backdrop-blur-sm lg:block">
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Admin Portal</p>
                        <h1 className="mt-3 font-display text-5xl font-bold leading-tight">Control Desk</h1>
                        <p className="mt-4 max-w-md text-muted">
                            Sign in to manage news articles, verify updates, and keep the investigation board fresh.
                        </p>
                    </div>

                    <div className="flex items-center justify-center">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
