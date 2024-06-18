import { lazy, ReactElement, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SceneSpinner from "../components/SceneSpinner";
import AuthGuard from "../guards/AuthGuard";
import DashboardLayout from "../Layouts/DashboardLayout";

const NotFound = lazy(() => import("./NotFound"));
const SignIn = lazy(() => import("./SignIn"));
const SignUp = lazy(() => import("./SignUp"));
const Dashboard = lazy(() => import("./Dashboard"));

export default function RootScene(): ReactElement {
  return (
    <Suspense fallback={<SceneSpinner />}>
      <Routes>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route
          element={
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          }
          path="dashboard"
        >
          <Route index element={<Dashboard />} />
        </Route>
        <Route element={<SignIn />} path="signin" />
        <Route element={<SignUp />} path="signup" />
        <Route element={<NotFound />} path="404" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </Suspense>
  );
}
