import React, { useState } from "react";
import AttendeeList from "./AttendeeList"; // Make sure this path is correct

function EventCard({ event, onDelete, onEdit, attendeeCount, token }) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold text-blue-600">{event.title}</h3>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Attendees Registered:</strong> {attendeeCount ?? 0}</p>

        <div className="mt-3 flex gap-4">
          <button
            onClick={() => onEdit(event)}
            className="text-blue-500 hover:underline"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(event._id)}
            className="text-red-500 hover:underline"
          >
            🗑️ Delete
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="text-green-600 hover:underline"
          >
            Show Attendees
          </button>
        </div>
      </div>

      {showModal && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleClose}
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Attendees</h2>
                <button
                  onClick={handleClose}
                  className="text-red-500 text-lg font-semibold"
                >
                  ✖
                </button>
              </div>
              <AttendeeList eventId={event._id} token={token} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default EventCard;
