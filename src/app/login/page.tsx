"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials. Please try again.");
        setIsLoading(false);
      } else {
       
       
       
       
        
        window.location.href = "/";
      }
    } catch (err) {
      setError("An error occurred during login.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex relative overflow-hidden bg-midnight font-sans text-text-light selection:bg-champagne selection:text-midnight">
      
      {}
      <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {}
          <img 
            src="/images/login-bg.jpg" 
            alt="Aurelia Editorial" 
            className="w-full h-full object-cover object-center opacity-70 grayscale-[20%] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/60 via-midnight/20 to-midnight"></div>
        </div>
        
        <div className="relative z-10 px-16 max-w-2xl text-left w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Sparkles className="text-champagne mb-8" size={32} />
            <h1 className="text-5xl xl:text-7xl font-serif text-champagne mb-6 tracking-widest leading-tight">
              AURELIA
            </h1>
            <div className="border-l-2 border-champagne/30 pl-6 py-2 mt-8">
              <p className="text-text-muted text-lg font-light leading-relaxed italic">
                "Redefining the art of aesthetic perfection through advanced medical science and unparalleled luxury."
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 bg-midnight relative z-10 lg:border-l lg:border-frost-border shadow-2xl">
        
        <div className="lg:hidden mb-12 text-center">
          <Sparkles className="text-champagne mb-4 mx-auto" size={28} />
          <h1 className="text-3xl font-serif text-champagne tracking-widest">AURELIA</h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md mx-auto lg:mx-0"
        >
          <div className="mb-10">
            <p className="text-champagne tracking-[0.3em] uppercase text-[9px] font-bold mb-3">
              Client Portal
            </p>
            <h2 className="text-3xl font-serif text-text-light mb-2">Welcome Back</h2>
            <p className="text-text-muted text-sm font-light">Sign in to access your secure dashboard.</p>
          </div>

          {error && (
            <div className="p-4 text-sm text-red-200 bg-red-900/30 backdrop-blur-md border-l-2 border-red-500 rounded-md mb-8">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2 group">
              <label className="premium-label">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="premium-input bg-transparent"
                placeholder="name@example.com"
                required
              />
            </div>
            
            <div className="space-y-2 pt-2 group">
              <div className="flex justify-between items-center">
                <label className="premium-label">Password</label>
                <Link href="#" className="text-[10px] font-bold text-text-muted hover:text-champagne transition-colors uppercase tracking-widest">
                  Forgot?
                </Link>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="premium-input bg-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full premium-button mt-4 flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Sign In Securely
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-frost-border">
            <p className="text-xs text-text-muted font-light">
              New patient?{" "}
              <Link href="/contact" className="text-champagne font-semibold hover:text-white transition-colors border-b border-transparent hover:border-champagne pb-0.5">
                Contact our clinic
              </Link>
              {" "}to register.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
