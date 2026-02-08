import { useState } from "react";
import { Wallet } from "lucide-react";

export default function Deposit({ sidebarOpen = true }) {
  const [formData, setFormData] = useState({
    accountNumber: "",
    amount: "",
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Deposit Data:", formData);
  };

  return (
    <div
      className={`flex justify-center mt-16 px-4 transition-all duration-300 ${
        sidebarOpen ? "ml-64" : "ml-20"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-lg border border-blue-200 shadow-2xl rounded-2xl p-10 w-full max-w-2xl space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <Wallet size={40} className="mx-auto text-blue-700 mb-2" />
          <h2 className="text-2xl font-bold text-blue-900">
            Cash Deposit
          </h2>
          <p className="text-gray-600 text-sm">
            Deposit money safely to your account
          </p>
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
            placeholder="Enter account number"
            required
            className="w-full border border-blue-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg bg-white/90"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Deposit Amount (₹)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Minimum ₹100"
            required
            className="w-full border border-blue-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg bg-white/90"
          />
        </div>

        {/* Remark */}
        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Remark (Optional)
          </label>
          <textarea
            name="remark"
            value={formData.remark}
            onChange={handleChange}
            placeholder="Enter remark (if any)"
            rows="3"
            className="w-full border border-blue-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg bg-white/90"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
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
            Deposit Now
          </button>
        </div>
      </form>
    </div>
  );
}
