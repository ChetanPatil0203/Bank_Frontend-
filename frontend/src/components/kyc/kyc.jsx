import { useState, useEffect } from "react";

export default function KYCPage() {

  /* ---------------- STATE ---------------- */

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
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);

  /* ---------------- HANDLE INPUT ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "aadhaar" && !/^\d*$/.test(value)) return;
    if (name === "mobile" && !/^\d*$/.test(value)) return;

    if (name === "pan") {
      setFormData({ ...formData, pan: value.toUpperCase() });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  /* ---------------- OTP TIMER ---------------- */

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  /* ---------------- GENERATE OTP ---------------- */

  const generateOtp = () => {

    if (!formData.fullName || !formData.mobile || !formData.aadhaar) {
      setError("Please fill all required fields.");
      return;
    }

    if (formData.mobile.length !== 10) {
      setError("Mobile number must be 10 digits.");
      return;
    }

    if (formData.aadhaar.length !== 12) {
      setError("Aadhaar must be 12 digits.");
      return;
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (formData.pan && !panRegex.test(formData.pan)) {
      setError("Invalid PAN format (ABCDE1234F).");
      return;
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    setGeneratedOtp(newOtp);
    setShowOtp(true);
    setTimer(30);
    setError("");
    alert("Demo OTP: " + newOtp);
  };

  /* ---------------- VERIFY OTP ---------------- */

  const verifyOtp = () => {

    if (timer === 0) {
      setError("OTP expired. Please generate again.");
      return;
    }

    if (otp === generatedOtp) {
      setVerified(true);
      setError("");
    } else {
      setError("Invalid OTP");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen py-6 px-4 bg-gray-100">

      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        <h2 className="text-xl font-semibold text-center text-blue-900 mb-4">
          KYC Verification
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-3 text-sm font-medium">
            {error}
          </p>
        )}

        {/* PERSONAL DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Input label="Full Name" name="fullName" onChange={handleChange} required />
          <Input label="Date of Birth" type="date" name="dob" onChange={handleChange} required />

          <SelectInput
            label="Gender"
            name="gender"
            options={["Male", "Female", "Other"]}
            onChange={handleChange}
            required
          />

          <Input label="Mobile Number" name="mobile" maxLength={10} onChange={handleChange} required />
          <Input label="Email" type="email" name="email" onChange={handleChange} />

        </div>

        {/* ADDRESS */}
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            onChange={handleChange}
            className="w-full border rounded-xl p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* PAN + AADHAAR SAME ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

          <Input
            label="PAN Number"
            name="pan"
            maxLength={10}
            onChange={handleChange}
          />

          <Input
            label="Aadhaar Number"
            name="aadhaar"
            maxLength={12}
            onChange={handleChange}
            required
          />

        </div>

        {/* GENERATE OTP */}
        <div className="flex justify-center mt-5">
          <button
            onClick={generateOtp}
            disabled={verified}
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
            shadow-lg">
            Generate OTP
          </button>
        </div>

        {/* OTP SECTION */}
        {showOtp && !verified && (
          <div className="mt-5">

            <Input
              label="Enter OTP"
              name="otp"
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <p className="text-xs text-gray-500 text-center mt-2">
              OTP expires in {timer} seconds
            </p>

            <button
              onClick={verifyOtp}
              className="w-full mt-3 bg-green-600 text-white py-2 rounded-full text-sm
                font-medium shadow-md hover:bg-green-700 transition">
              Verify OTP
            </button>

            {timer === 0 && (
              <button
                onClick={generateOtp}
                className="w-full mt-2 text-blue-700 text-sm underline">
                Resend OTP
              </button>
            )}

          </div>
        )}

        {verified && (
          <p className="text-green-600 font-semibold text-center mt-4 text-sm">
            ✅ KYC Successfully Verified
          </p>
        )}

      </div>

    </div>
  );
}

/* ---------- REUSABLE INPUT ---------- */

function Input({ type="text", label, name, onChange, maxLength, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        maxLength={maxLength}
        onChange={onChange}
        className="border rounded-xl p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
        required={required}
      />
    </div>
  );
}

/* ---------- REUSABLE SELECT ---------- */

function SelectInput({ label, name, options, onChange, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        onChange={onChange}
        className="border rounded-xl p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
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