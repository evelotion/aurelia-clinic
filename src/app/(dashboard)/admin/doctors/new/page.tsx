import DoctorForm from "@/features/doctors/components/DoctorForm";
import { getBranches } from "@/features/branches/actions/branch-actions";

export default async function NewDoctorPage() {
 
  const branches = await getBranches();

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-serif text-brown mb-2">Onboard New Doctor</h1>
        <p className="text-sm text-gray-500 font-light">Create a system account and professional profile.</p>
      </div>
      
      <DoctorForm branches={branches} />
    </div>
  );
}
