import { FileText, Download, CheckCircle2, Clock } from "lucide-react";

export default function PatientInvoicesPage() {
  // Data statis sementara (Dummy Data) untuk ngelihat UI-nya.
  // Nanti bisa diganti pakai fetch dari prisma.appointment atau prisma.invoice
  const invoices = [
    {
      id: "INV-202602-001",
      date: "20 Feb 2026",
      treatment: "Skin Rejuvenation Laser",
      amount: "Rp 3.500.000",
      status: "PAID",
    },
    {
      id: "INV-202601-042",
      date: "15 Jan 2026",
      treatment: "Premium Dermal Fillers",
      amount: "Rp 5.200.000",
      status: "PAID",
    },
    {
      id: "INV-202603-010",
      date: "01 Mar 2026",
      treatment: "Aesthetic Wellness IV",
      amount: "Rp 1.800.000",
      status: "UNPAID",
    }
  ];

  return (
    <div className="min-h-screen bg-midnight text-text-light p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-12">
          <span className="text-champagne tracking-[0.2em] text-[10px] font-bold uppercase mb-2 block">
            Billing & Payments
          </span>
          <h1 className="text-4xl font-serif text-white mb-4">Your <span className="text-champagne italic">Invoices</span></h1>
          <p className="text-text-muted font-light text-sm">
            View and manage your treatment billing history and download official receipts.
          </p>
        </div>

        {/* TABLE SECTION */}
        <div className="premium-glass rounded-2xl overflow-hidden border border-frost-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-frost-border bg-midnight-light/50">
                  <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Invoice ID</th>
                  <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Date</th>
                  <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Treatment</th>
                  <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Amount</th>
                  <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Status</th>
                  <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-frost-border">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-5 px-6 font-mono text-sm text-white">{inv.id}</td>
                    <td className="py-5 px-6 text-sm text-text-muted">{inv.date}</td>
                    <td className="py-5 px-6 text-sm text-white">{inv.treatment}</td>
                    <td className="py-5 px-6 text-sm font-medium text-champagne">{inv.amount}</td>
                    <td className="py-5 px-6">
                      {inv.status === "PAID" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-wider">
                          <CheckCircle2 className="w-3 h-3" /> PAID
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold tracking-wider">
                          <Clock className="w-3 h-3" /> UNPAID
                        </span>
                      )}
                    </td>
                    <td className="py-5 px-6 text-right">
                      <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-frost-border hover:border-champagne/50 hover:bg-champagne/10 text-champagne transition-all text-[10px] font-bold uppercase tracking-[0.1em]">
                        <Download className="w-3 h-3" /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* EMPTY STATE */}
          {invoices.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center">
              <FileText className="w-12 h-12 text-frost-border mb-4" />
              <p className="text-text-muted text-sm">No invoices found for your account.</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
