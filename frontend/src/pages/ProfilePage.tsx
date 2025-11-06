import { ArrowLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { openModal } from "../features/modal/modalSlice";
import { Link } from "react-router-dom";
import { ModalRoot } from "../components/modal/ModalRoot";
import { formatJoinedDate } from "../utils/date";

export default function Profile() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <Link to="/feed">
          <div className="m-2 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={40} className="p-2" />
          </div>
        </Link>
        <div className="ml-4">
          <h2 className="text-xl font-bold cursor-default">{user.name}</h2>
          <p className="text-gray-500 text-sm cursor-default">
            <span>0</span> posts
          </p>
        </div>
      </div>

      <div>
        <div className="h-40 bg-gray-300" />
        <div className="flex items-end px-4 -mt-16">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 object-cover rounded-full border-4 border-white"
          />
        </div>
      </div>

      <div className="mt-6 px-4 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold cursor-default">{user.name}</h2>
          <p className="text-gray-500 cursor-default">@{user.username}</p>
          <p className="text-gray-500 mt-2 cursor-default">Ingressou em {user.joined_display ? formatJoinedDate(user.joined_display) : ""}</p>

          <div className="flex space-x-4 mt-2">
            <span className="cursor-default">
              <strong>4</strong> Seguindo
            </span>
            <span className="cursor-default">
              <strong>0</strong> Seguidores
            </span>
          </div>
        </div>

        <button
          onClick={() => dispatch(openModal("editProfile"))}
          className="px-4 py-2 border border-gray-300 rounded-full font-semibold hover:bg-gray-100 transition cursor-pointer"
        >
          Editar perfil
        </button>
      </div>

      <div className="mt-4 border-b border-gray-200 flex text-gray-600 font-semibold">
        <button className="p-3 px-6 hover:bg-gray-100 transition cursor-pointer">
          Posts
        </button>
      </div>

      <div className="p-4 text-gray-500">Ainda não há posts</div>

      <ModalRoot />
    </div>
  );
}