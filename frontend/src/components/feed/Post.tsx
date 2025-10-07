import { Heart, MessageCircle } from "lucide-react";

type PostProps = {
  user: string;
  content: string;
  avatar: string;
  onCommentClick?: () => void;
};

export default function Post({ user, content, avatar, onCommentClick }: PostProps) {
  return (
    <div className="px-4 py-2 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
      <div className="flex items-center space-x-2 min-w-0 pb-4">
        <img
          src={avatar}
          alt={user}
          className="max-w-full h-auto w-12 rounded-full flex-shrink-0"
        />
        <div className="ml-2">
          <h3 className="font-bold">{user}</h3>
          <p className="whitespace-normal">{content}</p>
          <div className="flex text-gray-500 text-sm max-w-md gap-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCommentClick?.();
              }}
              className="flex items-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer group"
            >
              <div className="p-2 rounded-full hover:bg-blue-100">
                <MessageCircle size={18} />
              </div>
              <span>3 mil</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer group">
              <div className="p-2 rounded-full hover:bg-red-100">
                <Heart size={18} />
              </div>
              <span>15 mil</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
