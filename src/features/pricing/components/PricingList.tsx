"use client";
import { useTransition } from "react";
import { deletePricing } from "../actions/pricing-actions";

export default function PricingList({ pricings }: { pricings: any[] }) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = (id: string, name: string) => { if (confirm(`Remove pricing for ${name}?`)) startTransition(() => { deletePricing(id); }); };
  if (pricings.length === 0) return <div className="premium-glass p-12 rounded-3xl text-center"><p className="text-text-muted font-light">No pricing configurations found.</p></div>;

  return (
    <div className="premium-glass rounded-3xl overflow-hidden">
      <table className="min-w-full divide-y divide-frost-border">
        <thead className="bg-frost">
          <tr>
            <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Branch</th>
            <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Treatment</th>
            <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Price & Duration</th>
            <th className="px-8 py-5 text-right text-[10px] font-bold text-text-muted uppercase tracking-widest">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-frost-border bg-transparent">
          {pricings.map((p) => (
            <tr key={p.id} className="hover:bg-frost transition-colors">
              <td className="px-8 py-6 text-sm font-semibold text-text-light">{p.branch.name}</td>
              <td className="px-8 py-6 text-sm text-text-light">{p.treatment.name}</td>
              <td className="px-8 py-6">
                <div className="text-sm font-serif text-champagne font-bold">Rp {new Intl.NumberFormat('id-ID').format(p.price)}</div>
                <div className="text-xs text-text-muted">{p.durationMin} mins</div>
              </td>
              <td className="px-8 py-6 text-right">
                <button disabled={isPending} onClick={() => handleDelete(p.id, p.treatment.name)} className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors disabled:opacity-50">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

