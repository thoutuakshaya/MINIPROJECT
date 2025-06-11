import { useState } from "react";
import axios from "axios";

function AddServiceModal({ isOpen, onClose, onServiceAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    expertise: "", // ✅ corrected
    location: "",
    priceRange: "",
    description: "",
    availability: ""
  });

  const token = localStorage.getItem("userToken");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        expertise: formData.expertise, // ✅ corrected
        location: formData.location,
        priceRange: formData.priceRange,
        description: formData.description,
        availability: formData.availableDates
          .split(",")
          .map((date) => new Date(date.trim()).toISOString())
      };

      console.log("Payload being sent:", payload);

      await axios.post("https://miniproject-1-34zo.onrender.com/api/experts", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      onServiceAdded();
      onClose();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.response?.data || err.message;
      console.error("Failed to add service:", errorMessage);
      alert("Error: " + errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-red-500"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-indigo-700">
          Add Expert Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Expert Service Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="expertise" // ✅ corrected
            placeholder="Expertise (e.g. AI, Cybersecurity)"
            value={formData.expertise} // ✅ corrected
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location or Online"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="priceRange"
            placeholder="Price Range (e.g. ₹2000 - ₹5000)"
            value={formData.priceRange}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="availableDates"
            placeholder="Available Dates (comma-separated: YYYY-MM-DD)"
            value={formData.availableDates}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Add Expert Service
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddServiceModal;
