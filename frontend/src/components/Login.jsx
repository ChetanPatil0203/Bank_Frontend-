import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function Login({ sidebarOpen = true }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    accountNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div
      className={`flex justify-center mt-16 px-4 transition-all duration-300 ${
        sidebarOpen ? "ml-64" : "ml-20"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-lg border border-blue-200 shadow-2xl rounded-2xl p-10 w-full max-w-lg space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-900">Bank Login</h2>
          <p className="text-gray-600 text-sm">Login with Account Number</p>
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Account Number
          </label>
          <input
            type="number"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="Enter your account number"
            required
            className="w-full border border-blue-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg bg-white/90"
          />
        </div>

        {/* Password with Show/Hide */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full border border-blue-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg bg-white/90 pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-700"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-2xl py-3 font-medium hover:bg-blue-700 transition shadow-lg"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Forgot Password?{" "}
          <span className="text-blue-600 font-medium cursor-pointer">
            Reset Here
          </span>
        </p>
      </form>
    </div>
  );
}
