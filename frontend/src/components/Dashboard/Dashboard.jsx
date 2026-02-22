import {
  LayoutDashboard,
  UserCheck,
  Wallet,
  CreditCard,
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

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard",          icon: <LayoutDashboard size={23} />, path: "/dashboard" },
    { name: "My Profile",         icon: <CircleUserRound size={23} />, path: "/profile" },
    { name: "Open New Account",   icon: <UserCheck size={23} />,       path: "/open-account" },
    { name: "Deposit Money",      icon: <Wallet size={23} />,          path: "/deposit" },
    { name: "Withdraw Money",     icon: <Wallet size={23} />,          path: "/withdraw" },
    { name: "KYC Verification",   icon: <BadgeCheckIcon size={23} />,  path: "/kyc" },
    { name: "Transaction History",icon: <ArrowLeftRight size={23} />,  path: "/transactions" },
    { name: "Account Details",    icon: <Landmark size={23} />,        path: "/details" },
    { name: "Help & Support",     icon: <Headphones size={23} />,      path: "/helpsupport" },
    { name: "Setting",            icon: <Settings size={23} />,        path: "/setting" },
    { name: "LogOut",             icon: <LogOut size={23} />,          path: "/logout" },
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

      {/* Logo */}
      <div
        className={`flex flex-col items-center px-4 pt-[10px] pb-6 overflow-hidden whitespace-nowrap
                    transition-opacity duration-200
                    ${isOpen ? "opacity-100" : "opacity-0"}`}
      >
        <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-[10px]
                        bg-[#4d7eff] border border-white/15
                        shadow-[0_4px_14px_rgba(77,126,255,0.45)]">
          <Wallet size={26} color="#ffffff" strokeWidth={1.8} />
        </div>
        <p className="m-0 text-[13px] font-bold text-white tracking-wide">PayZen</p>
      </div>

      {/* Divider */}
      <div
        className={`h-px mx-4 mb-3 bg-white/10 transition-opacity duration-200
                    ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

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
              {/* Icon */}
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