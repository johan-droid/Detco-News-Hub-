import LoginForm from "@/components/LoginForm";
import BackButton from "@/components/BackButton";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-ink flex flex-col selection:bg-gold/30 selection:text-white relative overflow-hidden">
            {/* Background elements for detective aesthetic */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="p-6 relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between">
                <BackButton text="Back to Home" />
                <div className="font-mono text-xs text-muted uppercase tracking-widest hidden md:block">
                    Secure Area
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-4 relative z-10">
                <LoginForm />
            </div>
        </main>
    );
}
