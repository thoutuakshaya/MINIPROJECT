import { useEffect, useState } from "react";
import axios from "axios";

function MyEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('userToken');
      try {
        const response = await axios.get('https://miniproject-1-34zo.onrender.com/api/events/myevents', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setEvents(response.data);
      } catch (err) {
        console.error("Failed to load events:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('userToken');
    if (!window.confirm("Are you sure you want to delete this event?")) return;
  
    try {
      await axios.delete(`https://miniproject-1-34zo.onrender.com/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      // Remove from UI
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Events</h1>
      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {events.map((event) => (
  <div key={event._id} className="bg-white p-4 rounded shadow relative">
    <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
    <p className="text-sm text-gray-700 mb-1">{event.description}</p>
    <p className="text-sm text-gray-500">📍 {event.location}</p>
    <p className="text-sm text-gray-500">📅 {new Date(event.date).toDateString()}</p>
    <p className="text-sm text-gray-500">💰 ₹{event.budget}</p>

    <div className="mt-4 flex justify-end gap-2">
      <button
        onClick={() => handleDelete(event._id)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
      >
        Delete
      </button>

      {/* Edit functionality can open a modal or reuse CreateEvent form in edit mode */}
      {/* You can add edit later if needed */}
    </div>
  </div>
))}

        </div>
      )}
    </div>
  );
}

export default MyEvents;
