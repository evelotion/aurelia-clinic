import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Proteksi rute spesifik
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (path.startsWith("/doctor") && token?.role !== "DOCTOR") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (path.startsWith("/patient") && token?.role !== "PATIENT") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Jika user SUDAH LOGIN tapi mencoba akses beranda atau halaman login
    // Maka langsung lempar ke dashboard masing-masing
    if (path === "/" || path === "/login") {
        if (token?.role === "ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
        if (token?.role === "DOCTOR") return NextResponse.redirect(new URL("/doctor", req.url));
        if (token?.role === "PATIENT") return NextResponse.redirect(new URL("/patient", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        // Wajibkan login HANYA untuk rute dashboard ini
        if (path.startsWith("/admin") || path.startsWith("/doctor") || path.startsWith("/patient")) {
          return !!token;
        }
        // Izinkan tamu (belum login) untuk mengakses rute lainnya (termasuk "/" dan "/login")
        return true; 
      },
    },
  }
);

// Tambahkan "/" dan "/login" ke matcher agar middleware ikut memantaunya
export const config = {
  matcher: ["/admin/:path*", "/doctor/:path*", "/patient/:path*", "/", "/login"],
};
