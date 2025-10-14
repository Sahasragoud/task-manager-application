import type { Task } from "../types/task";
import React from "react";
import { Pencil, Trash2 } from "lucide-react";

type TaskTableProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
};

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse rounded-xl shadow-lg bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left text-sm uppercase tracking-wide">
            <th className="p-3 border-b">Title</th>
            <th className="p-3 border-b">Description</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Due Date</th>
            <th className="p-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-6 text-gray-500">
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">📋</span>
                  <p>No tasks found</p>
                </div>
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-gray-50 transition border-b last:border-0"
              >
                <td className="p-3 font-medium text-gray-800">{task.title}</td>
                <td className="p-3 text-gray-600">{task.description}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium shadow-sm ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="p-3 text-gray-500">
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="p-3 text-center flex justify-center gap-3">
                  <button
                    className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    onClick={() => onEdit(task)}
                    title="Edit Task"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                    onClick={() => onDelete(task.id!)}
                    title="Delete Task"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
