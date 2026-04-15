import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().trim().min(2).max(80).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;


export const loginSchema=z.object({
  email: z.string().trim().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})