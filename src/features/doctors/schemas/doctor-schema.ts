import { z } from "zod";

export const doctorSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  specialization: z.string().min(3, "Specialization is required"),
  bio: z.string().optional(),
  branchId: z.string().min(1, "Please assign the doctor to a branch"),
});
