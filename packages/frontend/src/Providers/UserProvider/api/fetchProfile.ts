import { apiClient } from "@/axios";
import { User } from "@/Providers/UserProvider/context";

export async function fetchProfile() {
  return apiClient.get<User>("/me");
}
