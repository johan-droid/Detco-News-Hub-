/**
 * Security Utilities for Detective Conan News Hub
 * Provides input sanitization and validation functions
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 * Removes potentially dangerous HTML tags and attributes
 */
export function sanitizeHTML(input: string): string {
    if (!input) return '';

    // Remove script tags and their content
    let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Remove event handlers (onclick, onerror, etc.)
    sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=\s*[^\s>]*/gi, '');

    // Remove javascript: protocol
    sanitized = sanitized.replace(/javascript:/gi, '');

    // Remove data: protocol (can be used for XSS)
    sanitized = sanitized.replace(/data:text\/html/gi, '');

    return sanitized.trim();
}

/**
 * Sanitize user input for database queries
 * Prevents SQL injection attempts
 */
export function sanitizeInput(input: string): string {
    if (!input) return '';

    // Remove null bytes
    let sanitized = input.replace(/\0/g, '');

    // Trim whitespace
    sanitized = sanitized.trim();

    // Limit length to prevent DoS
    const MAX_LENGTH = 10000;
    if (sanitized.length > MAX_LENGTH) {
        sanitized = sanitized.substring(0, MAX_LENGTH);
    }

    return sanitized;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidURL(url: string): boolean {
    try {
        const urlObj = new URL(url);
        // Only allow http and https protocols
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
        return false;
    }
}

/**
 * Sanitize filename to prevent directory traversal
 */
export function sanitizeFilename(filename: string): string {
    if (!filename) return '';

    // Remove path separators and parent directory references
    let sanitized = filename.replace(/[\/\\]/g, '');
    sanitized = sanitized.replace(/\.\./g, '');

    // Remove special characters that could cause issues
    sanitized = sanitized.replace(/[<>:"|?*]/g, '');

    return sanitized.trim();
}

/**
 * Validate post title
 */
export function validateTitle(title: string): { valid: boolean; error?: string } {
    if (!title || title.trim().length === 0) {
        return { valid: false, error: 'Title is required' };
    }

    if (title.length > 200) {
        return { valid: false, error: 'Title must be less than 200 characters' };
    }

    return { valid: true };
}

/**
 * Validate post content
 */
export function validateContent(content: string): { valid: boolean; error?: string } {
    if (!content || content.trim().length === 0) {
        return { valid: false, error: 'Content is required' };
    }

    if (content.length > 50000) {
        return { valid: false, error: 'Content must be less than 50,000 characters' };
    }

    return { valid: true };
}

/**
 * Validate category
 */
export function validateCategory(category: string): { valid: boolean; error?: string } {
    const validCategories = ['BREAKING', 'MANGA', 'ANIME', 'THEORY', 'EVENTS'];

    if (!validCategories.includes(category)) {
        return { valid: false, error: 'Invalid category' };
    }

    return { valid: true };
}

/**
 * Rate limit checker for client-side
 * Returns true if action is allowed, false if rate limited
 */
export function checkClientRateLimit(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const storageKey = `rateLimit_${key}`;

    try {
        const stored = localStorage.getItem(storageKey);
        const data = stored ? JSON.parse(stored) : null;

        if (!data || now > data.resetTime) {
            localStorage.setItem(storageKey, JSON.stringify({
                count: 1,
                resetTime: now + windowMs
            }));
            return true;
        }

        if (data.count >= maxAttempts) {
            return false;
        }

        data.count++;
        localStorage.setItem(storageKey, JSON.stringify(data));
        return true;
    } catch {
        // If localStorage is not available, allow the action
        return true;
    }
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Escape HTML entities to prevent XSS
 */
export function escapeHTML(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
    };
    return text.replace(/[&<>"'/]/g, char => map[char]);
}
