import { useState } from "react";

export default function KYCPage() {

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    pan: "",
    aadhaar: ""
  });

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateOtp = () => {
    if (formData.aadhaar.length !== 12) {
      alert("Enter Valid 12 Digit Aadhaar");
      return;
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setShowOtp(true);
    alert("OTP Sent : " + newOtp);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setVerified(true);
      alert("KYC Verified ✅");
    } else {
      alert("Invalid OTP ❌");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">

      <div 
        className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-8
        transform transition-all duration-700 
        translate-y-10 opacity-0 animate-[slideUp_0.7s_forwards]"
      >

        <h2 className="text-2xl font-medium text-center text-blue-900 mb-8 border-b pb-4">
          KYC Verification
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Reusable animated input style applied to all fields */}

          <Input label="Full Name" name="fullName" onChange={handleChange} />
          <Input label="Date of Birth" type="date" name="dob" onChange={handleChange} />

          <div className="transition-all duration-300 hover:-translate-y-1">
            <label className="font-semibold block mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              onChange={handleChange}
              className="border rounded-xl p-3 w-full bg-gray-50
                focus:ring-2 focus:ring-blue-500 outline-none
                transition-all duration-300"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <Input label="Mobile Number" name="mobile" onChange={handleChange} />
          <Input label="Email" type="email" name="email" onChange={handleChange} />

        </div>

        {/* Address */}
        <div className="mt-5 transition-all duration-300 hover:-translate-y-1">
          <label className="font-semibold block mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            onChange={handleChange}
            className="w-full border rounded-xl p-3 bg-gray-50
              focus:ring-2 focus:ring-blue-500 outline-none
              transition-all duration-300"
          />
        </div>

        <Input label="PAN Number" name="pan" onChange={handleChange} />
        <Input label="Aadhaar Number" name="aadhaar" maxLength={12} onChange={handleChange} />

        <div className="flex justify-center mt-6">
          <button
            onClick={generateOtp}
            className="px-12 py-3 bg-blue-800 text-white rounded-full
              font-medium shadow-md hover:shadow-xl
             transition-all duration-300 tracking-wide"
          >
            Generate OTP
          </button>
        </div>

        {/* OTP SECTION */}
        {showOtp && (
          <div className="mt-6 transition-all duration-500">
            <Input 
              label="Enter OTP" 
              name="otp" 
              onChange={(e) => setOtp(e.target.value)} 
            />

            <button
              onClick={verifyOtp}
              className="w-full mt-4 bg-green-600 text-white py-3 
                rounded-full font-medium shadow-md
                
                transition-all duration-300"
            >
              Verify OTP
            </button>
          </div>
        )}

        {verified && (
          <p className="text-green-600 font-semibold text-center mt-4 animate-pulse">
            ✅ KYC Successfully Verified
          </p>
        )}

      </div>

      {/* Tailwind Animation */}
      <style>
        {`
        @keyframes slideUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        `}
      </style>

    </div>
  );
}

/* ---------- Reusable Input Component ---------- */
function Input({ type="text", label, name, onChange, maxLength }) {
  return (
    <div className="transition-all duration-300 hover:-translate-y-1">
      <label className="font-semibold block mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        maxLength={maxLength}
        onChange={onChange}
        className="border rounded-xl p-3 w-full bg-gray-50
          focus:ring-2 focus:ring-blue-500 outline-none
          transition-all duration-300"
      />
    </div>
  );
}
