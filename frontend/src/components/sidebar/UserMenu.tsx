import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";

export default function UserMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="flex flex-col">
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-left rounded-lg cursor-pointer hover:bg-gray-100 font-semibold transition-colors duration-200 ease-in-out"
      >
        Sair de {user?.name}
      </button>
    </div>
  );
}
