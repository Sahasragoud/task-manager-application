// src/pages/Profile.tsx
import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, UserCircle, Calendar, Briefcase } from "lucide-react";
import type { User } from "../types/user";
import { getUser, updateProfile } from "../services/UserService";
import type { updateUserPayload } from "../types/UpdateUserPayload";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Partial<User>>({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const parsedUser = JSON.parse(storedUser);
        const response = await getUser(parsedUser.id);
        setUser(response.data);
        setForm(response.data); // preload form with existing data
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setForm(user || {}); // reset edits
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      // ✅ explicitly match updateUserPayload
      const payload: Partial<updateUserPayload> = {
        name: form.name ? String(form.name) : undefined,
        email: form.email ? String(form.email) : undefined,
        phone: form.phone ? String(form.phone) : undefined,
        gender: form.gender ? String(form.gender) : undefined,
        dob: form.dob ? String(form.dob) : undefined,
        address: form.address ? String(form.address) : undefined,
        profession: form.profession ? String(form.profession) : undefined,
    };

      const updated = await updateProfile(user.id!, payload);
      setUser(updated.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) {
    return <div className="text-center mt-10 text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="absolute -bottom-16 left-10 flex items-center gap-6">
            <img
              src={
                user.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name || "User"
                )}&background=random`
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="text-black drop-shadow">
              <h2 className="text-3xl font-bold">{user.name}</h2>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mt-20 px-10 py-8 space-y-8">
          {!isEditing ? (
            <>
              {/* Info fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileField icon={<Mail size={20} />} label="Email" value={user.email} />
                <ProfileField icon={<Phone size={20} />} label="Phone" value={user.phone || "Not provided"} />
                <ProfileField icon={<UserCircle size={20} />} label="Gender" value={user.gender || "Not provided"} />
                <ProfileField icon={<Calendar size={20} />} label="Date of Birth" value={user.dob || "Not provided"} />
                <ProfileField icon={<MapPin size={20} />} label="Address" value={user.address || "Not provided"} />
                <ProfileField icon={<Briefcase size={20} />} label="Profession" value={user.profession || "Not provided"} />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <button 
                  onClick={handleEdit}
                  className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition shadow"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition shadow"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Editable form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Name" name="name" value={String(form.name ?? "")} onChange={handleChange} />
                <InputField label="Email" name="email" value={String(form.email ?? "")} onChange={handleChange} />
                <InputField label="Phone" name="phone" value={String(form.phone ?? "")} onChange={handleChange} />
                <InputField label="Gender" name="gender" value={String(form.gender ?? "")} onChange={handleChange} />
                <InputField label="DOB" name="dob" value={String(form.dob ?? "")} onChange={handleChange} />
                <InputField label="Address" name="address" value={String(form.address ?? "")} onChange={handleChange} />
                <InputField label="Profession" name="profession" value={String(form.profession ?? "")} onChange={handleChange} />
              </div>

              {/* Save / Cancel */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <button 
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition shadow"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 bg-gray-300 text-gray-800 font-medium rounded-xl hover:bg-gray-400 transition shadow"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// 🔹 Reusable view field
const ProfileField: React.FC<{ icon: React.ReactNode; label: string; value: React.ReactNode }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition">
    <span className="text-indigo-600">{icon}</span>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-base font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

// 🔹 Strict input field (string only)
const InputField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, name, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-500 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
    />
  </div>
);

export default UserProfile;
