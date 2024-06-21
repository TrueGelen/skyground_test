import { ReactElement, ReactNode, useState } from "react";
import UserContext, { User } from "./context";

type UserProviderProps = { children: ReactNode };

// my todo: потом удалить
// const mockUser = {
//   firstName: "Vlad",
//   lastName: "filchagin",
//   fullName: "Vlad Filchagin",
//   email: "some@ya.ru",
//   id: "0",
// };

export default function UserProvider({
  children,
}: UserProviderProps): ReactElement | null {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
