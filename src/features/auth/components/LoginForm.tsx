"use client";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";


export default function LoginForm() {
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
     
      const session = await getSession();
      const userRole = session?.user?.role;

     
     
      if (userRole === "ADMIN") {
        window.location.href = "/admin";
      } else if (userRole === "DOCTOR") {
        window.location.href = "/doctor";
      } else {
        window.location.href = "/";
      }
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

      <div className="text-center mt-6 pt-6 border-t border-frost-border">
        <p className="text-xs text-text-muted font-light">
          New patient?{" "}
<Link href="/register" className="text-champagne font-semibold hover:text-white transition-colors border-b border-transparent hover:border-champagne pb-0.5">
  Register here
</Link>
{" "}to create an account.
        </p>
      </div>
    </form>
  );
}