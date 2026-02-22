"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPricing } from "../actions/pricing-actions";

export default function PricingForm({ branches, treatments }: { branches: any[], treatments: any[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createPricing(formData);
      if (res?.error) setError(res.error); else router.push("/admin/pricing");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 premium-glass p-10 rounded-3xl">
      {error && <div className="p-4 text-sm text-red-200 bg-red-900/30 backdrop-blur-md border-l-2 border-red-500 rounded-r-md">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2 group"><label className="premium-label">Select Branch</label>
          <select name="branchId" required defaultValue="" className="premium-input appearance-none bg-midnight-light">
            <option value="" disabled>Choose location...</option>
            {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        <div className="space-y-2 group"><label className="premium-label">Select Treatment</label>
          <select name="treatmentId" required defaultValue="" className="premium-input appearance-none bg-midnight-light">
            <option value="" disabled>Choose treatment...</option>
            {treatments.map(t => <option key={t.id} value={t.id}>{t.name} ({t.category})</option>)}
          </select>
        </div>
        <div className="space-y-2 group"><label className="premium-label">Price (IDR)</label><input type="number" name="price" min="0" required className="premium-input" placeholder="e.g. 2500000" /></div>
        <div className="space-y-2 group"><label className="premium-label">Duration (Minutes)</label><input type="number" name="durationMin" min="5" step="5" required className="premium-input" placeholder="e.g. 45" /></div>
      </div>
      <div className="pt-8 flex justify-end gap-4 border-t border-frost-border">
        <button type="button" onClick={() => router.back()} className="px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase text-text-muted hover:text-text-light transition-colors">Cancel</button>
        <button type="submit" disabled={isPending} className="premium-button">{isPending ? "Saving..." : "Save Pricing"}</button>
      </div>
    </form>
  );
}
