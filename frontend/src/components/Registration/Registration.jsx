import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════
   PAYZEN PREMIUM LOGO — Top Left, Large Icon, Unique Design
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

        /* ─── Fixed top-left container ─── */
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

        
        /* ─── ICON BLOCK ─── */
        .pzl-icon-block {
          position: relative;
          width: 58px;
          height: 58px;
          margin-bottom: 10px;
        }

      
        /* Glow blob behind icon */
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

        /* Main icon card */
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

        /* Diagonal stripe texture inside card */
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


        /* Corner accent dot */
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

        /* ─── NAME BLOCK ─── */
        .pzl-name-block {
          display: flex;
          flex-direction: column;
          gap: 1px;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.45s ease 0.35s, transform 0.45s ease 0.35s;
        }
        .pzl-wrap.on .pzl-name-block { opacity: 1; transform: translateX(0); }

        /* Logo text */
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

        /* Underline accent */
        .pzl-underline {
          height: 2px;
          width: 0;
          border-radius: 99px;
          background: linear-gradient(90deg, #3b82f6, #a78bfa);
          transition: width 0.6s cubic-bezier(.22,1,.36,1) 0.55s;
          margin-top: 3px;
        }
        .pzl-wrap.on .pzl-underline { width: 100%; }

        /* Tagline */
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

        /* ─── Page content push ─── */
        .pzl-page { padding-top: 0; }
      `}</style>

      <div className="pzl-fixed">
        <div className={`pzl-wrap ${on ? "on" : ""}`}>

    {/* ICON */}
<div
  className="pzl-icon-block"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}
>

  <div className="pzl-orbit" />

  <div
    className="pzl-card"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <div className="pzl-card-texture" />
    <div className="pzl-shimmer" />

    {/* Unique icon */}
    <svg className="pzl-svg" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2 L28 8.5 L28 23.5 L16 30 L4 23.5 L4 8.5 Z"
        fill="rgba(255,255,255,0.07)"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
      />
      <circle
        cx="16"
        cy="16"
        r="7"
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

/* ═══════════════════════════════════════════════════════════
   REGISTRATION PAGE — original code, only logo added
═══════════════════════════════════════════════════════════ */
export default function RegistrationPage() {
  const navigate = useNavigate();

  const inputClass =
    "w-full bg-white/5 text-white text-sm border border-white/10 rounded-xl px-4 py-3.5 " +
    "placeholder:text-zinc-400 transition-all duration-300 " +
    "outline-none focus:outline-none focus:ring-0 " +
    "focus:border-[#3B82F6]";

  const labelClass = "text-xs font-medium text-zinc-400 ml-1 mb-1 block";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters ⚠️");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Password & Confirm Password mismatch ❌");
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.find((user) => user.email === formData.email);
    if (userExists) {
      setError("This email is already registered! Please login instead.");
      return;
    }
    existingUsers.push(formData);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    alert("Registration Successful ✅");
    navigate("/dashboard");
  };

  return (
    <>
      {/* ✅ Premium Top-Left Logo */}
      <PayZenLogo />

      <div className="min-h-screen bg-gradient-to-br from-[#021029] via-[#051e47] to-[#0A2A66] flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Registration</h2>
            <p className="text-zinc-400 text-sm mt-2">
              Fill All Details Carefully To Register
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input label="Full Name" name="name" handleChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
              <Input label="Email Address" name="email" type="email" handleChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input label="Mobile Number" name="mobile" handleChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
              <div>
                <label className={labelClass}>
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="" className="text-black">Select Gender</option>
                  <option value="Male" className="text-black">Male</option>
                  <option value="Female" className="text-black">Female</option>
                  <option value="Other" className="text-black">Other</option>
                </select>
              </div>
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <label className={labelClass}>
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[38px] text-gray-400 hover:text-white"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              <div className="relative">
                <label className={labelClass}>
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Confirm Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-[38px] text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-center pt-3">
              <button
                type="submit"
                className="w-full md:w-72 bg-[#6F5FE7] hover:bg-[#5b4ec2] text-white font-semibold rounded-xl py-3.5 transition-all transform active:scale-[0.98] shadow-lg"
              >
                Register
              </button>
            </div>

          </form>

          {/* Login */}
          <div className="mt-6 text-center">
            <p className="text-zinc-400 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#6F5FE7] font-semibold"
              >
                Login here
              </button>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

/* ------------------ REUSABLE INPUT (unchanged) ------------------ */
function Input({ label, name, handleChange, type = "text", inputClass, labelClass }) {
  return (
    <div>
      <label className={labelClass}>
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        className={inputClass}
        placeholder={label}
        required
      />
    </div>
  );
}