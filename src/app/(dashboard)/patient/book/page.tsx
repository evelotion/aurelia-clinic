import BookingForm from "@/features/appointments/components/BookingForm";
import { prisma } from "@/lib/prisma";

export default async function BookAppointmentPage() {
 
  const branches = await prisma.branch.findMany({ orderBy: { name: 'asc' } });
  
  const pricings = await prisma.treatmentBranch.findMany({
    include: { treatment: true },
  });
  
  const doctors = await prisma.doctor.findMany({
    include: { user: true },
  });

  const bookingData = { branches, pricings, doctors };

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-serif text-champagne mb-4 tracking-widest bg-clip-text bg-gradient-to-r from-champagne to-white text-transparent">
          Reserve Your Glow
        </h1>
        <p className="text-sm text-text-muted font-light max-w-lg mx-auto">
          Experience the pinnacle of aesthetic perfection. Select your preferred location, treatment, and specialist to secure your session.
        </p>
      </div>
      
      <BookingForm data={bookingData} />
    </div>
  );
}
