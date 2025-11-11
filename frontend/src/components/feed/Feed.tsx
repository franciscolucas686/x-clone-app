import { useEffect, useState } from "react";
import { Spinner } from "../../components/spinner/Spinner";
import { createPost, fetchFollowingPosts } from "../../features/posts/postThunks";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import CommentModal from "./CommentModal";
import Post from "./Post";

export default function Feed() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items: posts, loading, error } = useAppSelector((s) => s.posts);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [newPostText, setNewPostText] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    dispatch(fetchFollowingPosts());
  }, [dispatch]);

  const handleCreatePost = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = newPostText.trim();
    if (!text) return;
    setCreating(true);
    try {
      await dispatch(createPost({ text })).unwrap();
      setNewPostText("");
      dispatch(fetchFollowingPosts());
    } catch (err) {
      console.error("Erro ao criar post:", err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <div className="p-4 border-b border-gray-200">
        <form onSubmit={handleCreatePost}>
          <div className="flex items-start space-x-2 pb-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-12 h-12 object-cover rounded-full flex-shrink-0"
            />
            <textarea
              placeholder="O que está acontecendo?"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              className="w-full resize-none p-5 ml-2 rounded-lg border border-gray-200 focus:outline-none"
              rows={3}
              disabled={creating}
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn px-4 py-2" disabled={creating}>
              {creating ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="flex justify-center py-6">
          {typeof Spinner !== "undefined" ? (
            <Spinner />
          ) : (
            <div>Carregando posts...</div>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-center py-4">{error}</p>}

      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-500 py-6">Não há nenhum post</p>
      )}

      {posts.map((p) => (
        <Post
          key={p.id}
          post={p}
          onCommentClick={() => setSelectedPostId(p.id)}
        />
      ))}

      {selectedPostId != null && (
        <CommentModal
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
        />
      )}
    </div>
  );
}
