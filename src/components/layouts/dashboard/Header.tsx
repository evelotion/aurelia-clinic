"use client";
import { signOut } from "next-auth/react";

export default function Header({ user }: { user: any }) {
  return (
    <header className="bg-midnight/30 backdrop-blur-md border-b border-frost-border h-24 flex items-center justify-between px-10 sticky top-0 z-10 transition-all shadow-sm">
      <div>
        <h2 className="text-xl font-serif text-text-light font-medium">
          Welcome back, <span className="text-champagne">{user?.name?.split(' ')[0]}</span>
        </h2>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-10 h-10 rounded-full bg-frost backdrop-blur-md border border-frost-border flex items-center justify-center text-champagne font-serif text-lg shadow-sm">
          {user?.name?.charAt(0)}
        </div>
        <div className="w-px h-8 bg-frost-border"></div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-xs font-bold uppercase tracking-widest text-text-muted hover:text-champagne transition-colors"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
