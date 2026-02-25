"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createGallery(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") return { error: "Unauthorized access." };

  try {
    const treatmentId = formData.get("treatmentId") as string;
    const imageBefore = formData.get("imageBefore") as string;
    const imageAfter = formData.get("imageAfter") as string;
    const showOnWeb = formData.get("showOnWeb") === "on";

    if (!treatmentId || !imageBefore || !imageAfter) {
      return { error: "Semua data (Treatment, Foto Before, dan Foto After) wajib diisi." };
    }

    await prisma.beforeAfterGallery.create({
      data: { treatmentId, imageBefore, imageAfter, showOnWeb }
    });

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Terjadi kesalahan saat menyimpan galeri." };
  }
}