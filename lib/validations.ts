import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  paasword: z.string().min(8).max(16),
});

export const signUpSchema = z.object({
  email: z.string().email(),
  paasword: z.string().min(8).max(16),
  username: z.string().min(4).max(20),
});
