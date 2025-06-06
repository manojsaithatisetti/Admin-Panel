import { create } from "zustand";

interface AppStore{
  isAuthenticated:boolean;
  isSidebarCollapsed:boolean;
  login: ()=> void;
  logout: ()=> void;
  toggleBar: ()=> void;
}

const useAuth = create<AppStore>((set)=> (
  {
    isAuthenticated: false,
    isSidebarCollapsed: false,
    login: ()=> set({isAuthenticated: true}),
    logout: ()=> set({isAuthenticated: false}),
    toggleBar: ()=> set((state) => (
      {
        isSidebarCollapsed:!state.isSidebarCollapsed
      }
    ))

  }
))
export default useAuth;