"use client";

import { useState } from "react";

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
      className="px-4 py-2 bg-champagne text-midnight text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-champagne-hover transition-colors shadow-md shadow-champagne/20 disabled:opacity-50"
    >
      {loading ? "Redirecting..." : "Pay Now"}
    </button>
  );
}
