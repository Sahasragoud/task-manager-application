// src/types/task.ts
export type Task = {
  id?: number;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
};

// when creating a task from modal (id  will be added later)
export type NewTask = Omit<Task, "id">;
