import { axiosClient } from "@/api/axiosClient";
import { User } from "@/providers/UserProvider/context";

export async function signOut() {
  return axiosClient.post<User>("/sign-out");
}
