import { axiosClient } from "@/api/axiosClient";
import { User } from "@/providers/UserProvider/context";
import { SignInFormData } from "../types";

export async function signInUser(user: SignInFormData) {
  return axiosClient.post<User>("/sign-in", user);
}
