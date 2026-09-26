import { NextRequest, NextResponse } from "next/server";
import { createShortUrl, checkRateLimit } from "@/lib/shortener/service";

export async function POST(req: NextRequest) {
  try {
    // Rate limit by client IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const isAllowed = checkRateLimit(ip, 30, 60000);
    if (!isAllowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before creating more short URLs." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { originalUrl, customAlias, expiresInDays } = body;

    if (!originalUrl || typeof originalUrl !== "string") {
      return NextResponse.json(
        { error: "Original URL is required." },
        { status: 400 }
      );
    }

    const result = await createShortUrl({
      originalUrl,
      customAlias: typeof customAlias === "string" ? customAlias : undefined,
      expiresInDays: typeof expiresInDays === "number" ? expiresInDays : undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to create short URL" },
        { status: 400 }
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (err: unknown) {
    console.error("URL Shortener API error:", err);
    const message =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred while creating your short link.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
