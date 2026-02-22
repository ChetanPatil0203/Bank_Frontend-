import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=JetBrains+Mono:wght@500;600&display=swap');

  .splash-texture {
    background: linear-gradient(135deg, #1e3a7b 0%, #152d68 50%, #0f1f4d 100%);
    background-image:
      repeating-linear-gradient(
        110deg,
        transparent, transparent 28px,
        rgba(255,255,255,0.018) 28px,
        rgba(255,255,255,0.018) 29px
      ),
      linear-gradient(135deg, #1e3a7b 0%, #152d68 50%, #0f1f4d 100%);
  }
  .splash-glow-tr  { background: radial-gradient(circle, rgba(100,160,255,0.22) 0%, transparent 65%); }
  .splash-glow-bl  { background: radial-gradient(circle, rgba(10,42,102,0.55)   0%, transparent 70%); }
  .splash-glow-ctr { background: radial-gradient(circle, rgba(77,126,255,0.16)  0%, transparent 60%); }

  .splash-logo-icon {
    background: linear-gradient(135deg, #4d7eff 0%, #6366f1 100%);
    box-shadow:
      0 0 0 8px  rgba(77,126,255,0.13),
      0 0 0 16px rgba(77,126,255,0.06),
      0 20px 60px rgba(77,126,255,0.52),
      0 8px  24px rgba(0,0,0,0.45);
  }

  .logo-shimmer {
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%);
    animation: logoShimmer 2.8s ease-in-out infinite;
  }

  .rotate-ring   {
    border: 1px solid transparent;
    border-top-color:   rgba(77,126,255,0.55);
    border-right-color: rgba(77,126,255,0.22);
    animation: rotateRing 3s linear infinite;
  }
  .rotate-ring-2 {
    border: 1px solid transparent;
    border-bottom-color: rgba(163,139,250,0.42);
    border-left-color:   rgba(163,139,250,0.16);
    animation: rotateRing 5s linear infinite reverse;
  }

  .ring-pulse-1 { border: 1.5px solid rgba(77,126,255,0.38); animation: ringExpand 2.4s ease-out         infinite; }
  .ring-pulse-2 { border: 1.5px solid rgba(77,126,255,0.22); animation: ringExpand 2.4s ease-out 0.8s   infinite; }
  .ring-pulse-3 { border: 1.5px solid rgba(77,126,255,0.11); animation: ringExpand 2.4s ease-out 1.6s   infinite; }

  .particle { background: rgba(255,255,255,0.55); border-radius: 50%; animation: floatUp linear infinite; }
  .p1 { width:3px; height:3px; left:15%; animation-duration:6s;   animation-delay:0s;   }
  .p2 { width:2px; height:2px; left:28%; animation-duration:8s;   animation-delay:1.2s; }
  .p3 { width:4px; height:4px; left:45%; animation-duration:5s;   animation-delay:0.6s; }
  .p4 { width:2px; height:2px; left:62%; animation-duration:7s;   animation-delay:2.0s; }
  .p5 { width:3px; height:3px; left:78%; animation-duration:6.5s; animation-delay:0.4s; }
  .p6 { width:2px; height:2px; left:88%; animation-duration:9s;   animation-delay:1.8s; }

  .progress-fill {
    background: linear-gradient(90deg, #4d7eff 0%, #a78bfa 50%, #4d7eff 100%);
    background-size: 200% 100%;
    animation: progressGlow 1.5s ease-in-out infinite;
  }
  .tagline-shimmer {
    background: linear-gradient(90deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.45) 100%);
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
  @keyframes dot1    { 0%,80%,100%{transform:scale(.6);opacity:.3} 40%{transform:scale(1.1);opacity:1} }
  @keyframes dot2    { 0%,80%,100%{transform:scale(.6);opacity:.3} 40%{transform:scale(1.1);opacity:1} }
  @keyframes dot3    { 0%,80%,100%{transform:scale(.6);opacity:.3} 40%{transform:scale(1.1);opacity:1} }

  .anim-logo  { animation: logoIn  .80s cubic-bezier(.34,1.4,.64,1) .30s both; }
  .anim-name  { animation: nameIn  .65s cubic-bezier(.34,1.2,.64,1) 1.00s both; }
  .anim-tag   { animation: tagIn   .55s ease 1.45s both; }
  .anim-dots  { animation: dotsIn  .55s ease 1.80s both; }
  .anim-bar   { animation: dotsIn  .55s ease 1.90s both; }
  .dot-1 { animation: dot1 1.4s ease-in-out 2.1s infinite; }
  .dot-2 { animation: dot2 1.4s ease-in-out 2.3s infinite; }
  .dot-3 { animation: dot3 1.4s ease-in-out 2.5s infinite; }
`;

export default function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLES;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    let val = 0;
    const timer = setInterval(() => {
      val += 1.4;
      setProgress(Math.min(val, 100));
      if (val >= 100) { clearInterval(timer); setTimeout(() => navigate("/registration"), 300); }
    }, 40);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden
                    bg-gradient-to-br from-[#021029] via-[#051e47] to-[#0A2A66]
                    splash-texture"
         style={{ fontFamily:"'Sora',sans-serif", zIndex:9999 }}>

      {/* ── Ambient glows ── */}
      <div className="splash-glow-tr absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none" />
      <div className="splash-glow-bl absolute -bottom-20 -left-20 w-[440px] h-[440px] rounded-full pointer-events-none" />
      <div className="splash-glow-ctr absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" />

      {/* ── Floating particles ── */}
      {["p1","p2","p3","p4","p5","p6"].map(cls => (
        <div key={cls} className={`particle ${cls} absolute bottom-0`} />
      ))}

      {/* ── CENTER CONTENT ── */}
      <div className="flex flex-col items-center select-none">

        {/* Rings + Logo */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="rotate-ring   absolute w-[140px] h-[140px] rounded-full" />
          <div className="rotate-ring-2 absolute w-[165px] h-[165px] rounded-full" />
          <div className="ring-pulse-1  absolute w-[110px] h-[110px] rounded-full" />
          <div className="ring-pulse-2  absolute w-[110px] h-[110px] rounded-full" />
          <div className="ring-pulse-3  absolute w-[110px] h-[110px] rounded-full" />

          <div className="anim-logo splash-logo-icon relative w-[90px] h-[90px] rounded-[24px] flex items-center justify-center overflow-hidden">
            <Wallet size={42} color="#ffffff" strokeWidth={1.8} />
            <div className="logo-shimmer absolute top-0 left-0 w-[50%] h-full pointer-events-none" />
          </div>
        </div>

        {/* App name */}
        <h1 className="anim-name text-[42px] font-black text-white tracking-[0.06em] leading-none mb-3"
            style={{ textShadow:"0 4px 32px rgba(77,126,255,0.55), 0 2px 8px rgba(0,0,0,0.40)" }}>
          PayZen
        </h1>

        {/* Tagline */}
        <p className="anim-tag tagline-shimmer text-[13px] font-semibold tracking-[0.22em] uppercase mb-10">
          Secure · Smart · Banking
        </p>

        {/* Loading dots */}
        <div className="anim-dots flex items-center gap-2 mb-6">
          <div className="dot-1 w-2 h-2 rounded-full bg-white" />
          <div className="dot-2 w-2 h-2 rounded-full bg-white" />
          <div className="dot-3 w-2 h-2 rounded-full bg-white" />
        </div>

        {/* Progress bar */}
        <div className="anim-bar w-48 h-[3px] rounded-full overflow-hidden bg-white/[.12]">
          <div className="progress-fill h-full rounded-full transition-all duration-100 ease-linear"
               style={{ width:`${progress}%` }} />
        </div>

        {/* % counter */}
        <p className="anim-bar mt-3 text-[11px] font-semibold text-white/30 tracking-[0.16em]"
           style={{ fontFamily:"'JetBrains Mono',monospace" }}>
          {Math.round(progress)}%
        </p>
      </div>

      {/* Bottom brand */}
      <div className="absolute bottom-8 text-center flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[.06] border border-white/[.10]">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
               style={{ boxShadow:"0 0 6px rgba(52,211,153,0.8)" }} />
          <p className="text-[10px] text-white/40 tracking-[0.18em] uppercase font-semibold">
            256-bit SSL Secured
          </p>
        </div>
        <p className="text-[10px] text-white/20 tracking-[0.16em] uppercase font-medium">
          State Bank Of India · Powered by PayZen
        </p>
      </div>

    </div>
  );
}