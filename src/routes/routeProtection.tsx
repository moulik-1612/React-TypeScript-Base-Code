// need lot of improvement we just cannot realy on the localstorage authentication.

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth";

export default function ProtectedRoute() {
  const { token } = useAuth();
  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists → allow access
  return <Outlet />;
}
