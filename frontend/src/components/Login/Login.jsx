import { Eye, EyeOff, Landmark } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {

  const [formData, setFormData] = useState({
    accountNumber: "",
    password: "",
    remember: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Login Successful ✅");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8">

        {/* HEADER */}
        <div className="text-center mb-8 flex flex-col items-center">
  <h2 className="text-2xl font-medium text-blue-900">
    User Login
  </h2>

  <p className="text-gray-500 mt-2">
    Access your banking dashboard safely
  </p>
</div>


        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Account Number */}
          <Input
            label="Account Number"
            name="accountNumber"
            placeholder="Enter Account Number"
            handleChange={handleChange}
          />

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                className="w-full border rounded-xl p-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

              {/* Toggle Button */}
             <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-3 flex items-center gap-1 text-gray-500 hover:text-gray-700"
    >
      <span className="text-xs font-medium">
        {showPassword ? "Hide" : "Show"}
      </span>
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>

                </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                onChange={handleChange}
              />
              Remember Me
            </label>

            <span className="text-blue-900 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition">
            Login
          </button>

        </form>

      </div>
    </div>
  );
}


/* ---------- Reusable Input ---------- */

function Input({ label, name, type="text", placeholder, handleChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
    </div>
  );
}
