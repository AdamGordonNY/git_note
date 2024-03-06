import * as z from "zod";

export const signInSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8).max(16),
});

export const signUpSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8).max(16),
  fullname: z.string().min(4).max(50),
});
