import { ReactElement, ReactNode, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/api/axiosClient";
import SceneSpinner from "@/components/SceneSpinner";
import UserContext from "./context";
import { fetchProfile } from "./api/fetchProfile";

type UserProviderProps = { children: ReactNode };

export default function UserProvider({
  children,
}: UserProviderProps): ReactElement {
  const { data: user, isLoading } = useQuery({
    initialData: null,
    queryKey: ["user"],
    queryFn: fetchProfile,
  });

  const client = useQueryClient();

  useEffect(() => {
    const interceptor = axiosClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          client.setQueryData(["user"], null);
        }
        return Promise.reject(error);
      }
    );

    return () => axiosClient.interceptors.response.eject(interceptor);
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {isLoading ? <SceneSpinner /> : children}
    </UserContext.Provider>
  );
}
