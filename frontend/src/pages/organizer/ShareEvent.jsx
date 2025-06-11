import React, { useState } from "react";
import OrganizerSidebarLayout from "../../components/OrganizerSidebarLayout";
import { Copy } from "lucide-react";
import { motion } from "framer-motion";

const ShareEvent = () => {
  const [copied, setCopied] = useState(false);

  // Mock event data (replace with real data or props if needed)
  const event = {
    id: "123abc",
    title: "Tech Innovation Summit 2025",
    date: "2025-07-15",
    location: "JNTUH UCEJ Campus, Telangana",
  };

  const shareURL = `${window.location.origin}/event/${event.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <OrganizerSidebarLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto p-6 mt-6 bg-white rounded-xl shadow-md"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">🔗 Share Your Event</h1>
          <p className="text-gray-500 mt-1">Spread the word and invite your audience</p>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-50 border border-gray-200 p-5 rounded-xl shadow-sm mb-6"
        >
          <h2 className="text-xl font-semibold text-indigo-700">{event.title}</h2>
          <p className="text-sm text-gray-600 mt-1">📅 {event.date}</p>
          <p className="text-sm text-gray-600">📍 {event.location}</p>
        </motion.div>

        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Event Link</label>
          <div className="flex items-center gap-2 border rounded-lg overflow-hidden bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-300">
            <input
              type="text"
              value={shareURL}
              readOnly
              className="flex-1 px-3 py-2 outline-none bg-transparent text-sm text-gray-800"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="bg-indigo-600 text-white px-3 py-2 flex items-center gap-2 hover:bg-indigo-700 transition"
            >
              <Copy size={16} /> Copy
            </motion.button>
          </div>
          {copied && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 text-sm mt-2"
            >
              ✅ Link copied to clipboard!
            </motion.p>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Share on Social Media</h3>
          <div className="flex flex-wrap gap-3">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={`https://wa.me/?text=${encodeURIComponent(`Check out this event: ${shareURL}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
            >
              WhatsApp
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shareURL
              )}&text=Join me at this event!`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 text-white px-4 py-2 rounded shadow hover:bg-blue-500 transition"
            >
              Twitter
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                shareURL
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-800 transition"
            >
              LinkedIn
            </motion.a>
          </div>
        </div>
      </motion.div>
    </OrganizerSidebarLayout>
  );
};

export default ShareEvent;
