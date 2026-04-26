import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { news } from "@/lib/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { desc } from "drizzle-orm";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const rawData = await db.select().from(news).orderBy(desc(news.createdAt));
        const data = rawData.map(item => ({
            ...item,
            created_at: item.createdAt,
            updated_at: item.updatedAt
        }));
        return NextResponse.json({ data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        
        const newPost = await db.insert(news).values({
            title: body.title,
            content: body.content,
            category: body.category,
            image: body.image,
            author: body.author,
        }).returning();

        return NextResponse.json({ data: newPost[0] });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
