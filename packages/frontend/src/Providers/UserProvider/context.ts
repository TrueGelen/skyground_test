import { createContext } from "react";

export type UserStatic = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserComputedFields = {
  fullName: string;
};

export type User = UserStatic & UserComputedFields;

export type UserContextType = {
  user: User | null;
  setUser: (user: UserStatic | null) => void;
};

const defaultContextValue: UserContextType = {
  user: null,
  setUser: () => undefined,
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export default UserContext;
