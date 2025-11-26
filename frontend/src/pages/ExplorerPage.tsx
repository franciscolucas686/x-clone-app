import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FollowButton from "../components/button/FollowButton";
import { Spinner } from "../components/spinner/Spinner";
import { fetchUsers } from "../features/users/userThunks";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";

export default function ExplorerPage() {
  const dispatch = useAppDispatch();
  const { list: users, loading } = useAppSelector((state) => state.users);
  const [search, setSearch] = useState("");
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUsers()).finally(() => setLocalLoading(false));
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto p-4">
      <div className="relative mb-4">
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Buscar pessoas"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-full py-2 pl-10 focus:ring focus:ring-blue-200 outline-none"
        />
      </div>

      <div className="space-y-3">
        {loading || localLoading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Spinner size={40} color="border-t-blue-500" />
          </div>
        ) : (
          filteredUsers.map((user) => (
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
                <div>
                  <Link
                    to={`/user/${user.username}`}
                    className="font-semibold text-gray-800 flex"
                  >
                    {user.name}
                  </Link>
                  <Link
                    to={`/user/${user.username}`}
                    className="text-gray-500 text-sm"
                  >
                    @{user.username}
                  </Link>
                </div>
              </div>

              <FollowButton
                userId={user.id}
                isFollowing={user.is_following ?? false}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
