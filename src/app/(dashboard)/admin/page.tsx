import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  format,
  startOfMonth,
  endOfMonth,
  subMonths,
  eachDayOfInterval,
} from "date-fns";
import RevenueChart from "./RevenueChart";

export default async function AdminDashboard() {
  const cardClass =
    "premium-glass p-8 rounded-3xl relative overflow-hidden group hover:border-champagne/30 transition-colors";

  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = endOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));

 
 
 
  const currentMonthAppointments = await prisma.appointment.findMany({
    where: {
      paymentStatus: "FULLY_PAID",
      startTime: { gte: currentMonthStart, lte: currentMonthEnd },
    },
    include: { treatmentBranch: true },
  });

  const currentRevenue = currentMonthAppointments.reduce(
    (sum, apt) => sum + apt.treatmentBranch.price,
    0,
  );

  const lastMonthAppointments = await prisma.appointment.findMany({
    where: {
      paymentStatus: "FULLY_PAID",
      startTime: { gte: lastMonthStart, lte: lastMonthEnd },
    },
    include: { treatmentBranch: true },
  });
  const lastRevenue = lastMonthAppointments.reduce(
    (sum, apt) => sum + apt.treatmentBranch.price,
    0,
  );

  let revenueGrowth = 0;
  if (lastRevenue > 0)
    revenueGrowth = ((currentRevenue - lastRevenue) / lastRevenue) * 100;
  else if (currentRevenue > 0) revenueGrowth = 100;

 
  const daysInMonth = eachDayOfInterval({ start: currentMonthStart, end: now });
  const chartData = daysInMonth.map((day) => {
   
    const dailyIncome = currentMonthAppointments
      .filter(
        (apt) => new Date(apt.startTime).toDateString() === day.toDateString(),
      )
      .reduce((sum, apt) => sum + apt.treatmentBranch.price, 0);

    return {
      date: format(day, "dd MMM"),
      revenue: dailyIncome,
    };
  });

 
 
 
  const currentMonthActiveApts = await prisma.appointment.count({
    where: {
      status: { notIn: ["CANCELLED", "NO_SHOW"] },
      startTime: { gte: currentMonthStart, lte: currentMonthEnd },
    },
  });

  const upcomingApts = await prisma.appointment.count({
    where: {
      status: { notIn: ["CANCELLED", "NO_SHOW"] },
      startTime: { gte: now },
    },
  });

 
 
 
  const totalPatients = await prisma.user.count({
    where: { role: "PATIENT" },
  });

  const newPatientsThisMonth = await prisma.user.count({
    where: {
      role: "PATIENT",
      createdAt: { gte: currentMonthStart, lte: currentMonthEnd },
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-serif text-text-light mb-1">Overview</h1>
          <p className="text-sm text-text-muted font-light">
            Your clinic's performance at a glance.
          </p>
        </div>
        <div className="text-xs text-champagne uppercase tracking-widest font-bold bg-champagne/10 px-4 py-2 rounded-full border border-champagne/20">
          {format(now, "MMMM yyyy")}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {}
        <div className={cardClass}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-champagne/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-champagne/10 transition-colors"></div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-champagne mb-3 relative z-10">
            Revenue This Month
          </p>
          <p
            className="text-4xl font-serif text-text-light relative z-10 truncate"
            title={`Rp ${currentRevenue.toLocaleString("id-ID")}`}
          >
            Rp{" "}
            {currentRevenue > 1000000
              ? `${(currentRevenue / 1000000).toFixed(1)}M`
              : currentRevenue.toLocaleString("id-ID")}
          </p>
          <div className="mt-4 flex items-center gap-2 relative z-10 text-xs">
            <span
              className={`font-bold px-2 py-0.5 rounded-full ${revenueGrowth >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
            >
              {revenueGrowth >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(revenueGrowth).toFixed(1)}%
            </span>
            <span className="text-text-muted">vs last month</span>
          </div>
        </div>

        {}
        <div className={cardClass}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-500/10 transition-colors"></div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-blue-400 mb-3 relative z-10">
            Appointments This Month
          </p>
          <p className="text-4xl font-serif text-text-light relative z-10">
            {currentMonthActiveApts}
          </p>
          <div className="mt-4 text-xs text-text-muted relative z-10 flex items-center gap-2">
            <span className="text-blue-400 font-bold">{upcomingApts}</span>{" "}
            upcoming schedules
          </div>
        </div>

        {}
        <div className={cardClass}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-500/10 transition-colors"></div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-purple-400 mb-3 relative z-10">
            Total Patients
          </p>
          <p className="text-4xl font-serif text-text-light relative z-10">
            {totalPatients}
          </p>
          <div className="mt-4 text-xs text-text-muted flex items-center gap-2 relative z-10">
            <span className="text-purple-400 font-bold">
              +{newPatientsThisMonth}
            </span>{" "}
            new this month
          </div>
        </div>
      </div>

      {}
      <div className="premium-glass p-8 rounded-3xl mt-8">
        <h2 className="text-sm font-bold text-text-light uppercase tracking-wider mb-6 flex items-center gap-3">
          Revenue Trend
          <span className="bg-champagne/20 text-champagne text-[9px] px-2 py-1 rounded-md">
            This Month
          </span>
        </h2>
        {}
        <RevenueChart data={chartData} />
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link
          href="/admin/doctors/new"
          className="premium-glass p-6 rounded-2xl flex items-center justify-between group hover:border-champagne/50 transition-all border border-white/5"
        >
          <span className="text-sm font-bold text-text-light uppercase tracking-wider">
            Add New Doctor
          </span>
          <span className="text-champagne group-hover:translate-x-2 transition-transform">
            →
          </span>
        </Link>
        <Link
          href="/admin/branches/new"
          className="premium-glass p-6 rounded-2xl flex items-center justify-between group hover:border-champagne/50 transition-all border border-white/5"
        >
          <span className="text-sm font-bold text-text-light uppercase tracking-wider">
            Open New Branch
          </span>
          <span className="text-champagne group-hover:translate-x-2 transition-transform">
            →
          </span>
        </Link>
        <Link
          href="/admin/pricing/new"
          className="premium-glass p-6 rounded-2xl flex items-center justify-between group hover:border-champagne/50 transition-all border border-white/5"
        >
          <span className="text-sm font-bold text-text-light uppercase tracking-wider">
            Configure Pricing
          </span>
          <span className="text-champagne group-hover:translate-x-2 transition-transform">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
