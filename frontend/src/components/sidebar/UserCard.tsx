import { MoreHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import UserMenu from "./UserMenu";

export default function UserCard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className="flex items-center justify-between p-2 rounded-full hover:bg-gray-200 cursor-pointer transition-colors duration-200 ease-in-out"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="flex items-center space-x-2 min-w-0">
          <img
            src={user?.avatar_url}
            className="max-w-full object-cover h-10 w-10 rounded-full flex-shrink-0 overflow-y-hidden"
          />
          <div className="hidden lg:block">
            <p className="font-bold leading-tight truncate">{user?.name}</p>
            <p className="text-gray-500 text-sm leading-tight truncate">
              @{user?.username}
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
