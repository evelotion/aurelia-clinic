import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function AdminGalleryPage() {
  const galleries = await prisma.beforeAfterGallery.findMany({
    include: { treatment: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Galeri Before-After</h1>
        <Link href="/admin/gallery/new" className="premium-button">Tambah Galeri</Link>
      </div>
      <div className="premium-glass rounded-3xl overflow-hidden p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-sm tracking-wider uppercase text-text-muted">
              <th className="p-4 font-medium">Treatment</th>
              <th className="p-4 font-medium">Before</th>
              <th className="p-4 font-medium">After</th>
              <th className="p-4 font-medium">Status Publik</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {galleries.map((g) => (
              <tr key={g.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 font-semibold text-text-light">{g.treatment.name}</td>
                <td className="p-4">
                  <div className="w-16 h-16 relative rounded-md overflow-hidden border border-white/10">
                    <Image src={g.imageBefore} alt="Before" fill className="object-cover" />
                  </div>
                </td>
                <td className="p-4">
                  <div className="w-16 h-16 relative rounded-md overflow-hidden border border-white/10">
                    <Image src={g.imageAfter} alt="After" fill className="object-cover" />
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${g.showOnWeb ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {g.showOnWeb ? "DITAMPILKAN" : "DISEMBUNYIKAN"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {galleries.length === 0 && (
          <div className="text-center py-10 text-text-muted">Belum ada galeri yang ditambahkan.</div>
        )}
      </div>
    </div>
  );
}
