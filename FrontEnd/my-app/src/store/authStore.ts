import { create } from "zustand";
import axios from "axios";

interface AuthState {
  token: string | null;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}
interface LoginResponse {
  token: string;
  name: string;
  email: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,

 login: async (email, password) => {
  const res = await axios.post<LoginResponse>("https://mernstudentapp-1.onrender.com/api/auth/login", { email, password });
  const { token, name, email: userEmail } = res.data;

  localStorage.setItem("token", token);
  set({ token, user: { name, email: userEmail } });
}
,

  register: async (name, email, password) => {
    const res = await axios.post<LoginResponse>("https://mernstudentapp-1.onrender.com/api/auth/register", { name, email, password });
    const { token, name: userName, email: userEmail } = res.data;

    localStorage.setItem("token", token);
    set({ token, user: { name: userName, email: userEmail } });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  }
}));
