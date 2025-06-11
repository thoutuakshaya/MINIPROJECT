import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookingConfirmation() {
  const { id } = useParams(); // booking ID from URL
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const res = await axios.get(`http://localhost:5000/api/bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooking(res.data);
      } catch (err) {
        console.error("Error fetching booking details:", err.message);
      }
    };

    fetchBooking();
  }, [id]);

  if (!booking) return <p className="text-center mt-10 text-gray-600">Loading booking details...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">Booking Confirmation</h1>

      <div className="bg-white p-6 rounded shadow-md space-y-3">
        <p><strong>Booking ID:</strong> {booking._id}</p>
        <p><strong>Vendor ID:</strong> {booking.vendor}</p>
        <p><strong>Organizer ID:</strong> {booking.organizer}</p>
        <p><strong>Date:</strong> {new Date(booking.eventDate).toLocaleDateString()}</p>
        <p><strong>Status:</strong> <span className="capitalize">{booking.status}</span></p>
        <p><strong>Message:</strong> {booking.message || "—"}</p>

        <div className="mt-6 border-t pt-4 text-sm text-gray-600">
          <h2 className="font-semibold text-gray-800 mb-1">Agreement Summary 📄</h2>
          <p>
            This confirms your event booking between <strong>Organizer</strong> and <strong>Vendor</strong> for the
            date mentioned above. The vendor agrees to deliver their services on time, and the organizer will cooperate
            as per agreed terms. This is an auto-generated summary and serves as a basic agreement reference.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
