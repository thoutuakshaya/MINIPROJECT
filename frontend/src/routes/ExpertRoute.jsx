import { Navigate } from "react-router-dom";

function ExpertRoute({ children }) {
  const token = localStorage.getItem("userToken");
  const role = localStorage.getItem("userRole");

  if (!token || role !== "expert") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ExpertRoute;
