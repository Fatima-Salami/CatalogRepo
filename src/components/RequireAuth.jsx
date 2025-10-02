import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

export default function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (auth == null || !auth?.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
