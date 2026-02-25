"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Sparkles, Loader2, ArrowRight, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to register.");
      } else {
        setSuccess(data.message);
        setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
   
    <main className="min-h-screen flex bg-midnight font-sans text-text-light selection:bg-champagne selection:text-midnight">
      
      {}
      <div className="w-full lg:w-[50%] flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 bg-midnight relative z-10 lg:border-r lg:border-frost-border shadow-2xl py-16 min-h-screen">
        
        <div className="lg:hidden mb-12 text-center mt-6">
          <Sparkles className="text-champagne mb-4 mx-auto" size={28} />
          <h1 className="text-3xl font-serif text-champagne tracking-widest">AURELIA</h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md mx-auto lg:mx-0 my-auto"
        >
          {}
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-text-muted hover:text-champagne transition-colors tracking-widest uppercase mb-6 lg:mb-8 mt-4 lg:mt-0">
            <ArrowLeft size={14} />
            Back to Home
          </Link>

          <div className="mb-8 mt-4 lg:mt-0">
            <p className="text-champagne tracking-[0.3em] uppercase text-[9px] font-bold mb-3">
              Client Portal
            </p>
            <h2 className="text-3xl font-serif text-text-light mb-2">Create Account</h2>
            <p className="text-text-muted text-sm font-light">Register to start your aesthetic journey with us.</p>
          </div>

          {error && (
            <div className="p-4 text-sm text-red-200 bg-red-900/30 backdrop-blur-md border-l-2 border-red-500 rounded-md mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 text-sm text-green-200 bg-green-900/30 backdrop-blur-md border-l-2 border-green-500 rounded-md mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2 group">
              <label className="premium-label">Full Name</label>
              <input 
                type="text" name="name" value={formData.name} onChange={handleChange}
                className="premium-input bg-transparent" placeholder="Jane Doe" required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="premium-label">Email Address</label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  className="premium-input bg-transparent" placeholder="name@example.com" required
                />
              </div>
              <div className="space-y-2 group">
                <label className="premium-label">Phone Number</label>
                <input 
                  type="text" name="phone" value={formData.phone} onChange={handleChange}
                  className="premium-input bg-transparent" placeholder="+62 812..." required
                />
              </div>
            </div>
            
            <div className="space-y-2 group relative">
              <label className="premium-label">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                  className="premium-input bg-transparent pr-10" placeholder="••••••••" required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-text-muted hover:text-champagne transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2 group relative">
              <label className="premium-label">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                  className="premium-input bg-transparent pr-10" placeholder="••••••••" required
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-text-muted hover:text-champagne transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" disabled={isLoading || !!success}
              className="w-full premium-button mt-4 flex items-center justify-center gap-3 group"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : (
                <>
                  Register Securely
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-frost-border mb-8 lg:mb-0">
            <p className="text-xs text-text-muted font-light text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-champagne font-semibold hover:text-white transition-colors border-b border-transparent hover:border-champagne pb-0.5">
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {}
      <div className="hidden lg:flex lg:w-[50%] sticky top-0 h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.jpg" 
            alt="Aurelia Editorial" 
            className="w-full h-full object-cover object-center opacity-70 grayscale-[20%] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-midnight/60 via-midnight/20 to-midnight"></div>
        </div>
        
        <div className="relative z-10 px-16 max-w-2xl text-left w-full">
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <Sparkles className="text-champagne mb-8" size={32} />
            <h1 className="text-5xl xl:text-7xl font-serif text-champagne mb-6 tracking-widest leading-tight">
              BEGIN YOUR <br/> JOURNEY
            </h1>
            <div className="border-l-2 border-champagne/30 pl-6 py-2 mt-8">
              <p className="text-text-muted text-lg font-light leading-relaxed italic">
                "Experience personalized care and discover the best version of yourself."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}