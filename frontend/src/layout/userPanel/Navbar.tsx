

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b border-purple-100 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      
        <Link
          to="/"
          className="text-xl font-bold text-purple-700"
        >
          BlogManage
        </Link>

   
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="font-bold text-slate-700 transition hover:text-purple-800"
          >
            Home
          </Link>
        </div>

    
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg border border-purple-700 px-4 py-2 font-medium text-purple-700 transition hover:bg-purple-50"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-purple-700 px-4 py-2 font-medium text-white transition hover:bg-purple-800"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
