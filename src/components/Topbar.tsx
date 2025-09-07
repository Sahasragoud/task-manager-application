import React, { useState } from "react";
import type { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut, Plus, Search } from "lucide-react";

type HeaderProps = {
  user: User;
  notificationsCount: number;
  onLogout: () => void;
  onAddTask: () => void;
  onSearch: (searchTerm: string) => void;
};

const Topbar: React.FC<HeaderProps> = ({ user, notificationsCount, onLogout, onAddTask, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    onLogout();
  };

  return (
    <header className="bg-white text-Black flex justify-between items-center p-4 px-6 py-3 z-50">
      <div className="text-lg font-semibold text-gray-800">Dashboard -  <span className="text-blue-600">{user.name}</span></div>

       <div className="relative w-72">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-3 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm text-gray-700"
        />
      </div>
      
        <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition" />
          {notificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[10px] px-1.5 py-0.5 font-bold shadow">
              {notificationsCount}
            </span>
          )}
        </div>

          <button
          onClick={onAddTask}
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          <Plus size={16} /> New Task
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
