import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { useAppSelector } from "../../hooks/useAppSelector";

type UseCardProps = {
  name: string;
  username: string;
  avatarUrl: string;
};

export default function UserCard({ name, avatarUrl }: UseCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="relative" onClick={() => setMenuOpen(!menuOpen)}>
      <div className="flex items-center justify-between p-2 rounded-full hover:bg-gray-200 cursor-pointer transition-colors duration-200 ease-in-out">
        <div className="flex items-center space-x-2 min-w-0">
          <img
            src={avatarUrl}
            alt={name}
            className="max-w-full h-auto w-10 rounded-full flex-shrink-0"
          />
          <div className="hidden lg:block">
            <p className="font-bold leading-tight truncate">{user.name}</p>
            <p className="text-gray-500 text-sm leading-tight truncate">
              @{user.username}
            </p>
          </div>
        </div>
        <button className="p-2">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute bottom-16 left-0 w-60 bg-white shadow-custom rounded-lg z-50">
          <UserMenu />
        </div>
      )}
    </div>
  );
}
