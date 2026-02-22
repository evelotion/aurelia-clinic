"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  
  const menus = {
    ADMIN: [
      { name: "Overview", path: "/admin" },
      { name: "Appointments", path: "/admin/appointments" },
      { name: "Branches", path: "/admin/branches" },
      { name: "Treatments", path: "/admin/treatments" },
      { name: "Pricing", path: "/admin/pricing" },
      { name: "Doctors", path: "/admin/doctors" },
    ],
    DOCTOR: [
      { name: "My Schedule", path: "/doctor" },
      { name: "Appointments", path: "/doctor/appointments" },
    ],
    PATIENT: [
      { name: "My Dashboard", path: "/patient" },
      { name: "Book Appointment", path: "/patient/book" },
      { name: "Invoices", path: "/patient/invoices" },
    ]
  };

  const activeMenu = menus[role as keyof typeof menus] || [];

  return (
    <aside className="w-72 bg-midnight-light/80 backdrop-blur-xl text-text-light min-h-screen flex flex-col border-r border-frost-border shadow-2xl z-20">
      <div className="h-24 flex flex-col items-center justify-center border-b border-frost-border relative">
        <h1 className="text-2xl font-serif text-champagne tracking-[0.2em] bg-clip-text bg-gradient-to-r from-champagne to-white text-transparent">AURELIA</h1>
        <span className="text-[9px] text-text-muted uppercase tracking-widest mt-1">{role} PORTAL</span>
      </div>
      <nav className="flex-1 py-10 flex flex-col gap-2 px-6">
        {activeMenu.map((item) => {
          const isActive = pathname.startsWith(item.path) && (item.path !== "/admin" || pathname === "/admin");
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`px-5 py-3.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-3 ${
                isActive 
                  ? "bg-frost text-champagne border border-frost-border translate-x-1 shadow-lg shadow-black/20" 
                  : "text-text-muted hover:bg-frost hover:text-text-light"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
