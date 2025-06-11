import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewProfile = () => {
  const { id } = useParams(); // get the user id from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user details from your backend
    axios
      .get(`https://miniproject-1-34zo.onrender.com/api/users/${id}`) // adjust this URL to your backend user API
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("User not found or error fetching data");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* add other user details as needed */}
    </div>
  );
};

export default ViewProfile;
