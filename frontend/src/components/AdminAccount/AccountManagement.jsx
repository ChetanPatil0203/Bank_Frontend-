import { useState, useEffect } from "react";
import {
  Eye, CheckCircle, XCircle, Trash2, Clock, Plus, Search, UserPlus,
  CreditCard, CheckCircle2, PauseCircle, Ban, X, User, Phone,
  Shield, Building2, Users, FileText, Upload,
  PenLine
} from "lucide-react";

import {
  adminGetBankAccounts, adminGetRequests, adminToggleAccountStatus,
  adminCloseAccountStatus, adminApproveRequest, adminRejectRequest,
  adminCreateAccountRequestForm
} from "../../utils/apiServices";

const C = {
  navy: "#0f1f4b", bg: "#f0f4ff", card: "#ffffff",
  text: "#1e293b", muted: "#64748b", border: "#e2e8f0",
  accent: "#3b82f6", green: "#10b981", red: "#ef4444",
  gold: "#f59e0b", purple: "#8b5cf6",
};

const RESPONSIVE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
  @media (max-width: 768px) {
    .stats-grid { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
    .stat-card-wrap { 
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
  @media (min-width: 1024px) {
    .stat-card-wrap {
      flex: 1 1 calc(16.66% - 9px) !important;
      max-width: calc(16.66% - 9px) !important;
      min-width: 120px !important;
    }
  }
  @media (min-width: 769px) and (max-width: 1023px) {
    .stat-card-wrap {
      flex: 1 1 calc(33.33% - 8px) !important;
      max-width: calc(33.33% - 8px) !important;
      min-width: 140px !important;
    }
  }
  .stat-card-wrap:hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 12px 40px -12px rgba(0,0,0,0.12) !important;
  }
  .tab-search-row { flex-direction: column !important; align-items: stretch !important; gap: 16px !important; }
  .search-box-wrap { max-width: none !important; }
  .tabs-wrap { overflow-x: auto !important; padding-bottom: 4px !important; display: flex !important; flex-wrap: nowrap !important; width: 100% !important; -webkit-overflow-scrolling: touch; }
  .tabs-wrap button { flex-shrink: 0 !important; white-space: nowrap !important; }
  .modal-container { padding: 10px !important; }
  .modal-content { max-width: 95% !important; border-radius: 16px !important; }
  .accounts-table { width: 100%; overflow-x: auto; display: block; }
  .form-grid-2 { grid-template-columns: 1fr !important; }
  
  /* Mobile Account Card Styling */
  .mobile-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 12px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .mobile-card-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .mobile-card-label {
    font-size: 10px;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .mobile-card-value {
    font-size: 13px;
    font-weight: 700;
    color: #0f1f4b;
  }
  .mobile-card-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 4px;
    padding-top: 12px;
    border-top: 1px solid #f1f5f9;
  }

  @media (max-width: 480px) {
    .stat-card-wrap { flex: 1 1 100% !important; }
  }
`;

/* ── Badge ── */
function Badge({ status }) {
  const map = {
    Active: { bg: "#dcfce7", color: "#15803d" },
    Inactive: { bg: "#fef9c3", color: "#854d0e" },
    Closed: { bg: "#fee2e2", color: "#b91c1c" },
    Verified: { bg: "#dcfce7", color: "#15803d" },
    Approved: { bg: "#dcfce7", color: "#15803d" },
    Pending: { bg: "#fef9c3", color: "#854d0e" },
    Rejected: { bg: "#fee2e2", color: "#b91c1c" },
    Uploaded: { bg: "#dcfce7", color: "#15803d" },
    Missing: { bg: "#fee2e2", color: "#b91c1c" },
  };
  const s = map[status] || { bg: "#f1f5f9", color: "#475569" };
  return (
    <span style={{
      background: s.bg, color: s.color, fontSize: 10, fontWeight: 800,
      padding: "2px 8px", borderRadius: 99, letterSpacing: "0.04em",
      display: "inline-flex", alignItems: "center", gap: 4, height: 20, boxSizing: "border-box"
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, display: "inline-block" }} />
      {status}
    </span>
  );
}

const TH = ({ children, center }) => (
  <th style={{ padding: "12px 16px", textAlign: center ? "center" : "left", fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</th>
);
const TD = ({ children, center }) => (
  <td style={{ padding: "13px 16px", fontSize: 13, color: C.text, borderBottom: "1px solid #f1f5f9", whiteSpace: "nowrap", textAlign: center ? "center" : "left" }}>{children}</td>
);

/* ── Modal Wrapper ── */
function Modal({ title, onClose, children, wide, extraWide }) {
  return (
    <div className="modal-container" style={{ position: "fixed", inset: 0, background: "rgba(15,31,75,0.50)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, overflowY: "auto" }}>
      <div className="modal-content" style={{ background: C.card, borderRadius: 20, width: "100%", maxWidth: extraWide ? 900 : wide ? 720 : 520, boxShadow: "0 24px 64px rgba(15,31,75,0.22)", border: `1px solid ${C.border}`, maxHeight: "92vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "linear-gradient(to right, #0f1f4b, #1e3a8a)", borderRadius: "20px 20px 0 0" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#fff" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            <X size={16} />
          </button>
        </div>
        <div style={{ padding: 24, overflowY: "auto" }}>{children}</div>
      </div>
    </div>
  );
}

function ModalSection({ icon: Icon, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "20px 0 10px", paddingBottom: 8, borderBottom: `2px solid ${C.accent}` }}>
      <div style={{ width: 26, height: 26, borderRadius: 7, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={14} color={C.accent} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 900, color: C.accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</span>
    </div>
  );
}

function DetailRow({ label, value, mono, badge, full }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${C.border}`, gridColumn: full ? "1 / -1" : undefined }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0, marginRight: 12 }}>{label}</span>
      {badge
        ? <Badge status={value} />
        : <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: mono ? "monospace" : "inherit", textAlign: "right", wordBreak: "break-all" }}>{value || "—"}</span>
      }
    </div>
  );
}

function DocChip({ label, uploaded, url }) {
  const fullUrl = url ? `http://localhost:5000${url}` : null;
  return (
    <div
      onClick={() => fullUrl && window.open(fullUrl, '_blank')}
      style={{
        display: "flex", alignItems: "center", gap: 8, padding: "8px 12px",
        borderRadius: 10, border: `1.5px solid ${uploaded ? "#bbf7d0" : "#fecaca"}`,
        background: uploaded ? "#f0fdf4" : "#fff1f2",
        cursor: uploaded ? "pointer" : "default", transition: "all 0.2s"
      }}
    >
      <div style={{ width: 28, height: 28, borderRadius: 8, background: uploaded ? "#dcfce7" : "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <FileText size={14} color={uploaded ? "#15803d" : C.red} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, color: uploaded ? "#15803d" : C.red }}>{label}</p>
        <p style={{ margin: 0, fontSize: 10, color: C.muted }}>{uploaded ? "Click to View" : "Not Uploaded"}</p>
      </div>
      {uploaded && <Eye size={12} color="#15803d" />}
    </div>
  );
}

/* ── Form Field ── */
function Field({ label, placeholder, type = "text", value, onChange, options, required, hint }) {
  const base = {
    width: "100%", padding: "10px 12px", border: `1.5px solid ${C.border}`,
    borderRadius: 10, fontSize: 13, color: C.text, outline: "none",
    background: "#f8faff", fontFamily: "inherit", boxSizing: "border-box",
    transition: "border-color 0.2s"
  };
  return (
    <div style={{ marginBottom: 0 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>
        {label}{required && <span style={{ color: C.red }}> *</span>}
      </label>
      {options
        ? <select value={value} onChange={onChange} style={base}>
            <option value="">Select {label}</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        : type === "textarea"
          ? <textarea placeholder={placeholder} value={value} onChange={onChange} rows={3}
              style={{ ...base, resize: "vertical", minHeight: 70 }} />
          : <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={base} />
      }
      {hint && <p style={{ margin: "4px 0 0", fontSize: 10, color: C.muted }}>{hint}</p>}
    </div>
  );
}

/* ── Upload Box ── */
function UploadBox({ label, hint, file, onChange }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>{label}</label>
      <label style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 8, padding: "18px 12px", border: `2px dashed ${file ? C.green : C.border}`,
        borderRadius: 12, cursor: "pointer", background: file ? "#f0fdf4" : "#f8faff",
        transition: "all 0.2s", minHeight: 90
      }}>
        <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={onChange} style={{ display: "none" }} />
        <div style={{ width: 36, height: 36, borderRadius: 10, background: file ? "#dcfce7" : "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {file ? <CheckCircle2 size={20} color={C.green} /> : <Upload size={20} color={C.accent} />}
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: file ? C.green : C.accent }}>
            {file ? file.name : "Click to upload"}
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 10, color: C.muted }}>{hint || "JPG, PNG, PDF — Max 5MB"}</p>
        </div>
      </label>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   CREATE NEW ACCOUNT FORM MODAL
   ════════════════════════════════════════════════════ */
function CreateAccountModal({ onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    bank_holder_name: "", father_name: "", dob: "", gender: "Male",
    mobile: "", email: "", address: "",
    aadhaar: "", pan: "",
    account_type: "", preferred_branch: "", reason: "",
    nominee_name: "", nominee_relation: "",
  });
  const [files, setFiles] = useState({ photo: null, aadhaar: null, pan: null });
  const [signatureData, setSignatureData] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [showSigModal, setShowSigModal] = useState(false);
  const [sigName, setSigName] = useState("");
  const [sigPreview, setSigPreview] = useState(false);

  const f = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));
  const fFile = (key) => (e) => setFiles(prev => ({ ...prev, [key]: e.target.files[0] || null }));

  const STEPS = ["Personal Details", "Contact Details", "KYC Verification", "Account Details", "Nominee Details", "Document Upload"];

  const handleSaveSignature = () => {
    if (!sigName.trim()) return;
    setSignatureData(sigName.trim());
    setShowSigModal(false);
    setSigPreview(false);
  };

  const handleClearSignature = () => {
    setSignatureData(null);
    setSigName("");
    setSigPreview(false);
  };

  async function handleSubmit() {
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (files.photo) fd.append("photo", files.photo);
      if (files.aadhaar) fd.append("aadhaar_doc", files.aadhaar);
      if (files.pan) fd.append("pan_doc", files.pan);
      if (signatureData) fd.append("signature", signatureData);

      const res = await adminCreateAccountRequestForm(fd);
      if (res.ok) {
        onSuccess && onSuccess();
        onClose();
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const SectionDivider = ({ icon: Icon, label }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, paddingBottom: 10, borderBottom: `2px solid ${C.accent}` }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={15} color={C.accent} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 900, color: C.navy, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
    </div>
  );

  return (
    <div className="modal-container" style={{ position: "fixed", inset: 0, background: "rgba(15,31,75,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, overflowY: "auto" }}>
      <div style={{ background: "#fff", borderRadius: 22, width: "100%", maxWidth: 820, boxShadow: "0 32px 80px rgba(15,31,75,0.25)", border: `1px solid ${C.border}`, maxHeight: "94vh", display: "flex", flexDirection: "column" }}>
        
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #0f1f4b 0%, #1e3a8a 100%)", padding: "22px 28px", borderRadius: "22px 22px 0 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#fff" }}>Open New Account</h2>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "rgba(255,255,255,0.65)" }}>Secure Banking Registration Portal</p>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            <X size={18} />
          </button>
        </div>

        {/* Step Indicator */}
        <div style={{ padding: "16px 28px", borderBottom: `1px solid ${C.border}`, background: "#f8faff", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 4, alignItems: "center", overflowX: "auto" }}>
            {STEPS.map((s, i) => {
              const idx = i + 1;
              const done = step > idx;
              const active = step === idx;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 20,
                    background: done ? C.green : active ? C.navy : "#e2e8f0",
                    color: done || active ? "#fff" : C.muted,
                    fontSize: 11, fontWeight: 800, cursor: "pointer", transition: "all 0.2s"
                  }} onClick={() => idx < step && setStep(idx)}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: done || active ? "rgba(255,255,255,0.25)" : C.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900 }}>
                      {done ? "✓" : idx}
                    </span>
                    <span style={{ display: active ? "inline" : "none" }}>{s}</span>
                  </div>
                  {i < STEPS.length - 1 && <div style={{ width: 16, height: 2, background: done ? C.green : C.border, borderRadius: 2 }} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <div style={{ padding: "24px 28px", overflowY: "auto", flex: 1 }}>

          {/* Step 1 — Personal Details */}
          {step === 1 && (
            <div>
              <SectionDivider icon={User} label="Personal Details" />
              <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Full Name (Bank Holder)" placeholder="Name field" value={form.bank_holder_name} onChange={f("bank_holder_name")} required />
                <Field label="Father's Name" placeholder="Enter father's name" value={form.father_name} onChange={f("father_name")} required />
                <Field label="Date of Birth" type="date" value={form.dob} onChange={f("dob")} required />
                <Field label="Gender" value={form.gender} onChange={f("gender")} options={["Male", "Female", "Other"]} required />
              </div>
            </div>
          )}

          {/* Step 2 — Contact Details */}
          {step === 2 && (
            <div>
              <SectionDivider icon={Phone} label="Contact Details" />
              <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Mobile Number" placeholder="89765304..." value={form.mobile} onChange={f("mobile")} type="tel" required />
                <Field label="Email Address" placeholder="chaitanpatel@example.com" value={form.email} onChange={f("email")} type="email" required />
              </div>
              <div style={{ marginTop: 16 }}>
                <Field label="Residential Address" placeholder="Enter your full address" value={form.address} onChange={f("address")} type="textarea" required />
              </div>
            </div>
          )}

          {/* Step 3 — KYC Verification */}
          {step === 3 && (
            <div>
              <SectionDivider icon={Shield} label="KYC Verification" />
              <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Aadhaar Number" placeholder="1234567890123" value={form.aadhaar} onChange={f("aadhaar")} required hint="12-digit Aadhaar number" />
                <Field label="PAN Number" placeholder="ABCDE1234F" value={form.pan} onChange={f("pan")} required hint="10-character PAN card number" />
              </div>
            </div>
          )}

          {/* Step 4 — Account Details */}
          {step === 4 && (
            <div>
              <SectionDivider icon={Building2} label="Account Details" />
              <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Account Type" value={form.account_type} onChange={f("account_type")} options={["Savings", "Current", "Salary", "Fixed Deposit", "Recurring Deposit"]} required />
                <Field label="Preferred Branch" placeholder="e.g. Nashik Main Branch" value={form.preferred_branch} onChange={f("preferred_branch")} required />
              </div>
              <div style={{ marginTop: 16 }}>
                <Field label="Purpose of Opening Account" placeholder="e.g. Salary, Savings, Business transactions" value={form.reason} onChange={f("reason")} type="textarea" required />
              </div>
            </div>
          )}

          {/* Step 5 — Nominee Details */}
          {step === 5 && (
            <div>
              <SectionDivider icon={Users} label="Nominee Details" />
              <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Nominee Name" placeholder="Enter nominee full name" value={form.nominee_name} onChange={f("nominee_name")} required />
                <Field label="Relation with Nominee" placeholder="e.g. Father, Mother, Spouse" value={form.nominee_relation} onChange={f("nominee_relation")} required />
              </div>
            </div>
          )}

          {/* Step 6 — Document Upload */}
          {step === 6 && (
            <div>
              <SectionDivider icon={FileText} label="Document Upload" />
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {["Photo", "Aadhaar", "PAN"].map(t => (
                  <span key={t} style={{ padding: "4px 12px", background: "#eff6ff", color: C.accent, borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{t}</span>
                ))}
                <span style={{ marginLeft: "auto", fontSize: 11, color: C.muted, fontWeight: 600 }}>
                  {Object.values(files).filter(Boolean).length}/3 Uploaded
                </span>
              </div>
              <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                <UploadBox label="Passport Photo" hint="Clear face photo — Max 5MB" file={files.photo} onChange={fFile("photo")} />
                <UploadBox label="Aadhaar Card" hint="Front side of Aadhaar" file={files.aadhaar} onChange={fFile("aadhaar")} />
                <UploadBox label="PAN Card" hint="Clear PAN card image" file={files.pan} onChange={fFile("pan")} />
              </div>

              {/* ── Signature Section ── */}
              <div style={{ marginTop: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, paddingBottom: 8, borderBottom: `2px solid ${C.accent}` }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PenLine size={15} color={C.accent} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 900, color: C.navy, textTransform: "uppercase", letterSpacing: "0.08em" }}>Signature</span>
                  {signatureData && (
                    <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.green, fontWeight: 700 }}>
                      <CheckCircle2 size={13} /> Saved
                    </span>
                  )}
                </div>

                {/* If signature saved — show preview box */}
                {signatureData ? (
                  <div style={{ border: `2px solid ${C.green}`, borderRadius: 14, background: "#f0fdf4", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                    <div>
                      <p style={{ margin: "0 0 4px", fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Signature Preview</p>
                      <p style={{
                        margin: 0,
                        fontSize: 30,
                        color: "#1e3a8a",
                        fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                        letterSpacing: "0.02em",
                        lineHeight: 1.2
                      }}>{signatureData}</p>
                      <div style={{ marginTop: 6, width: "100%", height: 1, background: "#bfdbfe" }} />
                    </div>
                    <button
                      onClick={handleClearSignature}
                      style={{ padding: "7px 14px", fontSize: 11, fontWeight: 700, border: `1.5px solid #fca5a5`, borderRadius: 9, background: "#fff1f2", color: C.red, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}
                    >
                      <X size={11} /> Remove
                    </button>
                  </div>
                ) : (
                  /* Add Signature button — image 1 style */
                  <button
                    onClick={() => setShowSigModal(true)}
                    style={{
                      width: "100%", padding: "14px 20px",
                      border: `2px dashed ${C.accent}`,
                      borderRadius: 12, background: "#eff6ff",
                      color: C.accent, fontSize: 14, fontWeight: 700,
                      cursor: "pointer", display: "flex", alignItems: "center",
                      justifyContent: "center", gap: 8, transition: "all 0.2s"
                    }}
                    onMouseOver={e => e.currentTarget.style.background = "#dbeafe"}
                    onMouseOut={e => e.currentTarget.style.background = "#eff6ff"}
                  >
                    <PenLine size={16} />
                    Add Signature
                  </button>
                )}

                {/* ── Signature Modal Popup ── */}
                {showSigModal && (
                  <div style={{ position: "fixed", inset: 0, background: "rgba(15,31,75,0.6)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                    <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 480, boxShadow: "0 32px 80px rgba(15,31,75,0.3)", overflow: "hidden" }}>

                      {/* Modal Header */}
                      <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #3b5fc0 100%)", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
                        {/* Decorative circle */}
                        <div style={{ position: "absolute", top: -20, right: 60, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 10, zIndex: 1 }}>
                          <PenLine size={20} color="#fff" />
                          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#fff" }}>Add Signature</h3>
                        </div>
                        <button
                          onClick={() => { setShowSigModal(false); setSigPreview(false); }}
                          style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 9, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", zIndex: 1 }}
                        >
                          <X size={16} />
                        </button>
                      </div>

                      {/* Modal Body */}
                      <div style={{ padding: "24px" }}>
                        <p style={{ margin: "0 0 14px", fontSize: 13, color: C.muted, fontWeight: 500 }}>
                          Type your full name to create your signature
                        </p>

                        {/* Name Input */}
                        <div style={{ position: "relative", marginBottom: 16 }}>
                          <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
                            <User size={16} color={C.muted} />
                          </div>
                          <input
                            type="text"
                            placeholder="Type your full name"
                            value={sigName}
                            onChange={e => { setSigName(e.target.value); setSigPreview(false); }}
                            style={{
                              width: "100%", boxSizing: "border-box",
                              padding: "12px 14px 12px 38px",
                              border: `1.5px solid ${C.border}`, borderRadius: 10,
                              fontSize: 14, color: C.text, outline: "none",
                              background: "#f8faff", fontFamily: "inherit"
                            }}
                          />
                        </div>

                        {/* Preview Box */}
                        <div style={{
                          minHeight: 90, border: `1.5px solid ${C.border}`,
                          borderRadius: 12, background: "#f8faff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          marginBottom: 20, padding: "12px 20px", position: "relative"
                        }}>
                          {sigPreview && sigName.trim() ? (
                            <div style={{ textAlign: "center", width: "100%" }}>
                              <p style={{
                                margin: 0,
                                fontSize: 32,
                                color: "#1e3a8a",
                                fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                                letterSpacing: "0.02em"
                              }}>{sigName}</p>
                              <div style={{ marginTop: 8, height: 1, background: "#bfdbfe", width: "80%", margin: "8px auto 0" }} />
                            </div>
                          ) : (
                            <p style={{ margin: 0, fontSize: 13, color: "#c8d3e0", fontStyle: "italic", fontWeight: 500 }}>
                              Preview appears here
                            </p>
                          )}
                        </div>

                        {/* Buttons */}
                        <div style={{ display: "flex", gap: 10 }}>
                          <button
                            onClick={() => setSigPreview(true)}
                            disabled={!sigName.trim()}
                            style={{
                              flex: 1, padding: "12px",
                              border: `1.5px solid ${C.border}`,
                              borderRadius: 10, background: "#fff",
                              color: sigName.trim() ? C.text : C.muted,
                              fontSize: 13, fontWeight: 700,
                              cursor: sigName.trim() ? "pointer" : "not-allowed"
                            }}
                          >
                            Preview
                          </button>
                          <button
                            onClick={handleSaveSignature}
                            disabled={!sigName.trim()}
                            style={{
                              flex: 1, padding: "12px",
                              border: "none", borderRadius: 10,
                              background: sigName.trim() ? "#4a6fa5" : "#94a3b8",
                              color: "#fff", fontSize: 13, fontWeight: 800,
                              cursor: sigName.trim() ? "pointer" : "not-allowed",
                              display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                            }}
                          >
                            <CheckCircle2 size={15} /> Save Signature
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirmation checkbox */}
              <div style={{ marginTop: 16, padding: "14px 16px", background: "#f8faff", borderRadius: 12, border: `1px solid ${confirmed ? C.green : C.border}`, transition: "border-color 0.2s" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, color: C.text }}>
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={e => setConfirmed(e.target.checked)}
                    style={{ marginTop: 2, accentColor: C.navy, width: 15, height: 15 }}
                  />
                  <span>I confirm that all the information provided is accurate and correct. <span style={{ color: C.red }}>*</span></span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div style={{ padding: "16px 28px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, background: "#f8faff", borderRadius: "0 0 22px 22px" }}>
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            style={{ padding: "10px 24px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: "#fff", color: C.text, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
          >
            {step === 1 ? "Cancel" : "← Back"}
          </button>

          <div style={{ display: "flex", gap: 6 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{ width: step === i + 1 ? 20 : 8, height: 8, borderRadius: 4, background: step > i ? C.navy : C.border, transition: "all 0.3s" }} />
            ))}
          </div>

          {step < 6 ? (
            <button
              onClick={() => setStep(step + 1)}
              style={{ padding: "10px 28px", borderRadius: 10, border: "none", background: C.navy, color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 14px rgba(15,31,75,0.2)" }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading || !confirmed}
              style={{ padding: "10px 28px", borderRadius: 10, border: "none", background: loading || !confirmed ? C.muted : C.green, color: "#fff", fontSize: 13, fontWeight: 800, cursor: loading || !confirmed ? "not-allowed" : "pointer", boxShadow: confirmed ? "0 4px 14px rgba(16,185,129,0.25)" : "none", transition: "all 0.2s" }}
            >
              {loading ? "Submitting..." : "✓ Open Account"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   Request Detail Modal
   ════════════════════════════════════════════════════ */
function RequestDetailModal({ req, onClose }) {
  if (!req) return null;
  return (
    <Modal title="👤 Application Review: Account Request" onClose={onClose} wide>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ background: "#f8faff", padding: "16px", borderRadius: "12px", border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ margin: 0, fontSize: 12, color: C.muted, fontWeight: 600 }}>Application ID</p>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: C.navy, fontFamily: "monospace" }}>#{req.id?.toString().padStart(6, '0') || "REQ-8829"}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: 12, color: C.muted, fontWeight: 600 }}>Current Status</p>
            <Badge status={req.kyc || req.status} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <section>
              <ModalSection icon={User} label="Personal Profile" />
              <DetailRow label="Full Name" value={req.name || req.bank_holder_name} />
              <DetailRow label="Father's Name" value={req.father_name} />
              <DetailRow label="Date of Birth" value={req.dob} />
              <DetailRow label="Gender" value={req.gender} />
            </section>
            <section>
              <ModalSection icon={Phone} label="Communication" />
              <DetailRow label="Mobile" value={req.phone || req.mobile} />
              <DetailRow label="Email" value={req.email} />
              <DetailRow label="Address" value={req.address} full />
            </section>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <section>
              <ModalSection icon={Shield} label="KYC & Identity" />
              <DetailRow label="Aadhaar No." value={req.aadhaar} mono />
              <DetailRow label="PAN Number" value={req.pan} mono />
            </section>
            <section>
              <ModalSection icon={Building2} label="Banking Preference" />
              <DetailRow label="Account Type" value={req.account_type} />
              <DetailRow label="Branch" value={req.branch || req.preferred_branch} />
              <DetailRow label="Purpose" value={req.reason} full />
            </section>
            <section>
              <ModalSection icon={Users} label="Nomination" />
              <DetailRow label="Nominee" value={req.nominee_name} />
              <DetailRow label="Relation" value={req.nominee_relation} />
            </section>
          </div>
        </div>

        <section>
          <ModalSection icon={FileText} label="Verification Documents" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", background: "#fdfdfd", padding: "12px", borderRadius: "12px", border: `1px dashed ${C.border}` }}>
            <DocChip label="Passport Photo" uploaded={!!req.photo_url} url={req.photo_url} />
            <DocChip label="Aadhaar Card" uploaded={!!req.aadhaar_url} url={req.aadhaar_url} />
            <DocChip label="PAN Card" uploaded={!!req.pan_url} url={req.pan_url} />
          </div>
        </section>

        <div style={{ marginTop: "10px", paddingTop: "15px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: C.muted }}>
            <Clock size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />
            Submitted on: <strong>{req.applied}</strong>
          </span>
          <button onClick={onClose} style={{ padding: "10px 32px", borderRadius: "8px", border: "none", background: C.navy, color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>Done</button>
        </div>
      </div>
    </Modal>
  );
}

/* ════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════ */
export default function AccountsView() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [narSearch, setNarSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedNar, setSelectedNar] = useState(null);
  const [selectedPending, setSelectedPending] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [accounts, setAccounts] = useState([]);
  const [newReqs, setNewReqs] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [accRes, reqRes] = await Promise.all([
        adminGetBankAccounts(),
        adminGetRequests()
      ]);
      const accData = accRes.data;
      const reqData = reqRes.data;

      if (Array.isArray(accData)) {
        setAccounts(accData.map(a => ({
          ...a,
          holder: a.bank_holder_name,
          account: a.account_number,
          balance: "₹" + a.balance.toLocaleString(),
          opened: new Date(a.opened_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        })));
      }

      if (Array.isArray(reqData)) {
        const mapped = reqData.map(r => ({
          ...r,
          name: r.bank_holder_name,
          phone: r.mobile,
          applied: new Date(r.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          kyc: r.status === "Pending" ? "Pending" : "Verified"
        }));
        setNewReqs(mapped.filter(r => r.status === "Pending"));
        setRequests(mapped.filter(r => r.status === "Pending"));
      }
    } catch (err) { console.error("Fetch error:", err); }
  };

  const filtered = accounts.filter(a =>
    a.holder.toLowerCase().includes(search.toLowerCase()) ||
    a.account.includes(search)
  );

  const filteredNar = newReqs.filter(r =>
    r.name.toLowerCase().includes(narSearch.toLowerCase()) ||
    r.email.toLowerCase().includes(narSearch.toLowerCase())
  );

  async function handleToggle(acc) {
    if (acc.status === "Closed") return;
    try { const res = await adminToggleAccountStatus(acc.id); if (res.ok) fetchData(); } catch (err) { }
    setModal(null);
  }

  async function handleClose(acc) {
    try { const res = await adminCloseAccountStatus(acc.id); if (res.ok) fetchData(); } catch (err) { }
    setModal(null);
  }

  async function handleApprove(req) {
    try { const res = await adminApproveRequest(req.id); if (res.ok) fetchData(); } catch (err) { }
  }

  async function handleReject(req) {
    try { const res = await adminRejectRequest(req.id); if (res.ok) fetchData(); } catch (err) { }
  }

  const TABS = [
    { id: "all", label: "All Accounts", count: accounts.length },
    { id: "new", label: "New Account Requests", count: newReqs.length },
    { id: "pending", label: "Pending Requests", count: requests.length },
  ];

  return (
    <div>
      <style>{RESPONSIVE_STYLES}</style>

      {/* Create Account Form Modal */}
      {showCreateForm && (
        <CreateAccountModal
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => { fetchData(); setShowCreateForm(false); }}
        />
      )}

      {/* Header */}
      <div className="mb-3">
        <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: 0 }}>Accounts Management</h2>
      </div>

      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setShowCreateForm(true)}
          style={{ display: "flex", alignItems: "center", gap: 8, background: C.navy, color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(15,31,75,0.15)" }}
        >
          <Plus size={15} /> Create New Account
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        {[
          { label: "Total Accounts", value: accounts.length, color: C.accent, icon: CreditCard },
          { label: "Active", value: accounts.filter(a => a.status === "Active").length, color: C.green, icon: CheckCircle2 },
          { label: "Inactive", value: accounts.filter(a => a.status === "Inactive").length, color: C.gold, icon: PauseCircle },
          { label: "Closed", value: accounts.filter(a => a.status === "Closed").length, color: C.red, icon: Ban },
          { label: "New Requests", value: newReqs.length, color: C.accent, icon: UserPlus },
          { label: "Pending", value: requests.length, color: C.purple, icon: Clock },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="stat-card-wrap" style={{ border: `1px solid ${C.border}`, borderRadius: 18, padding: "14px 16px", boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 8, transition: "all 0.3s ease", boxSizing: "border-box" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: 11, color: C.muted, margin: 0, fontWeight: 800, letterSpacing: "0.02em" }}>{s.label}</p>
                <div style={{ width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, background: s.color + "18" }}>
                  <Icon size={20} />
                </div>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: 0 }}>{s.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Tabs and Search */}
      <div className="tab-search-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div className="tabs-wrap" style={{ display: "flex", gap: 6, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 4, width: "fit-content" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "7px 18px", borderRadius: 8, border: "none", background: tab === t.id ? C.navy : "transparent", color: tab === t.id ? "#fff" : C.muted, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6 }}>
              {t.label}
              <span style={{ background: tab === t.id ? "rgba(255,255,255,0.2)" : C.border, color: tab === t.id ? "#fff" : C.muted, fontSize: 10, fontWeight: 800, padding: "1px 7px", borderRadius: 99 }}>{t.count}</span>
            </button>
          ))}
        </div>
        <div className="search-box-wrap" style={{ position: "relative", width: "100%", maxWidth: "320px", flexShrink: 0 }}>
          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: C.muted }} />
          <input
            value={tab === "all" ? search : narSearch}
            onChange={e => tab === "all" ? setSearch(e.target.value) : setNarSearch(e.target.value)}
            placeholder={tab === "all" ? "Search by name or account no..." : "Search by name or email..."}
            style={{ width: "100%", boxSizing: "border-box", paddingLeft: 32, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", background: C.card, fontFamily: "inherit" }}
          />
        </div>
      </div>

      {/* ── TAB 1: ALL ACCOUNTS ── */}
      {tab === "all" && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Desktop Table View */}
          <div className="hidden sm:block" style={{ background: C.card, borderRadius: 16, boxShadow: "0 2px 12px rgba(15,31,75,0.07)", border: `1px solid ${C.border}`, overflow: "hidden" }}>
            <div className="accounts-table">
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                <thead>
                  <tr style={{ background: "linear-gradient(to right, #1e3a8a, #153e75, #0f172a)" }}>
                    {["#", "Account Holder", "Account No.", "Type", "Balance", "Branch", "Opened", "Status", "Actions"].map(h => (
                      <TH key={h}>{h}</TH>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ padding: "60px 20px", textAlign: "center", color: C.muted, fontSize: 14 }}>
                        <CreditCard size={36} style={{ marginBottom: 12, opacity: 0.3, display: "block", margin: "0 auto 12px" }} />
                        <p style={{ margin: 0, fontWeight: 600 }}>No accounts found</p>
                      </td>
                    </tr>
                  ) : filtered.map((a, i) => (
                    <tr key={a.id} onMouseEnter={e => e.currentTarget.style.background = "#f8faff"} onMouseLeave={e => e.currentTarget.style.background = ""}>
                      <TD><span style={{ color: C.muted, fontWeight: 600 }}>{i + 1}</span></TD>
                      <TD><span style={{ fontWeight: 700 }}>{a.holder}</span></TD>
                      <TD><span style={{ fontFamily: "monospace", fontSize: 12, color: C.accent, fontWeight: 600 }}>{a.account}</span></TD>
                      <TD>{a.type}</TD>
                      <TD><span style={{ fontWeight: 700, color: C.green }}>{a.balance}</span></TD>
                      <TD><span style={{ color: C.muted }}>{a.branch}</span></TD>
                      <TD><span style={{ color: C.muted }}>{a.opened}</span></TD>
                      <TD><Badge status={a.status} /></TD>
                      <TD center>
                        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                          <button onClick={() => { setSelected(a); setModal("details"); }} style={{ background: "#eff6ff", color: C.accent, border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                            <Eye size={12} /> View
                          </button>
                          {a.status !== "Closed" && (
                            <button onClick={() => { setSelected(a); setModal("toggle"); }} style={{ background: a.status === "Active" ? "#fef9c3" : "#dcfce7", color: a.status === "Active" ? "#854d0e" : "#15803d", border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                              {a.status === "Active" ? <><XCircle size={12} /> Deactivate</> : <><CheckCircle size={12} /> Activate</>}
                            </button>
                          )}
                          {a.status !== "Closed" && (
                            <button onClick={() => { setSelected(a); setModal("close"); }} style={{ background: "#fee2e2", color: C.red, border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                              <Trash2 size={12} /> Close
                            </button>
                          )}
                        </div>
                      </TD>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden">
            {filtered.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: C.muted, background: C.card, borderRadius: 16 }}>
                 <p>No accounts found</p>
              </div>
            ) : filtered.map((a) => (
              <div key={a.id} className="mobile-card">
                 <div className="mobile-card-row">
                    <span className="mobile-card-value" style={{ fontSize: 15 }}>{a.holder}</span>
                    <Badge status={a.status} />
                 </div>
                 <div className="mobile-card-row">
                    <span className="mobile-card-label">Account No</span>
                    <span className="mobile-card-value" style={{ fontFamily: "monospace", color: C.accent }}>{a.account}</span>
                 </div>
                 <div className="mobile-card-row">
                    <span className="mobile-card-label">Type & Balance</span>
                    <div style={{ textAlign: "right" }}>
                       <div className="mobile-card-value text-[11px]">{a.type}</div>
                       <div className="mobile-card-value" style={{ color: C.green }}>{a.balance}</div>
                    </div>
                 </div>
                 <div className="mobile-card-actions">
                    <button onClick={() => { setSelected(a); setModal("details"); }} style={{ background: "#eff6ff", color: C.accent, border: "none", borderRadius: 7, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      <Eye size={12} /> View
                    </button>
                    {a.status !== "Closed" && (
                      <button onClick={() => { setSelected(a); setModal("toggle"); }} style={{ background: a.status === "Active" ? "#fef9c3" : "#dcfce7", color: a.status === "Active" ? "#854d0e" : "#15803d", border: "none", borderRadius: 7, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                        {a.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                    )}
                    {a.status !== "Closed" && (
                      <button onClick={() => { setSelected(a); setModal("close"); }} style={{ background: "#fee2e2", color: C.red, border: "none", borderRadius: 7, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                        <Trash2 size={12} /> Close
                      </button>
                    )}
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 2: NEW ACCOUNT REQUESTS ── */}
      {tab === "new" && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Desktop Table View */}
          <div className="hidden sm:block" style={{ background: C.card, borderRadius: 16, boxShadow: "0 2px 12px rgba(15,31,75,0.07)", border: `1px solid ${C.border}`, overflow: "hidden" }}>
            {filteredNar.length === 0 ? (
              <div style={{ padding: 60, textAlign: "center", color: C.muted, fontSize: 14 }}>
                <UserPlus size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>No new account requests</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                  <thead>
                    <tr style={{ background: "linear-gradient(to right, #1e3a8a, #153e75, #0f172a)" }}>
                      {["#", "Name", "Email", "Phone", "Account Type", "Reason", "Applied On", "KYC Status", "Actions"].map(h => (
                        <TH key={h}>{h}</TH>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNar.map((r, i) => (
                      <tr key={r.id} onMouseEnter={e => e.currentTarget.style.background = "#f8faff"} onMouseLeave={e => e.currentTarget.style.background = ""}>
                        <TD>{i + 1}</TD>
                        <TD><span style={{ fontWeight: 700 }}>{r.name}</span></TD>
                        <TD>{r.email}</TD>
                        <TD>{r.phone}</TD>
                        <TD>{r.account_type}</TD>
                        <TD>{r.reason || "—"}</TD>
                        <TD>{r.applied}</TD>
                        <TD><Badge status={r.kyc} /></TD>
                        <TD center>
                          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                            <button onClick={() => { setSelectedNar(r); setModal("nar-details"); }} style={{ background: "#eff6ff", color: C.accent, border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                              <Eye size={12} /> View
                            </button>
                            <button onClick={() => handleApprove(r)} style={{ background: "#dcfce7", color: "#15803d", border: "none", borderRadius: 7, padding: "5px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Approve</button>
                            <button onClick={() => handleReject(r)} style={{ background: "#fee2e2", color: C.red, border: "none", borderRadius: 7, padding: "5px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Reject</button>
                          </div>
                        </TD>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden">
            {filteredNar.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: C.muted, background: C.card, borderRadius: 16 }}>
                 <p>No new requests</p>
              </div>
            ) : filteredNar.map((r) => (
              <div key={r.id} className="mobile-card">
                 <div className="mobile-card-row">
                    <span className="mobile-card-value">{r.name}</span>
                    <Badge status={r.kyc} />
                 </div>
                 <div className="mobile-card-row">
                    <span className="mobile-card-label">Contact</span>
                    <div style={{ textAlign: "right", fontSize: 11 }}>
                       <div>{r.email}</div>
                       <div>{r.phone}</div>
                    </div>
                 </div>
                 <div className="mobile-card-row">
                    <span className="mobile-card-label">Account Type</span>
                    <span className="mobile-card-value">{r.account_type}</span>
                 </div>
                 <div className="mobile-card-actions">
                    <button onClick={() => { setSelectedNar(r); setModal("nar-details"); }} style={{ background: "#eff6ff", color: C.accent, border: "none", borderRadius: 7, padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      <Eye size={12} /> View
                    </button>
                    <button onClick={() => handleApprove(r)} style={{ background: "#dcfce7", color: "#15803d", border: "none", borderRadius: 7, padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Approve</button>
                    <button onClick={() => handleReject(r)} style={{ background: "#fee2e2", color: C.red, border: "none", borderRadius: 7, padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Reject</button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: PENDING REQUESTS ── */}
      {tab === "pending" && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Desktop Table View */}
          <div className="hidden sm:block" style={{ background: C.card, borderRadius: 16, boxShadow: "0 2px 12px rgba(15,31,75,0.07)", border: `1px solid ${C.border}`, overflow: "hidden" }}>
            {requests.length === 0 ? (
              <div style={{ padding: 60, textAlign: "center", color: C.muted, fontSize: 14 }}>
                <Clock size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>No pending requests</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                  <thead>
                    <tr style={{ background: "linear-gradient(to right, #1e3a8a, #153e75, #0f172a)" }}>
                      {["#", "Name", "Email", "Account Type", "Applied On", "Actions"].map(h => (
                        <TH key={h}>{h}</TH>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((r, i) => (
                      <tr key={r.id} onMouseEnter={e => e.currentTarget.style.background = "#f8faff"} onMouseLeave={e => e.currentTarget.style.background = ""}>
                        <TD>{i + 1}</TD>
                        <TD><span style={{ fontWeight: 700 }}>{r.name}</span></TD>
                        <TD>{r.email}</TD>
                        <TD>{r.account_type}</TD>
                        <TD>{r.applied}</TD>
                        <TD center>
                          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                            <button onClick={() => { setSelectedPending(r); setModal("pending-details"); }} style={{ background: "#eff6ff", color: C.accent, border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                              <Eye size={12} /> View
                            </button>
                            <button onClick={() => handleApprove(r)} style={{ background: "#dcfce7", color: "#15803d", border: "none", borderRadius: 7, padding: "5px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Approve</button>
                            <button onClick={() => handleReject(r)} style={{ background: "#fee2e2", color: C.red, border: "none", borderRadius: 7, padding: "5px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Reject</button>
                          </div>
                        </TD>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden">
            {requests.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: C.muted, background: C.card, borderRadius: 16 }}>
                 <p>No pending requests</p>
              </div>
            ) : requests.map((r) => (
              <div key={r.id} className="mobile-card">
                 <div className="mobile-card-row">
                    <span className="mobile-card-value" style={{ fontSize: 14 }}>{r.name}</span>
                    <span className="text-[10px] text-slate-400 font-bold">{r.applied}</span>
                 </div>
                 <div className="mobile-card-row">
                    <span className="mobile-card-label">Email</span>
                    <span className="mobile-card-value text-[11px] truncate" style={{ maxWidth: '180px' }}>{r.email}</span>
                 </div>
                 <div className="mobile-card-row">
                    <span className="mobile-card-label">Account Type</span>
                    <span className="mobile-card-value">{r.account_type}</span>
                 </div>
                 <div className="mobile-card-actions">
                    <button onClick={() => { setSelectedPending(r); setModal("pending-details"); }} style={{ background: "#eff6ff", color: C.accent, border: "none", borderRadius: 7, padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      <Eye size={12} /> View
                    </button>
                    <button onClick={() => handleApprove(r)} style={{ background: "#dcfce7", color: "#15803d", border: "none", borderRadius: 7, padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Approve</button>
                    <button onClick={() => handleReject(r)} style={{ background: "#fee2e2", color: C.red, border: "none", borderRadius: 7, padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Reject</button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────── MODALS ─────────── */}

      {modal === "details" && selected && (
        <Modal title="🏦 Account Details" onClose={() => setModal(null)}>
          <ModalSection icon={User} label="Account Info" />
          <DetailRow label="Account Holder" value={selected.holder} />
          <DetailRow label="Account Number" value={selected.account} mono />
          <DetailRow label="Account Type" value={selected.type} />
          <DetailRow label="Balance" value={selected.balance} />
          <DetailRow label="IFSC Code" value={selected.ifsc} mono />
          <DetailRow label="Branch" value={selected.branch} />
          <DetailRow label="Opened On" value={selected.opened} />
          <DetailRow label="Status" value={selected.status} badge />
          <button onClick={() => setModal(null)} style={{ width: "100%", marginTop: 16, padding: "11px", borderRadius: 10, border: "none", background: C.navy, color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>Close</button>
        </Modal>
      )}

      {modal === "toggle" && selected && (
        <Modal title={selected.status === "Active" ? "⚠️ Deactivate Account" : "✅ Activate Account"} onClose={() => setModal(null)}>
          <p style={{ fontSize: 14, color: C.text }}>Confirm status change for <strong>{selected.holder}</strong>?</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px", background: "#fff", borderRadius: 10, border: "1px solid #ccc", cursor: "pointer", fontWeight: 700 }}>Cancel</button>
            <button onClick={() => handleToggle(selected)} style={{ flex: 1, padding: "10px", background: C.navy, color: "#fff", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700 }}>Confirm</button>
          </div>
        </Modal>
      )}

      {modal === "close" && selected && (
        <Modal title="🚫 Close Account" onClose={() => setModal(null)}>
          <p style={{ fontSize: 14, color: C.text }}>Permanently close account for <strong>{selected.holder}</strong>?</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px", background: "#fff", borderRadius: 10, border: "1px solid #ccc", cursor: "pointer", fontWeight: 700 }}>Cancel</button>
            <button onClick={() => handleClose(selected)} style={{ flex: 1, padding: "10px", background: C.red, color: "#fff", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700 }}>Yes, Close</button>
          </div>
        </Modal>
      )}

      {modal === "nar-details" && selectedNar && (
        <RequestDetailModal req={selectedNar} onClose={() => setModal(null)} />
      )}

      {modal === "pending-details" && selectedPending && (
        <RequestDetailModal req={selectedPending} onClose={() => setModal(null)} />
      )}
    </div>
  );
}