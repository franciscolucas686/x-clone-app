import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { Xlogo } from "../components/icons/Xlogo";
import ModalLayout from "../layouts/ModalLayout";

interface RegisterModalProps {
  onClose: () => void;
}

export default function RegisterModal({ onClose }: RegisterModalProps) {
  const { login } = useAuth();
  const [form, setForm] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Registro falhou");
        return;
      }

      await login(form.username, form.password);
      onClose();
    } catch (err) {
      console.error("Registro falhou", err);
      setError("Erro ao registrar usuário!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalLayout onClose={onClose} className="w-[400px]">
      <Xlogo />
      <h2 className="text-2xl mb-6 text-center cursor-default">Criar sua conta</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* <input
          type="text"
          placeholder="Nome do usuário ex: @lucas123"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="p-2 border rounded"
          required
        /> */}

        
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
          type="name"
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
          className="p-2 border rounded  focus:border-blue-500 outline-none box-border"
          required
        />
        <input
          type="password"
          placeholder="Confirmar senha"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          className="p-2 border rounded  focus:border-blue-500 outline-none box-border"
          required
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button type="submit" disabled={loading} className="btn">
          {loading ? "Registrando..." : "Cadastrar"}
        </button>
      </form>
    </ModalLayout>
  );
}