import { getAllAppointments } from "@/features/appointments/actions/appointment-actions";
import AppointmentList from "@/features/appointments/components/AppointmentList";

export default async function AdminAppointmentsPage() {
  const appointments = await getAllAppointments();

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-text-light mb-2">All Appointments</h1>
        <p className="text-sm text-text-muted font-light">Global overview of all clinic bookings.</p>
      </div>
      <AppointmentList appointments={appointments} role="ADMIN" />
    </div>
  );
}
