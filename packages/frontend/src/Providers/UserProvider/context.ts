import { createContext } from "react";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
};

export type UserContextType = {
  user: User | null;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
  signUp: () => void;
};

const defaultContextValue: UserContextType = {
  user: null,
  loading: true,
  signIn: () => undefined,
  signOut: () => undefined,
  signUp: () => undefined,
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export default UserContext;
