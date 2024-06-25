import { axiosClient } from "@/api/axiosClient";
import { User } from "@/Providers/UserProvider/context";

export async function signOut() {
  return axiosClient.post<User>("/signout");
}
