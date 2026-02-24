import { prisma } from "@/lib/prisma";
import GalleryForm from "@/features/gallery/components/GalleryForm";

export default async function NewGalleryPage() {
 
  const treatments = await prisma.treatment.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-8 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight">Tambah Galeri Baru</h1>
      <GalleryForm treatments={treatments} />
    </div>
  );
}
