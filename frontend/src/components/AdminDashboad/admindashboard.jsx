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

const STAT_CARDS = [
  { label: "Total Users", value: "12,480", icon: Users, color: "text-blue-600 bg-blue-500/10" },
  { label: "Total Accounts", value: "9,341", icon: CreditCard, color: "text-emerald-600 bg-emerald-500/10" },
  { label: "Total Balance", value: "₹84.2L", icon: Wallet, color: "text-amber-600 bg-amber-500/10" },
  { label: "Total Transactions", value: "3,892", icon: Repeat, color: "text-violet-600 bg-violet-500/10" },
  { label: "Pending KYC", value: "1,638", icon: FileClock, color: "text-red-600 bg-red-500/10" },
  { label: "Account Requests", value: "247", icon: Building2, color: "text-cyan-600 bg-cyan-500/10" },
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

function DashboardView() {
  return (
    <div>
      {/* Page title */}
      <div className="mb-5">
        <h2 className="text-xl font-extrabold text-slate-800 m-0">Dashboard Overview</h2>
      </div>

      {/* Stat cards */}
      <div className="flex flex-row flex-wrap gap-3 mb-7 pb-1">
        {STAT_CARDS.map((s, i) => {
          const Icon = s.icon;

          return (
            <div
              key={i}
              className="
          group relative overflow-hidden
          /* The Glass Effect */
          backdrop-blur-md bg-white/40 
          border border-white/60
          rounded-2xl
          px-5 py-5
          shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]
          
          /* Layout */
          flex flex-col gap-4
          flex-[1_1_160px] min-w-[160px] max-w-[calc(33%-8px)]
          
          /* Interactions */
          transition-all duration-300 ease-out
          hover:bg-white/60
          hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
          hover:-translate-y-1
        "
            >
              {/* Top Row: Label and Icon */}
              <div className="flex justify-between items-start">
                <p className="text-[13px] uppercase tracking-wider text-slate-500 font-bold m-0">
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
                  {/* Ensure s.color only contains text color, or adjust the icon color here */}
                  <Icon size={20} className="opacity-90" />
                </div>
              </div>

              {/* Value Section */}
              <div>
                <h3 className="text-2xl font-black text-slate-900 m-0 tracking-tight">
                  {s.value}
                </h3>
                {/* Optional: Add a small trend indicator here if your data has it */}
              </div>

              {/* Decorative Gradient Glow (Hidden until hover) */}
              <div className="absolute -inset-px bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Transactions heading */}
      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-slate-800 m-0">Recent Transactions</h2>
        <p className="text-[13px] text-slate-500 mt-1 mb-0">Last 5 transactions across all accounts</p>
      </div>

      {/* Transactions table */}
      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(15,31,75,0.07)] border border-slate-200 overflow-hidden">
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
              {TRANSACTIONS.map((t) => (
                <tr key={t.id} className="border-b border-[#f1f5f9] hover:bg-[#f8faff] transition-colors">
                  <td className="px-4 py-[13px] text-[13px] text-slate-800 whitespace-nowrap">
                    <span className="text-slate-800">{t.id}</span>
                  </td>
                  <td className="px-4 py-[13px] text-[13px] text-slate-800 whitespace-nowrap">{t.user}</td>
                  <td className="px-4 py-[13px] text-[13px] whitespace-nowrap">
                    <span className={`flex items-center gap-1 text-xs font-bold ${t.type === "Credit" ? "text-emerald-600" : "text-red-500"}`}>
                      {t.type === "Credit"}
                      {t.type}
                    </span>
                  </td>
                  <td className="px-4 py-[13px] text-[13px] whitespace-nowrap">
                    <span className="text-slate-800">{t.amount}</span>
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
  const [sidebarOpen, setSidebar] = useState(true);

  const active = location.pathname.split("/")[2] || "dashboard";

  return (
    <div className="flex min-h-screen bg-[#f0f4ff]" style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

      {/* Global styles — only kept for things Tailwind can't do */}
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

      {/* ── SIDEBAR ── */}
      <div
        className=" bg-[linear-gradient(180deg,#1e3a7b_0%,#152d68_40%,#0f1f4d_100%)] flex flex-col sticky top-0 h-screen flex-shrink-0 overflow-hidden transition-[width,min-width] duration-300"
        style={{ width: sidebarOpen ? 240 : 0, minWidth: sidebarOpen ? 240 : 0 }}
      >
        {/* Toggle Sidebar Button (inside sidebar) */}
        <div className="flex justify-end px-3 pt-[14px] pb-2">
          <button
            onClick={() => setSidebar(false)}
            className="flex items-center justify-center rounded-[6px] px-2 py-[6px]
              bg-white/[.08] border-none cursor-pointer text-white/70
              hover:bg-white/[.14] transition-colors duration-200"
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
                onClick={() => navigate(`/admindashboard/${n.id}`)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] border-none text-sm cursor-pointer mb-0.5 transition-all duration-150 text-left whitespace-nowrap border-l-[3px]
                  ${isActive
                    ? "bg-white/[.09] text-white font-bold border-l-blue-500"
                    : "bg-transparent text-white font-medium border-l-transparent hover:bg-white/[.08]"
                  }`}
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
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className=" bg-[linear-gradient(180deg,#1e3a7b_0%,#152d68_40%,#0f1f4d_100%)] border-b border-white/[0.08] px-6 h-16 flex items-center justify-between sticky top-0 z-[100]">

          {/* Toggle sidebar (visible only when closed) */}
          <div className="w-10 flex items-center">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebar(true)}
                className="flex items-center justify-center rounded-[6px] px-2 py-[6px]
                  bg-white/[.08] border-none cursor-pointer text-white/70
                  hover:bg-white/[.14] transition-colors duration-200"
              >
                <Menu size={20} />
              </button>
            )}
          </div>

          {/* Center brand */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="flex items-baseline gap-0.5">
              <span className="font-serif text-[22px] font-black text-white" style={{ letterSpacing: -1 }}>Pay</span>
              <span className="zen-text font-serif text-[22px] font-black" style={{ letterSpacing: -1 }}>Zen</span>
            </div>
            <p className="text-[8px] tracking-[0.28em] uppercase text-white/25 m-0">SECURE · SMART · BANKING</p>
          </div>

          {/* Right: bell + avatar */}
          <div className="flex items-center gap-3">
            <button className="bg-white/[0.06] border border-white/[0.12] rounded-[10px] p-2 cursor-pointer relative flex hover:bg-white/10 transition-colors">
              <Bell size={17} color="rgba(255,255,255,0.6)" />
              <span className="absolute top-[5px] right-[5px] w-[7px] h-[7px] rounded-full bg-red-500 border-[1.5px] border-[#0f1f4b]" />
            </button>
            <div className="flex items-center gap-2">
              <div
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg,#1e3a7b,#3b82f6)" }}
              >
                AD
              </div>
              <span className="text-[13px] font-semibold text-white/[0.85] whitespace-nowrap">Hello, Admin</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-7 flex-1 overflow-y-auto">
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