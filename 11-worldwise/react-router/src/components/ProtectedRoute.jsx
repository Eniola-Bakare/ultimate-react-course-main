import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
