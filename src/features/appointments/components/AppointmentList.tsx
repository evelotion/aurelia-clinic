"use client";
import { format } from "date-fns";
import { useTransition, useState, useRef, useEffect } from "react";
import { updateAppointmentStatus } from "../actions/appointment-actions";
import { useRouter } from "next/navigation";


const StatusDropdown = ({ 
  status, 
  onStatusChange, 
  disabled,
  isLocked = false
}: { 
  status: string; 
  onStatusChange: (status: string) => void; 
  disabled: boolean;
  isLocked?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const STATUS_OPTIONS = [
    { value: 'PENDING', label: 'PENDING', dotColor: 'bg-yellow-500', textColor: 'text-yellow-500' },
    { value: 'CONFIRMED', label: 'CONFIRMED', dotColor: 'bg-blue-400', textColor: 'text-blue-400' },
    { value: 'COMPLETED', label: 'COMPLETED', dotColor: 'bg-green-400', textColor: 'text-green-400' },
    { value: 'NO_SHOW', label: 'NO SHOW', dotColor: 'bg-gray-500', textColor: 'text-gray-500' },
    { value: 'CANCELLED', label: 'CANCELLED', dotColor: 'bg-red-400', textColor: 'text-red-400' },
  ];

  const current = STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];

  return (
    <div className="relative inline-flex flex-col items-end text-right" ref={dropdownRef}>
      <button
        type="button"
       
        onClick={() => !disabled && !isLocked && setIsOpen(!isOpen)}
        disabled={disabled}
       
        className={`flex items-center justify-end gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 rounded-lg border border-transparent 
          ${isLocked ? 'cursor-default' : 'hover:border-frost-border hover:bg-frost cursor-pointer'} 
          ${disabled && !isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className={current.textColor}>{current.label}</span>
        <span className={`w-1.5 h-1.5 rounded-full ${current.dotColor} shadow-[0_0_5px_currentColor] opacity-80`}></span>
        
        {}
        {!isLocked && (
          <svg 
            className={`w-3 h-3 text-text-muted transition-transform duration-300 ml-1 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {isOpen && !isLocked && (
        <div className="absolute top-full right-0 mt-2 w-44 origin-top-right premium-glass rounded-xl z-[100] border border-frost-border shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-200">
          <div className="py-1 bg-midnight-light/50 backdrop-blur-xl rounded-xl overflow-hidden">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onStatusChange(opt.value);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-end gap-3 w-full px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 group hover:bg-champagne ${opt.value === status ? 'bg-frost' : ''}`}
              >
                <span className={`transition-colors duration-200 ${opt.value === status ? opt.textColor : 'text-text-muted'} group-hover:text-midnight`}>
                  {opt.label}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${opt.dotColor} shadow-[0_0_5px_currentColor] opacity-70 group-hover:opacity-100 group-hover:shadow-none`}></span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


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

  return (
    <div className="premium-glass rounded-3xl relative">
      <table className="min-w-full divide-y divide-frost-border">
        <thead className="bg-frost">
          <tr>
            <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest rounded-tl-3xl">Schedule</th>
            <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Patient Details</th>
            <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Treatment</th>
            {role === "ADMIN" && <th className="px-8 py-5 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">Doctor</th>}
            <th className="px-8 py-5 text-right text-[10px] font-bold text-text-muted uppercase tracking-widest rounded-tr-3xl">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-frost-border bg-transparent">
          {appointments.map((apt) => {
           
           
           
            const isStatusLocked = apt.status === 'COMPLETED' || apt.status === 'CANCELLED';

            return (
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
                  
                  <StatusDropdown 
                    status={apt.status} 
                    onStatusChange={(newStatus) => handleStatusChange(apt.id, newStatus)}
                    disabled={isPending}
                    isLocked={isStatusLocked}
                  />

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}