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
<<<<<<< Updated upstream
    <div className="min-h-screen py-6 px-4 bg-gray-50">

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        {/* HEADER */}
        <div className="text-center mb-2">
          <h2 className="text-xl font-semibold text-blue-900 leading-tight">
            Cash Withdrawal
          </h2>
          <p className="text-gray-500 text-sm leading-tight">
=======
    <div className="min-h-screen py-12 px-4 bg-gray-100">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-medium text-blue-900">
            Withdrawal
          </h2>

          <p className="text-gray-500 mt-2">
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
            {/* Balance Display */}
            <div className="rounded-xl p-3 bg-gray-50 md:col-span-2">
              <p className="text-xs text-gray-500">Available Balance</p>
              <p className="text-lg font-bold text-green-600">
=======
            {/* BALANCE DISPLAY */}
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-500 text-sm">
                Available Balance
              </p>

              <p className="text-xl font-bold text-green-600">
>>>>>>> Stashed changes
                {formData.balance}
              </p>
            </div>

          </Section>

<<<<<<< Updated upstream
=======
          {/* WITHDRAW DETAILS */}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              <label className="text-sm font-medium text-gray-700">
=======
              <label className="font-medium">
>>>>>>> Stashed changes
                Receipt Option <span className="text-red-500">*</span>
              </label>

              <select
                name="receipt"
                onChange={handleChange}
<<<<<<< Updated upstream
                className="rounded-xl p-2 w-full bg-white border
                  focus:ring-2 focus:ring-blue-500 outline-none"
=======
                className="rounded-xl p-3 w-full bg-gray-50 mt-1
                focus:ring-2 focus:ring-blue-500 outline-none"
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
          <div className="flex justify-center">
            <button
              className="  w-full md:w-32 
           bg-[linear-gradient(180deg,#1e3a7b_150%,#152d68_150%,#0f1f4d_150%)]
            hover:bg-[#5b4ec2] 
            text-white 
            font-semibold 
            rounded-xl 
            py-3.5 
            flex items-center 
            justify-center 
            gap-2 
            transition-all 
            transform 
            active:scale-[0.98] 
            shadow-lg"
=======
          {/* SUBMIT */}
          <div className="flex justify-center pt-4">
            <button
              className="px-12 py-3 bg-blue-800 text-white rounded-full font-medium tracking-wide"
>>>>>>> Stashed changes
            >
              Withdraw
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Section({ title, children }) {
  return (
<<<<<<< Updated upstream
    <div className="rounded-xl p-3 bg-gray-50">
      <h3 className="text-base font-semibold text-blue-900 mb-1 leading-tight">
=======
    <div className="p-6">
      <h3 className="text-xl font-semibold text-blue-900 mb-5">
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
=======
    <div>
      <label className="font-medium">
>>>>>>> Stashed changes
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        type={type}
        name={name}
        onChange={handleChange}
<<<<<<< Updated upstream
        className="rounded-xl p-2 w-full bg-white border
          focus:ring-2 focus:ring-blue-500 outline-none"
=======
        className="rounded-xl p-3 w-full bg-gray-50 mt-1
        focus:ring-2 focus:ring-blue-500 outline-none"
>>>>>>> Stashed changes
        required
      />
    </div>
  );
}