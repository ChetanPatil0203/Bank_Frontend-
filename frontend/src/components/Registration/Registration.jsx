import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, CheckCircle, XCircle, X, User, Mail, Phone, Users, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════════ */
function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl min-w-72 max-w-sm
      ${type === "success" ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
      {type === "success" ? <CheckCircle size={20} className="shrink-0" /> : <XCircle size={20} className="shrink-0" />}
      <p className="text-sm font-medium flex-1">{message}</p>
      <button onClick={onClose} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"><X size={16} /></button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PARTICLE CANVAS
═══════════════════════════════════════════════════════════ */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.8 + 0.2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${p.alpha})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

/* ═══════════════════════════════════════════════════════════
   SHIELD ILLUSTRATION — matching reference image
═══════════════════════════════════════════════════════════ */
function ShieldIllustration() {
  return (
    <div style={{ position: "relative", width: 300, height: 320 }}>

      {/* Outer glow ring */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)",
        animation: "shieldGlow 3s ease-in-out infinite",
      }} />

      {/* Circuit lines */}
      <svg width="300" height="320" viewBox="0 0 300 320" fill="none"
        style={{ position: "absolute", inset: 0 }}>

        {/* Outer circuit ring */}
        <circle cx="150" cy="155" r="130" stroke="rgba(56,189,248,0.15)" strokeWidth="1" strokeDasharray="4 6"/>
        <circle cx="150" cy="155" r="108" stroke="rgba(56,189,248,0.1)" strokeWidth="1" strokeDasharray="2 8"/>

        {/* Circuit corner nodes */}
        {[
          [150,25],[273,93],[273,217],[150,285],[27,217],[27,93]
        ].map(([x,y],i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="rgba(56,189,248,0.5)" style={{ animation: `nodePulse ${1.5+i*0.3}s ease-in-out infinite` }}/>
            <circle cx={x} cy={y} r="8" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="1"/>
          </g>
        ))}

        {/* Circuit connecting lines */}
        <line x1="150" y1="25" x2="100" y2="25" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
        <line x1="100" y1="25" x2="100" y2="55" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
        <line x1="273" y1="93" x2="295" y2="93" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
        <line x1="295" y1="93" x2="295" y2="130" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
        <line x1="273" y1="217" x2="295" y2="217" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
        <line x1="295" y1="217" x2="295" y2="190" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
        <line x1="27" y1="93" x2="5" y2="93" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
        <line x1="5" y1="93" x2="5" y2="130" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
        <line x1="27" y1="217" x2="5" y2="217" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
        <line x1="5" y1="217" x2="5" y2="190" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
        <line x1="150" y1="285" x2="200" y2="285" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
        <line x1="200" y1="285" x2="200" y2="305" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
      </svg>

      {/* Main Shield SVG */}
      <svg width="300" height="320" viewBox="0 0 300 320" fill="none"
        style={{ position: "absolute", inset: 0, animation: "shieldFloat 4s ease-in-out infinite" }}>

        {/* Shield glow shadow */}
        <ellipse cx="150" cy="300" rx="70" ry="8" fill="rgba(56,189,248,0.15)" style={{ filter: "blur(6px)" }}/>

        {/* Shield outer — neon border */}
        <path d="M150 30 L255 75 L255 170 Q255 240 150 285 Q45 240 45 170 L45 75 Z"
          fill="rgba(8,20,60,0.6)"
          stroke="url(#shieldGrad)"
          strokeWidth="2.5"
          style={{ filter: "drop-shadow(0 0 12px rgba(56,189,248,0.6))" }}
        />

        {/* Shield inner layer */}
        <path d="M150 48 L240 88 L240 168 Q240 228 150 268 Q60 228 60 168 L60 88 Z"
          fill="rgba(10,25,80,0.5)"
          stroke="rgba(56,189,248,0.3)"
          strokeWidth="1"
        />

        {/* Shield center fill */}
        <path d="M150 62 L228 97 L228 166 Q228 218 150 254 Q72 218 72 166 L72 97 Z"
          fill="rgba(15,35,100,0.45)"
        />

        {/* Brain icon — top of shield */}
        {/* Left hemisphere */}
        <ellipse cx="138" cy="148" rx="22" ry="26"
          fill="none" stroke="rgba(56,189,248,0.85)" strokeWidth="1.8"/>
        {/* Right hemisphere */}
        <ellipse cx="162" cy="148" rx="22" ry="26"
          fill="none" stroke="rgba(56,189,248,0.85)" strokeWidth="1.8"/>
        {/* Center divider */}
        <line x1="150" y1="122" x2="150" y2="174"
          stroke="rgba(56,189,248,0.6)" strokeWidth="1.5"/>
        {/* Neural path lines left */}
        <path d="M128 138 Q122 138 118 134" stroke="rgba(56,189,248,0.55)" strokeWidth="1.2" fill="none"/>
        <path d="M128 148 Q120 148 116 145" stroke="rgba(56,189,248,0.55)" strokeWidth="1.2" fill="none"/>
        <path d="M128 158 Q122 158 118 162" stroke="rgba(56,189,248,0.55)" strokeWidth="1.2" fill="none"/>
        <path d="M133 132 Q130 126 132 122" stroke="rgba(56,189,248,0.5)" strokeWidth="1.2" fill="none"/>
        {/* Neural path lines right */}
        <path d="M172 138 Q178 138 182 134" stroke="rgba(56,189,248,0.55)" strokeWidth="1.2" fill="none"/>
        <path d="M172 148 Q180 148 184 145" stroke="rgba(56,189,248,0.55)" strokeWidth="1.2" fill="none"/>
        <path d="M172 158 Q178 158 182 162" stroke="rgba(56,189,248,0.55)" strokeWidth="1.2" fill="none"/>
        <path d="M167 132 Q170 126 168 122" stroke="rgba(56,189,248,0.5)" strokeWidth="1.2" fill="none"/>
        {/* Brain glow dots */}
        {[[138,135],[162,135],[138,155],[162,155],[150,145]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="rgba(56,189,248,0.7)"
            style={{ animation: `nodePulse ${1.2+i*0.25}s ease-in-out infinite` }}/>
        ))}

        {/* Connector line — brain to lock */}
        <line x1="150" y1="174" x2="150" y2="192" stroke="rgba(56,189,248,0.5)" strokeWidth="1.5" strokeDasharray="3 2"/>

        {/* Lock icon — bottom of shield */}
        {/* Lock body */}
        <rect x="135" y="196" width="30" height="24" rx="5"
          fill="rgba(56,189,248,0.2)" stroke="rgba(56,189,248,0.9)" strokeWidth="1.8"
          style={{ filter: "drop-shadow(0 0 6px rgba(56,189,248,0.7))" }}/>
        {/* Lock shackle */}
        <path d="M141 196 L141 188 Q141 180 150 180 Q159 180 159 188 L159 196"
          fill="none" stroke="rgba(56,189,248,0.9)" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Keyhole */}
        <circle cx="150" cy="207" r="3.5" fill="rgba(56,189,248,0.9)"/>
        <rect x="148.5" y="207" width="3" height="6" rx="1" fill="rgba(56,189,248,0.9)"/>

        {/* Gradient defs */}
        <defs>
          <linearGradient id="shieldGrad" x1="150" y1="30" x2="150" y2="285" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8"/>
            <stop offset="50%" stopColor="#6366f1"/>
            <stop offset="100%" stopColor="#38bdf8"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   REGISTRATION PAGE
═══════════════════════════════════════════════════════════ */
export default function RegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", email: "", mobile: "",
    gender: "", password: "", confirmPassword: "",
  });
  const [showPassword, setShowPassword]               = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [mounted, setMounted]   = useState(false);
  const [toast, setToast]       = useState({ show: false, message: "", type: "" });

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const showToast = (msg, type) => setToast({ show: true, message: msg, type });
  const hideToast = () => setToast({ show: false, message: "", type: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) { showToast("Password कमीत कमी 6 characters असावा ⚠️", "error"); return; }
    if (formData.password !== formData.confirmPassword) { showToast("Password match नाही ❌", "error"); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) { showToast(result.message + " ✅", "success"); setTimeout(() => navigate("/login"), 1800); }
      else showToast(result.message || "Something went wrong ❌", "error");
    } catch { showToast("❌ Server connect नाही झाला. Flask चालू आहे का?", "error"); }
    finally { setLoading(false); }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm " +
    "placeholder-white/30 outline-none transition-all duration-300 " +
    "focus:bg-white/10 focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-500/20";

  const labelClass = "block text-xs font-medium text-white/60 mb-2 ml-1";

  const IconWrap = ({ children }) => (
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400/70 pointer-events-none flex items-center">
      {children}
    </span>
  );

  return (
    <>
      <style>{`
        @keyframes shieldFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes shieldGlow  { 0%,100%{opacity:.5;transform:translate(-50%,-50%) scale(1)} 50%{opacity:1;transform:translate(-50%,-50%) scale(1.08)} }
        @keyframes nodePulse   { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes spin        { to{transform:rotate(360deg)} }
      `}</style>

      {toast.show && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#020d20] via-[#061d3e] to-[#08234d] py-10 px-4">

        <ParticleCanvas />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl bg-cyan-400" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none opacity-10 blur-3xl bg-indigo-600" />

        {/* EN Badge */}
        <div className="fixed top-5 right-5 z-10 flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white/60 text-sm cursor-pointer hover:bg-white/10 transition-colors">
          EN <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>

        <div className={`flex items-center gap-10 xl:gap-16 z-10 w-full max-w-6xl justify-center transition-all duration-700
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          {/* ── Left: Shield Illustration ── */}
          <div className="hidden lg:flex flex-col items-center gap-5 shrink-0">
            <ShieldIllustration />
            <div className="text-center">
              <p className="text-cyan-400 font-bold text-lg tracking-widest">Join PayZen Bank</p>
              <p className="text-white/30 text-xs tracking-[3px] mt-1">SECURE · SMART · BANKING</p>
            </div>
          </div>

          {/* ── Right: Registration Card ── */}
          <div className="w-full max-w-xl">
            <div className="rounded-3xl p-8 backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.5)]">

              {/* Header */}
              <div className="text-center mb-7">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <svg width="17" height="17" viewBox="0 0 32 32" fill="none">
                      <path d="M13 10L13 22M13 10L18 10Q22 10 22 14Q22 18 18 18L13 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white/70 font-bold text-sm tracking-[2px]">PAYZEN BANK</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Registration</h1>
                <p className="text-white/40 text-sm mt-1.5">Fill all details carefully to register</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Row 1 — Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <IconWrap><User size={15} /></IconWrap>
                      <input type="text" name="name" placeholder="Enter Full Name"
                        value={formData.name} onChange={handleChange} className={inputClass} required />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Email Address <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <IconWrap><Mail size={15} /></IconWrap>
                      <input type="email" name="email" placeholder="Enter Email"
                        value={formData.email} onChange={handleChange} className={inputClass} required />
                    </div>
                  </div>
                </div>

                {/* Row 2 — Mobile & Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Mobile Number <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <IconWrap><Phone size={15} /></IconWrap>
                      <input type="tel" name="mobile" placeholder="Enter Mobile Number"
                        value={formData.mobile} onChange={handleChange} className={inputClass} required />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Gender <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <IconWrap><Users size={15} /></IconWrap>
                      <select name="gender" value={formData.gender} onChange={handleChange}
                        className={`${inputClass} cursor-pointer`} required>
                        <option value="" className="bg-[#061d3e] text-white">Select Gender</option>
                        <option value="Male" className="bg-[#061d3e] text-white">Male</option>
                        <option value="Female" className="bg-[#061d3e] text-white">Female</option>
                        <option value="Other" className="bg-[#061d3e] text-white">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Row 3 — Password & Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Password <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <IconWrap><Lock size={15} /></IconWrap>
                      <input type={showPassword ? "text" : "password"} name="password"
                        placeholder="Enter Password" value={formData.password}
                        onChange={handleChange} className={`${inputClass} pr-11`} required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Confirm Password <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <IconWrap><Lock size={15} /></IconWrap>
                      <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword"
                        placeholder="Confirm Password" value={formData.confirmPassword}
                        onChange={handleChange} className={`${inputClass} pr-11`} required />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {formData.confirmPassword && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className={`w-2 h-2 rounded-full transition-all ${
                          formData.password === formData.confirmPassword
                            ? "bg-green-400 shadow-[0_0_6px_#4ade80]"
                            : "bg-red-400 shadow-[0_0_6px_#f87171]"}`} />
                        <span className={`text-xs ${formData.password === formData.confirmPassword ? "text-green-400" : "text-red-400"}`}>
                          {formData.password === formData.confirmPassword ? "Passwords match ✓" : "Passwords don't match"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Register Button */}
                <div className="pt-2">
                  <button type="submit" disabled={loading}
                    className="w-full py-3.5 rounded-xl font-extrabold text-base text-white tracking-wide
                      transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed
                      hover:-translate-y-0.5 active:translate-y-0
                      bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700
                      shadow-indigo-500/30 hover:shadow-indigo-500/50">
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          style={{ animation: "spin 0.7s linear infinite" }} />
                        Registering...
                      </span>
                    ) : "Register"}
                  </button>
                </div>

              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-white/20 text-xs tracking-widest">OR</span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              {/* Login link */}
              <p className="text-center text-white/40 text-sm">
                Already have an account?{" "}
                <button onClick={() => navigate("/login")}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                  Login here
                </button>
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}