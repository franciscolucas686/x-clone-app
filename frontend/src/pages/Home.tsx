import { useDispatch } from "react-redux";
import { ModalRoot } from "../components/modal/ModalRoot";
import { openModal } from "../features/modal/modalSlice";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <div className="flex min-w-screen">
      <div className="col-left">
        <img src="/x_logo_grande.jpg" alt="Logo X" className="w-110 h-64" />
      </div>

      <div className="col-right">
        <h1 className="text-6xl font-bold py-[3rem] cursor-default">
          Acontecendo agora
        </h1>

        <div className="flex flex-col w-64 bg-white py-12">
          <h2 className="text-3xl font-bold mb-8 cursor-default">
            Inscreva-se hoje
          </h2>

          <div className="flex flex-col">
            <button
              className="btn"
              onClick={() => dispatch(openModal("register"))}
            >
              Criar conta
            </button>

            <div className="flex items-center w-64 my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-2 text-gray-500">ou</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <button
              className="btn"
              onClick={() => dispatch(openModal("login"))}
            >
              Entrar
            </button>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full text-center text-gray-400 text-xs">
        Todos direitos reservados © Francisco Lucas 2025
      </footer>
      <ModalRoot />
    </div>
  );
}
