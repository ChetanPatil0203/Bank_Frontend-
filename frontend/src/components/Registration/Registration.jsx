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

    // Validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters ⚠️");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password & Confirm Password mismatch ❌");
      return;
    }

    // Mock check: यहाँ आप backend से check कर सकते हैं
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.find(user => user.email === formData.email);

    if (userExists) {
      setError("This email is already registered! Please login instead.");
      return;
    }

    // Save user
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
    <div className="min-h-screen bg-gradient-to-br from-blue-200/40 to-indigo-200/40 flex items-center justify-center px-4 py-8min-h-screen bg-gray-500/30 backdrop-blur-lg flex items-center justify-center px-4 py-8min-h-screen bg-zinc-400/25 backdrop-blur-xl flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">
            Registration
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full Name" name="name" handleChange={handleChange}/>
            <Input label="Email" name="email" type="email" handleChange={handleChange}/>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <Input label="Mobile Number" name="mobile" handleChange={handleChange}/>

            <div>
              <label className="font-semibold text-gray-700">
                Gender <span className="text-red-500">*</span>
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="font-semibold text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 mt-1 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="font-semibold text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 mt-1 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            {error && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">{error}</p>
                {error.includes("already registered") && (
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-blue-600 underline text-sm mt-1 hover:text-blue-800"
                  >
                    Go to Login →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button 
             onClick={() => navigate("/login")}

              type="submit"
              className="px-10 py-3 bg-blue-800 text-white rounded-full font-medium 
                         shadow-md hover:shadow-xl hover:bg-blue-900 transition-all duration-300 tracking-wide">
              
            
              Register
            </button>
          </div>

        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-700 font-semibold hover:text-blue-900 transition-colors"
            >
              Login here
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}


/* ---------- Reusable Input ---------- */

function Input({ label, name, handleChange, type = "text" }) {
  return (
    <div>
      <label className="font-semibold text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        type={type}
        name={name}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
    </div>
  );
}