import { axiosClient } from "@/api/axiosClient";
import { User } from "@/providers/UserProvider/context";

export async function fetchProfile() {
  return axiosClient.get<User>("/me");
}
