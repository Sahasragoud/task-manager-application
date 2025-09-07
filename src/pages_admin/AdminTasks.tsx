import React, { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2 } from "lucide-react";
import TaskPagination from "../components/TaskPagination";
import { deleteTask, getAllTasks } from "../services/TaskService";
import AdminTaskModel from "./AdminTaskModel";
import AdminTopbar from "./AdminTopbar";

export type TaskStatus = "Pending" | "In Progress" | "Completed";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  userId: number;
  userName: string;
}

const AdminTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskPage, setTaskPage] = useState(0);
  const [taskSize] = useState(5);
  const [totalTaskPages, setTotalTaskPages] = useState(0);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch tasks from API
  const fetchTasks = useCallback(async () => {
    try {
      const res = await getAllTasks(taskPage, taskSize, "id", "asc");
      setTasks(res.data.content);
      setTotalTaskPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  }, [taskPage, taskSize]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Delete task
  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  // Open edit modal
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  // Search tasks locally
  const handleSearch = (term: string) => setSearchTerm(term);

  const filteredTasks = searchTerm
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tasks;

  return (
    <>
      <AdminTopbar notificationsCount={3} onSearch={handleSearch} />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Tasks</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">User Id</th>
                <th className="p-2 border">User Name</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Due Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="text-center">
                  <td className="p-2 border">{task.id}</td>
                  <td className="p-2 border">{task.title}</td>
                  <td className="p-2 border">{task.description}</td>
                  <td className="p-2 border">{task.userId}</td>
                  <td className="p-2 border">{task.userName}</td>
                  <td className="p-2 border">{task.status}</td>
                  <td className="p-2 border">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                      onClick={() => handleEditTask(task)}
                      title="Edit Task"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                      onClick={() => handleDeleteTask(task.id)}
                      title="Delete Task"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && editingTask && (
          <AdminTaskModel
            userId={editingTask.userId}
            editingTask={editingTask}
            onClose={() => {
              setShowModal(false);
              setEditingTask(null);
            }}
            onTaskCreated={fetchTasks}
          />
        )}

        <TaskPagination
          page={taskPage}
          setPage={setTaskPage}
          totalPages={totalTaskPages}
        />
      </div>
    </>
  );
};

export default AdminTasks;
