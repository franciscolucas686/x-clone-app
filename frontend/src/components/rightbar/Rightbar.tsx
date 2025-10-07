import { MoreHorizontal } from "lucide-react";

export default function Rightbar() {
  return (
    <div className="space-y-4">
      <div className="border border-gray-200 rounded-lg p-4">
        <h2 className="font-bold text-lg mb-2">Assine o Premium</h2>
        <p className="text-sm text-gray-600 mb-3">
          Assine para desbloquear novos recursos e, se elegível, receba uma
          parte da receita.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors duration-200 ease-in-out cursor-pointer rounded-full px-4 py-2">
          Assinar
        </button>
      </div>

      <div className="border border-gray-200 rounded-lg">
        <h2 className="font-bold text-2xl p-4">O que está acontecendo</h2>
        <ul className=" text-sm">
          <li className="flex justify-between items-center hover:bg-gray-100 p-4 transition-colors duration-200 ease-in-out cursor-pointer">
            <div>
              <span className="text-gray-500">Assunto do momento no Brasil</span>
              <p className="font-bold text-lg">Renato</p>
              <p className="text-gray-500">3.667 posts</p>
            </div>
            <MoreHorizontal />
          </li>
          <li className="flex justify-between items-center hover:bg-gray-100 p-4 transition-colors duration-200 ease-in-out cursor-pointer">
            <div>
              <span className="text-gray-500">Esportes · Assunto do momento</span>
              <p className="font-bold text-lg">Casares</p>
              <p className="text-gray-500">486 mil posts</p>
            </div>
            <MoreHorizontal />
          </li>
          <li className="flex justify-between items-center hover:bg-gray-100 p-4 transition-colors duration-200 ease-in-out cursor-pointer">
            <div>
              <span className="text-gray-500">Assunto do momento no Brasil</span>
              <p className="font-bold text-lg">Sobral</p>
              <p className="text-gray-500">4.333 posts</p>
            </div>
            <MoreHorizontal />
          </li>
        </ul>
      </div>
    </div>
  );
}
