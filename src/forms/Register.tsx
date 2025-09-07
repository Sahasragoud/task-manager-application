import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

// ✅ Shared helper to store user session data

type UserSession = {
  id: number;
  name: string;
  email: string;
  role: string;
  token: string;
};
const saveUserSession = (userData: UserSession) => {
  localStorage.setItem("userId", String(userData.id));
  localStorage.setItem("userName", userData.name);
  localStorage.setItem("userEmail", userData.email);
  localStorage.setItem("userRole", userData.role);
  localStorage.setItem("authToken", userData.token);
  localStorage.setItem("user", JSON.stringify(userData));
};

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dob: "",
    gender: "",
    profession: "",
    address: "",
    role: "user"
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    message: "",
    percent: 0,
    color: "red",
  });
  const [apiError, setApiError] = useState("");

  const evaluatePassword = (password: string) => {
    let strength = 0;
    let message = "";
    let color = "red";

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (/\s/.test(password)) {
      message = "Password should not contain spaces";
      strength = 0;
    } else if (password.length < 8) {
      message = "At least 8 characters";
      strength = 0;
    } else {
      switch (strength) {
        case 1:
        case 2:
          message = "Weak";
          color = "red";
          break;
        case 3:
          message = "Fair";
          color = "orange";
          break;
        case 4:
          message = "Good";
          color = "goldenrod";
          break;
        case 5:
          message = "Strong";
          color = "green";
          break;
      }
    }
    return { message, percent: (strength / 5) * 100, color };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setPasswordStrength(evaluatePassword(value));
    }

    if (name === "password" || name === "confirmPassword") {
      const pwd = name === "password" ? value : formData.password;
      const confirmPwd =
        name === "confirmPassword" ? value : formData.confirmPassword;
      setPasswordError(
        pwd && confirmPwd && pwd !== confirmPwd
          ? "Passwords do not match!"
          : ""
      );
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      dob: "",
      gender: "",
      profession: "",
      address: "",
      role: "user"
    });
    setPasswordError("");
    setPasswordStrength({ message: "", percent: 0, color: "red" });
    setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    setApiError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        formData
      );

      const newUser = response.data;

      // ✅ Save session like login
      saveUserSession(newUser);

      clearForm();
      window.location.href = "/user-dashboard";
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const msg =
          err.response?.status === 400
            ? "Registration failed. Please check your inputs."
            : "Something went wrong. Try again later.";
        setApiError(msg);
      } else {
        setApiError("Unexpected error occurred");
      }
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    !passwordError &&
    passwordStrength.percent >= 50;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Register
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Set Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Strength Meter */}
          {formData.password && (
            <div>
              <small style={{ color: passwordStrength.color }}>
                {passwordStrength.message}
              </small>
              <div className="w-full bg-gray-200 h-1 rounded mt-1">
                <div
                  style={{
                    width: `${passwordStrength.percent}%`,
                    backgroundColor: passwordStrength.color,
                  }}
                  className="h-1 rounded"
                ></div>
              </div>
            </div>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 pr-10 ${
                passwordError && formData.confirmPassword
                  ? "border-red-500"
                  : ""
              }`}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {passwordError && formData.confirmPassword && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="no-share">Don't want to share</option>
          </select>

          <input
            type="text"
            name="profession"
            placeholder="Profession"
            value={formData.profession}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={clearForm}
              className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-4 py-2 rounded-lg text-white ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
