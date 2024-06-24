import { apiClient } from "@/axios";
import { User } from "@/Providers/UserProvider/context";
import { SignUpFormData } from "../types";

export async function signUpUser(user: SignUpFormData) {
  return apiClient.post<User>("/signup", user);
}
