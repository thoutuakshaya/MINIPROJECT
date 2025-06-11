import React from "react";
import { useNavigate } from "react-router-dom";

const dummyEvents = [
  {
    id: 1,
    title: "Intro to AI Workshop",
    date: "2025-06-15T18:00:00Z",
    type: "Workshop",
    tags: ["AI", "Beginner"],
    thumbnail:
      "https://th.bing.com/th/id/OIP.jRzssFPcy9aIA8EzcNdKjwHaEK?rs=1&pid=ImgDetMain",
  },
  {
    id: 2,
    title: "Web3 Hackathon",
    date: "2025-06-22T12:00:00Z",
    type: "Hackathon",
    tags: ["Blockchain", "Crypto"],
    thumbnail:
      "https://th.bing.com/th/id/OIP.cJaWu8oluj9QSwAlsad3LwHaEo?rs=1&pid=ImgDetMain",
  },
  {
    id: 3,
    title: "Fullstack Webinar",
    date: "2025-05-30T14:00:00Z",
    type: "Webinar",
    tags: ["React", "Node.js"],
    thumbnail: "https://i.ytimg.com/vi/7HGon-9dlzs/maxresdefault.jpg",
  },
];

const formatTimeLeft = (targetDate) => {
  const now = new Date();
  const timeLeft = new Date(targetDate) - now;
  if (timeLeft < 0) return "Already Started";

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  return `${days}d ${hours}h ${minutes}m left`;
};

const EventsSection = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/login");
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Live & Upcoming Events
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {dummyEvents.map((event) => (
          <div
            key={event.id}
            className="rounded-xl overflow-hidden shadow-sm bg-white transition hover:shadow-md"
          >
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {event.title}
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                {new Date(event.date).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>

              <div className="flex flex-wrap gap-1 mb-2">
                {event.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="text-xs text-rose-600 font-medium mb-3">
                ⏱ {formatTimeLeft(event.date)}
              </div>

              <button
                onClick={handleRegisterClick}
                className="w-full bg-indigo-600 text-white text-sm py-1.5 rounded hover:bg-indigo-700 transition"
              >
                Register
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
