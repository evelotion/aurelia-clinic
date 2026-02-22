import Link from "next/link";

export default function AdminDashboard() {
  const cardClass = "premium-glass p-8 rounded-3xl";
  
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-serif text-text-light">Overview</h1>
        <div className="text-xs text-text-muted uppercase tracking-widest font-bold">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={cardClass}>
          <p className="text-[10px] font-bold tracking-widest uppercase text-champagne mb-3">Total Revenue (Mtd)</p>
          <p className="text-4xl font-serif text-text-light">Rp 0</p>
          <div className="mt-4 text-xs text-text-muted flex items-center gap-2">
            <span className="text-green-400">↑ 0%</span> vs last month
          </div>
        </div>
        <div className={cardClass}>
          <p className="text-[10px] font-bold tracking-widest uppercase text-champagne mb-3">Active Appointments</p>
          <p className="text-4xl font-serif text-text-light">0</p>
          <div className="mt-4 text-xs text-text-muted">
            Upcoming today
          </div>
        </div>
        <div className={cardClass}>
          <p className="text-[10px] font-bold tracking-widest uppercase text-champagne mb-3">Total Patients</p>
          <p className="text-4xl font-serif text-text-light">0</p>
          <div className="mt-4 text-xs text-text-muted flex items-center gap-2">
            <span className="text-green-400">↑ 0</span> new this week
          </div>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link href="/admin/doctors/new" className="premium-glass p-6 rounded-2xl flex items-center justify-between group hover:border-champagne/50 transition-all">
              <span className="text-sm font-bold text-text-light uppercase tracking-wider">Add New Doctor</span>
              <span className="text-champagne group-hover:translate-x-2 transition-transform">→</span>
          </Link>
           <Link href="/admin/branches/new" className="premium-glass p-6 rounded-2xl flex items-center justify-between group hover:border-champagne/50 transition-all">
              <span className="text-sm font-bold text-text-light uppercase tracking-wider">Open New Branch</span>
              <span className="text-champagne group-hover:translate-x-2 transition-transform">→</span>
          </Link>
           <Link href="/admin/pricing/new" className="premium-glass p-6 rounded-2xl flex items-center justify-between group hover:border-champagne/50 transition-all">
              <span className="text-sm font-bold text-text-light uppercase tracking-wider">Configure Pricing</span>
              <span className="text-champagne group-hover:translate-x-2 transition-transform">→</span>
          </Link>
      </div>
    </div>
  );
}
