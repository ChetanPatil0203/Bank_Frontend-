import { useState } from "react";

export default function HelpSupport() {

  /* ---------------- STATE ---------------- */

  const [formData, setFormData] = useState({
    fullName: "",
    accountNumber: "",
    contactNumber: "",
    issueType: "",
    subject: "",
    description: "",
  });

  const [error, setError] = useState("");

  /* ---------------- HANDLE INPUT ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only digits for account number & contact number
    if (name === "accountNumber" && !/^\d*$/.test(value)) return;
    if (name === "contactNumber" && !/^\d*$/.test(value)) return;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.contactNumber.length !== 10) {
      setError("Contact number must be 10 digits.");
      return;
    }

    if (!formData.issueType || !formData.description) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");
    alert("Support Request Submitted ✅");
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen py-6 px-4 bg-gray-100">

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        {/* HEADER */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-blue-900">
            Help & Support
          </h2>
          <p className="text-sm text-gray-500">
            Customer Assistance & Issue Resolution
          </p>
        </div>

        {error && (
          <p className="text-red-600 text-center mb-3 text-sm font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* CUSTOMER DETAILS */}
          <Section title="Customer Details">

            <Input
              label="Full Name"
              name="fullName"
              placeholder="Enter full name"
              handleChange={handleChange}
              required
            />

            <Input
              label="Account Number"
              name="accountNumber"
              placeholder="Enter account number"
              handleChange={handleChange}
              required
            />

            <Input
              label="Contact Number"
              name="contactNumber"
              placeholder="Enter contact number"
              maxLength={10}
              handleChange={handleChange}
              required
            />

          </Section>

          {/* ISSUE DETAILS */}
          <Section title="Issue Details">

            <SelectInput
              label="Issue Type"
              name="issueType"
              options={[
                "Login Problem",
                "Transaction Issue",
                "Deposit Issue",
                "Account Problem",
                "Technical Error"
              ]}
              handleChange={handleChange}
              required
            />

            <Input
              label="Issue Subject"
              name="subject"
              placeholder="Enter issue subject"
              handleChange={handleChange}
            />

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Issue Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Describe your issue"
                onChange={handleChange}
                className="border rounded-xl p-2 w-full h-24 bg-white
                  focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                required
              />
            </div>

          </Section>

          {/* SUBMIT */}
          <div className="flex justify-center pt-2">
            <button
              className="px-8 py-2 bg-blue-800 text-white rounded-full
                text-sm font-medium shadow-md hover:shadow-lg
                transition"
            >
              Submit Request
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

/* ---------- SECTION COMPONENT ---------- */

function Section({ title, children }) {
  return (
    <div className="rounded-xl p-4 bg-gray-50">
      <h3 className="text-base font-semibold text-blue-900 mb-3">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

/* ---------- INPUT COMPONENT ---------- */

function Input({ type = "text", label, name, placeholder, handleChange, maxLength, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={handleChange}
        className="border rounded-xl p-2 bg-white
          focus:ring-2 focus:ring-blue-500 outline-none"
        required={required}
      />
    </div>
  );
}

/* ---------- SELECT COMPONENT ---------- */

function SelectInput({ label, name, options, handleChange, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        onChange={handleChange}
        className="border rounded-xl p-2 bg-white
          focus:ring-2 focus:ring-blue-500 outline-none"
        required={required}
      >
        <option value="">Select {label}</option>
        {options.map((opt, index) => (
          <option key={index}>{opt}</option>
        ))}
      </select>
    </div>
  );
}