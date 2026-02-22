"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-midnight/80 backdrop-blur-xl border-b border-frost-border py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif text-champagne tracking-[0.2em] bg-clip-text bg-gradient-to-r from-champagne to-white text-transparent">
          AURELIA
        </Link>
        <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-widest text-text-muted">
          <Link href="/treatments" className="hover:text-champagne transition-colors">Treatments</Link>
          <Link href="/gallery" className="hover:text-champagne transition-colors">Gallery</Link>
          <Link href="/about" className="hover:text-champagne transition-colors">The Clinic</Link>
        </div>
        <Link href="/login" className="px-6 py-3 premium-glass rounded-xl text-champagne text-[10px] font-bold uppercase tracking-widest hover:bg-champagne hover:text-midnight transition-all shadow-lg">
          Client Portal
        </Link>
      </div>
    </nav>
  );
}
