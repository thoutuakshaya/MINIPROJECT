import { useEffect, useState } from "react";
import axios from "axios";
import OrganizerSidebarLayout from "../../components/OrganizerSidebarLayout";
import { motion, AnimatePresence } from "framer-motion";

const OrganizerProfile = () => {
  const token = localStorage.getItem("userToken");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://miniproject-1-34zo.onrender.com/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setFormData({
          name: res.data.name || "",
          phone: res.data.phone || "",
          bio: res.data.bio || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "https://miniproject-1-34zo.onrender.com/api/users/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(res.data);
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating profile:", err.message);
    }
  };

  if (loading) {
    return (
      <OrganizerSidebarLayout>
        <div className="flex items-center justify-center h-full py-20">
          <p className="text-gray-500 text-lg animate-pulse">Fetching your profile...</p>
        </div>
      </OrganizerSidebarLayout>
    );
  }

  return (
    <OrganizerSidebarLayout>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 mt-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">👤 My Profile</h1>
          <p className="text-gray-500 mt-1">Review and manage your profile information</p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={profile.photo || "/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow-sm"
          />
          <div className="flex-1 space-y-2">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{profile.name || "—"}</h2>
              <p className="text-gray-600">{profile.email || "—"}</p>
              <p className="text-gray-600">{profile.phone || "—"}</p>
            </div>

            <div className="pt-4 space-y-2 text-sm text-gray-700">
              <div>
                <span className="font-medium text-gray-800">📄 Bio:</span>
                <p className="mt-1">{profile.bio || "No bio added yet."}</p>
              </div>
              <div>
                <span className="font-medium text-gray-800">🗓️ Joined:</span>{" "}
                {profile.createdAt ? (
                  <span className="ml-1">
                    {new Date(profile.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                ) : (
                  "—"
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEditModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-lg shadow"
          >
            ✏️ Edit Profile
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showEditModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Profile</h2>

              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Bio"
                  rows="3"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                ></textarea>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </OrganizerSidebarLayout>
  );
};

export default OrganizerProfile;
