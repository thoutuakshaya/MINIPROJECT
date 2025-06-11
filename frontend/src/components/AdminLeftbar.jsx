import { Link, useNavigate } from "react-router-dom";

function SidebarLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin</h2>

          <nav className="space-y-3 text-gray-700 font-medium">
            <Link to="/admin/dashboard" className="block hover:text-blue-600">🏠 Dashboard</Link>
            <Link to="/admin/users" className="block hover:text-blue-600">👥 Manage Users</Link>
            <Link to="/admin/events" className="block hover:text-blue-600">🎉 Manage Events</Link>
            <Link to="/admin/experts" className="block hover:text-blue-600">🛍️ Manage Experts</Link>
            <Link to="/admin/bookings" className="block hover:text-blue-600">📅 All Bookings</Link>
            <Link to="/admin/messages" className="block hover:text-blue-600">📩 Support Messages</Link>
            <Link to="/admin/reviews" className="block hover:text-blue-600">⭐ Reviews</Link>
            <Link to="/admin/payments" className="block hover:text-blue-600">💳 Payments</Link>
            <Link to="/admin/settings" className="block hover:text-blue-600">⚙️ Admin Settings</Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default SidebarLayout;
