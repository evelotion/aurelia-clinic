"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTreatment } from "../actions/treatment-actions";
import ImageUpload from "@/components/ui/ImageUpload";

export default function TreatmentForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  
 
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createTreatment(formData);
      if (res?.error) setError(res.error); else router.push("/admin/treatments");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 premium-glass p-10 rounded-3xl">
      {error && <div className="p-4 text-sm text-red-200 bg-red-900/30 backdrop-blur-md border-l-2 border-red-500 rounded-r-md">{error}</div>}
      
      {}
      <input type="hidden" name="image" value={imageUrl} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2 group"><label className="premium-label">Treatment Name</label><input type="text" name="name" required className="premium-input" placeholder="e.g. Premium Botox" /></div>
        <div className="space-y-2 group"><label className="premium-label">Category</label>
          <select name="category" required defaultValue="" className="premium-input appearance-none bg-midnight-light">
            <option value="" disabled>Select Category...</option>
            <option value="Aesthetic">Aesthetic</option>
            <option value="Anti-Aging">Anti-Aging</option>
            <option value="Dental">Dental Care</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Plastic Surgery">Plastic Surgery</option>
            <option value="Wellness">Wellness & Spa</option>
          </select>
        </div>

        {}
        <div className="space-y-2 group md:col-span-2">
          <label className="premium-label block mb-2">Treatment Image</label>
          <ImageUpload 
            value={imageUrl} 
            onChange={(url) => setImageUrl(url)} 
          />
          <p className="text-xs text-text-muted mt-2">Gambar akan otomatis diunggah ke Cloudinary dan ditampilkan di halaman publik.</p>
        </div>

        <div className="space-y-2 group md:col-span-2"><label className="premium-label">Description</label><textarea name="description" rows={3} className="premium-input resize-none" placeholder="Brief description..." /></div>
      </div>
      <div className="pt-8 flex justify-end gap-4 border-t border-frost-border">
        <button type="button" onClick={() => router.back()} className="px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase text-text-muted hover:text-text-light transition-colors">Cancel</button>
        <button type="submit" disabled={isPending} className="premium-button">{isPending ? "Saving..." : "Save Treatment"}</button>
      </div>
    </form>
  );
}
