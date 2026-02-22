import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

   
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (path.startsWith("/doctor") && token?.role !== "DOCTOR") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (path.startsWith("/patient") && token?.role !== "PATIENT") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

   
    if (path === "/") {
        if (token?.role === "ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
        if (token?.role === "DOCTOR") return NextResponse.redirect(new URL("/doctor", req.url));
        if (token?.role === "PATIENT") return NextResponse.redirect(new URL("/patient", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);


export const config = {
  matcher: ["/admin/:path*", "/doctor/:path*", "/patient/:path*"],
};