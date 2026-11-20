import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password format" },
        { status: 400 }
      );
    }

    const expectedEmail = process.env.ADMIN_EMAIL || "admin@vicecloud.gg";
    const expectedPassword = process.env.ADMIN_PASSWORD || "ViceCloud@Admin2026!";

    if (
      validated.data.email.toLowerCase() === expectedEmail.toLowerCase() &&
      validated.data.password === expectedPassword
    ) {
      const response = NextResponse.json({
        success: true,
        message: "Admin authenticated successfully",
        admin: { email: expectedEmail, role: "SuperAdmin" },
      });

      // Set admin session cookie
      response.cookies.set("vc_admin_session", "authenticated_admin_2026", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Incorrect admin credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
