import { useEffect, useState } from "react";
import axios from "axios";
import ExpertSidebarLayout from "../../components/ExpertSidebarLayout";
import { motion } from "framer-motion";

function ExpertProfile() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
    photo: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data || {};
        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          bio: data.bio || "",
          photo: data.photo || "",
        });
      } catch (err) {
        setError("Failed to load profile data.");
        console.error("Profile fetch failed:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await axios.put("http://localhost:5000/api/users/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Profile update failed. Please try again.");
      console.error("Profile update failed:", err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ExpertSidebarLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          👤 Update Expert Profile
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading profile...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="text-red-600 text-center font-medium">{error}</p>
            )}

            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            <InputField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              type="tel"
            />
            <TextareaField
              label="Short Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Write a brief bio"
            />
            <InputField
              label="Photo URL"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="Paste your photo URL"
              type="url"
            />

            {/* Photo Preview */}
            {formData.photo && (
              <div className="flex justify-center mt-4">
                <img
                  src={formData.photo}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full border-2 border-blue-500 shadow-sm"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/128?text=Invalid+URL";
                  }}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className={`w-full py-3 rounded-md font-semibold text-white transition-colors ${
                saving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
      </motion.div>
    </ExpertSidebarLayout>
  );
}

// Reusable input field component
function InputField({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block text-gray-700 font-medium">
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
    </label>
  );
}

// Reusable textarea component
function TextareaField({ label, name, value, onChange, placeholder }) {
  return (
    <label className="block text-gray-700 font-medium">
      {label}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        required
        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
    </label>
  );
}

export default ExpertProfile;
