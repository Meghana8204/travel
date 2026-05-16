import { useEffect, useState } from "react";
import adminApi from "../api/adminApi";
import AdminPageHeader from "../components/AdminPageHeader";

const cards = [
  { key: "totalUsers", label: "Users", changeKey: "usersChange" },
  { key: "totalBookings", label: "Bookings", changeKey: "bookingsChange" },
  { key: "totalDestinations", label: "Destinations", changeKey: "destinationsChange" },
  { key: "totalRevenue", label: "Revenue", changeKey: "revenueChange" },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsResponse, bookingsResponse] = await Promise.all([
          adminApi.get("/admin/stats"),
          adminApi.get("/admin/bookings/recent"),
        ]);
        setStats(statsResponse.data);
        setRecentBookings(bookingsResponse.data);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        subtitle="A quick view of the travel business."
      />

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cards.map(({ key, label, changeKey }) => (
              <div key={key} className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold">
                  {key === "totalRevenue" ? `₹${stats?.[key] || 0}` : stats?.[key] || 0}
                </p>
                <p className="mt-2 text-sm text-emerald-600">
                  {stats?.[changeKey] || "0"} vs last month
                </p>
              </div>
            ))}
          </div>

          <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold">Recent Bookings</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-slate-500">
                  <tr>
                    <th className="py-2">User</th>
                    <th>Destination</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-t border-slate-100">
                      <td className="py-3">{booking.user}</td>
                      <td>{booking.destination}</td>
                      <td>{booking.date}</td>
                      <td className="capitalize">{booking.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AdminDashboard;
