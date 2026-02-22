import TreatmentForm from "@/features/treatments/components/TreatmentForm";

export default function NewTreatmentPage() {
  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-serif text-brown mb-2">Add New Treatment</h1>
        <p className="text-sm text-gray-500 font-light">Define a new medical or aesthetic procedure.</p>
      </div>
      
      <TreatmentForm />
    </div>
  );
}
