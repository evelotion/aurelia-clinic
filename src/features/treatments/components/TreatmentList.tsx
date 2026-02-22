"use client";
import { useTransition } from "react";
import { deleteTreatment } from "../actions/treatment-actions";

export default function TreatmentList({ treatments }: { treatments: any[] }) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = (id: string, name: string) => { if (confirm(`Delete ${name}?`)) startTransition(() => { deleteTreatment(id); }); };
  if (treatments.length === 0) return <div className="premium-glass p-12 rounded-3xl text-center"><p className="text-text-muted font-light">No treatments found.</p></div>;

  return (
    <div className="premium-glass rounded-3xl overflow-hidden">
      <table className="min-w-full divide-y divide-frost-border">
        <thead className="bg-frost">
          <tr>
            <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Treatment Details</th>
            <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Category</th>
            <th className="px-8 py-5 text-right text-[10px] font-bold text-text-muted uppercase tracking-widest">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-frost-border bg-transparent">
          {treatments.map((treatment) => (
            <tr key={treatment.id} className="hover:bg-frost transition-colors">
              <td className="px-8 py-6">
                <div className="text-base font-serif text-text-light font-semibold">{treatment.name}</div>
                <div className="text-xs text-text-muted mt-1 max-w-md truncate">{treatment.description || "No description."}</div>
              </td>
              <td className="px-8 py-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-champagne/10 text-champagne border border-champagne/20">{treatment.category}</span>
              </td>
              <td className="px-8 py-6 text-right">
                <button disabled={isPending} onClick={() => handleDelete(treatment.id, treatment.name)} className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors disabled:opacity-50">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

