import { getTreatments } from "@/features/treatments/actions/treatment-actions";
import TreatmentList from "@/features/treatments/components/TreatmentList";
import Link from "next/link";

export default async function TreatmentsPage() {
  const treatments = await getTreatments();

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-serif text-brown mb-2">Master Treatments</h1>
          <p className="text-sm text-gray-500 font-light">Manage your clinic's services and procedures.</p>
        </div>
        <Link 
          href="/admin/treatments/new" 
          className="bg-brown/90 backdrop-blur-md text-white rounded-xl px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gold transition-colors shadow-lg shadow-brown/20"
        >
          + Add Treatment
        </Link>
      </div>

      <TreatmentList treatments={treatments} />
    </div>
  );
}
