import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FollowButton from "../components/button/FollowButton";
import { Spinner } from "../components/spinner/Spinner";
import type { User } from "../features/users/types";
import { clearFollowLists } from "../features/users/userSlice";
import {
  fetchFollowers,
  fetchFollowing,
  fetchUserByUsername,
} from "../features/users/userThunks";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";

export default function FollowListPage() {
  const { username } = useParams<{ username: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    selectedUser,
    loading,
    followers,
    following,
    followersNext,
    followingNext,
    hasMoreFollowers,
    hasMoreFollowing,
    loadingFollowers,
    loadingFollowing,
  } = useAppSelector((state) => state.users);

  const authUserId = useAppSelector((state) => state.auth.user?.id);
  const activeTab = location.pathname.includes("/following") ? "following" : "followers";

  // Remove duplicados
  const uniqueById = <T extends { id: number }>(list: T[]): T[] => {
    const map = new Map<number, T>();
    list.forEach((item) => map.set(item.id, item));
    return Array.from(map.values());
  };

  const safeFollowers = uniqueById(followers);
  const safeFollowing = uniqueById(following);

  // Carrega o usuário selecionado
  useEffect(() => {
    if (!username) return;
    dispatch(fetchUserByUsername(username));
  }, [username, dispatch]);

  // Carrega a lista de seguidores ou seguindo
  useEffect(() => {
    if (!selectedUser) return;
    dispatch(clearFollowLists());

    if (activeTab === "followers") {
      dispatch(fetchFollowers({ userId: selectedUser.id }));
    } else {
      dispatch(fetchFollowing({ userId: selectedUser.id }));
    }
  }, [selectedUser, activeTab, dispatch]);

  const handleLoadMore = () => {
    if (!selectedUser) return;

    if (activeTab === "followers" && followersNext && !loadingFollowers) {
      dispatch(fetchFollowers({ userId: selectedUser.id, url: followersNext }));
    }

    if (activeTab === "following" && followingNext && !loadingFollowing) {
      dispatch(fetchFollowing({ userId: selectedUser.id, url: followingNext }));
    }
  };

  const renderUserItem = (user: User) => {
    const isAuthUser = user.id === authUserId;
    const linkTo = isAuthUser ? "/profile" : `/user/${user.username}`;

    return (
      <div
        key={user.id}
        className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-3">
          <img
            src={user.avatar_url}
            alt={user.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <Link to={linkTo} className="font-semibold text-gray-800">
              {user.name}
            </Link>
            <Link to={linkTo} className="text-gray-500 text-sm">
              @{user.username}
            </Link>
          </div>
        </div>
        {!isAuthUser && (
          <FollowButton userId={user.id} isFollowing={user.is_following ?? false} />
        )}
      </div>
    );
  };

  if (loading || !selectedUser) {
    return (
      <div className="flex justify-center items-center py-6 min-h-[40vh]">
        <Spinner size={30} color="border-t-blue-500" />
        <span className="ml-2 text-gray-500">Carregando usuários...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Cabeçalho */}
      <div className="flex items-center">
        <button onClick={() => navigate(-1)}>
          <div className="m-2 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={40} className="p-2 cursor-pointer" />
          </div>
        </button>
        <div className="ml-4">
          <h2 className="text-xl font-bold">{selectedUser.name}</h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mt-2">
        <Link
          to={`/follow/${selectedUser.username}/followers`}
          className={`p-3 flex-1 text-center ${
            activeTab === "followers" ? "border-b-4 border-blue-500 font-semibold" : ""
          }`}
        >
          Seguidores
        </Link>
        <Link
          to={`/follow/${selectedUser.username}/following`}
          className={`p-3 flex-1 text-center ${
            activeTab === "following" ? "border-b-4 border-blue-500 font-semibold" : ""
          }`}
        >
          Seguindo
        </Link>
      </div>

      {/* Lista de usuários */}
      <div className="flex flex-col gap-2 mt-2 px-4">
        {activeTab === "followers" && safeFollowers.map(renderUserItem)}
        {activeTab === "following" && safeFollowing.map(renderUserItem)}
      </div>

      {/* Loader */}
      {(loadingFollowers || loadingFollowing) && (
        <div className="flex justify-center py-4">
          <Spinner size={30} color="border-t-blue-500" />
          <span className="ml-2">Carregando usuários ...</span>
        </div>
      )}

      {/* Botão "Ver mais" */}
      {((activeTab === "followers" && hasMoreFollowers) ||
        (activeTab === "following" && hasMoreFollowing)) && (
        <button onClick={handleLoadMore} className="p-2 text-blue-500 text-center mt-2">
          Ver mais
        </button>
      )}
    </div>
  );
}
