import React, { useState } from "react";
import axios from "axios";
import type { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/UserService";

type LoginPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (loggedUser: User) => void;
};

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (!email.trim()) {
    setError("Email or Username is required.");
    return;
  }

  // Only validate email format if it contains "@"
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.includes("@") && !emailPattern.test(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (!password.trim()) {
    setError("Password is required.");
    return;
  }
  if (password.length < 6) {
    setError("Password must be at least 6 characters long.");
    return;
  }

  try {
    const payload = {
      email, // backend accepts this for both email & username
      password
    };

    const response = await loginUser(payload.email,payload.password);

    if (response.data && response.data.id) {
      localStorage.setItem("user", JSON.stringify(response.data));
      onLoginSuccess(response.data);
      if(response.data.role == "USER"){
        navigate("/user-dashboard");
      }
      else{
        navigate("/admin-dashboard");
      }
      onClose();
    } else {
      setError("Login successful, but user data is incomplete.");
    }

    localStorage.setItem("token", response.data.token);
  }  catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      // backend already returns { timestamp, status, message }
      const errorMessage =
        (err.response.data)?.message || "Something went wrong.";
      setError(errorMessage); // always show the backend's message
    } else {
      setError("Something went wrong. Please try again later.");
    }
  }

};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[60]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Login
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          New here?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
