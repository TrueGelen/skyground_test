import * as z from "zod";

export const signInFormSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});
