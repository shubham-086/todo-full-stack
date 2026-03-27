import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/auth/login", form, {
        withCredentials: true,
      });

      navigate("/task-manager");
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
          <p className="text-gray-500 text-sm mt-1">Welcome back 👋</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-1">Login</h2>
          <p className="text-gray-500 text-sm mb-5">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 bg-gray-50 
                  focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 
                  focus:border-purple-500 transition-all shadow-sm"
                />

                {/* Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Extra row */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-purple-600" />
                Remember me
              </label>

              <button type="button" className="text-purple-600 hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Button */}
            <button
              className="w-full py-3 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-purple-600 to-indigo-600 
              hover:from-purple-700 hover:to-indigo-700 
              transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-gray-500 mt-5">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-600 font-medium cursor-pointer hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
