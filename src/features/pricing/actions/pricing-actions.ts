"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { pricingSchema } from "../schemas/pricing-schema";

export async function getPricings() {
  return await prisma.treatmentBranch.findMany({
    include: {
      branch: true,
      treatment: true,
    },
    orderBy: [
      { branch: { name: 'asc' } },
      { treatment: { name: 'asc' } }
    ]
  });
}

export async function createPricing(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = pricingSchema.safeParse(data);
  
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  try {
    await prisma.treatmentBranch.create({
      data: {
        branchId: parsed.data.branchId,
        treatmentId: parsed.data.treatmentId,
        price: parsed.data.price,
        durationMin: parsed.data.durationMin,
      },
    });
    revalidatePath("/admin/pricing");
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "This treatment is already priced for this branch. Please edit the existing one." };
    }
    return { error: "Failed to add pricing." };
  }
}

export async function deletePricing(id: string) {
  try {
    await prisma.treatmentBranch.delete({ where: { id } });
    revalidatePath("/admin/pricing");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete pricing." };
  }
}
