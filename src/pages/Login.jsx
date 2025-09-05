import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);
      alert(res.data.message);

      if (res.data.status === "success") {
        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));

        // 🔹 Redirect based on role
        if (user.role === "ADMIN") {
          navigate("/adminDashboard");
        } else if (user.role === "STUDENT") {
          navigate("/studentDashboard");
        } else {
          navigate("/"); // fallback if role is unknown
        }
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />
          <button className="w-full py-3 bg-indigo-500 rounded-lg font-semibold hover:bg-indigo-600 transition">
            Login
          </button>
        </form>
        <p className="text-sm text-gray-400 mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
