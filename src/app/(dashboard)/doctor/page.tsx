import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getDoctorAppointments } from "@/features/appointments/actions/appointment-actions";
import { format, isToday } from "date-fns";
import { Clock, MapPin, User as UserIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DoctorDashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

 
  const allAppointments = await getDoctorAppointments(session.user.id);
  const todaysAppointments = allAppointments.filter(apt => isToday(new Date(apt.startTime)));

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <h1 className="text-3xl font-serif text-text-light">My Schedule</h1>
        <div className="text-xs text-text-muted uppercase tracking-widest font-bold">
            {format(new Date(), 'EEEE, d MMMM yyyy')}
        </div>
      </div>

      {todaysAppointments.length === 0 ? (
        <div className="premium-glass p-12 rounded-3xl text-center border border-frost-border relative overflow-hidden mt-10">
          <div className="absolute inset-0 bg-gradient-to-b from-champagne/5 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-midnight-light border border-frost-border flex items-center justify-center text-champagne text-2xl">
                  ☕
              </div>
              <h2 className="text-xl font-serif text-text-light mb-2">Clear Schedule</h2>
              <p className="text-text-muted font-light max-w-sm mx-auto">No appointments scheduled for today. Take a moment to relax and recharge.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {todaysAppointments.map((apt) => (
             <div key={apt.id} className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 hover:border-champagne/30 transition-all duration-300 relative group flex flex-col h-full">
                <div className="flex justify-between items-start mb-5 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="bg-champagne/10 p-3 rounded-xl border border-champagne/20">
                          <span className="text-lg font-serif text-champagne">{format(new Date(apt.startTime), "HH:mm")}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white mb-1">{apt.patient.name}</div>
                          <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border border-white/10 text-text-muted">
                            {apt.status}
                          </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                        <UserIcon size={14} className="text-champagne/70" />
                        <span>{apt.treatmentBranch.treatment.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                        <MapPin size={14} className="text-champagne/70" />
                        <span>Room / Branch: {apt.treatmentBranch.branch.name}</span>
                    </div>
                </div>

                {}
                <div className="mt-auto pt-4 border-t border-white/5">
                    <button className="w-full py-2.5 rounded-xl border border-champagne/30 text-champagne text-[10px] font-bold uppercase tracking-widest hover:bg-champagne hover:text-midnight transition-colors">
                      View Details
                    </button>
                </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}