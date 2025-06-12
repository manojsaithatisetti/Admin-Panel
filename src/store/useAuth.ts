import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const useAuth = create<AuthState>((set) => ({
  isLoggedIn: false,
  login: (email, password) => {
    const isValid = email === 'admin@dms.com' && password === 'admin123';
    if (isValid) {
      set({ isLoggedIn: true });
    }
    return isValid;
  },
  logout: () => set({ isLoggedIn: false }),
}));

export default useAuth;