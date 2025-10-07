import { Bell, Home, Mail, MoreHorizontal, Search, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Xlogo } from "../icons/Xlogo";
import ButtonPostModal from "./ButtonPostModal";
import UserCard from "./UserCard";
const navItems = [
  { icon: Home, label: "Página inicial", path: "/feed" },
  { icon: Search, label: "Explorar", path: "#" },
  { icon: Bell, label: "Notificações", path: "#" },
  { icon: Mail, label: "Mensagens", path: "#" },
  { icon: User, label: "Perfil", path: "/profile" },
  { icon: MoreHorizontal, label: "Mais", path: "#" },
];

export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="sticky top-0 h-screen flex flex-col justify-between p-4">
      <div>
        <div className="inline-block ml-3 rounded-full p-1 hover:bg-gray-200 cursor-pointer transition-colors duration-200 ease-in-out">
          <Link to={"/feed"}>
            <Xlogo />
          </Link>
        </div>
        <nav className="space-y-4 w-full">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={label}
              to={path}
              className="flex p-2 px-6 cursor-pointer rounded-full hover:bg-gray-200 items-center transition-colors duration-100 ease-in-out space-x-3 font-semibold "
            >
              <Icon size={30} className="mr-5" /> <span>{label}</span>
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn w-full mt-3"
        >
          Postar
        </button>
      </div>

      <UserCard
        name="Francisco Lucas"
        username="@francisco"
        avatarUrl="https://avatars.githubusercontent.com/u/15079328?v=4"
      />

      {isModalOpen && <ButtonPostModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
