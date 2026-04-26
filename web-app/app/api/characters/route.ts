import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { characters } from "@/lib/schema";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const rawData = await db
            .select()
            .from(characters)
            .orderBy(asc(characters.createdAt));
            
        const data = rawData.map(item => ({
            ...item,
            created_at: item.createdAt,
            real_name: item.realName
        }));

        return NextResponse.json({ data });
    } catch (err: any) {
        console.error("Unexpected API error fetching characters:", err);
        return NextResponse.json(
            { error: err.message || "Internal server error" },
            { status: 500 }
        );
    }
}
