import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrganizerSidebarLayout from "../components/OrganizerSidebarLayout";

function OrganizerDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const [bookings, setBookings] = useState([]);
  const [eventCount, setEventCount] = useState(0);
  const [expertsBookedCount, setexpertsBookedCount] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [profileCompletion, setProfileCompletion] = useState(0);


  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleCancel = async (bookingId) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      await axios.put(`http://localhost:5000/api/bookings/cancel/${bookingId}`, {}, { headers });
      alert("Booking cancelled.");
      fetchDashboardData(); // Refresh data
    } catch (err) {
      console.error("Cancel failed:", err.message);
      alert("Something went wrong while cancelling.");
    }
  };

  const handleDelete = async (bookingId) => {
    // const confirm = window.confirm("Are you sure you want to delete this booking permanently?");
    // if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, { headers });
      alert("Booking deleted.");
      fetchDashboardData(); // Refresh data
    } catch (err) {
      console.error("Delete failed:", err.message);
      alert("Something went wrong while deleting.");
    }
  };

  const fetchDashboardData = async () => {
    try {
      // Bookings
      const bookingsRes = await axios.get("http://localhost:5000/api/bookings/organizer", { headers });
      setBookings(bookingsRes.data);
      setPendingBookings(bookingsRes.data.filter(b => b.status === "pending").length);
      setexpertsBookedCount(bookingsRes.data.length);

      // Events
      const eventsRes = await axios.get("http://localhost:5000/api/events/myevents", { headers });
      setEventCount(eventsRes.data.length);

    
      // Profile Completion
      const profileRes = await axios.get("http://localhost:5000/api/users/profile", { headers });
      const profile = profileRes.data;
      const fields = ["name", "email", "phone", "bio", "photo"];
      const filled = fields.filter(field => profile[field]);
      const completion = Math.round((filled.length / fields.length) * 100);
      setProfileCompletion(completion);

      // Optional static review count
      setReviewCount(5);

    } catch (err) {
      console.error("Dashboard fetch failed:", err.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <OrganizerSidebarLayout>
      <h1 className="text-3xl font-bold mb-6 text-center">Event Organizer Dashboard 👑</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatCard label="🎉 Events" value={eventCount} />
        <StatCard label="📦 Experts Booked" value={expertsBookedCount} />
        <StatCard label="⏳ Pending" value={pendingBookings} />
        <StatCard label="⭐ Reviews" value={reviewCount} />
      </div>

      {/* Quick Actions */}
      <div className="mb-6 flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/organizer/events")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          📤 Create New Event
        </button>
        <button
          onClick={() => navigate("/organizer/experts/book")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          🔎 Find Experts
        </button>
        <button
          onClick={() => navigate("/organizer/share")}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          📩 Share Event Page
        </button>
      </div>

      {/* Recent Bookings */}
      <h2 className="text-xl font-semibold mb-3">Recent Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings made yet.</p>
      ) : (
        <div className="space-y-4 mb-8">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white shadow p-4 rounded">
              <p><strong>Event Date:</strong> {new Date(booking.eventDate).toLocaleDateString()}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`capitalize font-semibold ${
                  booking.status === "pending" ? "text-yellow-600" :
                  booking.status === "accepted" ? "text-green-600" :
                  booking.status === "rejected" ? "text-red-600" :
                  "text-gray-500"
                }`}>
                  {booking.status}
                </span>
              </p>

              {booking.status === "pending" && (
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel Booking
                  </button>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete Booking
                  </button>
                </div>
              )}

              <p><strong>Message:</strong> {booking.message || "—"}</p>
            </div>
          ))}
        </div>
      )}

      {/* Profile Completion */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">👤 Profile Completion</h2>
        <div className="bg-gray-200 h-4 w-full rounded">
          <div
            className="bg-blue-500 h-4 rounded"
            style={{ width: `${profileCompletion}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">{profileCompletion}% complete – Add more info to improve trust.</p>
      </div>

      {/* Notifications */}
      <div>
        <h2 className="text-xl font-semibold mb-2">🔔 Notifications</h2>
        <ul className="bg-white p-4 rounded shadow text-sm space-y-2">
          <li>✅ Booking confirmed </li>
          <li>❌ EXPERT 2 declined your request</li>
          <li>💬 New review from an attendee</li>
        </ul>
      </div>
    </OrganizerSidebarLayout>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white shadow p-4 rounded text-center">
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default OrganizerDashboard;
