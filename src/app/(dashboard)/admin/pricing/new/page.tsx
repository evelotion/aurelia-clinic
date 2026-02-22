import PricingForm from "@/features/pricing/components/PricingForm";
import { getBranches } from "@/features/branches/actions/branch-actions";
import { getTreatments } from "@/features/treatments/actions/treatment-actions";

export default async function NewPricingPage() {
 
  const branches = await getBranches();
  const treatments = await getTreatments();

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-serif text-brown mb-2">Configure Pricing</h1>
        <p className="text-sm text-gray-500 font-light">Set specific price and duration for a treatment at a location.</p>
      </div>
      
      <PricingForm branches={branches} treatments={treatments} />
    </div>
  );
}
