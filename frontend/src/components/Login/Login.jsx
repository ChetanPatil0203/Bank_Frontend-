import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  /* ------------------ COMMON STYLES ------------------ */

  const inputClass =
    "w-full bg-white/5 text-white text-sm border border-white/10 rounded-xl px-4 py-3 md:py-3.5 " +
    "placeholder:text-zinc-400 transition-all duration-300 " +
    "outline-none focus:outline-none focus:ring-0 " +
    "focus:border-[#3B82F6] focus:bg-white/10";

  const labelClass =
    "text-xs font-medium text-zinc-400 ml-1 mb-1 block";

  const buttonClass =
    "w-full bg-[#6F5FE7] hover:bg-[#5b4ec2] text-white font-semibold rounded-xl py-3 md:py-3.5 " +
    "transition-all transform active:scale-[0.98] shadow-lg";

  /* ------------------ STATE ------------------ */

  const [formData, setFormData] = useState({
    accountNumber: "",
    password: "",
    remember: false
  });

  const [showPassword, setShowPassword] = useState(false);

  /* ------------------ HANDLE CHANGE ------------------ */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  /* ------------------ HANDLE SUBMIT ------------------ */

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Login Successful ✅");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021029] via-[#051e47] to-[#0A2A66] flex items-center justify-center px-4 sm:px-6">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">

        {/* HEADER */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            User Login
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Access your banking dashboard safely
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

          {/* Account Number */}
          <Input
            label="Account Number"
            name="accountNumber"
            placeholder="Enter Account Number"
            handleChange={handleChange}
            inputClass={inputClass}
            labelClass={labelClass}
          />

          {/* Password */}
          <div className="relative">
            <label className={labelClass}>
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              className={inputClass}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[34px] sm:top-[38px] text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-zinc-400">
              <input
                type="checkbox"
                name="remember"
                onChange={handleChange}
                className="accent-[#6F5FE7]"
              />
              Remember Me
            </label>

            <span className="text-[#6F5FE7] cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={buttonClass}
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}


/* ------------------ REUSABLE INPUT ------------------ */

function Input({
  label,
  name,
  type = "text",
  placeholder,
  handleChange,
  inputClass,
  labelClass
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className={inputClass}
        required
      />
    </div>
  );
}