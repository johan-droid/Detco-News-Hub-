"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function NewsLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        let mounted = true;

        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                if (mounted) {
                    router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
                }
            } else {
                if (mounted) setIsLoading(false);
            }
        };

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
            } else if (session) {
                setIsLoading(false);
            }
        });

        checkAuth();

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [pathname, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-ink flex flex-col items-center justify-center text-gold font-mono gap-4">
                <div className="w-8 h-8 rounded-full border-b-2 border-r-2 border-gold animate-spin"></div>
                <p className="animate-pulse tracking-widest uppercase text-sm">Verifying Credentials...</p>
            </div>
        );
    }

    return <>{children}</>;
}
