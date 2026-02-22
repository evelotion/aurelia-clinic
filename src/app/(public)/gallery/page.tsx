import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function GalleryPage() {
  // Narik data tambahan dari database (kalau admin udah upload)
  const galleries = await prisma.beforeAfterGallery.findMany({
    where: { showOnWeb: true },
    include: { treatment: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-20 bg-midnight relative overflow-hidden">
      {/* Background Ornamen */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-champagne/5 to-transparent pointer-events-none"></div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 w-full text-center mb-24 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-champagne mb-6 tracking-widest leading-tight">
          The Art of <br /> <span className="italic text-white">Transformation</span>
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto font-light leading-relaxed">
          Real results. Masterful precision. Explore our curated gallery of patient transformations, showcasing the profound impact of our bespoke aesthetic treatments.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full space-y-32 relative z-10">
        
        {/* FEATURED TRANSFORMATION (Menggunakan gambar lokal yang lo siapkan) */}
        <div className="animate-in fade-in duration-1000 delay-150">
          <div className="text-center mb-12">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne mb-4">Featured Result</h2>
            <h3 className="text-3xl font-serif text-white">Signature Anti-Aging Profile</h3>
          </div>
          
          <div className="premium-glass p-6 md:p-10 rounded-[2.5rem] lg:rounded-[3rem] border border-champagne/20 shadow-2xl shadow-champagne/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {/* Gambar BEFORE */}
              <div className="relative group overflow-hidden rounded-2xl">
                <div className="absolute top-4 left-4 z-10 bg-midnight/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Before</span>
                </div>
                <img 
                  src="/images/gallery-before.jpg" 
                  alt="Patient Before Treatment" 
                  className="w-full h-[400px] md:h-[600px] object-cover object-center group-hover:scale-105 transition-transform duration-700 grayscale-[20%]"
                />
              </div>
              
              {/* Gambar AFTER */}
              <div className="relative group overflow-hidden rounded-2xl">
                <div className="absolute top-4 right-4 z-10 bg-champagne/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-midnight">After 12 Weeks</span>
                </div>
                <img 
                  src="/images/gallery-after.jpg" 
                  alt="Patient After Treatment" 
                  className="w-full h-[400px] md:h-[600px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* DATABASE RESULTS (Akan muncul otomatis jika Admin nambahin gambar via Dashboard) */}
        {galleries.length > 0 && (
          <div>
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-2xl font-serif text-white tracking-widest uppercase">Client Archives</h2>
              <div className="flex-1 h-px bg-frost-border"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {galleries.map((gallery) => (
                <div key={gallery.id} className="premium-glass p-6 rounded-3xl group">
                  <div className="flex justify-between items-center mb-6 px-2">
                    <h3 className="text-lg font-serif text-champagne tracking-wide">{gallery.treatment.name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative overflow-hidden rounded-xl">
                      <div className="absolute top-2 left-2 z-10 bg-midnight/70 backdrop-blur-sm px-3 py-1 rounded-full"><span className="text-[8px] font-bold uppercase tracking-widest text-text-muted">Before</span></div>
                      <img src={gallery.imageBefore} alt="Before" className="w-full h-64 object-cover grayscale-[20%]" />
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <div className="absolute top-2 right-2 z-10 bg-champagne/80 backdrop-blur-sm px-3 py-1 rounded-full"><span className="text-[8px] font-bold uppercase tracking-widest text-midnight">After</span></div>
                      <img src={gallery.imageAfter} alt="After" className="w-full h-64 object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      
      {/* Bottom CTA Section */}
      <div className="max-w-4xl mx-auto px-6 w-full text-center mt-32 relative z-10">
        <div className="border-t border-frost-border pt-20">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Envision Your Results</h2>
          <p className="text-text-muted mb-10 font-light max-w-md mx-auto">
            Every transformation begins with a conversation. Book your bespoke consultation today.
          </p>
          <Link href="/login" className="premium-button inline-block">
            Secure Your Consultation
          </Link>
        </div>
      </div>

    </div>
  );
}
