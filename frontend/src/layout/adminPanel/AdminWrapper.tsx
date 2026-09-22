import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminWrapper = () => {
  return (
    <div className="min-h-screen bg-slate-400">
      <aside
        className="
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-64
          bg-slate-800
          text-white
          font-mono
          md:w-64
          lg:w-72
          xl:w-80
        "
      >
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div
        className="
          min-h-screen
          ml-64
          md:ml-64
          lg:ml-72
          xl:ml-80
          flex
          flex-col
        "
      >
        <header className="sticky top-0 z-40 bg-slate-700 p-7 text-white font-mono">
          <Navbar />
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-400 p-7 font-mono">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminWrapper;
