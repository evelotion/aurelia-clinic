import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export default async function AdminDashboard() {
  const cardClass = "premium-glass p-8 rounded-3xl relative overflow-hidden group hover:border-champagne/30 transition-colors";
  
  // 1. Hitung Total Revenue (Ambil semua appointment yang FULLY_PAID)
  const paidAppointments = await prisma.appointment.findMany({
    where: { paymentStatus: 'FULLY_PAID' },
    include: { treatmentBranch: true }
  });
  const totalRevenue = paidAppointments.reduce((sum, apt) => sum + apt.treatmentBranch.price, 0);

  // 2. Hitung Active Appointments (Jadwal hari ini yang tidak dibatalkan)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const activeAppointments = await prisma.appointment.count({
    where: {
      status: { not: 'CANCELLED' },
      startTime: { gte: today, lt: tomorrow }
    }
  });

  // 3. Hitung Total Pasien
  const totalPatients = await prisma.user.count({
    where: { role: 'PATIENT' }
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <h1 className="text-3xl font-serif text-text-light">Overview</h1>
        <div className="text-xs text-text-muted uppercase tracking-widest font-bold">
            {format(new Date(), 'EEEE, d MMMM yyyy')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* REVENUE CARD */}
        <div className={cardClass}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-champagne/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-champagne/10 transition-colors"></div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-champagne mb-3 relative z-10">Total Revenue</p>
          <p className="text-4xl font-serif text-text-light relative z-10">
            Rp {totalRevenue.toLocaleString("id-ID")}
          </p>
          <div className="mt-4 text-xs text-text-muted flex items-center gap-2 relative z-10">
            <span className="text-green-400">All Time</span> validated income
          </div>
        </div>

        {/* APPOINTMENTS CARD */}
        <div className={cardClass}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-500/10 transition-colors"></div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-champagne mb-3 relative z-10">Active Appointments</p>
          <p className="text-4xl font-serif text-text-light relative z-10">{activeAppointments}</p>
          <div className="mt-4 text-xs text-text-muted relative z-10">
            Upcoming for today
          </div>
        </div>

        {/* PATIENTS CARD */}
        <div className={cardClass}>
           <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-500/10 transition-colors"></div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-champagne mb-3 relative z-10">Total Patients</p>
          <p className="text-4xl font-serif text-text-light relative z-10">{totalPatients}</p>
          <div className="mt-4 text-xs text-text-muted flex items-center gap-2 relative z-10">
            Registered in system
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link href="/admin/doctors/new" className="premium-glass p-6 rounded-2xl flex items-center justify-between group hover:border-champagne/50 transition-all border border-white/5">
              <span className="text-sm font-bold text-text-light uppercase tracking-wider">Add New Doctor</span>
              <span className="text-champagne group-hover:translate-x-2 transition-transform">→</span>
          </Link>
           <Link href="/admin/branches/new" className="premium-glass p-6 rounded-2xl flex items-center justify-between group hover:border-champagne/50 transition-all border border-white/5">
              <span className="text-sm font-bold text-text-light uppercase tracking-wider">Open New Branch</span>
              <span className="text-champagne group-hover:translate-x-2 transition-transform">→</span>
          </Link>
           <Link href="/admin/pricing/new" className="premium-glass p-6 rounded-2xl flex items-center justify-between group hover:border-champagne/50 transition-all border border-white/5">
              <span className="text-sm font-bold text-text-light uppercase tracking-wider">Configure Pricing</span>
              <span className="text-champagne group-hover:translate-x-2 transition-transform">→</span>
          </Link>
      </div>
    </div>
  );
}