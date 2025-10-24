import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // فقط نحمي مسارات /admin
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      // لو مفيش توكن — نعيد التوجيه لصفحة تسجيل الدخول
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // حماية كل ما تحت /admin
};