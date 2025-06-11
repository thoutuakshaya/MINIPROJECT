import { useEffect, useState } from "react";
import axios from "axios";
import AttendeeSidebarLayout from "../../components/AttendeeSidebarLayout";

// Import icons from lucide-react
import { MapPin, Calendar, CheckCircle2, Clock } from "lucide-react";

function AttendeeMyEvents() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (token) fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user?._id && token) fetchMyEvents(user._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, user]);

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user info:", err.message);
    }
  };

  const fetchMyEvents = async (userId) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/registrations/myevent",
        {
          params: { userId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = Array.isArray(res.data.registrations)
        ? res.data.registrations
        : [];

      const now = new Date();
      const filtered =
        filter === "all"
          ? data
          : data.filter((reg) => {
              const eventDate = new Date(reg.event.date);
              return filter === "upcoming"
                ? eventDate > now
                : eventDate <= now;
            });

      setEvents(filtered);
    } catch (err) {
      console.error("Error fetching attendee events:", err.message);
      setEvents([]);
    }
  };

  return (
    <AttendeeSidebarLayout>
      <h1 className="text-3xl font-bold mb-6">My Registered Events</h1>

      {/* Filters */}
      <div className="mb-8 flex gap-4">
        {["all", "upcoming", "completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-5 py-2 rounded-md font-medium transition ${
              filter === type
                ? type === "upcoming"
                  ? "bg-green-600 text-white"
                  : type === "completed"
                  ? "bg-red-600 text-white"
                  : "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      {events.length === 0 ? (
        <p className="text-center text-gray-500 italic text-lg py-16">
          No events found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((reg) => {
            const event = reg.event;
            const isCompleted = new Date(event.date) < new Date();

            return (
              <div
                key={reg._id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 flex flex-col justify-between"
              >
                {/* Event Header
                <div className="mb-4 flex items-center justify-center h-32 rounded-md bg-black-300 text-white text-4xl font-extrabold uppercase tracking-wide select-none">
                  {event.title.charAt(0)}
                </div> */}

                {/* Event Info */}
                <div className="flex flex-col gap-3 flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="flex items-center text-gray-600 text-sm space-x-4">
                    <span className="flex items-center gap-1">
                      <MapPin size={16} className="text-indigo-600" />
                      {event.location}
                    </span>

                    <span className="flex items-center gap-1">
                      <Calendar size={16} className="text-indigo-600" />
                      <time dateTime={event.date}>
                        {new Date(event.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm line-clamp-4 mt-2">
                    {event.description}
                  </p>
                </div>

                {/* Status & Action */}
                <div className="mt-6 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      isCompleted
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 size={16} />
                        Completed
                      </>
                    ) : (
                      <>
                        <Clock size={16} className="animate-pulse" />
                        Upcoming
                      </>
                    )}
                  </span>

                  {isCompleted && (
                    <a
                      href={`http://localhost:5000/certificates/${event._id}.pdf`}
                      download
                      className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                      aria-label={`Download certificate for ${event.title}`}
                    >
                      🎓 Certificate
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AttendeeSidebarLayout>
  );
}

export default AttendeeMyEvents;
