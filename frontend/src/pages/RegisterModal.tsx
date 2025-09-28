import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { CloseIcon } from "../components/icons/CloseIcon";
import { Xlogo } from "../components/icons/Xlogo";

interface RegisterModalProps {
  onClose: () => void;
}

export default function RegisterModal({ onClose }: RegisterModalProps) {
  const { login } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
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
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("confirmPassword", form.confirmPassword);

      const res = await fetch("/api/register/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Registro falhou");
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("Usuário criado:", data);

      await login(form.email, form.password);
      onClose();
    } catch (error) {
      console.error("Registro falhou", error);
      setError("Erro ao registrar usuário!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <div className="relative bg-white rounded w-[90%] max-w-[400px] h-[90%] max-h-[600px] px-8 py-6 flex flex-col overflow-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 left-2"
        >
          <CloseIcon />
        </button>
        <Xlogo />

        <h2 className="text-2xl mb-6 text-center">Criar sua conta</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className="p-2 border rounded"
            required
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button type="submit" disabled={loading} className="btn">
            {loading ? "Registrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
