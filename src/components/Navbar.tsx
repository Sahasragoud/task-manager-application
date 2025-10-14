import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginPopup from "../forms/Login";
import type { User } from "../types/user";

type NavLink = {
  name: string;
  href: string;
};

const publicNavlinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Features", href: "/features" },
  { name: "Contact Us", href: "/contact-us" },
];

const loggedInUserNavlinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Contact Us", href: "/contact-us" },
];

const loggedInAdminNavlinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Users", href: "/admin-dashboard/users" },
  { name: "Tasks", href: "/admin-dashboard/tasks" },
  { name: "Reports", href: "/admin-dashboard/reports" },
  { name: "Dashboard", href: "/admin-dashboard" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // Safer admin check
  const isAdmin = user?.role?.toUpperCase().includes("ADMIN");

  const linksToRender = user
    ? isAdmin
      ? loggedInAdminNavlinks
      : loggedInUserNavlinks
    : publicNavlinks;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-blue-600 p-4 text-white shadow-md z-50">
        <div className="max-w-7xl flex justify-between items-center mx-auto">
          <div className="text-xl font-bold mr-6">Task Manager</div>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-6">
            {linksToRender.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Right Side: Profile / Auth Buttons */}
          <div className="hidden md:flex gap-4 items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold"
                >
                  {user.name[0]}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                    <div className="p-3 border-b">
                      <p className="font-bold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <Link
                        to="/user-profile"
                        className="text-blue-600 hover:text-pink-500 transition-colors duration-200 block mt-2"
                      >
                        My Profile
                      </Link>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200 transition"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-blue-600 text-white flex flex-col items-center z-40 gap-2 p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
            >
              X
            </button>

            {linksToRender.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-white hover:text-gray-300 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <>
                <Link
                  to="/user-profile"
                  className="block text-white hover:text-gray-300 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-red-200 hover:text-red-400"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(loggedUser: User) => {
          setUser(loggedUser);
          setIsLoginOpen(false);
        }}
      />
    </>
  );
};

export default Navbar;
