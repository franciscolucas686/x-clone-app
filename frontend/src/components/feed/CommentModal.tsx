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
  const [comments, setComments] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;

    setComments((prev) => [...prev, comment.trim()]);
    setComment("");
  };

  return (
    <ModalLayout onClose={onClose} className="max-w-[500px]">
      <div className="flex flex-col gap-4 p-2">
        <div className="flex items-center space-x-2 min-w-0 pb-4">
          <img
            src={post.avatar}
            alt="Francisco Lucas"
            className="max-w-full h-auto w-12 rounded-full flex-shrink-0"
          />
          <div className="pb-4">
            <h3 className="font-bold">{post.user}</h3>
            <p className="text-gray-700 whitespace-normal">{post.content}</p>
          </div>
        </div>

        {comments.length > 0 && (
          <div className="mt-4 border-t border-gray-200 pt-3">
            <h4 className="font-semibold mb-2 text-gray-700">Comentários</h4>

            <div className="max-h-48 overflow-y-auto flex flex-col gap-2 pr-1">
              {comments.map((c, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-2 rounded text-gray-800 whitespace-pre-wrap"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-fol gap-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escreva sua resposta..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 resize-none"
            rows={3}
          />

          <button type="submit" className="btn rounded-none self-end mb-2">
            Comentar
          </button>
        </form>

      </div>
    </ModalLayout>
  );
}
