import { useState } from "react";

export default function HelpSupport() {

  const [formData, setFormData] = useState({
    fullName: "",
    accountNumber: "",
    contactNumber: "",
    issueType: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Support Request Submitted ✅");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">

      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-10">

        {/* HEADER */}
        <div className="text-center mb-10 border-b pb-6">
          <h2 className="text-4xl font-bold text-blue-900">
            Help & Support
          </h2>
          <p className="text-gray-500 mt-2">
            Customer Assistance & Issue Resolution Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* CUSTOMER DETAILS */}
          <Section title="Customer Details">

            <Input
              label="Full Name"
              name="fullName"
              placeholder="Enter full name"
              handleChange={handleChange}
            />

            <Input
              label="Account Number"
              name="accountNumber"
              placeholder="Enter account number"
              handleChange={handleChange}
            />

            <Input
              label="Contact Number"
              name="contactNumber"
              placeholder="Enter contact number"
              handleChange={handleChange}
            />

          </Section>

          {/* ISSUE DETAILS */}
          <Section title="Issue Details">

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Issue Type <span className="text-red-500">*</span>
              </label>
              <select
                name="issueType"
                onChange={handleChange}
                className="input-style border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Select Issue Type</option>
                <option>Login Problem</option>
                <option>Transaction Issue</option>
                <option>Deposit Issue</option>
                <option>Account Problem</option>
                <option>Technical Error</option>
              </select>
            </div>

            <Input
              label="Issue Subject"
              name="subject"
              placeholder="Enter issue subject"
              handleChange={handleChange}
            />

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-gray-700">
                Issue Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Describe your issue"
                onChange={handleChange}
                className="input-style border rounded-xl p-3 w-full h-28 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

          </Section>

          {/* SUBMIT BUTTON */}
          <button className="w-full bg-blue-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-800 transition">
            Submit Request
          </button>

        </form>
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


/* ---------- Input Component with Label ---------- */

function Input({ type = "text", label, name, placeholder, handleChange }) {
  return (
    <div>
      <label className="block mb-1 font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className="input-style border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
    </div>
  );
}
