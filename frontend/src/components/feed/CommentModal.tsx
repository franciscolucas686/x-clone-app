import { useState } from "react";
import { Spinner } from "../../components/spinner/Spinner";
import { createComment } from "../../features/posts/postThunks";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import ModalLayout from "../modal/ModalLayout";

type Props = {
  postId: number;
  onClose: () => void;
};

export default function CommentModal({ postId, onClose }: Props) {
  const dispatch = useAppDispatch();
  const post =
    useAppSelector((s) => s.posts.items.find((p) => p.id === postId)) ?? null;
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  if (!post) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      setLocalError("Comentário vazio");
      return;
    }

    setLocalError(null);
    setSubmitting(true);

    try {
      await dispatch(
        createComment({ postId: post.id, text: trimmed })
      ).unwrap();
      setText("");
    } catch (err) {
      console.error("Erro ao enviar comentário:", err);
      setLocalError("Erro ao enviar comentário");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalLayout onClose={onClose} className="max-w-[600px]">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-start gap-3">
          <img
            src={post.user.avatar || "/images/default-avatar.png"}
            alt={post.user.name ?? post.user.username}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold">@{post.user.username}</h3>
            <p className="text-gray-700">{post.text}</p>
          </div>
        </div>

        {post.comments.length > 0 && (
          <div className="mt-2 border-t border-gray-200 pt-3 max-h-64 overflow-y-auto flex flex-col gap-2">
            {post.comments.map((c) => (
              <div key={c.id} className="flex items-start gap-3">
                <img
                  src={c.user.avatar || "/images/default-avatar.png"}
                  alt={c.user.name ?? c.user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="bg-gray-100 p-2 rounded w-full">
                  <div className="text-sm font-semibold">
                    @{c.user.username}
                  </div>
                  <div className="text-sm whitespace-pre-wrap">{c.text}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Escreva seu comentário..."
            className="flex-1 p-2 border border-gray-300 rounded resize-none"
            disabled={submitting}
          />
          <div className="flex flex-col items-end">
            <button
              type="submit"
              className="btn bg-black text-white px-4 py-2 mt-3 rounded disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? <Spinner /> : "Comentar"}
            </button>
            {localError && (
              <span className="text-red-500 text-xs mt-1">{localError}</span>
            )}
          </div>
        </form>
      </div>
    </ModalLayout>
  );
}
