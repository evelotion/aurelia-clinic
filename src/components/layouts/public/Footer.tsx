import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-midnight-light border-t border-frost-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-serif text-champagne mb-4 tracking-widest">AURELIA</h2>
          <p className="text-text-muted text-sm font-light max-w-sm leading-relaxed">
            Redefining aesthetic perfection through advanced medical science and five-star hospitality.
          </p>
        </div>
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-light mb-6">Explore</h3>
          <div className="flex flex-col gap-4 text-sm text-text-muted font-light">
            <Link href="/treatments" className="hover:text-champagne transition-colors">Our Treatments</Link>
            <Link href="/gallery" className="hover:text-champagne transition-colors">Before & After</Link>
            <Link href="/about" className="hover:text-champagne transition-colors">About Us</Link>
          </div>
        </div>
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-light mb-6">Connect</h3>
          <div className="flex flex-col gap-4 text-sm text-text-muted font-light">
            <a href="#" className="hover:text-champagne transition-colors">Instagram</a>
            <a href="#" className="hover:text-champagne transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-champagne transition-colors">Concierge</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-frost-border text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] uppercase tracking-widest text-text-muted">© 2026 Aurelia Aesthetics. All rights reserved.</p>
        <div className="flex gap-6 text-[10px] uppercase tracking-widest text-text-muted">
          <Link href="#" className="hover:text-champagne transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-champagne transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
