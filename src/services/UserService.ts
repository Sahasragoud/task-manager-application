import API from "./api"
import type {User} from "../types/user";
import type { updateUserPayload } from "../types/UpdateUserPayload";
import type { UserFormData } from "../pages_admin/AdminUserModel";

export const loginUser = (email: string, password: string) => API.post<User>("auth/login", {email:email, password:password});
export const registerUser = (userData : User)=> API.post<User>("auth/register",userData);
export const resetPassword = (token :string, newPassword: string) => API.post<string>(`/users/reset-password?token=${token}`,newPassword);
export const updatePassword = (userId : number,oldPassword:string, newPassword : string)=> API.put(`users/${userId}/password`,{oldPassword,newPassword});
export const updateProfile = (userId : number, updateFields : Partial<updateUserPayload>) => API.put(`users/${userId}/profile`, updateFields);
export const getUser = (userId : number) => API.get<User>(`users/by-id?id=${userId}`);
export const deleteUser = (userId : number) => API.delete(`admin/user/${userId}`);
export const getUsers = (
    page : number=0, 
    size : number = 9, 
    sortField : string ="id",
    sortDirection : string ="asc"
    ) => {
        return API.get(
            `admin/users?page=${page}&size=${size}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
    }    

    export const createUser = (userData : UserFormData) => API.post<UserFormData>(`admin/user/create`, userData);