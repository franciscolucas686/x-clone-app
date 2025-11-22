import { Heart, MessageCircle } from "lucide-react";
import { toggleLike } from "../../features/posts/postThunks";
import type { Post as PostType } from "../../features/posts/types";
import { useAppDispatch } from "../../hooks/useAppSelector";

type Props = {
  post: PostType;
  onCommentClick?: () => void;
};

export default function Post({ post, onCommentClick }: Props) {
  const dispatch = useAppDispatch();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike({ postId: post.id }));
  };

  return (
    <div className="p-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex items-start space-x-3">
        <img
          src={post.user.avatar_url}
          alt={post.user.name ?? post.user.username}
          className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold cursor-default">@{post.user.username}</h3>
            <span className="text-xs text-gray-400">
              {new Date(post.created_at).toLocaleString()}
            </span>
          </div>

          <p className="mt-1 whitespace-normal">{post.text}</p>

          <div className="flex text-gray-500 text-sm gap-6 mt-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCommentClick?.();
              }}
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <MessageCircle size={18} />
              <span>{post.comments_count}</span>
            </button>

            <button
              onClick={handleLike}
              className={`flex items-center gap-2 ${
                post.is_liked ? "text-red-500" : "hover:text-red-500"
              }`}
            >
              <div className="p-2 rounded-full hover:bg-red-100">
                <Heart size={18} />
              </div>
              <span>{post.likes_count}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
