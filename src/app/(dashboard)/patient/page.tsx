import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPatientAppointments } from "@/features/appointments/actions/appointment-actions";
import { format } from "date-fns";
import CheckoutButton from "@/features/appointments/components/CheckoutButton";
import LogoutButton from "@/components/ui/LogoutButton";
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  User as UserIcon, 
  CreditCard, 
  Sparkles,
  ArrowRight
} from "lucide-react";

export default async function PatientDashboard() {
  const session = await getServerSession(authOptions);
  const appointments = await getPatientAppointments(session?.user?.id || "");
  const userName = session?.user?.name || "Guest";
  const userInitials = userName.charAt(0).toUpperCase();

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      {/* HEADER YANG SUDAH DI-MIX (Ada Avatar & Logout) */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-white/10 pb-6">
        <div>
          <p className="text-[10px] font-bold text-champagne uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
            <Sparkles size={12} /> Client Portal
          </p>
          <h1 className="text-3xl md:text-4xl font-serif text-white">
            Welcome back, <span className="text-champagne">{userName.split(' ')[0]}</span>
          </h1>
        </div>
        
        {/* Info Box (Date, Avatar, Logout) */}
        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/5 px-4 py-2.5 rounded-2xl shadow-sm">
            <div className="text-xs text-text-muted uppercase tracking-widest font-medium pr-4 border-r border-white/10 hidden sm:block">
                {format(new Date(), "dd MMM yyyy")}
            </div>
            
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne font-serif text-sm shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  {userInitials}
                </div>
                <div className="w-px h-5 bg-white/10"></div>
                <LogoutButton />
            </div>
        </div>
      </div>

      {/* Content Section */}
      {appointments.length === 0 ? (
        <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center text-center max-w-2xl mx-auto mt-12 group">
          <div className="absolute inset-0 bg-gradient-to-b from-champagne/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="w-16 h-16 bg-champagne/10 rounded-full flex items-center justify-center mb-6 border border-champagne/20 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <Sparkles className="text-champagne" size={28} />
          </div>
          
          <h2 className="text-2xl font-serif mb-3 text-white tracking-wider">Ready for a Glow Up?</h2>
          <p className="text-text-muted mb-8 font-light max-w-md leading-relaxed">
            Your journey to aesthetic perfection begins here. You currently have no upcoming treatments scheduled.
          </p>
          
          <Link href="/patient/book" className="relative z-10 bg-champagne text-midnight px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 flex items-center gap-3 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            Book an Appointment <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
              <h2 className="text-xl font-serif text-champagne tracking-wider flex items-center gap-3">
                <CalendarDays size={20} className="text-white/50" /> 
                My Appointments
              </h2>
              <Link href="/patient/book" className="text-xs font-bold uppercase tracking-widest text-champagne hover:text-white border border-champagne/30 hover:border-white px-5 py-2.5 rounded-full transition-all duration-300 backdrop-blur-md">
                + New Booking
              </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {appointments.map((apt) => {
                // Konfigurasi warna status dinamis
                const statusColors = {
                  PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.2)]",
                  CONFIRMED: "bg-blue-400/10 text-blue-400 border-blue-400/20 shadow-[0_0_10px_rgba(96,165,250,0.2)]",
                  COMPLETED: "bg-green-400/10 text-green-400 border-green-400/20 shadow-[0_0_10px_rgba(74,222,128,0.2)]",
                  CANCELLED: "bg-red-400/10 text-red-400 border-red-400/20 shadow-[0_0_10px_rgba(248,113,113,0.2)]"
                };
                
                const activeColor = statusColors[apt.status as keyof typeof statusColors] || statusColors.PENDING;

                return (
                  <div key={apt.id} className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 group relative flex flex-col justify-between h-full">
                      {/* Glow effect saat di-hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

                      <div>
                        {/* Header Card: Tanggal & Status */}
                        <div className="flex justify-between items-start mb-5 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/5 p-3 rounded-2xl border border-white/5 flex flex-col items-center justify-center min-w-[60px]">
                                  <span className="text-xs text-text-muted uppercase font-bold">{format(new Date(apt.startTime), "MMM")}</span>
                                  <span className="text-xl font-serif text-champagne">{format(new Date(apt.startTime), "dd")}</span>
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-text-muted mb-1">
                                      <Clock size={12} className="text-champagne" />
                                      {format(new Date(apt.startTime), "HH:mm")}
                                  </div>
                                  <div className="text-lg font-serif text-white group-hover:text-champagne transition-colors">
                                    {apt.treatmentBranch.treatment.name}
                                  </div>
                                </div>
                            </div>
                            <span className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full border backdrop-blur-md ${activeColor}`}>
                                {apt.status}
                            </span>
                        </div>
                        
                        {/* Body Card: Detail */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-text-muted font-light">
                                <MapPin size={16} className="text-white/40" />
                                <span>Aurelia <span className="text-white/80 font-medium">{apt.treatmentBranch.branch.name}</span></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-text-muted font-light">
                                <UserIcon size={16} className="text-white/40" />
                                <span>Dr. {apt.doctor.user.name}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-text-muted font-light">
                                <CreditCard size={16} className="text-white/40" />
                                <span>Payment: 
                                  <span className={`ml-2 font-medium tracking-wide ${apt.paymentStatus === 'UNPAID' ? 'text-red-400' : 'text-green-400'}`}>
                                    {apt.paymentStatus}
                                  </span>
                                </span>
                            </div>
                        </div>
                      </div>
                      
                      {/* Footer Card: Action Button */}
                      {apt.paymentStatus === "UNPAID" && apt.status !== "CANCELLED" && (
                          <div className="mt-auto pt-4 border-t border-white/5">
                            <CheckoutButton appointmentId={apt.id} />
                          </div>
                      )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}