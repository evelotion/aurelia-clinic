import { z } from "zod";

export const bookingSchema = z.object({
  branchId: z.string().min(1, "Please select a clinic branch"),
  treatmentId: z.string().min(1, "Please select a treatment"),
  doctorId: z.string().min(1, "Please select an attending doctor"),
  appointmentDate: z.string().min(1, "Please select a date"),
  appointmentTime: z.string().min(1, "Please select a time slot"),
});
