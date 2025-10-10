import {
  Bookmark,
  CreditCard,
  Globe,
  MessageCircle,
  Users,
  DollarSign,
  Megaphone,
  Settings,
} from "lucide-react";

type MoreMenuProps = {
  onClose: () => void;
};

export default function MoreMenu({ onClose }: MoreMenuProps) {
  return (
    <div className="fixed left-15 bottom-42 bg-white shadow-lg rounded-2xl w-72 py-2 z-99999 border border-gray-200">
      <ul className="flex flex-col text-[15px] font-semibold">
        <li className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 cursor-pointer">
          <div className="flex items-center gap-3">
            <MessageCircle size={22} />
            <span>Bate-papo</span>
          </div>
          <span className="text-xs bg-gray-200 px-2 py-[1px] rounded-full font-bold text-gray-600">
            Beta
          </span>
        </li>

        <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
          <Globe size={22} />
          <span>Listas</span>
        </li>

        <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
          <CreditCard size={22} />
          <span>Premium</span>
        </li>

        <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
          <Bookmark size={22} />
          <span>Itens salvos</span>
        </li>

        <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
          <Users size={22} />
          <span>Comunidades</span>
        </li>

        <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
          <DollarSign size={22} />
          <span>Monetização</span>
        </li>

        <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
          <Megaphone size={22} />
          <span>Ads</span>
        </li>

        <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
          <Users size={22} />
          <span>Crie seu Espaço</span>
        </li>

        <li
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer rounded-b-2xl"
        >
          <Settings size={22} />
          <span>Configurações e privacidade</span>
        </li>
      </ul>
    </div>
  );
}
