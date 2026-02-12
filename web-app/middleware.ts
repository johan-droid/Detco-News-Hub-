import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for static assets
    if (pathname.startsWith('/_next') || 
        pathname.startsWith('/favicon') || 
        pathname.includes('.') || 
        pathname === '/health') {
        return NextResponse.next();
    }

    // Add security headers to response
    const response = NextResponse.next();

    // Content Security Policy - simplified to avoid regex issues
    const cspHeader = "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co wss://*.supabase.co; frame-ancestors 'none'; base-uri 'self'; form-action 'self';";

    response.headers.set('Content-Security-Policy', cspHeader);
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    response.headers.set('X-XSS-Protection', '1; mode=block');

    return response;
}

// Configure which routes the middleware runs on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
