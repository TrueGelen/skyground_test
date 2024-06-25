import { axiosClient } from "@/api/axiosClient";
import { User } from "@/Providers/UserProvider/context";

export async function fetchUsers() {
  return axiosClient.get<User[]>("/users");
}
