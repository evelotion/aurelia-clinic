import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layouts/dashboard/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  return (
    // 1. KUNCI UTAMA: Ganti min-h-screen jadi h-screen dan tambah overflow-hidden
    <div className="flex h-screen w-full font-sans relative overflow-hidden bg-midnight">
      
      {/* 2. Ubah fixed jadi absolute biar nempel statis di container ini */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2500&auto=format&fit=crop" 
          alt="Abstract Dark Background" 
          className="object-cover w-full h-full opacity-30 grayscale" 
        />
        <div className="absolute inset-0 bg-midnight/90 backdrop-blur-[1px]"></div>
      </div>

      {/* 3. Tambahkan h-full untuk menyesuaikan ukuran persis dengan layar */}
      <div className="relative z-10 flex w-full h-full">
        <Sidebar role={session.user.role} />
        
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header udah kita copot dari sini biar ga menuh-menuhin layar */}
          
          {/* 4. Area ini yang SEKARANG jadi satu-satunya yang bisa di-scroll */}
          <main className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-frost-border scrollbar-track-transparent">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}