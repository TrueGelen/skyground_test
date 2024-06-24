import { apiClient } from "@/axios";
import { User } from "@/Providers/UserProvider/context";

export async function fetchUsers() {
  return apiClient.get<User[]>("/users");
}
