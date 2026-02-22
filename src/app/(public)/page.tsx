import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* PERUBAHAN: src sekarang mengarah ke folder public/images/ */}
          <img 
            src="/images/hero-bg.jpg" 
            alt="Aurelia Luxury Clinic" 
            className="object-cover object-center w-full h-full grayscale-[30%] scale-105 animate-in zoom-in duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 via-midnight/50 to-midnight"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
          <div className="w-16 h-px bg-champagne mx-auto mb-8"></div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 tracking-wide leading-tight">
            Reveal Your <br/> <span className="text-champagne italic">True Radiance</span>
          </h1>
          <p className="text-text-muted text-sm md:text-base font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the pinnacle of aesthetic perfection. Where cutting-edge medical science meets the elegance of five-star hospitality.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/login" className="premium-button w-full sm:w-auto">
              Book Consultation
            </Link>
            <Link href="/treatments" className="px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase text-champagne hover:text-white transition-colors border-b border-transparent hover:border-champagne">
              Explore Treatments
            </Link>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION SECTION */}
      <section className="py-32 relative bg-midnight z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-serif text-champagne mb-4 tracking-widest">THE AURELIA STANDARD</h2>
            <p className="text-text-muted font-light max-w-xl mx-auto">Elevating aesthetic medicine to an art form.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="premium-glass p-10 rounded-3xl text-center group hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 mx-auto rounded-full bg-midnight-light border border-frost-border flex items-center justify-center text-champagne text-2xl mb-6 group-hover:bg-champagne group-hover:text-midnight transition-colors">
                ⚕️
              </div>
              <h3 className="text-lg font-serif text-text-light mb-4 tracking-wide">Medical Excellence</h3>
              <p className="text-sm text-text-muted font-light leading-relaxed">Board-certified specialists utilizing FDA-approved technology for safe, predictable, and stunning results.</p>
            </div>
            
            <div className="premium-glass p-10 rounded-3xl text-center group hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 mx-auto rounded-full bg-midnight-light border border-frost-border flex items-center justify-center text-champagne text-2xl mb-6 group-hover:bg-champagne group-hover:text-midnight transition-colors">
                ✨
              </div>
              <h3 className="text-lg font-serif text-text-light mb-4 tracking-wide">Bespoke Treatments</h3>
              <p className="text-sm text-text-muted font-light leading-relaxed">Every face is a masterpiece. We craft highly personalized treatment plans tailored to your unique anatomical structure.</p>
            </div>

            <div className="premium-glass p-10 rounded-3xl text-center group hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 mx-auto rounded-full bg-midnight-light border border-frost-border flex items-center justify-center text-champagne text-2xl mb-6 group-hover:bg-champagne group-hover:text-midnight transition-colors">
                🛎️
              </div>
              <h3 className="text-lg font-serif text-text-light mb-4 tracking-wide">Luxury Hospitality</h3>
              <p className="text-sm text-text-muted font-light leading-relaxed">From valet parking to post-treatment care, experience a level of service traditionally reserved for five-star resorts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CTA SECTION */}
      <section className="py-32 relative overflow-hidden">
         <div className="absolute inset-0 z-0">
          {/* Kalau lo punya gambar kedua, bisa taruh di sini, misal: /images/cta-bg.jpg */}
          <img 
            src="/images/hero-bg.jpg" 
            alt="Abstract Texture" 
            className="object-cover w-full h-full opacity-10 grayscale" 
          />
          <div className="absolute inset-0 bg-midnight-light/90 backdrop-blur-sm"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Ready to begin your journey?</h2>
            <p className="text-text-muted mb-10 max-w-xl mx-auto font-light">Join our exclusive clientele and secure your priority booking through our secure patient portal.</p>
            <Link href="/login" className="premium-button inline-block">
              Access Patient Portal
            </Link>
        </div>
      </section>
    </div>
  );
}
