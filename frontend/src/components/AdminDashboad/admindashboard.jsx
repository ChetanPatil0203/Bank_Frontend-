import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard, CreditCard, ArrowLeftRight,
  FileText, LogOut, Bell, Menu, X,
  TrendingUp, TrendingDown, Settings,
  Building2,
  FileClock,
  Repeat,
  Wallet,
  Users,
} from "lucide-react";
import AccountsView from "../AdminAccount/AccountManagement.jsx";
import AdminTransactionManager from "../AdminTransation/admintransation.jsx";
import AdminKYC from "../AdminKYC/kyc.jsx";
import AdminSettings from "../AdminSetting/setting.jsx";

const TRANSACTIONS = [
  { id: "TXN001", user: "Chetan Patil", type: "Credit", amount: "₹25,000", date: "13 Mar 2026", status: "Success" },
  { id: "TXN002", user: "Rohit Sharma", type: "Debit", amount: "₹8,500", date: "13 Mar 2026", status: "Success" },
  { id: "TXN003", user: "Priya Desai", type: "Credit", amount: "₹1,20,000", date: "12 Mar 2026", status: "Pending" },
  { id: "TXN004", user: "Amit Joshi", type: "Debit", amount: "₹3,200", date: "12 Mar 2026", status: "Failed" },
  { id: "TXN005", user: "Sneha Kulkarni", type: "Credit", amount: "₹50,000", date: "11 Mar 2026", status: "Success" },
];

// ═══════════════════════════════════════════════════════════════
// STAT CARDS CONFIGURATION WITH TRENDS
// ═══════════════════════════════════════════════════════════════

const STAT_CARDS = [
  {
    label: "Total Users",
    value: "12,480",
    icon: Users,
    color: "text-blue-600",
    border: "hover:border-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-200",
    trend: { value: 12.5, direction: "up" }
  },
  {
    label: "Total Accounts",
    value: "9,341",
    icon: CreditCard,
    color: "text-emerald-600",
    border: "hover:border-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-200",
    trend: { value: 8.2, direction: "up" }
  },
  {
    label: "Total Balance",
    value: "₹84.2L",
    icon: Wallet,
    color: "text-amber-600",
    border: "hover:border-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-200",
    trend: { value: 5.8, direction: "up" }
  },
  {
    label: "Total Transactions",
    value: "3,892",
    icon: Repeat,
    color: "text-violet-600",
    border: "hover:border-violet-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-200",
    trend: { value: 3.2, direction: "down" }
  },
  {
    label: "Pending KYC",
    value: "1,638",
    icon: FileClock,
    color: "text-red-600",
    border: "hover:border-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-200",
    trend: { value: 2.1, direction: "down" }
  },
  {
    label: "Account Requests",
    value: "247",
    icon: Building2,
    color: "text-cyan-600",
    border: "hover:border-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-200",
    trend: { value: 15.4, direction: "up" }
  },
];

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "accounts", label: "Accounts", icon: CreditCard },
  { id: "txn-manager", label: "Transaction", icon: ArrowLeftRight },
  { id: "kyc", label: "KYC", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

const BADGE_STYLES = {
  Success: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-800",
  Failed: "bg-red-100 text-red-700",
};

function Badge({ status }) {
  return (
    <span className={`text-[11px] font-bold px-[10px] py-[3px] rounded-full tracking-[0.04em] ${BADGE_STYLES[status] ?? "bg-slate-100 text-slate-500"}`}>
      {status}
    </span>
  );
}

function TrendIndicator({ trend }) {
  if (!trend) return null;

  const isPositive = trend.direction === "up";
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const color = isPositive ? "text-emerald-600" : "text-red-500";

  return (
    <div className={`flex items-center gap-1 text-[11px] font-semibold ${color}`}>
      <TrendIcon size={14} />
      <span>{Math.abs(trend.value)}%</span>
    </div>
  );
}

function DashboardView() {
  return (
    <div>
      {/* Page title */}
      <div className="mb-3">
        <h2 className="text-xl font-extrabold text-slate-800 m-0">Dashboard Overview</h2>
      </div>

      {/* Stat cards */}
      <div className="flex flex-row flex-wrap gap-2.5 mb-5 pb-1">
        {STAT_CARDS.map((s, i) => {
          const Icon = s.icon;

          return (
            <div
              key={i}
              className={`
                group relative overflow-hidden
                ${s.bgColor} border ${s.borderColor} rounded-[20px]
                px-4 py-4
                shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]
                
                flex flex-col gap-3
                flex-[1_1_calc(50%-6px)] md:flex-[1_1_140px] lg:flex-1 
                min-w-[120px] max-w-[calc(50%-6px)] md:max-w-none
                box-border
                
                transition-all duration-300 ease-out
                ${s.border}
                hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)]
                hover:-translate-y-1.5
                animate-in fade-in slide-in-from-bottom-4 duration-500
              `}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Top Row: Label and Icon */}
              <div className="flex justify-between items-start">
                <p className="text-[13px] tracking-wide text-slate-500 font-bold m-0 group-hover:text-slate-700 transition-colors">
                  {s.label}
                </p>

                <div
                  className={`
                    w-10 h-10 rounded-xl flex items-center justify-center
                    ${s.color} 
                    bg-opacity-20 backdrop-blur-sm
                    transition-transform duration-500
                    group-hover:rotate-[10deg]
                  `}
                >
                  <Icon size={20} className="opacity-90" />
                </div>
              </div>

              {/* Value Section */}
              <div>
                <h3 className="text-[22px] font-[900] text-slate-800 m-0 tracking-tight">
                  {s.value}
                </h3>
              </div>

              {/* Trend Indicator */}
              {s.trend && (
                <div className="flex justify-between items-center">
                </div>
              )}

              {/* Decorative Gradient Glow */}
              <div className="absolute -inset-px bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Transactions heading */}
      <div className="mb-3">
        <h2 className="text-xl font-extrabold text-slate-800 m-0">Recent Transactions</h2>
        <p className="text-[13px] text-slate-500 mt-1 mb-0">Last 5 transactions across all accounts</p>
      </div>

      {/* Transactions table */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(15,31,75,0.07)] border border-slate-200 overflow-hidden animate-in fade-in duration-500">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["Txn ID", "User", "Type", "Amount", "Date", "Status"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[11px] font-bold text-white uppercase bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((t, idx) => (
                <tr
                  key={t.id}
                  className="border-b border-[#f1f5f9] hover:bg-[#f8faff] transition-colors"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <td className="px-4 py-[13px] text-[13px] text-slate-800 whitespace-nowrap">
                    <span className="font-semibold">{t.id}</span>
                  </td>
                  <td className="px-4 py-[13px] text-[13px] text-slate-800 whitespace-nowrap">{t.user}</td>
                  <td className="px-4 py-[13px] text-[13px] whitespace-nowrap">
                    <span className={`flex items-center gap-1 text-xs font-bold ${t.type === "Credit" ? "text-emerald-600" : "text-red-500"}`}>
                      {t.type === "Credit" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {t.type}
                    </span>
                  </td>
                  <td className="px-4 py-[13px] text-[13px] whitespace-nowrap">
                    <span className="text-slate-800 font-semibold">{t.amount}</span>
                  </td>
                  <td className="px-4 py-[13px] text-[13px] whitespace-nowrap">
                    <span className="text-slate-500">{t.date}</span>
                  </td>
                  <td className="px-4 py-[13px] text-[13px] whitespace-nowrap">
                    <Badge status={t.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebar] = useState(window.innerWidth > 1024);

  const active = location.pathname.split("/")[2] || "dashboard";

  return (
    <div className="flex min-h-screen bg-[#f0f4ff]" style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        
        @keyframes shimmer { 
          0%{background-position:0% center} 
          100%{background-position:200% center} 
        }
        
        .zen-text {
          background: linear-gradient(135deg,#38bdf8,#818cf8);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: slideInFromBottom 0.5s ease-out forwards;
        }

        .fade-in {
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* ── SIDEBAR ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[150] lg:hidden backdrop-blur-sm"
          onClick={() => setSidebar(false)}
        />
      )}
      <div
        className={`bg-[linear-gradient(180deg,#1e3a7b_0%,#152d68_40%,#0f1f4d_100%)] flex flex-col fixed lg:sticky top-0 h-screen flex-shrink-0 overflow-hidden transition-all duration-300 z-[200] ${sidebarOpen ? "w-[240px] translate-x-0" : "w-0 -translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Toggle Sidebar Button */}
        <div className="flex justify-end px-3 pt-[14px] pb-2">
          <button
            onClick={() => setSidebar(false)}
            className="flex items-center justify-center rounded-[6px] px-2 py-[6px]
              bg-white/[.08] border-none cursor-pointer text-white/70
              hover:bg-white/[.14] transition-colors duration-200"
            aria-label="Close sidebar"
          >
            <X size={17} />
          </button>
        </div>

        {/* Logo section */}
        <div className="px-5 pt-6 pb-5 border-b border-white/[0.08] flex flex-col items-center">
          <svg width="52" height="52" viewBox="0 0 100 100" fill="none" className="mb-2">
            <path d="M50 4 L90 26 L90 74 L50 96 L10 74 L10 26 Z" fill="rgba(29,78,216,0.35)" stroke="rgba(56,189,248,0.9)" strokeWidth="2.5" />
            <path d="M50 16 L80 32 L80 68 L50 84 L20 68 L20 32 Z" fill="rgba(37,99,235,0.15)" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
            {[[50, 4], [90, 26], [90, 74], [50, 96], [10, 74], [10, 26]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="rgba(56,189,248,0.9)" />
            ))}
            <text x="50" y="63" fontFamily="Georgia,serif" fontSize="34" fontWeight="900" fill="white" textAnchor="middle">P</text>
          </svg>

          <div className="flex items-baseline gap-0.5 mb-1">
            <span className="font-serif text-[22px] font-black text-white" style={{ letterSpacing: -1 }}>Pay</span>
            <span className="zen-text font-serif text-[22px] font-black" style={{ letterSpacing: -1 }}>Zen</span>
          </div>

          <div
            className="w-20 h-0.5 rounded-full mb-1"
            style={{ background: "linear-gradient(90deg,#2563eb,#38bdf8,#818cf8)" }}
          />
          <p className="text-[9px] tracking-[0.25em] uppercase text-white/30 m-0">SECURE · SMART · BANKING</p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {NAV.map((n) => {
            const Icon = n.icon;
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                onClick={() => {
                  navigate(`/admindashboard/${n.id}`);
                  if (window.innerWidth < 1024) setSidebar(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] border-none text-sm cursor-pointer mb-0.5 transition-all duration-150 text-left whitespace-nowrap border-l-[3px]
                  ${isActive
                    ? "bg-white/[.09] text-white font-bold border-l-blue-500"
                    : "bg-transparent text-white font-medium border-l-transparent hover:bg-white/[.08]"
                  }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={23} />{n.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/[0.08]">
          <button
            onClick={() => navigate("/adminlogout")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] border-none bg-red-500/[0.12] text-red-300 text-sm font-semibold cursor-pointer whitespace-nowrap hover:bg-red-500/20 transition-colors"
          >
            <LogOut size={17} /> Logout
          </button>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[linear-gradient(180deg,#1e3a7b_0%,#152d68_40%,#0f1f4d_100%)] border-b border-white/[0.08] px-4 md:px-6 h-16 flex items-center justify-between sticky top-0 z-[100]">

          {/* Toggle sidebar */}
          <div className="w-10 flex items-center">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebar(true)}
                className="flex items-center justify-center rounded-[6px] px-2 py-[6px]
                  bg-white/[.08] border-none cursor-pointer text-white/70
                  hover:bg-white/[.14] transition-colors duration-200"
                aria-label="Open sidebar"
              >
                <Menu size={20} />
              </button>
            )}
          </div>

          {/* Center brand */}
          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-0.5">
              <span className="font-serif text-[18px] md:text-[22px] font-black text-white" style={{ letterSpacing: -1 }}>Pay</span>
              <span className="zen-text font-serif text-[18px] md:text-[22px] font-black" style={{ letterSpacing: -1 }}>Zen</span>
            </div>
            <p className="text-[7px] md:text-[8px] tracking-[0.2em] md:tracking-[0.28em] uppercase text-white/25 m-0 whitespace-nowrap">SECURE · SMART · BANKING</p>
          </div>

          {/* Right: bell + avatar */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              className="bg-white/[0.06] border border-white/[0.12] rounded-[10px] p-2 cursor-pointer relative flex hover:bg-white/10 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={16} color="rgba(255,255,255,0.6)" />
              <span className="absolute top-[5px] right-[5px] w-[6px] h-[6px] rounded-full bg-red-500 border-[1.5px] border-[#0f1f4b]" />
            </button>
            <div className="flex items-center gap-2">
              <div
                className="w-[30px] h-[30px] md:w-[34px] md:h-[34px] rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: "linear-gradient(135deg,#1e3a7b,#3b82f6)" }}
              >
                AD
              </div>
              <span className="hidden sm:inline text-[13px] font-semibold text-white/[0.85] whitespace-nowrap">Hello, Admin</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 md:p-7 flex-1 overflow-y-auto">
          {active === "dashboard" && <DashboardView />}
          {active === "accounts" && <AccountsView />}
          {active === "kyc" && <AdminKYC />}
          {active === "txn-manager" && <AdminTransactionManager />}
          {active === "settings" && <AdminSettings />}
        </div>
      </div>
    </div>
  );
}