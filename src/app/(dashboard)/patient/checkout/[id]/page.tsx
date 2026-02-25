import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { ShieldCheck, CreditCard, ArrowRight } from "lucide-react";
import Link from "next/link";

// 1. UPDATE: params sekarang adalah Promise
export default async function CheckoutSimulationPage({ params }: { params: Promise<{ id: string }> }) {
  // 2. UPDATE: Await params-nya dulu buat ngambil ID-nya
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  // Tarik data appointment beserta data treatment dan membership pasien
  const appointment = await prisma.appointment.findUnique({
    where: { id: id }, // 3. UPDATE: Pakai variabel id yang udah di-await
    include: {
      treatmentBranch: { include: { treatment: true, branch: true } },
      patient: { include: { membership: true } }
    }
  });

  if (!appointment || appointment.patientId !== session.user.id) redirect("/patient");
  if (appointment.paymentStatus === "FULLY_PAID") redirect("/patient/invoices");

  // LOGIKA DISKON MEMBERSHIP
  const basePrice = appointment.treatmentBranch.price;
  const discountPercent = appointment.patient.membership?.discountPercentage || 0;
  const discountAmount = basePrice * (discountPercent / 100);
  const finalPrice = basePrice - discountAmount;

  // Server Action untuk memproses pembayaran simulasi
  async function processDummyPayment() {
    "use server";
    
    await prisma.appointment.update({
      where: { id: id }, // 4. UPDATE: pakai id yang udah di-await di sini juga
      data: { paymentStatus: "FULLY_PAID" }
    });

    // Refresh data di semua halaman yang berhubungan
    revalidatePath("/patient");
    revalidatePath("/patient/invoices");
    revalidatePath("/admin/finance");
    
    // Lempar pasien ke halaman invoice setelah bayar
    redirect("/patient/invoices");
  }

  return (
    <div className="max-w-2xl mx-auto py-10 animate-in fade-in duration-700">
      <div className="mb-8">
        <Link href="/patient" className="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-champagne transition-colors">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="premium-glass p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
        {/* Latar Belakang Glassmorphism */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-champagne/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="text-center mb-10 relative z-10">
            <div className="w-16 h-16 mx-auto bg-champagne/10 rounded-full flex items-center justify-center mb-4 border border-champagne/30">
                <ShieldCheck className="text-champagne" size={28} />
            </div>
            <h1 className="text-2xl font-serif text-white mb-2">Secure Checkout</h1>
            <p className="text-text-muted text-sm font-light">Simulation mode. No real card charged.</p>
        </div>

        <div className="space-y-6 relative z-10">
            {/* Rincian Pesanan */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Treatment</p>
                        <p className="text-white font-medium">{appointment.treatmentBranch.treatment.name}</p>
                        <p className="text-sm text-white/50">Aurelia {appointment.treatmentBranch.branch.name}</p>
                    </div>
                    <div className="text-right">
                         <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Base Price</p>
                         <p className="text-white">Rp {basePrice.toLocaleString("id-ID")}</p>
                    </div>
                </div>

                {/* Potongan Diskon (Hanya Muncul Jika Punya Tier Member) */}
                {discountPercent > 0 && (
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <div>
                          <span className="inline-block px-2 py-1 bg-champagne/20 border border-champagne/30 text-champagne text-[9px] font-bold uppercase tracking-widest rounded">
                            {appointment.patient.membership?.name} Benefit
                          </span>
                      </div>
                      <div className="text-right text-emerald-400 font-medium">
                          - Rp {discountAmount.toLocaleString("id-ID")} ({discountPercent}%)
                      </div>
                  </div>
                )}
            </div>

            {/* Total Akhir */}
            <div className="flex justify-between items-end px-2">
                <p className="text-sm text-text-muted uppercase tracking-widest font-bold">Total Payment</p>
                <p className="text-3xl font-serif text-champagne drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                  Rp {finalPrice.toLocaleString("id-ID")}
                </p>
            </div>

            {/* Tombol Eksekusi Bayar */}
            <form action={processDummyPayment} className="pt-6">
                <button type="submit" className="w-full bg-champagne text-midnight px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02]">
                   <CreditCard size={18} /> Simulate Payment <ArrowRight size={16} />
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}