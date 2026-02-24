"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-red-400 hover:bg-white/5 rounded-full transition-all"
    >
      <LogOut size={14} />
      <span className="hidden sm:inline">Sign Out</span>
    </button>
  );
}