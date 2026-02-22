"use client";
import { useTransition } from "react";
import { deleteDoctor } from "../actions/doctor-actions";

export default function DoctorList({ doctors }: { doctors: any[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (userId: string, name: string) => {
    if (confirm(`Remove ${name}'s account?`)) startTransition(() => deleteDoctor(userId));
  };

  if (doctors.length === 0) return <div className="premium-glass p-12 rounded-3xl text-center"><p className="text-text-muted font-light">No doctors registered yet.</p></div>;

  return (
    <div className="premium-glass rounded-3xl overflow-hidden">
      <table className="min-w-full divide-y divide-frost-border">
        <thead className="bg-frost">
          <tr>
            <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Doctor Profile</th>
            <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Contact & Branch</th>
            <th className="px-8 py-5 text-right text-[10px] font-bold text-text-muted uppercase tracking-widest">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-frost-border bg-transparent">
          {doctors.map((doc) => (
            <tr key={doc.id} className="hover:bg-frost transition-colors">
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-midnight-light border border-frost-border flex items-center justify-center text-champagne font-serif text-xl shadow-sm">
                    {doc.user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-base font-serif text-text-light font-semibold">{doc.user.name}</div>
                    <div className="text-[10px] font-bold text-champagne uppercase tracking-widest mt-1">{doc.specialization}</div>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="text-sm text-text-light">{doc.user.email}</div>
                <div className="text-xs text-text-muted mt-1">{doc.branch.name}</div>
              </td>
              <td className="px-8 py-6 text-right">
                <button disabled={isPending} onClick={() => handleDelete(doc.user.id, doc.user.name)} className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors disabled:opacity-50">Revoke Access</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
