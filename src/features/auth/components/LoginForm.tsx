"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    setError("");
    
    const res = await signIn("credentials", { redirect: false, email, password });
    
    if (res?.error) { 
      setError("Invalid email or password. Please try again."); 
      setLoading(false); 
    } else { 
      router.refresh(); 
      router.push("/"); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 text-sm text-red-200 bg-red-900/30 backdrop-blur-md border-l-2 border-red-500 rounded-r-md">
          {error}
        </div>
      )}
      
      <div className="space-y-2 group">
        <label className="premium-label">Email Address</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="premium-input" 
          placeholder="name@example.com" 
        />
      </div>
      
      <div className="space-y-2 pt-2 group">
        <div className="flex justify-between items-center">
          <label className="premium-label">Password</label>
          {/* Fitur nyata: Forgot Password (bisa lo kembangin nanti buat kirim email reset) */}
          <Link href="#" className="text-[10px] font-bold text-champagne hover:text-white transition-colors uppercase tracking-widest">
            Forgot?
          </Link>
        </div>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="premium-input" 
          placeholder="••••••••" 
        />
      </div>
      
      <button type="submit" disabled={loading} className="w-full mt-8 premium-button">
        {loading ? "Authenticating..." : "Sign In Securely"}
      </button>

      {/* Info untuk pasien baru agar tidak kebingungan */}
      <div className="text-center mt-6 pt-6 border-t border-frost-border">
        <p className="text-xs text-text-muted font-light">
          New patient?{" "}
          <Link href="/contact" className="text-champagne font-semibold hover:text-white transition-colors">
            Contact our clinic
          </Link>
          {" "}to register.
        </p>
      </div>
    </form>
  );
}
