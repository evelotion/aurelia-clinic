import { Sparkles, ShieldCheck, Microscope, Heart } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-midnight">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent z-40 pointer-events-none"></div>

      {}
      <section className="container mx-auto px-6 md:px-12 pt-40 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-[0.3em] text-champagne mb-4 block font-semibold">
              Our Heritage
            </span>
            <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-8 text-text-light">
              Where Science <br /> 
              <span className="italic text-text-muted">Meets Artistry.</span>
            </h1>
            <p className="text-lg text-text-muted font-light leading-relaxed mb-6">
              Aurelia didirikan atas satu visi sederhana namun ambisius: mendefinisikan ulang standar kecantikan medis melalui perpaduan teknologi mutakhir dan sentuhan seni yang presisi.
            </p>
            <p className="text-lg text-text-muted font-light leading-relaxed">
              Kami percaya bahwa setiap wajah adalah kanvas yang unik. Di Aurelia, kami tidak mengubah siapa Anda, kami hanya menonjolkan versi terbaik dari diri Anda dengan cara yang paling elegan dan aman.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden shadow-2xl rounded-2xl">
              {}
              <img 
                src="/images/clinic-lobby.jpg" 
                alt="Luxury Clinic Interior" 
                className="object-cover w-full h-full grayscale-[20%]"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-champagne/10 -z-10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {}
      <section className="py-20 bg-midnight-light relative border-y border-frost-border">
         <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative">
                    <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl border border-frost-border">
                      {}
                      <img 
                        src="/images/treatment-room.jpg" 
                        alt="State of the art treatment room" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <h2 className="text-3xl md:text-4xl font-serif text-champagne mb-6">Sanctuary of Healing</h2>
                    <p className="text-text-muted font-light leading-relaxed mb-8">
                        Ruang perawatan kami dirancang khusus untuk memberikan ketenangan maksimal. Dilengkapi dengan perangkat medis berstandar FDA dan filtrasi udara tingkat rumah sakit, memastikan prosedur Anda berjalan dalam kenyamanan dan keamanan absolut.
                    </p>
                </div>
            </div>
         </div>
      </section>

      {}
      <section className="bg-midnight py-32 text-white relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-serif mb-6 tracking-wide text-text-light">The Aurelia Standard</h2>
            <div className="h-px w-24 bg-champagne mx-auto mb-8"></div>
            <p className="text-text-muted font-light italic">
              "Komitmen kami terhadap kesempurnaan tercermin dalam setiap prosedur yang kami lakukan."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="premium-glass p-10 hover:border-champagne/50 transition-all group rounded-3xl">
              <Microscope className="text-champagne mb-8 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="text-xl font-serif mb-4 tracking-wider text-text-light">Advanced Science</h3>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                Menggunakan teknologi medis terbaru yang telah tersertifikasi internasional untuk hasil yang terukur dan aman.
              </p>
            </div>
            <div className="premium-glass p-10 hover:border-champagne/50 transition-all group rounded-3xl">
              <Sparkles className="text-champagne mb-8 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="text-xl font-serif mb-4 tracking-wider text-text-light">Artistic Precision</h3>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                Setiap dokter kami adalah "artist" yang mengutamakan harmoni dan proporsi alami wajah Anda.
              </p>
            </div>
            <div className="premium-glass p-10 hover:border-champagne/50 transition-all group rounded-3xl">
              <ShieldCheck className="text-champagne mb-8 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="text-xl font-serif mb-4 tracking-wider text-text-light">Bespoke Care</h3>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                Tidak ada solusi "one-size-fits-all". Setiap pasien mendapatkan treatment plan yang dipersonalisasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="container mx-auto px-6 py-32 text-center">
        <div className="max-w-4xl mx-auto premium-glass p-12 md:p-20 rounded-[3rem]">
          <Heart className="text-champagne mx-auto mb-6" size={32} />
          <h2 className="text-4xl font-serif mb-8 text-text-light">Ready to Start Your Journey?</h2>
          <p className="text-text-muted mb-10 max-w-xl mx-auto font-light leading-relaxed">
            Bergabunglah dengan ribuan pasien yang telah mempercayakan perawatan estetika mereka kepada para ahli kami di Aurelia Clinic.
          </p>
          <Link 
            href="/login" 
            className="premium-button inline-block"
          >
            Book A Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
