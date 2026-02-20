import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters ⚠️");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password & Confirm Password mismatch ❌");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.find(user => user.email === formData.email);

    if (userExists) {
      setError("This email is already registered! Please login instead.");
      return;
    }

    existingUsers.push({
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      gender: formData.gender
    });
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Registration Successful ✅");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0D0D11] flex items-center justify-center px-4 py-10">

      {/* Form Container */}
      <div className="w-full max-w-3xl bg-[#18181b]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white">Registration</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Row 1: Full Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" name="name" handleChange={handleChange} />
            <Input label="Email" name="email" type="email" handleChange={handleChange} />
          </div>

          {/* Row 2: Mobile + Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Mobile Number" name="mobile" handleChange={handleChange} />
            <div>
              <label className="text-xs font-medium text-zinc-400 ml-1 mb-1 block">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-[#27272a]/50 text-white text-sm border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#6F5FE7] focus:ring-1 focus:ring-[#6F5FE7] transition-all placeholder:text-zinc-600"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 3: Password + Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <div className="relative">
              <label className="text-xs font-medium text-zinc-400 ml-1 mb-1 block">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#27272a]/50 text-white text-sm border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#6F5FE7] focus:ring-1 focus:ring-[#6F5FE7] transition-all placeholder:text-zinc-600"
                placeholder="Enter Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="text-xs font-medium text-zinc-400 ml-1 mb-1 block">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-[#27272a]/50 text-white text-sm border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#6F5FE7] focus:ring-1 focus:ring-[#6F5FE7] transition-all placeholder:text-zinc-600"
                placeholder="Confirm Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-200"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-2 p-3 bg-red-50/20 border border-red-200/30 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
              {error.includes("already registered") && (
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-200 underline text-sm mt-1 hover:text-white"
                >
                  Go to Login →
                </button>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="w-full md:w-64 bg-[#6F5FE7] hover:bg-[#5b4ec2] text-white font-semibold rounded-xl py-3.5 transition-all transform active:scale-[0.98] shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Register
            </button>
          </div>

        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-zinc-400 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold"
            >
              Login here
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

/* ---------- Reusable Input Component ---------- */
function Input({ label, name, handleChange, type = "text" }) {
  return (
    <div>
      <label className="text-xs font-medium text-zinc-400 ml-1 mb-1 block">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        className="w-full bg-[#27272a]/50 text-white text-sm border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#6F5FE7] focus:ring-1 focus:ring-[#6F5FE7] transition-all placeholder:text-zinc-600"
        placeholder={label}
        required
      />
    </div>
  );
}