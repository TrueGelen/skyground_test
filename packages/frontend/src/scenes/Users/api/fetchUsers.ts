import { User } from "../../../Providers/UserProvider/context";
import { apiClient } from "../../../axios";

export async function fetchUsers() {
  return apiClient.get<User[]>("/users");
}
