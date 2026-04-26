"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function NewsLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        },
    });

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-ink flex flex-col items-center justify-center text-gold font-mono gap-4">
                <div className="w-8 h-8 rounded-full border-b-2 border-r-2 border-gold animate-spin"></div>
                <p className="animate-pulse tracking-widest uppercase text-sm">Verifying Credentials...</p>
            </div>
        );
    }

    // Only render children if authenticated
    if (status === "authenticated") {
        return <>{children}</>;
    }
    
    return null;
}
