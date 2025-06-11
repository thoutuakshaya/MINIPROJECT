import { useEffect, useState } from "react";
import axios from "axios";
import OrganizerSidebarLayout from "../../components/OrganizerSidebarLayout";
import { motion, AnimatePresence } from "framer-motion";

function BookExperts() {
  const [experts, setExperts] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("userToken");

  const fetchExperts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://miniproject-1-34zo.onrender.com/api/experts/all");
      setExperts(res.data);
    } catch (err) {
      setError("Unable to fetch experts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (expert) => {
    setSelectedExpert(expert);
    setEventDate("");
    setMessage("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedExpert(null);
  };

  const submitBooking = async () => {
    if (!eventDate) return;
    try {
      await axios.post(
        "https://miniproject-1-34zo.onrender.com/api/bookings",
        {
          expertId: selectedExpert._id,
          eventDate,
          message,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      closeModal();
      alert("Booking successful ✅");
    } catch (err) {
      console.error("Booking failed:", err.message);
      alert("Booking failed ❌");
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  const filtered = experts.filter((expert) => {
    const category = expert.category?.toLowerCase() || "";
    const location = expert.location?.toLowerCase() || "";
    const filterText = filter.toLowerCase();
    return category.includes(filterText) || location.includes(filterText);
  });

  return (
    <OrganizerSidebarLayout>
      <motion.div
        className="p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-extrabold text-center mb-8 text-neutral-800">
          🎓 Book an Expert
        </h1>

        {/* <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <input
            type="text"
            placeholder="🔍 Search by category or location..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full max-w-xl px-5 py-3 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </motion.div> */}

        {loading && (
          <p className="text-center text-gray-500 animate-pulse">Loading experts...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-gray-500">No experts match your search.</p>
        )}

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filtered.map((expert) => (
            <motion.div
              key={expert._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white p-5 rounded-2xl border shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-green-700">{expert.name}</h3>
              <p className="text-sm text-gray-500 mt-1">📍 {expert.location || "N/A"}</p>
              <p className="text-sm text-gray-500">📂 {expert.category || "N/A"}</p>
              <p className="text-sm text-gray-500">💰 {expert.priceRange || "N/A"}</p>
              <p className="text-sm text-gray-500">
                📅 {expert.availableDates?.length || 0} available date(s)
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openModal(expert)}
                className="mt-4 w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-4 rounded-xl shadow-md"
              >
                Book Now
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Booking Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Book <span className="text-green-600">{selectedExpert?.name}</span>
                </h2>

                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Event Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 ring-green-500"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Message (optional)</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-md"
                    rows={3}
                    placeholder="Add any message for the expert"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitBooking}
                    disabled={!eventDate}
                    className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    Confirm Booking
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </OrganizerSidebarLayout>
  );
}

export default BookExperts;
