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

/* ═══════════════════════════════════════════════════════════
   PAYZEN LOGO — Same as Login / Registration / Forgot
═══════════════════════════════════════════════════════════ */
function PayZenLogo() {
  const on = true;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .pzl-sb-wrap { display: flex; flex-direction: column; align-items: center; padding: 14px 0 18px; }

        .pzl-sb-icon-block { position: relative; width: 52px; height: 52px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; }

        .pzl-sb-glow {
          position: absolute; inset: -10px; border-radius: 24px;
          background: radial-gradient(ellipse at center, #3b82f6 0%, #6366f1 40%, transparent 72%);
          opacity: 0; filter: blur(12px);
          animation: pzlSbGlow 3s ease-in-out infinite;
        }
        .pzl-sb-wrap.on .pzl-sb-glow { opacity: 0.55; }
        @keyframes pzlSbGlow {
          0%,100% { opacity: 0.45; transform: scale(1); }
          50%      { opacity: 0.7; transform: scale(1.08); }
        }

        .pzl-sb-card {
          position: relative; z-index: 2;
          width: 52px; height: 52px; border-radius: 16px;
          background: linear-gradient(145deg, #1a2e6b 0%, #1e40af 45%, #2563eb 100%);
          box-shadow: 0 0 0 1px rgba(99,102,241,0.5), 0 6px 20px rgba(37,99,235,0.5), inset 0 1px 0 rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center; overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .pzl-sb-card:hover { transform: scale(1.06) translateY(-1px); }

        .pzl-sb-texture {
          position: absolute; inset: 0; border-radius: 16px;
          background: repeating-linear-gradient(-55deg, transparent, transparent 6px, rgba(255,255,255,0.025) 6px, rgba(255,255,255,0.025) 12px);
        }

        .pzl-sb-dot {
          position: absolute; top: 7px; right: 7px; width: 6px; height: 6px;
          border-radius: 50%; background: #22d3ee; box-shadow: 0 0 6px #22d3ee; z-index: 4;
          animation: pzlSbDot 2.2s ease-in-out infinite;
        }
        @keyframes pzlSbDot {
          0%,100% { opacity: 1; } 50% { opacity: 0.4; }
        }

        .pzl-sb-name-block {
          display: flex; flex-direction: column; align-items: center; gap: 1px;
          opacity: 1; transform: translateY(0);
        }

        .pzl-sb-name { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; letter-spacing: -0.5px; line-height: 1; color: #fff; }
        .pzl-sb-pay  { color: #f8fafc; }
        .pzl-sb-zen  { background: linear-gradient(90deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        .pzl-sb-underline {
          height: 2px; width: 100%; border-radius: 99px;
          background: linear-gradient(90deg, #3b82f6, #a78bfa);
          margin-top: 3px;
        }

        .pzl-sb-tag {
          font-family: 'DM Sans', sans-serif; font-size: 7px; font-weight: 500;
          letter-spacing: 2.2px; text-transform: uppercase; color: rgba(148,163,184,0.55);
          margin-top: 3px; opacity: 1;
        }
      `}</style>

      <div className={`pzl-sb-wrap ${on ? "on" : ""}`}>
        <div className="pzl-sb-icon-block">
          <div className="pzl-sb-glow" />
          <div className="pzl-sb-card">
            <div className="pzl-sb-texture" />
            <div className="pzl-sb-dot" />
            <svg viewBox="0 0 32 32" fill="none" style={{ width: 26, height: 26, position: "relative", zIndex: 3 }}>
              <path d="M16 2 L28 8.5 L28 23.5 L16 30 L4 23.5 L4 8.5 Z" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              <circle cx="16" cy="16" r="7" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
              <path d="M13.5 12.5 L13.5 19.5 M13.5 12.5 L17 12.5 Q19.5 12.5 19.5 14.5 Q19.5 16.5 17 16.5 L13.5 16.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="pzl-sb-name-block">
          <div className="pzl-sb-name">
            <span className="pzl-sb-pay">Pay</span>
            <span className="pzl-sb-zen">Zen</span>
          </div>
          <div className="pzl-sb-underline" />
          <div className="pzl-sb-tag">SECURE · SMART · BANKING</div>
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
    { name: "Setting",             icon: <Settings size={23} />,        path: "/setting" },
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