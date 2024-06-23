import { User } from "../../../Providers/UserProvider/context";
import { apiClient } from "../../../axios";
import { SignInFormData } from "../types";

export async function signInUser(user: SignInFormData) {
  return apiClient.post<User>("/signin", user);
}
