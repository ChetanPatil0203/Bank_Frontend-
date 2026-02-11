import { useState } from "react";

export default function OpenAccount() {

  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    aadhaar: "",
    pan: "",
    accountType: "",
    branch: "",
    nomineeName: "",
    nomineeRelation: "",
    agree: false,
  });

  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Accept Terms & Conditions");
      return;
    }

    alert("Account Application Submitted ✅");
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-10">

        {/* HEADER */}
        <div className="text-center mb-10 border-b pb-6">
          <h2 className="text-2xl font-medium text-blue-900">
             Open New Account
          </h2>
          <p className="text-gray-500 mt-2">
            Secure Banking Registration Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* PERSONAL DETAILS */}
          <Section title="Personal Details">
            <Input label="Full Name" name="fullName" handleChange={handleChange}/>
            <Input label="Father Name" name="fatherName" handleChange={handleChange}/>
            <Input label="Date of Birth" type="date" name="dob" handleChange={handleChange}/>

            <Select
              label="Gender"
              name="gender"
              handleChange={handleChange}
              options={["Male","Female","Other"]}
            />
          </Section>

          {/* CONTACT DETAILS */}
          <Section title="Contact Details">
            <Input label="Mobile Number" name="mobile" handleChange={handleChange}/>
            <Input label="Email Address" type="email" name="email" handleChange={handleChange}/>

            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="label-style">
                Residential Address <span className="text-red-500">*</span>
              </label>

              <textarea
                name="address"
                onChange={handleChange}
                className="input-style h-24"
                required
              />
            </div>
          </Section>

          {/* KYC */}
          <Section title="KYC Verification">
            <Input label="Aadhaar Number" name="aadhaar" handleChange={handleChange}/>
            <Input label="PAN Number" name="pan" handleChange={handleChange}/>
          </Section>

         {/* PHOTO */}
<div className="border rounded-xl p-6 bg-white">
  <h3 className="section-title">
    Upload Photo <span className="text-red-500">*</span>
  </h3>

  <div className="relative flex items-center">

    {/* File Input */}
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setPhoto(e.target.files[0])}
      className="input-style pr-20"
      required
    />

    {/* View Link Inside Input Section */}
    {photo && (
      <a
        href={URL.createObjectURL(photo)}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-4 text-blue-700 underline font-semibold"
      >
        View
      </a>
    )}

  </div>
</div>

          {/* ACCOUNT */}
          <Section title="Account Details">
            <Select
              label="Account Type"
              name="accountType"
              handleChange={handleChange}
              options={["Saving Account","Current Account"]}
            />

            <Input label="Preferred Branch" name="branch" handleChange={handleChange}/>
          </Section>

          {/* NOMINEE */}
          <Section title="Nominee Details">
            <Input label="Nominee Name" name="nomineeName" handleChange={handleChange}/>
            <Input label="Relation with Nominee" name="nomineeRelation" handleChange={handleChange}/>
          </Section>

          {/* TERMS */}
          <div className="flex gap-3 items-start">
            <input type="checkbox" name="agree" onChange={handleChange}/>
            <p className="text-sm text-gray-600">
              I confirm that all provided details are correct and agree to bank policies.
            </p>
          </div>

          {/* SUBMIT */}
          <button className="w-full bg-blue-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-800">
            Submit Application
          </button>

        </form>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function Section({ title, children }) {
  return (
    <div className="border rounded-xl p-6 bg-white">
      <h3 className="section-title">{title}</h3>

      <div className="grid md:grid-cols-2 gap-5">
        {children}
      </div>
    </div>
  );
}

function Input({ label, type="text", name, handleChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="label-style">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        type={type}
        name={name}
        onChange={handleChange}
        className="input-style"
        required
      />
    </div>
  );
}

function Select({ label, name, options, handleChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="label-style">
        {label} <span className="text-red-500">*</span>
      </label>

      <select
        name={name}
        onChange={handleChange}
        className="input-style"
        required
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
