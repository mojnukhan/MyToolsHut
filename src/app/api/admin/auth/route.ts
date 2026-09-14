import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json();
    const adminKey = process.env.ADMIN_SECRET_KEY || "toolnest-admin-secure-key-2026";

    if (!key || key !== adminKey) {
      return NextResponse.json(
        { error: "Invalid admin key or unauthorized access." },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ success: true, role: "ADMIN" });
    res.cookies.set("toolnest_admin_token", adminKey, {
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
  res.cookies.delete("toolnest_admin_token");
  return res;
}
