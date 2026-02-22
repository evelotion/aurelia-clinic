"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { branchSchema } from "../schemas/branch-schema";

export async function getBranches() {
  return await prisma.branch.findMany({
    orderBy: { name: 'asc' }
  });
}

export async function createBranch(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = branchSchema.safeParse(data);
  
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    await prisma.branch.create({
      data: parsed.data,
    });
    revalidatePath("/admin/branches");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create branch. Please try again." };
  }
}

export async function deleteBranch(id: string) {
  try {
    await prisma.branch.delete({
      where: { id }
    });
    revalidatePath("/admin/branches");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete branch." };
  }
}
