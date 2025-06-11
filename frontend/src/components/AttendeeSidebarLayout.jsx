import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function AttendeeSidebarLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const links = [
    { to: "/attendee/dashboard", label: "🏠 Dashboard" },
    { to: "/attendee/events", label: "🎯 Explore Events" },
    { to: "/attendee/myevents", label: "📅 My Events" },
    { to: "/attendee/certificates", label: "🎓 Certificates" },
    { to: "/attendee/profile", label: "👤 Profile" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Top Nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow z-30 flex justify-between items-center px-4 py-3">
        <h2 className="text-xl font-bold text-indigo-600">Attendee</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 md:top-auto left-0 z-40 bg-white w-64 h-full md:h-auto shadow-lg p-6 pt-20 md:pt-6 space-y-6 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="hidden md:block text-2xl font-bold text-indigo-600">Attendee Panel</h2>
        <nav className="space-y-3 text-gray-700 font-medium">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block hover:text-indigo-600"
              onClick={() => setSidebarOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mt-10"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 pt-16 md:pt-6">
        {children}
      </main>
    </div>
  );
}

export default AttendeeSidebarLayout;
