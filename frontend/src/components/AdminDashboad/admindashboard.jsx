import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, CreditCard, ArrowLeftRight,
  FileText, LogOut, Bell, Menu, X,
  TrendingUp, TrendingDown, Settings,
  Building2, FileClock, Repeat, Wallet, Users,
} from "lucide-react";
import AccountsView from "../AdminAccount/AccountManagement.jsx";
import AdminTransactionManager from "../AdminTransation/admintransation.jsx";
import AdminKYC from "../AdminKYC/kyc.jsx";
import AdminSettings from "../AdminSetting/setting.jsx";

/* ── Data ── */
const TRANSACTIONS = [
  { id: "TXN001", user: "Chetan Patil",     type: "Credit", amount: "₹25,000",  date: "13 Mar 2026", status: "Success" },
  { id: "TXN002", user: "Rohit Sharma",     type: "Debit",  amount: "₹8,500",   date: "13 Mar 2026", status: "Success" },
  { id: "TXN003", user: "Priya Desai",      type: "Credit", amount: "₹1,20,000",date: "12 Mar 2026", status: "Pending" },
  { id: "TXN004", user: "Amit Joshi",       type: "Debit",  amount: "₹3,200",   date: "12 Mar 2026", status: "Failed"  },
  { id: "TXN005", user: "Sneha Kulkarni",   type: "Credit", amount: "₹50,000",  date: "11 Mar 2026", status: "Success" },
];

const STAT_CARDS = [
  { label: "Total Users",        value: "12,480", icon: Users,    color: "text-blue-600",   bgColor: "bg-blue-500/10",    borderColor: "border-blue-200",   border: "hover:border-blue-500"   },
  { label: "Total Accounts",     value: "9,341",  icon: CreditCard,color:"text-emerald-600",bgColor: "bg-emerald-500/10", borderColor: "border-emerald-200",border: "hover:border-emerald-500"},
  { label: "Total Balance",      value: "₹84.2L", icon: Wallet,   color: "text-amber-600",  bgColor: "bg-amber-500/10",   borderColor: "border-amber-200",  border: "hover:border-amber-500"  },
  { label: "Total Transactions", value: "3,892",  icon: Repeat,   color: "text-violet-600", bgColor: "bg-violet-500/10",  borderColor: "border-violet-200", border: "hover:border-violet-500" },
  { label: "Pending KYC",        value: "1,638",  icon: FileClock,color: "text-red-600",    bgColor: "bg-red-500/10",     borderColor: "border-red-200",    border: "hover:border-red-500"    },
  { label: "Account Requests",   value: "247",    icon: Building2,color: "text-cyan-600",   bgColor: "bg-cyan-500/10",    borderColor: "border-cyan-200",   border: "hover:border-cyan-500"   },
];

const NAV = [
  { id: "dashboard",   label: "Dashboard",   icon: LayoutDashboard },
  { id: "accounts",    label: "Accounts",    icon: CreditCard       },
  { id: "txn-manager", label: "Transaction", icon: ArrowLeftRight   },
  { id: "kyc",         label: "KYC",         icon: FileText         },
  { id: "settings",    label: "Settings",    icon: Settings         },
];

const BADGE_STYLES = {
  Success: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-800",
  Failed:  "bg-red-100 text-red-700",
};

/* ── Badge ── */
function Badge({ status }) {
  return (
    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full tracking-wide ${BADGE_STYLES[status] ?? "bg-slate-100 text-slate-500"}`}>
      {status}
    </span>
  );
}

/* ── Dashboard View ── */
function DashboardView() {
  return (
    <div>
      <div className="mb-3">
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">Dashboard Overview</h2>
      </div>

      {/* Stat Cards — 2 cols mobile, 3 cols sm, 6 cols lg */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-5">
        {STAT_CARDS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              style={{ animationDelay: `${i * 50}ms` }}
              className={`
                group relative overflow-hidden
                ${s.bgColor} border ${s.borderColor} ${s.border}
                rounded-2xl px-3 py-3 sm:px-4 sm:py-4
                shadow-sm flex flex-col gap-2 sm:gap-3
                transition-all duration-300
                hover:shadow-md hover:-translate-y-1
              `}
            >
              <div className="flex justify-between items-start">
                <p className="text-[11px] sm:text-[13px] tracking-wide text-slate-500 font-bold leading-snug">
                  {s.label}
                </p>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${s.color} transition-transform duration-500 group-hover:rotate-[10deg]`}>
                  <Icon size={20} className="opacity-90" />
                </div>
              </div>
              <h3 className="text-lg sm:text-[22px] font-black text-slate-800 tracking-tight">
                {s.value}
              </h3>
              <div className="absolute -inset-px bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
            </div>
          );
        })}
      </div>

      {/* Transactions */}
      <div className="mb-3">
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">Recent Transactions</h2>
        <p className="text-xs sm:text-[13px] text-slate-500 mt-1">Last 5 transactions across all accounts</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[520px]">
            <thead>
              <tr>
                {["Txn ID", "User", "Type", "Amount", "Date", "Status"].map(h => (
                  <th key={h} className="px-3 sm:px-4 py-3 text-left text-[11px] font-bold text-white uppercase bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((t, idx) => (
                <tr key={t.id} className="border-b border-slate-100 hover:bg-blue-50/40 transition-colors">
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-[13px] text-slate-800 font-semibold whitespace-nowrap">{t.id}</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-[13px] text-slate-800 whitespace-nowrap">{t.user}</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-[13px] whitespace-nowrap">
                    <span className={`flex items-center gap-1 text-xs font-bold ${t.type === "Credit" ? "text-emerald-600" : "text-red-500"}`}>
                      {t.type === "Credit" ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                      {t.type}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-[13px] text-slate-800 font-semibold whitespace-nowrap">{t.amount}</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-[13px] text-slate-500 whitespace-nowrap">{t.date}</td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-[13px] whitespace-nowrap"><Badge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Main AdminDashboard ── */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebar] = useState(() => typeof window !== "undefined" && window.innerWidth >= 1024);

  const active = location.pathname.split("/")[2] || "dashboard";

  /* Close sidebar on resize to mobile */
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setSidebar(true);
      else setSidebar(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f0f4ff] font-sans">

      {/* Keyframe styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        @keyframes shimmer { 0%{background-position:0% center} 100%{background-position:200% center} }
        .zen-text {
          background: linear-gradient(135deg,#38bdf8,#818cf8);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[150] lg:hidden backdrop-blur-sm"
          onClick={() => setSidebar(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <div
        className={`
          bg-[linear-gradient(180deg,#1e3a7b_0%,#152d68_40%,#0f1f4d_100%)]
          flex flex-col fixed lg:sticky top-0 h-screen flex-shrink-0
          overflow-hidden transition-all duration-300 z-[200]
          ${sidebarOpen ? "w-[220px] sm:w-[240px] translate-x-0" : "w-0 -translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Close button (mobile) */}
        <div className="flex justify-end px-3 pt-3 pb-2 lg:hidden">
          <button
            onClick={() => setSidebar(false)}
            className="flex items-center justify-center rounded-lg px-2 py-1.5 bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
          >
            <X size={17} />
          </button>
        </div>

        {/* Logo */}
        <div className="px-5 pt-5 pb-5 border-b border-white/10 flex flex-col items-center">
          <svg width="48" height="48" viewBox="0 0 100 100" fill="none" className="mb-2">
            <path d="M50 4 L90 26 L90 74 L50 96 L10 74 L10 26 Z" fill="rgba(29,78,216,0.35)" stroke="rgba(56,189,248,0.9)" strokeWidth="2.5" />
            <path d="M50 16 L80 32 L80 68 L50 84 L20 68 L20 32 Z" fill="rgba(37,99,235,0.15)" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
            {[[50,4],[90,26],[90,74],[50,96],[10,74],[10,26]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="rgba(56,189,248,0.9)" />
            ))}
            <text x="50" y="63" fontFamily="Georgia,serif" fontSize="34" fontWeight="900" fill="white" textAnchor="middle">P</text>
          </svg>
          <div className="flex items-baseline gap-0.5 mb-1">
            <span className="font-serif text-[21px] font-black text-white" style={{ letterSpacing: -1 }}>Pay</span>
            <span className="zen-text font-serif text-[21px] font-black" style={{ letterSpacing: -1 }}>Zen</span>
          </div>
          <div className="w-20 h-0.5 rounded-full mb-1" style={{ background: "linear-gradient(90deg,#2563eb,#38bdf8,#818cf8)" }} />
          <p className="text-[9px] tracking-[0.25em] uppercase text-white/30">SECURE · SMART · BANKING</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {NAV.map(n => {
            const Icon = n.icon;
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                onClick={() => {
                  navigate(`/admindashboard/${n.id}`);
                  if (window.innerWidth < 1024) setSidebar(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px]
                  text-sm cursor-pointer mb-0.5 transition-all duration-150
                  text-left whitespace-nowrap border-l-[3px] border-none
                  ${isActive
                    ? "bg-white/10 text-white font-bold border-l-blue-500"
                    : "bg-transparent text-white/80 font-medium border-l-transparent hover:bg-white/[0.08]"
                  }
                `}
              >
                <Icon size={21} /> {n.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => navigate("/adminlogout")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] bg-red-500/10 text-red-300 text-sm font-semibold cursor-pointer whitespace-nowrap hover:bg-red-500/20 transition-colors"
          >
            <LogOut size={17} /> Logout
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">

        {/* Header */}
        <div className="bg-[linear-gradient(180deg,#1e3a7b_0%,#152d68_40%,#0f1f4d_100%)] border-b border-white/10 px-3 sm:px-4 md:px-6 h-14 sm:h-16 flex items-center justify-between sticky top-0 z-[100]">

          {/* Hamburger */}
          <div className="w-9 flex items-center">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebar(true)}
                className="flex items-center justify-center rounded-lg px-2 py-1.5 bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
              >
                <Menu size={19} />
              </button>
            )}
          </div>

          {/* Brand */}
          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-0.5">
              <span className="font-serif text-[17px] sm:text-[21px] font-black text-white" style={{ letterSpacing: -1 }}>Pay</span>
              <span className="zen-text font-serif text-[17px] sm:text-[21px] font-black" style={{ letterSpacing: -1 }}>Zen</span>
            </div>
            <p className="text-[7px] sm:text-[8px] tracking-[0.2em] uppercase text-white/25 whitespace-nowrap">SECURE · SMART · BANKING</p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="bg-white/[0.06] border border-white/10 rounded-[10px] p-1.5 sm:p-2 relative flex hover:bg-white/10 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={15} color="rgba(255,255,255,0.6)" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500 border border-[#0f1f4b]" />
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: "linear-gradient(135deg,#1e3a7b,#3b82f6)" }}
              >
                AD
              </div>
              <span className="hidden sm:inline text-[12px] sm:text-[13px] font-semibold text-white/80 whitespace-nowrap">Hello, Admin</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-3 sm:p-4 md:p-7 flex-1 overflow-y-auto">
          {active === "dashboard"   && <DashboardView />}
          {active === "accounts"    && <AccountsView />}
          {active === "kyc"         && <AdminKYC />}
          {active === "txn-manager" && <AdminTransactionManager />}
          {active === "settings"    && <AdminSettings />}
        </div>
      </div>
    </div>
  );
}