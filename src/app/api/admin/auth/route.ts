import { NextRequest, NextResponse } from "next/server";

function isValidAdminKey(key: string | null | undefined): boolean {
  if (!key) return false;
  const trimmed = key.trim();
  const allowed = [
    process.env.ADMIN_SECRET_KEY,
    "mytoolshut-admin-secure-key-2026",
    "toolnest-admin-secure-key-2026",
  ].filter(Boolean) as string[];
  return allowed.includes(trimmed);
}

export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json();

    if (!isValidAdminKey(key)) {
      return NextResponse.json(
        { error: "Invalid admin key or unauthorized access." },
        { status: 401 }
      );
    }

    const token = (key as string).trim();
    const res = NextResponse.json({ success: true, role: "ADMIN" });
    res.cookies.set("mytoolshut_admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("mytoolshut_admin_token");
  return res;
}
