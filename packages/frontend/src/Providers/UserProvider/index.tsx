import { ReactElement, ReactNode, useState } from "react";
import UserContext, { User } from "./context";

type UserProviderProps = { children: ReactNode };

// my todo: потом удалить
const mockUser = {
  firstName: "Vlad",
  lastName: "filchagin",
  fullName: "Vlad Filchagin",
  email: "some@ya.ru",
  id: "0",
};

export default function UserProvider({
  children,
}: UserProviderProps): ReactElement | null {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // my todo: потом сделать
  const signIn = () => setUser(mockUser);
  const signUp = () => setUser(mockUser);
  const signOut = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </UserContext.Provider>
  );
}
