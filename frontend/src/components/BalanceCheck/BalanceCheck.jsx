import { useState } from "react";

export default function BalanceCheck() {

  const [formData, setFormData] = useState({
    accountNumber: "",
    accountHolder: "",
    accountType: "",
  });

  const [balance, setBalance] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBalance("₹ 45,250.00");
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-100">

      <div 
        className="max-w-5xl mx-auto bg-white rounded-2xl p-10
        transform transition-all duration-700 
        translate-y-10 opacity-0 animate-[slideUp_0.7s_forwards]"
      >

        {/* HEADER */}
        <div className="text-center mb-10 pb-6">
          <h2 className="text-2xl font-medium text-blue-900">
            Balance Check
          </h2>

          <p className="text-gray-500 mt-2">
            View Your Account Balance Securely
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* ACCOUNT DETAILS */}
          <Section title="Account Details">

            <Input
              label="Account Number"
              name="accountNumber"
              placeholder="Enter Account Number"
              handleChange={handleChange}
            />

            <Input
              label="Account Holder Name"
              name="accountHolder"
              placeholder="Enter Account Holder Name"
              handleChange={handleChange}
            />

            {/* Account Type */}
            <div>
              <label className="block font-medium mb-1">
                Account Type <span className="text-red-500">*</span>
              </label>

              <select
                name="accountType"
                onChange={handleChange}
                className="rounded-xl p-3 w-full bg-gray-50
                focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Select Account Type</option>
                <option>Saving Account</option>
                <option>Current Account</option>
              </select>
            </div>

          </Section>

          {/* SUBMIT BUTTON */}
          <div className="flex justify-center pt-4">
            <button 
              className="px-12 py-3 bg-blue-800 text-white rounded-full 
              font-medium text-base tracking-wide"
            >
              Check Balance
            </button>
          </div>

        </form>

        {/* BALANCE DISPLAY */}
        {balance && (
          <div 
            className="mt-10 p-8 bg-green-50 text-center rounded-xl
            transform transition-all duration-700 
            translate-y-10 opacity-0 animate-[slideUp_0.7s_forwards]"
          >

            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Available Balance
            </h3>

            <p className="text-4xl font-bold text-green-700">
              {balance}
            </p>

          </div>
        )}

      </div>

      {/* Animation */}
      <style>
        {`
        @keyframes slideUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        `}
      </style>

    </div>
  );
}

/* ---------- Section ---------- */

function Section({ title, children }) {
  return (
    <div className="p-6 mb-6">
      <h3 className="text-xl font-semibold text-blue-900 mb-5">
        {title}
      </h3>

      <div className="grid md:grid-cols-2 gap-5">
        {children}
      </div>
    </div>
  );
}

/* ---------- Input ---------- */

function Input({ label, type="text", name, placeholder, handleChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className="rounded-xl p-3 w-full bg-gray-50
        focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
    </div>
  );
}
