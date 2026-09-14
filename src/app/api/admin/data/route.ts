import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TOOLS, CATEGORIES } from "@/lib/tools/registry";

export async function GET(req: NextRequest) {
  const adminKey = process.env.ADMIN_SECRET_KEY || "mytoolshut-admin-secure-key-2026";
  const cookie = req.cookies.get("mytoolshut_admin_token")?.value;
  const header = req.headers.get("x-admin-key");

  if (cookie !== adminKey && header !== adminKey) {
    return NextResponse.json({ error: "Unauthorized access to admin API." }, { status: 401 });
  }

  try {
    // 1. Fetch short URL stats
    const totalShortUrls = await prisma.shortUrl.count();
    const clicksAggregate = await prisma.shortUrl.aggregate({
      _sum: { clicks: true },
    });
    const totalClicks = clicksAggregate._sum.clicks || 0;

    // 2. Fetch latest short links
    const recentUrls = await prisma.shortUrl.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // 3. Tool statistics
    const totalTools = TOOLS.length;
    const implementedTools = TOOLS.filter((t) => t.isImplemented).length;
    const localTools = TOOLS.filter((t) => t.localProcessing).length;

    // 4. Category breakdown
    const categoryStats = Object.keys(CATEGORIES).map((key) => {
      const catKey = key as keyof typeof CATEGORIES;
      const count = TOOLS.filter((t) => t.category === catKey).length;
      return {
        name: CATEGORIES[catKey].name,
        key: catKey,
        count,
      };
    });

    // 5. Basic system health
    const memUsage = process.memoryUsage();
    const systemHealth = {
      database: "Connected (SQLite/Prisma)",
      nodeVersion: process.version,
      platform: process.platform,
      memoryHeapUsed: `${(memUsage.heapUsed / 1024 / 1024).toFixed(1)} MB`,
      uptimeSeconds: Math.round(process.uptime()),
    };

    return NextResponse.json({
      totalShortUrls,
      totalClicks,
      recentUrls,
      totalTools,
      implementedTools,
      localTools,
      categoryStats,
      systemHealth,
    });
  } catch (err) {
    console.error("Admin data fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch admin dashboard metrics" }, { status: 500 });
  }
}
