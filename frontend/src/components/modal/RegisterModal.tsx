import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../features/auth/authSlice";
import { registerUser } from "../../features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import { Xlogo } from "../icons/Xlogo";
import ModalLayout from "./ModalLayout";

interface RegisterModalProps {
  onClose: () => void;
}

export default function RegisterModal({ onClose }: RegisterModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (form.password !== form.confirmPassword) {
      setLocalError("As senhas não coincidem!");
      return;
    }

    const resultAction = await dispatch(registerUser(form));
    if (registerUser.rejected.match(resultAction) && resultAction.payload) {
      setLocalError(resultAction.payload);
    }

    if (registerUser.fulfilled.match(resultAction)) {
      onClose();
      navigate("/feed");
    }
  };

  return (
    <ModalLayout onClose={onClose} className="w-[400px]">
      <Xlogo />
      <h2 className="text-2xl mb-6 text-center cursor-default">
        Criar sua conta
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex items-center border rounded focus-within:border-blue-500 outline-none box-border">
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
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 border rounded focus:border-blue-500 outline-none box-border"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="p-2 border rounded focus:border-blue-500 outline-none box-border"
          required
        />

        <input
          type="password"
          placeholder="Confirmar senha"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          className="p-2 border rounded focus:border-blue-500 outline-none box-border"
          required
        />

        {(error || localError) && (
          <p className="text-red-500 text-sm text-center">
            {error || localError}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn">
          {loading ? "Registrando..." : "Cadastrar"}
        </button>
      </form>
    </ModalLayout>
  );
}
