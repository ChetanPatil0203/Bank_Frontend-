import { useState, useEffect } from "react";
import {
  Search, Eye, CheckCircle, XCircle, Clock,
  FileText, AlertTriangle, Plus, User,
  Phone, Mail, MapPin, Calendar,
  ShieldCheck, CreditCard, KeyRound,
  Send, RefreshCw, Upload, CheckCircle2
} from "lucide-react";

const KYC_DATA = [
  { id: "KYC001", name: "Chetan Patil", email: "chetan@gmail.com", phone: "9823456781", dob: "15 Jan 1995", aadhaar: "XXXX-XXXX-2846", pan: "ABCDE1234F", address: "123, Nashik Road, Nashik - 422001", submitted: "12 Jan 2025", status: "Verified", aadhaarDoc: "aadhaar_chetan.pdf", panDoc: "pan_chetan.pdf" },
  { id: "KYC002", name: "Rohit Sharma", email: "rohit@gmail.com", phone: "9712345678", dob: "22 Mar 1992", aadhaar: "XXXX-XXXX-2031", pan: "FGHIJ5678K", address: "456, Pune Road, Pune - 411001", submitted: "03 Feb 2025", status: "Verified", aadhaarDoc: "aadhaar_rohit.pdf", panDoc: "pan_rohit.pdf" },
  { id: "KYC003", name: "Priya Desai", email: "priya@gmail.com", phone: "9654321987", dob: "08 Jul 1998", aadhaar: "XXXX-XXXX-8475", pan: "KLMNO9012P", address: "789, MG Road, Pune - 411002", submitted: "27 Feb 2025", status: "Pending", aadhaarDoc: "aadhaar_priya.pdf", panDoc: "pan_priya.pdf" },
  { id: "KYC004", name: "Amit Joshi", email: "amit@gmail.com", phone: "9876543210", dob: "30 Nov 1990", aadhaar: "XXXX-XXXX-2635", pan: "PQRST3456U", address: "321, Station Road, Nashik - 422002", submitted: "15 Mar 2025", status: "Pending", aadhaarDoc: "aadhaar_amit.pdf", panDoc: "pan_amit.pdf" },
  { id: "KYC005", name: "Sneha Kulkarni", email: "sneha@gmail.com", phone: "9988776655", dob: "14 Apr 1996", aadhaar: "XXXX-XXXX-7561", pan: "UVWXY7890Z", address: "654, FC Road, Pune - 411004", submitted: "01 Apr 2025", status: "Verified", aadhaarDoc: "aadhaar_sneha.pdf", panDoc: "pan_sneha.pdf" },
  { id: "KYC006", name: "Vikas Nair", email: "vikas@gmail.com", phone: "9111222333", dob: "19 Sep 1988", aadhaar: "XXXX-XXXX-4628", pan: "ZABCD2345E", address: "987, Link Road, Mumbai - 400001", submitted: "18 Apr 2025", status: "Rejected", aadhaarDoc: "aadhaar_vikas.pdf", panDoc: "pan_vikas.pdf" },
  { id: "KYC007", name: "Arjun Bhosale", email: "arjun@gmail.com", phone: "9823111222", dob: "05 Dec 1993", aadhaar: "XXXX-XXXX-9012", pan: "BCDEF6789G", address: "147, Nagar Road, Ahmednagar - 414001", submitted: "20 Apr 2025", status: "Pending", aadhaarDoc: "aadhaar_arjun.pdf", panDoc: "pan_arjun.pdf" },
  { id: "KYC008", name: "Divya Shinde", email: "divya@gmail.com", phone: "9765432109", dob: "25 Feb 1997", aadhaar: "XXXX-XXXX-3456", pan: "HIJKL0123M", address: "258, Karve Road, Pune - 411052", submitted: "22 Apr 2025", status: "Pending", aadhaarDoc: "aadhaar_divya.pdf", panDoc: "pan_divya.pdf" },
];

const C = {
  navy: "#0f1f4b", bg: "#f0f4ff", card: "#ffffff",
  text: "#1e293b", muted: "#64748b", border: "#e2e8f0",
  accent: "#3b82f6", green: "#10b981", red: "#ef4444",
  gold: "#f59e0b", purple: "#8b5cf6",
};

const RESPONSIVE_STYLES = `
  @media (max-width: 768px) {
    .stats-grid { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
    .stat-card-wrap { 
      background: #fff !important;
      border: 1px solid #f1f5f9 !important;
      border-radius: 18px !important;
      padding: 14px !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 8px !important;
      transition: all 0.3s ease !important;
      box-shadow: 0 4px 20px -4px rgba(0,0,0,0.05) !important;
      width: 100% !important;
      max-width: none !important;
    }
  }
  @media (min-width: 769px) {
    .stat-card-wrap {
      flex: 1 1 calc(25% - 9px) !important;
      max-width: calc(25% - 9px) !important;
      min-width: 140px !important;
    }
  }



    .stat-card-wrap:hover {
      transform: translateY(-5px) !important;
      box-shadow: 0 12px 40px -12px rgba(0,0,0,0.12) !important;
    }
    .stat-card-wrap.blue:hover { border-color: #3b82f6 !important; }
    .stat-card-wrap.green:hover { border-color: #10b981 !important; }
    .stat-card-wrap.gold:hover { border-color: #f59e0b !important; }
    .stat-card-wrap.red:hover { border-color: #ef4444 !important; }



    .header-row { flex-direction: column !important; align-items: stretch !important; }
    .tab-search-row { flex-direction: column !important; align-items: stretch !important; gap: 16px !important; }
    .search-box-wrap { max-width: none !important; }
    .tabs-wrap { overflow-x: auto !important; padding-bottom: 4px !important; display: flex !important; flex-wrap: nowrap !important; width: 100% !important; -webkit-overflow-scrolling: touch; }
    .tabs-wrap button { flex-shrink: 0 !important; white-space: nowrap !important; }

    .table-to-hide { display: none !important; }
    .cards-to-show { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
    .mobile-card { 
      background: #fff !important; 
      border: 1px solid #e2e8f0 !important; 
      border-radius: 12px !important; 
      padding: 10px !important; 
      flex: none !important;
      width: 100% !important;
      max-width: none !important;
      box-sizing: border-box !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important;
    }


    .modal-container { padding: 10px !important; }
    .modal-content { max-width: 95% !important; border-radius: 16px !important; max-height: 90vh !important; }
    .form-grid { grid-template-columns: 1fr !important; }
    .stepper-wrap { flex-wrap: wrap !important; gap: 8px !important; }
    .stepper-item { flex: none !important; }
    .stepper-line { display: none !important; }
  }
  @media (min-width: 769px) {
    .cards-to-show { display: none !important; }
  }
  @media (max-width: 480px) {
    .stat-card-wrap { flex: 1 1 100% !important; }
  }

`;


function StatusBadge({ status }) {
  const map = {
    Verified: { bg: "#dcfce7", color: "#15803d" },
    Pending: { bg: "#fef9c3", color: "#854d0e" },
    Rejected: { bg: "#fee2e2", color: "#b91c1c" },
  };
  const s = map[status] || { bg: "#f1f5f9", color: "#475569" };
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99, letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, display: "inline-block" }} />
      {status}
    </span>
  );
}

function StatCard({ label, value, icon: Icon, iconBg, iconColor, cls }) {
  return (
    <div className={`stat-card-wrap ${cls}`} style={{
      background: C.card,
      borderRadius: 18,
      padding: "14px 16px",
      boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)",
      border: `1px solid #f1f5f9`,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      transition: "all 0.3s ease",
      boxSizing: "border-box",
    }}>



      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 11, color: C.muted, margin: 0, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>{label}</p>

        <div style={{ width: 38, height: 38, borderRadius: 10, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} color={iconColor} />
        </div>
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>{value}</h3>


    </div>
  );
}

/* ─────────────────────────────────────────
   KYC FORM  —  3 steps: Personal → Docs → OTP
───────────────────────────────────────── */
function KYCForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", dob: "", address: "",
    aadhaar: "", pan: "", aadhaarDoc: null, panDoc: null,
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  // OTP state
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) interval = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  /* ── Validations ── */
  function validateStep1() {
    const err = {};
    if (!form.name.trim()) err.name = "Full name is required";
    if (!form.email.trim()) err.email = "Email is required";
    if (!form.phone.trim() || form.phone.length !== 10) err.phone = "Please enter a valid 10-digit phone number";
    if (!form.dob.trim()) err.dob = "Date of birth is required";
    if (!form.address.trim()) err.address = "Address is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function validateStep2() {
    const err = {};
    if (!form.aadhaar.trim() || form.aadhaar.replace(/-/g, "").length !== 12) err.aadhaar = "Please enter a valid 12-digit Aadhaar number";
    if (!form.pan.trim() || form.pan.length !== 10) err.pan = "Please enter a valid 10-character PAN number";
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  /* ── OTP ── */
  function generateOtp() {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    setOtp("");
    setTimer(30);
    alert("Demo OTP: " + newOtp);
  }

  /* ── Step navigation ── */
  function handleNext1() { if (validateStep1()) setStep(2); }

  function handleNext2() {
    if (!validateStep2()) return;
    setStep(3);
    generateOtp();
  }

  function handleSubmit() {
    if (!otpSent) { setErrors({ otp: "Please send OTP first." }); return; }
    if (timer === 0) { setErrors({ otp: "OTP expired. Please resend." }); return; }
    if (otp !== generatedOtp) { setErrors({ otp: "Invalid OTP. Please try again." }); return; }
    setOtpVerified(true);
    setErrors({});
    onSubmit({
      id: `KYC${String(Date.now()).slice(-4)}`,
      name: form.name, email: form.email, phone: form.phone, dob: form.dob,
      aadhaar: `XXXX-XXXX-${form.aadhaar.slice(-4)}`,
      pan: form.pan.toUpperCase(), address: form.address,
      submitted: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Pending",
      aadhaarDoc: `aadhaar_${form.name.split(" ")[0].toLowerCase()}.pdf`,
      panDoc: `pan_${form.name.split(" ")[0].toLowerCase()}.pdf`,
    });
  }

  /* ── Shared styles ── */
  const inputStyle = (field) => ({
    width: "100%", padding: "10px 12px 10px 32px",
    border: `1.5px solid ${errors[field] ? C.red : C.border}`,
    borderRadius: 10, fontSize: 13, color: C.text, outline: "none",
    background: "#f8faff", fontFamily: "inherit", boxSizing: "border-box",
  });
  const labelStyle = { fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6 };
  const iconStyle = { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.muted, pointerEvents: "none" };
  const errText = (field) => errors[field] && <p style={{ fontSize: 12, color: C.red, margin: "4px 0 0", fontWeight: 600 }}>⚠️ {errors[field]}</p>;

  const STEPS = ["Personal Info", "Documents", "OTP"];

  return (
    <div className="modal-container" style={{ position: "fixed", inset: 0, background: "rgba(15,31,75,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div className="modal-content" style={{ background: C.card, borderRadius: 20, width: "100%", maxWidth: 520, boxShadow: "0 20px 60px rgba(15,31,75,0.2)", border: `1px solid ${C.border}`, maxHeight: "92vh", overflowY: "auto" }}>


        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: C.card, zIndex: 10 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: C.text, display: "flex", alignItems: "center", gap: 8 }}>
              <FileText size={17} color={C.navy} /> Submit New KYC
            </h3>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: C.muted }}>
              Step {step} of 3 — {step === 1 ? "Personal Information" : step === 2 ? "Document Details" : "OTP Verification"}
            </p>
          </div>
          <button onClick={onCancel} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.muted }}>✕</button>
        </div>

        {/* Stepper */}
        <div className="stepper-wrap" style={{ display: "flex", alignItems: "center", padding: "20px 24px 8px" }}>
          {STEPS.map((label, i) => {
            const s = i + 1;
            const active = step === s;
            const done = step > s;
            return (
              <div key={s} className="stepper-item" style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : 0 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, background: active || done ? C.navy : "#f1f5f9", color: active || done ? "#fff" : C.muted }}>
                  {done ? "✓" : s}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, marginLeft: 8, color: active ? C.navy : C.muted, whiteSpace: "nowrap" }}>{label}</span>
                {i < STEPS.length - 1 && (
                  <div className="stepper-line" style={{ flex: 1, height: 2, margin: "0 12px", borderRadius: 99, background: step > s ? C.navy : "#e2e8f0" }} />
                )}
              </div>
            );
          })}
        </div>


        <div style={{ padding: "16px 24px 24px" }}>

          {/* ── STEP 1: Personal Info ── */}
          {step === 1 && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16, paddingBottom: 8, borderBottom: "2px solid #f1f5f9" }}>Personal Information</p>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Full Name <span style={{ color: C.red }}>*</span></label>
                <div style={{ position: "relative" }}>
                  <User size={14} style={iconStyle} />
                  <input value={form.name} onChange={f("name")} placeholder="e.g. Rahul Mehta" style={inputStyle("name")} />
                </div>
                {errText("name")}
              </div>

              <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>

                <div>
                  <label style={labelStyle}>Email <span style={{ color: C.red }}>*</span></label>
                  <div style={{ position: "relative" }}>
                    <Mail size={14} style={iconStyle} />
                    <input type="email" value={form.email} onChange={f("email")} placeholder="email@gmail.com" style={inputStyle("email")} />
                  </div>
                  {errText("email")}
                </div>
                <div>
                  <label style={labelStyle}>Phone <span style={{ color: C.red }}>*</span></label>
                  <div style={{ position: "relative" }}>
                    <Phone size={14} style={iconStyle} />
                    <input type="tel" value={form.phone} onChange={f("phone")} placeholder="9XXXXXXXXX" maxLength={10} style={inputStyle("phone")} />
                  </div>
                  {errText("phone")}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Date of Birth <span style={{ color: C.red }}>*</span></label>
                <div style={{ position: "relative" }}>
                  <Calendar size={14} style={iconStyle} />
                  <input type="date" value={form.dob} onChange={f("dob")} style={inputStyle("dob")} />
                </div>
                {errText("dob")}
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Address <span style={{ color: C.red }}>*</span></label>
                <div style={{ position: "relative" }}>
                  <MapPin size={14} style={{ ...iconStyle, top: 14, transform: "none" }} />
                  <textarea value={form.address} onChange={f("address")} placeholder="Full address with city & pincode" rows={2} style={{ ...inputStyle("address"), resize: "none" }} />
                </div>
                {errText("address")}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={onCancel} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: "#fff", color: C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                <button onClick={handleNext1} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: C.navy, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Documents ── */}
          {step === 2 && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16, paddingBottom: 8, borderBottom: "2px solid #f1f5f9" }}>Document Details</p>

              <div style={{ marginBottom: 6 }}>
                <label style={labelStyle}>Aadhaar Number <span style={{ color: C.red }}>*</span></label>
                <div style={{ position: "relative" }}>
                  <ShieldCheck size={14} style={iconStyle} />
                  <input value={form.aadhaar} onChange={f("aadhaar")} placeholder="12-digit Aadhaar number" maxLength={12} style={{ ...inputStyle("aadhaar"), fontFamily: "monospace" }} />
                </div>
                {errors.aadhaar
                  ? <p style={{ fontSize: 12, color: C.red, margin: "4px 0 0", fontWeight: 600 }}>⚠️ {errors.aadhaar}</p>
                  : <p style={{ fontSize: 12, color: C.muted, margin: "4px 0 12px" }}>Only the last 4 digits will be stored for security.</p>
                }
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>PAN Number <span style={{ color: C.red }}>*</span></label>
                <div style={{ position: "relative" }}>
                  <CreditCard size={14} style={iconStyle} />
                  <input value={form.pan} onChange={(e) => setForm({ ...form, pan: e.target.value.toUpperCase() })} placeholder="e.g. ABCDE1234F" maxLength={10} style={{ ...inputStyle("pan"), fontFamily: "monospace", textTransform: "uppercase" }} />
                </div>
                {errText("pan")}
              </div>

              {/* Aadhaar Upload */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Aadhaar Document Upload</label>
                <div style={{ border: `2px dashed ${form.aadhaarDoc ? C.green : C.border}`, borderRadius: 12, padding: 14, textAlign: "center", background: form.aadhaarDoc ? "#f0fdf4" : "#f8faff" }}>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setForm({ ...form, aadhaarDoc: e.target.files[0] })} style={{ display: "none" }} id="aadhaar-upload" />
                  <label htmlFor="aadhaar-upload" style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    {form.aadhaarDoc
                      ? <p style={{ color: C.green, fontWeight: 700, fontSize: 13, margin: 0 }}>✅ {form.aadhaarDoc.name}</p>
                      : <>
                        <Upload size={18} color={C.muted} />
                        <p style={{ color: C.muted, fontWeight: 600, fontSize: 13, margin: 0 }}>Upload Aadhaar PDF or Image</p>
                        <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>Accepted: PDF, JPG, PNG — Max 5MB</p>
                      </>
                    }
                  </label>
                </div>
              </div>

              {/* PAN Upload */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>PAN Document Upload</label>
                <div style={{ border: `2px dashed ${form.panDoc ? C.green : C.border}`, borderRadius: 12, padding: 14, textAlign: "center", background: form.panDoc ? "#f0fdf4" : "#f8faff" }}>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setForm({ ...form, panDoc: e.target.files[0] })} style={{ display: "none" }} id="pan-upload" />
                  <label htmlFor="pan-upload" style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    {form.panDoc
                      ? <p style={{ color: C.green, fontWeight: 700, fontSize: 13, margin: 0 }}>✅ {form.panDoc.name}</p>
                      : <>
                        <Upload size={18} color={C.muted} />
                        <p style={{ color: C.muted, fontWeight: 600, fontSize: 13, margin: 0 }}>Upload PAN PDF or Image</p>
                        <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>Accepted: PDF, JPG, PNG — Max 5MB</p>
                      </>
                    }
                  </label>
                </div>
              </div>

              <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#1d4ed8", fontWeight: 600 }}>
                ℹ️ After submission, KYC will be set to <strong>Pending</strong> status and will be reviewed by an admin.
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => { setStep(1); setErrors({}); }} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: "#fff", color: C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>← Back</button>
                <button onClick={handleNext2} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: C.navy, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: OTP ── */}
          {step === 3 && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16, paddingBottom: 8, borderBottom: "2px solid #f1f5f9" }}>OTP Verification</p>

              {otpVerified ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <CheckCircle size={52} color={C.green} style={{ display: "block", margin: "0 auto 12px" }} />
                  <p style={{ fontSize: 16, fontWeight: 800, color: C.green, margin: "0 0 6px" }}>KYC Successfully Verified!</p>
                  <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Your KYC has been submitted and is under review.</p>
                </div>
              ) : (
                <>
                  {/* Info banner */}
                  <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#1d4ed8", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                    <Send size={14} color="#1d4ed8" style={{ flexShrink: 0 }} />
                    OTP sent to <strong>{form.phone}</strong>. Enter it below to verify and submit your KYC.
                  </div>

                  {/* OTP input */}
                  <div style={{ marginBottom: 6 }}>
                    <label style={labelStyle}>Enter OTP <span style={{ color: C.red }}>*</span></label>
                    <div style={{ position: "relative" }}>
                      <KeyRound size={14} style={iconStyle} />
                      <input
                        value={otp}
                        onChange={e => { setOtp(e.target.value); setErrors({}); }}
                        placeholder="6-digit OTP"
                        maxLength={6}
                        style={{ ...inputStyle("otp"), fontFamily: "monospace", letterSpacing: 4, fontSize: 16 }}
                      />
                    </div>
                    {errText("otp")}
                  </div>

                  {/* Timer */}
                  {otpSent && (
                    <p style={{ fontSize: 12, color: C.muted, margin: "6px 0 12px" }}>
                      {timer > 0 ? `OTP expires in ${timer} seconds` : "OTP expired."}
                    </p>
                  )}

                  {/* Resend */}
                  {timer === 0 && (
                    <button onClick={generateOtp} style={{ background: "none", border: "none", color: C.navy, fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, marginBottom: 20, padding: 0, textDecoration: "underline" }}>
                      <RefreshCw size={12} /> Resend OTP
                    </button>
                  )}

                  <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                    <button onClick={() => { setStep(2); setErrors({}); setOtpSent(false); setOtp(""); }} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: "#fff", color: C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>← Back</button>
                    <button onClick={handleSubmit} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: C.navy, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <CheckCircle size={15} /> Submit KYC
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

/* ─────────────────────────────────────────
   ADMIN KYC  —  unchanged below this line
───────────────────────────────────────── */
export default function AdminKYC() {
  const [kycList, setKycList] = useState(KYC_DATA);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filtered = kycList.filter(k =>
    (filter === "All" || k.status === filter) &&
    (k.name.toLowerCase().includes(search.toLowerCase()) ||
      k.email.toLowerCase().includes(search.toLowerCase()) ||
      k.pan.toLowerCase().includes(search.toLowerCase()) ||
      k.aadhaar.includes(search))
  );

  function handleApprove(kyc) {
    setKycList(prev => prev.map(k => k.id === kyc.id ? { ...k, status: "Verified" } : k));
    setModal(null); setSelected(null);
  }

  function handleReject() {
    if (!rejectReason.trim()) { setRejectError("Please provide a rejection reason."); return; }
    setKycList(prev => prev.map(k => k.id === selected.id ? { ...k, status: "Rejected", rejectReason } : k));
    setModal(null); setSelected(null); setRejectReason(""); setRejectError("");
  }

  function handleFormSubmit(newKYC) {
    setKycList(prev => [newKYC, ...prev]);
    setShowForm(false);
  }

  const counts = {
    All: kycList.length,
    Verified: kycList.filter(k => k.status === "Verified").length,
    Pending: kycList.filter(k => k.status === "Pending").length,
    Rejected: kycList.filter(k => k.status === "Rejected").length,
  };

  const FILTERS = ["All", "Verified", "Pending", "Rejected"];

  const TH = ({ children, center }) => (
    <th style={{ padding: "12px 16px", textAlign: center ? "center" : "left", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", background: "#f8faff", whiteSpace: "nowrap", borderBottom: `1px solid ${C.border}` }}>{children}</th>
  );
  const TD = ({ children, center }) => (
    <td style={{ padding: "13px 16px", fontSize: 13, color: C.text, borderBottom: "1px solid #f1f5f9", whiteSpace: "nowrap", textAlign: center ? "center" : "left" }}>{children}</td>
  );

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <style>{RESPONSIVE_STYLES}</style>
      {showForm && <KYCForm onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />}


      {/* Header */}
      <div className="mb-3">
        <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: 0 }}>KYC Management</h2>
      </div>

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setShowForm(true)} style={{ display: "flex", alignItems: "center", gap: 8, background: C.navy, color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(15,31,75,0.15)" }}>
          <Plus size={15} /> Submit New KYC
        </button>
      </div>


      {/* Stat Cards */}
      <div className="stats-grid" style={{ display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>

        <StatCard cls="blue" label="Total KYC" value={counts.All} icon={FileText} iconColor={C.accent} />
        <StatCard cls="green" label="Verified" value={counts.Verified} icon={CheckCircle2} iconColor={C.green} />
        <StatCard cls="gold" label="Pending" value={counts.Pending} icon={Clock} iconColor={C.gold} />
        <StatCard cls="red" label="Rejected" value={counts.Rejected} icon={XCircle} iconColor={C.red} />
      </div>



      {/* Pending Alert */}
      {counts.Pending > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "12px 18px", marginBottom: 20, fontSize: 13, color: "#92400e", fontWeight: 600 }}>
          <AlertTriangle size={16} color={C.gold} style={{ flexShrink: 0 }} />
          <span><strong>{counts.Pending} KYC verification{counts.Pending > 1 ? "s" : ""}</strong> pending review — please approve or reject.</span>
        </div>
      )}

      {/* Search + Filter */}
      <div className="tab-search-row" style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        {/* Tabs on the Left */}
        <div className="tabs-wrap" style={{ display: "flex", gap: 4, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 4 }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: filter === f ? C.navy : "transparent", color: filter === f ? "#fff" : C.muted, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap" }}>

              {f} <span style={{ background: filter === f ? "rgba(255,255,255,0.2)" : C.border, color: filter === f ? "#fff" : C.muted, fontSize: 10, fontWeight: 800, padding: "1px 7px", borderRadius: 99, marginLeft: 4 }}>{counts[f]}</span>
            </button>
          ))}
        </div>

        {/* Search on the Right */}
        <div className="search-box-wrap" style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 320 }}>

          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: C.muted }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email or PAN..."
            style={{ width: "100%", boxSizing: "border-box", paddingLeft: 32, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", background: C.card, fontFamily: "inherit" }} />
        </div>
      </div>

      {/* Table */}
      <div className="table-to-hide" style={{ background: C.card, borderRadius: 16, boxShadow: "0 2px 12px rgba(15,31,75,0.07)", border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "linear-gradient(to right, #1e3a8a, #153e75, #0f172a)" }}>
                {["#", "Name", "Email", "Aadhaar", "PAN", "Submitted", "Status", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: 60, textAlign: "center", color: C.muted, fontSize: 14, fontWeight: 600 }}>
                    <FileText size={32} style={{ display: "block", margin: "0 auto 12px", opacity: 0.3 }} />
                    No records found
                  </td>
                </tr>
              ) : filtered.map((k, i) => (
                <tr key={k.id}
                  onMouseEnter={e => e.currentTarget.style.background = "#f8faff"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}
                >
                  <TD><span style={{ color: C.muted, fontWeight: 600 }}>{i + 1}</span></TD>
                  <TD>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#1e3a7b,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {k.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 700 }}>{k.name}</span>
                    </div>
                  </TD>
                  <TD><span style={{ color: C.muted }}>{k.email}</span></TD>
                  <TD><span style={{ fontFamily: "monospace", fontSize: 12 }}>{k.aadhaar}</span></TD>
                  <TD><span style={{ fontFamily: "monospace", fontWeight: 700, color: C.accent }}>{k.pan}</span></TD>
                  <TD><span style={{ color: C.muted }}>{k.submitted}</span></TD>
                  <TD><StatusBadge status={k.status} /></TD>
                  <TD center>
                    <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                      <button onClick={() => { setSelected(k); setModal("view"); }}
                        style={{ background: "#eff6ff", color: C.accent, border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                        <Eye size={12} /> View
                      </button>
                      {k.status === "Pending" && (
                        <>
                          <button onClick={() => { setSelected(k); setModal("approve"); }}
                            style={{ background: "#dcfce7", color: "#15803d", border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                            <CheckCircle size={12} /> Approve
                          </button>
                          <button onClick={() => { setSelected(k); setModal("reject"); setRejectReason(""); setRejectError(""); }}
                            style={{ background: "#fee2e2", color: C.red, border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                            <XCircle size={12} /> Reject
                          </button>
                        </>
                      )}
                    </div>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="cards-to-show">
        {filtered.map(k => (
          <div key={k.id} className="mobile-card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: C.accent }}>{k.id}</span>
              <StatusBadge status={k.status} />
            </div>
            <h4 style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 800 }}>{k.name}</h4>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.border}`, paddingTop: 8, marginTop: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: C.text }}>{k.pan}</span>
              <button onClick={() => { setSelected(k); setModal("view"); }} style={{ border: "none", background: "#eff6ff", color: C.accent, padding: "4px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700 }}>View</button>
            </div>
          </div>
        ))}
      </div>


      {/* View Modal */}
      {modal === "view" && selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,31,75,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: C.card, borderRadius: 20, width: "100%", maxWidth: 520, boxShadow: "0 20px 60px rgba(15,31,75,0.2)", border: `1px solid ${C.border}`, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: C.card }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: C.text }}>🪪 KYC Details</h3>
              <button onClick={() => setModal(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.muted }}>✕</button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, padding: 16, background: "#f8faff", borderRadius: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#1e3a7b,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22, fontWeight: 800, flexShrink: 0 }}>
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 800, color: C.text, margin: 0 }}>{selected.name}</p>
                  <p style={{ fontSize: 13, color: C.muted, margin: "2px 0 6px" }}>{selected.email}</p>
                  <StatusBadge status={selected.status} />
                </div>
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, paddingBottom: 8, borderBottom: "2px solid #f1f5f9" }}>Personal Information</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[["Phone", selected.phone], ["Date of Birth", selected.dob], ["Address", selected.address], ["Submitted On", selected.submitted]].map(([k, v]) => (
                  <div key={k} style={k === "Address" ? { gridColumn: "1 / -1" } : {}}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>{k}</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>{v}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, paddingBottom: 8, borderBottom: "2px solid #f1f5f9" }}>Documents</p>
              <div style={{ marginBottom: 20 }}>
                {[["Aadhaar Number", selected.aadhaar, true], ["PAN Number", selected.pan, true], ["Aadhaar Doc", selected.aadhaarDoc, false], ["PAN Doc", selected.panDoc, false]].map(([k, v, isMono]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: String(k).includes("Doc") ? C.accent : C.text, fontFamily: isMono ? "monospace" : "inherit", textDecoration: String(k).includes("Doc") ? "underline" : "none", cursor: String(k).includes("Doc") ? "pointer" : "default" }}>
                      {String(k).includes("Doc") ? `📄 ${v}` : v}
                    </span>
                  </div>
                ))}
              </div>
              {selected.status === "Rejected" && selected.rejectReason && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: C.red, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>Rejection Reason</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#b91c1c", margin: 0 }}>{selected.rejectReason}</p>
                </div>
              )}
              {selected.status === "Pending" ? (
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setModal("approve")} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: C.green, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <CheckCircle size={15} /> Approve
                  </button>
                  <button onClick={() => { setModal("reject"); setRejectReason(""); setRejectError(""); }} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: C.red, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <XCircle size={15} /> Reject
                  </button>
                </div>
              ) : (
                <button onClick={() => setModal(null)} style={{ width: "100%", padding: "10px", borderRadius: 10, border: "none", background: C.navy, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Close</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {modal === "approve" && selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,31,75,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: C.card, borderRadius: 20, width: "100%", maxWidth: 440, boxShadow: "0 20px 60px rgba(15,31,75,0.2)", border: `1px solid ${C.border}` }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: C.text }}>✅ Approve KYC</h3>
              <button onClick={() => setModal(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.muted }}>✕</button>
            </div>
            <div style={{ padding: 24 }}>
              <p style={{ fontSize: 14, color: C.text, margin: "0 0 8px" }}>Are you sure you want to approve KYC for <strong>{selected.name}</strong>?</p>
              <p style={{ fontSize: 13, color: C.muted, margin: "0 0 20px" }}>PAN: <span style={{ fontFamily: "monospace", fontWeight: 700, color: C.text }}>{selected.pan}</span> &nbsp;|&nbsp; Aadhaar: <span style={{ fontFamily: "monospace", fontWeight: 700, color: C.text }}>{selected.aadhaar}</span></p>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#15803d", fontWeight: 600 }}>
                ✅ Status will be updated to <strong>Verified</strong>.
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: "#fff", color: C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                <button onClick={() => handleApprove(selected)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: C.green, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Yes, Approve</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {modal === "reject" && selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,31,75,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: C.card, borderRadius: 20, width: "100%", maxWidth: 440, boxShadow: "0 20px 60px rgba(15,31,75,0.2)", border: `1px solid ${C.border}` }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: C.text }}>❌ Reject KYC</h3>
              <button onClick={() => setModal(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.muted }}>✕</button>
            </div>
            <div style={{ padding: 24 }}>
              <p style={{ fontSize: 14, color: C.text, margin: "0 0 16px" }}>Are you sure you want to reject KYC for <strong>{selected.name}</strong>?</p>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                  Rejection Reason <span style={{ color: C.red }}>*</span>
                </label>
                <textarea value={rejectReason} onChange={e => { setRejectReason(e.target.value); setRejectError(""); }}
                  placeholder="e.g. Document unclear, Aadhaar mismatch, Invalid PAN..." rows={3}
                  style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${rejectError ? C.red : C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", background: "#f8faff", fontFamily: "inherit", boxSizing: "border-box", resize: "none" }} />
                {rejectError && <p style={{ fontSize: 12, color: C.red, margin: "4px 0 0", fontWeight: 600 }}>⚠️ {rejectError}</p>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Quick Select</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Document unclear", "Aadhaar mismatch", "Invalid PAN", "Photo mismatch", "Expired document"].map(r => (
                    <button key={r} onClick={() => setRejectReason(r)}
                      style={{ padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: `1px solid ${rejectReason === r ? C.red : C.border}`, background: rejectReason === r ? C.red : "#fff", color: rejectReason === r ? "#fff" : C.muted }}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: C.red, fontWeight: 600 }}>
                ⚠️ The user will need to re-submit their KYC documents after rejection.
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: "#fff", color: C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                <button onClick={handleReject} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: C.red, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Yes, Reject</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}