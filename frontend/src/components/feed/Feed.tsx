import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import { fetchPosts } from "../../features/posts/postThunk";
import CommentModal from "./CommentModal";
import { useState } from "react";
import type { Post } from "../../features/posts/types";
import { Spinner } from "../../components/spinner/Spinner";

export default function Feed() {
  const dispatch = useAppDispatch();
  const { items: posts, loading, error } = useAppSelector((state) => state.posts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center p-6">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center p-4">{error}</p>;
  }

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
          user={`@${post.user.username}`}
          content={post.text}
          avatar={post.user.avatar}
          onCommentClick={() => setSelectedPost(post)}
        />
      ))}

      {selectedPost && (
        <CommentModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}
