import { useContext } from "react";
import UserContext, { UserContextType } from "@/Providers/UserProvider/context";

export default function useUser(): UserContextType {
  return useContext(UserContext);
}
