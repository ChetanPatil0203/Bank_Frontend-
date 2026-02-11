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
    <div className="min-h-screen py-12 px-4">

      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-10">

        {/* HEADER */}
        <div className="text-center mb-10 border-b pb-6">
          <h2 className="text-2xl font-medium text-blue-900">
            Cash Withdrawal
          </h2>
          <p className="text-gray-500 mt-2">
            Withdraw money securely from your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ACCOUNT DETAILS */}
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
            <div className="border rounded-xl p-3 bg-gray-50 md:col-span-2">
              <p className="text-gray-500 text-sm">Available Balance</p>
              <p className="text-lg font-semibold text-green-600">
                {formData.balance}
              </p>
            </div>

          </Section>

          {/* WITHDRAWAL DETAILS */}
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

          {/* RECEIPT */}
          <Section title="Receipt Preference">

            <div className="flex flex-col gap-1">
              <label className="label-style">
                Receipt Option <span className="text-red-500">*</span>
              </label>

              <select
                name="receipt"
                onChange={handleChange}
                className="input-style"
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

          {/* SUBMIT */}
<div className="flex justify-center pt-4">
  <button className="px-10 py-3 bg-blue-800 text-white rounded-md font-medium text-base 
                 shadow-md hover:shadow-lg 
                transition-all  tracking-wide">
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

function Input({ label, type = "text", name, handleChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="label-style">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        id={name}
        type={type}
        name={name}
        onChange={handleChange}
        className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
    </div>
  );
}
