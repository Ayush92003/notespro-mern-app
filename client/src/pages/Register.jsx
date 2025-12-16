import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="bg-[#fdfdfd] rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create your account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Start managing your notes securely
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              name="name"
              placeholder="Your name"
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create a strong password"
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="w-full bg-emerald-600 text-white py-3 rounded-lg cursor-pointer
            hover:bg-emerald-700 transition font-medium"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-emerald-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
