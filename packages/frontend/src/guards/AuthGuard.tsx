import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUser from "@/hooks/useUser";

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user } = useUser();
  const location = useLocation();

  if (user == null) {
    return <Navigate to="/sign-in" replace state={{ redirectTo: location }} />;
  }

  return <>{children}</>;
}
