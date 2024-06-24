import { apiClient } from "@/axios";
import { User } from "@/Providers/UserProvider/context";

export async function signOut() {
  return apiClient.post<User>("/signout");
}
