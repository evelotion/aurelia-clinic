import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layouts/dashboard/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  return (
    <div className="flex min-h-screen font-sans relative">
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2500&auto=format&fit=crop" 
          alt="Abstract Dark Background" 
          className="object-cover w-full h-full opacity-30 grayscale" 
        />
        <div className="absolute inset-0 bg-midnight/90 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 flex w-full">
        <Sidebar role={session.user.role} />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header udah kita copot dari sini biar ga menuh-menuhin layar */}
          <main className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-frost-border scrollbar-track-transparent">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}