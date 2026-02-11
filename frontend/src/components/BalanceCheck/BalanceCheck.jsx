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

    // Dummy Balance (Backend नंतर येईल)
    setBalance("₹ 45,250.00");
  };

  return (
    <div className="min-h-screen py-12 px-4">

      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-10">

        {/* HEADER */}
        <div className="text-center mb-10 border-b pb-6">
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
                className="input-style border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
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
  <button className="px-10 py-3 bg-blue-800 text-white rounded-md font-medium text-base 
                 shadow-md hover:shadow-lg 
                transition-all  tracking-wide">
    Check Balance
  </button>
</div>

        </form>

        {/* BALANCE DISPLAY CARD */}
        {balance && (
          <div className="mt-10 border rounded-xl p-8 bg-green-50 text-center">

            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Available Balance
            </h3>

            <p className="text-4xl font-bold text-green-700">
              {balance}
            </p>

          </div>
        )}

      </div>
    </div>
  );
}


/* ---------- Section Component ---------- */

function Section({ title, children }) {
  return (
    <div className="border rounded-xl p-6 bg-white">

      <h3 className="text-xl font-semibold text-blue-900 mb-5 border-b pb-2">
        {title}
      </h3>

      <div className="grid md:grid-cols-2 gap-5">
        {children}
      </div>

    </div>
  );
}


/* ---------- Input Component ---------- */

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
        className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
    </div>
  );
}
