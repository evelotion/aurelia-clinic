"use client";
import { useState, useTransition, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createAppointment, getAvailableSlots } from "../actions/appointment-actions"; // Pastikan import getAvailableSlots

type BookingData = {
  branches: any[];
  pricings: any[];
  doctors: any[];
};

export default function BookingForm({ data }: { data: BookingData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  
  // State untuk menyimpan jam yang dinamis
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const availableTreatments = useMemo(() => {
    if (!selectedBranch) return [];
    return data.pricings.filter((p) => p.branchId === selectedBranch);
  }, [selectedBranch, data.pricings]);

  const availableDoctors = useMemo(() => {
    if (!selectedBranch) return [];
    return data.doctors.filter((d) => d.branchId === selectedBranch);
  }, [selectedBranch, data.doctors]);

  // Efek untuk memanggil jam kosong ketika dokter dan tanggal sudah diisi
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      setIsLoadingSlots(true);
      getAvailableSlots(selectedDoctor, selectedDate).then((slots) => {
        setAvailableTimeSlots(slots);
        setIsLoadingSlots(false);
      }).catch(() => {
        setIsLoadingSlots(false);
      });
    } else {
      setAvailableTimeSlots([]);
    }
  }, [selectedDoctor, selectedDate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await createAppointment(formData);
      if (res?.error) setError(res.error);
      else router.push("/patient"); 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 premium-glass p-10 rounded-3xl">
      {error && <div className="p-4 text-sm text-red-200 bg-red-900/30 backdrop-blur-md border-l-2 border-red-500 rounded-r-md">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2 group md:col-span-2">
          <label className="premium-label">1. Select Location</label>
          <select 
            name="branchId" 
            required 
            value={selectedBranch}
            onChange={(e) => {
              setSelectedBranch(e.target.value);
              setSelectedDoctor(""); // Reset dokter jika cabang ganti
              setSelectedDate("");
            }}
            className="premium-input appearance-none bg-midnight-light"
          >
            <option value="" disabled>Choose clinic branch...</option>
            {data.branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        
        <div className="space-y-2 group">
          <label className="premium-label">2. Select Treatment</label>
          <select name="treatmentId" required defaultValue="" disabled={!selectedBranch} className="premium-input appearance-none bg-midnight-light disabled:opacity-50">
            <option value="" disabled>Choose treatment...</option>
            {availableTreatments.map(p => (
              <option key={p.treatment.id} value={p.treatment.id}>
                {p.treatment.name} — Rp {new Intl.NumberFormat('id-ID').format(p.price)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 group">
          <label className="premium-label">3. Select Doctor</label>
          <select 
            name="doctorId" 
            required 
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            disabled={!selectedBranch} 
            className="premium-input appearance-none bg-midnight-light disabled:opacity-50"
          >
            <option value="" disabled>Choose attending doctor...</option>
            {availableDoctors.map(d => (
              <option key={d.id} value={d.id}>{d.user.name} ({d.specialization})</option>
            ))}
          </select>
        </div>

        <div className="space-y-2 group">
          <label className="premium-label">4. Select Date</label>
          <input 
            type="date" 
            name="appointmentDate" 
            required 
            min={new Date().toISOString().split('T')[0]} 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            disabled={!selectedDoctor}
            className="premium-input [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert disabled:opacity-50" 
          />
        </div>

        <div className="space-y-2 group">
          <label className="premium-label">5. Select Time</label>
          <select 
            name="appointmentTime" 
            required 
            defaultValue="" 
            disabled={!selectedDate || isLoadingSlots || availableTimeSlots.length === 0} 
            className="premium-input appearance-none bg-midnight-light disabled:opacity-50"
          >
            <option value="" disabled>
              {isLoadingSlots ? "Loading slots..." : availableTimeSlots.length === 0 && selectedDate ? "No slots available" : "Choose available slot..."}
            </option>
            {availableTimeSlots.map(time => <option key={time} value={time}>{time}</option>)}
          </select>
        </div>
      </div>

      <div className="pt-8 flex justify-end gap-4 border-t border-frost-border mt-8">
        <button type="button" onClick={() => router.back()} className="px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase text-text-muted hover:text-text-light transition-colors">Cancel</button>
        <button type="submit" disabled={isPending || !selectedBranch || availableTimeSlots.length === 0} className="premium-button">
          {isPending ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
}