"use client";
import { signOut } from "next-auth/react";

export default function Header({ user }: { user: any }) {
  return (
    <header className="bg-midnight/30 backdrop-blur-2xl border-b border-white/10 h-24 flex items-center justify-end px-10 sticky top-0 z-10 transition-all shadow-sm">
      
      {}
      
      <div className="flex items-center gap-5">
        {}
        <div className="hidden md:flex flex-col items-end mr-2">
           <span className="text-sm font-medium text-white tracking-wide">
             {user?.name || "Guest"}
           </span>
           <span className="text-[9px] text-champagne tracking-[0.2em] uppercase font-bold mt-0.5">
             {user?.role || "PORTAL"}
           </span>
        </div>

        {}
        <div className="w-11 h-11 rounded-full bg-champagne/10 backdrop-blur-md border border-champagne/30 flex items-center justify-center text-champagne font-serif text-lg shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          {user?.name?.charAt(0) || "U"}
        </div>
        
        {}
        <div className="w-px h-8 bg-white/10 mx-2"></div>
        
        {}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-red-400 transition-colors"
        >
          Sign Out
        </button>
      </div>
      
    </header>
  );
}