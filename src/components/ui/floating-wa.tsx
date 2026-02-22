"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/6281122334455" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
    >
      <span className="absolute w-full h-full bg-[#25D366] rounded-full animate-ping opacity-75"></span>
      <MessageCircle size={28} className="relative z-10" />
      
      {}
      <span className="absolute right-full mr-4 bg-white text-[#333] px-3 py-1 rounded shadow-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us!
      </span>
    </a>
  );
}
