import prisma from "@/lib/prisma";

export class SchedulingEngine {
 
  static async lockSlot(
    patientId: string, 
    doctorId: string, 
    treatmentBranchId: string, 
    startTime: Date, 
    endTime: Date
  ) {
   
    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        doctorId,
        OR: [
          { status: { in: ["CONFIRMED", "COMPLETED"] } },
          { 
            status: "PENDING", 
            lockedUntil: { gt: new Date() }
          }
        ],
        startTime: { lt: endTime },
        endTime: { gt: startTime }
      }
    });

    if (conflictingAppointment) {
      throw new Error("Slot waktu ini sudah tidak tersedia.");
    }

   
    const lockedUntil = new Date();
    lockedUntil.setMinutes(lockedUntil.getMinutes() + 15);

   
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        treatmentBranchId,
        startTime,
        endTime,
        status: "PENDING",
        paymentStatus: "UNPAID",
        lockedUntil,
      }
    });

    return appointment;
  }
}
