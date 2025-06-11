import { Link, useNavigate } from "react-router-dom";

function ExpertSidebarLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Expert Panel</h2>

          <nav className="space-y-3 text-gray-700 font-medium">
            <Link to="/expert/dashboard" className="block hover:text-blue-700">🏠 Dashboard</Link>
            <Link to="/expert/services" className="block hover:text-blue-700">📋 Service and Bookings</Link>
            <Link to="/expert/earnings" className="block hover:text-blue-700">💰 Earnings</Link>
            <Link to="/expert/reviews" className="block hover:text-blue-700">⭐ Reviews</Link>
            <Link to="/expert/profile" className="block hover:text-blue-700">👤 Profile</Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}

export default ExpertSidebarLayout;
