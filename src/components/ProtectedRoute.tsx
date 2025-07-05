import { Navigate } from "react-router-dom";
import type { ProtectedRouteProps } from "../types/types";

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;