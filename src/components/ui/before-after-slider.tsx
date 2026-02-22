"use client";

import { useState, useRef } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
    const x = Math.max(0, Math.min(clientX - containerRect.left, containerRect.width));
    const percent = Math.max(0, Math.min((x / containerRect.width) * 100, 100));
    setSliderPosition(percent);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-video overflow-hidden rounded-xl shadow-2xl cursor-ew-resize select-none group"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {}
      <img 
        src={afterImage} 
        alt="After Treatment" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
      />
      
      {}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt="Before Treatment" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
        />
      </div>

      {}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#d4af37] transition-transform group-hover:scale-110">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
      
      {}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm uppercase tracking-wider backdrop-blur-sm">Before</div>
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm uppercase tracking-wider backdrop-blur-sm">After</div>
    </div>
  );
}
