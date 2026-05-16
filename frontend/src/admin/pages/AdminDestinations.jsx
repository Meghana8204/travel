import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import adminApi from "../api/adminApi";
import AdminPageHeader from "../components/AdminPageHeader";
import { toApiAssetUrl } from "../../config/api";

const emptyForm = {
  name: "",
  landscape: "",
  description: "",
  rating: "",
  price: "",
  duration: "",
  popular: false,
  image: null,
};

const landscapeOptions = ["Beach", "Mountain", "Heritage", "City"];

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const loadDestinations = async () => {
    try {
      const response = await adminApi.get("/admin/destinations");
      setDestinations(response.data.destinations);
    } catch {
      toast.error("Failed to load destinations");
    }
  };

  useEffect(() => {
    loadDestinations();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "image") {
        if (value) data.append(key, value);
      } else {
        data.append(key, value);
      }
    });

    try {
      if (editingId) {
        await adminApi.put(`/admin/destinations/${editingId}`, data);
        toast.success("Destination updated");
      } else {
        await adminApi.post("/admin/destinations", data);
        toast.success("Destination created");
      }

      setEditingId(null);
      setForm(emptyForm);
      loadDestinations();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save destination");
    }
  };

  const startEdit = (destination) => {
    setEditingId(destination._id);
    setForm({
      name: destination.name || "",
      landscape: destination.landscape || "",
      description: destination.description || "",
      rating: destination.rating || "",
      price: destination.price || "",
      duration: destination.duration || "",
      popular: Boolean(destination.popular),
      image: null,
    });
  };

  const deleteDestination = async (id) => {
    if (!window.confirm("Delete this destination?")) return;

    try {
      await adminApi.delete(`/admin/destinations/${id}`);
      setDestinations((current) => current.filter((destination) => destination._id !== id));
      toast.success("Destination deleted");
    } catch {
      toast.error("Could not delete destination");
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminPageHeader
        title="Destinations"
        subtitle="Create and maintain travel packages."
      />

      <form onSubmit={handleSubmit} className="mb-6 grid gap-4 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2">
        <input className="rounded-xl border p-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <select className="rounded-xl border p-3" value={form.landscape} onChange={(e) => setForm({ ...form, landscape: e.target.value })} required>
          <option value="">Select landscape</option>
          {landscapeOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <input className="rounded-xl border p-3" placeholder="Rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} required />
        <input className="rounded-xl border p-3" placeholder="Price" type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input className="rounded-xl border p-3" placeholder="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} required />
        <input className="rounded-xl border p-3" type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })} required={!editingId} />
        <textarea className="rounded-xl border p-3 md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} />
          Popular destination
        </label>
        <div className="flex gap-2 md:justify-end">
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="rounded-xl bg-slate-200 px-4 py-2">
              Cancel
            </button>
          )}
          <button className="rounded-xl bg-slate-900 px-4 py-2 text-white">
            {editingId ? "Update" : "Create"}
          </button>
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {destinations.map((destination) => (
          <div key={destination._id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
            {destination.image && (
              <img src={toApiAssetUrl(destination.image)} alt={destination.name} className="h-44 w-full object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{destination.name}</h3>
              <p className="text-sm text-slate-600">{destination.landscape}</p>
              <p className="mt-2 text-sm">₹{destination.price} · {destination.duration}</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => startEdit(destination)} className="rounded-lg bg-blue-100 px-3 py-1 text-blue-700">
                  Edit
                </button>
                <button onClick={() => deleteDestination(destination._id)} className="rounded-lg bg-red-100 px-3 py-1 text-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminDestinations;
