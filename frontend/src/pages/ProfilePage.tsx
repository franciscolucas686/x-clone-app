import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Profile() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <Link to="/feed">
          <div className="m-2 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={40} className="p-2" />
          </div>
        </Link>
        <div className="ml-4">
          <h2 className="text-xl font-bold">Francisco Lucas</h2>
          <p className="text-gray-500 text-sm"><span>0</span> posts</p>
        </div>
      </div>

      <div className="relative">
        <div className="h-40 bg-gray-300" />

        <div className="absolute -bottom-16 left-4">
          <img
            src="https://avatars.githubusercontent.com/u/15079328?v=4"
            alt="Francisco Lucas"
            className="w-32 h-32 rounded-full border-4 border-white"
          />
        </div>
      </div>

      <div className="mt-20 px-4 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">Francisco Lucas</h2>
          <p className="text-gray-500">@Francis59482770</p>
          <p className="text-gray-500 mt-2">Ingressou em maio de 2024</p>

          <div className="flex space-x-4 mt-2">
            <span>
              <strong>4</strong> Seguindo
            </span>
            <span>
              <strong>0</strong> Seguidores
            </span>
          </div>
        </div>

        <button className="px-4 py-2 border border-gray-300 rounded-full font-semibold hover:bg-gray-100 transition">
          Editar perfil
        </button>
      </div>

      <div className="mt-4 border-b border-gray-200 flex text-gray-600 font-semibold">
        <button className="p-3 px-6 hover:bg-gray-100 transition">Posts</button>
      </div>

      <div className="p-4 text-gray-500">Ainda não há posts</div>
    </div>
  );
}
