import { prisma } from "@/lib/prisma";

const RESERVED_ALIASES = new Set([
  "api",
  "admin",
  "tools",
  "about",
  "contact",
  "privacy",
  "terms",
  "disclaimer",
  "cookies",
  "sitemap",
  "robots",
  "s",
]);

// In-memory simple rate limiting: IP -> timestamp array
const rateLimitMap = new Map<string, number[]>();

export function checkRateLimit(ip: string, limit = 20, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= limit) {
    return false; // Rate limit exceeded
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

export function validateUrl(rawUrl: string): { valid: boolean; error?: string; cleanUrl?: string } {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { valid: false, error: "Please enter a valid URL." };
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { valid: false, error: "Malformed URL format. Must start with http:// or https://" };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { valid: false, error: "Security restriction: Only http:// and https:// URLs are permitted." };
  }

  // Prevent self-referencing loops
  const hostname = parsed.hostname.toLowerCase();
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    // Only allow for development testing
    if (process.env.NODE_ENV === "production") {
      return { valid: false, error: "Localhost URLs cannot be shortened in production." };
    }
  }

  return { valid: true, cleanUrl: parsed.toString() };
}

export function generateShortCode(length = 6): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createShortUrl(params: {
  originalUrl: string;
  customAlias?: string;
  expiresInDays?: number;
}): Promise<{
  success: boolean;
  shortCode?: string;
  shortUrl?: string;
  error?: string;
}> {
  const { originalUrl, customAlias, expiresInDays } = params;

  // 1. Validate destination URL
  const val = validateUrl(originalUrl);
  if (!val.valid || !val.cleanUrl) {
    return { success: false, error: val.error || "Invalid URL" };
  }

  let finalCode = "";

  // 2. If custom alias provided
  if (customAlias && customAlias.trim()) {
    const alias = customAlias.trim().toLowerCase();
    if (!/^[a-z0-9-_]{3,30}$/.test(alias)) {
      return {
        success: false,
        error: "Custom alias must be 3-30 characters long and contain only letters, numbers, hyphens, and underscores.",
      };
    }

    if (RESERVED_ALIASES.has(alias)) {
      return { success: false, error: "This alias is reserved by the system. Please pick another." };
    }

    const existing = await prisma.shortUrl.findFirst({
      where: {
        OR: [{ shortCode: alias }, { customAlias: alias }],
      },
    });

    if (existing) {
      return { success: false, error: "This custom alias is already in use. Please choose another one." };
    }

    finalCode = alias;
  } else {
    // Generate unique random code
    let attempts = 0;
    while (attempts < 5) {
      attempts++;
      const candidate = generateShortCode(6);
      const exists = await prisma.shortUrl.findUnique({
        where: { shortCode: candidate },
      });
      if (!exists) {
        finalCode = candidate;
        break;
      }
    }
    if (!finalCode) {
      finalCode = generateShortCode(8);
    }
  }

  // 3. Expiration date calculation
  let expiresAt: Date | null = null;
  if (expiresInDays && expiresInDays > 0) {
    expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);
  }

  // 4. Save to database
  const record = await prisma.shortUrl.create({
    data: {
      originalUrl: val.cleanUrl,
      shortCode: finalCode,
      customAlias: customAlias ? finalCode : null,
      expiresAt,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const fullShortUrl = `${baseUrl.replace(/\/+$/, "")}/s/${record.shortCode}`;

  return {
    success: true,
    shortCode: record.shortCode,
    shortUrl: fullShortUrl,
  };
}
