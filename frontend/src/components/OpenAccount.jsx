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
    <div className="min-h-screen bg-gray-100 py-12 px-4">

      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-10">

        {/* HEADER */}
        <div className="text-center mb-10 border-b pb-6">
          <h2 className="text-4xl font-bold text-blue-900">
            Account Opening Form
          </h2>

          <p className="text-gray-500 mt-2">
            Secure Banking Registration Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* PERSONAL DETAILS */}
          <Section title="Personal Details">
            <Input name="fullName" placeholder="Full Name" handleChange={handleChange}/>
            <Input name="fatherName" placeholder="Father Name" handleChange={handleChange}/>
            <Input type="date" name="dob" handleChange={handleChange}/>

            <select name="gender" onChange={handleChange} className="input-style">
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </Section>

          {/* CONTACT DETAILS */}
          <Section title="Contact Details">
            <Input name="mobile" placeholder="Mobile Number" handleChange={handleChange}/>
            <Input type="email" name="email" placeholder="Email Address" handleChange={handleChange}/>

            <textarea
              name="address"
              placeholder="Residential Address"
              onChange={handleChange}
              className="input-style md:col-span-2 h-24"
            />
          </Section>

          {/* KYC DETAILS */}
          <Section title="KYC Verification">
            <Input name="aadhaar" placeholder="Aadhaar Number" handleChange={handleChange}/>
            <Input name="pan" placeholder="PAN Number" handleChange={handleChange}/>
          </Section>

          {/* PHOTO UPLOAD */}
          <div className="border rounded-xl p-6 bg-white">
            <h3 className="text-xl font-semibold text-blue-900 mb-4 border-b pb-2">
              Upload Photo
            </h3>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full border rounded-xl p-3"
              required
            />
          </div>

          {/* ACCOUNT DETAILS */}
          <Section title="Account Details">
            <select name="accountType" onChange={handleChange} className="input-style">
              <option value="">Select Account Type</option>
              <option>Saving Account</option>
              <option>Current Account</option>
            </select>

            <Input name="branch" placeholder="Preferred Branch Name" handleChange={handleChange}/>
          </Section>

          {/* NOMINEE DETAILS */}
          <Section title="Nominee Details">
            <Input name="nomineeName" placeholder="Nominee Full Name" handleChange={handleChange}/>
            <Input name="nomineeRelation" placeholder="Relation with Nominee" handleChange={handleChange}/>
          </Section>

          {/* TERMS */}
          <div className="flex gap-3 items-start">
            <input type="checkbox" name="agree" onChange={handleChange}/>
            <p className="text-sm text-gray-600">
              I confirm that all provided details are correct and agree to bank terms & policies.
            </p>
          </div>

          {/* SUBMIT BUTTON */}
          <button className="w-full bg-blue-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-800 transition">
            Submit Application
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
