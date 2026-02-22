import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. Proteksi rute spesifik (Harus login & role sesuai)
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (path.startsWith("/doctor") && token?.role !== "DOCTOR") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (path.startsWith("/patient") && token?.role !== "PATIENT") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // 2. Jika user SUDAH LOGIN tapi mencoba akses halaman /login
    if (path === "/login") {
        if (token?.role === "ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
        if (token?.role === "DOCTOR") return NextResponse.redirect(new URL("/doctor", req.url));
        if (token?.role === "PATIENT") return NextResponse.redirect(new URL("/", req.url)); // Patient ke landing page
    }

    // 3. Jika user SUDAH LOGIN dan mencoba akses Beranda ("/")
    if (path === "/") {
        // Admin & Doctor langsung dilempar ke dashboard masing-masing
        if (token?.role === "ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
        if (token?.role === "DOCTOR") return NextResponse.redirect(new URL("/doctor", req.url));
        // Untuk PATIENT, biarkan mereka stay di "/" (tidak di-redirect)
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        if (path.startsWith("/admin") || path.startsWith("/doctor") || path.startsWith("/patient")) {
          return !!token;
        }
        return true; 
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/doctor/:path*", "/patient/:path*", "/", "/login"],
};