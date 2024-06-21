import { User } from "../../../Providers/UserProvider/context";
import { apiClient } from "../../../axios";
import { SignUpFormData } from "../types";

type SignUpUserSuccessResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export async function signUpUser(user: SignUpFormData) {
  return apiClient.post<SignUpUserSuccessResponse>("/signup", user);
}
