import { useState } from "react";

import { useAuth } from "../auth/useAuth";
import { CloseIcon } from "../components/icons/CloseIcon";
import { Xlogo } from "../components/icons/Xlogo";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      onClose();
    } catch (error) {
      console.error("Login falhou", error);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <div className="relative bg-white rounded w-[90%] max-w-[400px] h-[90%] max-h-[450px] px-12 flex flex-col">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 left-2"
        >
          <CloseIcon />
        </button>
        <Xlogo />

        <div className="flex flex-col justify-center">
          <h2 className="text-xl my-[8%] text-center">Entrar no X</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <input
              type="text"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="p-2 border rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="p-2 border rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
