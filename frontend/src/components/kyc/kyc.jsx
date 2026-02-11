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

      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-8">

        <h2 className="text-2xl font-medium text-center text-blue-900 mb-8">
          KYC Verification
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Full Name */}
          <div>
            <label className="font-semibold">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="font-semibold">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="font-semibold">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Mobile */}
          <div>
            <label className="font-semibold">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="mobile"
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            />
          </div>

        </div>

        {/* Address */}
        <div className="mt-4">
          <label className="font-semibold">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />
        </div>

        {/* PAN */}
        <div className="mt-4">
          <label className="font-semibold">
            PAN Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="pan"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />
        </div>

        {/* Aadhaar */}
        <div className="mt-4">
          <label className="font-semibold">
            Aadhaar Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="aadhaar"
            maxLength={12}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />
        </div>

        <div className="flex justify-center mt-5">
  <button
    onClick={generateOtp}
    className="px-10 py-3 bg-blue-800 text-white rounded-md font-medium text-base 
                shadow-md hover:shadow-lg 
               transition-all tracking-wide"
  >
    Generate OTP
  </button>
</div>

        {/* OTP */}
        {showOtp && (
          <>
            <div className="mt-4">
              <label className="font-semibold">
                Enter OTP <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border p-3 rounded-xl"
              />
            </div>

            <button
              onClick={verifyOtp}
              className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl"
            >
              Verify OTP
            </button>
          </>
        )}

        {verified && (
          <p className="text-green-600 font-semibold text-center mt-4">
            ✅ KYC Successfully Verified
          </p>
        )}

      </div>
    </div>
  );
}
