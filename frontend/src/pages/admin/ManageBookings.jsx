import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../../components/AdminLeftbar";
import ConfirmModal from "../../components/ConfirmModal";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For modal
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, bookingId: null });
  const [alertMessage, setAlertMessage] = useState(null); // For error messages in modal or notification

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("Unauthorized: No token provided");

      const res = await axios.get("https://miniproject-1-34zo.onrender.com/api/bookings/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const confirmDelete = (bookingId) => {
    setConfirmModal({ isOpen: true, bookingId });
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`https://miniproject-1-34zo.onrender.com/api/bookings/${confirmModal.bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings((prev) => prev.filter((b) => b._id !== confirmModal.bookingId));
      setConfirmModal({ isOpen: false, bookingId: null });
      setAlertMessage(null);
    } catch (err) {
      console.error("Delete error:", err);
      setAlertMessage(err.response?.data?.message || "Failed to delete booking");
      // Keep modal open or close? Here we close modal but show alert below.
      setConfirmModal({ isOpen: false, bookingId: null });
    }
  };

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Bookings 📅</h1>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        message="Are you sure you want to delete this booking?"
        onCancel={() => setConfirmModal({ isOpen: false, bookingId: null })}
        onConfirm={handleDelete}
      />

      {alertMessage && (
        <div className="mb-4 p-3 bg-red-200 text-red-800 rounded">
          {alertMessage}
          <button
            onClick={() => setAlertMessage(null)}
            className="ml-4 font-bold hover:text-red-600"
            aria-label="Close alert"
          >
            ×
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-gray-600">Loading bookings...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="bg-white p-4 rounded shadow">
              <p><strong>📆 Date:</strong> {new Date(b.eventDate).toLocaleDateString()}</p>
              <p><strong>🧑 Organizer:</strong> {b.organizer?.name} ({b.organizer?.email})</p>
              <p><strong>🏷 Expert:</strong> {b.vendor?.name} ({b.vendor?.category})</p>
              <p><strong>📝 Message:</strong> {b.message}</p>
              <p className="text-sm text-gray-500 mt-1">Created: {new Date(b.createdAt).toLocaleString()}</p>

              <button
                onClick={() => confirmDelete(b._id)}
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </SidebarLayout>
  );
}

export default ManageBookings;
