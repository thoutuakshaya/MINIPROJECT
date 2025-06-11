import { useEffect, useState } from "react";
import ExpertSidebarLayout from "../../components/ExpertSidebarLayout";
import axios from "axios";
import { motion } from "framer-motion";
import { Activity, Calendar, DollarSign, Star } from "lucide-react";

function ExpertDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    bookings: 0,
    earnings: 0,
    reviews: 0,
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const headers = { Authorization: `Bearer ${token}` };

        const servicesRes = await axios.get(
          "http://localhost:5000/api/experts/myservices",
          { headers }
        );
        const services = servicesRes.data;

        if (!services.length) {
          setStats({
            services: 0,
            bookings: 0,
            earnings: 0,
            reviews: 0,
          });
          setLoading(false);
          return;
        }

        const serviceId = services[0]._id;

        const [bookings, earnings, reviews] = await Promise.all([
          axios.get(
            `http://localhost:5000/api/bookings/expert?expertId=${serviceId}`,
            { headers }
          ),
          axios.get("http://localhost:5000/api/experts/earnings", { headers }),
          axios.get("http://localhost:5000/api/experts/reviews", { headers }),
        ]);

        setStats({
          services: services.length,
          bookings: bookings.data.length,
          earnings: earnings.data.total || 0,
          reviews: reviews.data.length,
        });
        setLoading(false);
      } catch (err) {
        console.error("Expert stats fetch failed:", err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
    hover: { scale: 1.05, boxShadow: "0px 10px 15px rgba(0,0,0,0.1)" },
  };

  const statsData = [
    {
      label: "Sessions / Services",
      value: stats.services,
      icon: <Activity className="text-indigo-600" size={32} />,
      color: "bg-indigo-100",
    },
    {
      label: "Bookings",
      value: stats.bookings,
      icon: <Calendar className="text-green-600" size={32} />,
      color: "bg-green-100",
    },
    {
      label: "Earnings (₹)",
      value: stats.earnings.toLocaleString(),
      icon: <DollarSign className="text-yellow-600" size={32} />,
      color: "bg-yellow-100",
    },
    {
      label: "Reviews",
      value: stats.reviews,
      icon: <Star className="text-pink-600" size={32} />,
      color: "bg-pink-100",
    },
  ];

  return (
    <ExpertSidebarLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-12 text-gray-900 select-none"
        >
          Welcome Expert <span aria-label="brain" role="img">🧠</span>
        </motion.h1>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 font-medium"
          >
            Loading your stats...
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          >
            {statsData.map(({ label, value, icon, color }, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover="hover"
                className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-lg cursor-default ${color} border border-transparent hover:border-indigo-300 transition duration-300`}
              >
                <div className="mb-3">{icon}</div>
                <p className="text-lg font-semibold text-gray-700 mb-1">{label}</p>
                <p className="text-3xl font-extrabold text-gray-900">{value}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </ExpertSidebarLayout>
  );
}

export default ExpertDashboard;
