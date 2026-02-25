"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";

export default function CheckoutButton({ appointmentId }: { appointmentId: string }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId }),
      });

      const data = await res.json();
      
      if (data.url) {
       
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout Failed:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout} 
      disabled={loading}
      className="w-full py-2.5 rounded-xl border border-champagne/30 text-champagne text-[10px] font-bold uppercase tracking-widest hover:bg-champagne hover:text-midnight transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
    >
      <CreditCard size={14} />
      {loading ? "Redirecting..." : "Pay Now"}
    </button>
  );
}