import { useState } from "react";

export default function Withdraw() {

  const [formData, setFormData] = useState({
    accountNumber: "",
    holderName: "",
    balance: "₹50,000",
    amount: "",
    mobile: "",
    receipt: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Withdrawal Successful 💸");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">

      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-10">

        {/* HEADER */}
        <div className="text-center mb-10 border-b pb-6">
          <h2 className="text-4xl font-bold text-blue-900">
            Cash Withdrawal
          </h2>
          <p className="text-gray-500 mt-2">
            Withdraw money securely from your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Account Details */}
          <Section title="Account Details">

            <Input
              name="accountNumber"
              placeholder="Account Number"
              handleChange={handleChange}
            />

            <Input
              name="holderName"
              placeholder="Account Holder Name"
              handleChange={handleChange}
            />

            {/* Balance Display */}
            <div className="border rounded-xl p-3 bg-gray-50">
              <p className="text-gray-500 text-sm">Available Balance</p>
              <p className="text-lg font-semibold text-green-600">
                {formData.balance}
              </p>
            </div>

          </Section>

          {/* Withdrawal Details */}
          <Section title="Withdrawal Details">

            <Input
              name="amount"
              placeholder="Enter Withdrawal Amount"
              handleChange={handleChange}
            />

            <Input
              name="mobile"
              placeholder="Mobile Number"
              handleChange={handleChange}
            />

          </Section>

          {/* Receipt Preference */}
          <Section title="Receipt Preference">

            <select
              name="receipt"
              onChange={handleChange}
              className="input-style"
            >
              <option value="">Select Receipt Option</option>
              <option>SMS Receipt</option>
              <option>Email Receipt</option>
              <option>Printed Receipt</option>
              <option>No Receipt</option>
            </select>

          </Section>

          {/* Submit Button */}
          <button className="w-full bg-blue-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-800 transition">
            Withdraw Money
          </button>

        </form>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

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

function Input({ type = "text", name, placeholder, handleChange }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
      required
    />
  );
}
