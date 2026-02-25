"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { doctorSchema } from "../schemas/doctor-schema";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getDoctors() {
  return await prisma.doctor.findMany({
    include: {
      user: true,
      branch: true,
    },
    orderBy: { user: { name: 'asc' } }
  });
}

export async function createDoctor(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized access." };

  const data = Object.fromEntries(formData.entries());
  const parsed = doctorSchema.safeParse(data);
  
  if (!parsed.success) return { error: (parsed.error as any).errors[0].message };

  try {
    const existingUser = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (existingUser) return { error: "Email is already registered in the system." };

    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

    await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: hashedPassword,
        role: 'DOCTOR',
        doctorProfile: {
          create: {
            branchId: parsed.data.branchId,
            specialization: parsed.data.specialization,
            bio: parsed.data.bio,
          }
        }
      }
    });

    revalidatePath("/admin/doctors");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create doctor account." };
  }
}

export async function deleteDoctor(userId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized access." };

  try {
    await prisma.user.delete({ where: { id: userId } });
    revalidatePath("/admin/doctors");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete doctor." };
  }
}