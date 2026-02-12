import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting map (in-memory, for production use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 1000; // 1000 requests per minute (increased from 100)
const CLEANUP_INTERVAL = 5 * 60 * 1000; // Cleanup every 5 minutes

// Cleanup function to remove expired entries
function cleanupExpiredEntries() {
    const now = Date.now();
    for (const [ip, data] of rateLimit.entries()) {
        if (now > data.resetTime) {
            rateLimit.delete(ip);
        }
    }
}

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    
    // Cleanup expired entries periodically
    if (Math.random() < 0.01) { // 1% chance to cleanup on each request
        cleanupExpiredEntries();
    }

    const userLimit = rateLimit.get(ip);

    if (!userLimit || now > userLimit.resetTime) {
        rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }

    if (userLimit.count >= MAX_REQUESTS) {
        return false;
    }

    userLimit.count++;
    return true;
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip rate limiting for static assets and health checks
    if (pathname.startsWith('/_next') || 
        pathname.startsWith('/favicon') || 
        pathname.includes('.') || 
        pathname === '/health') {
        return NextResponse.next();
    }

    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Apply rate limiting with more lenient limits for admin routes
    const isAdminRoute = pathname.startsWith('/admin');
    const effectiveMaxRequests = isAdminRoute ? MAX_REQUESTS * 2 : MAX_REQUESTS;
    
    // Temporarily override the max requests for admin routes
    if (isAdminRoute) {
        const now = Date.now();
        const userLimit = rateLimit.get(ip);
        
        if (!userLimit || now > userLimit.resetTime) {
            rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        } else if (userLimit.count < effectiveMaxRequests) {
            userLimit.count++;
        } else if (userLimit.count >= effectiveMaxRequests) {
            return new NextResponse('Too Many Requests', {
                status: 429,
                headers: {
                    'Retry-After': '60'
                }
            });
        }
    } else if (!checkRateLimit(ip)) {
        return new NextResponse('Too Many Requests', {
            status: 429,
            headers: {
                'Retry-After': '60'
            }
        });
    }

    // Admin routes are protected by client-side authentication in the page component
    // No middleware redirect needed as the page handles auth state properly

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
