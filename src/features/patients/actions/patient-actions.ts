"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getPatients() {
  const session = await getServerSession(authOptions);
  
 
  if (!session?.user || session.user.role !== "ADMIN") return [];

  return await prisma.user.findMany({
    where: { role: "PATIENT" },
    include: {
      membership: true,
      _count: {
        select: { appointments: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}