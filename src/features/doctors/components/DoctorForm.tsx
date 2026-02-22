"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createDoctor } from "../actions/doctor-actions";

export default function DoctorForm({ branches }: { branches: any[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createDoctor(formData);
      if (res?.error) setError(res.error); else router.push("/admin/doctors");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 premium-glass p-10 rounded-3xl">
      {error && <div className="p-4 text-sm text-red-200 bg-red-900/30 backdrop-blur-md border-l-2 border-red-500 rounded-r-md">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2 border-b border-frost-border pb-2 mb-4"><h3 className="text-sm font-serif font-semibold text-champagne uppercase tracking-widest">Account Details</h3></div>
        <div className="space-y-2 group"><label className="premium-label">Full Name & Title</label><input type="text" name="name" required className="premium-input" placeholder="e.g. Dr. Sarah Aesthetic" /></div>
        <div className="space-y-2 group"><label className="premium-label">Email Address</label><input type="email" name="email" required className="premium-input" placeholder="e.g. sarah@aurelia.com" /></div>
        <div className="space-y-2 group md:col-span-2"><label className="premium-label">Initial Password</label><input type="password" name="password" required minLength={6} className="premium-input" placeholder="••••••••" /></div>

        <div className="md:col-span-2 border-b border-frost-border pb-2 pt-6 mb-4"><h3 className="text-sm font-serif font-semibold text-champagne uppercase tracking-widest">Professional Profile</h3></div>
        <div className="space-y-2 group"><label className="premium-label">Assign to Branch</label>
          <select name="branchId" required defaultValue="" className="premium-input appearance-none bg-midnight-light">
            <option value="" disabled>Choose clinic branch...</option>
            {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        <div className="space-y-2 group"><label className="premium-label">Specialization</label><input type="text" name="specialization" required className="premium-input" placeholder="e.g. Anti-Aging Specialist" /></div>
        <div className="space-y-2 group md:col-span-2"><label className="premium-label">Professional Bio</label><textarea name="bio" rows={3} className="premium-input resize-none" placeholder="Brief description..." /></div>
      </div>

      <div className="pt-8 flex justify-end gap-4 border-t border-frost-border">
        <button type="button" onClick={() => router.back()} className="px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase text-text-muted hover:text-text-light transition-colors">Cancel</button>
        <button type="submit" disabled={isPending} className="premium-button">{isPending ? "Creating Account..." : "Register Doctor"}</button>
      </div>
    </form>
  );
}
