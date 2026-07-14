import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 px-8 py-4 flex items-center justify-between">

      <div>
        <h1 className="text-2xl font-bold text-blue-500">
          AI Interview Coach
        </h1>
      </div>

      <div className="flex items-center gap-4">

        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div className="hidden md:block">
          <p className="text-white font-semibold">
            {user?.name}
          </p>

          <p className="text-sm text-gray-400">
            {user?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition"
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default DashboardNavbar;