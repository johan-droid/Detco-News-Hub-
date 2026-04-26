import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                const userRecord = await db.select().from(users).where(eq(users.email, credentials.email)).limit(1);
                
                if (userRecord.length === 0) {
                    throw new Error("User not found");
                }

                const user = userRecord[0];
                const isValidPassword = await bcrypt.compare(credentials.password, user.password);

                if (!isValidPassword) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user.id,
                    email: user.email,
                };
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
