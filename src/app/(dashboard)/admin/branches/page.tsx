import { getBranches } from "@/features/branches/actions/branch-actions";
import BranchList from "@/features/branches/components/BranchList";
import Link from "next/link";

export default async function BranchesPage() {
  const branches = await getBranches();

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-serif text-brown mb-2">Clinic Branches</h1>
          <p className="text-sm text-gray-500 font-light">Manage your multi-location clinic operations here.</p>
        </div>
        <Link 
          href="/admin/branches/new" 
          className="bg-brown text-white px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gold transition-colors shadow-lg shadow-brown/20"
        >
          + Add Branch
        </Link>
      </div>

      <BranchList branches={branches} />
    </div>
  );
}
