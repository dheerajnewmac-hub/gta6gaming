import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /api/admin endpoints (except /api/admin/login)
  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login")) {
    const session = req.cookies.get("vc_admin_session");
    if (!session || session.value !== "authenticated_admin_2026") {
      return NextResponse.json({ success: false, error: "Unauthorized: Admin access required" }, { status: 401 });
    }
  }

  // Protect /admin UI pages (except /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = req.cookies.get("vc_admin_session");
    if (!session || session.value !== "authenticated_admin_2026") {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
