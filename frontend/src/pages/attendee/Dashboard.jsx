// src/pages/attendee/AttendeeDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import AttendeeSidebarLayout from "../../components/AttendeeSidebarLayout";

function AttendeeDashboard() {
  const [myEvents, setMyEvents] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(0);

  const token = localStorage.getItem("userToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const profileRes = await axios.get("https://miniproject-1-34zo.onrender.com/api/users/profile", { headers });
      const profile = profileRes.data;

      const res = await axios.get("https://miniproject-1-34zo.onrender.com/api/registrations/myevent", { headers });
      setMyEvents(res.data.registrations || []);

      const recRes = await axios.get("https://miniproject-1-34zo.onrender.com/api/events", { headers });
      setRecommended(recRes.data || []);

      const fields = ["name", "email", "phone", "bio"];
      const filled = fields.filter((field) => profile[field]);
      setProfileCompletion(Math.round((filled.length / fields.length) * 100));
    } catch (err) {
      console.error("Dashboard error:", err.message);
    }
  };

  return (
    <AttendeeSidebarLayout>
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">🎯 Attendee Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatCard label="📅 Events Attended" value={myEvents.length} />
        <StatCard label="🔥 Recommended" value={recommended.length} />
        <StatCard label="🧩 Profile Completion" value={`${profileCompletion}%`} />
      </div>

      <h2 className="text-xl font-semibold mb-2">🌟 Upcoming / Registered Events</h2>
      {myEvents.length === 0 ? (
        <p className="text-gray-500 mb-6">You haven’t joined any events yet.</p>
      ) : (
        <div className="grid gap-4 mb-8">
          {myEvents.map((e) => (
            <div key={e._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold text-indigo-700">{e.title}</h3>
              <p className="text-sm text-gray-600">{new Date(e.date).toLocaleDateString()}</p>
              <p className="text-sm">{e.location}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">🧠 Recommended Events</h2>
      {recommended.length === 0 ? (
        <p className="text-gray-500">No recommendations available.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recommended.map((rec) => (
            <div key={rec._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold text-blue-700">{rec.title}</h3>
              <p className="text-sm">{rec.category}</p>
              <p className="text-sm">{rec.location}</p>
            </div>
          ))}
        </div>
      )}
    </AttendeeSidebarLayout>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white shadow p-4 rounded text-center">
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="text-2xl font-bold text-indigo-600">{value}</p>
    </div>
  );
}

export default AttendeeDashboard;
