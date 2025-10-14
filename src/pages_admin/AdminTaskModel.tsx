// src/components/TaskModal.tsx
import React, { useState, useEffect } from "react";
import { createTask, updateTask } from "../services/TaskService";
import type { Task } from "../types/task";
import type { TaskStatus } from "./AdminTasks";

type TaskModalProps = {
  userId : number;
  onClose: () => void;
  onTaskCreated: () => void;
  editingTask?: Task | null;   // ✅ add this line
};

type TaskFormData = {
    title: string,
    description: string,
    dueDate: string,
    status: TaskStatus,
}

const AdminTaskModal: React.FC<TaskModalProps> = ({ userId, onClose, onTaskCreated, editingTask }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  // ✅ preload form when editing
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title : editingTask.title,
        description : editingTask.description,
        dueDate: editingTask.dueDate,
        status: editingTask.status,
      });
    }
  }, [editingTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {

    if (editingTask && editingTask.id) {
      // Update task
      await updateTask(editingTask.id, formData);
      onTaskCreated();
      onClose();
    } else {
      // Create task
      const response = await createTask(userId, formData);
      if (response.data && response.data.id) {
        localStorage.setItem("task", JSON.stringify(response.data));
        onTaskCreated();
        onClose();
      }
    }
  } catch (error) {
    console.error("Error saving task:", error);
  }
};
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
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
              {editingTask ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminTaskModal;
