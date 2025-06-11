import { useEffect, useState } from "react";
import axios from "axios";

function BookVendorsModal({ isOpen, onClose, eventId }) {
  const [vendors, setVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchVendors = async () => {
      try {
        const res = await axios.get("https://miniproject-1-34zo.onrender.com/api/vendors/all");
        setVendors(res.data);
      } catch (err) {
        console.error("Failed to fetch vendors:", err.message);
      }
    };

    fetchVendors();
  }, [isOpen]);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.post(
        "https://miniproject-1-34zo.onrender.com/api/bookings",
        {
          vendorId: selectedVendorId,
          eventId,
          eventDate: new Date().toISOString(), // you can replace with real event date
          message: "Booked via manage events page",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Vendor booked successfully!");
      onClose();
    } catch (err) {
      console.error("Booking failed:", err.message);
      alert("Booking failed!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">📦 Book Vendor</h2>

        <select
          value={selectedVendorId}
          onChange={(e) => setSelectedVendorId(e.target.value)}
          className="w-full border p-2 mb-4"
        >
          <option value="">Select Vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor._id} value={vendor._id}>
              {vendor.name} — {vendor.category}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleBooking}
            disabled={!selectedVendorId}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookVendorsModal;
