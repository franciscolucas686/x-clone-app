import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { Xlogo } from "../components/icons/Xlogo";
import ModalLayout from "../layouts/ModalLayout";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
      onClose();
    } catch (err) {
      console.error("Login falhou", err);
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
