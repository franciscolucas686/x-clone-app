import { Outlet } from "react-router-dom";
import Rightbar from "../components/rightbar/Rightbar";
import Sidebar from "../components/sidebar/Sidebar";

export default function UserPage() {
  return (
    <div className="h-screen w-screen flex justify-center overflow-x-hidden">
      <div className="flex w-full max-w-7xl">
        <aside className="flex-[0.25] min-w-[250px]">
          <Sidebar />
        </aside>
        <main className="flex-[0.4] min-w-[600px] overflow-y-auto border-x border-gray-200">
          <Outlet />
        </main>
        <aside className="flex-[0.35] min-w-[350px] p-4">
          <Rightbar />
        </aside>
      </div>
    </div>
  );
}
