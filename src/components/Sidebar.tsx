import React from "react";
import { Home, User, Grid, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate("/login"); // redirect to login page
  };

  return (
    <aside className="flex flex-col justify-between bg-gray-100 w-64 h-screen shadow-md">
      {/* Top menu */}
      <div className="flex flex-col p-4 gap-6">
        <Link
          to="/user-dashboard"
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded"
        >
          <Grid size={20} /> <span className="font-medium text-gray-700">Dashboard</span>
        </Link>

        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded"
        >
          <Home size={20} /> <span className="font-medium text-gray-700">Home</span>
        </Link>

        <Link
          to="/user-profile"
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded"
        >
          <User size={20} /> <span className="font-medium text-gray-700">Profile</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded"
        >
        </Link>
      </div>

      {/* Logout at bottom */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full justify-center"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
