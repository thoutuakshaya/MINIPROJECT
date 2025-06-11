import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpertDashboard from "./expert/ExpertDashboard"; // ✅ import
import OrganizerDashboard from "./OrganizerDashboard"; // 🛠 create this next
import AdminDashboard from "./AdminDashboard";
import AttendeeDashboard from "./attendee/Dashboard";


function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userRole = localStorage.getItem('userRole');

    if (!userToken) {
      navigate('/login');
    } else {
      setRole(userRole);
    }
  }, [navigate]);

  if (!role) return null; // Prevent flicker

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {role === 'organizer' && <OrganizerDashboard />}
      {role === 'expert' && <ExpertDashboard />}
      {role === 'admin' && <AdminDashboard />}
      {role === 'attendee' && <AttendeeDashboard />}
    </div>
  );
}

export default Dashboard;
