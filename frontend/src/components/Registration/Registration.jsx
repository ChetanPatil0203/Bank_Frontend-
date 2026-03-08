import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, CheckCircle, XCircle, X, User, Mail, Phone, Users, Lock, UserPlus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ═══════════════════════════════════════
   TOAST
═══════════════════════════════════════ */
function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl min-w-72 max-w-sm
      ${type === "success"
        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
        : "bg-rose-500/10 border-rose-500/30 text-rose-400"}`}>
      {type === "success"
        ? <CheckCircle size={20} className="shrink-0" />
        : <XCircle size={20} className="shrink-0" />}
      <p className="text-sm font-medium flex-1">{message}</p>
      <button onClick={onClose} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
        <X size={16} />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════
   ANIMATED GRID BG
═══════════════════════════════════════ */
function GridBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #03071e 0%, #05103a 40%, #0a0a2e 70%, #03071e 100%)"
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 70% 50% at 20% 50%, rgba(29,78,216,0.22) 0%, transparent 60%),
          radial-gradient(ellipse 50% 70% at 80% 20%, rgba(109,40,217,0.18) 0%, transparent 55%),
          radial-gradient(ellipse 40% 40% at 60% 85%, rgba(6,182,212,0.1) 0%, transparent 50%)`
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,50,255,0.015) 2px, rgba(0,50,255,0.015) 4px)",
        mixBlendMode: "screen"
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════
   FLOATING PARTICLES
═══════════════════════════════════════ */
function Particles() {
  const pts = [
    { s:3, t:"8%",  l:"5%",  c:"#60a5fa", d:"3.2s", dl:"0s" },
    { s:2, t:"20%", l:"88%", c:"#a78bfa", d:"2.8s", dl:"0.7s" },
    { s:4, t:"65%", l:"8%",  c:"#38bdf8", d:"3.5s", dl:"1.2s" },
    { s:2, t:"82%", l:"80%", c:"#818cf8", d:"2.3s", dl:"0.4s" },
    { s:3, t:"42%", l:"2%",  c:"#22d3ee", d:"3.8s", dl:"1.8s" },
    { s:2, t:"10%", l:"50%", c:"#a78bfa", d:"2.6s", dl:"0.9s" },
    { s:3, t:"92%", l:"35%", c:"#60a5fa", d:"3.1s", dl:"1.5s" },
    { s:2, t:"30%", l:"92%", c:"#22d3ee", d:"2.9s", dl:"0.2s" },
    { s:4, t:"55%", l:"96%", c:"#38bdf8", d:"3.3s", dl:"2.1s" },
    { s:2, t:"75%", l:"52%", c:"#c084fc", d:"2.7s", dl:"0.6s" },
  ];
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {pts.map((p, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%",
          width: p.s, height: p.s, top: p.t, left: p.l,
          background: p.c, boxShadow: `0 0 ${p.s * 3}px ${p.c}`,
          animation: `ptFloat ${p.d} ease-in-out infinite ${p.dl}`,
        }} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════
   BRAND PANEL (LEFT)
═══════════════════════════════════════ */
function BrandPanel() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center flex-1 relative px-12 py-16 overflow-hidden">
      <div style={{
        position: "absolute", width: 480, height: 480,
        borderRadius: "50%", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(109,40,217,0.12) 40%, transparent 70%)",
        filter: "blur(40px)",
        animation: "ambPulse 6s ease-in-out infinite",
      }} />
      {[
        { sz: 360, spd: 24, rev: false, dot: 9, dc: "#38bdf8", bc: "rgba(56,189,248,0.12)" },
        { sz: 270, spd: 17, rev: true,  dot: 7, dc: "#a78bfa", bc: "rgba(167,139,250,0.12)" },
        { sz: 185, spd: 11, rev: false, dot: 5, dc: "#22d3ee", bc: "rgba(34,211,238,0.15)" },
      ].map((r, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%",
          width: r.sz, height: r.sz, top: "50%", left: "50%",
          border: `1px solid ${r.bc}`,
          animation: `orbitSpin ${r.spd}s linear infinite ${r.rev ? "reverse" : "normal"}`,
          pointerEvents: "none",
        }}>
          <div style={{
            position: "absolute", borderRadius: "50%",
            width: r.dot, height: r.dot,
            background: r.dc, boxShadow: `0 0 14px ${r.dc}`,
            top: `calc(-${r.dot / 2}px)`, left: "50%", transform: "translateX(-50%)",
          }} />
        </div>
      ))}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", animation: "logoIn 1s cubic-bezier(.16,1,.3,1) both .3s" }}>
        <div style={{ position: "relative", marginBottom: 28, animation: "hexFloat 5s ease-in-out infinite" }}>
          <div style={{
            position: "absolute", inset: -18, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.6) 0%, transparent 65%)",
            filter: "blur(18px)", animation: "ambPulse 3s ease-in-out infinite",
          }} />
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path d="M50 4 L90 26 L90 74 L50 96 L10 74 L10 26 Z"
              fill="rgba(29,78,216,0.2)" stroke="url(#hs2)" strokeWidth="1.5" />
            <path d="M50 16 L80 32 L80 68 L50 84 L20 68 L20 32 Z"
              fill="rgba(37,99,235,0.1)" stroke="rgba(56,189,248,0.35)" strokeWidth="1" />
            <text x="50" y="63" fontFamily="Georgia,serif" fontSize="34" fontWeight="900"
              fill="url(#tg2)" textAnchor="middle">P</text>
            {[[50,4],[90,26],[90,74],[50,96],[10,74],[10,26]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(56,189,248,0.9)" />
            ))}
            <defs>
              <linearGradient id="hs2" x1="10" y1="4" x2="90" y2="96" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(56,189,248,0.9)" />
                <stop offset="50%" stopColor="rgba(129,140,248,0.6)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0.9)" />
              </linearGradient>
              <linearGradient id="tg2" x1="0" y1="0" x2="0" y2="70" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="100%" stopColor="rgba(56,189,248,0.85)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontFamily: "'Georgia', serif", fontSize: 62, fontWeight: 900, color: "#fff", letterSpacing: -3, lineHeight: 1, textShadow: "0 0 40px rgba(255,255,255,0.15)" }}>Pay</span>
          <span style={{ fontFamily: "'Georgia', serif", fontSize: 62, fontWeight: 900, letterSpacing: -3, lineHeight: 1, background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 45%, #38bdf8 90%)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 3s linear infinite" }}>Zen</span>
        </div>
        <div style={{ height: 3, borderRadius: 99, margin: "10px auto 20px", background: "linear-gradient(90deg, #2563eb, #38bdf8, #818cf8, #38bdf8, #2563eb)", backgroundSize: "200%", animation: "ulGrow .9s cubic-bezier(.22,1,.36,1) forwards 1s, shimmer 3s linear infinite 1.5s", width: 0 }} />
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(180,210,255,0.35)", marginBottom: 28, opacity: 0, animation: "fadeUp .7s ease both 1.2s" }}>Private Banking</p>
        <p style={{ fontSize: 14, fontWeight: 300, textAlign: "center", lineHeight: 1.8, maxWidth: 240, color: "rgba(180,210,255,0.5)", opacity: 0, animation: "fadeUp .7s ease both 1.4s" }}>
          Secure, intelligent banking <br />always at your fingertips.
        </p>
        <p style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(100,160,255,0.35)", whiteSpace: "nowrap", marginTop: 14, opacity: 0, animation: "fadeUp .7s ease both 1.5s" }}>Secure · Smart · Banking</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MOBILE LOGO — only shown on small screens
═══════════════════════════════════════ */
function MobileLogo() {
  return (
    <div className="flex lg:hidden" style={{ flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
      <svg width="46" height="46" viewBox="0 0 100 100" fill="none" style={{ marginBottom: 6 }}>
        <path d="M50 4 L90 26 L90 74 L50 96 L10 74 L10 26 Z" fill="rgba(29,78,216,0.25)" stroke="rgba(56,189,248,0.8)" strokeWidth="2" />
        <text x="50" y="63" fontFamily="Georgia,serif" fontSize="34" fontWeight="900" fill="white" textAnchor="middle">P</text>
      </svg>
      <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
        <span style={{ fontFamily: "'Georgia', serif", fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: -1 }}>Pay</span>
        <span style={{ fontFamily: "'Georgia', serif", fontSize: 24, fontWeight: 900, letterSpacing: -1, background: "linear-gradient(135deg,#38bdf8,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Zen</span>
      </div>
      <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(180,210,255,0.35)", marginTop: 3 }}>Private Banking</p>
    </div>
  );
}

/* ═══════════════════════════════════════
   INPUT FIELD
═══════════════════════════════════════ */
function Field({ label, icon: Icon, children, hint }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(148,163,184,0.8)", marginBottom: 7, letterSpacing: "0.05em" }}>
        {label} <span style={{ color: "#f87171" }}>*</span>
      </label>
      <div style={{ position: "relative" }}>
        {Icon && (
          <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(99,102,241,0.6)", pointerEvents: "none", display: "flex" }}>
            <Icon size={14} />
          </span>
        )}
        {children}
      </div>
      {hint && <p style={{ fontSize: 10, color: "rgba(148,163,184,0.4)", marginTop: 5 }}>{hint}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════
   REGISTRATION PAGE
═══════════════════════════════════════ */
export default function RegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", email: "", mobile: "",
    gender: "", password: "", confirmPassword: "",
  });
  const [showPw, setShowPw]   = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState({ show: false, message: "", type: "" });
  const [focusedField, setFocusedField] = useState(null);

  const showToast = (msg, type) => setToast({ show: true, message: msg, type });
  const hideToast = () => setToast({ show: false, message: "", type: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const pwMatch = formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) { showToast("Password कमीत कमी 6 characters असावा ⚠️", "error"); return; }
    if (formData.password !== formData.confirmPassword) { showToast("Passwords match नाही ❌", "error"); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) { showToast(result.message + " ✅", "success"); setTimeout(() => navigate("/login"), 1800); }
      else showToast(result.message || "Something went wrong ❌", "error");
    } catch { showToast("❌ Server connect नाही झाला.", "error"); }
    finally { setLoading(false); }
  };

  const inputStyle = (name) => ({
    width: "100%", boxSizing: "border-box",
    background: focusedField === name ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${focusedField === name ? "rgba(99,102,241,0.6)" : "rgba(99,102,241,0.2)"}`,
    borderRadius: 12,
    paddingLeft: 36, paddingRight: 36, paddingTop: 12, paddingBottom: 12,
    color: "#e2e8f0", fontSize: 13, fontFamily: "inherit",
    outline: "none", transition: "all 0.2s ease",
  });

  const selectStyle = (name) => ({
    ...inputStyle(name), cursor: "pointer", appearance: "none", WebkitAppearance: "none",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        @keyframes ptFloat   { 0%,100%{transform:translateY(0) scale(1);opacity:.2} 50%{transform:translateY(-18px) scale(1.6);opacity:.9} }
        @keyframes hexFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes ambPulse  { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes orbitSpin { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes shimmer   { 0%{background-position:0% center} 100%{background-position:200% center} }
        @keyframes ulGrow    { from{width:0} to{width:200px} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes logoIn    { from{opacity:0;transform:scale(.88) translateY(18px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes cardIn    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        @keyframes scanPulse { 0%,100%{opacity:0} 50%{opacity:1} }
        input::placeholder, select::placeholder { color: rgba(148,163,184,0.3); }
        select option { background: #0a1040; color: #e2e8f0; }
        * { box-sizing: border-box; }

        /* ── MOBILE RESPONSIVE ── */
        .rg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 540px) {
          .rg-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .rg-card  { padding: 24px 18px 20px !important; border-radius: 18px !important; }
          .rg-title { font-size: 22px !important; }
        }
      `}</style>

      {toast.show && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "24px 16px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        <GridBackground />
        <Particles />

        <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", width: "100%", maxWidth: 1300 }}>

          <BrandPanel />

          {/* ════ RIGHT CARD ════ */}
          <div className="rg-card" style={{
            width: "100%", maxWidth: 650, borderRadius: 24,
            background: "rgba(8,16,60,0.7)",
            border: "1px solid rgba(99,102,241,0.2)",
            backdropFilter: "blur(32px)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.03) inset, 0 24px 80px rgba(0,0,0,0.6), 0 0 100px rgba(37,99,235,0.12)",
            padding: "36px 36px 32px",
            animation: "cardIn .8s cubic-bezier(.16,1,.3,1) both .1s",
            margin: "0 auto",
          }}>

            {/* Mobile logo — only on small screens */}
            <MobileLogo />

            {/* Heading */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <h2 className="rg-title" style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.03em", margin: 0, marginBottom: 6 }}>
                Registration
              </h2>
              <p style={{ fontSize: 13, fontWeight: 400, color: "rgba(148,163,184,0.6)", margin: 0 }}>
                Join PayZen - Fill All Details Carefully
              </p>
            </div>

            {/* ── FORM ── */}
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Row 1 — Name & Email */}
                <div className="rg-grid">
                  <Field label="Full Name" icon={User}> 
                    <input type="text" name="name" placeholder="Full Name"
                      value={formData.name} onChange={handleChange} required
                      onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                      style={inputStyle("name")} />
                  </Field>
                  <Field label="Email Address" icon={Mail}>
                    <input type="email" name="email" placeholder="you@email.com"
                      value={formData.email} onChange={handleChange} required
                      onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                      style={inputStyle("email")} />
                  </Field>
                </div>

                {/* Row 2 — Mobile & Gender */}
                <div className="rg-grid">
                  <Field label="Mobile No" icon={Phone}>
                    <input type="tel" name="mobile" placeholder="Mobile No"
                      value={formData.mobile} onChange={handleChange} required
                      onFocus={() => setFocusedField("mobile")} onBlur={() => setFocusedField(null)}
                      style={inputStyle("mobile")} />
                  </Field>
                  <Field label="Select Gender" icon={Users}>
                    <select name="gender" value={formData.gender} onChange={handleChange} required
                      onFocus={() => setFocusedField("gender")} onBlur={() => setFocusedField(null)}
                      style={selectStyle("gender")}>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(99,102,241,0.5)", pointerEvents: "none", display: "flex" }}>
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                    </span>
                  </Field>
                </div>

                {/* Row 3 — Passwords */}
                <div className="rg-grid">
                  <div>
                    <Field label="Password" icon={Lock}>
                      <input type={showPw ? "text" : "password"} name="password" placeholder="Password"
                        value={formData.password} onChange={handleChange} required
                        onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)}
                        style={inputStyle("password")} />
                      <button type="button" onClick={() => setShowPw(!showPw)} style={{
                        position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                        background: "none", border: "none", cursor: "pointer",
                        color: "rgba(99,102,241,0.5)", display: "flex", padding: 0,
                      }}>
                        {showPw ? <EyeOff size={14}/> : <Eye size={14}/>}
                      </button>
                    </Field>
                  </div>

                  <div>
                    <Field label="Confirm Password" icon={Lock}>
                      <input type={showCpw ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password"
                        value={formData.confirmPassword} onChange={handleChange} required
                        onFocus={() => setFocusedField("confirmPassword")} onBlur={() => setFocusedField(null)}
                        style={inputStyle("confirmPassword")} />
                      <button type="button" onClick={() => setShowCpw(!showCpw)} style={{
                        position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                        background: "none", border: "none", cursor: "pointer",
                        color: "rgba(99,102,241,0.5)", display: "flex", padding: 0,
                      }}>
                        {showCpw ? <EyeOff size={14}/> : <Eye size={14}/>}
                      </button>
                    </Field>
                    {formData.confirmPassword.length > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 7 }}>
                        <div style={{
                          width: 7, height: 7, borderRadius: "50%",
                          background: pwMatch ? "#4ade80" : "#f87171",
                          boxShadow: `0 0 6px ${pwMatch ? "#4ade80" : "#f87171"}`,
                          transition: "all 0.3s",
                        }} />
                        <span style={{ fontSize: 10, color: pwMatch ? "#4ade80" : "#f87171" }}>
                          {pwMatch ? "Passwords match ✓" : "Doesn't match"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={loading}
               style={{
  width: "100%", marginTop: 4, padding: "14px 24px",
  borderRadius: 14, border: "none",
  background: loading ? "rgba(79,70,229,0.5)" : "linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#4f46e5 100%)",
  backgroundSize: "200%",
  color: "#fff", fontSize: 14, fontWeight: 700, letterSpacing: "0.02em",
  cursor: loading ? "not-allowed" : "pointer",
  boxShadow: loading ? "none" : "0 4px 28px rgba(79,70,229,0.45), 0 0 50px rgba(124,58,237,0.2)",
  transition: "all 0.3s ease",
  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
  fontFamily: "inherit",
  animation: !loading ? "shimmer 3s linear infinite" : "none",
}}>
                  {loading ? (
                    <>
                      <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                      Registering...
                    </>
                  ) : (
                    <>Registration</>
                  )}
                </button>

              </div>
            </form>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
              <span style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>or</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            </div>

            {/* Login link */}
            <p style={{ textAlign: "center", fontSize: 13, color: "rgba(148,163,184,0.5)", margin: 0 }}>
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} style={{
                background: "none", border: "none", cursor: "pointer",
                fontWeight: 700, color: "#818cf8", fontSize: "inherit",
                fontFamily: "inherit", padding: 0, transition: "color 0.2s",
              }}>
                Login here
              </button>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}