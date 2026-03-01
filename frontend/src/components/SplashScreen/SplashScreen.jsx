import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');

  /* ── Background texture ── */
  .splash-texture {
    background: linear-gradient(135deg, #021029 0%, #051e47 50%, #0A2A66 100%);
    background-image:
      repeating-linear-gradient(
        110deg,
        transparent, transparent 28px,
        rgba(255,255,255,0.018) 28px,
        rgba(255,255,255,0.018) 29px
      ),
      linear-gradient(135deg, #021029 0%, #051e47 50%, #0A2A66 100%);
  }

  /* ── Ambient glows ── */
  .splash-glow-tr  { background: radial-gradient(circle, rgba(100,160,255,0.22) 0%, transparent 65%); }
  .splash-glow-bl  { background: radial-gradient(circle, rgba(10,42,102,0.55)   0%, transparent 70%); }
  .splash-glow-ctr { background: radial-gradient(circle, rgba(77,126,255,0.16)  0%, transparent 60%); }

  /* ── Logo card — exactly like screenshot ── */
  .splash-logo-card {
    width: 110px;
    height: 110px;
    border-radius: 28px;
    background: linear-gradient(145deg, #1a2e6b 0%, #1e40af 45%, #2563eb 100%);
    box-shadow:
      0 0 0 1px  rgba(99,102,241,0.5),
      0 0 0 8px  rgba(77,126,255,0.13),
      0 0 0 16px rgba(77,126,255,0.06),
      0 20px 60px rgba(77,126,255,0.52),
      0 8px  24px rgba(0,0,0,0.45),
      inset 0 1px 0 rgba(255,255,255,0.12),
      inset 0 -1px 0 rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  /* Diagonal stripe texture inside card */
  .splash-card-texture {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -55deg,
      transparent,
      transparent 6px,
      rgba(255,255,255,0.025) 6px,
      rgba(255,255,255,0.025) 12px
    );
    border-radius: 28px;
  }

  /* Shimmer sweep */
  .logo-shimmer {
    position: absolute;
    top: 0; left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%);
    animation: logoShimmer 2.8s ease-in-out infinite;
  }

  /* ── Rotating rings ── */
  .rotate-ring {
    border: 1.5px solid transparent;
    border-top-color:   rgba(77,126,255,0.55);
    border-right-color: rgba(77,126,255,0.22);
    animation: rotateRing 3s linear infinite;
  }
  .rotate-ring-2 {
    border: 1.5px solid transparent;
    border-bottom-color: rgba(163,139,250,0.42);
    border-left-color:   rgba(163,139,250,0.16);
    animation: rotateRing 5s linear infinite reverse;
  }

  /* ── Pulse rings ── */
  .ring-pulse-1 { border: 1.5px solid rgba(77,126,255,0.38); animation: ringExpand 2.4s ease-out         infinite; }
  .ring-pulse-2 { border: 1.5px solid rgba(77,126,255,0.22); animation: ringExpand 2.4s ease-out 0.8s   infinite; }
  .ring-pulse-3 { border: 1.5px solid rgba(77,126,255,0.11); animation: ringExpand 2.4s ease-out 1.6s   infinite; }

  /* ── Particles ── */
  .particle { background: rgba(255,255,255,0.55); border-radius: 50%; animation: floatUp linear infinite; position: absolute; bottom: 0; }
  .p1 { width:3px; height:3px; left:15%; animation-duration:6s;   animation-delay:0s;   }
  .p2 { width:2px; height:2px; left:28%; animation-duration:8s;   animation-delay:1.2s; }
  .p3 { width:4px; height:4px; left:45%; animation-duration:5s;   animation-delay:0.6s; }
  .p4 { width:2px; height:2px; left:62%; animation-duration:7s;   animation-delay:2.0s; }
  .p5 { width:3px; height:3px; left:78%; animation-duration:6.5s; animation-delay:0.4s; }
  .p6 { width:2px; height:2px; left:88%; animation-duration:9s;   animation-delay:1.8s; }

  /* ── Progress bar ── */
  .progress-fill {
    background: linear-gradient(90deg, #3b82f6 0%, #a78bfa 50%, #3b82f6 100%);
    background-size: 200% 100%;
    animation: progressGlow 1.5s ease-in-out infinite;
  }

  /* ── PayZen name gradient ── */
  .pz-zen {
    background: linear-gradient(90deg, #38bdf8, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .pz-pay { color: #f8fafc; }

  /* ── Tagline shimmer ── */
  .tagline-shimmer {
    background: linear-gradient(90deg,
      rgba(255,255,255,0.45) 0%,
      rgba(255,255,255,0.85) 50%,
      rgba(255,255,255,0.45) 100%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShimmer 3s ease-in-out infinite;
  }

  /* ── KEYFRAMES ── */
  @keyframes rotateRing   { to { transform: rotate(360deg); } }
  @keyframes ringExpand   { 0%{transform:scale(1);opacity:.9} 100%{transform:scale(3.2);opacity:0} }
  @keyframes logoShimmer  { 0%{transform:translateX(-120%) skewX(-12deg)} 100%{transform:translateX(250%) skewX(-12deg)} }
  @keyframes floatUp      { 0%{transform:translateY(100vh) scale(0);opacity:0} 10%{opacity:1} 90%{opacity:.6} 100%{transform:translateY(-10vh) scale(1);opacity:0} }
  @keyframes progressGlow { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes textShimmer  { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

  @keyframes logoIn  { 0%{opacity:0;transform:scale(.4) rotate(-12deg)} 60%{transform:scale(1.12) rotate(3deg)} 80%{transform:scale(.96) rotate(-1deg)} 100%{opacity:1;transform:scale(1) rotate(0deg)} }
  @keyframes nameIn  { 0%{opacity:0;transform:translateY(28px) scale(.92)} 100%{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes tagIn   { 0%{opacity:0;transform:translateY(16px)} 100%{opacity:1;transform:translateY(0)} }
  @keyframes dotsIn  { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }
  @keyframes glowDot { 0%,100%{opacity:0.3;transform:scale(0.6)} 50%{opacity:1;transform:scale(1.1)} }

  /* ── Underline draw ── */
  @keyframes underlineDraw { 0%{width:0} 100%{width:100%} }

  .anim-logo      { animation: logoIn  .80s cubic-bezier(.34,1.4,.64,1) .30s both; }
  .anim-name      { animation: nameIn  .65s cubic-bezier(.34,1.2,.64,1) 1.00s both; }
  .anim-tag       { animation: tagIn   .55s ease 1.45s both; }
  .anim-dots      { animation: dotsIn  .55s ease 1.80s both; }
  .anim-bar       { animation: dotsIn  .55s ease 1.90s both; }
  .anim-underline { animation: underlineDraw .6s cubic-bezier(.22,1,.36,1) 1.55s both; }

  .dot-1 { animation: glowDot 1.4s ease-in-out 2.1s infinite; }
  .dot-2 { animation: glowDot 1.4s ease-in-out 2.3s infinite; }
  .dot-3 { animation: glowDot 1.4s ease-in-out 2.5s infinite; }

  /* ── Corner dot blink on logo ── */
  @keyframes dotBlink { 0%,100%{opacity:1;box-shadow:0 0 6px #22d3ee} 50%{opacity:0.5;box-shadow:0 0 12px #22d3ee} }
  .corner-dot { animation: dotBlink 2.2s ease-in-out infinite; }
`;


export default function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const speechRef = useRef(null);

  /* ---------------- STYLE INJECTION ---------------- */
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLES;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  /* ---------------- FEMALE AI VOICE ---------------- */
  useEffect(() => {
    const speakWelcome = () => {
      if ("speechSynthesis" in window) {
        const message = new SpeechSynthesisUtterance(
          "Welcome to PayZen Bank"
        );

        const voices = window.speechSynthesis.getVoices();
        const femaleVoice =
          voices.find(v => v.name.toLowerCase().includes("female")) ||
          voices.find(v => v.lang === "en-US");

        if (femaleVoice) {
          message.voice = femaleVoice;
        }

        message.rate = 0.95;
        message.pitch = 1.15;
        message.volume = 1;

        speechRef.current = message;
        window.speechSynthesis.speak(message);
      }
    };

    setTimeout(speakWelcome, 1000);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  /* ---------------- PROGRESS + NAVIGATION ---------------- */
  useEffect(() => {
    let val = 0;

    const timer = setInterval(() => {
      val += 1.4;
      setProgress(Math.min(val, 100));

      if (val >= 100) {
        clearInterval(timer);

        setTimeout(() => {
          window.speechSynthesis.cancel();
          navigate("/registration");
        }, 500);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [navigate]);

   return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden splash-texture"
      style={{ fontFamily: "'Syne', sans-serif", zIndex: 9999 }}
    >

      {/* ── Ambient glows ── */}
      <div className="splash-glow-tr  absolute -top-24    -right-24  w-[500px] h-[500px] rounded-full pointer-events-none" />
      <div className="splash-glow-bl  absolute -bottom-20 -left-20   w-[440px] h-[440px] rounded-full pointer-events-none" />
      <div className="splash-glow-ctr absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" />

      {/* ── Floating particles ── */}
      {["p1","p2","p3","p4","p5","p6"].map(cls => (
        <div key={cls} className={`particle ${cls}`} />
      ))}

      {/* ── CENTER CONTENT ── */}
      <div className="flex flex-col items-center select-none">

        {/* ── Logo with rings ── */}
        <div className="relative flex items-center justify-center mb-10">

          {/* Rotating rings */}
          <div className="rotate-ring   absolute w-[160px] h-[160px] rounded-full" />
          <div className="rotate-ring-2 absolute w-[188px] h-[188px] rounded-full" />

          {/* Pulse rings */}
          <div className="ring-pulse-1  absolute w-[130px] h-[130px] rounded-full" />
          <div className="ring-pulse-2  absolute w-[130px] h-[130px] rounded-full" />
          <div className="ring-pulse-3  absolute w-[130px] h-[130px] rounded-full" />

          {/* Logo card — exactly like screenshot */}
          <div className="anim-logo splash-logo-card">

            {/* Stripe texture */}
            <div className="splash-card-texture" />

            {/* Shimmer sweep */}
            <div className="logo-shimmer" />

            {/* Hexagon + P icon — exactly like screenshot */}
            <svg
              viewBox="0 0 56 56"
              fill="none"
              style={{ width: 56, height: 56, position: "relative", zIndex: 3 }}
            >
              {/* Outer hexagon */}
              <path
                d="M28 4 L50 16 L50 40 L28 52 L6 40 L6 16 Z"
                fill="rgba(255,255,255,0.07)"
                stroke="rgba(255,255,255,0.30)"
                strokeWidth="1.2"
              />

              {/* Inner circle */}
              <circle
                cx="28" cy="28" r="13"
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.2"
              />

              {/* P letter — bold, centered */}
              <text
                x="28"
                y="34"
                textAnchor="middle"
                fill="white"
                fontSize="16"
                fontWeight="800"
                fontFamily="Syne, sans-serif"
                style={{ letterSpacing: "-0.5px" }}
              >
                P
              </text>
            </svg>
          </div>
        </div>

        {/* ── PayZen name — exactly like screenshot ── */}
        <div className="anim-name flex flex-col items-center mb-1">
          <h1
            className="text-[52px] font-black leading-none tracking-[-1px]"
            style={{ textShadow: "0 4px 32px rgba(77,126,255,0.55), 0 2px 8px rgba(0,0,0,0.40)" }}
          >
            <span className="pz-pay">Pay</span>
            <span className="pz-zen">Zen</span>
          </h1>

          {/* Gradient underline — draws in */}
          <div
            className="anim-underline h-[3px] rounded-full mt-2"
            style={{
              background: "linear-gradient(90deg, #3b82f6, #a78bfa)",
              width: "100%",
            }}
          />
        </div>

        {/* ── Tagline ── */}
        <p className="anim-tag tagline-shimmer text-[11px] font-semibold tracking-[0.28em] uppercase mt-3 mb-10"
           style={{ fontFamily: "'DM Sans', sans-serif" }}>
          SECURE · SMART · BANKING
        </p>

        {/* ── Loading dots ── */}
        <div className="anim-dots flex items-center gap-2.5 mb-5">
          <div className="dot-1 w-2 h-2 rounded-full bg-white" />
          <div className="dot-2 w-2 h-2 rounded-full bg-white" />
          <div className="dot-3 w-2 h-2 rounded-full bg-white" />
        </div>

        {/* ── Progress bar ── */}
        <div className="anim-bar w-52 h-[3px] rounded-full overflow-hidden bg-white/10">
          <div
            className="progress-fill h-full rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* ── % counter ── */}
        <p
          className="anim-bar mt-2.5 text-[11px] font-semibold text-white/30 tracking-[0.16em]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {Math.round(progress)}%
        </p>

      </div>

      {/* ── Bottom brand badge ── */}
      <div className="absolute bottom-8 text-center flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[.06] border border-white/[.10]">
          <div
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }}
          />
          <p className="text-[10px] text-white/40 tracking-[0.18em] uppercase font-semibold"
             style={{ fontFamily: "'DM Sans', sans-serif" }}>
            256-bit SSL Secured
          </p>
        </div>
        <p className="text-[10px] text-white/20 tracking-[0.16em] uppercase font-medium"
           style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Powered by PayZen Banking
        </p>
      </div>

    </div>
  );
}