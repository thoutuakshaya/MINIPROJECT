import React, { useEffect, useState } from "react";
import axios from "axios";

// Move fetchAttendees outside the component and don't use export here
const fetchAttendees = async (eventId, token) => {
  try {
    const response = await axios.get(
      `https://miniproject-1-34zo.onrender.com/api/registrations/event/${eventId}/registrations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.registrations;
  } catch (error) {
    console.error("Error fetching attendees:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch attendees"
    );
  }
};

const AttendeeList = ({ eventId, token }) => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAttendees = async () => {
      try {
        const data = await fetchAttendees(eventId, token);
        setAttendees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (eventId && token) {
      loadAttendees();
    }
  }, [eventId, token]);

  if (loading) return <p>Loading attendees...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!Array.isArray(attendees) || attendees.length === 0) {
    return <p>No attendees found.</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Attendee List</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Check-in</th>
            <th className="border px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee, index) => (
            <tr key={attendee._id} className="text-sm">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{attendee.user.name}</td>
              <td className="border px-4 py-2">{attendee.user.email}</td>
              <td className="border px-4 py-2">
                {attendee.checkedIn ? (
                  <span className="text-green-600 font-semibold">✔</span>
                ) : (
                  <span className="text-gray-500">❌</span>
                )}
              </td>
              <td className="border px-4 py-2">
                {new Date(attendee.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendeeList;
