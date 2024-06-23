import { User } from "../../../Providers/UserProvider/context";
import { apiClient } from "../../../axios";

export async function signOut() {
  return apiClient.post<User>("/signout");
}
