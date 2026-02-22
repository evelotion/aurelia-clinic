import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TreatmentsPage() {
  const treatments = await prisma.treatment.findMany({
    orderBy: [{ category: 'asc' }, { name: 'asc' }]
  });

  const groupedTreatments = treatments.reduce((acc, treatment) => {
    if (!acc[treatment.category]) {
      acc[treatment.category] = [];
    }
    acc[treatment.category].push(treatment);
    return acc;
  }, {} as Record<string, typeof treatments>);

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-20 bg-midnight relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-champagne/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 w-full text-center mb-24 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-champagne mb-6 tracking-widest">
          Signature Treatments
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto font-light leading-relaxed">
          Discover our curated selection of premium aesthetic and medical procedures, meticulously designed to enhance your natural beauty and restore your confidence.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full space-y-24 relative z-10">
        {Object.entries(groupedTreatments).length === 0 ? (
          <div className="text-center text-text-muted font-light premium-glass p-12 rounded-3xl">
            Our treatment menu is currently being updated. Please check back soon.
          </div>
        ) : (
          Object.entries(groupedTreatments).map(([category, items], index) => (
            <div key={category} className="animate-in fade-in duration-1000" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="flex items-center gap-6 mb-12">
                <h2 className="text-3xl font-serif text-white tracking-widest uppercase">{category}</h2>
                <div className="flex-1 h-px bg-frost-border"></div>
              </div>
              
              {/* PERUBAHAN: Layout Grid disesuaikan & ditambah Img */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((treatment) => (
                  <div key={treatment.id} className="premium-glass p-0 rounded-3xl group hover:-translate-y-2 transition-transform duration-500 flex flex-col overflow-hidden border border-frost-border">
                    
                    {/* BAGIAN GAMBAR BARU */}
                    {treatment.image && (
                        <div className="w-full h-56 overflow-hidden relative border-b border-frost-border">
                            <img 
                                src={treatment.image} 
                                alt={treatment.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[10%]"
                            />
                            {/* Overlay gelap estetik */}
                            <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent opacity-80"></div>
                        </div>
                    )}
                    
                    <div className="p-8 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-serif text-champagne tracking-wide">{treatment.name}</h3>
                        </div>
                        <p className="text-sm text-text-muted font-light leading-relaxed mb-8 flex-1">
                        {treatment.description || "Consult with our specialists to learn more about this bespoke procedure and how it can be tailored to your unique needs."}
                        </p>
                        <Link href="/login" className="self-start text-[10px] font-bold uppercase tracking-widest text-text-light group-hover:text-champagne transition-colors border-b border-transparent group-hover:border-champagne pb-1 inline-flex items-center">
                        Book Session <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))
        )}
      </div>
      
      <div className="max-w-4xl mx-auto px-6 w-full text-center mt-32 relative z-10">
        <div className="premium-glass p-12 md:p-16 rounded-[3rem] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-champagne/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Not sure where to start?</h2>
            <p className="text-text-muted mb-10 font-light max-w-md mx-auto">
              Book a personalized consultation with our experts to craft your bespoke aesthetic journey.
            </p>
            <Link href="/login" className="premium-button inline-block">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}