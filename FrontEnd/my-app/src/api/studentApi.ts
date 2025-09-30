// api/students.ts
import api from "./axios";

export const getStudents = () => api.get("/students");
export const getStudent = (id: string) => api.get(`/students/${id}`);
export const createStudent = (data: any) => api.post("/students", data);
export const updateStudent = (id: string, data: any) => api.put(`/students/${id}`, data);
export const deleteStudent = (id: string) => api.delete(`/students/${id}`);
