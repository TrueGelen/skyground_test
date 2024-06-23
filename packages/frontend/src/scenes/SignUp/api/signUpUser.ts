import { User } from "../../../Providers/UserProvider/context";
import { apiClient } from "../../../axios";
import { SignUpFormData } from "../types";

export async function signUpUser(user: SignUpFormData) {
  return apiClient.post<User>("/signup", user);
}
