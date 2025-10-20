import publicAPI from "./publiApi";

export const sendPasswordResetEmail = (email: string) => publicAPI.post<string>("users/forgot-password", {email});