import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {

  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const speechRef = useRef(null);

  /* SCREEN SIZE DETECT */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* VOICE */
  useEffect(() => {
    const speak = () => {
      if ("speechSynthesis" in window) {
        const msg = new SpeechSynthesisUtterance("Welcome to PayZen Bank");
        const voices = window.speechSynthesis.getVoices();
        msg.voice = voices.find(v => v.lang === "en-US");
        msg.rate = 0.95;
        msg.pitch = 1.15;
        speechRef.current = msg;
        window.speechSynthesis.speak(msg);
      }
    };
    setTimeout(speak, 1000);
    return () => window.speechSynthesis.cancel();
  }, []);

  /* PROGRESS */
  useEffect(() => {
    let val = 0;
    const timer = setInterval(() => {
      val += 1.5;
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

  /* RESPONSIVE VALUES */
  const orbit1 = isMobile ? 260 : 360;
  const orbit2 = isMobile ? 200 : 270;
  const orbit3 = isMobile ? 140 : 185;
  const titleSize = isMobile ? 42 : 62;
  const logoSize = isMobile ? 70 : 100;
  const progressWidth = isMobile ? 180 : 220;

  /* PARTICLES — exact same as LoginPage */
  const pts = [
    { s: 3, t: "8%",  l: "5%",  c: "#60a5fa", d: "3.2s", dl: "0s" },
    { s: 2, t: "20%", l: "88%", c: "#a78bfa", d: "2.8s", dl: "0.7s" },
    { s: 4, t: "65%", l: "8%",  c: "#38bdf8", d: "3.5s", dl: "1.2s" },
    { s: 2, t: "82%", l: "80%", c: "#818cf8", d: "2.3s", dl: "0.4s" },
    { s: 3, t: "42%", l: "2%",  c: "#22d3ee", d: "3.8s", dl: "1.8s" },
    { s: 2, t: "10%", l: "50%", c: "#a78bfa", d: "2.6s", dl: "0.9s" },
    { s: 3, t: "92%", l: "35%", c: "#60a5fa", d: "3.1s", dl: "1.5s" },
    { s: 2, t: "30%", l: "92%", c: "#22d3ee", d: "2.9s", dl: "0.2s" },
    { s: 4, t: "55%", l: "96%", c: "#38bdf8", d: "3.3s", dl: "2.1s" },
    { s: 2, t: "75%", l: "52%", c: "#c084fc", d: "2.7s", dl: "0.6s" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "Georgia, serif",
      padding: isMobile ? 20 : 0,
    }}>

      <style>{`
        @keyframes ptFloat   { 0%,100%{transform:translateY(0) scale(1);opacity:.2} 50%{transform:translateY(-18px) scale(1.6);opacity:.9} }
        @keyframes hexFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes ambPulse  { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes orbitSpin { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes shimmer   { 0%{background-position:0% center} 100%{background-position:200% center} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes logoIn    { from{opacity:0;transform:scale(.88) translateY(18px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes ulGrow    { from{width:0} to{width:200px} }
        @keyframes titleIn   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* ── BACKGROUND LAYER 1: Base gradient — exact same as LoginPage GridBackground ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #03071e 0%, #05103a 40%, #0a0a2e 70%, #03071e 100%)"
        }} />

        {/* Radial color blobs — exact same */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse 70% 50% at 20% 50%, rgba(29,78,216,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 50% 70% at 80% 20%, rgba(109,40,217,0.18) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 60% 85%, rgba(6,182,212,0.1) 0%, transparent 50%)`
        }} />

        {/* Dot grid — exact same */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }} />

        {/* Scanlines — exact same */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,50,255,0.015) 2px, rgba(0,50,255,0.015) 4px)",
          mixBlendMode: "screen"
        }} />
      </div>

      {/* ── PARTICLES — exact same as LoginPage Particles ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        {pts.map((p, i) => (
          <div key={i} style={{
            position: "absolute", borderRadius: "50%",
            width: p.s, height: p.s, top: p.t, left: p.l,
            background: p.c, boxShadow: `0 0 ${p.s * 3}px ${p.c}`,
            animation: `ptFloat ${p.d} ease-in-out infinite ${p.dl}`,
          }} />
        ))}
      </div>

      {/* ── CENTER CONTENT ── */}
      <div style={{
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}>

        {/* Ambient glow behind orbits */}
        <div style={{
          position: "absolute",
          width: isMobile ? 340 : 480,
          height: isMobile ? 340 : 480,
          borderRadius: "50%",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(109,40,217,0.12) 40%, transparent 70%)",
          filter: "blur(40px)",
          animation: "ambPulse 6s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        {/* ORBITS — exact same style as LoginPage BrandPanel */}
        {[
          { sz: orbit1, spd: 24, rev: false, dot: 9, dc: "#38bdf8", bc: "rgba(56,189,248,0.12)" },
          { sz: orbit2, spd: 17, rev: true,  dot: 7, dc: "#a78bfa", bc: "rgba(167,139,250,0.12)" },
          { sz: orbit3, spd: 11, rev: false,  dot: 5, dc: "#22d3ee", bc: "rgba(34,211,238,0.15)" },
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

        {/* LOGO — exact same SVG as LoginPage BrandPanel */}
        <div style={{ position: "relative", marginBottom: 28, animation: "hexFloat 5s ease-in-out infinite, logoIn 1s cubic-bezier(.16,1,.3,1) both 0.2s" }}>
          <div style={{
            position: "absolute", inset: -18, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.6) 0%, transparent 65%)",
            filter: "blur(18px)", animation: "ambPulse 3s ease-in-out infinite",
          }} />
          <svg width={logoSize} height={logoSize} viewBox="0 0 100 100" fill="none">
            <path d="M50 4 L90 26 L90 74 L50 96 L10 74 L10 26 Z" fill="rgba(29,78,216,0.2)" stroke="url(#hs_sp)" strokeWidth="1.5" />
            <path d="M50 16 L80 32 L80 68 L50 84 L20 68 L20 32 Z" fill="rgba(37,99,235,0.1)" stroke="rgba(56,189,248,0.35)" strokeWidth="1" />
            <text x="50" y="63" fontFamily="Georgia,serif" fontSize="34" fontWeight="900" fill="url(#tg_sp)" textAnchor="middle">P</text>
            {[[50,4],[90,26],[90,74],[50,96],[10,74],[10,26]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(56,189,248,0.9)" />
            ))}
            <defs>
              <linearGradient id="hs_sp" x1="10" y1="4" x2="90" y2="96" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(56,189,248,0.9)" />
                <stop offset="50%" stopColor="rgba(129,140,248,0.6)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0.9)" />
              </linearGradient>
              <linearGradient id="tg_sp" x1="0" y1="0" x2="0" y2="70" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="100%" stopColor="rgba(56,189,248,0.85)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* TITLE — exact same font/gradient as LoginPage BrandPanel */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 4, opacity: 0, animation: "titleIn 0.8s cubic-bezier(.16,1,.3,1) forwards 0.9s" }}>
          <span style={{
            fontFamily: "'Georgia', serif",
            fontSize: titleSize,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: -3,
            lineHeight: 1,
            textShadow: "0 0 40px rgba(255,255,255,0.15)",
          }}>Pay</span>
          <span style={{
            fontFamily: "'Georgia', serif",
            fontSize: titleSize,
            fontWeight: 900,
            letterSpacing: -3,
            lineHeight: 1,
            background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 45%, #38bdf8 90%)",
            backgroundSize: "200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 3s linear infinite",
          }}>Zen</span>
        </div>

        {/* Divider line — LoginPage ulGrow animation */}
        <div style={{
          height: 3, borderRadius: 99, margin: "10px auto 20px",
          background: "linear-gradient(90deg, #2563eb, #38bdf8, #818cf8, #38bdf8, #2563eb)",
          backgroundSize: "200%",
          animation: "ulGrow 0.9s cubic-bezier(.22,1,.36,1) forwards 1.5s, shimmer 3s linear infinite 2s",
          width: 0,
        }} />

        {/* Tagline labels — staggered fadeUp like BrandPanel */}
        <p style={{
          fontSize: 11, fontWeight: 500, letterSpacing: "0.3em",
          textTransform: "uppercase", color: "rgba(180,210,255,0.35)", marginBottom: 10,
          opacity: 0, animation: "fadeUp 0.7s ease forwards 1.8s",
        }}>Private Banking</p>

        <p style={{
          fontSize: isMobile ? 12 : 14,
          fontWeight: 300,
          textAlign: "center",
          lineHeight: 1.8,
          maxWidth: 240,
          color: "rgba(180,210,255,0.5)",
          margin: "0 0 6px",
          opacity: 0, animation: "fadeUp 0.7s ease forwards 2s",
        }}>
          Secure, intelligent banking <br />
          always at your fingertips.
        </p>

        <p style={{
          fontSize: 10, fontWeight: 500, letterSpacing: "0.28em",
          textTransform: "uppercase", color: "rgba(100,160,255,0.35)",
          whiteSpace: "nowrap", marginBottom: 28,
          opacity: 0, animation: "fadeUp 0.7s ease forwards 2.1s",
        }}>Secure · Smart · Banking</p>

        {/* PROGRESS BAR */}
        <div style={{
          width: progressWidth, height: 4,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 50, overflow: "hidden",
          border: "1px solid rgba(99,102,241,0.2)",
          opacity: 0, animation: "fadeUp 0.7s ease forwards 2.3s",
        }}>
          <div style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #3b82f6, #818cf8, #38bdf8)",
            backgroundSize: "200%",
            animation: "shimmer 2s linear infinite",
            borderRadius: 50,
            transition: "width 0.04s linear",
          }} />
        </div>

        <p style={{
          marginTop: 8,
          fontSize: 11,
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.05em",
        }}>
          {Math.round(progress)}%
        </p>

      </div>
    </div>
  );
}