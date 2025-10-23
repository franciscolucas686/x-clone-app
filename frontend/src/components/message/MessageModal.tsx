import ModalLayout from "../../layouts/ModalLayout";
import { useState } from "react";
import { Users, Search } from "lucide-react"

interface MessageModalProps {
  onClose: () => void;
}

export default function MessageModal({ onClose }: MessageModalProps) {
  const [search, setSearch] = useState("");

  return (
    <ModalLayout onClose={onClose} className="max-w-[600px] h-[80vh] max-h-[700px]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h3 className="text-lg font-semibold text-gray-800 ml-10 cursor-default">Nova mensagem</h3>
          <button
            type="button"
            className="text-blue-500 font-semibold hover:bg-blue-100 transition rounded-full px-4 py-1 cursor-pointer"
          >
            Próxima
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar pessoas"
            className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:ring focus:ring-blue-200 outline-none"
          />
          <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="hover:bg-blue-100 transition px-4 py-2 rounded-full cursor-pointer">
            <Users size={20} className="inline-block mr-2 text-blue-500 cursor-pointer" />
            <button className="text-blue-500 text-sm font-semibold cursor-pointer">
              Criar grupo
            </button>
          </div>
        </div>

        {search && (
          <div className="mt-2 max-h-48 overflow-y-auto border-t border-gray-100 pt-2">
            <p className="text-gray-500 text-sm cursor-default">Nenhum resultado encontrado.</p>
          </div>
        )}
      </div>
    </ModalLayout>
  );
}
