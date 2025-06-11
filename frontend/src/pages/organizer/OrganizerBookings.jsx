import { useEffect, useState } from "react";
import axios from "axios";
import OrganizerSidebarLayout from "../../components/OrganizerSidebarLayout";
import { motion, AnimatePresence } from "framer-motion";

function OrganizerBookings() {
  const token = localStorage.getItem("userToken");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const headers = { Authorization: `Bearer ${token}` };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://miniproject-1-34zo.onrender.com/api/bookings/organizer", { headers });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axios.put(`https://miniproject-1-34zo.onrender.com/api/bookings/cancel/${bookingId}`, {}, { headers });
      alert("Booking cancelled.");
      fetchBookings();
    } catch (err) {
      console.error("Cancel failed:", err.message);
      alert("Something went wrong while cancelling.");
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`https://miniproject-1-34zo.onrender.com/api/bookings/${bookingId}`, { headers });
      alert("Booking deleted.");
      fetchBookings();
    } catch (err) {
      console.error("Delete failed:", err.message);
      alert("Something went wrong while deleting.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <OrganizerSidebarLayout>
      <div className="p-6 min-h-screen bg-gray-50">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800"
        >
          📘 My Event Bookings
        </motion.h1>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {bookings.map((booking) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 p-5 space-y-3 transition-all duration-300"
                >
                  <h2 className="text-lg font-semibold text-indigo-700">
                    🎓 {booking.expert?.name || "Expert N/A"}
                  </h2>

                  <p className="text-sm text-gray-600">
                    📅{" "}
                    {new Date(booking.eventDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>

                  <p className="text-sm text-gray-500 italic">
                    📨 {booking.message || "No message provided"}
                  </p>

                  <p className="text-sm font-medium">
                    ✅ Status:{" "}
                    <span
                      className={`font-semibold capitalize ${
                        booking.status === "pending"
                          ? "text-yellow-600"
                          : booking.status === "accepted"
                          ? "text-green-600"
                          : booking.status === "rejected"
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      {booking.status === "pending"
                        ? "⏳ Pending"
                        : booking.status === "accepted"
                        ? "✅ Accepted"
                        : booking.status === "rejected"
                        ? "❌ Rejected"
                        : "Unknown"}
                    </span>
                  </p>

                  {booking.status === "pending" && (
                    <div className="flex justify-start gap-2 pt-3">
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-800 text-white rounded-md transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </OrganizerSidebarLayout>
  );
}

export default OrganizerBookings;
