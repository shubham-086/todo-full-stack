import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "other",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!/^[a-zA-Z\s]{3,50}$/.test(form.name)) {
      newErrors.name = "Name must be 3-50 letters only";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (form.phone && !/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password)) {
      newErrors.password = "Min 8 chars, 1 uppercase, 1 lowercase, 1 number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await axios.post("http://localhost:3000/api/auth/signup", form, {
        withCredentials: true,
      });

      navigate("/");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Task Manager
          </h1>
          <p className="text-gray-500 text-sm mt-1">Create your account 🚀</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-1">Sign Up</h2>
          <p className="text-gray-500 text-sm mb-5">Start organizing your tasks efficiently</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
              <div className="relative">
                <input
                  name="name"
                  placeholder="e.g. John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 bg-gray-50 
                  focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 
                  focus:border-purple-500 transition-all shadow-sm"
                />
                <span className="absolute right-3 top-3 text-gray-400">👤</span>
              </div>
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Email</label>
              <div className="relative">
                <input
                  name="email"
                  placeholder="e.g. john@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 bg-gray-50 
                  focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 
                  focus:border-purple-500 transition-all shadow-sm"
                />
                <span className="absolute right-3 top-3 text-gray-400">📧</span>
              </div>
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Gender + Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                  focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 
                  focus:border-purple-500 transition-all shadow-sm"
                >
                  <option value="other">Other</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Phone</label>
                <input
                  name="phone"
                  placeholder="10-digit number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                  focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 
                  focus:border-purple-500 transition-all shadow-sm"
                />
                {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min 8 chars, include A-Z, a-z, 0-9"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 bg-gray-50 
                  focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 
                  focus:border-purple-500 transition-all shadow-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Button */}
            <button
              className="w-full py-3 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-purple-600 to-indigo-600 
              hover:from-purple-700 hover:to-indigo-700 
              transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-gray-500 mt-5">
            Already have an account?{" "}
            <Link to="/" className="text-purple-600 font-medium cursor-pointer hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
