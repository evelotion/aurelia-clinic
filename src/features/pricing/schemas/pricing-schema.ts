import { z } from "zod";

export const pricingSchema = z.object({
  branchId: z.string().min(1, "Please select a branch"),
  treatmentId: z.string().min(1, "Please select a treatment"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  durationMin: z.coerce.number().min(5, "Duration must be at least 5 minutes"),
});
