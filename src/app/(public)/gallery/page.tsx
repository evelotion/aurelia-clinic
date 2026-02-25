import { prisma } from "@/lib/prisma";
import Image from "next/image";

export const revalidate = 60;

export default async function GalleryPage() {
  const galleries = await prisma.beforeAfterGallery.findMany({
    where: { showOnWeb: true },
    include: { treatment: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-midnight pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-champagne tracking-[0.4em] text-xs font-bold uppercase mb-4 block">
            Real Results
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">Patient <span className="text-champagne italic">Gallery</span></h1>
          <p className="text-text-muted max-w-2xl mx-auto font-light leading-relaxed">
            Witness the transformative power of our bespoke treatments. Authentic results from our valued patients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {galleries.map((gallery) => (
            <div key={gallery.id} className="premium-glass p-6 md:p-8 rounded-2xl group border border-frost-border hover:border-champagne/30 transition-colors">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-frost-border">
                <h3 className="text-2xl font-serif text-white group-hover:text-champagne transition-colors">
                  {gallery.treatment?.name || "Signature Treatment"}
                </h3>
                <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted hidden sm:block">Verified Result</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 h-auto sm:h-[350px]">
                {}
                <div className="relative w-full sm:w-1/2 h-[250px] sm:h-full rounded-xl overflow-hidden">
                  <Image 
                    src={gallery.imageBefore} 
                    alt={`Before - ${gallery.treatment?.name}`}
                    fill
                    className="object-cover grayscale-[20%]"
                  />
                  <div className="absolute top-4 left-4 premium-glass px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                    <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">Before</span>
                  </div>
                </div>

                {}
                <div className="relative w-full sm:w-1/2 h-[250px] sm:h-full rounded-xl overflow-hidden shadow-[0_0_30px_rgba(227,198,153,0.1)]">
                  <Image 
                    src={gallery.imageAfter} 
                    alt={`After - ${gallery.treatment?.name}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-champagne/90 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
                    <span className="text-midnight text-[10px] font-bold tracking-[0.2em] uppercase">After</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
