import { PropsWithChildren, ReactElement, useState } from "react";
import UserContext, { User } from "./context";

type UserProviderProps = PropsWithChildren<{}>;

// my todo: потом удалить
const mockUser = {
  email: "some@ya.ru",
  firstName: "Vlad",
  id: "0",
  lastName: "filchagin",
};

export default function UserProvider({
  children,
}: UserProviderProps): ReactElement | null {
  // my todo: потом сделать норм
  const [user, setUser] = useState<User | null>(null);
  // const [user, setUser] = useState<User | null>(mockUser);
  const [loading, setLoading] = useState(false);

  const signIn = () => setUser(mockUser);

  // my todo: добавить методы регистрации, логина и пароля

  return (
    <UserContext.Provider value={{ user, loading, signIn }}>
      {children}
    </UserContext.Provider>
  );
}
