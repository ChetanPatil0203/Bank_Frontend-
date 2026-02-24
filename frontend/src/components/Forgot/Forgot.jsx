import { useState, useRef, useEffect } from "react";
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
      `}</style>

      <div className="pzl-fixed">
        <div className={`pzl-wrap ${on ? "on" : ""}`}>

          {/* ICON */}
          <div className="pzl-icon-block" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="pzl-glow" />
            <div className="pzl-card" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="pzl-card-texture" />
              <div className="pzl-corner-dot" />
              <svg viewBox="0 0 32 32" fill="none" style={{ width: 30, height: 30, position: "relative", zIndex: 3 }}>
                <path
                  d="M16 2 L28 8.5 L28 23.5 L16 30 L4 23.5 L4 8.5 Z"
                  fill="rgba(255,255,255,0.07)"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1"
                />
                <circle cx="16" cy="16" r="7" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
                <path
                  d="M13.5 12.5 L13.5 19.5 M13.5 12.5 L17 12.5 Q19.5 12.5 19.5 14.5 Q19.5 16.5 17 16.5 L13.5 16.5"
                  stroke="white"
                  strokeWidth="1.8"
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
   FORGOT PASSWORD PAGE
═══════════════════════════════════════════════════════════ */
export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const otpRefs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  return (
    <>
      {/* ✅ Same PayZen Logo as Registration & Login */}
      <PayZenLogo />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#081F4A] to-[#0E2E6D]">

        {/* CARD */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md text-white">

          {/* TITLE */}
          <h2 className="text-2xl font-bold text-center mb-1">Forgot Password</h2>
          <p className="text-center text-white/60 text-sm mb-6">Reset your account securely</p>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="flex flex-col gap-1 mb-4">
                <label className="text-sm font-medium text-white/80">
                  Email / Mobile Number <span className="text-red-400 font-bold">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Email / Mobile"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-xl bg-[#6F5FE7] hover:bg-[#5b4ec2] text-white font-semibold shadow-lg transition active:scale-[0.98]"
              >
                Send OTP
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="flex flex-col gap-1 mb-6">
                <label className="text-sm font-medium text-white/80 text-center mb-3">
                  Enter OTP <span className="text-red-400 font-bold">*</span>
                </label>
                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={otpRefs[index]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-14 h-14 text-center text-2xl font-bold bg-white/10 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                    />
                  ))}
                </div>
                <p className="text-center text-white/50 text-xs mt-3">
                  OTP sent to {email || "your registered contact"}
                </p>
              </div>
              <button
                onClick={() => setStep(3)}
                className="w-full py-3 rounded-xl bg-[#6F5FE7] hover:bg-[#5b4ec2] text-white font-semibold shadow-lg transition active:scale-[0.98]"
              >
                Verify OTP
              </button>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="flex flex-col gap-1 mb-4">
                <label className="text-sm font-medium text-white/80">
                  New Password <span className="text-red-400 font-bold">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-white/80">
                  Confirm Password <span className="text-red-400 font-bold">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Re-enter New Password"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  alert("Password Reset Successful ✅");
                  navigate("/login");
                }}
                className="w-full py-3 rounded-xl bg-[#6F5FE7] hover:bg-[#5b4ec2] text-white font-semibold shadow-lg transition active:scale-[0.98]"
              >
                Reset Password
              </button>
            </>
          )}

          {/* BACK CONTROLS */}
          <div className="flex justify-between mt-5 text-sm text-white/70">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="hover:text-white">
                ← Back
              </button>
            ) : (
              <span></span>
            )}
            {step === 1 && (
              <button onClick={() => navigate("/login")} className="hover:text-white">
                ← Back to Login
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  );
}