import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    budget: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.post('http://localhost:5000/api/events', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log("Event created:", response.data);
    navigate('/dashboard');
  } catch (err) {
    console.error("Event creation failed:", err);
  }
};
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Event</h2>

        <input type="text" name="title" placeholder="Event Title"
          className="w-full p-3 mb-4 border rounded"
          value={formData.title} onChange={handleChange} required />

        <textarea name="description" placeholder="Description"
          className="w-full p-3 mb-4 border rounded"
          value={formData.description} onChange={handleChange} required />

        <input type="date" name="date"
          className="w-full p-3 mb-4 border rounded"
          value={formData.date} onChange={handleChange} required />

        <input type="text" name="location" placeholder="Location"
          className="w-full p-3 mb-4 border rounded"
          value={formData.location} onChange={handleChange} required />

        <input type="number" name="budget" placeholder="Budget"
          className="w-full p-3 mb-6 border rounded"
          value={formData.budget} onChange={handleChange} required />

        <button type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded">
          Submit Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
