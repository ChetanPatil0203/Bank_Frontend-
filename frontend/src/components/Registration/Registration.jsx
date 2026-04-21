import { useState, useEffect } from "react";
import { Eye, EyeOff, CheckCircle, XCircle, X, User, Mail, Phone, Users, Lock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div style={{
      position: "fixed", top: 24, right: 24, zIndex: 50,
      display: "flex", alignItems: "center", gap: 12,
      padding: "14px 20px", borderRadius: 16,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)", backdropFilter: "blur(20px)",
      minWidth: 280, maxWidth: 360,
      background: type === "success" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
      border: `1px solid ${type === "success" ? "rgba(16,185,129,0.35)" : "rgba(239,68,68,0.35)"}`,
      color: type === "success" ? "#34d399" : "#f87171",
    }}>
      {type === "success" ? <CheckCircle size={18} style={{ flexShrink: 0 }} /> : <XCircle size={18} style={{ flexShrink: 0 }} />}
      <p style={{ fontSize: 13, fontWeight: 500, flex: 1, margin: 0 }}>{message}</p>
      <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", opacity: 0.6, display: "flex", padding: 0 }}>
        <X size={15} />
      </button>
    </div>
  );
}

function Background() {
  const pts = [
    { s: 3, t: "7%", l: "4%", c: "#60a5fa", d: "3.2s", dl: "0s" },
    { s: 2, t: "19%", l: "87%", c: "#a78bfa", d: "2.8s", dl: "0.7s" },
    { s: 4, t: "64%", l: "7%", c: "#38bdf8", d: "3.5s", dl: "1.2s" },
    { s: 2, t: "81%", l: "79%", c: "#818cf8", d: "2.3s", dl: "0.4s" },
    { s: 3, t: "41%", l: "1%", c: "#22d3ee", d: "3.8s", dl: "1.8s" },
    { s: 2, t: "9%", l: "49%", c: "#a78bfa", d: "2.6s", dl: "0.9s" },
    { s: 3, t: "91%", l: "34%", c: "#60a5fa", d: "3.1s", dl: "1.5s" },
    { s: 2, t: "29%", l: "91%", c: "#22d3ee", d: "2.9s", dl: "0.2s" },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#020818 0%,#040d2e 45%,#080820 100%)" }} />
      <div style={{
        position: "absolute", inset: 0, background: `
        radial-gradient(ellipse 65% 55% at 15% 55%, rgba(29,78,216,0.2) 0%, transparent 60%),
        radial-gradient(ellipse 45% 60% at 82% 18%, rgba(109,40,217,0.15) 0%, transparent 55%),
        radial-gradient(ellipse 35% 35% at 55% 88%, rgba(6,182,212,0.08) 0%, transparent 50%)
      `}} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.14) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
      {pts.map((p, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%",
          width: p.s, height: p.s, top: p.t, left: p.l,
          background: p.c, boxShadow: `0 0 ${p.s * 4}px ${p.c}`,
          animation: `ptFloat ${p.d} ease-in-out infinite ${p.dl}`,
        }} />
      ))}
    </div>
  );
}

function BrandPanel() {
  return (
    <div style={{
      display: "none", flexDirection: "column", alignItems: "center", justifyContent: "center",
      flex: 1, position: "relative", padding: "64px 48px", overflow: "hidden",
    }} className="brand-panel">
      <div style={{
        position: "absolute", width: 440, height: 440, borderRadius: "50%",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        background: "radial-gradient(circle,rgba(37,99,235,0.17) 0%,rgba(109,40,217,0.09) 40%,transparent 70%)",
        filter: "blur(38px)", animation: "ambPulse 6s ease-in-out infinite",
      }} />
      {[
        { sz: 330, spd: 24, rev: false, dot: 8, dc: "#38bdf8", bc: "rgba(56,189,248,0.1)" },
        { sz: 245, spd: 17, rev: true, dot: 6, dc: "#a78bfa", bc: "rgba(167,139,250,0.1)" },
        { sz: 165, spd: 11, rev: false, dot: 5, dc: "#22d3ee", bc: "rgba(34,211,238,0.13)" },
      ].map((r, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%",
          width: r.sz, height: r.sz, top: "50%", left: "50%",
          border: `1px solid ${r.bc}`,
          animation: `orbitSpin ${r.spd}s linear infinite ${r.rev ? "reverse" : ""}`,
          pointerEvents: "none",
        }}>
          <div style={{
            position: "absolute", borderRadius: "50%", width: r.dot, height: r.dot,
            background: r.dc, boxShadow: `0 0 12px ${r.dc}`,
            top: `calc(-${r.dot / 2}px)`, left: "50%", transform: "translateX(-50%)",
          }} />
        </div>
      ))}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", animation: "fadeUp 1s cubic-bezier(.16,1,.3,1) both .3s" }}>
        <div style={{ position: "relative", marginBottom: 24, animation: "hexFloat 5s ease-in-out infinite" }}>
          <div style={{ position: "absolute", inset: -16, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.5) 0%,transparent 65%)", filter: "blur(16px)", animation: "ambPulse 3s ease-in-out infinite" }} />
          <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
            <path d="M50 4 L90 26 L90 74 L50 96 L10 74 L10 26 Z" fill="rgba(29,78,216,0.2)" stroke="url(#hg)" strokeWidth="1.5" />
            <path d="M50 16 L80 32 L80 68 L50 84 L20 68 L20 32 Z" fill="rgba(37,99,235,0.08)" stroke="rgba(56,189,248,0.28)" strokeWidth="1" />
            <text x="50" y="63" fontFamily="Georgia,serif" fontSize="34" fontWeight="900" fill="url(#tg)" textAnchor="middle">P</text>
            {[[50, 4], [90, 26], [90, 74], [50, 96], [10, 74], [10, 26]].map(([x, y], i2) => <circle key={i2} cx={x} cy={y} r="2.5" fill="rgba(56,189,248,0.85)" />)}
            <defs>
              <linearGradient id="hg" x1="10" y1="4" x2="90" y2="96" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(56,189,248,0.9)" /><stop offset="50%" stopColor="rgba(129,140,248,0.6)" /><stop offset="100%" stopColor="rgba(56,189,248,0.9)" />
              </linearGradient>
              <linearGradient id="tg" x1="0" y1="0" x2="0" y2="70" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor="rgba(56,189,248,0.85)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
          <span style={{ fontFamily: "'Georgia',serif", fontSize: 56, fontWeight: 900, color: "#fff", letterSpacing: -3, lineHeight: 1 }}>Pay</span>
          <span style={{ fontFamily: "'Georgia',serif", fontSize: 56, fontWeight: 900, letterSpacing: -3, lineHeight: 1, background: "linear-gradient(135deg,#38bdf8 0%,#818cf8 50%,#38bdf8 100%)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 3s linear infinite" }}>Zen</span>
        </div>
        <div style={{ height: 2, borderRadius: 99, margin: "10px auto 18px", background: "linear-gradient(90deg,#2563eb,#38bdf8,#818cf8,#38bdf8,#2563eb)", backgroundSize: "200%", animation: "ulGrow .9s cubic-bezier(.22,1,.36,1) forwards 1s, shimmer 3s linear infinite 1.5s", width: 0 }} />
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(180,210,255,0.28)", marginBottom: 22 }}>Private Banking</p>
        <p style={{ fontSize: 13, fontWeight: 300, textAlign: "center", lineHeight: 1.85, maxWidth: 210, color: "rgba(180,210,255,0.42)" }}>Secure, intelligent banking<br />always at your fingertips.</p>
        <p style={{ fontSize: 9.5, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(100,160,255,0.28)", marginTop: 12 }}>Secure · Smart · Banking</p>
      </div>
    </div>
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={{ fontSize: 10.5, fontWeight: 600, color: "rgba(148,163,184,0.7)", letterSpacing: "0.07em", textTransform: "uppercase" }}>
        {label} <span style={{ color: "#f87171" }}>*</span>
      </label>
      <div style={{ position: "relative" }}>
        {Icon && (
          <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(99,102,241,0.5)", pointerEvents: "none", display: "flex", zIndex: 1 }}>
            <Icon size={14} />
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", date_of_birth: "", gender: "", password: "", confirmPassword: "" });
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [focused, setFocused] = useState(null);

  const showToast = (msg, type) => setToast({ show: true, message: msg, type });
  const hideToast = () => setToast({ show: false, message: "", type: "" });
  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const pwMatch = formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword;
  const maxDate = new Date().toISOString().split("T")[0];

  const getAge = (dob) => {
    if (!dob) return null;
    const today = new Date(), birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };
  const age = getAge(formData.date_of_birth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (age !== null && age < 18) { showToast("वय किमान 18 वर्षे असणे आवश्यक आहे ⚠️", "error"); return; }
    if (formData.password.length < 6) { showToast("Password कमीत कमी 6 characters असावा ⚠️", "error"); return; }
    if (formData.password !== formData.confirmPassword) { showToast("Passwords match नाही ❌", "error"); return; }
    setLoading(true);
    try {
      const res = await fetch("https://bank-backend-3-6b2x.onrender.com/api/v1/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const result = await res.json();
      if (result.success) { showToast(result.message + " ✅", "success"); setTimeout(() => navigate("/login"), 1800); }
      else showToast(result.message || "Something went wrong ❌", "error");
    } catch { showToast("❌ Server connect नाही झाला.", "error"); }
    finally { setLoading(false); }
  };

  const base = (name, pr = 14) => ({
    width: "100%", boxSizing: "border-box",
    background: focused === name ? "rgba(99,102,241,0.07)" : "rgba(255,255,255,0.03)",
    border: `1.5px solid ${focused === name ? "rgba(99,102,241,0.55)" : "rgba(99,102,241,0.17)"}`,
    borderRadius: 10, paddingLeft: 40, paddingRight: pr,
    paddingTop: 11, paddingBottom: 11,
    color: "#e2e8f0", fontSize: 13, fontFamily: "inherit",
    outline: "none", transition: "border-color .2s, background .2s",
  });
  const inp = (n) => base(n, 14);
  const inpR = (n) => base(n, 40);
  const sel = (n) => ({ ...base(n, 34), cursor: "pointer", appearance: "none", WebkitAppearance: "none" });
  const dat = (n) => ({ ...base(n, age !== null ? 50 : 14), colorScheme: "dark" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes ptFloat  { 0%,100%{transform:translateY(0) scale(1);opacity:.22} 50%{transform:translateY(-16px) scale(1.5);opacity:.8} }
        @keyframes hexFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes ambPulse { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes orbitSpin{ from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes shimmer  { 0%{background-position:0% center} 100%{background-position:200% center} }
        @keyframes ulGrow   { from{width:0} to{width:175px} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn   { from{opacity:0;transform:translateY(20px) scale(.985)} to{opacity:1;transform:none} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        * { box-sizing:border-box; }
        input::placeholder { color: rgba(148,163,184,0.28); }
        select option { background:#0a1040; color:#e2e8f0; }
        input[type="date"] { cursor:pointer; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter:invert(.55) sepia(1) saturate(3) hue-rotate(200deg); cursor:pointer; opacity:.65; }
        input[type="date"]::-webkit-calendar-picker-indicator:hover { opacity:1; }
        input[type="date"]::-webkit-datetime-edit { color:#e2e8f0; }
        input[type="date"]::-webkit-datetime-edit-text { color:rgba(148,163,184,0.4); }
        input[type="date"]::-webkit-datetime-edit-month-field,
        input[type="date"]::-webkit-datetime-edit-day-field,
        input[type="date"]::-webkit-datetime-edit-year-field { color:#e2e8f0; }
        input[type="date"]::-webkit-datetime-edit-month-field:focus,
        input[type="date"]::-webkit-datetime-edit-day-field:focus,
        input[type="date"]::-webkit-datetime-edit-year-field:focus { background:rgba(99,102,241,0.22); border-radius:3px; }
        @media (min-width:1024px) { .brand-panel { display:flex !important; } }
        .f2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        @media (max-width: 1023px) {
          .rg-card      { padding: 32px 24px !important; border-radius: 22px !important; width: 100% !important; margin: 0 auto !important; }
          .rg-title     { font-size: 24px !important; }
        }
        @media (max-width: 520px) {
          .f2 { grid-template-columns: 1fr !important; gap: 12px; }
          .rg-card { padding: 24px 18px !important; border-radius: 18px !important; }
          .rg-title { font-size: 22px !important; }
        }
      `}</style>

      {toast.show && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "28px 16px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
        <Background />

        <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", width: "100%", maxWidth: 1240 }}>
          <BrandPanel />

          {/* ══ CARD ══ */}
          <div className="rg-card" style={{
            width: "100%", maxWidth: 580, margin: "0 auto",
            borderRadius: 22,
            background: "rgba(7,13,52,0.72)",
            border: "1px solid rgba(99,102,241,0.17)",
            backdropFilter: "blur(36px)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.025), 0 24px 80px rgba(0,0,0,0.55), 0 0 80px rgba(37,99,235,0.09)",
            padding: "38px 38px 34px",
            animation: "cardIn .75s cubic-bezier(.16,1,.3,1) both .05s",
          }}>

            {/* Mobile logo — only shown on small/med screens */}
            <div className="lg:hidden flex flex-col items-center mb-6">
              <div className="relative mb-3">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                <svg width="48" height="48" viewBox="0 0 100 100" fill="none" className="relative">
                  <path d="M50 4 L90 26 L90 74 L50 96 L10 74 L10 26 Z" fill="rgba(29,78,216,0.25)" stroke="rgba(56,189,248,0.8)" strokeWidth="2.5" />
                  <text x="50" y="63" fontFamily="Georgia,serif" fontSize="36" fontWeight="900" fill="white" textAnchor="middle">P</text>
                </svg>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-['Georgia',serif] text-2xl font-black text-white tracking-tight">Pay</span>
                <span className="font-['Georgia',serif] text-2xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Zen</span>
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400/40 mt-1">Private Banking</p>
            </div>

            {/* Heading */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <h2 className="rg-title" style={{ fontSize: 24, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.03em", margin: "0 0 6px" }}>
                Registration
              </h2>
              <p style={{ fontSize: 12.5, color: "rgba(148,163,184,0.48)", margin: 0 }}>
                Join PayZen — Fill all details carefully
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Row 1 — Name + Email */}
                <div className="f2">
                  <Field label="Full Name" icon={User}>
                    <input type="text" name="name" placeholder="Full Name"
                      value={formData.name} onChange={handleChange} required
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      style={inp("name")} />
                  </Field>
                  <Field label="Email Address" icon={Mail}>
                    <input type="email" name="email" placeholder="you@email.com"
                      value={formData.email} onChange={handleChange} required
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      style={inp("email")} />
                  </Field>
                </div>

                {/* Row 2 — Mobile + DOB */}
                <div className="f2">
                  <Field label="Mobile No" icon={Phone}>
                    <input type="tel" name="mobile" placeholder="Mobile No"
                      value={formData.mobile} onChange={handleChange} required
                      onFocus={() => setFocused("mobile")} onBlur={() => setFocused(null)}
                      style={inp("mobile")} />
                  </Field>
                  <Field label="Date of Birth" icon={Calendar}>
                    <input type="date" name="date_of_birth"
                      value={formData.date_of_birth} onChange={handleChange} required
                      max={maxDate}
                      onFocus={() => setFocused("date_of_birth")} onBlur={() => setFocused(null)}
                      style={dat("date_of_birth")} />
                    {age !== null && (
                      <span style={{
                        position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                        fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6,
                        background: age >= 18 ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.12)",
                        border: `1px solid ${age >= 18 ? "rgba(52,211,153,0.32)" : "rgba(248,113,113,0.32)"}`,
                        color: age >= 18 ? "#34d399" : "#f87171",
                        pointerEvents: "none", whiteSpace: "nowrap",
                      }}>
                        {age}y
                      </span>
                    )}
                  </Field>
                </div>

                {/* Row 3 — Gender (full width) */}
                <Field label="Select Gender" icon={Users}>
                  <select name="gender" value={formData.gender} onChange={handleChange} required
                    onFocus={() => setFocused("gender")} onBlur={() => setFocused(null)}
                    style={sel("gender")}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <span style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(99,102,241,0.45)", pointerEvents: "none", display: "flex" }}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
                  </span>
                </Field>

                {/* Row 4 — Passwords */}
                <div className="f2">
                  <Field label="Password" icon={Lock}>
                    <input type={showPw ? "text" : "password"} name="password" placeholder="Min 6 characters"
                      value={formData.password} onChange={handleChange} required
                      onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                      style={inpR("password")} />
                    <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(99,102,241,0.5)", display: "flex", padding: 0 }}>
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </Field>

                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <Field label="Confirm Password" icon={Lock}>
                      <input type={showCpw ? "text" : "password"} name="confirmPassword" placeholder="Re-enter password"
                        value={formData.confirmPassword} onChange={handleChange} required
                        onFocus={() => setFocused("confirmPassword")} onBlur={() => setFocused(null)}
                        style={inpR("confirmPassword")} />
                      <button type="button" onClick={() => setShowCpw(v => !v)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(99,102,241,0.5)", display: "flex", padding: 0 }}>
                        {showCpw ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </Field>
                    {formData.confirmPassword.length > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: pwMatch ? "#4ade80" : "#f87171", boxShadow: `0 0 5px ${pwMatch ? "#4ade80" : "#f87171"}`, transition: "all .25s" }} />
                        <span style={{ fontSize: 10, color: pwMatch ? "#4ade80" : "#f87171", fontWeight: 500 }}>
                          {pwMatch ? "Passwords match ✓" : "Doesn't match"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading} style={{
                  marginTop: 4, width: "100%", padding: "13px",
                  borderRadius: 11, border: "none",
                  background: loading ? "rgba(79,70,229,0.38)" : "linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#4f46e5 100%)",
                  backgroundSize: "200%",
                  color: "#fff", fontSize: 14, fontWeight: 700, letterSpacing: "0.03em",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading ? "none" : "0 4px 22px rgba(79,70,229,0.38)",
                  transition: "all .25s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  fontFamily: "inherit",
                  animation: !loading ? "shimmer 3s linear infinite" : "none",
                }}>
                  {loading ? (
                    <><span style={{ width: 15, height: 15, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.25)", borderTopColor: "#fff", animation: "spin .7s linear infinite", display: "inline-block" }} />Registering...</>
                  ) : "Register Now"}
                </button>
              </div>
            </form>

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0 0" }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
              <span style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.16)", textTransform: "uppercase" }}>or</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
            </div>
            <p style={{ textAlign: "center", fontSize: 12.5, color: "rgba(148,163,184,0.42)", margin: "14px 0 0" }}>
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 700, color: "#818cf8", fontSize: "inherit", fontFamily: "inherit", padding: 0 }}>
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}