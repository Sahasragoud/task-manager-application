import type { NewTask, Task } from "../types/task";
import API from "./api";

export const getTasks = (
    userId: number,
    page : number=0, 
    size : number = 5, 
    sortField : string ="id",
    sortDirection : string ="asc"
    ) => {
        return API.get(
            `tasks/user/${userId}/tasks?page=${page}&size=${size}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
    }    

export const createTask = (userId : number, task : NewTask) => API.post<Task>(`tasks/user/${userId}`,task);
export const updateTask = (taskId : number,task : Task) => API.put(`tasks/${taskId}`,task);
export const deleteTask = (taskId : number) => API.delete(`tasks/${taskId}`);

export const getAllTasks = (
    taskPage : number=0, 
    taskSize : number = 5, 
    sortTaskField : string ="id",
    sortTaskDirection : string ="asc"
    ) => {
        return API.get(
            `admin/tasks?taskPage=${taskPage}&taskSize=${taskSize}&sortTaskField=${sortTaskField}&sortTaskDirection=${sortTaskDirection}`
        );
    }    
