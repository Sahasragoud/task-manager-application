import React, { useState } from "react";
import { Bell, Plus, Search, LogOut, UserCircle } from "lucide-react";
type HeaderProps = {
  user ?: {name : string} | null;
  notificationsCount: number;
  onAddUser?: () => void;   // 👈 optional
  onSearch: (searchTerm: string) => void;
  onLogout?: () => void;
};

const AdminTopbar: React.FC<HeaderProps> = ({
  user,
  notificationsCount,
  onAddUser,
  onSearch,
  onLogout,

}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <header className="bg-white text-black flex justify-between items-center p-4 px-6 py-3 shadow-sm z-50">
      <div className="text-lg font-semibold text-gray-800">
        Dashboard – <span className="text-blue-600">{user?.name}</span>
      </div>

      {/* 🔍 Search */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-3 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm text-gray-700"
        />
      </div>

      {/* 🔔 Notifications, Conditional Add Button, Profile */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition" />
          {notificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[10px] px-1.5 py-0.5 font-bold shadow">
              {notificationsCount}
            </span>
          )}
        </div>

        {/* Show ➕ button ONLY if onAddUser exists */}
        {onAddUser && (
          <button
            onClick={onAddUser}
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            <Plus size={16} /> New User
          </button>
        )}

        {/* 👤 Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          >
            <UserCircle size={20} className="text-gray-700" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-1">
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
