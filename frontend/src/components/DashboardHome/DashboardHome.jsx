import {
  Eye, EyeOff, ArrowDownToLine, ArrowUpFromLine, UserCircle, BookUser,
  CheckCircle, Receipt, Headset, Wallet, Plane, Hotel, ShoppingBag,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyTransactions } from "../../utils/apiServices";


/* ── Only animations Tailwind cannot generate ── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

  @keyframes shimmerSlide {
    0%   { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(300%) skewX(-15deg); }
  }
  @keyframes chipShine {
    0%,100% { opacity:0.7; }
    50%      { opacity:1; }
  }
  @keyframes cardIn {
    from { opacity:0; transform: translateY(24px) scale(0.98); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }
  @keyframes fadeUp {
    from { opacity:0; transform: translateY(16px); }
    to   { opacity:1; transform: translateY(0); }
  }

  .anim-card-in   { animation: cardIn  0.65s cubic-bezier(0.34,1.3,0.64,1) both; }
  .anim-shimmer   { animation: shimmerSlide 4s ease-in-out infinite; }
  .anim-chip      { animation: chipShine   3s ease-in-out infinite; }
  .anim-fade-up-1 { animation: fadeUp 0.5s ease 0.20s both; }
  .anim-fade-up-3 { animation: fadeUp 0.5s ease 0.40s both; }

  .bank-card-body {
    background: linear-gradient(135deg, #1e3a7b 0%, #152d68 50%, #0f1f4d 100%);
    background-image:
      repeating-linear-gradient(110deg,transparent,transparent 28px,rgba(255,255,255,0.018) 28px,rgba(255,255,255,0.018) 29px),
      linear-gradient(135deg, #1e3a7b 0%, #152d68 50%, #0f1f4d 100%);
  }
  .bank-card-outer { background: linear-gradient(135deg,rgba(255,255,255,0.25) 0%,rgba(255,255,255,0.05) 50%,rgba(100,140,255,0.20) 100%); }
  .chip-body {
    background: linear-gradient(135deg,#d4a843 0%,#f0c55a 30%,#c49530 60%,#e8b840 100%);
    box-shadow: 0 2px 10px rgba(212,168,67,0.45), inset 0 1px 0 rgba(255,255,255,0.30);
  }
  .chip-cell    { background: rgba(180,130,20,0.45); }
  .chip-contact { border-color: rgba(180,130,20,0.80); }
  .mc-red    { background: rgba(235,57,57,0.88);  box-shadow: 0 2px 12px rgba(235,57,57,0.50); }
  .mc-orange { background: rgba(255,153,0,0.88);  box-shadow: 0 2px 12px rgba(255,153,0,0.50); }
  .show-btn  { background: rgba(255,255,255,0.10); box-shadow: 0 2px 12px rgba(0,0,0,0.20); }
  .show-btn:hover { background: rgba(255,255,255,0.18); border-color: rgba(255,255,255,0.40) !important; }
  .badge-ac  { background: rgba(255,255,255,0.07); }
  .glow-tr   { background: radial-gradient(circle,rgba(100,160,255,0.12) 0%,transparent 65%); }
  .glow-bl   { background: radial-gradient(circle,rgba(80,120,255,0.14) 0%,transparent 70%); }
  .shimmer-sweep { background: linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.045) 50%,transparent 100%); }
  .logo-icon { background: linear-gradient(135deg,#3b82f6,#6366f1); box-shadow: 0 4px 14px rgba(99,102,241,0.45); }
  .txns-wrap { background: rgba(255,255,255,0.62); box-shadow: 0 4px 26px rgba(30,64,175,0.08); }
  .balance-text { text-shadow: 0 2px 20px rgba(255,255,255,0.20); }

  .action-tile {
    transition: all 0.22s cubic-bezier(.4,0,.2,1);
    box-shadow: 0 4px 16px rgba(30,64,175,0.10), 0 1px 3px rgba(0,0,0,0.06);
  }
  .action-tile:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 12px 36px rgba(30,64,175,0.14), 0 2px 8px rgba(0,0,0,0.06);
  }
`;

export default function DashboardHome() {
  const [showDetails, setShowDetails] = useState(false);
  const [accountData, setAccountData] = useState({
    balance: 0,
    account_number: "•••• •••• •••• ••••",
    recentTxns: [],
  });

  const navigate = useNavigate();
  const payzenUser = JSON.parse(localStorage.getItem("payzen_user") || "{}");
  const userName = payzenUser?.name || "User";
  const token = localStorage.getItem("payzen_token");

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLES;
    document.head.appendChild(el);
    fetchDashboardData();
    return () => document.head.removeChild(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDashboardData = async () => {
    try {
      const result = await getMyTransactions();
      if (result.ok && result.data.success) {
        setAccountData({
          balance: result.data.data.balance,
          account_number: result.data.data.account_number,
          recentTxns: result.data.data.transactions || [],
        });
      }
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    }
  };

  const getTransactionIcon = (note = "", type) => {
    const n = note.toLowerCase();
    if (n.includes("amazon")) return ShoppingBag;
    if (n.includes("hotel")) return Hotel;
    if (n.includes("flight")) return Plane;
    return type === "Deposit" ? ArrowDownToLine : ArrowUpFromLine;
  };

  const quickActions = [
    { name: "Account Money Transfer", icon: ArrowDownToLine, path: "/deposit", iconColor: "#10b981", bgColor: "#f0fdf4", borderColor: "#bbf7d0" },
    { name: "My Profile", icon: UserCircle, path: "/profile", iconColor: "#f59e0b", bgColor: "#fffbeb", borderColor: "#fde68a" },
    { name: "Account Details", icon: BookUser, path: "/details", iconColor: "#3b82f6", bgColor: "#eff6ff", borderColor: "#bfdbfe" },
    { name: "KYC Verification", icon: CheckCircle, path: "/kyc", iconColor: "#8b5cf6", bgColor: "#faf5ff", borderColor: "#e9d5ff" },
    { name: "Transactions", icon: Receipt, path: "/transactions", iconColor: "#06b6d4", bgColor: "#ecf9ff", borderColor: "#a5f3fc" },
    { name: "Help & Support", icon: Headset, path: "/helpsupport", iconColor: "#10b981", bgColor: "#f0fdf4", borderColor: "#bbf7d0" },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ fontFamily: "'Sora','DM Sans','Segoe UI',sans-serif", color: "#1e293b" }}
    >
      {/* Ambient blobs */}
      <div className="fixed -top-32 left-[8%]  w-80 sm:w-[520px] h-80 sm:h-[520px] rounded-full bg-indigo-400/10  blur-3xl pointer-events-none -z-10" />
      <div className="fixed -bottom-16 right-[4%] w-72 sm:w-[460px] h-72 sm:h-[460px] rounded-full bg-emerald-400/[.08] blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-[38%] -left-24    w-64 sm:w-[380px] h-64 sm:h-[380px] rounded-full bg-amber-300/[.07]  blur-3xl pointer-events-none -z-10" />

      {/* Page Content */}
      <div className="w-full px-3 sm:px-5 lg:px-8 py-4 sm:py-6 lg:py-9">

        <h2 className="text-lg sm:text-2xl font-extrabold text-slate-800 tracking-[0.10em] uppercase mb-4 sm:mb-6">
          Account Overview
        </h2>

        {/* ── BANK CARD ── */}
        <div className="anim-card-in mb-5 sm:mb-8">
          <div className="bank-card-outer rounded-[18px] sm:rounded-[28px] p-[2px]">
            <div className="bank-card-body relative rounded-[16px] sm:rounded-[26px] overflow-hidden min-h-[170px] sm:min-h-[220px] px-4 sm:px-10 pt-5 sm:pt-9 pb-5 sm:pb-8">

              <div className="glow-tr absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none" />
              <div className="glow-bl absolute -bottom-12 left-[25%] w-56 h-56 rounded-full pointer-events-none" />
              <div className="absolute inset-0 overflow-hidden rounded-[16px] sm:rounded-[26px] pointer-events-none">
                <div className="shimmer-sweep anim-shimmer absolute top-0 left-0 w-[40%] h-full" />
              </div>

              {/* Account type badge */}
              <div className="badge-ac absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 whitespace-nowrap
                              px-3 py-0.5 sm:py-1 rounded-full border border-white/[.12] backdrop-blur-sm
                              text-[8px] sm:text-[9px] font-semibold tracking-[.22em] uppercase text-white/40">
                My Saving A/C
              </div>

              {/* Top row */}
              <div className="flex justify-between items-start mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="logo-icon w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                    <Wallet size={18} strokeWidth={2.5} color="#fff" />
                  </div>
                  <div>
                    <h1 className="m-0 text-xs sm:text-[15px] font-black text-white tracking-[0.1em] uppercase">PayZen</h1>
                    <p className="m-0 text-[8px] sm:text-[10px] text-white/40 font-bold tracking-[0.2em] uppercase mt-0.5">Premium</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 grayscale opacity-50">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="sm:w-8 sm:h-8">
                    <path d="M5 12.5C5 9.46 7.46 7 10.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M3 12.5C3 8.36 6.36 5 10.5 5" stroke="white" strokeWidth="2" strokeLinecap="round" opacity=".5" />
                    <circle cx="10.5" cy="12.5" r="2" fill="white" />
                  </svg>
                  <span className="text-[7px] sm:text-[9px] text-white/40 tracking-[0.25em] font-black uppercase">Savings</span>
                </div>
              </div>

              {/* Chip + Card number */}
              <div className="flex items-center gap-3 sm:gap-6 mb-8 sm:mb-10">
                <div className="chip-body anim-chip relative w-10 sm:w-[50px] h-7.5 sm:h-[40px] rounded-lg overflow-hidden shrink-0">
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[2px] p-1.5">
                    {[...Array(9)].map((_, i) => <div key={i} className="chip-cell rounded-sm" />)}
                  </div>
                  <div className="chip-contact absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                  w-5 h-3.5 sm:w-[24px] sm:h-[18px] rounded-[4px] border-2" />
                </div>
                <span
                  className="text-[14px] sm:text-[19px] font-black tracking-[0.15em] sm:tracking-[0.25em]"
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    color: showDetails ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.75)",
                    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  {showDetails
                    ? (accountData.account_number || "").match(/.{1,4}/g)?.join(" ") || "•••• •••• •••• ••••"
                    : `•••• •••• •••• ${(accountData.account_number || "").slice(-4)}`}
                </span>
              </div>

              {/* Bottom row */}
              <div className="flex items-end justify-between gap-1 sm:gap-5">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 items-start sm:items-end min-w-0">
                  <div className="min-w-0">
                    <p className="m-0 text-[8px] sm:text-[11px] text-white/40 font-black uppercase tracking-[0.2em] mb-1 sm:mb-1.5">Account Holder</p>
                    <p className="m-0 text-xs sm:text-[17px] font-black text-white tracking-[0.12em] uppercase border-b-2 border-white/10 pb-0.5 truncate"
                      style={{ textShadow: "0 2px 15px rgba(255,255,255,0.3)" }}>
                      {userName}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="m-0 text-[11px] text-white/40 font-black uppercase tracking-[0.15em] mb-1.5">Balance</p>
                    <p className="balance-text m-0 text-4xl font-black text-white tracking-tighter whitespace-nowrap">
                      {showDetails ? `₹ ${accountData.balance.toLocaleString()}` : "₹ •••••"}
                    </p>
                  </div>
                  {/* Balance visible on mobile below name */}
                  <div className="sm:hidden">
                    <p className="m-0 text-[8px] text-white/40 font-black uppercase tracking-[0.15em] mb-0.5">Balance</p>
                    <p className="balance-text m-0 text-[17px] font-black text-white tracking-widest leading-none">
                      {showDetails ? `₹ ${accountData.balance.toLocaleString()}` : "₹ •••••"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 sm:gap-3 shrink-0">
                  <div className="flex">
                    <div className="mc-red    w-6 h-6 sm:w-[34px] sm:h-[34px] rounded-full" />
                    <div className="mc-orange  w-6 h-6 sm:w-[34px] sm:h-[34px] rounded-full -ml-2 sm:-ml-3" />
                  </div>
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="show-btn flex items-center gap-1 sm:gap-2 px-2.5 sm:px-5 py-1 sm:py-[9px] rounded-[10px]
                               text-[10px] sm:text-[12px] font-bold text-white/85 tracking-wide
                               border border-white/[.22] backdrop-blur-md transition-all duration-200"
                  >
                    {showDetails ? <EyeOff size={10} className="sm:w-[13px] sm:h-[13px]" /> : <Eye size={10} className="sm:w-[13px] sm:h-[13px]" />}
                    <span className="hidden sm:inline">{showDetails ? "Hide Details" : "Show Details"}</span>
                    <span className="sm:hidden">{showDetails ? "Hide" : "Show"}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── QUICK ACTIONS ── */}
        <div className="anim-fade-up-1 mb-5 sm:mb-7">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h3 className="text-base sm:text-xl font-extrabold text-slate-800 tracking-wide">Quick Actions</h3>
            <button className="text-[11px] sm:text-[13px] font-semibold text-blue-500 flex items-center gap-1 hover:text-blue-600 transition-colors">
              View all <ChevronRight size={14} />
            </button>
          </div>

          {/* 2 cols on mobile/tablet, 3 cols on desktop/laptop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-7">
            {quickActions.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={`q-${i}`}
                  className="action-tile flex flex-col items-center text-center py-4 sm:py-5 px-2 sm:px-4 rounded-[16px] sm:rounded-[18px] cursor-pointer border backdrop-blur-[18px]"
                  style={{ background: item.bgColor, borderColor: item.borderColor }}
                  onClick={() => navigate(item.path)}
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-[14px] sm:rounded-[18px] flex items-center justify-center mb-2 shadow-sm"
                    style={{ background: item.bgColor }}>
                    <Icon size={20} style={{ color: item.iconColor }} strokeWidth={2.4} />
                  </div>
                  <p className="text-[10px] sm:text-[12px] font-extrabold text-slate-900 leading-snug uppercase tracking-tight">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RECENT TRANSACTIONS ── */}
        <div className="anim-fade-up-3 pb-5 sm:pb-8">
          <div className="txns-wrap backdrop-blur-[18px] rounded-[16px] sm:rounded-[22px] border border-white/80 overflow-hidden">

            <div className="flex justify-between items-center px-4 sm:px-8 py-3 sm:py-5 border-b border-slate-100/80">
              <h3 className="text-base sm:text-xl font-extrabold text-slate-800 tracking-wide">Recent Transactions</h3>
              <button
                onClick={() => navigate("/transactions")}
                className="text-[11px] sm:text-[13px] font-semibold text-blue-500 flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                <span className="hidden sm:inline">View All</span>
                <span className="sm:hidden">All</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto overflow-y-auto max-h-[320px] sm:max-h-[340px]">
              <table className="w-full text-center text-sm min-w-[340px]">
                <thead className="sticky top-0 z-10 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950">
                  <tr>
                    {["SR", "Transaction", "Type", "Date & Time", "Status", "Amount"].map((h, i) => (
                      <th
                        key={h}
                        className={`px-2 sm:px-5 py-2 sm:py-3.5 text-[9px] sm:text-[11px] font-bold text-white tracking-[.16em] uppercase whitespace-nowrap
                          ${i === 3 || i === 4 ? "hidden sm:table-cell" : ""}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accountData.recentTxns.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-10 text-slate-400 italic text-sm">No transactions found</td>
                    </tr>
                  ) : (
                    accountData.recentTxns.map((txn, i) => {
                      const isCredit = txn.type === "Deposit";
                      const Icon = getTransactionIcon(txn.note, txn.type);
                      return (
                        <tr key={i} className="border-b border-slate-200 hover:bg-blue-50 transition-colors">
                          <td className="px-2 sm:px-5 py-2.5 sm:py-4 text-[11px] sm:text-[13px] font-bold text-black">
                            {String(i + 1).padStart(2, "0")}
                          </td>
                          <td className="px-2 sm:px-4 py-2.5 sm:py-4">
                            <div className="flex items-center justify-center gap-1.5 sm:gap-3">
                              <div className={`w-6 h-6 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0
                                ${isCredit ? "bg-emerald-100" : "bg-red-100"}`}>
                                <Icon size={12} className={isCredit ? "text-emerald-600" : "text-red-600"} strokeWidth={2} />
                              </div>
                              <span className="text-[10px] sm:text-[14px] font-semibold text-slate-800 whitespace-nowrap">
                                {txn.note || (isCredit ? "Credit" : "Debit")}
                              </span>
                            </div>
                          </td>
                          <td className="px-2 sm:px-4 py-2.5 sm:py-4">
                            <span className={`text-[9px] sm:text-[12px] font-semibold px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full
                              ${isCredit ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
                              {isCredit ? "▲ Cr" : "▼ Dr"}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 py-2.5 sm:py-4 text-[9px] sm:text-[13px] text-slate-500 font-medium hidden sm:table-cell whitespace-nowrap">
                            {txn.date}
                          </td>
                          <td className="px-2 sm:px-4 py-2.5 sm:py-4 hidden sm:table-cell">
                            <span className="text-[9px] sm:text-[12px] font-semibold text-emerald-600">Success</span>
                          </td>
                          <td className={`px-2 sm:px-5 py-2.5 sm:py-4 text-[11px] sm:text-[15px] font-bold whitespace-nowrap
                            ${isCredit ? "text-emerald-600" : "text-red-600"}`}>
                            {isCredit ? "+" : "−"}₹{txn.amount.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden flex flex-col gap-3 p-3 max-h-[400px] overflow-y-auto">
              {accountData.recentTxns.length === 0 ? (
                <div className="py-8 text-center text-slate-400 italic text-sm">No transactions found</div>
              ) : (
                accountData.recentTxns.map((txn, i) => {
                  const isCredit = txn.type === "Deposit";
                  const Icon = getTransactionIcon(txn.note, txn.type);
                  return (
                    <div key={i} className="bg-white/60 hover:bg-white transition-colors border border-slate-100 rounded-[20px] p-4 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm
                          ${isCredit ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                          <Icon size={20} className={isCredit ? "text-emerald-600" : "text-rose-600"} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-black text-slate-800 line-clamp-1">
                            {txn.note || (isCredit ? "Credit" : "Debit")}
                          </span>
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">
                            {txn.date} · {txn.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-[16px] font-black ${isCredit ? "text-emerald-600" : "text-rose-600"}`}>
                          {isCredit ? "+" : "−"}₹{txn.amount.toLocaleString()}
                        </span>
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Success</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div
              className="flex justify-between items-center px-4 sm:px-8 py-2 sm:py-3 border-t border-slate-100/80 text-[10px] sm:text-[12px]"
              style={{ background: "rgba(241,245,255,0.70)" }}
            >
              <span className="text-slate-400 font-medium">Showing {accountData.recentTxns.length} records</span>
              <span className="text-slate-400 font-medium hidden sm:inline">Last updated: Just now</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}