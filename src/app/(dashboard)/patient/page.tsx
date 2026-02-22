import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPatientAppointments } from "@/features/appointments/actions/appointment-actions";
import { format } from "date-fns";
import CheckoutButton from "@/features/appointments/components/CheckoutButton";

export default async function PatientDashboard() {
  const session = await getServerSession(authOptions);
  const appointments = await getPatientAppointments(session?.user?.id || "");

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-serif text-text-light">My Dashboard</h1>
        <div className="text-xs text-text-muted uppercase tracking-widest font-bold">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="premium-glass p-8 rounded-3xl border-l-4 border-l-champagne">
          <h2 className="text-xl font-serif mb-4 text-champagne tracking-wider">Upcoming Treatments</h2>
          <p className="text-text-muted mb-8 font-light">You have no upcoming appointments. Time for a glow up?</p>
          <Link href="/patient/book" className="premium-button inline-block text-center">
            Book Appointment
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
              <h2 className="text-xl font-serif text-champagne tracking-wider">My Appointments</h2>
              <Link href="/patient/book" className="premium-button">
                + New Booking
              </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {appointments.map((apt) => (
                  <div key={apt.id} className="premium-glass p-6 rounded-3xl relative overflow-hidden group hover:border-frost-border transition-all">
                      <div className={`absolute top-0 left-0 w-1.5 h-full ${
                          apt.status === 'PENDING' ? 'bg-yellow-500' : 
                          apt.status === 'CONFIRMED' ? 'bg-blue-400' : 
                          apt.status === 'COMPLETED' ? 'bg-green-400' : 'bg-red-400'
                      }`}></div>
                      
                      <div className="flex justify-between items-start mb-6 ml-2">
                          <div>
                              <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">
                                  {format(new Date(apt.startTime), "dd MMM yyyy")} • {format(new Date(apt.startTime), "HH:mm")}
                              </div>
                              <div className="text-lg font-serif text-text-light">{apt.treatmentBranch.treatment.name}</div>
                          </div>
                          <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full ${
                              apt.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                              apt.status === 'CONFIRMED' ? 'bg-blue-400/10 text-blue-400 border border-blue-400/20' : 
                              apt.status === 'COMPLETED' ? 'bg-green-400/10 text-green-400 border border-green-400/20' : 'bg-red-400/10 text-red-400 border border-red-400/20'
                          }`}>
                              {apt.status}
                          </span>
                      </div>
                      
                      <div className="flex justify-between items-end ml-2 border-t border-frost-border pt-4">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-text-muted font-light">
                                <span className="w-5 text-center text-champagne">📍</span>
                                {apt.treatmentBranch.branch.name}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-text-muted font-light">
                                <span className="w-5 text-center text-champagne">👨‍⚕️</span>
                                {apt.doctor.user.name}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-text-muted font-light">
                                <span className="w-5 text-center text-champagne">💳</span>
                                Status: <span className={`font-semibold ${apt.paymentStatus === 'UNPAID' ? 'text-red-400' : 'text-green-400'}`}>{apt.paymentStatus}</span>
                            </div>
                        </div>
                        
                        {/* Munculkan tombol bayar jika status pembayaran masih UNPAID dan jadwal belum dicancel */}
                        {apt.paymentStatus === "UNPAID" && apt.status !== "CANCELLED" && (
                            <CheckoutButton appointmentId={apt.id} />
                        )}
                      </div>
                  </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
