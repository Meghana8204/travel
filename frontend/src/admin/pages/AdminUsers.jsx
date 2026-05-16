import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import adminApi from "../api/adminApi";
import AdminPageHeader from "../components/AdminPageHeader";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const response = await adminApi.get("/admin/users");
      setUsers(response.data.users);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateStatus = async (userId, status) => {
    try {
      await adminApi.put(`/admin/users/${userId}/status`, { status });
      setUsers((current) =>
        current.map((user) => (user.id === userId ? { ...user, status } : user)),
      );
      toast.success("User status updated");
    } catch {
      toast.error("Could not update user");
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await adminApi.delete(`/admin/users/${userId}`);
      setUsers((current) => current.filter((user) => user.id !== userId));
      toast.success("User deleted");
    } catch {
      toast.error("Could not delete user");
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminPageHeader title="Users" subtitle="Manage registered travelers." />
      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              users.map((user) => (
                <tr key={user.id} className="border-t border-slate-100">
                  <td className="p-4">{user.name}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.status}</td>
                  <td>{user.joinDate}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() =>
                        updateStatus(user.id, user.status === "active" ? "inactive" : "active")
                      }
                      className="rounded-lg bg-amber-100 px-3 py-1 text-amber-700"
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="rounded-lg bg-red-100 px-3 py-1 text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && <p className="p-4">Loading users...</p>}
      </div>
    </>
  );
};

export default AdminUsers;
