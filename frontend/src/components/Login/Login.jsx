import { Eye, EyeOff, CheckCircle, XCircle, X, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/apiServices";

/* ═══════════════════════════════════════════════════════════
   TOAST COMPONENT — Top Right, Auto-close 3s
═══════════════════════════════════════════════════════════ */
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`
        fixed top-6 right-6 z-[9999]
        flex items-center gap-3
        px-5 py-4 rounded-2xl
        shadow-2xl border backdrop-blur-xl
        min-w-[300px] max-w-[400px]
        ${type === "success"
          ? "bg-green-500/10 border-green-500/30 text-green-400"
          : "bg-red-500/10  border-red-500/30  text-red-400"
        }
      `}
    >
      {type === "success"
        ? <CheckCircle size={20} className="shrink-0 text-green-400" />
        : <XCircle     size={20} className="shrink-0 text-red-400"   />
      }
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={onClose}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
      >
        <X size={16} />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAYZEN PREMIUM LOGO
═══════════════════════════════════════════════════════════ */
function PayZenLogo() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOn(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .pzl-fixed {
          position: fixed; top: 20px; left: 24px;
          z-index: 999; display: flex;
          flex-direction: column; align-items: flex-start; gap: 0;
        }
        .pzl-icon-block { position: relative; width: 58px; height: 58px; margin-bottom: 10px; }
        .pzl-glow {
          position: absolute; inset: -14px; border-radius: 28px;
          background: radial-gradient(ellipse at center, #3b82f6 0%, #6366f1 40%, transparent 72%);
          opacity: 0; filter: blur(14px); transition: opacity 0.5s ease 0.25s;
          animation: pzl-glow-pulse 3s ease-in-out infinite;
        }
        .pzl-wrap.on .pzl-glow { opacity: 0.55; }
        @keyframes pzl-glow-pulse {
          0%,100% { opacity: 0.45; transform: scale(1); }
          50%      { opacity: 0.7;  transform: scale(1.08); }
        }
        .pzl-card {
          position: relative; z-index: 2; width: 58px; height: 58px;
          border-radius: 18px;
          background: linear-gradient(145deg, #1a2e6b 0%, #1e40af 45%, #2563eb 100%);
          box-shadow: 0 0 0 1px rgba(99,102,241,0.5), 0 6px 24px rgba(37,99,235,0.5),
            inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.2);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .pzl-card:hover {
          transform: scale(1.06) translateY(-1px);
          box-shadow: 0 0 0 1.5px rgba(99,102,241,0.75), 0 10px 32px rgba(37,99,235,0.65),
            inset 0 1px 0 rgba(255,255,255,0.15);
        }
        .pzl-card-texture {
          position: absolute; inset: 0; border-radius: 18px;
          background: repeating-linear-gradient(-55deg, transparent, transparent 6px,
            rgba(255,255,255,0.025) 6px, rgba(255,255,255,0.025) 12px);
        }
        .pzl-name-block {
          display: flex; flex-direction: column; gap: 1px;
          opacity: 0; transform: translateX(-6px);
          transition: opacity 0.45s ease 0.35s, transform 0.45s ease 0.35s;
        }
        .pzl-wrap.on .pzl-name-block { opacity: 1; transform: translateX(0); }
        .pzl-name { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px; letter-spacing: -0.5px; line-height: 1; color: #fff; }
        .pzl-pay  { color: #f8fafc; }
        .pzl-zen  { background: linear-gradient(90deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .pzl-underline { height: 2px; width: 0; border-radius: 99px; background: linear-gradient(90deg, #3b82f6, #a78bfa); transition: width 0.6s cubic-bezier(.22,1,.36,1) 0.55s; margin-top: 3px; }
        .pzl-wrap.on .pzl-underline { width: 100%; }
        .pzl-tag { font-family: 'DM Sans', sans-serif; font-size: 8.5px; font-weight: 500; letter-spacing: 2.8px; text-transform: uppercase; color: rgba(148,163,184,0.58); margin-top: 4px; opacity: 0; transition: opacity 0.4s ease 0.65s; }
        .pzl-wrap.on .pzl-tag  { opacity: 1; }
        .pzl-svg { width: 28px; height: 28px; position: relative; z-index: 3; }

        /* ══ RED ALERT ANIMATIONS ══ */
        @keyframes shakeX {
          0%,100%             { transform: translateX(0); }
          10%,30%,50%,70%,90% { transform: translateX(-8px); }
          20%,40%,60%,80%     { transform: translateX( 8px); }
        }
        @keyframes alertBgPulse {
          0%,100% { background: linear-gradient(135deg,#021029 0%,#051e47 50%,#0A2A66 100%); }
          50%     { background: linear-gradient(135deg,#1a0505 0%,#2d0808 50%,#1a0505 100%); }
        }
        @keyframes redVignette {
          0%,100% { opacity: 0.3; }
          50%     { opacity: 0.7; }
        }
        @keyframes scanLine {
          0%   { top: -2px; opacity: 0.8; }
          100% { top: 100%; opacity: 0;   }
        }
        @keyframes borderFlash {
          0%,100% { border-color: rgba(239,68,68,0.8); }
          50%     { border-color: rgba(239,68,68,0.2); }
        }
        @keyframes cardRedPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
          50%     { box-shadow: 0 0 60px 20px rgba(239,68,68,0.25); }
        }
        @keyframes inputRedGlow {
          0%,100% { box-shadow: 0 0 0 1px rgba(239,68,68,0.6); }
          50%     { box-shadow: 0 0 12px 2px rgba(239,68,68,0.4); }
        }
        @keyframes shieldPulse {
          0%,100% { transform: scale(1);    opacity: 1;   }
          50%     { transform: scale(1.15); opacity: 0.8; }
        }

        .shake-anim      { animation: shakeX       0.6s cubic-bezier(.36,.07,.19,.97) both; }
        .red-bg-anim     { animation: alertBgPulse  2s  ease-in-out 3; }
        .red-border-anim { animation: borderFlash   0.8s ease-in-out 4; }
        .input-red-glow  { animation: inputRedGlow  1s  ease-in-out infinite; border-color: rgba(239,68,68,0.8) !important; }
        .shield-pulse    { animation: shieldPulse   1s  ease-in-out infinite; }
      `}</style>

      <div className="pzl-fixed">
        <div className={`pzl-wrap ${on ? "on" : ""}`}>
          <div className="pzl-icon-block" style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
            <div className="pzl-orbit" />
            <div className="pzl-card" style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
              <div className="pzl-card-texture" />
              <div className="pzl-shimmer" />
              <svg className="pzl-svg" viewBox="0 0 32 32" fill="none">
                <path d="M16 2 L28 8.5 L28 23.5 L16 30 L4 23.5 L4 8.5 Z" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
                <circle cx="16" cy="16" r="7" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
                <path d="M13.5 12.5 L13.5 19.5 M13.5 12.5 L17 12.5 Q19 12.5 19 14.5 Q19 16.5 17 16.5 L13.5 16.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="pzl-name-block">
            <div className="pzl-name">
              <span className="pzl-pay">Pay</span>
              <span className="pzl-zen">Zen</span>
            </div>
            <div className="pzl-underline" />
            <div className="pzl-tag">SECURE · SMART · BANKING</div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   LOGIN PAGE — Red Alert + 3x LOUD Beep Sound
═══════════════════════════════════════════════════════════ */
export default function LoginPage() {
  const navigate = useNavigate();

  const labelClass = "text-xs font-medium text-zinc-400 ml-1 mb-1 block";

  // ─── Form state ───────────────────────────────────────────
  const [formData, setFormData] = useState({
    accountNumber: "",
    password:      "",
    remember:      false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading,      setLoading]      = useState(false);

  // ─── Alert state ──────────────────────────────────────────
  const [alertActive, setAlertActive] = useState(false);
  const [shakeCard,   setShakeCard]   = useState(false);
  const [alertMsg,    setAlertMsg]    = useState("");

  // ─── Toast state ──────────────────────────────────────────
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const showToast = (msg, type) => setToast({ show: true, message: msg, type });
  const hideToast = ()           => setToast({ show: false, message: "", type: "" });

  // ═══════════════════════════════════════════════════════════
  //  🔊 3x LOUD ALERT BEEP SOUND — Web Audio API
  //
  //  Beep 1 → 0ms    freq: 960Hz
  //  Beep 2 → 380ms  freq: 880Hz
  //  Beep 3 → 760ms  freq: 960Hz
  //
  //  Type    → sawtooth  (harsh, aggressive)
  //  Volume  → 1.0       (maximum loud)
  //  Distort → 800 deg   (very distorted = louder feel)
  //  Duration→ 300ms per beep
  // ═══════════════════════════════════════════════════════════
  const playAlertSound = () => {
    try {
      // AudioContext — browser audio engine
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx      = new AudioCtx();

      // Chrome policy fix — resume if suspended
      if (ctx.state === "suspended") ctx.resume();

      // 3 beeps — freq aani delay define karto
      const beeps = [
        { delay: 0,   freq: 960 },  // Beep 1
        { delay: 380, freq: 880 },  // Beep 2
        { delay: 760, freq: 960 },  // Beep 3
      ];

      beeps.forEach(({ delay, freq }) => {
        setTimeout(() => {

          // ── Oscillator — pure tone generator ──────────────
          const osc  = ctx.createOscillator();

          // ── Gain node — volume control ────────────────────
          const gain = ctx.createGain();

          // ── WaveShaper — distortion for loud harsh sound ──
          const dist = ctx.createWaveShaper();

          // Distortion curve — higher number = more distortion
          const bufLen = 512;
          const curve  = new Float32Array(bufLen);
          const degVal = 800; // 800 = very distorted = sounds louder
          for (let i = 0; i < bufLen; i++) {
            const x  = (i * 2) / bufLen - 1;
            curve[i] = ((Math.PI + degVal) * x) / (Math.PI + degVal * Math.abs(x));
          }
          dist.curve      = curve;
          dist.oversample = "4x"; // smoother distortion

          // ── Signal chain: osc → dist → gain → speakers ────
          osc.connect(dist);
          dist.connect(gain);
          gain.connect(ctx.destination);

          // ── Sawtooth wave = harsh alarm-like sound ─────────
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // ── Volume envelope — MAXIMUM LOUD ─────────────────
          gain.gain.setValueAtTime(0,   ctx.currentTime);            // 0 se start
          gain.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.008); // instant LOUD — 1.0 = max
          gain.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.20);  // hold max volume
          gain.gain.linearRampToValueAtTime(0,   ctx.currentTime + 0.30);  // fade out end

          // ── Play 300ms ─────────────────────────────────────
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.30);

        }, delay);
      });

    } catch (err) {
      // Silently fail if browser blocks audio
      console.warn("[PayZen] Audio error:", err);
    }
  };

  // ─── Red alert trigger ────────────────────────────────────
  const triggerRedAlert = (msg) => {
    setAlertMsg(msg);
    setAlertActive(true);
    setShakeCard(true);

    // 🔊 3x LOUD BEEP
    playAlertSound();

    // 6s nantar page normal
    setTimeout(() => { setAlertActive(false); setAlertMsg(""); }, 6000);

    // 0.6s nantar shake band
    setTimeout(() => setShakeCard(false), 600);
  };

  // ─── Input class — alert madhe red glow ───────────────────
  const inputClass =
    "w-full bg-white/5 text-white text-sm border border-white/10 rounded-xl px-4 py-3 md:py-3.5 " +
    "placeholder:text-zinc-400 transition-all duration-300 " +
    "outline-none focus:outline-none focus:ring-0 focus:border-[#3B82F6] focus:bg-white/10 " +
    (alertActive ? "input-red-glow" : "");

  // ─── Handle change ────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    // Type kela ki alert reset
    if (alertActive) { setAlertActive(false); setAlertMsg(""); }
  };

  // ─── Handle submit ────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await loginUser(formData.accountNumber, formData.password);

    if (!result.ok) {
      // ❌ Wrong credentials — red alert + loud beep + toast
      const msg = result.data.message || "Invalid credentials!";
      triggerRedAlert(msg);
      showToast(msg, "error");
      setLoading(false);
      return;
    }

    // ✅ Login success — green toast + navigate
    showToast("Login Successful!", "success");
    localStorage.setItem("payzen_user", JSON.stringify(result.data.user));
    setTimeout(() => navigate("/dashboard"), 1500);
    setLoading(false);
  };

  // ─── Render ───────────────────────────────────────────────
  return (
    <>
      {/* Toast — top right */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      <PayZenLogo />

      {/* Full page wrapper */}
      <div
        className={`
          min-h-screen flex items-center justify-center px-4 sm:px-6
          relative overflow-hidden transition-all duration-700
          ${alertActive
            ? "red-bg-anim"
            : "bg-gradient-to-br from-[#021029] via-[#051e47] to-[#0A2A66]"
          }
        `}
      >

        {/* Red overlays — alert active madhe */}
        {alertActive && (
          <>
            {/* Red vignette */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: "radial-gradient(ellipse at center, transparent 30%, rgba(239,68,68,0.35) 100%)",
                animation:  "redVignette 1.5s ease-in-out infinite",
              }}
            />
            {/* Scan line */}
            <div
              className="absolute left-0 w-full h-[2px] pointer-events-none z-20"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.8), transparent)",
                animation:  "scanLine 2s linear infinite",
              }}
            />
            {/* Page border flash */}
            <div
              className="absolute inset-0 pointer-events-none z-10 red-border-anim"
              style={{ border: "2px solid rgba(239,68,68,0.7)" }}
            />
          </>
        )}

        {/* Card */}
        <div className={`w-full max-w-md relative z-30 ${shakeCard ? "shake-anim" : ""}`}>
          <div
            className={`
              w-full bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl
              border transition-all duration-500
              ${alertActive ? "border-red-500/60" : "border-white/10"}
            `}
            style={alertActive ? { animation: "cardRedPulse 1.5s ease-in-out infinite" } : {}}
          >

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h2 className={`text-2xl sm:text-3xl font-bold transition-colors duration-500 ${alertActive ? "text-red-400" : "text-white"}`}>
                User Login
              </h2>
              <p className="text-zinc-400 text-sm mt-2">
                Access your banking dashboard safely
              </p>
            </div>

            {/* Shield alert banner — card inside */}
            {alertActive && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/40 flex items-center gap-3">
                <ShieldAlert size={20} className="shrink-0 text-red-400 shield-pulse" />
                <div className="flex-1">
                  <p className="text-red-400 text-sm font-semibold">Authentication Failed</p>
                  <p className="text-red-400/70 text-xs mt-0.5">{alertMsg}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

              {/* Email */}
              <div>
                <label className={labelClass}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Email Address"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className={inputClass}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className={labelClass}>
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputClass}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[34px] sm:top-[38px] text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Remember + Forgot */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="accent-[#6F5FE7]"
                  />
                  Remember Me
                </label>
                <span
                  className="text-[#6F5FE7] cursor-pointer"
                  onClick={() => navigate("/forgot")}
                >
                  Forgot Password?
                </span>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full text-white font-semibold rounded-xl py-3 md:py-3.5
                  transition-all transform active:scale-[0.98] shadow-lg
                  disabled:opacity-60 disabled:cursor-not-allowed
                  ${alertActive
                    ? "bg-red-600 hover:bg-red-700 border border-red-500/50"
                    : "bg-[#6F5FE7] hover:bg-[#5b4ec2]"
                  }
                `}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            {/* Register link */}
            <div className="mt-6 text-center">
              <p className="text-zinc-400 text-sm">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/registration")}
                  className="text-[#6F5FE7] font-semibold"
                >
                  Register here
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}