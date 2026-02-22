"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBranch } from "../actions/branch-actions";

export default function BranchForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createBranch(formData);
      if (res?.error) setError(res.error); else router.push("/admin/branches");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 premium-glass p-10 rounded-3xl">
      {error && <div className="p-4 text-sm text-red-200 bg-red-900/30 backdrop-blur-md border-l-2 border-red-500 rounded-r-md">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2 group"><label className="premium-label">Branch Name</label><input type="text" name="name" required className="premium-input" placeholder="e.g. Aurelia Bali" /></div>
        <div className="space-y-2 group"><label className="premium-label">City</label><input type="text" name="city" required className="premium-input" placeholder="e.g. Denpasar" /></div>
        <div className="space-y-2 group md:col-span-2"><label className="premium-label">Full Address</label><input type="text" name="address" required className="premium-input" placeholder="Enter detailed address" /></div>
        <div className="space-y-2 group"><label className="premium-label">Phone Number</label><input type="text" name="phone" required className="premium-input" placeholder="e.g. 0361-123456" /></div>
      </div>
      <div className="pt-8 flex justify-end gap-4 border-t border-frost-border">
        <button type="button" onClick={() => router.back()} className="px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase text-text-muted hover:text-text-light transition-colors">Cancel</button>
        <button type="submit" disabled={isPending} className="premium-button">{isPending ? "Saving..." : "Save Branch"}</button>
      </div>
    </form>
  );
}
