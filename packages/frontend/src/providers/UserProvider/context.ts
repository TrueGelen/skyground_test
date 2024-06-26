import { createContext } from "react";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserContextType = {
  user: User | null;
};

const defaultContextValue: UserContextType = {
  user: null,
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export default UserContext;
