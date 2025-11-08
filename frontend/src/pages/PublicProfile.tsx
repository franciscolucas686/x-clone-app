// src/pages/PublicProfile.tsx
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FollowButton from "../components/button/FollowButton";
import { fetchUserByUsername } from "../features/users/userThunks";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { formatJoinedDate } from "../utils/date";

export default function PublicProfile() {
  const { username } = useParams<{ username: string }>();
  const dispatch = useAppDispatch();
  const { selectedUser, loading } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (username) {
      dispatch(fetchUserByUsername(username));
    }
  }, [dispatch, username]);

  if (loading || !selectedUser) {
    return <p className="p-4 text-gray-500">Carregando perfil...</p>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <Link to="/feed">
          <div className="m-2 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={40} className="p-2" />
          </div>
        </Link>
        <div className="ml-4">
          <h2 className="text-xl font-bold cursor-default">
            {selectedUser.name}
          </h2>
          <p className="text-gray-500 text-sm cursor-default">
            @{selectedUser.username}
          </p>
        </div>
      </div>

      <div>
        <div className="h-40 bg-gray-300" />
        <div className="flex items-end px-4 -mt-16">
          <img
            src={selectedUser.avatar}
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
            <span className="cursor-default">
              <strong>{selectedUser.following_count}</strong> Seguindo
            </span>
            <span className="cursor-default">
              <strong>{selectedUser.followers_count}</strong> Seguidores
            </span>
          </div>
        </div>

        <FollowButton
          userId={selectedUser.id}
          isFollowing={selectedUser.is_following ?? false}
        />
      </div>

      <div className="mt-4 border-b border-gray-200 flex text-gray-600 font-semibold">
        <button className="p-3 px-6 hover:bg-gray-100 transition cursor-pointer">
          Posts
        </button>
      </div>

      <div className="p-4 text-gray-500">Ainda não há posts</div>
    </div>
  );
}
