// src/components/FollowButton.tsx
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import { toggleFollow } from "../../features/users/userThunks";

interface FollowButtonProps {
  userId: number;
  isFollowing: boolean;
}

export default function FollowButton({ userId, isFollowing }: FollowButtonProps) {
  const dispatch = useAppDispatch();
  const loadingFollowIds = useAppSelector((state) => state.users.loadingFollowIds);

  const isLoading = loadingFollowIds.includes(userId);

  const handleClick = () => {
    if (!isLoading) {
      dispatch(toggleFollow(userId));
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
        isFollowing
          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      {isLoading ? "..." : isFollowing ? "Seguindo" : "Seguir"}
    </button>
  );
}
