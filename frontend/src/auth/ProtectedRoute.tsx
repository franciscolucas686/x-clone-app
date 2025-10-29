import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "../components/spinner/Spinner";
import { useAuth } from "./useAuth";

export default function PrivateRoute() {
  const { user, loading } = useAuth();
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading || showSpinner) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
        <Spinner size={50} color="border-t-blue-500" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
