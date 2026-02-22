import { getPricings } from "@/features/pricing/actions/pricing-actions";
import PricingList from "@/features/pricing/components/PricingList";
import Link from "next/link";

export default async function PricingPage() {
  const pricings = await getPricings();

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-serif text-brown mb-2">Pricing & Durations</h1>
          <p className="text-sm text-gray-500 font-light">Manage treatment prices and slot durations per branch.</p>
        </div>
        <Link 
          href="/admin/pricing/new" 
          className="bg-brown/90 backdrop-blur-md text-white rounded-xl px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gold transition-colors shadow-lg shadow-brown/20"
        >
          + Set Pricing
        </Link>
      </div>
      <PricingList pricings={pricings} />
    </div>
  );
}
