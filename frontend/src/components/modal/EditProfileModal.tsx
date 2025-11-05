import { Camera } from "lucide-react";
import { useState } from "react";
import { updateProfile } from "../../features/auth/authThunks";
import { closeModal } from "../../features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import ModalLayout from "./ModalLayout";

export default function EditProfileModal() {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: user?.name ?? "",
    username: user?.username ?? "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) return;

    const result = await dispatch(updateProfile(form));

    if (updateProfile.fulfilled.match(result)) {
      dispatch(closeModal());
    }
  };

  return (
    <ModalLayout
      onClose={() => dispatch(closeModal())}
      className="max-w-[600px]"
    >
      <h2 className="text-xl font-bold mb-4 text-center cursor-default">
        Editar perfil
      </h2>

      <div className="relative w-2xs h-48 bg-gray-300 m-auto">
        <button className="absolute inset-0 flex items-center justify-center text-2xl text-gray-400">
          <div className="m-2 rounded-full bg-gray-100 hover:bg-neutral-400 opacity-50 transition-colors cursor-pointer">
            <Camera
              size={40}
              className="p-2 text-gray-400 hover:text-gray-200 bg-opacity-50 transition-colors"
            />
          </div>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6 px-2">
        <div>
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border border-gray-200 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Usuário</label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full p-2 border border-gray-200 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Senha</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-2 border border-gray-200 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Confirmar senha</label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className="w-full p-2 border border-gray-200 rounded"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn self-end bg-black text-white px-6 py-2 rounded"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </ModalLayout>
  );
}
