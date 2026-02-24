"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createGallery } from "../actions/gallery-actions";
import ImageUpload from "@/components/ui/ImageUpload";

type Treatment = { id: string; name: string };

export default function GalleryForm({ treatments }: { treatments: Treatment[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  
  const [imageBeforeUrl, setImageBeforeUrl] = useState("");
  const [imageAfterUrl, setImageAfterUrl] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createGallery(formData);
      if (res?.error) setError(res.error); 
      else router.push("/admin/gallery");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 premium-glass p-10 rounded-3xl">
      {error && <div className="p-4 text-sm text-red-200 bg-red-900/30 border-l-2 border-red-500 rounded-r-md">{error}</div>}
      
      {}
      <input type="hidden" name="imageBefore" value={imageBeforeUrl} />
      <input type="hidden" name="imageAfter" value={imageAfterUrl} />

      <div className="space-y-2 group">
        <label className="premium-label">Pilih Treatment</label>
        <select name="treatmentId" required defaultValue="" className="premium-input appearance-none bg-midnight-light">
          <option value="" disabled>Pilih Treatment...</option>
          {treatments.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2 group">
          <label className="premium-label block mb-2">Foto Before</label>
          <ImageUpload value={imageBeforeUrl} onChange={setImageBeforeUrl} />
        </div>
        <div className="space-y-2 group">
          <label className="premium-label block mb-2">Foto After</label>
          <ImageUpload value={imageAfterUrl} onChange={setImageAfterUrl} />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4">
        <input type="checkbox" name="showOnWeb" id="showOnWeb" defaultChecked className="w-5 h-5 accent-blue-500 rounded cursor-pointer" />
        <label htmlFor="showOnWeb" className="text-sm font-semibold text-text-light cursor-pointer">
          Tampilkan di Halaman Web Publik
        </label>
      </div>

      <div className="pt-8 flex justify-end gap-4 border-t border-frost-border">
        <button type="button" onClick={() => router.back()} className="px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase text-text-muted hover:text-text-light transition-colors">Batal</button>
        <button type="submit" disabled={isPending} className="premium-button">{isPending ? "Menyimpan..." : "Simpan Galeri"}</button>
      </div>
    </form>
  );
}
