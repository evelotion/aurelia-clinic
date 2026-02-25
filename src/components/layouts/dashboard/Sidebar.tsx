"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CalendarDays, 
  MapPin, 
  Syringe, 
  CircleDollarSign, 
  Users, 
  Image as ImageIcon,
  Clock,
  FileText
} from "lucide-react";
import LogoutButton from "@/components/ui/LogoutButton";

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  
  const menus = {
    ADMIN: [
      { name: "Overview", path: "/admin", icon: LayoutDashboard },
      { name: "Finance & Report", path: "/admin/finance", icon: FileText },
      { name: "Patients", path: "/admin/patients", icon: Users },
      { name: "Doctors", path: "/admin/doctors", icon: Users },
      { name: "Appointments", path: "/admin/appointments", icon: CalendarDays },
      { name: "Branches", path: "/admin/branches", icon: MapPin },
      { name: "Treatments", path: "/admin/treatments", icon: Syringe },
      { name: "Pricing", path: "/admin/pricing", icon: CircleDollarSign },
      { name: "Gallery", path: "/admin/gallery", icon: ImageIcon },
    ],
    DOCTOR: [
      { name: "My Schedule", path: "/doctor", icon: Clock },
      { name: "Appointments", path: "/doctor/appointments", icon: CalendarDays },
    ],
    PATIENT: [
      { name: "My Dashboard", path: "/patient", icon: LayoutDashboard },
      { name: "Book Appointment", path: "/patient/book", icon: CalendarDays },
      { name: "Invoices", path: "/patient/invoices", icon: FileText },
    ]
  };

  const activeMenu = menus[role as keyof typeof menus] || [];

  return (
    <aside className="w-72 bg-midnight-light/30 backdrop-blur-2xl text-text-light min-h-screen flex flex-col border-r border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] z-20">
      <div className="h-28 flex flex-col items-center justify-center relative mb-4">
        <div className="absolute inset-0 bg-champagne/10 blur-[30px] rounded-full scale-75"></div>
        
        <Link href="/" className="flex flex-col items-center justify-center group relative z-10">
          <h1 className="text-2xl font-serif text-champagne tracking-[0.25em] bg-clip-text bg-gradient-to-r from-champagne via-white to-champagne text-transparent transition-all duration-500 group-hover:scale-105 drop-shadow-md">
            AURELIA
          </h1>
          <div className="h-[1px] w-12 bg-champagne/40 my-2 transition-all duration-500 group-hover:w-full"></div>
          <span className="text-[10px] font-medium text-text-muted uppercase tracking-[0.3em] transition-colors duration-300 group-hover:text-champagne/90 drop-shadow-sm">
            {role} PORTAL
          </span>
        </Link>
      </div>

      <div className="px-6 mb-4">
        <p className="text-[10px] font-semibold text-text-muted/60 uppercase tracking-widest ml-2">
          Menu
        </p>
      </div>

      <nav className="flex-1 flex flex-col gap-1.5 px-4 overflow-y-auto pb-8 custom-scrollbar">
        {activeMenu.map((item) => {
          const Icon = item.icon;
          
          const isDashboard = item.path === "/admin" || item.path === "/doctor" || item.path === "/patient";
          const isActive = isDashboard 
            ? pathname === item.path 
            : pathname === item.path || pathname.startsWith(`${item.path}/`);

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`relative px-4 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-4 group overflow-hidden ${
                isActive 
                  ? "text-champagne bg-white/10 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md" 
                  : "text-text-muted hover:bg-white/5 hover:text-text-light hover:border hover:border-white/5 border border-transparent"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-2/3 bg-gradient-to-b from-champagne/80 to-champagne rounded-r-full shadow-[0_0_12px_rgba(212,175,55,0.6)]"></div>
              )}
              
              <Icon 
                size={18} 
                strokeWidth={isActive ? 2.5 : 2} 
                className={`transition-all duration-300 ${
                  isActive ? "text-champagne scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" : "text-text-muted group-hover:text-text-light"
                }`} 
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {}
      <div className="p-4 border-t border-white/10 mt-auto">
        <LogoutButton />
      </div>
    </aside>
  );
}