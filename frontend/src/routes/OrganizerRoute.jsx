import { Navigate } from "react-router-dom";

function OrganizerRoute({ children }) {
  const token = localStorage.getItem("userToken");
  const role = localStorage.getItem("userRole");

  if (!token || role !== "organizer") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default OrganizerRoute;
