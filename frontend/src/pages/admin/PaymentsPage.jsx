import SidebarLayout from "../../components/AdminLeftbar";

function PaymentsPage() {
  const payments = [
    {
      id: 1,
      attendee: "Raj Kumar",
      event: "AI & Robotics Summit",
      amount: 499,
      status: "Completed",
      date: "2025-05-28",
      method: "UPI",
    },
    {
      id: 2,
      attendee: "Akshaya",
      event: "Women in Tech Conference",
      amount: 699,
      status: "Pending",
      date: "2025-05-27",
      method: "Credit Card",
    },
    {
      id: 2,
      attendee: "Haripriya",
      event: "Women in Tech Conference",
      amount: 699,
      status: "Completed",
      date: "2025-05-27",
      method: "Credit Card",
    },
    {
      id: 3,
      attendee: "Umesh",
      event: "Startup Growth Meetup",
      amount: 299,
      status: "Refunded",
      date: "2025-05-26",
      method: "Net Banking",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Refunded":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <SidebarLayout>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">💳 Entry Fee Payments</h1>
          <p className="text-gray-500">View all attendee payments for event registrations.</p>
        </div>

        <div className="bg-white shadow rounded-lg border border-gray-200 overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">Attendee</th>
                <th className="px-6 py-3">Event Name</th>
                <th className="px-6 py-3">Entry Fee (₹)</th>
                <th className="px-6 py-3">Payment Method</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date Paid</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{payment.attendee}</td>
                  <td className="px-6 py-4">{payment.event}</td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">₹{payment.amount}</td>
                  <td className="px-6 py-4">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Optional Future Feature: Filters, Search, Export CSV, Refund Action */}
      </div>
    </SidebarLayout>
  );
}

export default PaymentsPage;
