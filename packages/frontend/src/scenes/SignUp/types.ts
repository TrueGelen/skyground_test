import { z } from "zod";
import { signUpFormSchema } from "./schemas";

export type SignUpFormData = z.infer<typeof signUpFormSchema>;
