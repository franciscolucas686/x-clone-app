import { Xlogo } from "../components/icons/Xlogo";

export default function NotificationsPage() {
  return (
    <div className="border-b border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-bold cursor-default">Notificações</h2>
      </div>
      <div className="flex border-y last:border-b-0 border-gray-200 cursor-pointer hover:bg-gray-100 py-2 px-4 ">
        <Xlogo />
        <p className="text-gray-500 px-4">
          Sua conta foi acessada de um novo dispositivo em 08 de out. de 2025.
          Revise esse acesso.
        </p>
      </div>
      <div className="flex border-b last:border-b-0 border-gray-200 cursor-pointer hover:bg-gray-100 py-2 px-4">
        <Xlogo />
        <p className="text-gray-500 px-4">
          Sua conta foi acessada de um novo dispositivo em 08 de out. de 2025.
          Revise esse acesso.
        </p>
      </div>
      <div className="flex border-b last:border-b-0 border-gray-200 cursor-pointer hover:bg-gray-100 py-2 px-4">
        <Xlogo />
        <p className="text-gray-500 px-4">
          Sua conta foi acessada de um novo dispositivo em 08 de out. de 2025.
          Revise esse acesso.
        </p>
      </div>
    </div>
  );
}
