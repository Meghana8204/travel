import { motion } from "framer-motion";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaPlane,
} from "react-icons/fa";

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import { API_BASE_URL } from "../config/api";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate Form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post(`${API_BASE_URL}/register`, formData);

      toast.success("Signup successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error);

      toast.error(
        error.response?.data?.message || "Signup failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-400 via-cyan-400 to-blue-500 flex items-center justify-center p-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="relative w-full max-w-4xl"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Section */}
            <motion.div
              initial={{
                x: -50,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.3,
                duration: 0.8,
              }}
              className="lg:w-1/2 bg-linear-to-br from-blue-600/90 to-purple-700/90 p-12 text-white flex flex-col justify-center relative overflow-hidden"
            >
              {/* Floating Elements */}
              <div className="absolute top-10 left-10 animate-bounce">
                <FaPlane className="text-4xl text-white/30" />
              </div>

              <div className="absolute bottom-10 right-10 animate-pulse">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✈️</span>
                </div>
              </div>

              <div className="relative z-10">
                <motion.h1
                  initial={{
                    y: 20,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.5,
                  }}
                  className="text-4xl lg:text-5xl font-bold mb-6"
                >
                  Start Your
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-orange-300">
                    Adventure
                  </span>
                </motion.h1>

                <motion.p
                  initial={{
                    y: 20,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.7,
                  }}
                  className="text-lg text-blue-100 mb-8 leading-relaxed"
                >
                  Join thousands of travelers exploring the world.
                </motion.p>
              </div>
            </motion.div>

            {/* Right Section */}
            <motion.div
              initial={{
                x: 50,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.3,
                duration: 0.8,
              }}
              className="lg:w-1/2 p-8 lg:p-12 bg-white"
            >
              <div className="max-w-md mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Create Account
                </h2>

                <p className="text-gray-600 mb-8">
                  Sign up to start your journey
                </p>

                <form onSubmit={handleSignup} className="space-y-6">
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>

                    <div className="relative">
                      <input
                        name="username"
                        type="text"
                        required
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl bg-gray-50"
                        placeholder="Choose username"
                      />

                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    {errors.username && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.username}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>

                    <div className="relative">
                      <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl bg-gray-50"
                        placeholder="Enter email"
                      />

                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>

                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-xl bg-gray-50"
                        placeholder="Create password"
                      />

                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>

                    <div className="relative">
                      <input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-xl bg-gray-50"
                        placeholder="Confirm password"
                      />

                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg"
                  >
                    Create Account
                  </motion.button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 font-semibold hover:text-blue-700"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <ToastContainer />
    </div>
  );
}
