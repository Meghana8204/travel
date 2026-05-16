import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaChartLine, FaMapMarkedAlt, FaUsers, FaCalendarCheck, FaSignOutAlt } from "react-icons/fa";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: FaChartLine },
  { to: "/admin/users", label: "Users", icon: FaUsers },
  { to: "/admin/destinations", label: "Destinations", icon: FaMapMarkedAlt },
  { to: "/admin/bookings", label: "Bookings", icon: FaCalendarCheck },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("adminUser") || "null");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 md:flex">
      <aside className="bg-slate-900 text-white md:w-72">
        <div className="border-b border-white/10 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-lime-300">Travel</p>
          <h1 className="mt-2 text-2xl font-bold">Admin Panel</h1>
          <p className="mt-2 text-sm text-slate-300">{user?.email}</p>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-lime-400 text-slate-950"
                      : "text-slate-200 hover:bg-white/10"
                  }`
                }
              >
                <Icon />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-200 transition hover:bg-red-500/20 hover:text-red-200"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
