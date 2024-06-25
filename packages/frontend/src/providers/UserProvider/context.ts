import { createContext } from "react";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const defaultContextValue: UserContextType = {
  user: null,
  setUser: () => undefined,
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export default UserContext;
