import { Camera } from "lucide-react";
import { useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";

interface EditProfileModalProps {
  onClose: () => void;
  initialName?: string;
  initialUserName?: string;
  initialPassword: string;
}

export default function EditProfileModal({
  onClose,
  initialName = "",
  initialUserName = "",
  initialPassword = "",
}: EditProfileModalProps) {
  const [form, setForm] = useState({ name: initialName, username: initialUserName, password: initialPassword });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Perfil atualizado:", form);
    onClose();
  };

  return (
    <ModalLayout onClose={onClose} className="max-w-[600px]">
      <h2 className="text-xl font-bold mb-4 text-center">Editar perfil</h2>

      <div className="relative w-2xs h-48 bg-gray-300 m-auto">
        <button className="absolute inset-0 flex items-center justify-center text-2xl text-gray-400 ">
          <div className="m-2 rounded-full bg-gray-100 hover:bg-neutral-400 opacity-50 transition-colors cursor-pointer">
            <Camera size={40} className="p-2 text-gray-400 hover:text-gray-200 bg-opacity-50 transition-colors" />
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
          <label className="block text-gray-700">Nome de Usuário</label>
          <input
            type="text"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-2 border border-gray-200 rounded"
          />
        </div>

        <button
          type="submit"
          className="btn self-end bg-black text-white px-6 py-2 rounded"
        >
          Salvar
        </button>
      </form>
    </ModalLayout>
  );
}
