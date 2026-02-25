import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import DownloadReportButton from "./DownloadReportButton";

export default async function AdminFinancePage() {
 
  const paidAppointments = await prisma.appointment.findMany({
    where: { paymentStatus: 'FULLY_PAID' },
    include: {
      patient: true,
      treatmentBranch: {
        include: { treatment: true, branch: true }
      }
    },
    orderBy: { updatedAt: 'desc' }
  });

  const totalRevenue = paidAppointments.reduce((sum, apt) => sum + apt.treatmentBranch.price, 0);

 
  const reportData = paidAppointments.map(apt => ({
    date: format(new Date(apt.updatedAt), "dd MMM yyyy HH:mm"),
    patient: apt.patient.name,
    treatment: apt.treatmentBranch.treatment.name,
    branch: apt.treatmentBranch.branch.name,
    amount: apt.treatmentBranch.price
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-white/10 pb-6">
        <div>
            <h1 className="text-3xl font-serif text-text-light mb-2">Finance & Reports</h1>
            <p className="text-text-muted text-sm font-light">Monitor all validated payments from Midtrans.</p>
            
            {}
            {reportData.length > 0 && (
              <DownloadReportButton data={reportData} />
            )}
        </div>
        <div className="text-left md:text-right bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
            <p className="text-[10px] font-bold text-champagne uppercase tracking-widest mb-1">Total Net Income</p>
            <p className="text-3xl font-serif text-white">Rp {totalRevenue.toLocaleString("id-ID")}</p>
        </div>
      </div>

      <div className="premium-glass rounded-2xl overflow-hidden border border-frost-border mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-frost-border bg-midnight-light/50">
                <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Transaction Date</th>
                <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Patient</th>
                <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Treatment</th>
                <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Branch</th>
                <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-frost-border">
              {paidAppointments.length === 0 ? (
                 <tr>
                    <td colSpan={5} className="py-10 text-center text-text-muted text-sm">
                       No completed transactions found yet.
                    </td>
                 </tr>
              ) : (
                  paidAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="py-5 px-6 text-sm text-text-muted font-mono">
                        {format(new Date(apt.updatedAt), "dd MMM yyyy, HH:mm")}
                      </td>
                      <td className="py-5 px-6 text-sm text-white font-medium flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-champagne/20 flex items-center justify-center text-[10px] text-champagne">
                            {apt.patient.name.charAt(0).toUpperCase()}
                        </div>
                        {apt.patient.name}
                      </td>
                      <td className="py-5 px-6 text-sm text-white">
                        {apt.treatmentBranch.treatment.name}
                      </td>
                      <td className="py-5 px-6 text-sm text-text-muted">
                        {apt.treatmentBranch.branch.name}
                      </td>
                      <td className="py-5 px-6 text-sm font-medium text-emerald-400 flex items-center gap-2">
                        Rp {apt.treatmentBranch.price.toLocaleString("id-ID")}
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}