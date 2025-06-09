import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const useAuth = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem("auth") === "true",
  login: () => {
    localStorage.setItem("auth", "true");
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("auth");
    set({ isAuthenticated: false });
  },
}));

export default useAuth;
