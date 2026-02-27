"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Tambahkan parameter page dan limit
export async function getPatients(page: number = 1, limit: number = 10) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || session.user.role !== "ADMIN") {
    // Sesuaikan return type jika tidak ada akses
    return { patients: [], totalPatients: 0, totalPages: 0 };
  }

  // Hitung data yang harus dilewati
  const skip = (page - 1) * limit;

  // Gunakan Promise.all agar fetch data dan hitung total berjalan paralel
  const [patients, total] = await Promise.all([
    prisma.user.findMany({
      where: { role: "PATIENT" },
      include: {
        membership: true,
        _count: {
          select: { appointments: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit, // Batasi 10 data
    }),
    prisma.user.count({ where: { role: "PATIENT" } })
  ]);

  return { 
    patients, 
    totalPatients: total,
    totalPages: Math.ceil(total / limit) 
  };
}