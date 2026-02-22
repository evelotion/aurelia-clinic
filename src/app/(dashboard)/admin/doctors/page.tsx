import { getDoctors } from "@/features/doctors/actions/doctor-actions";
import DoctorList from "@/features/doctors/components/DoctorList";
import Link from "next/link";

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-serif text-brown mb-2">Medical Team</h1>
          <p className="text-sm text-gray-500 font-light">Manage doctor profiles and system access credentials.</p>
        </div>
        <Link 
          href="/admin/doctors/new" 
          className="bg-brown/90 backdrop-blur-md text-white rounded-xl px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gold transition-colors shadow-lg shadow-brown/20"
        >
          + Add Doctor
        </Link>
      </div>
      <DoctorList doctors={doctors} />
    </div>
  );
}
