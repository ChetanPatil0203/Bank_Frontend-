import { useState } from "react";

export default function CreateAccount({ sidebarOpen = true }) {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    address: "",
    accountType: "Savings",
    deposit: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.terms) {
      alert("Please accept Terms & Conditions!");
      return;
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className={`flex justify-center mt-12 px-4 transition-all duration-300 ${
        sidebarOpen ? "ml-64" : "ml-20"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-lg border border-blue-200 shadow-2xl rounded-2xl p-10 w-full max-w-4xl space-y-6 transition-all duration-300"
      >
        {/* Header */}
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-6">
          Create New Account
        </h2>

        {/* Full Name */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="w-full border border-blue-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg bg-white/90"
          />
        </div>

        {/* DOB & Gender */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-800 font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full border border-blue-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg bg-white/90"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-800 font-medium mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border border-blue-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg bg-white/90"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Email & Mobile */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-800 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
              className="w-full border border-blue-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg bg-white/90"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-800 font-medium mb-1">Mobile</label>
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10-digit mobile"
              required
              className="w-full border border-blue-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg bg-white/90"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            rows="3"
            className="w-full border border-blue-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg bg-white/90"
          />
        </div>

        {/* Account Type & Deposit */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-800 font-medium mb-1">Account Type</label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg bg-white/90"
            >
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-gray-800 font-medium mb-1">Initial Deposit</label>
            <input
              type="number"
              name="deposit"
              value={formData.deposit}
              onChange={handleChange}
              placeholder="Minimum ₹1000"
              required
              className="w-full border border-blue-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg bg-white/90"
            />
          </div>
        </div>

        {/* Password & Confirm */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-800 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-blue-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg bg-white/90"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-800 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-blue-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg bg-white/90"
            />
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className="w-5 h-5 accent-blue-600"
            required
          />
          <label className="text-gray-800 text-sm">
            I accept the <span className="text-blue-600 font-medium">Terms & Conditions</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            type="reset"
            className="flex-1 bg-gray-200 text-gray-700 rounded-2xl py-3 font-medium hover:bg-gray-300 transition"
          >
            Clear
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white rounded-2xl py-3 font-medium hover:bg-blue-700 transition shadow-lg"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
