import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;

  if (!shortCode) {
    return NextResponse.redirect(new URL("/?error=missing_code", req.url));
  }

  try {
    const record = await prisma.shortUrl.findFirst({
      where: {
        OR: [{ shortCode }, { customAlias: shortCode }],
      },
    });

    if (!record) {
      return NextResponse.redirect(new URL("/?error=link_not_found", req.url));
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
