import { useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";

interface CommentModalProps {
  onClose: () => void;
  post: {
    id: number;
    user: string;
    content: string;
    avatar: string;
  };
}

export default function CommentModal({ onClose, post }: CommentModalProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Novo comentário no post ${post.id}:`, comment);
    setComment("");
    onClose();
  };

  return (
    <ModalLayout onClose={onClose} className="max-w-[500px]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2 min-w-0 pb-4">
          <img
            src={post.avatar}
            alt="Francisco Lucas"
            className="max-w-full h-auto w-12 rounded-full flex-shrink-0"
          />
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-bold">{post.user}</h3>
            <p className="text-gray-700 whitespace-normal">{post.content}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-fol gap-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escreva sua resposta..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 resize-none"
            rows={3}
          />

          <button
            type="submit"
            className="self-end bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition"
          >
            Comentar
          </button>
        </form>
      </div>
    </ModalLayout>
  );
}
