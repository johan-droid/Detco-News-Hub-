import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { news } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const rawData = await db
            .select()
            .from(news)
            .where(eq(news.id, id))
            .limit(1);

        if (rawData.length === 0) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        const data = {
            ...rawData[0],
            created_at: rawData[0].createdAt,
            updated_at: rawData[0].updatedAt
        };

        return NextResponse.json({ data });
    } catch (err: any) {
        console.error("Unexpected API error fetching news item:", err);
        return NextResponse.json(
            { error: err.message || "Internal server error" },
            { status: 500 }
        );
    }
}
