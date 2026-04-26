import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for static assets
    if (pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon') ||
        pathname.includes('.') ||
        pathname === '/health') {
        return NextResponse.next();
    }

    // Protect admin route
    if (pathname.startsWith('/admin')) {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        if (!token) {
            const url = new URL('/login', request.url);
            url.searchParams.set('redirect', pathname);
            return NextResponse.redirect(url);
        }
    }

    // Add security headers to response
    const response = NextResponse.next();

    // Content Security Policy
    const cspHeader = "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com https://vercel.live; connect-src 'self' https://vercel.live; frame-src 'self' https://vercel.live; frame-ancestors 'none'; base-uri 'self'; form-action 'self';";

    response.headers.set('Content-Security-Policy', cspHeader);
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    response.headers.set('X-XSS-Protection', '1; mode=block');

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
