import { Dispatch, SetStateAction, createContext } from "react";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
};

export type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const defaultContextValue: UserContextType = {
  user: null,
  setUser: () => undefined,
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export default UserContext;
