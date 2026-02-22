"use client";
import { useTransition } from "react";
import { deleteBranch } from "../actions/branch-actions";

export default function BranchList({ branches }: { branches: any[] }) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = (id: string, name: string) => { if (confirm(`Delete ${name}?`)) startTransition(() => deleteBranch(id)); };
  if (branches.length === 0) return <div className="premium-glass p-12 rounded-3xl text-center"><p className="text-text-muted font-light">No branches found.</p></div>;

  return (
    <div className="premium-glass rounded-3xl overflow-hidden">
      <table className="min-w-full divide-y divide-frost-border">
        <thead className="bg-frost">
          <tr>
            <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Branch Details</th>
            <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Contact</th>
            <th className="px-8 py-5 text-right text-[10px] font-bold text-text-muted uppercase tracking-widest">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-frost-border bg-transparent">
          {branches.map((branch) => (
            <tr key={branch.id} className="hover:bg-frost transition-colors">
              <td className="px-8 py-6">
                <div className="text-base font-serif text-text-light font-semibold">{branch.name}</div>
                <div className="text-xs text-text-muted mt-1">{branch.address}, {branch.city}</div>
              </td>
              <td className="px-8 py-6 text-sm text-text-light">{branch.phone}</td>
              <td className="px-8 py-6 text-right">
                <button disabled={isPending} onClick={() => handleDelete(branch.id, branch.name)} className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors disabled:opacity-50">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
