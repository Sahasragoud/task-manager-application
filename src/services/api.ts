import axios from "axios";

// ✅ Create axios instance
const API = axios.create({
  baseURL: "http://192.168.117.4:8080/api/",
});

// ✅ Attach token to every request automatically
API.interceptors.request.use((config) => {
  // Try to get token from both "user" or "token" keys
  let token = null;

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      token = parsedUser.token || localStorage.getItem("token");
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
    }
  } else {
    token = localStorage.getItem("token");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("⚠️ No token found. Request may be rejected (403).");
  }

  return config;
});

// ✅ Handle expired/invalid token globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn("401 Unauthorized → Showing login modal");
        localStorage.removeItem("user");
        window.showLoginModal?.(); // Only show for 401
      } else if (status === 403) {
        console.warn("403 Forbidden → User logged in but lacks access");
        // Don't remove user or show login modal
      }
    }
    return Promise.reject(error);
  }
);

export default API;
