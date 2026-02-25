import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    return NextResponse.redirect(new URL("/login?error=InvalidVerificationLink", req.url));
  }

  const existingToken = await prisma.verificationToken.findFirst({
    where: { token, identifier: email },
  });

  if (!existingToken || existingToken.expires < new Date()) {
    return NextResponse.redirect(new URL("/login?error=TokenExpired", req.url));
  }

 
  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });

 
  await prisma.verificationToken.delete({
    where: { token: existingToken.token },
  });

  return NextResponse.redirect(new URL("/login?verified=true", req.url));
}