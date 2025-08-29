import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "STUDENT", code: "" });
  const navigate = useNavigate();
  const [codeRequested, setCodeRequested] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requestCode = async () => {
    try {
      const res = await api.post("/api/auth/request-code");
      alert(res.data.message);
      setCodeRequested(true);
    } catch (err) {
      alert("Failed to request code");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/signup", formData);
      alert(res.data.message);
      if (res.data.status === "success") navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white" />

          {/* Role Selection */}
          <select name="role" onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white">
            <option value="STUDENT">Student</option>
            <option value="ADMIN">Admin</option>
          </select>

          {/* Show verification for admin */}
          {formData.role === "ADMIN" && (
            <div>
              <button type="button" onClick={requestCode}
                className="mb-2 w-full py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition">
                Request Verification Code
              </button>
              {codeRequested && (
                <input type="text" name="code" placeholder="Enter Verification Code" onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white" />
              )}
            </div>
          )}

          <button className="w-full py-3 bg-indigo-500 rounded-lg font-semibold hover:bg-indigo-600 transition">
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account? <Link to="/login" className="text-indigo-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
