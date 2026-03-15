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
   PAYZEN LOGO — inline flow (same as before)
═══════════════════════════════════════════════════════════ */
function PayZenLogo() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOn(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div style={{
        display:"flex", flexDirection:"column", alignItems:"center",
        padding:"8px 14px 10px", gap:8,
      }}>

        {/* Icon */}
        <div style={{
          position:"relative", width:52, height:52, flexShrink:0,
          overflow:"hidden",
          animation:"pzIn 0.9s cubic-bezier(.16,1,.3,1) both 0.1s",
        }}>
          <div className="pz-orbit-1"><div className="pz-orbit-dot-1" /></div>
          <div className="pz-orbit-2"><div className="pz-orbit-dot-2" /></div>
          <div style={{
            position:"absolute", inset:-8, borderRadius:"50%",
            background:"radial-gradient(circle,rgba(37,99,235,0.55) 0%,transparent 65%)",
            filter:"blur(12px)", animation:"pzGlow 3s ease-in-out infinite", pointerEvents:"none",
          }} />
          <svg width="52" height="52" viewBox="0 0 100 100" fill="none"
            style={{ position:"absolute", top:0, left:0, animation:"pzFloat 5s ease-in-out infinite" }}>
            <path d="M50 4 L90 26 L90 74 L50 96 L10 74 L10 26 Z"
              fill="rgba(29,78,216,0.2)" stroke="url(#pzS1)" strokeWidth="1.5"/>
            <path d="M50 16 L80 32 L80 68 L50 84 L20 68 L20 32 Z"
              fill="rgba(37,99,235,0.08)" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
            <text x="50" y="63" fontFamily="Georgia,serif" fontSize="34"
              fontWeight="900" fill="url(#pzS2)" textAnchor="middle">P</text>
            {[[50,4],[90,26],[90,74],[50,96],[10,74],[10,26]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(56,189,248,0.85)"/>
            ))}
            <defs>
              <linearGradient id="pzS1" x1="10" y1="4" x2="90" y2="96" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="rgba(56,189,248,0.9)"/>
                <stop offset="50%"  stopColor="rgba(129,140,248,0.6)"/>
                <stop offset="100%" stopColor="rgba(56,189,248,0.9)"/>
              </linearGradient>
              <linearGradient id="pzS2" x1="0" y1="0" x2="0" y2="70" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#fff"/>
                <stop offset="100%" stopColor="rgba(56,189,248,0.85)"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Name */}
        <div style={{
          opacity: on ? 1 : 0,
          transform: on ? "translateY(0)" : "translateY(4px)",
          transition:"opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s",
          display:"flex", flexDirection:"column", alignItems:"center",
        }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:2 }}>
            <span style={{
              fontFamily:"Georgia,serif", fontSize:20, fontWeight:900,
              color:"#fff", letterSpacing:-1, lineHeight:1,
              textShadow:"0 0 20px rgba(255,255,255,0.12)",
            }}>Pay</span>
            <span style={{
              fontFamily:"Georgia,serif", fontSize:20, fontWeight:900,
              letterSpacing:-1, lineHeight:1,
              backgroundImage:"linear-gradient(135deg,#38bdf8 0%,#818cf8 45%,#38bdf8 90%)",
              backgroundSize:"200%",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              animation:"pzShimmer 3s linear infinite",
            }}>Zen</span>
          </div>
          <div style={{
            height:2, borderRadius:99, marginTop:4,
            backgroundImage:"linear-gradient(90deg,#2563eb,#38bdf8,#818cf8,#38bdf8,#2563eb)",
            backgroundSize:"200%",
            animation: on ? "pzGrow 0.8s cubic-bezier(.22,1,.36,1) forwards 0.5s, pzShimmer 3s linear infinite 1s" : "none",
            width: on ? undefined : 0, alignSelf:"stretch",
          }}/>
          <div style={{
            fontFamily:"'Plus Jakarta Sans',sans-serif",
            fontSize:7.5, fontWeight:500, letterSpacing:"2.2px",
            textTransform:"uppercase", color:"rgba(148,163,184,0.4)",
            marginTop:5, opacity: on ? 1 : 0,
            transition:"opacity 0.4s ease 0.8s", whiteSpace:"nowrap",
          }}>Secure · Smart · Banking</div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIDEBAR INNER — shared between desktop & mobile drawer
═══════════════════════════════════════════════════════════ */
function SidebarInner({ isOpen, onToggle, menuItems }) {
  const location = useLocation();

  return (
    <div className={`
      flex flex-col h-full
      bg-[linear-gradient(180deg,#1e3a7b_0%,#152d68_40%,#0f1f4d_100%)]
      border-r border-white/[.08]
      shadow-[4px_0_20px_rgba(0,0,0,0.35)]
      font-[Inter,sans-serif]
      overflow-hidden
    `}>

      {/* Toggle Button */}
      <div className="flex justify-end px-3 pt-[14px] pb-2">
        <button
          onClick={onToggle}
          className="flex items-center justify-center rounded-[6px] px-2 py-[6px]
                     bg-white/[.08] border-none cursor-pointer text-white/70
                     hover:bg-white/[.14] transition-colors duration-200"
        >
          {isOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {/* Logo — only when open */}
      {isOpen && (
        <>
          <PayZenLogo />
          <div className="h-px mx-4 mb-3 bg-white/10" />
        </>
      )}

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col gap-[2px] px-[10px] py-1 overflow-y-auto overflow-x-hidden">
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
              <span className={`flex items-center flex-shrink-0
                ${isLogout ? "text-[#ff1b1e]" : active ? "text-white" : "text-white/60"}`}>
                {item.icon}
              </span>
              {isOpen && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="h-4" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN SIDEBAR
═══════════════════════════════════════════════════════════ */
function Sidebar() {
  const [isOpen,    setIsOpen]    = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name:"Dashboard",           icon:<LayoutDashboard size={23}/>, path:"/dashboard"   },
    { name:"My Profile",          icon:<CircleUserRound size={23}/>, path:"/profile"      },
    { name:"Open New Account",    icon:<UserCheck size={23}/>,       path:"/open-account" },
    { name:"KYC Verification",    icon:<BadgeCheckIcon size={23}/>,  path:"/kyc"          },
    { name:"Transaction History", icon:<ArrowLeftRight size={23}/>,  path:"/transactions" },
    { name:"Account Details",     icon:<Landmark size={23}/>,        path:"/details"      },
    { name:"Help & Support",      icon:<Headphones size={23}/>,      path:"/helpsupport"  },
    { name:"Settings",            icon:<Settings size={23}/>,        path:"/setting"      },
    { name:"LogOut",              icon:<LogOut size={23}/>,          path:"/logout"       },
  ];

  /* Close mobile drawer on route change */
  const location = useLocation();
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <>
      <style>{`
        @keyframes sbSlideIn { from{transform:translateX(-100%)} to{transform:translateX(0)} }
        @keyframes sbFadeIn  { from{opacity:0} to{opacity:1} }
      `}</style>

      {/* ══ MOBILE — hamburger + drawer (md से छोटं) ══ */}
      <div className="md:hidden">

        {/* Hamburger button — top left, always visible */}
        {!mobileOpen && (
          <button
            onClick={() => setMobileOpen(true)}
            className="fixed top-3 left-3 z-[999] w-10 h-10 flex items-center justify-center
                       rounded-xl border border-white/20
                       bg-[rgba(8,16,60,0.88)] backdrop-blur-md
                       text-white/85 cursor-pointer
                       shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            <Menu size={18} />
          </button>
        )}

        {/* Backdrop */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm"
            style={{ animation:"sbFadeIn 0.25s ease" }}
          />
        )}

        {/* Drawer */}
        {mobileOpen && (
          <div
            className="fixed top-0 left-0 z-[999] w-[240px] h-[100dvh]"
            style={{ animation:"sbSlideIn 0.3s cubic-bezier(.16,1,.3,1)" }}
          >
            <SidebarInner
              isOpen={true}
              onToggle={() => setMobileOpen(false)}
              menuItems={menuItems}
            />
          </div>
        )}
      </div>

      {/* ══ DESKTOP — fixed sidebar (md और ऊपर) ══ */}
      <aside className={`
        hidden md:flex
        fixed top-0 left-0 h-screen flex-col z-50
        transition-[width] duration-[280ms] ease-in-out
        ${isOpen ? "w-[230px]" : "w-[60px]"}
      `}>
        <SidebarInner
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          menuItems={menuItems}
        />
      </aside>
    </>
  );
}

export default Sidebar;