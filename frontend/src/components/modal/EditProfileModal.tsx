import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { clearError, setError } from "../../features/auth/authSlice";
import { updateProfile } from "../../features/auth/authThunks";
import { closeModal } from "../../features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import { CloseIcon } from "../icons/CloseIcon";
import ModalLayout from "./ModalLayout";

export default function EditProfileModal() {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const defaultAvatar =
    "https://res.cloudinary.com/dh5rxxtqe/image/upload/v1763632324/xclone/avatars/default.png";
  const currentAvatar = user?.avatar_url || defaultAvatar;

  const [form, setForm] = useState({
    name: user?.name ?? "",
    username: user?.username ?? "",
    password: "",
    confirm_password: "",
    avatar: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string>(currentAvatar);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (form.avatar) {
      const objectUrl = URL.createObjectURL(form.avatar);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(currentAvatar);
    }
  }, [form.avatar, currentAvatar]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setForm({ ...form, avatar: file });
  };

  const handleRemoveAvatar = () => {
    setForm({ ...form, avatar: null });
    setPreviewUrl(currentAvatar);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(clearError());

    if (form.password && form.password !== form.confirm_password) {
      dispatch(setError("As senhas não coincidem."));
      return;
    }

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

      <div className="relative w-48 h-48 m-auto rounded-full">
        <img 
          src={previewUrl}
          alt={form.name || "Foto de perfil"}
          className="w-full h-full object-cover border-4 border-white bg-gray-100 rounded-full overflow-hidden"
        />
        <label className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 duration-200 ease-in-out z-10">
          <Camera size={40} className="text-white cursor-pointer" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        {form.avatar && (
          <button
            type="button"
            onClick={handleRemoveAvatar}
            className="absolute top-2 right-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition z-20"
            title="Remover imagem"
          >
            <CloseIcon className="!hover:text-current !transition-none" />
          </button>
        )}
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
          <label className="block text-gray-700">Nova Senha</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-2 border border-gray-200 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Confirmar Nova Senha</label>
          <input
            type="password"
            value={form.confirm_password}
            onChange={(e) =>
              setForm({ ...form, confirm_password: e.target.value })
            }
            className="w-full p-2 border border-gray-200 rounded"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn self-end bg-black text-white px-6 py-2 rounded transition hover:bg-gray-800"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </ModalLayout>
  );
}
