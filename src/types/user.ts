import type { ReactNode } from "react";
import type { Task } from "./task";

export type User = {
  accountLockedUntil: string;
  avatar: string;
  tasks: Task[];
  id ?: number;
  name: string;
  email: string;
  role: string;
  token: string;
  phone: ReactNode;
  dob: ReactNode;
  gender: ReactNode;
  profession: ReactNode;
  address: ReactNode;
  
};
