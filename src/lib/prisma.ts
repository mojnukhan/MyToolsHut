import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

// Ensure DATABASE_URL is always defined even if not provided in server env
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./dev.db";
}

// Ensure the prisma directory exists for SQLite storage
try {
  const prismaDir = path.join(process.cwd(), "prisma");
  if (!fs.existsSync(prismaDir)) {
    fs.mkdirSync(prismaDir, { recursive: true });
  }
} catch {
  // Ignore filesystem permission warnings
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

let initPromise: Promise<void> | null = null;

/**
 * Ensures required database tables and indexes exist.
 * This guarantees zero-crash startup even on fresh deployments,
 * platforms without migration steps, or empty SQLite files.
 */
export async function ensureDatabaseInitialized(): Promise<void> {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "ShortUrl" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "originalUrl" TEXT NOT NULL,
          "shortCode" TEXT NOT NULL,
          "customAlias" TEXT,
          "clicks" INTEGER NOT NULL DEFAULT 0,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "expiresAt" DATETIME,
          "userId" TEXT
        );
      `);

      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "ShortUrl_shortCode_key" ON "ShortUrl"("shortCode");
      `);

      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "ShortUrl_customAlias_key" ON "ShortUrl"("customAlias");
      `);

      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "AdminUser" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "email" TEXT NOT NULL,
          "passwordHash" TEXT NOT NULL,
          "role" TEXT NOT NULL DEFAULT 'ADMIN',
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "AdminUser_email_key" ON "AdminUser"("email");
      `);

      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "ToolUsage" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "toolSlug" TEXT NOT NULL,
          "action" TEXT NOT NULL DEFAULT 'run',
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
    } catch (err) {
      console.warn("Database auto-init notice:", err);
      // Reset so next invocation can retry
      initPromise = null;
    }
  })();

  return initPromise;
}
