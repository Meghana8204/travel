import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { API_BASE_URL } from "../config/api";

const travelImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80",

  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=700&q=80",

  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=700&q=80",
];

export default function Login() {
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(0);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Background Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % travelImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        formData,
      );

      toast.success("Login successful!");

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      setTimeout(() => {
        if (response.data.user?.role === "admin") {
          localStorage.setItem("adminToken", response.data.token);
          localStorage.setItem("adminUser", JSON.stringify(response.data.user));
          navigate("/admin/dashboard");
          return;
        }

        navigate("/home");
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${travelImages[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(10px)",
          }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />

        {/* Main Container */}
        <motion.div
          initial={{
            opacity: 0,
            x: 100,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="relative z-10 flex flex-col md:flex-row w-full max-w-4xl bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Left Side Carousel */}
          <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={travelImages[currentImage]}
                alt="Travel"
                className="w-full h-full object-cover absolute inset-0"
                initial={{
                  x: 300,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={{
                  x: -300,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              />
            </AnimatePresence>
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="md:w-1/2 p-8 flex flex-col justify-center bg-gray-50/70 backdrop-blur-sm"
          >
            {/* Heading */}
            <motion.h1
              className="text-4xl font-extrabold mb-4 text-gray-800 text-center"
              initial={{
                y: -20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              Login
            </motion.h1>

            {/* Subheading */}
            <motion.h2
              className="text-2xl font-bold mb-6 text-gray-800 text-center"
              initial={{
                y: -10,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
            >
              Explore the Beauty of Karnataka
            </motion.h2>

            {/* Email */}
            <motion.div
              className="flex items-center mb-4 border border-gray-400 rounded-lg px-3"
              whileFocus={{
                scale: 1.02,
              }}
            >
              <input
                className="w-full outline-none py-2.5 text-gray-900 placeholder-gray-800 bg-transparent"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </motion.div>

            {/* Password */}
            <motion.div
              className="flex items-center mb-4 border border-gray-400 rounded-lg px-3"
              whileFocus={{
                scale: 1.02,
              }}
            >
              <input
                className="flex-1 outline-none py-2.5 text-gray-900 placeholder-gray-800 bg-transparent"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </motion.div>

            {/* Remember */}
            <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="accent-blue-500"
                />

                <label htmlFor="remember">Remember me</label>
              </div>

              <button type="button" className="text-blue-500 hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 transition-all py-2.5 rounded-lg text-white font-semibold shadow-md"
            >
              Log In
            </motion.button>

            {/* Footer */}
            <p className="text-center mt-6 text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </>
  );
}
