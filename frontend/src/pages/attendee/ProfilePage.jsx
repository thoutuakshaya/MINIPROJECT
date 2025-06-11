import { useEffect, useState } from "react";
import AttendeeSidebarLayout from "../../components/AttendeeSidebarLayout";
import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // 🔐 Set this if you're using a token
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users/profile", config);
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/users/profile", profile, config);
      setMessage("✅ Profile updated successfully.");
    } catch (error) {
      setMessage("❌ Error updating profile.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AttendeeSidebarLayout>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">👤 My Profile</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block">Email </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                className="w-full p-2 bg-gray-100 border rounded"
              />
            </div>

            <div>
              <label className="block">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block">Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block">Photo URL</label>
              <input
                type="text"
                name="photo"
                value={profile.photo}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {profile.photo && (
                <img
                  src={profile.photo}
                  alt="Profile Preview"
                  className="mt-2 w-20 h-20 rounded-full object-cover"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Save Changes
            </button>
            {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
          </form>
        )}
      </div>
    </AttendeeSidebarLayout>
  );
};

export default ProfilePage;
