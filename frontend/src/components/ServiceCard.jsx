import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

function ServiceCard({ service, onDelete, onEdit }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBookings, setShowBookings] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://miniproject-1-34zo.onrender.com/api/bookings/expert?expertId=${service._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setBookings(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (bookingId, status) => {
    try {
      await axios.put(
        `https://miniproject-1-34zo.onrender.com/api/bookings/${bookingId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(`Booking ${status} successfully`);
      fetchBookings(); // Refresh bookings after update
    } catch (err) {
      console.error("Error updating status:", err.response?.data || err.message);
      toast.error("Failed to update booking status");
    }
  };

  const handleViewBookings = () => {
    setShowBookings(true);
    fetchBookings();
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h3 className="text-xl font-bold text-green-600">{service.name}</h3>
      <h4 className="text-md font-semibold text-green-500">{service.expertise}</h4>
      <p className="text-sm text-gray-500">{service.category}</p>
      <p>{service.description}</p>
      <p>📍 {service.location}</p>
      <p>💰 {service.priceRange}</p>
      <p className="text-sm text-gray-600">
        📅 Available:{" "}
        {Array.isArray(service.availability) && service.availability.length > 0
          ? service.availability
              .map((dateStr, idx) => {
                const date = new Date(dateStr);
                return !isNaN(date)
                  ? date.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : `Invalid (${idx})`;
              })
              .join(", ")
          : "No dates"}
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        <button
          onClick={() => onEdit(service)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(service._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
        >
          Delete
        </button>
        <button
          onClick={handleViewBookings}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
        >
          View Bookings
        </button>
      </div>

      {showBookings && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowBookings(false)}
              aria-label="Close bookings modal"
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">
              Bookings for {service.name}
            </h2>

            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : bookings.length === 0 ? (
              <p className="text-gray-500">No bookings found for this service.</p>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="border p-3 rounded mb-3 shadow-sm"
                >
                  <p>
                    <strong>Name:</strong> {booking.organizer.name}
                  </p>
                  <p>
                    <strong>Mail:</strong> {booking.organizer.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {booking.organizer.phone}
                  </p>
                  <p>
                    <strong>Message:</strong> {booking.message}
                  </p>
                  <p>
                    <strong>Event Date:</strong>{" "}
                    {new Date(booking.eventDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        booking.status === "accepted"
                          ? "text-green-600"
                          : booking.status === "rejected"
                          ? "text-red-500"
                          : "text-yellow-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>
                  {booking.status === "pending" && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleResponse(booking._id, "accepted")}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm cursor-pointer"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleResponse(booking._id, "rejected")}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceCard;
