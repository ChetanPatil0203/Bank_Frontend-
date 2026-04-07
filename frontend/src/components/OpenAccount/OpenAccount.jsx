import { useState, useEffect, useRef } from "react";
import {
  CheckCircle, AlertCircle, Loader,
  User, Users, Calendar, UserCheck,
  Phone, Mail, MapPin,
  ShieldCheck, CreditCard,
  Landmark, GitBranch,
  UserPlus, Heart,
  ImagePlus, X,
  FileText, PenLine, Clock, Upload, HelpCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { openAccount } from "../../utils/apiServices";

/* ════════════════════════════════════════════════════
   SUCCESS POPUP
   ════════════════════════════════════════════════════ */
function SuccessPopup({ data }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(10,20,50,0.75)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, overflow: "hidden",
        maxWidth: 440, width: "100%",
        boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
        animation: "popIn 0.45s cubic-bezier(.22,1,.36,1)",
        margin: "0 12px",
      }}>
        <div style={{
          background: "linear-gradient(135deg, #0d1b3e 0%, #1a2f5e 50%, #0f2460 100%)",
          padding: "32px 20px 28px", textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
          <div style={{ position:"absolute", bottom:-30, left:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.03)" }}/>
          <div style={{ display:"flex", justifyContent:"center", marginBottom: 16, position:"relative", zIndex:1 }}>
            <CheckCircle size={48} color="#4ade80" strokeWidth={1.8} style={{ filter: "drop-shadow(0 0 12px rgba(74,222,128,0.4))" }}/>
          </div>
          <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, position:"relative", zIndex:1 }}>
            Account Opened Successfully
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0, position:"relative", zIndex:1 }}>
            Welcome, {data.bank_holder_name}
          </h2>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 8, position:"relative", zIndex:1 }}>
            Your bank account is now active and ready to use.
          </p>
        </div>
        <div style={{ padding: "18px 16px", background: "#f8f9fc" }}>
          <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 14, padding: "12px 14px", marginBottom: 10 }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Account Number</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#0d1b3e", fontFamily: "monospace", letterSpacing: 2, wordBreak: "break-all" }}>{data.account_number}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:12, padding:"10px 10px" }}>
              <p style={{ fontSize:10, fontWeight:600, color:"#94a3b8", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>IFSC Code</p>
              <p style={{ fontSize:12, fontWeight:600, color:"#1e293b", fontFamily:"monospace", wordBreak:"break-all" }}>{data.ifsc}</p>
            </div>
            <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:12, padding:"10px 10px" }}>
              <p style={{ fontSize:10, fontWeight:600, color:"#94a3b8", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Account Type</p>
              <p style={{ fontSize:12, fontWeight:600, color:"#1e293b" }}>{data.account_type}</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes popIn { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }`}</style>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   PENDING POPUP
   ════════════════════════════════════════════════════ */
function PendingPopup({ name, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(10,20,50,0.75)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
      overflowY: "auto",
    }}>
      <div style={{
        background: "#fff", borderRadius: 24, overflow: "hidden",
        maxWidth: 420, width: "100%",
        boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
        animation: "popIn 0.45s cubic-bezier(.22,1,.36,1)",
        margin: "auto",
      }}>
        <div style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
          padding: "28px 20px 22px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
          <div style={{ position:"absolute", bottom:-30, left:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
          <div style={{ display:"flex", justifyContent:"center", marginBottom: 14, position:"relative", zIndex:1 }}>
            <div style={{
              width: 62, height: 62, borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 0 8px rgba(255,255,255,0.06)",
              animation: "pulseRing 2s ease-in-out infinite",
            }}>
              <Clock size={30} color="#fbbf24" strokeWidth={1.8}
                style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.5))" }}/>
            </div>
          </div>
          <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6, position:"relative", zIndex:1 }}>
            Request Submitted
          </p>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0, position:"relative", zIndex:1, lineHeight: 1.3 }}>
            Pending Admin Approval
          </h2>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 8, position:"relative", zIndex:1 }}>
            Your account opening request has been sent to the admin for review.
          </p>
        </div>
        <div style={{ padding: "18px 16px 22px", background: "#f8faff" }}>
          <div style={{
            background: "#fff", border: "1.5px solid #dbeafe", borderRadius: 16,
            padding: "12px 14px", marginBottom: 14,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <User size={17} color="#2563eb"/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>Applicant</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</p>
            </div>
            <div style={{
              background: "#fef9c3", border: "1px solid #fde047",
              borderRadius: 20, padding: "4px 10px",
              fontSize: 9, fontWeight: 700, color: "#854d0e",
              display: "flex", alignItems: "center", gap: 4, flexShrink: 0,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", display: "inline-block", animation: "blink 1.2s ease-in-out infinite" }}/>
              PENDING
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            {[
              { label: "Application Submitted", done: true },
              { label: "Admin Review", done: false, active: true },
              { label: "Account Activation", done: false },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 2 ? 10 : 0 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                  background: s.done ? "#22c55e" : s.active ? "#2563eb" : "#e2e8f0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: s.active ? "0 0 0 4px rgba(37,99,235,0.15)" : "none",
                  animation: s.active ? "pulseRing 2s ease-in-out infinite" : "none",
                }}>
                  {s.done
                    ? <CheckCircle size={13} color="#fff" strokeWidth={2.5}/>
                    : s.active
                      ? <Clock size={12} color="#fff" strokeWidth={2.5}/>
                      : <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#94a3b8", display: "block" }}/>
                  }
                </div>
                <span style={{
                  fontSize: 13, fontWeight: s.active ? 600 : 500,
                  color: s.done ? "#16a34a" : s.active ? "#1d4ed8" : "#94a3b8",
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#64748b", textAlign: "center", marginBottom: 14, lineHeight: 1.6 }}>
            The admin will review your application shortly. You will be notified once your account is activated.
          </p>
          <button
            onClick={onClose}
            style={{
              width: "100%", padding: "13px 0",
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
        @keyframes popIn    { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes pulseRing{ 0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,0.25)} 50%{box-shadow:0 0 0 8px rgba(37,99,235,0)} }
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   SIGNATURE MODAL
   ════════════════════════════════════════════════════ */
function SignatureModal({ isOpen, onClose, onSave }) {
  const canvasRef     = useRef(null);
  const containerRef  = useRef(null);
  const [signatureName, setSignatureName] = useState("");
  const [applied, setApplied]             = useState(false);

  /* Render typed name onto canvas — uses actual canvas pixel width */
  const renderTyped = (name) => {
    if (!name.trim()) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font          = "italic 22px Georgia, serif";
    ctx.fillStyle     = "#0d1b3e";
    ctx.textAlign     = "center";
    ctx.textBaseline  = "middle";
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);
    setApplied(true);
  };

  /* Sync canvas pixel size to its CSS display size on open */
  useEffect(() => {
    if (!isOpen) return;
    const sync = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect   = canvas.getBoundingClientRect();
      canvas.width  = rect.width  || 360;
      canvas.height = rect.height || 80;
    };
    const t = setTimeout(sync, 50); // after paint
    window.addEventListener("resize", sync);
    return () => { clearTimeout(t); window.removeEventListener("resize", sync); };
  }, [isOpen]);

  const handleNameChange = (e) => {
    setSignatureName(e.target.value);
    setApplied(false);
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    if (!signatureName.trim() || !applied) return;
    onSave({ dataUrl: canvasRef.current.toDataURL("image/png"), name: signatureName });
    setSignatureName(""); setApplied(false);
  };

  const handleClose = () => {
    setSignatureName(""); setApplied(false); onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9998,
      background: "rgba(10,20,50,0.75)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px", overflowY: "auto",
    }}>
      <div
        ref={containerRef}
        style={{
          background: "#fff", borderRadius: 20, overflow: "hidden",
          maxWidth: 480, width: "100%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
          animation: "popIn 0.45s cubic-bezier(.22,1,.36,1)",
          margin: "auto",
        }}
      >
        <div style={{
          background: "linear-gradient(135deg, #1e3a7b 0%, #2d5a9e 100%)",
          padding: "22px 18px", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
          <div style={{ position:"absolute", bottom:-30, left:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative", zIndex:1 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: 0, display:"flex", alignItems:"center", gap: 8 }}>
              <PenLine size={16}/> Add Signature
            </h2>
            <button onClick={handleClose} style={{
              background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
              cursor: "pointer", width: 34, height: 34, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <X size={18}/>
            </button>
          </div>
        </div>
        <div style={{ padding: "18px 18px" }}>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 14, marginTop: 0 }}>
            Type your full name to create your signature
          </p>
          <div style={{ position: "relative", marginBottom: 12 }}>
            <User size={14} style={{ position: "absolute", left: 12, top: "50%", transform:"translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }}/>
            <input
              type="text"
              value={signatureName}
              onChange={handleNameChange}
              placeholder="Type your full name"
              style={{
                width: "100%", paddingLeft: 36, paddingRight: 12, paddingTop: 11, paddingBottom: 11,
                borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14,
                outline: "none", boxSizing: "border-box", fontFamily: "inherit",
                background: "#f8faff",
              }}
              onFocus={e => e.target.style.borderColor = "#3b82f6"}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>
          {/* Canvas — width:100% so it fills the modal on all screen sizes */}
          <div style={{
            position: "relative", backgroundColor: "#fff",
            border: "1.5px solid #e2e8f0", borderRadius: 12,
            overflow: "hidden", marginBottom: 18, height: 80,
          }}>
            <canvas
              ref={canvasRef}
              style={{ display:"block", width: "100%", height: "100%" }}
            />
            {!applied && (
              <div style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center",
                pointerEvents: "none", background: "rgba(248,250,252,0.7)",
              }}>
                <p style={{ color: "#cbd5e1", fontSize: 13, margin: 0 }}>Preview appears here</p>
              </div>
            )}
            <div style={{
              position: "absolute", bottom: 14, left: 14, right: 14,
              borderBottom: "1.5px dashed #e2e8f0", pointerEvents: "none"
            }}/>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={() => renderTyped(signatureName)}
              disabled={!signatureName.trim()}
              style={{
                flex: 1, padding: "11px 0", borderRadius: 10, fontSize: 13, fontWeight: 600,
                border: "1.5px solid #3b82f6", background: "#eff6ff", color: "#1e40af",
                cursor: signatureName.trim() ? "pointer" : "not-allowed",
                opacity: signatureName.trim() ? 1 : 0.45, transition: "all 0.2s",
              }}
            >
              Preview
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!applied}
              style={{
                flex: 1, padding: "11px 0", borderRadius: 10, fontSize: 13, fontWeight: 700,
                border: "none", background: applied ? "#1e3a7b" : "#94a3b8",
                color: "#fff", cursor: applied ? "pointer" : "not-allowed",
                transition: "all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap: 6,
              }}
            >
              <CheckCircle size={14}/> Save Signature
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes popIn { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }`}</style>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   DOCUMENT UPLOAD CARD
   ════════════════════════════════════════════════════ */
function DocumentUploadCard({ label, sublabel, icon: Icon, accentColor, file, preview, onUpload, onRemove, inputId }) {
  const isImage = file && file.type?.startsWith("image/");
  return (
    <div style={{
      background: "#fff", border: `1.5px solid ${file ? accentColor + "55" : "#e2e8f0"}`,
      borderRadius: 14, overflow: "hidden", transition: "all 0.25s ease",
      boxShadow: file ? `0 4px 16px ${accentColor}18` : "none",
    }}>
      <div style={{
        padding: "10px 12px",
        background: file ? `linear-gradient(135deg, ${accentColor}12, ${accentColor}06)` : "#f8faff",
        borderBottom: `1px solid ${file ? accentColor + "30" : "#f0f0f0"}`,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: file ? accentColor : "#e2e8f0",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          transition: "background 0.25s",
        }}>
          <Icon size={14} color={file ? "#fff" : "#94a3b8"}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: file ? "#1e293b" : "#64748b", margin: 0 }}>{label}</p>
          <p style={{ fontSize: 10, color: "#94a3b8", margin: 0 }}>{sublabel}</p>
        </div>
        {file && (
          <div style={{
            background: "#dcfce7", border: "1px solid #86efac", borderRadius: 20,
            padding: "2px 7px", fontSize: 9, fontWeight: 700, color: "#15803d", flexShrink: 0,
          }}>✓ DONE</div>
        )}
      </div>
      <div style={{ padding: "10px 12px" }}>
        {!file ? (
          <label htmlFor={inputId} style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            border: "2px dashed #e2e8f0", borderRadius: 10, padding: "14px 8px",
            cursor: "pointer", transition: "all 0.2s", gap: 5,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.background = accentColor + "08"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 8, background: accentColor + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Upload size={14} color={accentColor}/>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#475569" }}>Click to upload</span>
            <span style={{ fontSize: 9, color: "#94a3b8", textAlign: "center" }}>JPG, PNG, PDF · Max 5MB</span>
            <input id={inputId} type="file" accept="image/*,application/pdf" onChange={onUpload} style={{ display: "none" }} required/>
          </label>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isImage && preview ? (
              <div style={{ width: 42, height: 42, borderRadius: 8, flexShrink: 0, overflow: "hidden", border: `2px solid ${accentColor}40` }}>
                <img src={preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
              </div>
            ) : (
              <div style={{ width: 42, height: 42, borderRadius: 8, flexShrink: 0, background: accentColor + "15", display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${accentColor}30` }}>
                <FileText size={18} color={accentColor}/>
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#1e293b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
              <p style={{ fontSize: 10, color: "#94a3b8", margin: "2px 0 0" }}>{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button type="button" onClick={onRemove} style={{
              width: 26, height: 26, borderRadius: 8, background: "#fef2f2",
              border: "1px solid #fecaca", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", flexShrink: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#fee2e2"}
              onMouseLeave={e => e.currentTarget.style.background = "#fef2f2"}
            >
              <X size={11} color="#ef4444"/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════ */
export default function OpenAccountPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bank_holder_name: "", father_name: "", dob: "", gender: "",
    mobile: "", email: "", address: "", aadhaar: "", pan: "",
    account_type: "", branch: "", nominee_name: "", nominee_relation: "",
    reason: "", agree: false,
  });

  const [successData, setSuccessData]   = useState(null);
  const [showPending, setShowPending]   = useState(false);

  const [photo, setPhoto]               = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [aadhaarDoc, setAadhaarDoc]     = useState(null);
  const [aadhaarPreview, setAadhaarPreview] = useState(null);
  const [panDoc, setPanDoc]             = useState(null);
  const [panPreview, setPanPreview]     = useState(null);

  const [signature, setSignature]                   = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [loading, setLoading]                       = useState(false);
  const [alert, setAlert]                           = useState({ show: false, type: "", msg: "" });

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

  const handleAadhaar = (e) => setFormData({ ...formData, aadhaar: e.target.value.replace(/\D/g, "").slice(0, 12) });
  const handlePan     = (e) => setFormData({ ...formData, pan: e.target.value.toUpperCase().slice(0, 10) });

  const makeFileHandler = (setFile, setPreview) => (e) => {
    const file = e.target.files[0]; if (!file) return;
    setFile(file);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    } else { setPreview(null); }
    e.target.value = "";
  };

  const makeRemover = (setFile, setPreview) => () => { setFile(null); setPreview(null); };

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
    if (!formData.reason.trim())        { showAlertMsg("error", "Please state the purpose of opening this account"); return; }

    setLoading(true); setAlert({ show: false });

    const res = await openAccount({
      ...formData,
      signature_name: signature.name,
      photo, aadhaarDoc, panDoc,
    });

    setLoading(false);

    if (res.ok && res.data.success) {
      setShowPending(true);
    } else {
      const msg = res.data?.message || "Submission failed. Please try again.";
      showAlertMsg("error", msg);
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

      {/* ── Page wrapper — safe horizontal padding, no overflow ── */}
      <div
        className="min-h-screen bg-white"
        style={{ padding: "12px", boxSizing: "border-box", overflowX: "hidden" }}
      >
        <div
          className="w-full mx-auto bg-white shadow-lg rounded-xl border border-gray-100"
          style={{ maxWidth: 768, padding: "clamp(14px, 4vw, 20px)", boxSizing: "border-box" }}
        >

          <div className="text-center mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-blue-900">Open New Account</h2>
            <p className="text-gray-500 text-xs">Secure Banking Registration Portal</p>
          </div>

          {alert.show && (
            <div className={`flex items-start gap-2 px-3 py-2.5 rounded-lg mb-4 text-xs font-medium
              ${alert.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"}`}>
              <span className="mt-0.5 flex-shrink-0">
                {alert.type === "success" ? <CheckCircle size={15}/> : <AlertCircle size={15}/>}
              </span>
              <span>{alert.msg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Personal Details */}
            <Section title="Personal Details">
              <Field label="Full Name (Bank Holder)">
                <IconInput icon={<User size={14}/>}>
                  <input type="text" name="bank_holder_name" value={formData.bank_holder_name}
                    onChange={handleChange} required placeholder="Enter full name"/>
                </IconInput>
              </Field>
              <Field label="Father Name">
                <IconInput icon={<Users size={14}/>}>
                  <input type="text" name="father_name" value={formData.father_name}
                    onChange={handleChange} required placeholder="Enter father's name"/>
                </IconInput>
              </Field>
              <Field label="Date of Birth">
                <IconInput icon={<Calendar size={14}/>}>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} required/>
                </IconInput>
              </Field>
              <Field label="Gender">
                <IconInput icon={<UserCheck size={14}/>}>
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
                <IconInput icon={<Phone size={14}/>}>
                  <input type="tel" name="mobile" value={formData.mobile}
                    onChange={handleChange} required placeholder="10-digit mobile number" maxLength={10}/>
                </IconInput>
              </Field>
              <Field label="Email Address">
                <IconInput icon={<Mail size={14}/>}>
                  <input type="email" name="email" value={formData.email}
                    onChange={handleChange} required placeholder="your@email.com"/>
                </IconInput>
              </Field>
              <div className="col-span-1 sm:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-700">Residential Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <MapPin size={13} className="absolute left-2.5 top-2 text-gray-400"/>
                  <textarea name="address" value={formData.address} onChange={handleChange} required
                    placeholder="Enter your full address"
                    className="rounded-lg pl-7 pr-3 py-2 bg-white border h-16 w-full focus:ring-2 focus:ring-blue-500 outline-none resize-none text-xs"
                    style={{ boxSizing: "border-box" }}/>
                </div>
              </div>
            </Section>

            {/* KYC Verification */}
            <Section title="KYC Verification">
              <Field label="Aadhaar Number">
                <IconInput icon={<ShieldCheck size={14}/>}>
                  <input type="text" name="aadhaar" value={formData.aadhaar}
                    onChange={handleAadhaar} required placeholder="123456789012" maxLength={12}
                    className="tracking-widest"/>
                </IconInput>
              </Field>
              <Field label="PAN Number">
                <IconInput icon={<CreditCard size={14}/>}>
                  <input type="text" name="pan" value={formData.pan}
                    onChange={handlePan} required placeholder="ABCDE1234F" maxLength={10}
                    className="tracking-widest uppercase"/>
                </IconInput>
              </Field>
            </Section>

            {/* Account Details */}
            <Section title="Account Details">
              <Field label="Account Type">
                <IconInput icon={<Landmark size={14}/>}>
                  <select name="account_type" value={formData.account_type} onChange={handleChange} required>
                    <option value="">Select Account Type</option>
                    <option>Saving Account</option>
                    <option>Current Account</option>
                  </select>
                </IconInput>
              </Field>
              <Field label="Preferred Branch">
                <IconInput icon={<GitBranch size={14}/>}>
                  <input type="text" name="branch" value={formData.branch}
                    onChange={handleChange} required placeholder="e.g. Nashik Main Branch"/>
                </IconInput>
              </Field>
              <div className="col-span-1 sm:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-700">Purpose of Opening Account <span className="text-red-500">*</span></label>
                <IconInput icon={<HelpCircle size={14}/>}>
                  <input type="text" name="reason" value={formData.reason}
                    onChange={handleChange} required placeholder="e.g. Salary, Savings, Business transitions"/>
                </IconInput>
              </div>
            </Section>

            {/* Nominee Details */}
            <Section title="Nominee Details">
              <Field label="Nominee Name">
                <IconInput icon={<UserPlus size={14}/>}>
                  <input type="text" name="nominee_name" value={formData.nominee_name}
                    onChange={handleChange} required placeholder="Enter nominee full name"/>
                </IconInput>
              </Field>
              <Field label="Relation with Nominee">
                <IconInput icon={<Heart size={14}/>}>
                  <input type="text" name="nominee_relation" value={formData.nominee_relation}
                    onChange={handleChange} required placeholder="e.g. Father, Mother, Spouse"/>
                </IconInput>
              </Field>
            </Section>

            {/* Document Upload */}
            <div className="rounded-lg p-3 bg-gray-50">
              <h3 className="text-xs font-semibold text-blue-900 mb-2.5 flex items-center gap-2">
                <FileText size={13} className="text-blue-700"/>
                Document Upload
                <span className="text-red-500 font-normal ml-0.5">*</span>
              </h3>

              {/* Progress indicator */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap: 6 }}
                className="bg-white rounded-lg px-3 py-2 border border-gray-100 mb-3">
                <div style={{ display:"flex", alignItems:"center", gap: 10, flexWrap:"wrap" }}>
                  {[
                    { label: "Photo",   done: !!photo },
                    { label: "Aadhaar", done: !!aadhaarDoc },
                    { label: "PAN",     done: !!panDoc },
                  ].map((item, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap: 5 }}>
                      <div style={{
                        width: 17, height: 17, borderRadius: "50%",
                        background: item.done ? "#22c55e" : "#e2e8f0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.3s", flexShrink: 0,
                      }}>
                        {item.done
                          ? <CheckCircle size={10} color="#fff" strokeWidth={2.5}/>
                          : <span style={{ width:5, height:5, borderRadius:"50%", background:"#94a3b8", display:"block" }}/>
                        }
                      </div>
                      <span style={{ fontSize:10, fontWeight: item.done ? 600 : 400, color: item.done ? "#15803d" : "#94a3b8" }}>
                        {item.label}
                      </span>
                      {i < 2 && <span style={{ color:"#e2e8f0", fontSize:10 }}>—</span>}
                    </div>
                  ))}
                </div>
                <span style={{ fontSize:10, fontWeight:600, color:"#64748b" }}>
                  {[photo, aadhaarDoc, panDoc].filter(Boolean).length}/3
                </span>
              </div>

              {/* On mobile: 1 col, on sm+: 3 col */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <DocumentUploadCard label="Passport Photo"  sublabel="Clear face photo"      icon={ImagePlus}   accentColor="#6366f1" file={photo}      preview={photoPreview}   onUpload={makeFileHandler(setPhoto, setPhotoPreview)}         onRemove={makeRemover(setPhoto, setPhotoPreview)}       inputId="upload-photo"/>
                <DocumentUploadCard label="Aadhaar Card"    sublabel="Front side of Aadhaar" icon={ShieldCheck} accentColor="#0ea5e9" file={aadhaarDoc} preview={aadhaarPreview} onUpload={makeFileHandler(setAadhaarDoc, setAadhaarPreview)} onRemove={makeRemover(setAadhaarDoc, setAadhaarPreview)} inputId="upload-aadhaar"/>
                <DocumentUploadCard label="PAN Card"        sublabel="Clear PAN card image"  icon={CreditCard}  accentColor="#f59e0b" file={panDoc}     preview={panPreview}     onUpload={makeFileHandler(setPanDoc, setPanPreview)}         onRemove={makeRemover(setPanDoc, setPanPreview)}         inputId="upload-pan"/>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex gap-2 items-start">
              <input type="checkbox" name="agree" onChange={handleChange} className="mt-0.5 flex-shrink-0" required/>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                I confirm that all the information provided is accurate and correct.{" "}
                <span className="text-red-500">*</span>
              </p>
            </div>

            {/* ── Submit row: always stacked on mobile, side-by-side on sm+ ── */}
            <div style={{ display:"flex", flexDirection:"column", gap: 10 }} className="sm:flex-row sm:items-center">

              {/* Signature field */}
              <div
                onClick={() => setShowSignatureModal(true)}
                style={{
                  height: 48,
                  borderRadius: 12,
                  border: `2px solid ${signature ? "#4ade80" : "#93c5fd"}`,
                  background: signature
                    ? "linear-gradient(135deg, #f0fdf4, #dcfce7)"
                    : "linear-gradient(135deg, #eff6ff, #dbeafe)",
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "0 16px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: signature ? "0 2px 8px rgba(74,222,128,0.2)" : "0 2px 8px rgba(147,197,253,0.2)",
                  width: "100%",
                  boxSizing: "border-box",
                  minWidth: 0,
                  flex: 1,
                }}
              >
                {signature ? (
                  <>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: "#bbf7d0",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <CheckCircle size={16} color="#15803d"/>
                    </div>
                    <span style={{
                      fontSize: 14, fontWeight: 700, color: "#15803d",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      fontFamily: "Georgia, serif", fontStyle: "italic",
                    }}>
                      {signature.name}
                    </span>
                  </>
                ) : (
                  <>
                    <PenLine size={17} color="#2563eb"/>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#2563eb" }}>
                      Add Signature
                    </span>
                  </>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  height: 48,
                  borderRadius: 12,
                  border: "none",
                  background: loading
                    ? "#94a3b8"
                    : "linear-gradient(180deg, #1e3a7b 0%, #152d68 60%, #0f1f4d 100%)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: loading ? "none" : "0 4px 16px rgba(15,31,75,0.35)",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                  padding: "0 28px",
                  width: "100%",
                  boxSizing: "border-box",
                  flexShrink: 0,
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.9"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                {loading
                  ? <><Loader size={15} style={{ animation: "spin 1s linear infinite" }}/> Opening...</>
                  : "Open Account"
                }
              </button>

            </div>

          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        /* Ensure submit row goes side-by-side on sm+ screens */
        @media (min-width: 640px) {
          .open-account-submit-row {
            flex-direction: row !important;
          }
          .open-account-submit-row > button {
            width: auto !important;
          }
        }
      `}</style>
    </>
  );
}

/* ── Reusable layout components ── */

function Section({ title, children }) {
  return (
    <div className="rounded-lg p-3 bg-gray-50">
      <h3 className="text-xs sm:text-sm font-semibold text-blue-900 mb-2.5">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">{children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
    </div>
  );
}

function IconInput({ icon, children }) {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-2.5 text-gray-400 pointer-events-none text-sm z-10">{icon}</span>
      <div className="w-full
        [&>input]:rounded-lg [&>input]:pl-7 [&>input]:pr-2.5 [&>input]:py-2
        [&>input]:bg-white [&>input]:border [&>input]:w-full
        [&>input]:focus:ring-2 [&>input]:focus:ring-blue-500
        [&>input]:outline-none [&>input]:text-xs
        [&>select]:rounded-lg [&>select]:pl-7 [&>select]:pr-2.5 [&>select]:py-2
        [&>select]:bg-white [&>select]:border [&>select]:w-full
        [&>select]:focus:ring-2 [&>select]:focus:ring-blue-500
        [&>select]:outline-none [&>select]:text-xs [&>select]:appearance-none">
        {children}
      </div>
    </div>
  );
}