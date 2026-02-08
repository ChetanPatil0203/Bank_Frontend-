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
              name="fullName"
              placeholder="Full Name"
              handleChange={handleChange}
            />

            <Input
              name="accountNumber"
              placeholder="Account Number"
              handleChange={handleChange}
            />

            <Input
              name="contactNumber"
              placeholder="Contact Number"
              handleChange={handleChange}
            />

          </Section>


          {/* ISSUE DETAILS */}
          <Section title="Issue Details">

            <select
              name="issueType"
              onChange={handleChange}
              className="input-style"
              required
            >
              <option value="">Select Issue Type</option>
              <option>Login Problem</option>
              <option>Transaction Issue</option>
              <option>Deposit Issue</option>
              <option>Account Problem</option>
              <option>Technical Error</option>
            </select>

            <Input
              name="subject"
              placeholder="Issue Subject"
              handleChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Describe Your Issue"
              onChange={handleChange}
              className="input-style md:col-span-2 h-28"
              required
            />

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


/* ---------- Input Component ---------- */

function Input({ type="text", name, placeholder, handleChange }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      className="input-style border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
      required
    />
  );
}
