import { lazy, ReactElement, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SceneSpinner from "../components/SceneSpinner";
import AuthGuard from "../guards/AuthGuard";
import DashboardLayout from "../layouts/DashboardLayout";

const NotFound = lazy(() => import("./NotFound"));
const SignIn = lazy(() => import("./SignIn"));
const SignUp = lazy(() => import("./SignUp"));
const Users = lazy(() => import("./Users"));

export default function RootScene(): ReactElement {
  return (
    <Suspense fallback={<SceneSpinner />}>
      <Routes>
        <Route index element={<Navigate to="/users" replace />} />
        <Route
          element={
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          }
          path="users"
        >
          <Route index element={<Users />} />
        </Route>
        <Route element={<SignIn />} path="sign-in" />
        <Route element={<SignUp />} path="sign-up" />
        <Route element={<NotFound />} path="404" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </Suspense>
  );
}
