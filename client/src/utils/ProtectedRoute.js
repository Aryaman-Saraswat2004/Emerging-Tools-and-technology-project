import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role && userRole !== role) {
    
    if (userRole === "ADMIN") return <Navigate to="/admin" replace />;
    if (userRole === "VOLUNTEER") return <Navigate to="/volunteer" replace />;
    return <Navigate to="/user" replace />;
  }

  
  return children;
};

export default ProtectedRoute;
