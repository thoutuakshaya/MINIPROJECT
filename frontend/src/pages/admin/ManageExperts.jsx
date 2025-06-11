import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../../components/AdminLeftbar";

function ManageExperts() {
  const [experts, setExperts] = useState([]);

  const fetchExperts = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.get("https://miniproject-1-34zo.onrender.com/api/experts/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExperts(res.data);
    } catch (err) {
      console.error("Error loading experts:", err.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.put(
        `https://miniproject-1-34zo.onrender.com/api/experts/admin/update/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchExperts(); // refresh list
    } catch (err) {
      console.error("Failed to update expert:", err.message);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Experts 👨‍💻</h1>

      {experts.length === 0 ? (
        <p>No experts found.</p>
      ) : (
        <div className="grid gap-4">
          {experts.map((expert) => (
            <div
              key={expert._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold text-blue-600">{expert.name}</h2>
                <p className="text-sm text-gray-500">📍 {expert.location}</p>
                <p className="text-sm text-gray-500">📂 {expert.category}</p>
                <p className="text-sm">Status: <span className="capitalize">{expert.status}</span></p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => updateStatus(expert._id, "approved")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(expert._id, "rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SidebarLayout>
  );
}

export default ManageExperts;
