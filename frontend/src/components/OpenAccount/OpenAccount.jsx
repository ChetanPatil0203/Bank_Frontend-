import { useState, useEffect, useRef } from "react";
import {
  CheckCircle, AlertCircle, Loader,
  User, Users, Calendar, UserCheck,
  Phone, Mail, MapPin,
  ShieldCheck, CreditCard,
  Landmark, GitBranch,
  UserPlus, Heart,
  ImagePlus, X,
  FileText, PenLine, Clock, RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { openAccount } from "../../utils/apiServices";

/* ── SUCCESS POPUP ── */
function SuccessPopup({ data }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(10,20,50,0.75)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, overflow: "hidden",
        maxWidth: 440, width: "100%",
        boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
        animation: "popIn 0.45s cubic-bezier(.22,1,.36,1)",
      }}>
        <div style={{
          background: "linear-gradient(135deg, #0d1b3e 0%, #1a2f5e 50%, #0f2460 100%)",
          padding: "36px 32px 32px", textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
          <div style={{ position:"absolute", bottom:-30, left:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.03)" }}/>
          <div style={{ display:"flex", justifyContent:"center", marginBottom: 16, position:"relative", zIndex:1 }}>
            <CheckCircle size={52} color="#4ade80" strokeWidth={1.8} style={{ filter: "drop-shadow(0 0 12px rgba(74,222,128,0.4))" }}/>
          </div>
          <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, position:"relative", zIndex:1 }}>
            Account Opened Successfully
          </p>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: 0, position:"relative", zIndex:1 }}>
            Welcome, {data.bank_holder_name}
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 8, position:"relative", zIndex:1 }}>
            Your bank account is now active and ready to use.
          </p>
        </div>
        <div style={{ padding: "24px 28px", background: "#f8f9fc" }}>
          <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 14, padding: "14px 18px", marginBottom: 12 }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Account Number</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#0d1b3e", fontFamily: "monospace", letterSpacing: 3 }}>{data.account_number}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:12, padding:"12px 14px" }}>
              <p style={{ fontSize:10, fontWeight:600, color:"#94a3b8", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>IFSC Code</p>
              <p style={{ fontSize:14, fontWeight:600, color:"#1e293b", fontFamily:"monospace" }}>{data.ifsc}</p>
            </div>
            <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:12, padding:"12px 14px" }}>
              <p style={{ fontSize:10, fontWeight:600, color:"#94a3b8", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Account Type</p>
              <p style={{ fontSize:14, fontWeight:600, color:"#1e293b" }}>{data.account_type}</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes popIn { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }`}</style>
    </div>
  );
}

/* ── PENDING REQUEST POPUP ── */
function PendingPopup({ name, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(10,20,50,0.75)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }}>
      <div style={{
        background: "#fff", borderRadius: 24, overflow: "hidden",
        maxWidth: 420, width: "100%",
        boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
        animation: "popIn 0.45s cubic-bezier(.22,1,.36,1)",
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
          padding: "36px 32px 28px", textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
          <div style={{ position:"absolute", bottom:-30, left:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>

          {/* Animated Clock Icon */}
          <div style={{
            display:"flex", justifyContent:"center", marginBottom: 16, position:"relative", zIndex:1
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "2px solid rgba(255,255,255,0.2)",
              boxShadow: "0 0 0 8px rgba(255,255,255,0.06)",
              animation: "pulseRing 2s ease-in-out infinite",
            }}>
              <Clock size={36} color="#fbbf24" strokeWidth={1.8}
                style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.5))" }}/>
            </div>
          </div>

          <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6, position:"relative", zIndex:1 }}>
            Request Submitted
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0, position:"relative", zIndex:1, lineHeight: 1.3 }}>
            Pending Admin Approval
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 8, position:"relative", zIndex:1 }}>
            Your account opening request has been sent to the admin for review.
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px 28px", background: "#f8faff" }}>

          {/* Status card */}
          <div style={{
            background: "#fff", border: "1.5px solid #dbeafe", borderRadius: 16,
            padding: "16px 20px", marginBottom: 16,
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <User size={20} color="#2563eb"/>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>Applicant</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#1e293b" }}>{name}</p>
            </div>
            <div style={{
              marginLeft: "auto", background: "#fef9c3", border: "1px solid #fde047",
              borderRadius: 20, padding: "4px 12px",
              fontSize: 11, fontWeight: 700, color: "#854d0e", letterSpacing: "0.05em",
              display: "flex", alignItems: "center", gap: 5,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", display: "inline-block", animation: "blink 1.2s ease-in-out infinite" }}/>
              PENDING
            </div>
          </div>

          {/* Steps */}
          <div style={{ marginBottom: 20 }}>
            {[
              { label: "Application Submitted", done: true },
              { label: "Admin Review", done: false, active: true },
              { label: "Account Activation", done: false },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: i < 2 ? 8 : 0 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: step.done ? "#22c55e" : step.active ? "#2563eb" : "#e2e8f0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: step.active ? "0 0 0 4px rgba(37,99,235,0.15)" : "none",
                  animation: step.active ? "pulseRing 2s ease-in-out infinite" : "none",
                }}>
                  {step.done
                    ? <CheckCircle size={14} color="#fff" strokeWidth={2.5}/>
                    : step.active
                      ? <Clock size={13} color="#fff" strokeWidth={2.5}/>
                      : <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#94a3b8", display: "block" }}/>
                  }
                </div>
                <span style={{
                  fontSize: 13, fontWeight: step.active ? 600 : 500,
                  color: step.done ? "#16a34a" : step.active ? "#1d4ed8" : "#94a3b8",
                }}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 12, color: "#64748b", textAlign: "center", marginBottom: 18, lineHeight: 1.6 }}>
            The admin will review your application shortly. You will be notified once your account is activated.
          </p>

          <button onClick={onClose} style={{
            width: "100%", padding: "12px 0",
            background: "linear-gradient(135deg, #1e3a5f, #2563eb)",
            color: "#fff", fontWeight: 700, fontSize: 14,
            border: "none", borderRadius: 12, cursor: "pointer",
            boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Okay, Got it!
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popIn { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes pulseRing { 0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,0.25)} 50%{box-shadow:0 0 0 8px rgba(37,99,235,0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </div>
  );
}

/* ── SIGNATURE PAD (Type only) ── */
function SignaturePad({ onSave }) {
  const canvasRef = useRef(null);
  const [signatureName, setSignatureName] = useState("");
  const [applied, setApplied] = useState(false);

  const renderTyped = (name) => {
    if (!name.trim()) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "italic 22px Georgia, serif";
    ctx.fillStyle = "#0d1b3e";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);
    setApplied(true);
  };

  const handleNameChange = (e) => {
    setSignatureName(e.target.value);
    setApplied(false);
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    if (!signatureName.trim() || !applied) return;
    onSave({ dataUrl: canvasRef.current.toDataURL("image/png"), name: signatureName });
  };

  return (
    <>
      <h3 className="text-xs font-semibold text-blue-900 mb-2 flex items-center gap-1.5">
        <PenLine size={13} className="text-blue-700"/>
        Signature <span className="text-red-500">*</span>
      </h3>

      {/* Name input */}
      <div className="relative mb-2">
        <User size={12} className="absolute left-2.5 top-2.5 text-gray-400 pointer-events-none"/>
        <input
          type="text" value={signatureName}
          onChange={handleNameChange}
          placeholder="Type full name"
          className="rounded-lg pl-7 pr-3 py-1.5 bg-white border w-full focus:ring-2 focus:ring-blue-500 outline-none text-xs"
        />
      </div>

      {/* Canvas preview */}
      <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden mb-2" style={{ height: 52 }}>
        <canvas ref={canvasRef} width={500} height={80} className="w-full" style={{ display:"block", height:"100%" }}/>
        {!applied && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-gray-300 text-xs select-none">Preview appears here</p>
          </div>
        )}
        <div className="absolute bottom-2 left-3 right-3 border-b border-dashed border-gray-200 pointer-events-none"/>
      </div>

      {/* Buttons */}
      <div className="flex gap-1.5">
        <button type="button" onClick={() => renderTyped(signatureName)}
          disabled={!signatureName.trim()}
          className="flex-1 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold text-xs border border-blue-200 hover:bg-blue-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          Preview
        </button>
        <button type="button" onClick={handleSave}
          disabled={!applied}
          className="flex-1 py-1 rounded-lg bg-blue-900 text-white font-semibold text-xs hover:bg-blue-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          ✓ Save
        </button>
      </div>
    </>
  );
}

/* ── MAIN PAGE ── */
export default function OpenAccountPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bank_holder_name: "", father_name: "", dob: "", gender: "",
    mobile: "", email: "", address: "", aadhaar: "", pan: "",
    account_type: "", branch: "", nominee_name: "", nominee_relation: "",
    agree: false,
  });

  const [successData, setSuccessData]     = useState(null);
  const [showPending, setShowPending]     = useState(false);
  const [photo, setPhoto]                 = useState(null);
  const [photoPreview, setPhotoPreview]   = useState(null);
  const [signature, setSignature]         = useState(null); // { dataUrl, name }
  const [loading, setLoading]             = useState(false);
  const [alert, setAlert]                 = useState({ show: false, type: "", msg: "" });

  // Pre-fill from localStorage
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("payzen_user") || "{}");
      setFormData(prev => ({
        ...prev,
        bank_holder_name: user.name          || "",
        mobile:           user.mobile        || "",
        email:            user.email         || "",
        gender:           user.gender        || "",
        dob:              user.date_of_birth || "",
      }));
    } catch {}
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleAadhaar = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12);
    setFormData({ ...formData, aadhaar: value });
  };

  const handlePan = (e) => {
    const value = e.target.value.toUpperCase().slice(0, 10);
    setFormData({ ...formData, pan: value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const removePhoto = () => { setPhoto(null); setPhotoPreview(null); };

  const showAlertMsg = (type, msg) => {
    setAlert({ show: true, type, msg });
    if (type === "error") setTimeout(() => setAlert({ show: false }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree)                { showAlertMsg("error", "Please accept the Terms & Conditions"); return; }
    if (formData.aadhaar.length !== 12) { showAlertMsg("error", "Aadhaar number must be exactly 12 digits"); return; }
    if (formData.pan.length !== 10)     { showAlertMsg("error", "PAN number must be exactly 10 characters"); return; }
    if (!photo)                         { showAlertMsg("error", "Please upload your photo / document"); return; }
    if (!signature)                     { showAlertMsg("error", "Please save your signature before submitting"); return; }

    setLoading(true);
    setAlert({ show: false });

    const res = await openAccount({
      bank_holder_name: formData.bank_holder_name,
      father_name:      formData.father_name,
      dob:              formData.dob,
      gender:           formData.gender,
      mobile:           formData.mobile,
      email:            formData.email,
      address:          formData.address,
      aadhaar:          formData.aadhaar,
      pan:              formData.pan,
      account_type:     formData.account_type,
      branch:           formData.branch,
      nominee_name:     formData.nominee_name,
      nominee_relation: formData.nominee_relation,
      signature_name:   signature.name,
      // signature_image: signature.dataUrl,  // uncomment if your API supports it
    });

    setLoading(false);

    if (res.ok && res.data.success) {
      localStorage.setItem("payzen_account", JSON.stringify(res.data.data));
      setSuccessData(res.data.data);
      setTimeout(() => navigate("/dashboard"), 3500);
    } else {
      // ── Show Pending popup instead of plain error ──
      setShowPending(true);
    }
  };

  return (
    <>
      {successData && <SuccessPopup data={successData} />}
      {showPending && (
        <PendingPopup
          name={formData.bank_holder_name || "Applicant"}
          onClose={() => { setShowPending(false); navigate("/dashboard"); }}
        />
      )}

      <div className="min-h-screen py-6 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">

          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-blue-900">Open New Account</h2>
            <p className="text-gray-500 text-sm">Secure Banking Registration Portal</p>
          </div>

          {alert.show && (
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-5 text-sm font-medium
              ${alert.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"}`}>
              {alert.type === "success" ? <CheckCircle size={18}/> : <AlertCircle size={18}/>}
              {alert.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Personal Details */}
            <Section title="Personal Details">
              <Field label="Full Name (Bank Holder)">
                <IconInput icon={<User size={15}/>}>
                  <input type="text" name="bank_holder_name" value={formData.bank_holder_name}
                    onChange={handleChange} required placeholder="Enter full name"/>
                </IconInput>
              </Field>
              <Field label="Father Name">
                <IconInput icon={<Users size={15}/>}>
                  <input type="text" name="father_name" value={formData.father_name}
                    onChange={handleChange} required placeholder="Enter father's name"/>
                </IconInput>
              </Field>
              <Field label="Date of Birth">
                <IconInput icon={<Calendar size={15}/>}>
                  <input type="date" name="dob" value={formData.dob}
                    onChange={handleChange} required/>
                </IconInput>
              </Field>
              <Field label="Gender">
                <IconInput icon={<UserCheck size={15}/>}>
                  <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </IconInput>
              </Field>
            </Section>

            {/* Contact Details */}
            <Section title="Contact Details">
              <Field label="Mobile Number">
                <IconInput icon={<Phone size={15}/>}>
                  <input type="tel" name="mobile" value={formData.mobile}
                    onChange={handleChange} required placeholder="10-digit mobile number" maxLength={10}/>
                </IconInput>
              </Field>
              <Field label="Email Address">
                <IconInput icon={<Mail size={15}/>}>
                  <input type="email" name="email" value={formData.email}
                    onChange={handleChange} required placeholder="your@email.com"/>
                </IconInput>
              </Field>
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Residential Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3 top-3 text-gray-400"/>
                  <textarea name="address" value={formData.address} onChange={handleChange} required
                    placeholder="Enter your full address"
                    className="rounded-xl pl-8 pr-3 py-2 bg-white border h-20 w-full focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"/>
                </div>
              </div>
            </Section>

            {/* KYC Verification */}
            <Section title="KYC Verification">
              <Field label="Aadhaar Number">
                <IconInput icon={<ShieldCheck size={15}/>}>
                  <input type="text" name="aadhaar" value={formData.aadhaar}
                    onChange={handleAadhaar} required placeholder="123456789012" maxLength={12}
                    className="tracking-widest"/>
                </IconInput>
              </Field>
              <Field label="PAN Number">
                <IconInput icon={<CreditCard size={15}/>}>
                  <input type="text" name="pan" value={formData.pan}
                    onChange={handlePan} required placeholder="ABCDE1234F" maxLength={10}
                    className="tracking-widest uppercase"/>
                </IconInput>
              </Field>
            </Section>

            {/* Account Details */}
            <Section title="Account Details">
              <Field label="Account Type">
                <IconInput icon={<Landmark size={15}/>}>
                  <select name="account_type" value={formData.account_type} onChange={handleChange} required>
                    <option value="">Select Account Type</option>
                    <option>Saving Account</option>
                    <option>Current Account</option>
                  </select>
                </IconInput>
              </Field>
              <Field label="Preferred Branch">
                <IconInput icon={<GitBranch size={15}/>}>
                  <input type="text" name="branch" value={formData.branch}
                    onChange={handleChange} required placeholder="e.g. Nashik Main Branch"/>
                </IconInput>
              </Field>
            </Section>

            {/* Nominee Details */}
            <Section title="Nominee Details">
              <Field label="Nominee Name">
                <IconInput icon={<UserPlus size={15}/>}>
                  <input type="text" name="nominee_name" value={formData.nominee_name}
                    onChange={handleChange} required placeholder="Enter nominee full name"/>
                </IconInput>
              </Field>
              <Field label="Relation with Nominee">
                <IconInput icon={<Heart size={15}/>}>
                  <input type="text" name="nominee_relation" value={formData.nominee_relation}
                    onChange={handleChange} required placeholder="e.g. Father, Mother, Spouse"/>
                </IconInput>
              </Field>
            </Section>

            {/* ── Photo Upload (full width tall) + Signature below ── */}
            <div className="rounded-xl p-3 bg-gray-50">
              <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <ImagePlus size={15} className="text-blue-700"/>
                Upload Photo <span className="text-red-500">*</span>
              </h3>

              {!photo ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl py-10 cursor-pointer hover:border-blue-400 transition-colors bg-white gap-2 mb-3">
                  <ImagePlus size={28} className="text-gray-300"/>
                  <span className="text-sm text-gray-500">Click to upload photo or document</span>
                  <span className="text-xs text-gray-400">JPG, PNG, PDF — Max 5MB</span>
                  <input type="file" accept="image/*,application/pdf" onChange={handlePhoto} className="hidden" required/>
                </label>
              ) : (
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 mb-3">
                  {photoPreview ? (
                    <img src={photoPreview} alt="preview" className="w-14 h-14 rounded-lg object-cover border flex-shrink-0"/>
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center border flex-shrink-0">
                      <FileText size={20} className="text-blue-400"/>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 truncate">{photo.name}</p>
                    <p className="text-xs text-gray-400">{(photo.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button type="button" onClick={removePhoto}
                    className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0">
                    <X size={14}/>
                  </button>
                </div>
              )}

              {/* Signature — below photo, compact */}
              <SignaturePad onSave={(sig) => {
                setSignature(sig);
                showAlertMsg("success", `Signature saved for "${sig.name}"`);
              }}/>
            </div>

            {/* Signature Preview (after saved) */}
            {signature && (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                <CheckCircle size={18} className="text-green-600 flex-shrink-0"/>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-800">Signature Saved</p>
                  <p className="text-xs text-green-600">{signature.name}</p>
                </div>
                <img src={signature.dataUrl} alt="sig" className="h-10 object-contain border border-green-200 rounded bg-white px-2"/>
                <button type="button" onClick={() => setSignature(null)}
                  className="text-red-400 hover:text-red-600">
                  <X size={15}/>
                </button>
              </div>
            )}

            {/* Terms */}
            <div className="flex gap-2 items-start">
              <input type="checkbox" name="agree" onChange={handleChange} className="mt-1" required/>
              <p className="text-xs text-gray-600">
                I confirm that all the information provided is accurate and correct.{" "}
                <span className="text-red-500">*</span>
              </p>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold
                rounded-xl py-3 flex items-center justify-center gap-2
                disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg">
              {loading
                ? <><Loader size={18} className="animate-spin"/> Opening Account...</>
                : "Open Account"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

/* ── Reusable Components ── */

function Section({ title, children }) {
  return (
    <div className="rounded-xl p-4 bg-gray-50">
      <h3 className="text-base font-semibold text-blue-900 mb-3">{title}</h3>
      <div className="grid md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

function IconInput({ icon, children }) {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-3 text-gray-400 pointer-events-none">{icon}</span>
      <div className="w-full [&>input]:rounded-xl [&>input]:pl-8 [&>input]:pr-3 [&>input]:py-2 [&>input]:bg-white [&>input]:border [&>input]:w-full [&>input]:focus:ring-2 [&>input]:focus:ring-blue-500 [&>input]:outline-none [&>input]:text-sm
                      [&>select]:rounded-xl [&>select]:pl-8 [&>select]:pr-3 [&>select]:py-2 [&>select]:bg-white [&>select]:border [&>select]:w-full [&>select]:focus:ring-2 [&>select]:focus:ring-blue-500 [&>select]:outline-none [&>select]:text-sm [&>select]:appearance-none">
        {children}
      </div>
    </div>
  );
}