import { Eye, EyeOff, CheckCircle, XCircle, X, Lock, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/apiServices";

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

function BankBuilding() {
  return (
    <svg width="300" height="320" viewBox="0 0 300 320" fill="none" className="drop-shadow-2xl">
      <ellipse cx="150" cy="300" rx="100" ry="10" fill="rgba(56,189,248,0.08)" />
      <line x1="50" y1="298" x2="250" y2="298" stroke="rgba(56,189,248,0.3)" strokeWidth="1.5" />
      <g className="animate-bounce" style={{ transformOrigin: "50px 110px", animationDuration: "2s" }}>
        <circle cx="50" cy="110" r="13" fill="rgba(250,204,21,0.1)" stroke="rgba(250,204,21,0.6)" strokeWidth="1.5" />
        <text x="50" y="115" textAnchor="middle" fontSize="10" fill="rgba(250,204,21,0.8)" fontWeight="bold">₹</text>
      </g>
      <g className="animate-bounce" style={{ transformOrigin: "255px 95px", animationDuration: "2.5s", animationDelay: "0.3s" }}>
        <circle cx="255" cy="95" r="10" fill="rgba(250,204,21,0.1)" stroke="rgba(250,204,21,0.5)" strokeWidth="1.5" />
        <text x="255" y="99" textAnchor="middle" fontSize="8" fill="rgba(250,204,21,0.7)" fontWeight="bold">₹</text>
      </g>
      <g className="animate-bounce" style={{ transformOrigin: "258px 200px", animationDuration: "3s", animationDelay: "0.6s" }}>
        <circle cx="258" cy="200" r="8" fill="rgba(250,204,21,0.08)" stroke="rgba(250,204,21,0.4)" strokeWidth="1.2" />
        <text x="258" y="204" textAnchor="middle" fontSize="7" fill="rgba(250,204,21,0.6)" fontWeight="bold">₹</text>
      </g>
      {[[35,45],[270,55],[28,155],[282,135],[55,240],[260,250]].map(([x,y],i)=>(
        <g key={i} opacity={i%2===0?0.6:0.4}>
          <line x1={x} y1={y-4} x2={x} y2={y+4} stroke="rgba(56,189,248,0.8)" strokeWidth="1.2"/>
          <line x1={x-4} y1={y} x2={x+4} y2={y} stroke="rgba(56,189,248,0.8)" strokeWidth="1.2"/>
        </g>
      ))}
      <rect x="55" y="278" width="190" height="22" rx="3" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.35)" strokeWidth="1.2"/>
      <rect x="60" y="274" width="180" height="6" rx="1" fill="rgba(56,189,248,0.15)" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
      <rect x="52" y="280" width="196" height="6" rx="1" fill="rgba(56,189,248,0.1)" stroke="rgba(56,189,248,0.22)" strokeWidth="1"/>
      <rect x="68" y="152" width="164" height="126" rx="2" fill="rgba(10,25,65,0.75)" stroke="rgba(56,189,248,0.3)" strokeWidth="1.2"/>
      <rect x="68" y="152" width="164" height="50" rx="2" fill="rgba(56,189,248,0.04)"/>
      {[88,112,136,160,184,208].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="147" width="9" height="131" rx="2" fill="rgba(56,189,248,0.07)" stroke="rgba(56,189,248,0.28)" strokeWidth="1"/>
          <rect x={x+1} y="147" width="7" height="7" rx="1" fill="rgba(56,189,248,0.18)"/>
        </g>
      ))}
      <rect x="64" y="140" width="172" height="13" rx="2" fill="rgba(56,189,248,0.14)" stroke="rgba(56,189,248,0.5)" strokeWidth="1.2"/>
      <text x="150" y="150" textAnchor="middle" fontSize="6.5" fill="rgba(56,189,248,0.75)" letterSpacing="3">PAYZEN BANK</text>
      <path d="M64 140 L150 82 L236 140 Z" fill="rgba(8,18,50,0.85)" stroke="rgba(56,189,248,0.65)" strokeWidth="1.5"/>
      <path d="M76 140 L150 95 L224 140 Z" fill="none" stroke="rgba(56,189,248,0.18)" strokeWidth="1"/>
      <circle cx="150" cy="112" r="6" fill="rgba(56,189,248,0.15)" stroke="rgba(56,189,248,0.7)" strokeWidth="1.2"/>
      <text x="150" y="116" textAnchor="middle" fontSize="7" fill="rgba(56,189,248,0.9)">★</text>
      <line x1="150" y1="60" x2="150" y2="82" stroke="rgba(56,189,248,0.6)" strokeWidth="1.5"/>
      <circle cx="150" cy="57" r="4.5" fill="rgba(56,189,248,0.2)" stroke="rgba(56,189,248,0.7)" strokeWidth="1.2"/>
      <path d="M150 58 L166 63 L150 69 Z" fill="rgba(99,102,241,0.5)" stroke="rgba(99,102,241,0.7)" strokeWidth="1"/>
      {[80,108,136,164,192,220].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="163" width="20" height="26" rx="3" fill="rgba(56,189,248,0.07)" stroke="rgba(56,189,248,0.28)" strokeWidth="1"/>
          <rect x={x+2} y="165" width="16" height="22" rx="2" fill="rgba(56,189,248,0.04)"/>
          <line x1={x+10} y1="163" x2={x+10} y2="189" stroke="rgba(56,189,248,0.18)" strokeWidth="0.8"/>
          <line x1={x} y1="176" x2={x+20} y2="176" stroke="rgba(56,189,248,0.18)" strokeWidth="0.8"/>
        </g>
      ))}
      {[80,108,192,220].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="207" width="20" height="26" rx="3" fill="rgba(56,189,248,0.07)" stroke="rgba(56,189,248,0.28)" strokeWidth="1"/>
          <rect x={x+2} y="209" width="16" height="22" rx="2" fill="rgba(56,189,248,0.04)"/>
          <line x1={x+10} y1="207" x2={x+10} y2="233" stroke="rgba(56,189,248,0.18)" strokeWidth="0.8"/>
          <line x1={x} y1="220" x2={x+20} y2="220" stroke="rgba(56,189,248,0.18)" strokeWidth="0.8"/>
        </g>
      ))}
      <rect x="132" y="218" width="36" height="60" rx="4" fill="rgba(99,102,241,0.14)" stroke="rgba(99,102,241,0.55)" strokeWidth="1.5"/>
      <path d="M132 230 Q150 216 168 230" fill="none" stroke="rgba(99,102,241,0.45)" strokeWidth="1.2"/>
      <circle cx="145" cy="250" r="2.5" fill="rgba(250,204,21,0.75)"/>
      <line x1="150" y1="218" x2="150" y2="278" stroke="rgba(99,102,241,0.28)" strokeWidth="1"/>
      <line x1="18" y1="298" x2="55" y2="298" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
      <line x1="245" y1="298" x2="282" y2="298" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
      <circle cx="18" cy="298" r="3" fill="rgba(56,189,248,0.6)"/>
      <circle cx="282" cy="298" r="3" fill="rgba(56,189,248,0.6)"/>
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData]         = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [alertActive, setAlertActive]   = useState(false);
  const [shakeCard, setShakeCard]       = useState(false);
  const [toast, setToast]               = useState({ show: false, message: "", type: "" });
  const [mounted, setMounted]           = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const showToast = (msg, type) => setToast({ show: true, message: msg, type });
  const hideToast = () => setToast({ show: false, message: "", type: "" });

  const playAlertSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();
      [{ delay: 0, freq: 960 }, { delay: 380, freq: 880 }, { delay: 760, freq: 960 }].forEach(({ delay, freq }) => {
        setTimeout(() => {
          const osc = ctx.createOscillator(), gain = ctx.createGain(), dist = ctx.createWaveShaper();
          const curve = new Float32Array(512);
          for (let i = 0; i < 512; i++) { const x = (i * 2) / 512 - 1; curve[i] = ((Math.PI + 800) * x) / (Math.PI + 800 * Math.abs(x)); }
          dist.curve = curve; dist.oversample = "4x";
          osc.connect(dist); dist.connect(gain); gain.connect(ctx.destination);
          osc.type = "sawtooth"; osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.008);
          gain.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.20);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.30);
          osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.30);
        }, delay);
      });
    } catch (err) { console.warn("[PayZen] Audio error:", err); }
  };

  const triggerRedAlert = () => {
    setAlertActive(true); setShakeCard(true); playAlertSound();
    setTimeout(() => setAlertActive(false), 6000);
    setTimeout(() => setShakeCard(false), 600);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    if (alertActive) setAlertActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    const result = await loginUser(formData.email, formData.password);
    if (!result.ok) {
      const msg = result.data?.message || "Invalid Credentials!";
      triggerRedAlert(); showToast(msg, "error"); setLoading(false); return;
    }
    showToast("Login Successful! 🎉", "success");
    localStorage.setItem("payzen_user", JSON.stringify(result.data.user));
    setTimeout(() => navigate("/dashboard"), 1500);
    setLoading(false);
  };

  // ── Input base styles ──
  const inputBase = "w-full bg-white/5 border rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-white/30 outline-none transition-all duration-300 focus:bg-white/10";
  const inputClass = alertActive
    ? `${inputBase} border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20`
    : `${inputBase} border-white/10 focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-500/20`;

  const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300";

  return (
    <>
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#020d20] via-[#061d3e] to-[#08234d]">

        <ParticleCanvas />

        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl bg-cyan-400" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none opacity-10 blur-3xl bg-indigo-600" />

        {alertActive && (
          <div className="absolute left-0 w-full h-0.5 pointer-events-none z-20 animate-pulse bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        )}

        {/* EN Badge */}
        <div className="fixed top-5 right-5 z-10 flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white/60 text-sm cursor-pointer hover:bg-white/10 transition-colors">
          EN
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>

        <div className={`flex items-center gap-10 xl:gap-20 px-4 z-10 w-full max-w-5xl justify-center transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          {/* Left: Bank Building */}
          <div className="hidden lg:flex flex-col items-center gap-5">
            <div style={{ animation: "bankFloat 4s ease-in-out infinite" }}>
              <BankBuilding />
            </div>
            <div className="text-center">
              <p className="text-cyan-400 font-bold text-lg tracking-widest">Your Trusted Bank</p>
              <p className="text-white/30 text-xs tracking-[3px] mt-1">SECURE · SMART · BANKING</p>
            </div>
            {/* Stats */}
            <div className="flex gap-6 mt-1">
              {[["10M+","Customers"],["₹500Cr+","Transactions"],["99.9%","Uptime"]].map(([val,label])=>(
                <div key={label} className="text-center">
                  <p className="text-cyan-400 font-bold text-sm">{val}</p>
                  <p className="text-white/30 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Login Card */}
          <div className={`w-full max-w-md transition-transform duration-300 ${shakeCard ? "animate-[shakeX_0.5s_ease-in-out]" : ""}`}>
            <div className={`rounded-3xl p-8 backdrop-blur-2xl border transition-all duration-500
              ${alertActive
                ? "bg-red-950/20 border-red-500/40 shadow-[0_30px_70px_rgba(239,68,68,0.15)]"
                : "bg-white/5 border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.5)]"
              }`}>

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
                <h1 className={`text-3xl font-extrabold tracking-tight transition-colors duration-300 ${alertActive ? "text-red-400" : "text-white"}`}>
                  User Login
                </h1>
                <p className="text-white/40 text-sm mt-1.5">Access your banking dashboard safely</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* ── Email Field with Mail Icon ── */}
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-2 ml-1">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    {/* Left Mail Icon */}
                    <span className={iconClass}>
                      <Mail
                        size={17}
                        className={alertActive ? "text-red-400/70" : "text-indigo-400/70"}
                      />
                    </span>
                    <input
                      type="email" name="email"
                      placeholder="Enter Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      required autoComplete="email"
                    />
                  </div>
                </div>

                {/* ── Password Field with Lock Icon + Eye Toggle ── */}
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-2 ml-1">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    {/* Left Lock Icon */}
                    <span className={iconClass}>
                      <Lock
                        size={17}
                        className={alertActive ? "text-red-400/70" : "text-indigo-400/70"}
                      />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`${inputClass} pr-12`}
                      required autoComplete="current-password"
                    />
                    {/* Right Eye Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-white/50 text-sm cursor-pointer hover:text-white/70 transition-colors">
                    <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange}
                      className="accent-indigo-500 w-3.5 h-3.5" />
                    Remember Me
                  </label>
                  <button type="button" onClick={() => navigate("/forgot")}
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors">
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button type="submit" disabled={loading}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-base text-white tracking-wide transition-all duration-300 shadow-lg
                    disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0
                    ${alertActive
                      ? "bg-gradient-to-r from-red-600 to-red-700 shadow-red-500/30 hover:shadow-red-500/50"
                      : "bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 shadow-indigo-500/30 hover:shadow-indigo-500/50"
                    }`}>
                  {loading ? "Logging in..." : "Login"}
                </button>

                {/* Verifying */}
                {loading && (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin" />
                    <span className="text-white/40 text-xs animate-pulse">Verifying Secure Access...</span>
                  </div>
                )}
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-white/20 text-xs tracking-widest">OR</span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              {/* Register link */}
              <p className="text-center text-white/40 text-sm">
                Don't have an account?{" "}
                <button onClick={() => navigate("/registration")}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                  Register here
                </button>
              </p>

              {/* SSL Badge */}
              <div className="flex items-center justify-center gap-2 mt-5 py-2 px-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                <Lock size={11} className="text-cyan-500/60" />
                <span className="text-white/30 text-[10px] tracking-widest">256-BIT SSL ENCRYPTED · SECURE LOGIN</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bankFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes shakeX { 0%,100%{transform:translateX(0)} 10%,30%,50%,70%,90%{transform:translateX(-8px)} 20%,40%,60%,80%{transform:translateX(8px)} }
        .animate-\\[shakeX_0\\.5s_ease-in-out\\] { animation: shakeX 0.5s ease-in-out; }
      `}</style>
    </>
  );
}