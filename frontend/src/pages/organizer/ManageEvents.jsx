import { useEffect, useState } from "react";
import axios from "axios";
import OrganizerSidebarLayout from "../../components/OrganizerSidebarLayout";
import { motion } from "framer-motion";
import CreateEventModal from "../../components/CreateEventModal";
import BookVendorsModal from "../../components/BookVendorsModal";
import EventCard from "../../components/EventCard";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [token, setToken] = useState("");

  const fetchEvents = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      setToken(userToken);
      const res = await axios.get("http://localhost:5000/api/events/myevents", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const deleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const openBookingModal = (eventId) => {
    setSelectedEventId(eventId);
    setIsBookingModalOpen(true);
  };

  const editEvent = (event) => {
    alert("Edit coming soon! Event ID: " + event._id);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <OrganizerSidebarLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-800">🗓️ Manage Events</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition"
        >
          ➕ Add Event
        </motion.button>
      </motion.div>

      <CreateEventModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onEventAdded={fetchEvents}
      />

      <BookVendorsModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        eventId={selectedEventId}
      />

      {events.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 mt-8 text-center"
        >
          No events created yet. Click “Add Event” to get started!
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <EventCard
                event={event}
                onDelete={deleteEvent}
                onEdit={editEvent}
                onBookVendors={openBookingModal}
                token={token}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </OrganizerSidebarLayout>
  );
}

export default ManageEvents;
