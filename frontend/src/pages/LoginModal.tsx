import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { Xlogo } from "../components/icons/Xlogo";
import ModalLayout from "../layouts/ModalLayout";

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
    } catch (err) {
      console.error("Login falhou", err);
    }
  };

  return (
    <ModalLayout onClose={onClose} className="w-[400px]">
      <Xlogo />
      <h2 className="text-xl my-6 text-center">Entrar no X</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Login"}
        </button>
      </form>
    </ModalLayout>
  );
}