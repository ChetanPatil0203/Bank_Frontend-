import { useState, useEffect } from "react";
import {
  ClipboardList, User, ShieldCheck,
  Mail, Phone, Calendar, MapPin, CreditCard,
  Upload, Info, ArrowRight, ArrowLeft, Send,
  CheckCircle2, RefreshCw, KeyRound, Loader2
} from "lucide-react";
import { kycSendOtp, kycVerifyOtp, kycSubmit } from "../../utils/apiServices";

/* ── Step Dot ── */
function StepDot({ number, label, active, done }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
        ${active || done ? "bg-blue-900 text-white shadow-md" : "bg-gray-100 text-gray-400"}`}>
        {done ? "✓" : number}
      </div>
      <span className={`text-xs font-semibold hidden sm:block ${active ? "text-blue-900" : "text-gray-400"}`}>
        {label}
      </span>
    </div>
  );
}

/* ── Input ── */
function Input({ type = "text", label, name, value, onChange, maxLength, placeholder, icon, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full border border-gray-200 rounded-xl py-2.5 text-sm bg-gray-50 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-400 focus:bg-white
            outline-none transition-all ${icon ? "pl-9 pr-3" : "px-3"}`}
          required={required}
        />
      </div>
    </div>
  );
}

export default function KYCPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "", dob: "", gender: "", mobile: "", email: "",
    address: "", aadhaar: "", pan: "", aadhaarFile: null, panFile: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) interval = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) { setFormData({ ...formData, [name]: files[0] }); return; }
    if (name === "aadhaar" && !/^\d*$/.test(value)) return;
    if (name === "mobile" && !/^\d*$/.test(value)) return;
    if (name === "pan") { setFormData({ ...formData, [name]: value.toUpperCase() }); return; }
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (!formData.fullName || !formData.email || !formData.mobile || !formData.dob || !formData.address) {
      setError("Please fill all required fields."); return;
    }
    if (formData.mobile.length !== 10) { setError("Mobile number must be 10 digits."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setError("Enter a valid email address."); return; }
    setError(""); setStep(2);
  };

  const handleNextStep2 = async () => {
    if (!formData.aadhaar || !formData.pan) { setError("Please fill all required fields."); return; }
    if (formData.aadhaar.length !== 12) { setError("Aadhaar must be 12 digits."); return; }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) { setError("Invalid PAN format (e.g. ABCDE1234F)."); return; }
    setError(""); setStep(3);
    await handleSendOtp();
  };

  const handleSendOtp = async () => {
    setLoading(true); setError("");
    const res = await kycSendOtp(formData.email);
    setLoading(false);
    if (res.ok) { setOtpSent(true); setOtp(""); setTimer(30); }
    else setError(res.data?.message || "Failed to send OTP.");
  };

  const handleSubmit = async () => {
    if (!otpSent) { setError("Please send OTP first."); return; }
    if (timer === 0) { setError("OTP expired. Please resend."); return; }
    if (!otp || otp.length !== 6) { setError("Please enter the 6-digit OTP."); return; }
    setLoading(true); setError("");
    const verifyRes = await kycVerifyOtp(formData.email, otp);
    if (!verifyRes.ok) { setError(verifyRes.data?.message || "Invalid OTP."); setLoading(false); return; }
    const submitRes = await kycSubmit({
      fullName: formData.fullName, email: formData.email, mobile: formData.mobile,
      dob: formData.dob, address: formData.address, aadhaar: formData.aadhaar,
      pan: formData.pan, aadhaarFile: formData.aadhaarFile, panFile: formData.panFile,
    });
    setLoading(false);
    if (submitRes.ok) { setOtpVerified(true); setError(""); }
    else setError(submitRes.data?.message || "KYC submission failed.");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3">
      <div className="w-full bg-white shadow-sm rounded-2xl p-5 border border-gray-100">

        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <ClipboardList size={18} className="text-blue-900" />
          <h2 className="text-base font-bold text-gray-900">Submit New KYC</h2>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          {step === 1 ? "Step 1 of 3 — Personal Information"
            : step === 2 ? "Step 2 of 3 — Document Details"
            : "Step 3 of 3 — OTP Verification"}
        </p>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-5">
          <StepDot number={1} label="Personal" active={step === 1} done={step > 1} />
          <div className={`flex-1 h-0.5 rounded-full transition-colors ${step > 1 ? "bg-blue-900" : "bg-gray-200"}`} />
          <StepDot number={2} label="Documents" active={step === 2} done={step > 2} />
          <div className={`flex-1 h-0.5 rounded-full transition-colors ${step > 2 ? "bg-blue-900" : "bg-gray-200"}`} />
          <StepDot number={3} label="OTP" active={step === 3} done={otpVerified} />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl px-3 py-2 mb-3">
            ⚠️ {error}
          </div>
        )}

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Personal Information</p>
            <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange}
              placeholder="e.g. Rahul Mehta" icon={<User size={14} />} required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange}
                placeholder="email@gmail.com" icon={<Mail size={14} />} required />
              <Input label="Phone" name="mobile" value={formData.mobile} onChange={handleChange}
                maxLength={10} placeholder="9XXXXXXXXX" icon={<Phone size={14} />} required />
            </div>
            <Input label="Date of Birth" type="date" name="dob" value={formData.dob}
              onChange={handleChange} icon={<Calendar size={14} />} required />
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-3 text-gray-400" />
                <textarea name="address" value={formData.address} onChange={handleChange}
                  placeholder="Full address with city & pincode" rows={2}
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm bg-gray-50
                    focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none resize-none transition-all" />
              </div>
            </div>
            <div className="flex justify-end pt-1">
              <button onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 
                  text-white text-xs font-bold rounded-xl transition-all active:scale-95 shadow-md">
                Next <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Document Details</p>
            <div>
              <Input label="Aadhaar Number" name="aadhaar" value={formData.aadhaar} onChange={handleChange}
                maxLength={12} placeholder="12-digit Aadhaar number" icon={<ShieldCheck size={14} />} required />
              <p className="text-[10px] text-gray-400 mt-1">Only last 4 digits stored for security.</p>
            </div>
            <Input label="PAN Number" name="pan" value={formData.pan} onChange={handleChange}
              maxLength={10} placeholder="e.g. ABCDE1234F" icon={<CreditCard size={14} />} required />

            {/* Aadhaar Upload */}
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Aadhaar Document</p>
              <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-5
                cursor-pointer transition-all gap-1.5
                ${formData.aadhaarFile ? "border-green-400 bg-green-50" : "border-gray-200 bg-gray-50 hover:border-blue-400"}`}>
                <Upload size={16} className={formData.aadhaarFile ? "text-green-500" : "text-gray-400"} />
                <span className="text-xs font-medium text-gray-500">
                  {formData.aadhaarFile
                    ? <span className="text-green-600 font-bold">✅ {formData.aadhaarFile.name}</span>
                    : "Upload Aadhaar PDF or Image"}
                </span>
                <span className="text-[10px] text-gray-400">PDF, JPG, PNG — Max 5MB</span>
                <input name="aadhaarFile" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="hidden" />
              </label>
            </div>

            {/* PAN Upload */}
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">PAN Document</p>
              <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-5
                cursor-pointer transition-all gap-1.5
                ${formData.panFile ? "border-green-400 bg-green-50" : "border-gray-200 bg-gray-50 hover:border-blue-400"}`}>
                <Upload size={16} className={formData.panFile ? "text-green-500" : "text-gray-400"} />
                <span className="text-xs font-medium text-gray-500">
                  {formData.panFile
                    ? <span className="text-green-600 font-bold">✅ {formData.panFile.name}</span>
                    : "Upload PAN PDF or Image"}
                </span>
                <span className="text-[10px] text-gray-400">PDF, JPG, PNG — Max 5MB</span>
                <input name="panFile" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="hidden" />
              </label>
            </div>

            <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5">
              <Info size={14} className="text-blue-600 mt-0.5 shrink-0" />
              <p className="text-[11px] text-blue-700">
                After submission, KYC will be <strong>Pending</strong> until reviewed by admin.
              </p>
            </div>

            <div className="flex justify-between items-center pt-1">
              <button onClick={() => { setStep(1); setError(""); }}
                className="flex items-center gap-1 px-3 py-2 text-xs text-gray-500 hover:text-gray-700 font-medium">
                <ArrowLeft size={14} /> Back
              </button>
              <button onClick={handleNextStep2} disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 
                  text-white text-xs font-bold rounded-xl transition-all active:scale-95 shadow-md disabled:opacity-60">
                {loading ? <><Loader2 size={13} className="animate-spin" /> Sending OTP...</> : <>Next <ArrowRight size={14} /></>}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">OTP Verification</p>

            {otpVerified ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <CheckCircle2 size={52} className="text-green-500" />
                <p className="text-green-600 font-bold text-sm">KYC Successfully Submitted!</p>
                <p className="text-[11px] text-gray-400 text-center">
                  Your KYC is now <strong>Pending</strong> review.<br />Admin will verify your documents shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5">
                  <Send size={13} className="text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-blue-700">
                    {otpSent
                      ? <>OTP sent to <strong>{formData.email}</strong>. Enter it below.</>
                      : <>Sending OTP to <strong>{formData.email}</strong>...</>}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">
                    Enter OTP <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <KeyRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      value={otp}
                      onChange={(e) => { setOtp(e.target.value); setError(""); }}
                      placeholder="6-digit OTP"
                      maxLength={6}
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm font-mono
                        tracking-widest bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                {otpSent && (
                  <p className="text-[10px] text-gray-400">
                    {timer > 0 ? `⏳ OTP expires in ${timer} seconds` : "OTP expired."}
                  </p>
                )}

                {(timer === 0 || !otpSent) && (
                  <button onClick={handleSendOtp} disabled={loading}
                    className="flex items-center gap-1 text-blue-900 text-xs font-semibold underline disabled:opacity-60">
                    <RefreshCw size={11} /> {loading ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
                  </button>
                )}

                <div className="flex justify-between items-center pt-1">
                  <button onClick={() => { setStep(2); setError(""); setOtpSent(false); setOtp(""); }}
                    className="flex items-center gap-1 px-3 py-2 text-xs text-gray-500 hover:text-gray-700 font-medium">
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button onClick={handleSubmit} disabled={loading || !otpSent}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-800
                      text-white text-xs font-bold rounded-xl transition-all active:scale-95 shadow-md disabled:opacity-60">
                    {loading
                      ? <><Loader2 size={13} className="animate-spin" /> Submitting...</>
                      : <><CheckCircle2 size={14} /> Submit KYC</>}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}