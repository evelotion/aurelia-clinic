import { getDoctorAppointments } from "@/features/appointments/actions/appointment-actions";
import AppointmentList from "@/features/appointments/components/AppointmentList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DoctorAppointmentsPage() {
  const session = await getServerSession(authOptions);
  const appointments = await getDoctorAppointments(session?.user?.id || "");

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-text-light mb-2">My Appointments</h1>
        <p className="text-sm text-text-muted font-light">Your upcoming patient schedule.</p>
      </div>
      <AppointmentList appointments={appointments} role="DOCTOR" />
    </div>
  );
}
