import { useEffect, useState } from "react";
import axios from "axios";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("https://miniproject-1-34zo.onrender.com/api/contact/admin/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err.message);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">📬 Support Messages</h1>
          <p className="text-gray-500 mt-1 text-sm">
            All messages submitted through the contact form.
          </p>
        </header>

        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-600">No messages found</p>
              <p className="text-sm text-gray-400 mt-1">
                Contact form messages will appear here once submitted by users.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-gray-200"
              >
                <h2 className="text-lg font-semibold text-blue-700 mb-2 break-words">
                  {msg.subject || "No Subject"}
                </h2>

                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">{msg.name}</span>{" "}
                  <span className="text-blue-500">({msg.email})</span>
                </p>

                <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap break-words mt-3">
                  {msg.message}
                </div>

                <p className="text-xs text-gray-400 mt-4">
                  Sent on{" "}
                  {new Date(msg.createdAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminMessages;
