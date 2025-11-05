import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "../components/spinner/Spinner";
import { useAppSelector } from "../hooks/useAppSelector";

export default function PrivateRoute() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading || showSpinner) {
    return ( 
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <Spinner size={50} color="border-t-blue-500" />
      </div>
    ); 
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
