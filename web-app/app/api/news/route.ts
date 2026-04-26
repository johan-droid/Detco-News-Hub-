import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { news } from "@/lib/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const rawData = await db
            .select()
            .from(news)
            .orderBy(desc(news.createdAt))
            .limit(4);
            
        const data = rawData.map(item => ({
            ...item,
            created_at: item.createdAt,
            updated_at: item.updatedAt
        }));

        return NextResponse.json({ data });
    } catch (err: any) {
        console.error("Unexpected API error fetching news:", err);
        return NextResponse.json(
            { error: err.message || "Internal server error" },
            { status: 500 }
        );
    }
}
