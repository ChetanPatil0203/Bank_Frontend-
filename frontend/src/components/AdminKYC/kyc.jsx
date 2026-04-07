import { useState, useEffect } from "react";
import {
  Search, Eye, CheckCircle, XCircle, Clock,
  FileText, AlertTriangle, Plus, User,
  Phone, Mail, MapPin, Calendar,
  ShieldCheck, CreditCard, KeyRound,
  Send, RefreshCw, Upload, CheckCircle2, Loader2, X
} from "lucide-react";
import { adminGetAllKycs, adminUpdateKycStatus, kycSendOtp, kycVerifyOtp, kycSubmit } from "../../utils/apiServices";

/* ── Status Badge ── */
function StatusBadge({ status }) {
  const map = {
    Verified: "bg-green-100 text-green-700",
    Pending:  "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };
  const dot = {
    Verified: "bg-green-500",
    Pending:  "bg-yellow-500",
    Rejected: "bg-red-500",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${map[status] || "bg-gray-100 text-gray-500"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot[status] || "bg-gray-400"}`} />
      {status}
    </span>
  );
}

/* ── Stat Card ── */
function StatCard({ label, value, icon: Icon, iconClass }) {
  return (
    <div className="flex-1 min-w-[110px] bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 flex flex-col gap-2 hover:-translate-y-1 transition-transform duration-200">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        <Icon size={18} className={iconClass} />
      </div>
      <h3 className="text-xl sm:text-2xl font-black text-gray-800 tracking-tight">{value}</h3>
    </div>
  );
}

/* ── Input helper ── */
function Input({ label, name, value, onChange, type = "text", placeholder, maxLength, icon, required, error }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
        <input
          type={type} name={name} value={value} onChange={onChange}
          maxLength={maxLength} placeholder={placeholder}
          className={`w-full border rounded-xl py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500
            focus:bg-white outline-none transition-all ${icon ? "pl-8 pr-3" : "px-3"}
            ${error ? "border-red-400" : "border-gray-200"}`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1 font-medium">⚠️ {error}</p>}
    </div>
  );
}

/* ── KYC Submission Form (modal) ── */
function KYCForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", dob: "", address: "", aadhaar: "", pan: "", aadhaarDoc: null, panDoc: null });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let t;
    if (timer > 0) t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  function validateStep1() {
    const err = {};
    if (!form.name.trim()) err.name = "Full name required";
    if (!form.email.trim()) err.email = "Email required";
    if (!form.phone.trim() || form.phone.length !== 10) err.phone = "Valid 10-digit phone required";
    if (!form.dob.trim()) err.dob = "DOB required";
    if (!form.address.trim()) err.address = "Address required";
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function validateStep2() {
    const err = {};
    if (!form.aadhaar.trim() || form.aadhaar.length !== 12) err.aadhaar = "Valid 12-digit Aadhaar required";
    if (!form.pan.trim() || form.pan.length !== 10) err.pan = "Valid 10-character PAN required";
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  async function sendOtpToEmail() {
    setLoading(true);
    const res = await kycSendOtp(form.email);
    setLoading(false);
    if (res.ok) { setOtpSent(true); setTimer(30); setOtp(""); setErrors({}); }
    else setErrors({ otp: res.data?.message || "Failed to send OTP." });
  }

  function handleNext1() { if (validateStep1()) setStep(2); }
  function handleNext2() { if (!validateStep2()) return; setStep(3); sendOtpToEmail(); }

  async function handleSubmit() {
    if (!otpSent) { setErrors({ otp: "Send OTP first." }); return; }
    if (timer === 0) { setErrors({ otp: "OTP expired. Resend." }); return; }
    setLoading(true);
    const verifyRes = await kycVerifyOtp(form.email, otp);
    if (!verifyRes.ok) { setErrors({ otp: verifyRes.data?.message || "Invalid OTP." }); setLoading(false); return; }
    const res = await kycSubmit({
      fullName: form.name, email: form.email, mobile: form.phone,
      dob: form.dob, address: form.address, aadhaar: form.aadhaar,
      pan: form.pan.toUpperCase(), aadhaarFile: form.aadhaarDoc, panFile: form.panDoc,
    });
    setLoading(false);
    if (res.ok) { setOtpVerified(true); setErrors({}); setTimeout(() => onSubmit(res.data?.data), 1500); }
    else setErrors({ otp: res.data?.message || "Submission failed." });
  }

  const STEPS = ["Personal Info", "Documents", "OTP"];

  return (
    <div className="fixed inset-0 bg-blue-950/50 z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2">
              <FileText size={16} className="text-blue-900" /> Submit New KYC
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Step {step} of 3</p>
          </div>
          <button onClick={onCancel} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
            <X size={15} />
          </button>
        </div>

        {/* Stepper */}
        <div className="flex items-center px-4 sm:px-6 pt-4 pb-2 gap-1 sm:gap-2">
          {STEPS.map((label, i) => {
            const s = i + 1; const active = step === s; const done = step > s;
            return (
              <div key={s} className="flex items-center" style={{ flex: i < STEPS.length - 1 ? 1 : 0 }}>
                <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold
                    ${active || done ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-400"}`}>
                    {done ? "✓" : s}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-semibold hidden sm:inline ${active ? "text-blue-900" : "text-gray-400"}`}>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 sm:mx-3 rounded-full ${step > s ? "bg-blue-900" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Body */}
        <div className="px-4 sm:px-6 py-4 overflow-y-auto flex-1">

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-blue-900 uppercase tracking-widest pb-2 border-b-2 border-gray-100">Personal Information</p>
              <Input label="Full Name" name="name" value={form.name} onChange={f("name")}
                placeholder="e.g. Rahul Mehta" icon={<User size={13} />} required error={errors.name} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Email" type="email" name="email" value={form.email} onChange={f("email")}
                  placeholder="email@gmail.com" icon={<Mail size={13} />} required error={errors.email} />
                <Input label="Phone" type="tel" name="phone" value={form.phone} onChange={f("phone")}
                  maxLength={10} placeholder="9XXXXXXXXX" icon={<Phone size={13} />} required error={errors.phone} />
              </div>
              <Input label="Date of Birth" type="date" name="dob" value={form.dob} onChange={f("dob")}
                icon={<Calendar size={13} />} required error={errors.dob} />
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
                  <textarea value={form.address} onChange={f("address")} rows={2} placeholder="Full address with city & pincode"
                    className="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none resize-none transition-all" />
                </div>
                {errors.address && <p className="text-red-500 text-xs mt-1">⚠️ {errors.address}</p>}
              </div>
              <div className="flex gap-2 pt-1">
                <button onClick={onCancel} className="flex-1 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleNext1} className="flex-1 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-sm font-bold transition-colors">Next →</button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-blue-900 uppercase tracking-widest pb-2 border-b-2 border-gray-100">Document Details</p>
              <div>
                <Input label="Aadhaar Number" name="aadhaar" value={form.aadhaar} onChange={f("aadhaar")}
                  maxLength={12} placeholder="12-digit Aadhaar" icon={<ShieldCheck size={13} />} required error={errors.aadhaar} />
                {!errors.aadhaar && <p className="text-[10px] text-gray-400 mt-1">Only last 4 digits stored.</p>}
              </div>
              <Input label="PAN Number" name="pan" value={form.pan}
                onChange={(e) => setForm({ ...form, pan: e.target.value.toUpperCase() })}
                maxLength={10} placeholder="e.g. ABCDE1234F" icon={<CreditCard size={13} />} required error={errors.pan} />

              {[
                { id: "aadhaar-upload", key: "aadhaarDoc", label: "Aadhaar Document" },
                { id: "pan-upload",     key: "panDoc",     label: "PAN Document"     },
              ].map(({ id, key, label }) => (
                <div key={id}>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
                  <label htmlFor={id}
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-4 cursor-pointer transition-all gap-1
                      ${form[key] ? "border-green-400 bg-green-50" : "border-gray-200 bg-gray-50 hover:border-blue-400"}`}>
                    <Upload size={16} className={form[key] ? "text-green-500" : "text-gray-400"} />
                    {form[key]
                      ? <p className="text-xs font-bold text-green-600">✅ {form[key].name}</p>
                      : <p className="text-xs text-gray-400">Upload PDF or Image</p>}
                    <input id={id} type="file" accept=".pdf,.jpg,.jpeg,.png"
                      onChange={e => setForm({ ...form, [key]: e.target.files[0] })} className="hidden" />
                  </label>
                </div>
              ))}

              <div className="flex gap-2 pt-1">
                <button onClick={() => { setStep(1); setErrors({}); }}
                  className="flex-1 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">← Back</button>
                <button onClick={handleNext2} disabled={loading}
                  className="flex-1 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <><Loader2 size={13} className="animate-spin" /> Sending...</> : "Next →"}
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-blue-900 uppercase tracking-widest pb-2 border-b-2 border-gray-100">OTP Verification</p>
              {otpVerified ? (
                <div className="flex flex-col items-center py-10 gap-3">
                  <CheckCircle size={50} className="text-green-500" />
                  <p className="text-green-600 font-bold text-sm">KYC Submitted!</p>
                  <p className="text-xs text-gray-400 text-center">KYC is now Pending review.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5 text-xs text-blue-700 font-medium">
                    <Send size={13} className="shrink-0" />
                    OTP sent to <strong className="ml-1">{form.email}</strong>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Enter OTP <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <KeyRound size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input value={otp} onChange={e => { setOtp(e.target.value); setErrors({}); }}
                        maxLength={6} placeholder="6-digit OTP"
                        className="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-sm font-mono tracking-widest bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none" />
                    </div>
                    {errors.otp && <p className="text-red-500 text-xs mt-1 font-medium">⚠️ {errors.otp}</p>}
                  </div>
                  {otpSent && (
                    <p className="text-[10px] text-gray-400">
                      {timer > 0 ? `⏳ Expires in ${timer}s` : "OTP expired."}
                    </p>
                  )}
                  {timer === 0 && (
                    <button onClick={sendOtpToEmail} disabled={loading}
                      className="flex items-center gap-1 text-blue-900 text-xs font-semibold underline disabled:opacity-60">
                      <RefreshCw size={11} /> {loading ? "Sending..." : "Resend OTP"}
                    </button>
                  )}
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => { setStep(2); setErrors({}); setOtpSent(false); setOtp(""); }}
                      className="flex-1 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">← Back</button>
                    <button onClick={handleSubmit} disabled={loading}
                      className="flex-1 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                      {loading ? <><Loader2 size={13} className="animate-spin" /> Submitting...</> : <><CheckCircle size={14} /> Submit KYC</>}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ADMIN KYC MAIN
══════════════════════════════════════ */
export default function AdminKYC() {
  const [kycList, setKycList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => { fetchKycs(); }, []);

  async function fetchKycs() {
    setLoading(true);
    const res = await adminGetAllKycs();
    if (res.ok && res.data?.data) setKycList(res.data.data);
    setLoading(false);
  }

  const counts = {
    All:      kycList.length,
    Verified: kycList.filter(k => k.status === "Verified").length,
    Pending:  kycList.filter(k => k.status === "Pending").length,
    Rejected: kycList.filter(k => k.status === "Rejected").length,
  };

  const filtered = kycList.filter(k =>
    (filter === "All" || k.status === filter) &&
    (k.name?.toLowerCase().includes(search.toLowerCase()) ||
      k.email?.toLowerCase().includes(search.toLowerCase()) ||
      k.pan?.toLowerCase().includes(search.toLowerCase()) ||
      k.aadhaar?.includes(search))
  );

  async function handleApprove(kyc) {
    setActionLoading(true);
    const res = await adminUpdateKycStatus(kyc.id, "Verified");
    setActionLoading(false);
    if (res.ok) {
      setKycList(prev => prev.map(k => k.id === kyc.id ? { ...k, status: "Verified" } : k));
      setModal(null); setSelected(null);
    } else alert(res.data?.message || "Failed to approve.");
  }

  async function handleReject() {
    if (!rejectReason.trim()) { setRejectError("Please provide a rejection reason."); return; }
    setActionLoading(true);
    const res = await adminUpdateKycStatus(selected.id, "Rejected", rejectReason);
    setActionLoading(false);
    if (res.ok) {
      setKycList(prev => prev.map(k => k.id === selected.id ? { ...k, status: "Rejected", rejectReason } : k));
      setModal(null); setSelected(null); setRejectReason(""); setRejectError("");
    } else alert(res.data?.message || "Failed to reject.");
  }

  function handleFormSubmit(newKYC) {
    if (newKYC) setKycList(prev => [newKYC, ...prev]);
    else fetchKycs();
    setShowForm(false);
  }

  const FILTERS = ["All", "Verified", "Pending", "Rejected"];
  const QUICK_REASONS = ["Document unclear", "Aadhaar mismatch", "Invalid PAN", "Photo mismatch", "Expired document"];

  return (
    <div className="font-sans">
      {showForm && <KYCForm onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />}

      <h2 className="text-base sm:text-lg font-black text-gray-800 mb-3">KYC Management</h2>

      {/* New KYC Button */}
      <div className="mb-4">
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all active:scale-95">
          <Plus size={14} /> Submit New KYC
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
        <StatCard label="Total KYC"  value={counts.All}      icon={FileText}     iconClass="text-blue-500"   />
        <StatCard label="Verified"   value={counts.Verified} icon={CheckCircle2} iconClass="text-green-500"  />
        <StatCard label="Pending"    value={counts.Pending}  icon={Clock}        iconClass="text-yellow-500" />
        <StatCard label="Rejected"   value={counts.Rejected} icon={XCircle}      iconClass="text-red-500"    />
      </div>

      {/* Alert */}
      {counts.Pending > 0 && (
        <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-xs text-amber-800 font-semibold">
          <AlertTriangle size={15} className="text-amber-500 shrink-0" />
          <strong>{counts.Pending} KYC verification{counts.Pending > 1 ? "s" : ""}</strong>&nbsp;pending review.
        </div>
      )}

      {/* Filter + Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-4">
        <div className="flex flex-wrap gap-1 bg-white border border-gray-200 rounded-xl p-1 w-full sm:w-auto">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap
                ${filter === f ? "bg-blue-900 text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}>
              {f}
              <span className={`ml-1.5 text-[10px] font-black px-1.5 py-0.5 rounded-full
                ${filter === f ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                {counts[f]}
              </span>
            </button>
          ))}
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search name, email or PAN..."
            className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-xs bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16 gap-2 text-gray-400 text-sm font-medium">
          <Loader2 size={18} className="animate-spin" /> Loading KYC records...
        </div>
      )}

      {/* Table — scrollable on mobile */}
      {!loading && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900">
                  {["#", "Name", "Email", "Aadhaar", "PAN", "Submitted", "Status", "Actions"].map(h => (
                    <th key={h} className="px-3 sm:px-4 py-3 text-left text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-gray-400 text-sm font-medium">
                      <FileText size={30} className="mx-auto mb-3 opacity-30" />
                      No records found
                    </td>
                  </tr>
                ) : filtered.map((k, i) => (
                  <tr key={k.id} className="hover:bg-blue-50/50 transition-colors border-b border-gray-50 last:border-0">
                    <td className="px-3 sm:px-4 py-3 text-xs text-gray-400 font-semibold">{i + 1}</td>
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-900 to-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {k.name?.charAt(0)}
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">{k.name}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{k.email}</td>
                    <td className="px-3 sm:px-4 py-3 text-xs font-mono text-gray-700 whitespace-nowrap">{k.aadhaar}</td>
                    <td className="px-3 sm:px-4 py-3 text-xs font-mono font-bold text-blue-600 whitespace-nowrap">{k.pan}</td>
                    <td className="px-3 sm:px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{k.submitted}</td>
                    <td className="px-3 sm:px-4 py-3"><StatusBadge status={k.status} /></td>
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex items-center gap-1 flex-wrap">
                        <button onClick={() => { setSelected(k); setModal("view"); }}
                          className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-[11px] font-bold rounded-lg transition-colors whitespace-nowrap">
                          <Eye size={11} /> View
                        </button>
                        {k.status === "Pending" && (
                          <>
                            <button onClick={() => { setSelected(k); setModal("approve"); }}
                              className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-green-50 hover:bg-green-100 text-green-700 text-[11px] font-bold rounded-lg transition-colors whitespace-nowrap">
                              <CheckCircle size={11} /> Approve
                            </button>
                            <button onClick={() => { setSelected(k); setModal("reject"); setRejectReason(""); setRejectError(""); }}
                              className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-bold rounded-lg transition-colors whitespace-nowrap">
                              <XCircle size={11} /> Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── VIEW MODAL ── */}
      {modal === "view" && selected && (
        <div className="fixed inset-0 bg-blue-950/50 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <h3 className="text-sm sm:text-base font-bold text-gray-800">🪪 KYC Details</h3>
              <button onClick={() => setModal(null)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
                <X size={15} />
              </button>
            </div>
            <div className="px-4 sm:px-6 py-4 overflow-y-auto flex-1 space-y-4">
              {/* Profile */}
              <div className="flex items-center gap-3 sm:gap-4 bg-gray-50 rounded-xl p-3 sm:p-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-900 to-blue-500 flex items-center justify-center text-white text-xl sm:text-2xl font-black shrink-0">
                  {selected.name?.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm sm:text-base">{selected.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{selected.email}</p>
                  <div className="mt-1.5"><StatusBadge status={selected.status} /></div>
                </div>
              </div>

              {/* Personal Info */}
              <div>
                <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-2 pb-2 border-b-2 border-gray-100">Personal Information</p>
                <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2">
                  {[["Phone", selected.phone], ["Date of Birth", selected.dob], ["Submitted", selected.submitted]].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{k}</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-700">{v}</p>
                    </div>
                  ))}
                  <div className="col-span-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Address</p>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700">{selected.address}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-2 pb-2 border-b-2 border-gray-100">Documents</p>
                <div className="divide-y divide-gray-100">
                  {[["Aadhaar Number", selected.aadhaar, false], ["PAN Number", selected.pan, true]].map(([k, v, isPan]) => (
                    <div key={k} className="flex justify-between items-center py-2.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{k}</span>
                      <span className={`text-xs sm:text-sm font-bold font-mono ${isPan ? "text-blue-600" : "text-gray-700"}`}>{v}</span>
                    </div>
                  ))}
                  {[["Aadhaar Doc", selected.aadhaarDoc], ["PAN Doc", selected.panDoc]].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center py-2.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{k}</span>
                      {v ? (
                        <a href={`http://localhost:5000/static/uploads/${v}`} target="_blank" rel="noreferrer"
                          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                          📄 {v}
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">Not uploaded</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rejection reason */}
              {selected.status === "Rejected" && selected.rejectReason && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide mb-1">Rejection Reason</p>
                  <p className="text-xs sm:text-sm font-semibold text-red-700">{selected.rejectReason}</p>
                </div>
              )}

              <button onClick={() => setModal(null)}
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-sm font-bold transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── APPROVE MODAL ── */}
      {modal === "approve" && selected && (
        <div className="fixed inset-0 bg-blue-950/50 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm sm:text-base">✅ Approve KYC</h3>
              <button onClick={() => setModal(null)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500">
                <X size={15} />
              </button>
            </div>
            <div className="px-4 sm:px-5 py-4 space-y-3">
              <p className="text-sm text-gray-700">Approve KYC for <strong>{selected.name}</strong>?</p>
              <p className="text-xs text-gray-500">PAN: <span className="font-mono font-bold text-gray-700">{selected.pan}</span></p>
              <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-xs text-green-700 font-semibold">
                ✅ Status will be updated to <strong>Verified</strong>.
              </div>
              <div className="flex gap-2">
                <button onClick={() => setModal(null)} className="flex-1 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={() => handleApprove(selected)} disabled={actionLoading}
                  className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {actionLoading ? <><Loader2 size={13} className="animate-spin" /> Approving...</> : "Yes, Approve"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── REJECT MODAL ── */}
      {modal === "reject" && selected && (
        <div className="fixed inset-0 bg-blue-950/50 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm sm:text-base">❌ Reject KYC</h3>
              <button onClick={() => setModal(null)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500">
                <X size={15} />
              </button>
            </div>
            <div className="px-4 sm:px-5 py-4 space-y-3">
              <p className="text-sm text-gray-700">Reject KYC for <strong>{selected.name}</strong>?</p>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Rejection Reason <span className="text-red-500">*</span>
                </label>
                <textarea value={rejectReason} onChange={e => { setRejectReason(e.target.value); setRejectError(""); }}
                  rows={3} placeholder="e.g. Document unclear, Aadhaar mismatch..."
                  className={`w-full border rounded-xl px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none resize-none transition-all
                    ${rejectError ? "border-red-400" : "border-gray-200"}`} />
                {rejectError && <p className="text-red-500 text-xs mt-1 font-medium">⚠️ {rejectError}</p>}
              </div>
              {/* Quick select */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Quick Select</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_REASONS.map(r => (
                    <button key={r} onClick={() => setRejectReason(r)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all
                        ${rejectReason === r ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-xs text-red-600 font-semibold">
                ⚠️ User will need to re-submit after rejection.
              </div>
              <div className="flex gap-2">
                <button onClick={() => setModal(null)} className="flex-1 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleReject} disabled={actionLoading}
                  className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {actionLoading ? <><Loader2 size={13} className="animate-spin" /> Rejecting...</> : "Yes, Reject"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}