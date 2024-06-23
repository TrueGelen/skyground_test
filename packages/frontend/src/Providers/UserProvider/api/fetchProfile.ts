import { User } from "../../../Providers/UserProvider/context";
import { apiClient } from "../../../axios";

export async function fetchProfile() {
  return apiClient.get<User>("/me");
}
