import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const navigate = useNavigate();

  /* ------------------ COMMON INPUT CLASS (Reusable) ------------------ */
 const inputClass =
  "w-full bg-white/5 text-white text-sm border border-white/10 rounded-xl px-4 py-3.5 " +
  "placeholder:text-zinc-400 transition-all duration-300 " +
  "outline-none focus:outline-none focus:ring-0 " +
  "focus:border-[#3B82F6]";

  const labelClass =
    "text-xs font-medium text-zinc-400 ml-1 mb-1 block";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    address: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  /* ------------------ HANDLE CHANGE ------------------ */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  /* ------------------ HANDLE SUBMIT ------------------ */
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
    const userExists = existingUsers.find(
      (user) => user.email === formData.email
    );

    if (userExists) {
      setError("This email is already registered! Please login instead.");
      return;
    }

    existingUsers.push(formData);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Registration Successful ✅");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021029] via-[#051e47] to-[#0A2A66] flex items-center justify-center px-4 py-10">

      {/* Form Card */}
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-zinc-400 text-sm mt-2">
            Fill All Details Carefully To Register
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Full Name" name="name" handleChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <Input label="Email Address" name="email" type="email" handleChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Mobile Number" name="mobile" handleChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            
            <div>
              <label className={labelClass}>
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="" className="text-black">Select Gender</option>
                <option value="Male" className="text-black">Male</option>
                <option value="Female" className="text-black">Female</option>
                <option value="Other" className="text-black">Other</option>
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Date of Birth" name="dob" type="date" handleChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <Input label="Address" name="address" handleChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
          </div>

          {/* Password Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Password */}
            <div className="relative">
              <label className={labelClass}>
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-gray-400 hover:text-white"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className={labelClass}>
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={inputClass}
                placeholder="Confirm Password"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-[38px] text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-center pt-3">
            <button
              type="submit"
              className="w-full md:w-72 bg-[#6F5FE7] hover:bg-[#5b4ec2] text-white font-semibold rounded-xl py-3.5 transition-all transform active:scale-[0.98] shadow-lg"
            >
              Create Account
            </button>
          </div>

        </form>

        {/* Login */}
        <div className="mt-6 text-center">
          <p className="text-zinc-400 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#6F5FE7] font-semibold"
            >
              Login here
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

/* ------------------ REUSABLE INPUT ------------------ */
function Input({ label, name, handleChange, type = "text", inputClass, labelClass }) {
  return (
    <div>
      <label className={labelClass}>
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        className={inputClass}
        placeholder={label}
        required
      />
    </div>
  );
}