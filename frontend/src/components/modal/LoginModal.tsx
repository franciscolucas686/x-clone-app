import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../features/auth/authSlice";
import { loginUser } from "../../features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import { Xlogo } from "../icons/Xlogo";
import ModalLayout from "./ModalLayout";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState({ username: "", password: "" });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(resultAction)) {
      onClose();
      navigate("/feed");
    }
  };

  return (
    <ModalLayout onClose={onClose} className="w-[400px]">
      <Xlogo />
      <h2 className="text-xl my-6 text-center cursor-default">Entrar no X</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex items-center border rounded focus-within:border-blue-500 outline-none  box-border">
          <span className="pl-3 text-gray-500 select-none">@</span>
          <input
            type="text"
            placeholder="nome_do_usuario"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="flex-1 py-2 outline-none bg-white"
            required
          />
        </div>

        <input
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="p-2 border rounded focus:border-blue-500 outline-none box-border"
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Login"}
        </button>
      </form>
    </ModalLayout>
  );
}
