import React from "react";
import { Home, User, Grid, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../forms/AuthContext"; // ✅ use context

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ context

  const handleLogout = () => {
    logout(); // updates context globally
    navigate("/"); 
  };

  return (
    <aside className="flex flex-col justify-between bg-gray-100 w-64 h-screen shadow-md">
      <div className="flex flex-col p-4 gap-6">
        <Link to="/user-dashboard" className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
          <Grid size={20} /> <span className="font-medium text-gray-700">Dashboard</span>
        </Link>

        <Link to="/" className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
          <Home size={20} /> <span className="font-medium text-gray-700">Home</span>
        </Link>

        <Link to="/user-profile" className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
          <User size={20} /> <span className="font-medium text-gray-700">Profile</span>
        </Link>
      </div>

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
