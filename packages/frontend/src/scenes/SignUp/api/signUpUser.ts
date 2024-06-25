import { axiosClient } from "@/api/axiosClient";
import { User } from "@/providers/UserProvider/context";
import { SignUpFormData } from "../types";

export async function signUpUser(user: SignUpFormData) {
  return axiosClient.post<User>("/sign-up", user);
}
