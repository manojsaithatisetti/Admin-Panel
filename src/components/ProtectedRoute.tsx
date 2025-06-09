import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../store/useAuth";

const ProtectedRoute = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;