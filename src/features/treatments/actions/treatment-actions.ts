"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { treatmentSchema } from "../schemas/treatment-schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getTreatments() {
  return await prisma.treatment.findMany({
    orderBy: { category: 'asc' }
  });
}

export async function createTreatment(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized access." };

  const data = Object.fromEntries(formData.entries());
  const parsed = treatmentSchema.safeParse(data);
  
  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  try {
    await prisma.treatment.create({
      data: {
        name: parsed.data.name,
        category: parsed.data.category,
        description: parsed.data.description,
      },
    });
    revalidatePath("/admin/treatments");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create treatment. Please try again." };
  }
}

export async function deleteTreatment(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized access." };

  try {
    await prisma.treatment.delete({
      where: { id }
    });
    revalidatePath("/admin/treatments");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete treatment." };
  }
}