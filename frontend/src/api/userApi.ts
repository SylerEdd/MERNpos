import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getAllUsers = () => api.get("/users");

export const getUserById = (id: number) => api.get(`/users/${id}`);

export const createUser = (data: { 
    fullName: string;
    username: string;
    email: string;
    password: string,
    //The roles below is what is causing the problems i beleive 
    role: string;
}) => api.post("/users", data);

export const updateUser = (id: number, data: {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
    //And the roles here as well 
    role?: string;
}) => api.patch(`/users/${id}`, data);

export const deleteUserById = (id: number) =>
  api.delete(`/users/${id}`);
