import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { news } from "@/lib/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await context.params;
        const body = await request.json();
        
        const updatedPost = await db.update(news).set({
            title: body.title,
            content: body.content,
            category: body.category,
            image: body.image,
            author: body.author,
            updatedAt: new Date()
        }).where(eq(news.id, id)).returning();

        return NextResponse.json({ data: updatedPost[0] });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await context.params;
        await db.delete(news).where(eq(news.id, id));
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
