import { z } from "zod";

export const branchSchema = z.object({
  name: z.string().min(3, "Branch name must be at least 3 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(3, "City is required"),
  phone: z.string().min(8, "Valid phone number is required"),
});
