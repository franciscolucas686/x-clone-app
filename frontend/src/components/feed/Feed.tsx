import { useState } from "react";
import CommentModal from "./CommentModal";
import Post from "./Post";

export default function Feed() {
  const [posts] = useState(
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      user: `@roberto3474${i + 1}`,
      content: `Esse é o post número ${i + 1}.`,
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
    }))
  );

  const [selectedPost, setSelectedPost] = useState<null | {
    id: number;
    user: string;
    content: string;
    avatar: string;
  } | null>(null);

  return (
    <div>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 min-w-0 pb-4">
          <img
            src="https://avatars.githubusercontent.com/u/15079328?v=4"
            alt="Francisco Lucas"
            className="max-w-full h-auto w-12 rounded-full flex-shrink-0"
          />
          <textarea
            placeholder="O que está acontecendo?"
            className="w-full resize-none p-5 ml-2 rounded-lg border border-gray-200 focus:outline-none"
          />
        </div>
        <div className="flex justify-end">
          <button className="btn px-4 py-2">Postar</button>
        </div>
      </div>

      {posts.map((post) => (
        <Post
          key={post.id}
          user={post.user}
          content={post.content}
          avatar={post.avatar}
          onCommentClick={() => setSelectedPost(post)}
        />
      ))}

      {selectedPost && (
        <CommentModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}
