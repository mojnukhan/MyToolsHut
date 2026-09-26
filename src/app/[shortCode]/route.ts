import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureDatabaseInitialized } from "@/lib/prisma";

// Known static pages — don't treat these as short codes
const RESERVED_PATHS = new Set([
  "about",
  "contact",
  "privacy",
  "terms",
  "disclaimer",
  "cookies",
  "admin",
  "tools",
  "api",
  "sitemap.xml",
  "robots.txt",
  "ads.txt",
  "favicon.ico",
  "s",
  "_next",
  "__nextjs",
]);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;

  // Skip known reserved paths — let Next.js handle them normally
  if (!shortCode || RESERVED_PATHS.has(shortCode.toLowerCase())) {
    return NextResponse.next();
  }

  try {
    await ensureDatabaseInitialized();
    const record = await prisma.shortUrl.findFirst({
      where: {
        OR: [{ shortCode }, { customAlias: shortCode }],
      },
    });

    if (!record) {
      // Not a short code — let Next.js render the 404 page
      return NextResponse.next();
    }

    // Check expiration
    if (record.expiresAt && new Date() > record.expiresAt) {
      return NextResponse.redirect(new URL("/?error=link_expired", req.url));
    }

    // Security check on destination URL
    let target: URL;
    try {
      target = new URL(record.originalUrl);
    } catch {
      return NextResponse.redirect(new URL("/?error=invalid_destination", req.url));
    }

    if (target.protocol !== "http:" && target.protocol !== "https:") {
      return NextResponse.redirect(new URL("/?error=unsafe_protocol", req.url));
    }

    // Increment click count asynchronously in background
    prisma.shortUrl
      .update({
        where: { id: record.id },
        data: { clicks: { increment: 1 } },
      })
      .catch((e) => console.error("Click increment error:", e));

    // Redirect to destination
    return NextResponse.redirect(target.toString(), 307);
  } catch (err) {
    console.error("Short URL redirect error:", err);
    return NextResponse.redirect(new URL("/?error=server_error", req.url));
  }
}
