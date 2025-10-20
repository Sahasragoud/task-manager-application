import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import publicAPI from "../services/publiApi";

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- States ---
  const [token, setToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState<{ username: string; email: string }>({
    username: "",
    email: "",
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);

  // --- Extract token from URL ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      verifyToken(tokenParam);
    } else {
      console.log("Invalid or missing token");
      setError("Invalid or missing token");
      setLoading(false);
    }
  }, [location.search]);

  // --- Verify token with backend ---
  const verifyToken = async (token: string) => {
    try {
      const response = await publicAPI.get(`/users/verify-reset-token?token=${token}`);
      setIsValidToken(true);
      setUserInfo(response.data); // backend returns { username, email }
    } catch (err) {
      setError("Reset link is invalid or expired");
    } finally {
      setLoading(false);
    }
  };

  // --- Handle Password Reset Submission ---
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await publicAPI.post("/users/reset-password", {
        token,
        newPassword: password,
      });

      alert("✅ Password reset successful!");
      navigate("/");
    } catch (err) {
      setError("Failed to reset password. Please try again!");
    }
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-600 text-lg font-medium">Verifying reset link...</p>
      </div>
    );
  }

  // --- Invalid Token Case ---
  if (!isValidToken) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <p className="text-red-500 font-semibold text-lg">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // --- Main UI ---
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">
          Reset Your Password
        </h1>

        {/* --- User Info Display --- */}
        <div className="text-center mb-6 border-b pb-3">
          <p className="text-lg font-semibold text-gray-800">{userInfo.username}</p>
          <p className="text-gray-500">{userInfo.email}</p>
        </div>

        {/* --- Password Form --- */}
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
