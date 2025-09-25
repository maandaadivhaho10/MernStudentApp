import axios from "axios";

const API_URL = "https://mernstudentapp-1.onrender.com/students";

export const getStudents = () => axios.get(API_URL);
export const getStudent = (id: string) => axios.get(`${API_URL}/${id}`);
export const createStudent = (data: any) => axios.post(API_URL, data);
export const updateStudent = (id: string, data: any) => axios.put(`${API_URL}/${id}`, data);
export const deleteStudent = (id: string) => axios.delete(`${API_URL}/${id}`);
