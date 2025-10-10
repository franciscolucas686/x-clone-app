import { MoreHorizontal, X } from "lucide-react";
import { useState } from "react";

function PremiumPage({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-blue-50 to-white overflow-y-auto flex flex-col items-center">
      {/* Botão X */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition cursor-pointer"
      >
        <X size={24} />
      </button>

      {/* Cabeçalho */}
      <div className="pt-20 pb-10 text-center px-4">
        <h1 className="text-4xl font-extrabold mb-4">Upgrade para Premium</h1>
        <p className="text-gray-600 text-lg">
          Escolha o plano ideal para desbloquear todos os recursos.
        </p>
      </div>

      {/* Grid responsiva de cards */}
      <div className="flex flex-wrap justify-center gap-6 max-w-7xl px-4 mb-10">
        {/* Card: Básico */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:border-blue-500 transition w-full sm:w-[48%] lg:w-[30%] min-w-[320px] max-w-[450px] flex flex-col  cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Básico</h2>
          <p className="text-3xl font-bold mb-2">R$ 9,00</p>
          <p className="text-sm text-gray-500 mb-4">por mês</p>
          <ul className="text-gray-600 text-sm space-y-1 mb-6">
            <li>✔ Priorização básica</li>
            <li>✔ Itens salvos</li>
            <li>✔ Aba de Destaques</li>
          </ul>
          <button className=" mt-auto w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition cursor-pointer">
            Escolher plano
          </button>
        </div>

        {/* Card: Premium */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:border-blue-500 transition w-full sm:w-[48%] lg:w-[30%] min-w-[320px] max-w-[450px]  cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Premium</h2>
          <p className="text-3xl font-bold mb-2">R$ 23,00</p>
          <p className="text-sm text-gray-500 mb-4">por mês</p>
          <ul className="text-gray-600 text-sm space-y-1 mb-6">
            <li>✔ Tudo do Básico</li>
            <li>✔ Menos anúncios</li>
            <li>✔ Selo azul</li>
            <li>✔ Receba por post</li>
          </ul>
          <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition cursor-pointer">
            Escolher plano
          </button>
        </div>

        {/* Card: Premium+ */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:border-blue-500 transition w-full sm:w-[48%] lg:w-[30%] min-w-[320px] max-w-[450px] cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Premium+</h2>
          <p className="text-3xl font-bold mb-2">R$ 140,00</p>
          <p className="text-sm text-gray-500 mb-4">por mês</p>
          <ul className="text-gray-600 text-sm space-y-1 mb-6">
            <li>✔ Sem anúncios</li>
            <li>✔ Priorização máxima</li>
            <li>✔ Escreva artigos</li>
            <li>✔ Radar e SuperGrok</li>
          </ul>
          <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition cursor-pointer">
            Escolher plano
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Rightbar() {
  const [showPremium, setShowPremium] = useState(false);

  return (
    <div className="space-y-4">
      <div className="border border-gray-200 rounded-lg p-4">
        <h2 className="font-bold text-lg mb-2">Assine o Premium</h2>
        <p className="text-sm text-gray-600 mb-3">
          Assine para desbloquear novos recursos e, se elegível, receba uma
          parte da receita.
        </p>
        <button
          onClick={() => setShowPremium(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors duration-200 ease-in-out cursor-pointer rounded-full px-4 py-2"
        >
          Assinar
        </button>
      </div>

      <div className="border border-gray-200 rounded-lg">
        <h2 className="font-bold text-2xl p-4">O que está acontecendo</h2>
        <ul className="text-sm">
          <li className="flex justify-between items-center hover:bg-gray-100 p-4 transition-colors duration-200 ease-in-out cursor-pointer">
            <div>
              <span className="text-gray-500">
                Assunto do momento no Brasil
              </span>
              <p className="font-bold text-lg">Renato</p>
              <p className="text-gray-500">3.667 posts</p>
            </div>
            <MoreHorizontal />
          </li>
          <li className="flex justify-between items-center hover:bg-gray-100 p-4 transition-colors duration-200 ease-in-out cursor-pointer">
            <div>
              <span className="text-gray-500">
                Esportes · Assunto do momento
              </span>
              <p className="font-bold text-lg">Casares</p>
              <p className="text-gray-500">486 mil posts</p>
            </div>
            <MoreHorizontal />
          </li>
          <li className="flex justify-between items-center hover:bg-gray-100 p-4 transition-colors duration-200 ease-in-out cursor-pointer">
            <div>
              <span className="text-gray-500">
                Assunto do momento no Brasil
              </span>
              <p className="font-bold text-lg">Sobral</p>
              <p className="text-gray-500">4.333 posts</p>
            </div>
            <MoreHorizontal />
          </li>
        </ul>
      </div>

      {showPremium && <PremiumPage onClose={() => setShowPremium(false)} />}
    </div>
  );
}
