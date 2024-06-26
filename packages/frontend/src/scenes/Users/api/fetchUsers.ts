import { axiosClient } from "@/api/axiosClient";
import { User } from "@/providers/UserProvider/context";

export async function fetchUsers() {
  return axiosClient.get<User[]>("/users");
}
