import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import TaskTable from "../components/TaskTable";
import TaskModal from "../components/TaskModal";
import Topbar from "../components/Topbar";
import type { User } from "../types/user";
import type { Task } from "../types/task";
import { getUser } from "../services/UserService";
import { getTasks, deleteTask } from "../services/TaskService";
import TaskControls from "../components/TaskControls";
import TaskPagination from "../components/TaskPagination";
import DashboardCounters from "../components/DashboardCounters";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<number|null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null); 
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);

  // ✅ Memoize fetchTasks so useEffect doesn't complain
  const fetchTasks = useCallback(async () => {
    if (!userId) return;

    try {
      const res = await getTasks(userId, page, size, sortField, sortDirection);
      setTasks(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  }, [userId, page, size, sortField, sortDirection]);

  // Fetch user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      getUser(parsedUser.id).then(res => setUser(res.data));
      setUserId(parsedUser.id);
    }
  }, []);

  // Fetch tasks whenever params change
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  // Search
  const handleSearch = (term: string) => setSearchTerm(term);

  // Client-side filter (only search)
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete task
  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      fetchTasks(); // refresh after delete
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  // Edit
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  return (
<div className="flex min-h-full">
  {/* Sidebar */}
  <div className="flex-shrink-0">
    <Sidebar />
  </div>

  {/* Main Content */}
  <div className="flex-1 flex flex-col">
    {/* Topbar */}
    {user && (
      <div className="flex-shrink-0">
        <Topbar
          user={user}
          notificationsCount={3}
          onLogout={handleLogout}
          onAddTask={() => setShowModal(true)}
          onSearch={handleSearch}
        />
      </div>
    )}

    {/* Scrollable content */}
    <div className="flex-1 overflow-auto p-4 bg-gray-50">
      {/* Controls */}
      <DashboardCounters 
        total={tasks.length} 
        inProgress={tasks.filter(t => t.status === "In Progress").length} 
        completed={tasks.filter(t => t.status === "Completed").length} 
        pending={tasks.filter(t => t.status === "Pending").length} 
      />

      <TaskControls
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        size={size}
        setSize={setSize}
      />

      {/* Task Table */}
      <div className="mt-4">
        <TaskTable
          tasks={filteredTasks}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <TaskPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  </div>

  {/* Modal */}
  {showModal && (
    <TaskModal
      userId={userId!}
      onClose={() => {
        setShowModal(false);
        setEditingTask(null);
      }}
      onTaskCreated={fetchTasks}
      editingTask={editingTask}
    />
  )}
</div>
  );
};

export default Dashboard;
