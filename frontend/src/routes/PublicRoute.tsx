import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

export default function PublicRoute() {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Outlet />;
  }

  if (user) {
    return <Navigate to="/feed" replace />;
  }

  return <Outlet />;
}
