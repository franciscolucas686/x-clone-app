import { useState } from "react";
import { createPost } from "../../features/posts/postThunks";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import { Spinner } from "../spinner/Spinner";
import ModalLayout from "./ModalLayout";

interface ButtonPostModalProps {
  onClose: () => void;
}

export default function ButtonPostModal({ onClose }: ButtonPostModalProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [text, setText] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) {
      setError("O post não pode estar vazio.");
      return;
    }

    setCreating(true);
    setError(null);

    try {
      await dispatch(createPost({ text: trimmed })).unwrap();
      setText("");
      onClose();
    } catch (err) {
      console.error("Erro ao criar post:", err);
      setError("Erro ao criar o post. Tente novamente.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <ModalLayout onClose={onClose} className="max-w-[400px]">
      <form onSubmit={handleSubmit} className="p-2 border-gray-200 mt-4">
        <div className="flex items-start space-x-2 pb-4">
          <img
            src={user?.avatar_url}
            alt={user?.name}
            className="w-12 h-12 object-cover rounded-full flex-shrink-0"
          />
          <textarea
            placeholder="O que está acontecendo?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full resize-none p-2 rounded-lg border border-gray-200 focus:outline-none"
            rows={3}
            disabled={creating}
          />
        </div>

        {error && <p className="text-red-500 text-sm pb-2">{error}</p>}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="btn bg-black text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={creating}
          >
            {creating ? <Spinner /> : "Postar"}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
}
