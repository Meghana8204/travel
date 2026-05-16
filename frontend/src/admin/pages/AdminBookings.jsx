import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import adminApi from "../api/adminApi";
import AdminPageHeader from "../components/AdminPageHeader";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await adminApi.get("/admin/bookings");
        setBookings(response.data.bookings);
      } catch {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await adminApi.put(`/admin/bookings/${id}/status`, { status });
      setBookings((current) =>
        current.map((booking) => (booking.id === id ? { ...booking, status } : booking)),
      );
      toast.success("Booking updated");
    } catch {
      toast.error("Could not update booking");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await adminApi.delete(`/admin/bookings/${id}`);
      setBookings((current) => current.filter((booking) => booking.id !== id));
      toast.success("Booking deleted");
    } catch {
      toast.error("Could not delete booking");
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminPageHeader title="Bookings" subtitle="Review and update booking status." />
      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-4">User</th>
              <th>Destination</th>
              <th>Travel Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-slate-100">
                  <td className="p-4">{booking.user}</td>
                  <td>{booking.destination}</td>
                  <td>{booking.travelDate}</td>
                  <td>₹{booking.totalAmount}</td>
                  <td>
                    <select
                      value={booking.status}
                      onChange={(e) => updateStatus(booking.id, e.target.value)}
                      className="rounded-lg border border-slate-300 px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="rounded-lg bg-red-100 px-3 py-1 text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && <p className="p-4">Loading bookings...</p>}
      </div>
    </>
  );
};

export default AdminBookings;
