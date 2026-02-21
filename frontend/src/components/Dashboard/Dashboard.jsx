import {
  LayoutDashboard,
  UserCheck,
  Wallet,
  CreditCard,
  CheckCircle,
  LogOut,
  CircleUserRound,
  ArrowLeftRight,
  Headphones,
  BadgeCheckIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { X, Menu } from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard",          icon: <LayoutDashboard size={19} />, path: "/dashboard" },
    { name: "My Profile",         icon: <CircleUserRound size={19} />, path: "/profile" },
    { name: "Open New Account",   icon: <UserCheck size={19} />,       path: "/open-account" },
    { name: "Deposit Money",      icon: <CreditCard size={19} />,      path: "/deposit" },
    { name: "Withdraw Money",     icon: <Wallet size={19} />,          path: "/withdraw" },
    { name: "KYC Verification",   icon: <BadgeCheckIcon size={19} />,  path: "/kyc" },
    { name: "Transaction History",icon: <ArrowLeftRight size={19} />,  path: "/transactions" },
    { name: "Account Balance",    icon: <CheckCircle size={19} />,     path: "/balance" },
    { name: "Help & Support",     icon: <Headphones size={19} />,      path: "/helpsupport" },
    { name: "Logout",             icon: <LogOut size={19} />,          path: "/logout" },
  ];

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: isOpen ? 230 : 60,
        background: "linear-gradient(180deg, #1e3a7b 0%, #152d68 40%, #0f1f4d 100%)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "4px 0 20px rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
        transition: "width 0.28s ease",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Close / Toggle Button — top right */}
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "14px 12px 8px",
      }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "none",
            borderRadius: 6,
            padding: "6px 8px",
            color: "rgba(255,255,255,0.7)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {/* Logo / Brand */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 16px 24px",
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.2s",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}>
        {/* Wallet Icon */}
        <div style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}>
          <Wallet size={26} color="#ffffff" strokeWidth={1.8} />
        </div>
        <span style={{
          color: "#ffffff",
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: 0.2,
        }}>
          SBI Banking
        </span>
      </div>

      {/* Divider */}
      <div style={{
        height: 1,
        background: "rgba(255,255,255,0.1)",
        margin: "0 16px 12px",
        opacity: isOpen ? 1 : 0,
      }} />

      {/* Menu Items */}
      <nav style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "4px 10px",
        overflowY: "auto",
        overflowX: "hidden",
      }}>
        {menuItems.map((item, index) => {
          const active = location.pathname === item.path;
          const isLogout = item.path === "/logout";

          return (
            <Link
              key={index}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 8,
                textDecoration: "none",
                color: isLogout
                  ? "rgba(255,180,180,0.85)"
                  : active
                  ? "#ffffff"
                  : "rgba(255,255,255,0.72)",
                background: active
                  ? "rgba(255,255,255,0.15)"
                  : "transparent",
                fontWeight: active ? 600 : 400,
                fontSize: 13.5,
                transition: "background 0.18s, color 0.18s",
                whiteSpace: "nowrap",
                overflow: "hidden",
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={e => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Icon */}
              <span style={{
                flexShrink: 0,
                color: isLogout
                  ? "rgba(255,180,180,0.85)"
                  : active
                  ? "#ffffff"
                  : "rgba(255,255,255,0.6)",
                display: "flex",
                alignItems: "center",
              }}>
                {item.icon}
              </span>

              {/* Label */}
              {isOpen && (
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom padding */}
      <div style={{ height: 16 }} />
    </aside>
  );
}

export default Sidebar;