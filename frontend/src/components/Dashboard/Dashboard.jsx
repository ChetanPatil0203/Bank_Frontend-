import {
  LayoutDashboard,
  UserCheck,
  Wallet,
  LogOut,
  CircleUserRound,
  ArrowLeftRight,
  Headphones,
  BadgeCheckIcon,
  Landmark,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   PAYZEN LOGO — Same as Login / Registration / Forgot
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
   SIDEBAR
═══════════════════════════════════════════════════════════ */
function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard",           icon: <LayoutDashboard size={23} />, path: "/dashboard" },
    { name: "My Profile",          icon: <CircleUserRound size={23} />, path: "/profile" },
    { name: "Open New Account",    icon: <UserCheck size={23} />,       path: "/open-account" },
    { name: "Deposit Money",       icon: <Wallet size={23} />,          path: "/deposit" },
    { name: "Withdraw Money",      icon: <Wallet size={23} />,          path: "/withdraw" },
    { name: "KYC Verification",    icon: <BadgeCheckIcon size={23} />,  path: "/kyc" },
    { name: "Transaction History", icon: <ArrowLeftRight size={23} />,  path: "/transactions" },
    { name: "Account Details",     icon: <Landmark size={23} />,        path: "/details" },
    { name: "Help & Support",      icon: <Headphones size={23} />,      path: "/helpsupport" },
    { name: "Settings",             icon: <Settings size={23} />,        path: "/setting" },
    { name: "LogOut",              icon: <LogOut size={23} />,          path: "/logout" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen flex flex-col z-50 overflow-hidden
        bg-[linear-gradient(180deg,#1e3a7b_0%,#152d68_40%,#0f1f4d_100%)]
        border-r border-white/[.08]
        shadow-[4px_0_20px_rgba(0,0,0,0.35)]
        transition-[width] duration-[280ms] ease-in-out
        font-[Inter,sans-serif]
        ${isOpen ? "w-[230px]" : "w-[60px]"}`}
    >

      {/* Toggle Button */}
      <div className="flex justify-end px-3 pt-[14px] pb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center rounded-[6px] px-2 py-[6px]
                     bg-white/[.08] border-none cursor-pointer text-white/70
                     hover:bg-white/[.14] transition-colors duration-200"
        >
          {isOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {/* ✅ PayZen Logo — only when sidebar is open */}
      {isOpen && (
        <>
          <PayZenLogo />
          {/* Divider */}
          <div className="h-px mx-4 mb-3 bg-white/10" />
        </>
      )}

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col gap-[2px] px-[10px] py-1 overflow-hidden">
        {menuItems.map((item, index) => {
          const active   = location.pathname === item.path;
          const isLogout = item.path === "/logout";

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-[10px] rounded-lg
                          no-underline whitespace-nowrap text-[13.5px]
                          transition-all duration-[180ms]
                          ${isLogout
                            ? "text-[#ff1b1e] hover:bg-[rgba(255,77,79,0.22)]"
                            : active
                            ? "text-white bg-white/[.15] font-semibold"
                            : "text-white/[.72] font-medium hover:bg-white/[.08]"
                          }`}
            >
              <span
                className={`flex items-center flex-shrink-0
                  ${isLogout
                    ? "text-[#ff1b1e]"
                    : active
                    ? "text-white"
                    : "text-white/60"
                  }`}
              >
                {item.icon}
              </span>

              {isOpen && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="h-4" />
    </aside>
  );
}

export default Sidebar;