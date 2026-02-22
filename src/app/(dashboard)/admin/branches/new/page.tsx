import BranchForm from "@/features/branches/components/BranchForm";

export default function NewBranchPage() {
  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-serif text-brown mb-2">Register New Branch</h1>
        <p className="text-sm text-gray-500 font-light">Add a new luxury clinic location to your network.</p>
      </div>
      
      <BranchForm />
    </div>
  );
}
