import { useEffect, useState } from "react";
import axios from "axios";
import ExpertSidebarLayout from "../../components/ExpertSidebarLayout";

function ExpertReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("https://miniproject-1-34zo.onrender.com/api/experts/reviews", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // console.log("Fetched reviews:", res.data);

        // Normalize data: ensure it's an array
        const data = res.data;
        const reviewsArray = Array.isArray(data)
          ? data
          : Array.isArray(data.reviews)
          ? data.reviews
          : [];

        setReviews(reviewsArray);
      } catch (err) {
        console.error("Failed to load reviews:", err.message);
        setError("Unable to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <ExpertSidebarLayout>
      <h1 className="text-2xl font-bold mb-4">⭐ Your Reviews</h1>

      {loading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r._id} className="bg-white shadow p-4 rounded">
              <p><strong>From:</strong> {r.organizer?.name || "Anonymous"}</p>
              <p><strong>Rating:</strong> {r.rating}/5</p>
              <p><strong>Comment:</strong> {r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </ExpertSidebarLayout>
  );
}

export default ExpertReviews;
