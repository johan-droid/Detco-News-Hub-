import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("news")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(4);

        if (error) {
            console.error("API error fetching news:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (err: any) {
        console.error("Unexpected API error fetching news:", err);
        return NextResponse.json(
            { error: err.message || "Internal server error" },
            { status: 500 }
        );
    }
}
