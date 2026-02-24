import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;
  const userRole = token?.role ? String(token.role).toUpperCase() : null;

  if (token && path === "/login") {
    if (userRole === "ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
    if (userRole === "DOCTOR") return NextResponse.redirect(new URL("/doctor", req.url));
    if (userRole === "PATIENT") return NextResponse.redirect(new URL("/patient", req.url));
    return NextResponse.redirect(new URL("/", req.url)); 
  }

  if (path.startsWith("/admin")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    if (userRole !== "ADMIN") return NextResponse.redirect(new URL("/", req.url));
  }

  if (path.startsWith("/doctor")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    if (userRole !== "DOCTOR") return NextResponse.redirect(new URL("/", req.url));
  }

  if (path.startsWith("/patient")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    if (userRole !== "PATIENT") return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/doctor/:path*", "/patient/:path*", "/", "/login"],
};