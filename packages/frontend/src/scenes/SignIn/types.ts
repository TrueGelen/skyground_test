import { z } from "zod";
import { signInFormSchema } from "./schemas";

export type SignInFormData = z.infer<typeof signInFormSchema>;
