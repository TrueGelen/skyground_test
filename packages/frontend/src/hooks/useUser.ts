import { useContext } from "react";
import UserContext, { UserContextType } from "@/providers/UserProvider/context";

export default function useUser(): UserContextType {
  return useContext(UserContext);
}
