import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../components/AdminLeftbar";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalBookings: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const role = localStorage.getItem("userRole");

    if (!token || role !== "admin") {
      navigate("/login");
    } else {
      fetchSummary(token);
    }
  }, [navigate]);

  const fetchSummary = async (token) => {
    try {
      const res = await axios.get("https://miniproject-1-34zo.onrender.com/api/admin/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to fetch summary:", err.message);
    }
  };

  return (
    <SidebarLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard 🛠️</h1>
        <p className="text-gray-700 mb-6">Welcome, Admin. Here is your platform summary:</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-xl font-semibold text-blue-600">👥 Users</h2>
            <p className="text-3xl mt-2 font-bold">{summary.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-xl font-semibold text-green-600">📦 Vendors</h2>
            <p className="text-3xl mt-2 font-bold">{summary.totalVendors}</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-xl font-semibold text-indigo-600">📅 Bookings</h2>
            <p className="text-3xl mt-2 font-bold">{summary.totalBookings}</p>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

export default AdminDashboard;
