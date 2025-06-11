import SidebarLayout from "../../components/AdminLeftbar";

function ReviewsPage() {
  // Sample data – replace with fetched data later
  const reviews = [
    {
      id: 1,
      user: "Raj",
      event: "Corporate Meet",
      comment: "Amazing coordination and decoration!",
      rating: 5,
      date: "2025-05-25",
    },
    {
      id: 2,
      user: "Umesh",
      event: "AI webinar",
      comment: "Good event",
      rating: 3,
      date: "2025-05-22",
    },
  ];

  return (
    <SidebarLayout>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">⭐ Reviews Management</h1>
          <p className="text-gray-500">Review and moderate feedback submitted by users for different events.</p>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Event</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-6 py-3">Comment</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{review.user}</td>
                  <td className="px-6 py-4">{review.event}</td>
                  <td className="px-6 py-4 text-yellow-500">{'⭐'.repeat(review.rating)}</td>
                  <td className="px-6 py-4 text-gray-700">{review.comment}</td>
                  <td className="px-6 py-4 text-gray-500">{review.date}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button className="text-green-600 hover:underline hover:text-green-700">Approve</button>
                    <button className="text-red-600 hover:underline hover:text-red-700">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Future: Add search, filter, pagination */}
      </div>
    </SidebarLayout>
  );
}

export default ReviewsPage;
