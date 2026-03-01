import { Eye, EyeOff, CheckCircle, XCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/apiServices";

function Toast({ message, type, onClose }) {
  // 3 seconds nantar auto-close
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
        transition-all duration-500 ease-out
        ${type === "success"
          ? "bg-green-500/10 border-green-500/30 text-green-400"
          : "bg-red-500/10  border-red-500/30  text-red-400"
        }
      `}
    >
      {/* Icon — success ya error */}
      {type === "success"
        ? <CheckCircle size={20} className="shrink-0 text-green-400" />
        : <XCircle     size={20} className="shrink-0 text-red-400"   />
      }

      {/* Message text */}
      <p className="text-sm font-medium flex-1">{message}</p>

      {/* Manual close button */}
      <button
        onClick={onClose}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
      >
        <X size={16} />
      </button>
    </div>
  );
}

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
          position: fixed;
          top: 20px;
          left: 24px;
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
        }
        .pzl-icon-block {
          position: relative;
          width: 58px;
          height: 58px;
          margin-bottom: 10px;
        }
        .pzl-glow {
          position: absolute;
          inset: -14px;
          border-radius: 28px;
          background: radial-gradient(ellipse at center, #3b82f6 0%, #6366f1 40%, transparent 72%);
          opacity: 0;
          filter: blur(14px);
          transition: opacity 0.5s ease 0.25s;
          animation: pzl-glow-pulse 3s ease-in-out infinite;
        }
        .pzl-wrap.on .pzl-glow { opacity: 0.55; }
        @keyframes pzl-glow-pulse {
          0%,100% { opacity: 0.45; transform: scale(1); }
          50%      { opacity: 0.7;  transform: scale(1.08); }
        }
        .pzl-card {
          position: relative;
          z-index: 2;
          width: 58px;
          height: 58px;
          border-radius: 18px;
          background: linear-gradient(145deg, #1a2e6b 0%, #1e40af 45%, #2563eb 100%);
          box-shadow:
            0 0 0 1px rgba(99,102,241,0.5),
            0 6px 24px rgba(37,99,235,0.5),
            inset 0 1px 0 rgba(255,255,255,0.12),
            inset 0 -1px 0 rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .pzl-card:hover {
          transform: scale(1.06) translateY(-1px);
          box-shadow:
            0 0 0 1.5px rgba(99,102,241,0.75),
            0 10px 32px rgba(37,99,235,0.65),
            inset 0 1px 0 rgba(255,255,255,0.15);
        }
        .pzl-card-texture {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 6px,
            rgba(255,255,255,0.025) 6px,
            rgba(255,255,255,0.025) 12px
          );
          border-radius: 18px;
        }
        .pzl-corner-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22d3ee;
          box-shadow: 0 0 6px #22d3ee;
          z-index: 4;
          animation: pzl-dot-blink 2.2s ease-in-out infinite;
        }
        @keyframes pzl-dot-blink {
          0%,100% { opacity: 1; box-shadow: 0 0 6px #22d3ee; }
          50%      { opacity: 0.5; box-shadow: 0 0 12px #22d3ee; }
        }
        .pzl-name-block {
          display: flex;
          flex-direction: column;
          gap: 1px;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.45s ease 0.35s, transform 0.45s ease 0.35s;
        }
        .pzl-wrap.on .pzl-name-block { opacity: 1; transform: translateX(0); }
        .pzl-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 22px;
          letter-spacing: -0.5px;
          line-height: 1;
          color: #fff;
        }
        .pzl-pay { color: #f8fafc; }
        .pzl-zen {
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pzl-underline {
          height: 2px;
          width: 0;
          border-radius: 99px;
          background: linear-gradient(90deg, #3b82f6, #a78bfa);
          transition: width 0.6s cubic-bezier(.22,1,.36,1) 0.55s;
          margin-top: 3px;
        }
        .pzl-wrap.on .pzl-underline { width: 100%; }
        .pzl-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 8.5px;
          font-weight: 500;
          letter-spacing: 2.8px;
          text-transform: uppercase;
          color: rgba(148,163,184,0.58);
          margin-top: 4px;
          opacity: 0;
          transition: opacity 0.4s ease 0.65s;
        }
        .pzl-wrap.on .pzl-tag { opacity: 1; }
        .pzl-svg {
          width: 28px;
          height: 28px;
          position: relative;
          z-index: 3;
        }
        .pzl-page { padding-top: 0; }
      `}</style>

      <div className="pzl-fixed">
        <div className={`pzl-wrap ${on ? "on" : ""}`}>

          {/* ICON */}
          <div
            className="pzl-icon-block"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <div className="pzl-orbit" />
            <div
              className="pzl-card"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <div className="pzl-card-texture" />
              <div className="pzl-shimmer" />

              <svg className="pzl-svg" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 2 L28 8.5 L28 23.5 L16 30 L4 23.5 L4 8.5 Z"
                  fill="rgba(255,255,255,0.07)"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1"
                />
                <circle
                  cx="16" cy="16" r="7"
                  fill="rgba(255,255,255,0.1)"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.2"
                />
                <path
                  d="M13.5 12.5 L13.5 19.5 M13.5 12.5 L17 12.5 Q19 12.5 19 14.5 Q19 16.5 17 16.5 L13.5 16.5"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* NAME + TAGLINE */}
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

export default function LoginPage() {
  const navigate = useNavigate();

  // ─── Reusable class strings ───────────────────────────────
  const inputClass =
    "w-full bg-white/5 text-white text-sm border border-white/10 rounded-xl px-4 py-3 md:py-3.5 " +
    "placeholder:text-zinc-400 transition-all duration-300 " +
    "outline-none focus:outline-none focus:ring-0 " +
    "focus:border-[#3B82F6] focus:bg-white/10";

  const labelClass = "text-xs font-medium text-zinc-400 ml-1 mb-1 block";

  const buttonClass =
    "w-full bg-[#6F5FE7] hover:bg-[#5b4ec2] text-white font-semibold rounded-xl py-3 md:py-3.5 " +
    "transition-all transform active:scale-[0.98] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed";

  // ─── Form State ───────────────────────────────────────────
  const [formData, setFormData] = useState({
    accountNumber: "",  // email hold karto
    password:      "",
    remember:      false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading,      setLoading]      = useState(false);

  // ─── Toast State ──────────────────────────────────────────
  const [toast, setToast] = useState({
    show:    false,
    message: "",
    type:    "",
  });

  // ─── Toast show helper ────────────────────────────────────
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  // ─── Toast hide helper ────────────────────────────────────
  const hideToast = () => {
    setToast({ show: false, message: "", type: "" });
  };

  // ─── Handle input change ──────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ─── Handle Form Submit ───────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ── API call via apiService ──
    const result = await loginUser(
      formData.accountNumber,  // email
      formData.password
    );

    if (!result.ok) {
      // 401 = User not found / wrong password
      showToast(result.data.message || "Login failed. Please try again. ❌", "error");
      setLoading(false);
      return;
    }

    // Login successful
    showToast("Login Successful", "success");
    localStorage.setItem("payzen_user", JSON.stringify(result.data.user));

    // 1.5 second nantar dashboard la navigate karto
    setTimeout(() => navigate("/dashboard"), 1500);

    setLoading(false);
  };

  // ─── Render ───────────────────────────────────────────────
  return (
    <>
      {/* ── Toast — top-right corner ── */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      {/* Premium PayZen Logo — fixed top-left */}
      <PayZenLogo />

      {/* Full-screen gradient background */}
      <div className="min-h-screen bg-gradient-to-br from-[#021029] via-[#051e47] to-[#0A2A66] flex items-center justify-center px-4 sm:px-6">

        {/* Glass card container */}
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">

          {/* ── HEADER ─────────────────────────────────────── */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              User Login
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              Access your banking dashboard safely
            </p>
          </div>

          {/* ── FORM ─────────────────────────────────────────── */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

            {/* Email field */}
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

            {/* Password field */}
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
              {/* Eye toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[34px] sm:top-[38px] text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Remember Me + Forgot Password */}
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

            {/* Login button */}
            <button
              type="submit"
              className={buttonClass}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* ── REGISTER LINK ────────────────────────────────── */}
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
    </>
  );
}