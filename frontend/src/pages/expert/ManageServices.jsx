import { useEffect, useState } from "react";
import axios from "axios";
import VendorSidebarLayout from "../../components/ExpertSidebarLayout";
import ServiceCard from "../../components/ServiceCard";
import AddServiceModal from "../../components/AddServiceModal";
import { motion, AnimatePresence } from "framer-motion";

function ManageServices() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("userToken");

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/experts/myservices", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/experts/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices(); // Refresh list after deletion
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  const editService = (service) => {
    alert("Edit feature coming soon! Service ID: " + service._id);
    // Future: Trigger modal with service details to edit
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <VendorSidebarLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10"
      >
        <div className="flex items-center justify-between mb-8 flex-col md:flex-row gap-4">
  <h1 className="text-3xl font-extrabold text-gray-900 text-center md:text-left">
    🛠 Manage Your Services
  </h1>

  <button
    onClick={() => setShowModal(true)}
    className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-md text-white font-semibold shadow-md transition"
  >
    <span className="mr-2 text-xl">➕</span> Add Service
  </button>
</div>


        <AnimatePresence>
          {showModal && (
            <AddServiceModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onServiceAdded={() => {
                setShowModal(false);
                fetchServices();
              }}
            />
          )}
        </AnimatePresence>

        {loading ? (
          <p className="text-center text-gray-500">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            You have not added any services yet.
          </p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceCard
                  service={service}
                  onDelete={() => deleteService(service._id)}
                  onEdit={() => editService(service)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </VendorSidebarLayout>
  );
}

export default ManageServices;
