import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import UserContext, { User, UserStatic } from "./context";
import SceneSpinner from "../../components/SceneSpinner";
import { fetchProfile } from "./api/fetchProfile";
import { useLocation, useNavigate } from "react-router-dom";

type UserProviderProps = { children: ReactNode };

export default function UserProvider({
  children,
}: UserProviderProps): ReactElement | null {
  const [me, setMe] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSetMe = useCallback((user: UserStatic | null) => {
    setMe(
      user != null
        ? { ...user, fullName: `${user.firstName} ${user.lastName}` }
        : user
    );
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: me } = await fetchProfile();

        setLoading(false);
        handleSetMe(me);
      } catch (error) {
        setLoading(false);
        handleSetMe(null);
      }
    };

    fetchUser();
  }, [handleSetMe, location, navigate]);

  return (
    <UserContext.Provider value={{ user: me, setUser: handleSetMe }}>
      {loading ? <SceneSpinner /> : children}
    </UserContext.Provider>
  );
}
