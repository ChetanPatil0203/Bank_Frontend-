import { Eye, EyeOff, Landmark } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate()

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
    <div className="min-h-screen bg-[#0D0D11] flex items-center justify-center px-4">

      <div className="max-w-md w-full bg-[#18181b]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl p-8">

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
            className="w-full bg-[#27272a]/50 text-white text-sm border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#6F5FE7] focus:ring-1 focus:ring-[#6F5FE7] transition-all placeholder:text-zinc-600"
          />

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                className="w-full bg-[#27272a]/50 text-white text-sm border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#6F5FE7] focus:ring-1 focus:ring-[#6F5FE7] transition-all placeholder:text-zinc-600"
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
            <label className="flex items-center gap-2 text-zinc-400">
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
          <button 
          onClick={() => navigate("/dashboard")}
          className="w-full md:w-64 bg-[#6F5FE7] hover:bg-[#5b4ec2] text-white font-semibold rounded-xl py-3.5 transition-all transform active:scale-[0.98] shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed">
            
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
