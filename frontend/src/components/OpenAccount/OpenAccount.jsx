import { useState, useEffect, useRef } from "react";
import {
  CheckCircle, AlertCircle, Loader,
  User, Users, Calendar, UserCheck,
  Phone, Mail, MapPin,
  ShieldCheck, CreditCard,
  Landmark, GitBranch,
  UserPlus, Heart,
  ImagePlus, X,
  FileText, PenLine, Clock, RefreshCw, Upload, Eye
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
        <div style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
          padding: "36px 32px 28px", textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
          <div style={{ position:"absolute", bottom:-30, left:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
          <div style={{ display:"flex", justifyContent:"center", marginBottom: 16, position:"relative", zIndex:1 }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
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
        <div style={{ padding: "24px 28px 28px", background: "#f8faff" }}>
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

/* ── SIGNATURE MODAL ── */
function SignatureModal({ isOpen, onClose, onSave }) {
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
    setSignatureName("");
    setApplied(false);
  };

  const handleClose = () => {
    setSignatureName("");
    setApplied(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9998,
      background: "rgba(10,20,50,0.75)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, overflow: "hidden",
        maxWidth: 480, width: "100%",
        boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
        animation: "popIn 0.45s cubic-bezier(.22,1,.36,1)",
      }}>
        <div style={{
          background: "linear-gradient(135deg, #1e3a7b 0%, #2d5a9e 100%)",
          padding: "28px 32px", textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
          <div style={{ position:"absolute", bottom:-30, left:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative", zIndex:1 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>
              <PenLine size={18} style={{ display: "inline-block", marginRight: 8 }}/>
              Add Signature
            </h2>
            <button onClick={handleClose} style={{
              background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", cursor: "pointer",
              padding: "6px 8px", borderRadius: 6, fontSize: 18, display: "flex", alignItems: "center"
            }}>
              <X size={20}/>
            </button>
          </div>
        </div>
        <div style={{ padding: "24px 28px" }}>
          <p style={{ fontSize: 12, color: "#64748b", marginBottom: 16, marginTop: 0 }}>
            Type your full name to create your signature
          </p>
          <div style={{ position: "relative", marginBottom: 12 }}>
            <User size={14} style={{ position: "absolute", left: 10, top: 10, color: "#94a3b8", pointerEvents: "none" }}/>
            <input
              type="text"
              value={signatureName}
              onChange={handleNameChange}
              placeholder="Type your full name"
              style={{
                width: "100%", paddingLeft: 36, paddingRight: 12, paddingTop: 10, paddingBottom: 10,
                borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13,
                outline: "none", boxSizing: "border-box",
              }}
              onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>
          <div style={{
            position: "relative", backgroundColor: "#fff", border: "1.5px solid #e2e8f0",
            borderRadius: 12, overflow: "hidden", marginBottom: 16, height: 80,
          }}>
            <canvas ref={canvasRef} width={500} height={80} style={{ display:"block", width: "100%", height: "100%" }}/>
            {!applied && (
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                pointerEvents: "none", backgroundColor: "rgba(248,250,252,0.5)"
              }}>
                <p style={{ color: "#cbd5e1", fontSize: 12, margin: 0, userSelect: "none" }}>Preview appears here</p>
              </div>
            )}
            <div style={{
              position: "absolute", bottom: 16, left: 12, right: 12,
              borderBottom: "1.5px dashed #e2e8f0", pointerEvents: "none"
            }}/>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" onClick={() => renderTyped(signatureName)}
              disabled={!signatureName.trim()}
              style={{
                flex: 1, padding: "10px 0", borderRadius: 8, fontSize: 13, fontWeight: 600,
                border: "1.5px solid #3b82f6", background: "#eff6ff", color: "#1e40af", cursor: "pointer",
                transition: "all 0.2s", opacity: signatureName.trim() ? 1 : 0.4,
              }}
            >
              Preview
            </button>
            <button type="button" onClick={handleSave}
              disabled={!applied}
              style={{
                flex: 1, padding: "10px 0", borderRadius: 8, fontSize: 13, fontWeight: 600,
                border: "none", background: "#1e3a7b", color: "#fff", cursor: "pointer",
                transition: "all 0.2s", opacity: applied ? 1 : 0.4,
              }}
            >
              ✓ Save Signature
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes popIn { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }`}</style>
    </div>
  );
}

/* ── DOCUMENT UPLOAD CARD ── */
function DocumentUploadCard({ label, sublabel, icon: Icon, accentColor, file, preview, onUpload, onRemove, inputId }) {
  const isImage = file && file.type?.startsWith("image/");

  return (
    <div style={{
      background: "#fff",
      border: `1.5px solid ${file ? accentColor + "55" : "#e2e8f0"}`,
      borderRadius: 14,
      overflow: "hidden",
      transition: "all 0.25s ease",
      boxShadow: file ? `0 4px 16px ${accentColor}18` : "none",
    }}>
      {/* Card Header */}
      <div style={{
        padding: "10px 14px",
        background: file ? `linear-gradient(135deg, ${accentColor}12, ${accentColor}06)` : "#f8faff",
        borderBottom: `1px solid ${file ? accentColor + "30" : "#f0f0f0"}`,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: file ? accentColor : "#e2e8f0",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          transition: "background 0.25s",
        }}>
          <Icon size={15} color={file ? "#fff" : "#94a3b8"}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: file ? "#1e293b" : "#64748b", margin: 0 }}>{label}</p>
          <p style={{ fontSize: 10, color: "#94a3b8", margin: 0 }}>{sublabel}</p>
        </div>
        {file && (
          <div style={{
            background: "#dcfce7", border: "1px solid #86efac",
            borderRadius: 20, padding: "2px 8px",
            fontSize: 9, fontWeight: 700, color: "#15803d", letterSpacing: "0.05em",
          }}>
            ✓ UPLOADED
          </div>
        )}
      </div>

      {/* Upload area */}
      <div style={{ padding: "10px 14px" }}>
        {!file ? (
          <label htmlFor={inputId} style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            border: "2px dashed #e2e8f0", borderRadius: 10,
            padding: "20px 12px", cursor: "pointer",
            transition: "all 0.2s",
            gap: 6,
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = accentColor;
              e.currentTarget.style.background = accentColor + "08";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: accentColor + "15",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Upload size={16} color={accentColor}/>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#475569" }}>Click to upload</span>
            <span style={{ fontSize: 10, color: "#94a3b8" }}>JPG, PNG, PDF — Max 5MB</span>
            <input id={inputId} type="file" accept="image/*,application/pdf" onChange={onUpload} style={{ display: "none" }} required/>
          </label>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Preview */}
            {isImage && preview ? (
              <div style={{
                width: 52, height: 52, borderRadius: 8, flexShrink: 0,
                overflow: "hidden", border: `2px solid ${accentColor}40`,
              }}>
                <img src={preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
              </div>
            ) : (
              <div style={{
                width: 52, height: 52, borderRadius: 8, flexShrink: 0,
                background: accentColor + "15",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `2px solid ${accentColor}30`,
              }}>
                <FileText size={20} color={accentColor}/>
              </div>
            )}

            {/* File info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#1e293b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {file.name}
              </p>
              <p style={{ fontSize: 10, color: "#94a3b8", margin: "2px 0 0" }}>
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>

            {/* Remove */}
            <button type="button" onClick={onRemove} style={{
              width: 28, height: 28, borderRadius: 8,
              background: "#fef2f2", border: "1px solid #fecaca",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
              transition: "all 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#fee2e2"}
              onMouseLeave={e => e.currentTarget.style.background = "#fef2f2"}
            >
              <X size={12} color="#ef4444"/>
            </button>
          </div>
        )}
      </div>
    </div>
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

  // ── Document uploads ──
  const [photo, setPhoto]                     = useState(null);
  const [photoPreview, setPhotoPreview]       = useState(null);
  const [aadhaarDoc, setAadhaarDoc]           = useState(null);
  const [aadhaarPreview, setAadhaarPreview]   = useState(null);
  const [panDoc, setPanDoc]                   = useState(null);
  const [panPreview, setPanPreview]           = useState(null);

  const [signature, setSignature]         = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [loading, setLoading]             = useState(false);
  const [alert, setAlert]                 = useState({ show: false, type: "", msg: "" });

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

  // Generic file handler factory
  const makeFileHandler = (setFile, setPreview) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    // Reset input value so same file can be re-uploaded
    e.target.value = "";
  };

  const makeRemover = (setFile, setPreview) => () => {
    setFile(null);
    setPreview(null);
  };

  const showAlertMsg = (type, msg) => {
    setAlert({ show: true, type, msg });
    if (type === "error") setTimeout(() => setAlert({ show: false }), 4000);
  };

  const handleSignatureSave = (sig) => {
    setSignature(sig);
    setShowSignatureModal(false);
    showAlertMsg("success", `Signature saved for "${sig.name}"`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree)                { showAlertMsg("error", "Please accept the Terms & Conditions"); return; }
    if (formData.aadhaar.length !== 12) { showAlertMsg("error", "Aadhaar number must be exactly 12 digits"); return; }
    if (formData.pan.length !== 10)     { showAlertMsg("error", "PAN number must be exactly 10 characters"); return; }
    if (!photo)                         { showAlertMsg("error", "Please upload your passport-size photo"); return; }
    if (!aadhaarDoc)                    { showAlertMsg("error", "Please upload your Aadhaar Card document"); return; }
    if (!panDoc)                        { showAlertMsg("error", "Please upload your PAN Card document"); return; }
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
    });
     
    setLoading(false);

    if (res.ok && res.data.success) {
      localStorage.setItem("payzen_account", JSON.stringify(res.data.data));
      setSuccessData(res.data.data);
      setTimeout(() => navigate("/dashboard"), 3500);
    } else {
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

      <SignatureModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onSave={handleSignatureSave}
      />

      <div className="min-h-screen py-4 px-3 bg-white">
        <div className="w-full bg-white shadow-lg rounded-xl p-5 border border-gray-100">

          <div className="text-center mb-5">
            <h2 className="text-lg font-semibold text-blue-900">Open New Account</h2>
            <p className="text-gray-500 text-xs">Secure Banking Registration Portal</p>
          </div>

          {alert.show && (
            <div className={`flex items-center gap-2 px-3 py-2.5 rounded-lg mb-4 text-xs font-medium
              ${alert.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"}`}>
              {alert.type === "success" ? <CheckCircle size={16}/> : <AlertCircle size={16}/>}
              {alert.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

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
                <label className="text-xs font-medium text-gray-700">Residential Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-2.5 top-2 text-gray-400"/>
                  <textarea name="address" value={formData.address} onChange={handleChange} required
                    placeholder="Enter your full address"
                    className="rounded-lg pl-7 pr-3 py-2 bg-white border h-16 w-full focus:ring-2 focus:ring-blue-500 outline-none resize-none text-xs"/>
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

            {/* ── Document Upload Section ── */}
            <div className="rounded-lg p-3 bg-gray-50">
              <h3 className="text-xs font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <FileText size={14} className="text-blue-700"/>
                Document Upload
                <span className="text-red-500 font-normal ml-0.5">*</span>
              </h3>

              {/* Progress indicator */}
              <div className="flex items-center gap-2 mb-3 bg-white rounded-lg px-3 py-2 border border-gray-100">
                <div className="flex items-center gap-1.5 flex-1">
                  {[
                    { label: "Photo", done: !!photo },
                    { label: "Aadhaar", done: !!aadhaarDoc },
                    { label: "PAN", done: !!panDoc },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div style={{
                        width: 18, height: 18, borderRadius: "50%",
                        background: item.done ? "#22c55e" : "#e2e8f0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.3s",
                      }}>
                        {item.done
                          ? <CheckCircle size={11} color="#fff" strokeWidth={2.5}/>
                          : <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#94a3b8", display: "block" }}/>
                        }
                      </div>
                      <span style={{ fontSize: 10, fontWeight: item.done ? 600 : 400, color: item.done ? "#15803d" : "#94a3b8" }}>
                        {item.label}
                      </span>
                      {i < 2 && <span style={{ color: "#e2e8f0", fontSize: 10, marginLeft: 2 }}>—</span>}
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: "#64748b" }}>
                  {[photo, aadhaarDoc, panDoc].filter(Boolean).length}/3 uploaded
                </span>
              </div>

              {/* Three upload cards */}
              <div className="grid md:grid-cols-3 gap-3">

                {/* Passport Photo */}
                <DocumentUploadCard
                  label="Passport Photo"
                  sublabel="Clear face photo"
                  icon={ImagePlus}
                  accentColor="#6366f1"
                  file={photo}
                  preview={photoPreview}
                  onUpload={makeFileHandler(setPhoto, setPhotoPreview)}
                  onRemove={makeRemover(setPhoto, setPhotoPreview)}
                  inputId="upload-photo"
                />

                {/* Aadhaar Card */}
                <DocumentUploadCard
                  label="Aadhaar Card"
                  sublabel="Front side of Aadhaar"
                  icon={ShieldCheck}
                  accentColor="#0ea5e9"
                  file={aadhaarDoc}
                  preview={aadhaarPreview}
                  onUpload={makeFileHandler(setAadhaarDoc, setAadhaarPreview)}
                  onRemove={makeRemover(setAadhaarDoc, setAadhaarPreview)}
                  inputId="upload-aadhaar"
                />

                {/* PAN Card */}
                <DocumentUploadCard
                  label="PAN Card"
                  sublabel="Clear PAN card image"
                  icon={CreditCard}
                  accentColor="#f59e0b"
                  file={panDoc}
                  preview={panPreview}
                  onUpload={makeFileHandler(setPanDoc, setPanPreview)}
                  onRemove={makeRemover(setPanDoc, setPanPreview)}
                  inputId="upload-pan"
                />

              </div>
            </div>

            {/* Terms */}
            <div className="flex gap-1.5 items-start">
              <input type="checkbox" name="agree" onChange={handleChange} className="mt-0.5" required/>
              <p className="text-[11px] text-gray-600">
                I confirm that all the information provided is accurate and correct.{" "}
                <span className="text-red-500">*</span>
              </p>
            </div>

            {/* Submit + Signature */}
            <div className="flex flex-col sm:flex-row gap-3 items-end">

              <button type="submit" disabled={loading}
                className="w-full md:w-40
                  bg-[linear-gradient(180deg,#1e3a7b_0%,#152d68_60%,#0f1f4d_100%)]
                  hover:bg-[#5b4ec2]
                  text-white font-semibold rounded-xl py-3.5
                  flex items-center justify-center gap-2
                  transition-all transform active:scale-[0.98] shadow-lg">
                {loading
                  ? <><Loader size={16} className="animate-spin"/> Opening...</>
                  : "Open Account"}
              </button>

              {/* Signature Field */}
              <div onClick={() => setShowSignatureModal(true)} className="w-full sm:w-72 cursor-pointer">
                <div className={`h-12 rounded-lg border-2 px-4 flex items-center transition-all shadow-sm
                  ${signature
                    ? "border-green-400 bg-gradient-to-r from-green-50 to-emerald-50"
                    : "border-blue-300 bg-blue-50 hover:border-blue-500 hover:shadow-md"}
                `}>
                  {signature ? (
                    <div className="flex items-center gap-2 w-full">
                      <div className="w-7 h-7 rounded-full bg-green-300 flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={16} className="text-green-700"/>
                      </div>
                      <span className="text-sm font-semibold text-green-800 truncate">
                        {signature.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-blue-700">
                      <PenLine size={16}/>
                      <span className="text-sm font-medium">Add Signature</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </form>
        </div>
      </div>
    </>
  );
}

/* ── Reusable Components ── */

function Section({ title, children }) {
  return (
    <div className="rounded-lg p-3 bg-gray-50">
      <h3 className="text-sm font-semibold text-blue-900 mb-2.5">{title}</h3>
      <div className="grid md:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
      {hint && <p className="text-[10px] text-gray-400">{hint}</p>}
    </div>
  );
}

function IconInput({ icon, children }) {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-2.5 text-gray-400 pointer-events-none text-sm">{icon}</span>
      <div className="w-full [&>input]:rounded-lg [&>input]:pl-7 [&>input]:pr-2.5 [&>input]:py-1.5 [&>input]:bg-white [&>input]:border [&>input]:w-full [&>input]:focus:ring-2 [&>input]:focus:ring-blue-500 [&>input]:outline-none [&>input]:text-xs
                      [&>select]:rounded-lg [&>select]:pl-7 [&>select]:pr-2.5 [&>select]:py-1.5 [&>select]:bg-white [&>select]:border [&>select]:w-full [&>select]:focus:ring-2 [&>select]:focus:ring-blue-500 [&>select]:outline-none [&>select]:text-xs [&>select]:appearance-none">
        {children}
      </div>
    </div>
  );
}