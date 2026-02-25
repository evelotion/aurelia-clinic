"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getPatients() {
  const session = await getServerSession(authOptions);
  
  // Keamanan: Cuma Admin yang boleh narik data semua pasien
  if (!session?.user || session.user.role !== "ADMIN") return [];

  return await prisma.user.findMany({
    where: { role: "PATIENT" },
    include: {
      membership: true, // Ambil data tier membership-nya (Gold/Silver dll)
      _count: {
        select: { appointments: true } // Hitung otomatis total kunjungannya
      }
    },
    orderBy: { createdAt: 'desc' } // Urutkan dari pasien terbaru
  });
}