import { MessageCircle } from "lucide-react";
import MessageModal from "../components/message/MessageModal";
import { useState } from "react";

export default function MessagePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="p-4">
        <h2 className="text-xl font-bold cursor-default">Mensagens</h2>
      </div>
      <div className="flex items-center hover:bg-gray-100 cursor-pointer">
        <MessageCircle size={75} className="p-6"/>
        <p className=" font-bold ">Bate-papo</p>
      </div>
      <div className="p-6 space-y-6">
        <h3 className="text-5xl font-bold cursor-default">Receba as boas-vindas à sua caixa de entrada!</h3>
        <p className=" text-xl text-gray-500 cursor-default">Escreva, compartilhe posts e muito mais com conversas privadas entre voce e outras pessoas no X.</p>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold transition-colors duration-200 ease-in-out cursor-pointer rounded-full px-6 py-2">Escrever uma mensagem</button>
      </div>
      { isModalOpen && <MessageModal onClose={() => setIsModalOpen(false)} /> }
    </div>
  );
}
