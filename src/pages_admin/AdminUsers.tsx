import React, { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import TaskPagination from "../components/TaskPagination";
import AdminUsersControls from "./AdminUsersControls";
import AdminUserModal from "./AdminUserModel";
import AdminTaskModel from "./AdminTaskModel";
import AdminTopbar from "./AdminTopbar";
import { deleteUser, getUsers } from "../services/UserService";

export type UserStatus = "ACTIVE" | "BLOCKED";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  role: string;
  profession: string;
  address: string;
  failedLoginAttempts: number;
  accountLockedUntil: string;
  firstFailedAttemptAt: string;
  passwordExpiryDate: string;
  lastPasswordWarningSentAt: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPage, setUserPage] = useState(0);
  const [totalUserPages, setTotalUserPages] = useState(0);
  const [sortUserField, setSortUserField] = useState("id");
  const [sortUserDirection, setSortUserDirection] = useState("asc");
  const [userSize, setUserSize] = useState(9);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskUserId, setTaskUserId] = useState<number | null>(null);

  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [admin, setAdmin] = useState<{ name: string } | null>(null);

    // Fetch admin info (dummy example, replace with real API if available)
    useEffect(() => {
      // Example: assuming admin info is stored in localStorage
      const storedAdmin = localStorage.getItem("user");
      if (storedAdmin) {
        setAdmin(JSON.parse(storedAdmin));
      } else {
        setAdmin({ name: "Admin" }); // fallback
      }
    }, []);
  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const res = await getUsers(userPage, userSize, sortUserField, sortUserDirection);
      setUsers(res.data.content);
      setTotalUserPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userPage, userSize, sortUserField, sortUserDirection]);

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowUserModal(true);
  };

  const handleAddTask = (userId: number) => {
    setTaskUserId(userId);
    setShowTaskModal(true);
  };

  const handleUserSearch = (term: string) => setSearchTerm(term);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const getStatus = (user: User): UserStatus =>
    user.accountLockedUntil && new Date(user.accountLockedUntil) > new Date()
      ? "BLOCKED"
      : "ACTIVE";

  const filteredUsers = searchTerm
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  const closeUserModal = () => {
    setShowUserModal(false);
    setEditingUser(null);
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setTaskUserId(null);
  };

  return (
    <>
      <AdminTopbar
        user={admin}
        notificationsCount={5}
        onAddUser={() => setShowAddUserPopup(true)}
        onSearch={handleUserSearch}
        onLogout={handleLogout}
      />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Users</h1>

        <AdminUsersControls
          size={userSize}
          setSize={setUserSize}
          sortField={sortUserField}
          setSortField={setSortUserField}
          sortDirection={sortUserDirection}
          setSortDirection={setSortUserDirection}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`p-4 rounded-lg shadow ${
                getStatus(user) === "ACTIVE" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm">{user.email}</p>
              <p className="text-sm">Role: {user.role}</p>
              <p className="text-sm">Status: {getStatus(user)}</p>
              <p className="text-sm">Address: {user.address || "Not provided"}</p>
              <p className="text-sm">Date of Birth: {user.dateOfBirth || "Not provided"}</p>
              <p className="text-sm">Gender: {user.gender}</p>
              <p className="text-sm">Phone Number: {user.phone || "Not provided"}</p>
              <p className="text-sm">Profession: {user.profession || "Not provided"}</p>
              <p className="text-sm">
                Account Locked Until: {user.accountLockedUntil || "Not locked"}
              </p>

              <div className="flex gap-2 mt-2">
                <button
                  className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                  onClick={() => handleEditUser(user)}
                  title="Edit User"
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                  onClick={() => handleDeleteUser(user.id)}
                  title="Delete User"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                  onClick={() => handleAddTask(user.id)}
                  title="Add Task"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modals */}
        {showUserModal && (
          <AdminUserModal
            onClose={closeUserModal}
            onUserCreated={fetchUsers}
            editingUser={editingUser}
          />
        )}

        {showTaskModal && taskUserId && (
          <AdminTaskModel
            userId={taskUserId}
            onClose={closeTaskModal}
            onTaskCreated={closeTaskModal}
            editingTask={null}
          />
        )}

        {showAddUserPopup && (
          <AdminUserModal
            onClose={() => setShowAddUserPopup(false)}
            onUserCreated={fetchUsers}
            editingUser={null}
          />
        )}

        <TaskPagination page={userPage} setPage={setUserPage} totalPages={totalUserPages} />
      </div>
    </>
  );
};

export default AdminUsers;
