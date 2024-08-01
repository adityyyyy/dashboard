import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(6),
});

export const LogInSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
});
