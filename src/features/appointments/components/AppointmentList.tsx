"use client";
import { format } from "date-fns";
import { useTransition } from "react";
import { updateAppointmentStatus } from "../actions/appointment-actions";
import { useRouter } from "next/navigation";

export default function AppointmentList({ appointments, role }: { appointments: any[], role: "ADMIN" | "DOCTOR" }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleStatusChange = (id: string, newStatus: string) => {
    startTransition(async () => {
      await updateAppointmentStatus(id, newStatus);
      router.refresh();
    });
  };

  if (appointments.length === 0) {
    return <div className="premium-glass p-12 rounded-3xl text-center"><p className="text-text-muted font-light">No appointments found.</p></div>;
  }

 
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'PENDING': return 'text-yellow-500';
      case 'CONFIRMED': return 'text-blue-400';
      case 'COMPLETED': return 'text-green-400';
      case 'CANCELLED': return 'text-red-400';
      case 'NO_SHOW': return 'text-gray-500';
      default: return 'text-champagne';
    }
  };

  return (
    <div className="premium-glass rounded-3xl overflow-hidden">
      <table className="min-w-full divide-y divide-frost-border">
        <thead className="bg-frost">
          <tr>
            <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Schedule</th>
            <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Patient Details</th>
            <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Treatment</th>
            {role === "ADMIN" && <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Doctor</th>}
            <th className="px-8 py-5 text-right text-[10px] font-bold text-text-muted uppercase tracking-widest">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-frost-border bg-transparent">
          {appointments.map((apt) => (
            <tr key={apt.id} className="hover:bg-frost transition-colors">
              <td className="px-8 py-6">
                <div className="text-sm font-semibold text-champagne">{format(new Date(apt.startTime), "dd MMM yyyy")}</div>
                <div className="text-xs text-text-muted mt-1">
                  {format(new Date(apt.startTime), "HH:mm")} - {format(new Date(apt.endTime), "HH:mm")}
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="text-sm font-semibold text-text-light">{apt.patient.name}</div>
                <div className="text-xs text-text-muted mt-1">{apt.patient.email}</div>
              </td>
              <td className="px-8 py-6">
                <div className="text-sm text-text-light">{apt.treatmentBranch.treatment.name}</div>
                <div className="text-xs text-text-muted mt-1">{apt.treatmentBranch.branch.name}</div>
              </td>
              {role === "ADMIN" && (
                <td className="px-8 py-6 text-sm text-text-muted">
                  {apt.doctor.user.name}
                </td>
              )}
              <td className="px-8 py-6 text-right">
                {}
                <select 
                  value={apt.status}
                  disabled={isPending}
                  onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                  className={`bg-transparent appearance-none text-[10px] font-bold uppercase tracking-widest text-right cursor-pointer focus:outline-none disabled:opacity-50 transition-colors ${getStatusColor(apt.status)} border-b border-transparent hover:border-frost-border pb-1`}
                  style={{ textAlignLast: "right" }}
                >
                  <option value="PENDING" className="bg-midnight-light text-text-light">PENDING</option>
                  <option value="CONFIRMED" className="bg-midnight-light text-text-light">CONFIRMED</option>
                  <option value="COMPLETED" className="bg-midnight-light text-text-light">COMPLETED</option>
                  <option value="NO_SHOW" className="bg-midnight-light text-text-light">NO SHOW</option>
                  <option value="CANCELLED" className="bg-midnight-light text-text-light">CANCELLED</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
