import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import BookingStatus from "./pages/BookingStatus";
import ProtectedRoute from "./Compoents/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import Destination from "./pages/Destination";
import About from "./pages/About";
import PackageDetails from "./pages/PackageDetails";
import Contact from "./pages/Contact";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminDestinations from "./admin/pages/AdminDestinations";
import AdminBookings from "./admin/pages/AdminBookings";
import AdminRoute from "./admin/components/AdminRoute";
import AdminLayout from "./admin/components/AdminLayout";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-status" element={<ProtectedRoute><BookingStatus /></ProtectedRoute>} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/package-details" element={<PackageDetails />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="destinations" element={<AdminDestinations />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
