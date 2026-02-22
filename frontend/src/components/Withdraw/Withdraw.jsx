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
    <div className="min-h-screen py-6 px-4 bg-gray-50">

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        {/* HEADER */}
        <div className="text-center mb-2">
          <h2 className="text-xl font-semibold text-blue-900 leading-tight">
            Cash Withdrawal
          </h2>
          <p className="text-gray-500 text-sm leading-tight">
            Withdraw money securely from your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <Section title="Account Details">

            <Input
              label="Account Number"
              name="accountNumber"
              handleChange={handleChange}
            />

            <Input
              label="Account Holder Name"
              name="holderName"
              handleChange={handleChange}
            />

            {/* Balance Display */}
            <div className="rounded-xl p-3 bg-gray-50 md:col-span-2">
              <p className="text-xs text-gray-500">Available Balance</p>
              <p className="text-lg font-bold text-green-600">
                {formData.balance}
              </p>
            </div>

          </Section>

          <Section title="Withdrawal Details">

            <Input
              label="Withdrawal Amount"
              name="amount"
              handleChange={handleChange}
            />

            <Input
              label="Mobile Number"
              name="mobile"
              handleChange={handleChange}
            />

          </Section>

          <Section title="Receipt Preference">

            <div>
              <label className="text-sm font-medium text-gray-700">
                Receipt Option <span className="text-red-500">*</span>
              </label>

              <select
                name="receipt"
                onChange={handleChange}
                className="rounded-xl p-2 w-full bg-white border
                  focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Select Receipt Option</option>
                <option>SMS Receipt</option>
                <option>Email Receipt</option>
                <option>Printed Receipt</option>
                <option>No Receipt</option>
              </select>
            </div>

          </Section>

          <div className="flex justify-center">
            <button
              className="w-full md:w-64 bg-[#6F5FE7] hover:bg-[#5b4ec2] text-white font-semibold rounded-xl py-3.5 transition-all transform active:scale-[0.98] shadow-lg"
            >
              Withdraw
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Section({ title, children }) {
  return (
    <div className="rounded-xl p-3 bg-gray-50">
      <h3 className="text-base font-semibold text-blue-900 mb-1 leading-tight">
        {title}
      </h3>
      <div className="grid md:grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  );
}

function Input({ label, type = "text", name, handleChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        type={type}
        name={name}
        onChange={handleChange}
        className="rounded-xl p-2 w-full bg-white border
          focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
    </div>
  );
}