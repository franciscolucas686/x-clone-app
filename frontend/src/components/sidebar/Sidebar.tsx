import { Bell, Home, Mail, MoreHorizontal, Search, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Xlogo } from "../icons/Xlogo";
import ButtonPostModal from "../modal/ButtonPostModal";
import MoreMenu from "./MoreMenu";
import UserCard from "./UserCard";

const navItems = [
  { icon: Home, label: "Página inicial", path: "/feed" },
  { icon: Search, label: "Explorar", path: "/explorer" },
  { icon: Bell, label: "Notificações", path: "/notifications" },
  { icon: Mail, label: "Mensagens", path: "/messages" },
  { icon: User, label: "Perfil", path: "/profile" },
  { icon: MoreHorizontal, label: "Mais", path: "#" },
];

export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    }

    if (showMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMoreMenu]);

  return (
    <div className="sticky top-0 h-screen flex flex-col justify-between p-4">
      <div>
        <div className="inline-block ml-3 rounded-full p-1 hover:bg-gray-200 cursor-pointer transition-colors duration-200 ease-in-out">
          <Link to={"/feed"}>
            <Xlogo />
          </Link>
        </div>
        <nav className="space-y-4 w-full">
          {navItems.map(({ icon: Icon, label, path }) =>
            label === "Mais" ? (
              <div key={label} ref={menuRef} className="relative">
                <button
                  key={label}
                  onClick={() => setShowMoreMenu((prev) => !prev)}
                  className="flex p-2 px-6 cursor-pointer rounded-full hover:bg-gray-200 items-center transition-colors duration-100 ease-in-out space-x-3 font-semibold w-full text-left"
                >
                  <Icon size={30} className="mr-5" /> <span>{label}</span>
                </button>
                {showMoreMenu && (
                  <MoreMenu onClose={() => setShowMoreMenu(false)} />
                )}
              </div>
            ) : (
              <Link
                key={label}
                to={path}
                className="flex p-2 px-6 cursor-pointer rounded-full hover:bg-gray-200 items-center transition-colors duration-100 ease-in-out space-x-3 font-semibold "
              >
                <Icon size={30} className="mr-5" /> <span>{label}</span>
              </Link>
            )
          )}
        </nav>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn w-full mt-3"
        >
          Postar
        </button>
      </div>

      <UserCard />

      {isModalOpen && <ButtonPostModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
