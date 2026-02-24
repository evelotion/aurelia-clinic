import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const revalidate = 60;

export default async function TreatmentsPage() {
  const treatments = await prisma.treatment.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <main className="min-h-screen bg-midnight pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-champagne tracking-[0.4em] text-xs font-bold uppercase mb-4 block">
            Our Expertise
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">Signature <span className="text-champagne italic">Treatments</span></h1>
          <p className="text-text-muted max-w-2xl mx-auto font-light leading-relaxed">
            Discover our comprehensive range of advanced aesthetic procedures, tailored to enhance your natural beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment) => (
            <div key={treatment.id} className="group premium-glass rounded-2xl overflow-hidden flex flex-col border border-frost-border hover:border-champagne/50 transition-all duration-500">
              <div className="relative h-72 w-full overflow-hidden">
                {treatment.image ? (
                  <Image 
                    src={treatment.image} 
                    alt={treatment.name}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-midnight-light flex items-center justify-center border-b border-frost-border">
                    <span className="text-champagne/50 text-xs uppercase tracking-[0.2em]">No Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
              </div>
              <div className="p-8 flex flex-col flex-grow relative z-10 -mt-16">
                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-champagne transition-colors">{treatment.name}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-8 flex-grow">
                  {treatment.description}
                </p>
                <Link href="/patient/book" className="inline-flex items-center text-champagne text-[10px] font-bold tracking-[0.2em] uppercase mt-auto w-max group/link">
                  Book Consultation <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
