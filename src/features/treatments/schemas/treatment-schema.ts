import { z } from "zod";

export const treatmentSchema = z.object({
  name: z.string().min(3, "Treatment name must be at least 3 characters"),
  category: z.string().min(2, "Please select a valid category"),
  description: z.string().optional(),
});
