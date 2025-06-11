import { useState } from "react";
import axios from "axios";

function CreateEventModal({ isOpen, onClose, onEventAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");

    try {
      await axios.post("https://miniproject-1-34zo.onrender.com/api/events", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onEventAdded(); // <-- call correct prop here to refresh events
      onClose();      // close modal
    } catch (err) {
      console.error("Event creation failed:", err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4 text-blue-600">➕ Create New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Event Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-medium"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEventModal;
