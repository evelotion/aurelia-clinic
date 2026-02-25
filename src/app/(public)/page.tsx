import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Clock } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-midnight text-text-light overflow-hidden">
      {}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-bg.jpg" 
            alt="Aurelia Clinic Hero" 
            fill 
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/20 via-midnight/50 to-midnight"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mt-20">
          <span className="text-champagne tracking-[0.4em] text-[10px] md:text-xs font-bold uppercase mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-champagne/50"></span>
            Redefining Beauty
            <span className="w-8 h-[1px] bg-champagne/50"></span>
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 tracking-wide leading-tight">
            Elevate Your <br className="hidden md:block" />
            <span className="text-champagne italic">Natural</span> Radiance
          </h1>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mb-12 font-light leading-relaxed">
            Experience the pinnacle of aesthetic medicine in a sanctuary of luxury and discretion. Tailored treatments for your unique elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/patient/book" className="premium-button flex items-center justify-center gap-3 group">
              Book Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/treatments" className="px-8 py-3 bg-transparent border border-champagne/30 text-champagne rounded-xl text-xs font-bold tracking-[0.2em] uppercase hover:bg-champagne/10 hover:border-champagne transition-all duration-300 flex items-center justify-center">
              Our Treatments
            </Link>
          </div>
        </div>
      </section>

      {}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative h-[500px] lg:h-[700px] w-full rounded-2xl overflow-hidden group">
            <Image 
              src="/images/clinic-lobby.jpg" 
              alt="Aurelia Experience" 
              fill 
              className="object-cover transition-transform duration-[2s] group-hover:scale-105" 
            />
            <div className="absolute inset-0 border border-champagne/20 rounded-2xl z-10 m-4 pointer-events-none"></div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
              The Art of <br/> <span className="text-champagne italic">Subtle Refinement</span>
            </h2>
            <p className="text-text-muted text-lg mb-12 leading-relaxed font-light">
              At Aurelia, we believe that true beauty whispers, it doesn't shout. Our bespoke treatments are meticulously crafted to enhance your unique features, combining cutting-edge medical technology with an artist's delicate touch.
            </p>
            
            <ul className="space-y-8">
              {[
                { icon: Sparkles, title: "Bespoke Treatment Plans", desc: "Tailored specifically to your anatomical needs and aesthetic goals." },
                { icon: ShieldCheck, title: "World-Class Experts", desc: "Board-certified specialists dedicated to continuous medical innovation." },
                { icon: Clock, title: "Uncompromising Privacy", desc: "A highly discreet environment where your comfort is our highest priority." }
              ].map((item, i) => (
                <li key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full premium-glass flex items-center justify-center border border-champagne/20 group-hover:border-champagne/50 transition-colors">
                    <item.icon className="w-6 h-6 text-champagne" />
                  </div>
                  <div>
                    <h3 className="text-white font-serif text-xl mb-2 tracking-wide">{item.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {}
      <section className="py-32 px-4 bg-midnight-light relative border-y border-frost-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Signature <span className="text-champagne italic">Treatments</span></h2>
              <p className="text-text-muted leading-relaxed font-light">
                Curated procedures designed to deliver transformative, natural-looking results using the industry's most advanced technologies.
              </p>
            </div>
            <Link href="/treatments" className="inline-flex items-center gap-2 border-b border-champagne text-champagne pb-1 hover:text-white hover:border-white transition-colors uppercase tracking-[0.2em] text-xs font-bold shrink-0">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Skin Rejuvenation", img: "/images/treatment-anti-aging.jpg", desc: "Advanced laser therapies and medical-grade peels to restore your skin's youthful luminosity." },
              { title: "Precision Injectables", img: "/images/treatment-injection.jpg", desc: "Expertly placed neuromodulators and dermal fillers for subtle contouring and wrinkle reduction." },
              { title: "Aesthetic Wellness", img: "/images/treatment-room.jpg", desc: "Holistic approaches including IV therapies and advanced cellular regeneration treatments." }
            ].map((treatment, i) => (
              <Link href="/treatments" key={i} className="group relative rounded-2xl overflow-hidden block h-[450px]">
                <Image src={treatment.img} alt={treatment.title} fill className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
                  <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-champagne transition-colors">{treatment.title}</h3>
                  <p className="text-sm text-text-muted mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 leading-relaxed">
                    {treatment.desc}
                  </p>
                  <div className="flex items-center text-champagne text-[10px] font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    Discover More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-24 px-4 bg-midnight relative border-b border-frost-border">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center divide-x-0 md:divide-x divide-frost-border">
          {[
            { label: "Years of Excellence", value: "15+" },
            { label: "Satisfied Patients", value: "10k+" },
            { label: "Expert Specialists", value: "12" },
            { label: "Industry Awards", value: "25+" }
          ].map((stat, i) => (
            <div key={i} className="px-4">
              <h4 className="text-4xl md:text-5xl font-serif text-champagne mb-4">{stat.value}</h4>
              <p className="text-text-muted text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
