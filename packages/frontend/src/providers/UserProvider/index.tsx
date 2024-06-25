import { ReactElement, ReactNode, useEffect, useState } from "react";
import { axiosClient } from "@/api/axiosClient";
import SceneSpinner from "@/components/SceneSpinner";
import UserContext, { User } from "./context";
import { fetchProfile } from "./api/fetchProfile";

type UserProviderProps = { children: ReactNode };

export default function UserProvider({
  children,
}: UserProviderProps): ReactElement {
  const [me, setMe] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: me } = await fetchProfile();

        setLoading(false);
        setMe(me);
      } catch (error) {
        setLoading(false);
        setMe(null);
      }
    };

    fetchUser();
  }, [setMe]);

  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        setMe(null);
      }
      return Promise.reject(error);
    }
  );

  return (
    <UserContext.Provider value={{ user: me, setUser: setMe }}>
      <>{loading ? <SceneSpinner /> : children}</>
    </UserContext.Provider>
  );
}
