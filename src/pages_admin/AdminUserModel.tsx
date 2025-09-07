// src/components/TaskModal.tsx
import React, { useState, useEffect } from "react";
import type { User } from "./AdminUsers";
import {createUser, updateProfile } from "../services/UserService";

type UserModalProps = {
  onClose: () => void;
  onUserCreated: () => void;
  editingUser?: User | null;   // ✅ add this line
};

export type UserFormData = {
     name : string;
     email : string;
     password ?: string;
     phone : string;
     dateOfBirth : string;
     gender: string;
     role: string;
     profession: string;
     address: string;
}

const AdminUserModal: React.FC<UserModalProps> = ({ onClose, onUserCreated, editingUser }) => {
  const [formData, setFormData] = useState<UserFormData>({
     name : "",
     email : "",
     password : "",
     phone : "",
     dateOfBirth : "",
     gender: "",
     role: "",
     profession: "",
     address: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");


  // ✅ preload form when editing
  useEffect(() => {
    if (editingUser) {
      setFormData({
        name : editingUser.name,
        email : editingUser.email,
        phone : editingUser.phone,
        dateOfBirth : editingUser.dateOfBirth,
        gender: editingUser.gender,
        role: editingUser.role,
        profession: editingUser.profession,
        address: editingUser.address,
      });
    }
  }, [editingUser]);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (!editingUser && (name === "password" || name === "confirmPassword")) {
      const pwd = name === "password" ? value : formData.password!;
      const confirm = name === "confirmPassword" ? value : confirmPassword;
      setPasswordError(pwd && confirm && pwd !== confirm ? "Passwords do not match!" : "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingUser && formData.password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    try {
      if (editingUser && editingUser.id) {
        // Update existing user (no password change here)
        await updateProfile(editingUser.id, formData);
      } else {
        // Create new user
        await createUser(formData);
      }
      onUserCreated();
      onClose();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">User</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border rounded"
            />
           </div> 
           {!editingUser && (
            <>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full border rounded px-3 py-2" required />
              <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full border rounded px-3 py-2" required />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </>
           )}
            <div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="no-share">Don't want to share</option>
                </select>
              </div>
              <div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border rounded"
                >
                  <option value="">Select Role</option>
                  <option value="male">user</option>
                  <option value="female">admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Profession</label>
                <input
                  type="text"
                  name="profession"
                  placeholder="Profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border rounded" />
              </div><div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border rounded" />
              </div><div>
                <label className="block text-sm font-medium">Date Of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full p-2 border rounded" />
              </div><div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingUser ? "Update" : "Save"}
                </button>
              </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUserModal;
