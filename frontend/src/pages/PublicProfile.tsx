import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FollowButton from "../components/button/FollowButton";
import Post from "../components/feed/Post";
import CommentModal from "../components/modal/CommentModal";
import { ModalRoot } from "../components/modal/ModalRoot";
import { Spinner } from "../components/spinner/Spinner";
import { clearUserPosts } from "../features/posts/postSlice";
import { fetchUserPosts } from "../features/posts/postThunks";
import { fetchUserByUsername } from "../features/users/userThunks";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { formatJoinedDate } from "../utils/date";

export default function PublicProfile() {
  const { username } = useParams<{ username: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedUser, loading } = useAppSelector((state) => state.users);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const { items: userPosts, loading: postsLoading } = useAppSelector(
    (state) => state.posts.userPosts
  );

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      dispatch(clearUserPosts());

      try {
        const userResult = await dispatch(
          fetchUserByUsername(username)
        ).unwrap();

        if (userResult?.username) {
          await dispatch(
            fetchUserPosts({
              username: userResult.username,
              isInitialLoad: true,
            })
          ).unwrap();
        }
      } catch (error) {
        console.error("Erro ao carregar o perfil público:", error);
      }
    };

    fetchData();
  }, [username, dispatch]);

  if (loading || !selectedUser) {
    return (
      <div className="flex justify-center items-center py-6 min-h-[40vh]">
        <Spinner size={30} color="border-t-blue-500" />
        <p className="ml-2 text-gray-500">Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <button className="cursor-pointer" onClick={() => navigate(-1)}>
          <div className="m-2 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={40} className="p-2" />
          </div>
        </button>
        <div className="ml-4">
          <h2 className="text-xl font-bold cursor-default">
            {selectedUser.name}
          </h2>
          <p className="text-gray-500 text-sm cursor-default">
            <span>{selectedUser.posts_count}</span> posts
          </p>
        </div>
      </div>

      <div>
        <div className="h-40 bg-gray-300" />
        <div className="flex items-end px-4 -mt-16">
          <img
            src={selectedUser.avatar_url}
            alt={selectedUser.name}
            className="w-32 h-32 object-cover rounded-full border-4 border-white"
          />
        </div>
      </div>

      <div className="mt-6 px-4 flex justify-between items-start">
        <div>
          <p className="text-gray-500 mt-2 cursor-default">
            Ingressou em{" "}
            {selectedUser.joined_display
              ? formatJoinedDate(selectedUser.joined_display)
              : ""}
          </p>

          <div className="flex space-x-4 mt-2">
            <span
              className="cursor-pointer hover:underline"
              onClick={() =>
                navigate(`/follow/${selectedUser.username}/followers`, {
                  state: { tab: "followers" },
                })
              }
            >
              <strong>{selectedUser.followers_count}</strong> Seguidores
            </span>
            <span
              className="cursor-pointer hover:underline"
              onClick={() =>
                navigate(`/follow/${selectedUser.username}/following`, {
                  state: { tab: "following" },
                })
              }
            >
              <strong>{selectedUser.following_count}</strong> Seguindo
            </span>
          </div>
        </div>

        <FollowButton
          userId={selectedUser.id}
          isFollowing={selectedUser.is_following ?? false}
        />
      </div>

      <div className="mt-4 border-b border-gray-200 flex text-gray-600 font-semibold">
        <span className="p-3 px-6 hover:bg-gray-100 transition cursor-pointer">
          Posts
        </span>
      </div>

      <div>
        {postsLoading ? (
          <div className="flex justify-center py-10">
            <Spinner size={35} color="border-t-blue-500" />
          </div>
        ) : userPosts.length === 0 ? (
          <div className="text-gray-500 p-4">Ainda não há posts</div>
        ) : (
          <div className="flex flex-col">
            {userPosts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onCommentClick={() => setSelectedPostId(post.id)}
              />
            ))}
          </div>
        )}
      </div>
      {selectedPostId !== null && (
        <CommentModal
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
        />
      )}
      <ModalRoot />
    </div>
  );
}
