import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, KeyRound, ShieldCheck, ArrowRight } from "lucide-react";

/* ═══════════════════════════════════════
   GRID BACKGROUND
═══════════════════════════════════════ */
function GridBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #03071e 0%, #05103a 40%, #0a0a2e 70%, #03071e 100%)" }} />
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
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
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
   BRAND PANEL — LEFT
═══════════════════════════════════════ */
function BrandPanel() {
  return (
    <div style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center",
      position: "relative", padding: "64px 48px", overflow: "hidden" }}
      className="lg-brand-panel">

      {/* Central glow */}
      <div style={{
        position: "absolute", width: 480, height: 480,
        borderRadius: "50%", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(109,40,217,0.12) 40%, transparent 70%)",
        filter: "blur(40px)", animation: "ambPulse 6s ease-in-out infinite",
      }} />

      {/* Orbit rings */}
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

      {/* Logo block */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", animation: "logoIn 1s cubic-bezier(.16,1,.3,1) both .3s" }}>

        <div style={{ position: "relative", marginBottom: 28, animation: "hexFloat 5s ease-in-out infinite" }}>
          <div style={{
            position: "absolute", inset: -18, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.6) 0%, transparent 65%)",
            filter: "blur(18px)", animation: "ambPulse 3s ease-in-out infinite",
          }} />
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path d="M50 4 L90 26 L90 74 L50 96 L10 74 L10 26 Z" fill="rgba(29,78,216,0.2)" stroke="url(#hsFP)" strokeWidth="1.5" />
            <path d="M50 16 L80 32 L80 68 L50 84 L20 68 L20 32 Z" fill="rgba(37,99,235,0.1)" stroke="rgba(56,189,248,0.35)" strokeWidth="1" />
            <text x="50" y="63" fontFamily="Georgia,serif" fontSize="34" fontWeight="900" fill="url(#tgFP)" textAnchor="middle">P</text>
            {[[50,4],[90,26],[90,74],[50,96],[10,74],[10,26]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(56,189,248,0.9)" />
            ))}
            <defs>
              <linearGradient id="hsFP" x1="10" y1="4" x2="90" y2="96" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(56,189,248,0.9)" />
                <stop offset="50%" stopColor="rgba(129,140,248,0.6)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0.9)" />
              </linearGradient>
              <linearGradient id="tgFP" x1="0" y1="0" x2="0" y2="70" gradientUnits="userSpaceOnUse">
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

        <p style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(100,160,255,0.35)", whiteSpace: "nowrap", marginTop: 14, opacity: 0, animation: "fadeUp .7s ease both 1.5s" }}>
          Secure · Smart · Banking
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   STEP INDICATOR
═══════════════════════════════════════ */
function StepIndicator({ step }) {
  const steps = ["Email", "OTP", "Reset"];
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
      {steps.map((lbl, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 26, height: 26, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, transition: "all 0.3s",
              background: step === i+1 ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : step > i+1 ? "linear-gradient(135deg,#10b981,#059669)" : "rgba(255,255,255,0.08)",
              color: (step === i+1 || step > i+1) ? "#fff" : "rgba(255,255,255,0.3)",
              boxShadow: step === i+1 ? "0 4px 12px rgba(79,70,229,0.5)" : "none",
            }}>{step > i+1 ? "✓" : i+1}</div>
            <span style={{ fontSize: 11, fontWeight: 500, color: step === i+1 ? "#e2e8f0" : "rgba(148,163,184,0.38)", transition: "color 0.3s" }}>{lbl}</span>
          </div>
          {i < 2 && (
            <div style={{ width: 20, height: 2, borderRadius: 99, transition: "background 0.4s", background: step > i+1 ? "linear-gradient(90deg,#10b981,#059669)" : "rgba(255,255,255,0.1)" }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════
   FORGOT PASSWORD PAGE
═══════════════════════════════════════ */
export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep]       = useState(1);
  const [email, setEmail]     = useState("");
  const [otp, setOtp]         = useState(["","","","","",""]);
  const [newP, setNewP]       = useState("");
  const [conP, setConP]       = useState("");
  const [showN, setShowN]     = useState(false);
  const [showC, setShowC]     = useState(false);
  const [err, setErr]         = useState("");
  const [suc, setSuc]         = useState("");
  const [load, setLoad]       = useState(false);
  const [focusIdx, setFocusIdx] = useState(-1);
  const [focusedField, setFocusedField] = useState(null);

  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const filled = otp.filter(d => d !== "").length;
  const pwMatch = conP.length > 0 && newP === conP;

  const chOtp = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const n = [...otp]; n[i] = v; setOtp(n);
    if (v && i < 5) refs[i+1].current.focus();
  };
  const kyOtp = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      const n = [...otp]; n[i-1] = ""; setOtp(n); refs[i-1].current.focus();
    }
  };

  const sendOtp = async () => {
    if (!email.trim()) { setErr("Email required ⚠️"); return; }
    if (!email.includes("@")) { setErr("Valid email enter करा ⚠️"); return; }
    setLoad(true); setErr(""); setSuc("");
    try {
      const r = await (await fetch("http://localhost:5000/api/v1/auth/send-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim().toLowerCase() }) })).json();
      if (r.success) { setSuc("OTP पाठवला ✅"); setTimeout(() => { setSuc(""); setStep(2); }, 1500); }
      else setErr(r.message || "Account सापडला नाही ❌");
    } catch { setErr("❌ Server connect नाही झाला."); } finally { setLoad(false); }
  };

  const verOtp = async () => {
    const code = otp.join("");
    if (code.length < 6) { setErr("6-digit OTP enter करा ⚠️"); return; }
    setLoad(true); setErr(""); setSuc("");
    try {
      const r = await (await fetch("http://localhost:5000/api/v1/auth/verify-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim().toLowerCase(), otp: code }) })).json();
      if (r.success) { setSuc("OTP Verified ✅"); setTimeout(() => { setSuc(""); setStep(3); }, 1000); }
      else { setErr(r.message || "Invalid OTP ❌"); setOtp(["","","","","",""]); refs[0].current.focus(); }
    } catch { setErr("❌ Server connect नाही झाला."); } finally { setLoad(false); }
  };

  const reset = async () => {
    if (!newP || !conP) { setErr("सगळे fields भरा ⚠️"); return; }
    if (newP.length < 6) { setErr("Password कमीत कमी 6 characters असावा ⚠️"); return; }
    if (newP !== conP) { setErr("Passwords match नाही ❌"); return; }
    setLoad(true); setErr(""); setSuc("");
    try {
      const r = await (await fetch("http://localhost:5000/api/v1/auth/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim().toLowerCase(), newPass: newP, confirmPass: conP }) })).json();
      if (r.success) { setSuc("Password Reset Successful ✅"); setTimeout(() => navigate("/login"), 2000); }
      else setErr(r.message || "काहीतरी चूक झाली ❌");
    } catch { setErr("❌ Server connect नाही झाला."); } finally { setLoad(false); }
  };

  const Spinner = () => (
    <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
  );

  const inputStyle = (name) => ({
    width: "100%", boxSizing: "border-box",
    background: focusedField === name ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${focusedField === name ? "rgba(99,102,241,0.6)" : "rgba(99,102,241,0.2)"}`,
    borderRadius: 12,
    paddingLeft: 38, paddingRight: name === "newP" || name === "conP" ? 40 : 16,
    paddingTop: 12, paddingBottom: 12,
    color: "#e2e8f0", fontSize: 13, fontFamily: "inherit",
    outline: "none", transition: "all 0.2s ease",
    boxShadow: focusedField === name ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
  });

  const iconStyle = { position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(99,102,241,0.6)", pointerEvents: "none", display: "flex" };

  const btnStyle = (active = true) => ({
    width: "100%", padding: "14px 24px", borderRadius: 14, border: "none",
    background: active && !load ? "linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#4f46e5 100%)" : "rgba(79,70,229,0.4)",
    backgroundSize: "200%",
    color: "#fff", fontSize: 14, fontWeight: 700, letterSpacing: "0.02em",
    cursor: active && !load ? "pointer" : "not-allowed",
    boxShadow: active && !load ? "0 4px 28px rgba(79,70,229,0.45)" : "none",
    transition: "all 0.2s ease",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    fontFamily: "inherit",
    animation: active && !load ? "shimmer 3s linear infinite" : "none",
  });

  const labelStyle = { display: "block", fontSize: 11, fontWeight: 600, color: "rgba(148,163,184,0.8)", marginBottom: 7, letterSpacing: "0.05em", textTransform: "uppercase" };

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
        @keyframes stepIn    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        input::placeholder { color: rgba(148,163,184,0.3); }
        * { box-sizing: border-box; }
        @media (min-width: 1024px) { .lg-brand-panel { display: flex !important; } }
      `}</style>

      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "24px 16px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        <GridBackground />
        <Particles />

        <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", width: "100%", maxWidth: 960 }}>

          <BrandPanel />

          {/* ════ CARD ════ */}
          <div style={{ width: "100%", maxWidth: 460, animation: "cardIn .8s cubic-bezier(.16,1,.3,1) both .1s" }}>
            <div style={{
              borderRadius: 24,
              background: "rgba(8,16,60,0.7)",
              border: "1px solid rgba(99,102,241,0.2)",
              backdropFilter: "blur(32px)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.03) inset, 0 24px 80px rgba(0,0,0,0.6), 0 0 100px rgba(37,99,235,0.12)",
              padding: "36px 36px 32px",
            }}>

              {/* Top bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#4f46e5,#2563eb)", boxShadow: "0 0 20px rgba(79,70,229,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L22 7V17L12 22L2 17V7Z" stroke="white" strokeWidth="1.8" fill="rgba(255,255,255,0.15)"/>
                      <path d="M8 12H16M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>PayZen Bank</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 999, border: "1px solid rgba(52,211,153,0.25)", background: "rgba(52,211,153,0.07)", fontSize: 11, fontWeight: 600, color: "rgba(52,211,153,0.8)" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d399", animation: "scanPulse 2s ease-in-out infinite" }} />
                  Secure
                </div>
              </div>

              {/* Heading */}
              <div style={{ textAlign: "center", marginBottom: 22 }}>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.03em", margin: 0, marginBottom: 6 }}>Forgot Password</h2>
                <p style={{ fontSize: 13, color: "rgba(148,163,184,0.6)", margin: 0 }}>Reset your account securely</p>
              </div>

              {/* Step indicator */}
              <StepIndicator step={step} />

              {/* ══ STEP 1 — Email ══ */}
              {step === 1 && (
                <div style={{ animation: "stepIn .35s cubic-bezier(.16,1,.3,1) forwards" }}>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Email Address <span style={{ color: "#f87171" }}>*</span></label>
                    <div style={{ position: "relative" }}>
                      <span style={iconStyle}><Mail size={14} /></span>
                      <input type="email" placeholder="you@email.com"
                        value={email} onChange={e => { setEmail(e.target.value); setErr(""); }}
                        onKeyDown={e => e.key === "Enter" && sendOtp()}
                        onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                        style={inputStyle("email")} />
                    </div>
                  </div>
                  <button onClick={sendOtp} disabled={load} style={btnStyle()}>
                    {load ? <><Spinner /> Sending OTP...</> : <><Mail size={16} /> Send OTP <ArrowRight size={14} style={{ opacity: 0.7 }} /></>}
                  </button>
                </div>
              )}

              {/* ══ STEP 2 — OTP ══ */}
              {step === 2 && (
                <div style={{ animation: "stepIn .35s cubic-bezier(.16,1,.3,1) forwards" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 14 }}>
                    <KeyRound size={14} style={{ color: "rgba(99,102,241,0.7)" }} />
                    <label style={{ ...labelStyle, margin: 0 }}>Enter 6-digit OTP <span style={{ color: "#f87171" }}>*</span></label>
                  </div>

                  {/* OTP boxes */}
                  <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 14 }}>
                    {otp.map((d, i) => (
                      <div key={i} onClick={() => refs[i].current.focus()}
                        style={{ position: "relative", width: 46, height: 52, cursor: "text" }}>
                        <div style={{
                          position: "absolute", inset: 0, borderRadius: 12,
                          background: focusIdx === i ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.04)",
                          border: `1px solid ${focusIdx === i ? "rgba(99,102,241,0.6)" : "rgba(99,102,241,0.2)"}`,
                          boxShadow: focusIdx === i ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
                          transition: "all 0.2s",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {d ? (
                            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#e2e8f0", boxShadow: "0 0 6px rgba(226,232,240,0.6)" }} />
                          ) : focusIdx === i ? (
                            <div style={{ width: 2, height: 20, background: "#818cf8", borderRadius: 1, animation: "cursorBlink 1s step-end infinite" }} />
                          ) : null}
                        </div>
                        <input ref={refs[i]} type="text" inputMode="numeric" maxLength={1} value={d}
                          onChange={e => { chOtp(i, e.target.value); setErr(""); }}
                          onKeyDown={e => kyOtp(i, e)}
                          onFocus={() => setFocusIdx(i)} onBlur={() => setFocusIdx(-1)}
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "text", zIndex: 10, fontSize: 16, background: "transparent", border: "none", outline: "none" }}
                        />
                      </div>
                    ))}
                  </div>

                  <p style={{ textAlign: "center", fontSize: 12, color: "rgba(148,163,184,0.45)", marginBottom: 4 }}>
                    {filled === 0 ? "Enter the 6-digit code" : filled < 6 ? `${filled} of 6 entered` : "✅ All digits entered"}
                  </p>
                  <p style={{ textAlign: "center", fontSize: 12, color: "rgba(148,163,184,0.45)", marginBottom: 12 }}>
                    OTP sent to <span style={{ color: "rgba(226,232,240,0.65)", fontWeight: 600 }}>{email}</span>
                  </p>
                  <p style={{ textAlign: "center", marginBottom: 14 }}>
                    <button onClick={() => { setStep(1); setOtp(["","","","","",""]); setErr(""); }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#818cf8", fontSize: 12, fontFamily: "inherit" }}>
                      OTP नाही आला? Resend करा ↩
                    </button>
                  </p>
                  <button onClick={verOtp} disabled={load || filled < 6} style={btnStyle(filled === 6)}>
                    {load ? <><Spinner /> Verifying...</> : <><ShieldCheck size={16} /> Verify OTP <ArrowRight size={14} style={{ opacity: 0.7 }} /></>}
                  </button>
                </div>
              )}

              {/* ══ STEP 3 — Reset Password ══ */}
              {step === 3 && (
                <div style={{ animation: "stepIn .35s cubic-bezier(.16,1,.3,1) forwards" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                    {/* New Password */}
                    <div>
                      <label style={labelStyle}>New Password <span style={{ color: "#f87171" }}>*</span></label>
                      <div style={{ position: "relative" }}>
                        <span style={iconStyle}><Lock size={14} /></span>
                        <input type={showN ? "text" : "password"} placeholder="Enter new password"
                          value={newP} onChange={e => { setNewP(e.target.value); setErr(""); }}
                          onFocus={() => setFocusedField("newP")} onBlur={() => setFocusedField(null)}
                          style={inputStyle("newP")} />
                        <button type="button" onClick={() => setShowN(!showN)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(99,102,241,0.5)", display: "flex", padding: 0 }}>
                          {showN ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label style={labelStyle}>Confirm Password <span style={{ color: "#f87171" }}>*</span></label>
                      <div style={{ position: "relative" }}>
                        <span style={iconStyle}><Lock size={14} /></span>
                        <input type={showC ? "text" : "password"} placeholder="Re-enter new password"
                          value={conP} onChange={e => { setConP(e.target.value); setErr(""); }}
                          onFocus={() => setFocusedField("conP")} onBlur={() => setFocusedField(null)}
                          style={inputStyle("conP")} />
                        <button type="button" onClick={() => setShowC(!showC)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(99,102,241,0.5)", display: "flex", padding: 0 }}>
                          {showC ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                      {conP && (
                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 7 }}>
                          <div style={{ width: 7, height: 7, borderRadius: "50%", background: pwMatch ? "#4ade80" : "#f87171", boxShadow: `0 0 6px ${pwMatch ? "#4ade80" : "#f87171"}`, transition: "all 0.3s" }} />
                          <span style={{ fontSize: 10, color: pwMatch ? "#4ade80" : "#f87171" }}>
                            {pwMatch ? "Passwords match ✓" : "Doesn't match"}
                          </span>
                        </div>
                      )}
                    </div>

                    <button onClick={reset} disabled={load} style={btnStyle()}>
                      {load ? <><Spinner /> Resetting...</> : <><ShieldCheck size={16} /> Reset Password <ArrowRight size={14} style={{ opacity: 0.7 }} /></>}
                    </button>
                  </div>
                </div>
              )}

              {/* Error / Success messages */}
              {err && (
                <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)", color: "#fca5a5", fontSize: 13, textAlign: "center" }}>
                  {err}
                </div>
              )}
              {suc && (
                <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 10, background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.25)", color: "#6ee7b7", fontSize: 13, textAlign: "center" }}>
                  {suc}
                </div>
              )}

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                <span style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>or</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
              </div>

              <p style={{ textAlign: "center", fontSize: 13, color: "rgba(148,163,184,0.5)", margin: 0 }}>
                Remember your password?{" "}
                <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 700, color: "#818cf8", fontSize: "inherit", fontFamily: "inherit", padding: 0 }}>
                  Login here 
                </button>
              </p>

              {step > 1 && (
                <div style={{ textAlign: "center", marginTop: 12 }}>
                  <button onClick={() => { setStep(step - 1); setErr(""); setSuc(""); }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.5)", fontSize: 12, fontFamily: "inherit" }}>
                    ← Back
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}