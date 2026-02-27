import { getPatients } from "@/features/patients/actions/patient-actions";
import { format } from "date-fns";
import { Users, Mail, Phone, CalendarDays } from "lucide-react";
// 1. Import komponen pagination lo
import Pagination from "@/components/ui/Pagination";

// 2. Tangkap searchParams dari props Next.js
export default async function AdminPatientsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // 3. Tentukan halaman saat ini (default: 1)
  const currentPage = Number(searchParams?.page) || 1;
  
  // 4. Panggil action dengan parameter halaman
  const { patients, totalPatients, totalPages } = await getPatients(currentPage, 10);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
            <h1 className="text-3xl font-serif text-text-light mb-2 flex items-center gap-3">
              <Users className="text-champagne" size={28} /> Patient Directory
            </h1>
            <p className="text-text-muted text-sm font-light">Manage your clinic's clients and view their engagement.</p>
        </div>
        <div className="text-right">
            <p className="text-[10px] font-bold text-champagne uppercase tracking-widest mb-1">Total Registered</p>
            {/* 5. Tampilkan jumlah total keseluruhan pasien, bukan cuma yang di-render */}
            <p className="text-2xl font-serif text-white">{totalPatients} Clients</p>
        </div>
      </div>

      <div className="premium-glass rounded-2xl overflow-hidden border border-frost-border mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-frost-border bg-midnight-light/50">
                <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Patient Info</th>
                <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Contact</th>
                <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Joined Date</th>
                <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] text-center">Total Visits</th>
                <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] text-right">Membership</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-frost-border">
              {patients.length === 0 ? (
                 <tr>
                    <td colSpan={5} className="py-10 text-center text-text-muted text-sm">
                       No patients registered yet.
                    </td>
                 </tr>
              ) : (
                  patients.map((patient: any) => (
                    <tr key={patient.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="py-4 px-6">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-serif text-sm">
                              {patient.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                               <p className="text-sm font-medium text-white">{patient.name}</p>
                            </div>
                         </div>
                      </td>

                      <td className="py-4 px-6 space-y-1.5">
                         <div className="flex items-center gap-2 text-xs text-text-muted">
                            <Mail size={12} className="text-champagne/70" /> {patient.email}
                         </div>
                         <div className="flex items-center gap-2 text-xs text-text-muted">
                            <Phone size={12} className="text-champagne/70" /> {patient.phone || "No phone added"}
                         </div>
                      </td>

                      <td className="py-4 px-6 text-sm text-text-muted flex items-center gap-2 mt-2">
                         <CalendarDays size={14} className="text-white/40" />
                         {format(new Date(patient.createdAt), "dd MMM yyyy")}
                      </td>

                      <td className="py-4 px-6 text-center">
                         <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white">
                            {patient._count.appointments}
                         </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                         {patient.membership ? (
                            <span className="inline-block px-3 py-1 rounded-full bg-champagne/20 border border-champagne/30 text-champagne text-[10px] font-bold uppercase tracking-wider">
                               {patient.membership.name}
                            </span>
                         ) : (
                            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-muted text-[10px] font-bold uppercase tracking-wider">
                               Standard
                            </span>
                         )}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* 6. Pasang Komponen Pagination di sini */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-frost-border bg-midnight-light/30">
            <Pagination totalPages={totalPages} />
          </div>
        )}
      </div>
    </div>
  );
}