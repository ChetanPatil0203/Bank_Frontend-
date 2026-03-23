import { useState, useEffect } from "react";
import {
  ClipboardList, User, ShieldCheck,
  Mail, Phone, Calendar, MapPin, CreditCard,
  Upload, Info, ArrowRight, ArrowLeft, Send,
  CheckCircle2, RefreshCw, KeyRound
} from "lucide-react";

export default function KYCPage() {

  /* ---------------- STATE ---------------- */

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
    fullName: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    // Step 2 - Documents
    aadhaar: "",
    pan: "",
    aadhaarFile: null,
    panFile: null,
  });

  const [error, setError] = useState("");

  // OTP state
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) interval = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  /* ---------------- HANDLE INPUT ---------------- */

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      return;
    }

    if (name === "aadhaar" && !/^\d*$/.test(value)) return;
    if (name === "mobile" && !/^\d*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
  };

  /* ---------------- NEXT (Step 1 validation) ---------------- */

  const handleNext = () => {
    if (!formData.fullName || !formData.email || !formData.mobile || !formData.dob || !formData.address) {
      setError("Please fill all required fields.");
      return;
    }
    if (formData.mobile.length !== 10) {
      setError("Mobile number must be 10 digits.");
      return;
    }
    setError("");
    setStep(2);
  };

  /* ---------------- NEXT (Step 2 validation) ---------------- */

  const handleNextStep2 = () => {
    if (!formData.aadhaar || !formData.pan) {
      setError("Please fill all required fields.");
      return;
    }
    if (formData.aadhaar.length !== 12) {
      setError("Aadhaar must be 12 digits.");
      return;
    }
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.pan)) {
      setError("Invalid PAN format (ABCDE1234F).");
      return;
    }
    setError("");
    setStep(3);
    handleGenerateOtp();
  };

  /* ---------------- GENERATE OTP ---------------- */

  const handleGenerateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    setOtp("");
    setTimer(30);
    setError("");
    alert("Demo OTP: " + newOtp);
  };

  /* ---------------- VERIFY OTP & SUBMIT ---------------- */

  const handleSubmit = () => {
    if (!otpSent) {
      setError("Please generate OTP first.");
      return;
    }
    if (timer === 0) {
      setError("OTP expired. Please resend.");
      return;
    }
    if (otp !== generatedOtp) {
      setError("Invalid OTP. Please try again.");
      return;
    }
    setOtpVerified(true);
    setError("");
    alert("KYC Submitted! Status set to Pending.");
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-white py-4 px-3">

      <div className="w-full bg-white shadow-lg rounded-xl p-5 border border-gray-100">

        {/* HEADER */}
        <div className="flex items-center gap-2 mb-1">
          <ClipboardList size={18} className="text-blue-900" />
          <h2 className="text-lg font-semibold text-gray-900">Submit New KYC</h2>
        </div>

        <p className="text-xs text-gray-500 mb-4">
          {step === 1 ? "Step 1 of 3 — Personal Information" : step === 2 ? "Step 2 of 3 — Document Details" : "Step 3 of 3 — OTP Verification"}
        </p>

        {/* STEPPER */}
        <div className="flex items-center gap-2 mb-5">
          <StepDot number={1} label="Personal" active={step === 1} done={step > 1} />
          <div className={`flex-1 h-0.5 rounded-full transition-colors ${step > 1 ? "bg-blue-900" : "bg-gray-200"}`} />
          <StepDot number={2} label="Documents" active={step === 2} done={step > 2} />
          <div className={`flex-1 h-0.5 rounded-full transition-colors ${step > 2 ? "bg-blue-900" : "bg-gray-200"}`} />
          <StepDot number={3} label="OTP" active={step === 3} done={otpVerified} />
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-600 text-center mb-3 text-xs font-medium">{error}</p>
        )}

        {/* -------- STEP 1: PERSONAL INFO -------- */}
        {step === 1 && (
          <>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Personal Information</p>

            <div className="mb-3">
              <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Rahul Mehta" icon={<User size={14} />} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@gmail.com" icon={<Mail size={14} />} required />
              <Input label="Phone" name="mobile" value={formData.mobile} onChange={handleChange} maxLength={10} placeholder="9XXXXXXXXX" icon={<Phone size={14} />} required />
            </div>

            <div className="mb-3">
              <Input label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange} icon={<Calendar size={14} />} required />
            </div>

            <div className="mb-5">
              <label className="text-xs font-medium text-gray-700 block mb-1.5">
                Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin size={14} className="absolute left-2.5 top-2 text-gray-400" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full address with city & pincode"
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-xs bg-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  required
                />
              </div>
            </div>

          <div className="flex justify-end items-center gap-2.5">

              <button className="px-4 py-2
                bg-red-600
                text-white
                font-semibold
                rounded-lg
                flex items-center
                justify-center
                gap-2
                transition-all
                active:scale-[0.98]
                shadow-md text-xs">
                Cancel
              </button>

              <button
                onClick={handleNext}
                className="px-4 py-2
                  bg-[linear-gradient(180deg,#1e3a7b_0%,#152d68_60%,#0f1f4d_100%)]
                  text-white
                  font-semibold
                  rounded-lg
                  flex items-center
                  justify-center
                  gap-2
                  transition-all
                  active:scale-[0.98]
                  shadow-md text-xs"
              >
                Next <ArrowRight size={14} />
              </button>

            </div>
            
          </>
        )}

        {/* -------- STEP 2: DOCUMENTS -------- */}
        {step === 2 && (
          <>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Document Details</p>

            <div className="mb-1">
              <Input label="Aadhaar Number" name="aadhaar" value={formData.aadhaar} onChange={handleChange} maxLength={12} placeholder="12-digit Aadhaar number" icon={<ShieldCheck size={14} />} required />
            </div>
            <p className="text-[10px] text-gray-400 mb-3">Only the last 4 digits will be stored for security.</p>

            <div className="mb-3">
              <Input label="PAN Number" name="pan" value={formData.pan} onChange={handleChange} maxLength={10} placeholder="E.G. ABCDE1234F" icon={<CreditCard size={14} />} required />
            </div>

            <div className="mb-3">
              <p className="text-xs font-medium text-gray-700 mb-1.5">Aadhaar Document Upload</p>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg py-6 cursor-pointer hover:border-blue-400 transition-colors bg-gray-50 gap-1.5">
                <Upload size={16} className="text-gray-400" />
                <span className="text-xs text-gray-500">
                  {formData.aadhaarFile ? formData.aadhaarFile.name : "Upload Aadhaar PDF or Image"}
                </span>
                <span className="text-[10px] text-gray-400">Accepted: PDF, JPG, PNG — Max 5MB</span>
                <input name="aadhaarFile" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="hidden" />
              </label>
            </div>

            <div className="mb-3">
              <p className="text-xs font-medium text-gray-700 mb-1.5">PAN Document Upload</p>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg py-6 cursor-pointer hover:border-blue-400 transition-colors bg-gray-50 gap-1.5">
                <Upload size={16} className="text-gray-400" />
                <span className="text-xs text-gray-500">
                  {formData.panFile ? formData.panFile.name : "Upload PAN PDF or Image"}
                </span>
                <span className="text-[10px] text-gray-400">Accepted: PDF, JPG, PNG — Max 5MB</span>
                <input name="panFile" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="hidden" />
              </label>
            </div>

            <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5 mb-5">
              <Info size={14} className="text-blue-600 mt-0.5 shrink-0" />
              <p className="text-[11px] text-blue-700">
                After submission, KYC will be set to <strong>Pending</strong> status and will be reviewed by an admin.
              </p>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => { setStep(1); setError(""); }}
                className="px-4 py-2 text-xs text-gray-600 hover:text-gray-800 font-medium flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={handleNextStep2}
                className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-md flex items-center gap-1.5"
              >
                Next <ArrowRight size={14} />
              </button>
            </div>
          </>
        )}

        {/* -------- STEP 3: OTP VERIFICATION -------- */}
        {step === 3 && (
          <>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">OTP Verification</p>

            {otpVerified ? (
              <div className="flex flex-col items-center justify-center py-6 gap-2.5">
                <CheckCircle2 size={40} className="text-green-500" />
                <p className="text-green-600 font-semibold text-sm">KYC Successfully Verified!</p>
                <p className="text-[11px] text-gray-400">Your KYC has been submitted and is under review.</p>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5 mb-4">
                  <Send size={13} className="text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-blue-700">
                    OTP will be sent to <strong>{formData.mobile}</strong>. Please enter it below to verify and submit your KYC.
                  </p>
                </div>

                <div className="mb-2">
                  <Input
                    label="Enter OTP"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    placeholder="6-digit OTP"
                    icon={<KeyRound size={14} />}
                    required
                  />
                </div>

                {otpSent && (
                  <p className="text-[10px] text-gray-500 mb-3">
                    {timer > 0 ? `OTP expires in ${timer} seconds` : "OTP expired."}
                  </p>
                )}

                {(timer === 0 || !otpSent) && (
                  <button
                    onClick={handleGenerateOtp}
                    className="flex items-center gap-1 text-blue-900 text-xs font-medium underline mb-4"
                  >
                    <RefreshCw size={11} /> {otpSent ? "Resend OTP" : "Send OTP"}
                  </button>
                )}

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => { setStep(2); setError(""); setOtpSent(false); setOtp(""); }}
                    className="px-4 py-2 text-xs text-gray-600 hover:text-gray-800 font-medium flex items-center gap-1"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-md flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={14} /> Submit KYC
                  </button>
                </div>
              </>
            )}
          </>
        )}

      </div>
    </div>
  );
}

/* ---------- REUSABLE INPUT ---------- */

function Input({ type = "text", label, name, value, onChange, maxLength, placeholder, icon, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full border border-gray-200 rounded-lg py-2 text-xs bg-white focus:ring-2 focus:ring-blue-500 outline-none ${icon ? "pl-7 pr-3" : "px-3"}`}
          required={required}
        />
      </div>
    </div>
  );
}

/* ---------- STEP DOT ---------- */

function StepDot({ number, label, active, done }) {
  return (
    <div className="flex items-center gap-1">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all
          ${active || done ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-500"}`}
      >
        {done ? "✓" : number}
      </div>
      <span className={`text-xs font-medium hidden sm:block ${active ? "text-blue-900" : "text-gray-400"}`}>{label}</span>
    </div>
  );
}