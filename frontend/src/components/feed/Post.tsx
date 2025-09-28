import { Heart, MessageCircle } from "lucide-react";

type PostProps = {
  user: string;
  content: string;
};

export default function Post({ user, content }: PostProps) {
  return (
    <div className="px-4 py-2 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
      <h3 className="font-bold">{user}</h3>
      <p className="whitespace-normal">{content}</p>
      <div className="flex text-gray-500 text-sm max-w-md gap-10">
        <button className="flex items-center space-x-0.5 hover:text-blue-500 transition-colors cursor-pointer">
          <div className="p-2 rounded-full hover:bg-blue-100">
            <MessageCircle size={18} />
          </div>
          <span>3 mil</span>
        </button>

        <button className="flex items-center space-x-0.5 hover:text-red-500 transition-colors cursor-pointer">
          <div className="p-2 rounded-full hover:bg-red-100">
            <Heart size={18} />
          </div>
          <span>15 mil</span>
        </button>
      </div>

    </div>
  );
}
