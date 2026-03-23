import {
  Eye, EyeOff, ArrowDownToLine, ArrowUpFromLine, UserCircle, BookUser,
  CheckCircle, Receipt, Headset, Wallet, Plane, Hotel, ShoppingBag,
  TvMinimal, TrendingUp, ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ── Keyframes — only animations that Tailwind cannot generate ── */
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

  .anim-card-in    { animation: cardIn  0.65s cubic-bezier(0.34,1.3,0.64,1) both; }
  .anim-shimmer    { animation: shimmerSlide 4s ease-in-out infinite; }
  .anim-chip       { animation: chipShine   3s ease-in-out infinite; }
  .anim-fade-up-1  { animation: fadeUp 0.5s ease 0.20s both; }
  .anim-fade-up-2  { animation: fadeUp 0.5s ease 0.30s both; }
  .anim-fade-up-3  { animation: fadeUp 0.5s ease 0.40s both; }

  .action-tile {
    transition: all 0.22s cubic-bezier(.4,0,.2,1);
    background: rgba(255,255,255,0.62) !important;
    box-shadow: 0 4px 16px rgba(30,64,175,0.15), 0 1px 3px rgba(0,0,0,0.08) !important;
  }
  .action-tile:hover {
    transform: translateY(-4px) scale(1.03);
    background: rgba(255,255,255,0.90) !important;
    box-shadow: 0 12px 36px rgba(30,64,175,0.14), 0 2px 8px rgba(0,0,0,0.06) !important;
  }

  .bank-card-body {
    background: linear-gradient(135deg, #1e3a7b 0%, #152d68 50%, #0f1f4d 100%);
    background-image:
      repeating-linear-gradient(
        110deg,
        transparent, transparent 28px,
        rgba(255,255,255,0.018) 28px,
        rgba(255,255,255,0.018) 29px
      ),
      linear-gradient(135deg, #1e3a7b 0%, #152d68 50%, #0f1f4d 100%);
  }
  .bank-card-outer {
    background: linear-gradient(135deg,rgba(255,255,255,0.25) 0%,rgba(255,255,255,0.05) 50%,rgba(100,140,255,0.20) 100%);
  }
  .chip-body {
    background: linear-gradient(135deg,#d4a843 0%,#f0c55a 30%,#c49530 60%,#e8b840 100%);
    box-shadow: 0 2px 10px rgba(212,168,67,0.45), inset 0 1px 0 rgba(255,255,255,0.30);
  }
  .chip-cell { background: rgba(180,130,20,0.45); }
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
  .txn-card  { background: rgba(255,255,255,0.58); }
  .txn-badge-credit { background: rgba(5,150,105,0.09); }
  .txn-badge-debit  { background: rgba(220,38,38,0.09); }
  .txn-icon-credit  { background: rgba(5,150,105,0.11); }
  .txn-icon-debit   { background: rgba(220,38,38,0.10); }
  .txns-wrap { background: rgba(255,255,255,0.62); box-shadow: 0 4px 26px rgba(30,64,175,0.08); }
  .balance-text { text-shadow: 0 2px 20px rgba(255,255,255,0.20); }
  .trend-badge { background: rgba(134,239,172,0.15); border-color: rgba(134,239,172,0.30); }
`;

export default function DashboardHome() {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const payzenUser = JSON.parse(localStorage.getItem("payzen_user") || "{}");
  const userName = payzenUser?.name || "User";

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLES;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const quickActions = [
    { name:"Deposit Money",    icon:ArrowDownToLine, path:"/deposit",      iconColor:"text-emerald-600", bg:"bg-emerald-500/10" },
    { name:"Withdraw",         icon:ArrowUpFromLine, path:"/withdraw",     iconColor:"text-red-600",     bg:"bg-red-500/10"     },
    { name:"My Profile",       icon:UserCircle,      path:"/profile",      iconColor:"text-violet-600",  bg:"bg-violet-500/10"  },
    { name:"View Account",     icon:BookUser,        path:"/balance",      iconColor:"text-sky-700",     bg:"bg-sky-500/10"     },
    { name:"KYC Verification", icon:CheckCircle,     path:"/kyc",          iconColor:"text-green-600",   bg:"bg-green-500/10"   },
    { name:"Transactions",     icon:Receipt,         path:"/transactions", iconColor:"text-amber-600",   bg:"bg-amber-500/10"   },
    { name:"Help & Support",   icon:Headset,         path:"/helpsupport",  iconColor:"text-cyan-600",    bg:"bg-cyan-500/10"    },
    { name:"My Wallet",        icon:Wallet,          path:"/wallet",       iconColor:"text-purple-600",  bg:"bg-purple-500/10"  },
  ];

  const recentTxns = [
    { name:"Amazon Purchase", amount:"−₹2,450",  date:"Today, 2:34 PM", type:"debit",  icon:ShoppingBag    },
    { name:"Salary Credit",   amount:"+₹85,000", date:"Yesterday",      type:"credit", icon:ArrowDownToLine},
    { name:"Hotel Booking",   amount:"−₹6,200",  date:"Feb 20",         type:"debit",  icon:Hotel          },
    { name:"Flight Ticket",   amount:"−₹12,800", date:"Feb 18",         type:"debit",  icon:Plane          },
  ];

  const tileBase = () =>
    `action-tile flex flex-col items-center text-center py-5 px-3 sm:py-6 sm:px-4 rounded-[18px] cursor-pointer
     border border-white/80 backdrop-blur-[18px]`;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ fontFamily:"'Sora','DM Sans','Segoe UI',sans-serif", color:"#1e293b" }}>

      {/* ── Ambient blobs ── */}
      <div className="fixed -top-32 left-[8%]  w-[520px] h-[520px] rounded-full bg-indigo-400/10  blur-3xl pointer-events-none -z-10" />
      <div className="fixed -bottom-16 right-[4%] w-[460px] h-[460px] rounded-full bg-emerald-400/[.08] blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-[38%]  -left-24   w-[380px] h-[380px] rounded-full bg-amber-300/[.07]  blur-3xl pointer-events-none -z-10" />

      {/* ── CONTENT ── */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-9">

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-[0.10em] uppercase mb-4 sm:mb-6 px-0 sm:px-1">
          Account Overview
        </h2>

        {/* ══════════════════════════════
            PREMIUM BANK CARD
        ══════════════════════════════ */}
        <div className="anim-card-in mb-6 sm:mb-8">
          <div className="bank-card-outer rounded-[20px] sm:rounded-[28px] p-[2px]">
            <div className="bank-card-body relative rounded-[18px] sm:rounded-[26px] overflow-hidden min-h-[180px] sm:min-h-[220px] px-6 sm:px-10 pt-6 sm:pt-9 pb-6 sm:pb-8">

              <div className="glow-tr absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none" />
              <div className="glow-bl absolute -bottom-12 left-[25%] w-56 h-56 rounded-full pointer-events-none" />

              <div className="absolute inset-0 overflow-hidden rounded-[18px] sm:rounded-[26px] pointer-events-none">
                <div className="shimmer-sweep anim-shimmer absolute top-0 left-0 w-[40%] h-full" />
              </div>

              <div className="badge-ac absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 whitespace-nowrap
                              px-3 sm:px-4 py-1 rounded-full border border-white/[.12] backdrop-blur-sm
                              text-[8px] sm:text-[9px] font-semibold tracking-[.22em] uppercase text-white/40">
                My Saving A/C
              </div>

              {/* TOP ROW */}
              <div className="flex justify-between items-start mb-5 sm:mb-7">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="logo-icon w-8 sm:w-9 h-8 sm:h-9 rounded-[10px] flex items-center justify-center flex-shrink-0">
                    <Wallet size={15} strokeWidth={2} color="#fff" />
                  </div>
                  <div>
                    <p className="m-0 text-[11px] sm:text-[13px] font-bold text-white tracking-wide">PayZen</p>
                    <p className="m-0 text-[7px] sm:text-[9px] text-white/40 tracking-[.14em] uppercase">Premium Banking</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-60 sm:w-[26px] sm:h-[26px]">
                    <path d="M5 12.5C5 9.46 7.46 7 10.5 7"  stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3 12.5C3 8.36 6.36 5 10.5 5"  stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity=".6"/>
                    <path d="M7 12.5C7 10.57 8.57 9 10.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity=".85"/>
                    <circle cx="10.5" cy="12.5" r="1.5" fill="white"/>
                  </svg>
                  <span className="text-[7px] sm:text-[9px] text-white/35 tracking-[.20em] uppercase font-semibold">Savings</span>
                </div>
              </div>

              {/* CHIP + CARD NUMBER */}
              <div className="flex items-center gap-3 sm:gap-5 mb-5 sm:mb-6">
                <div className="chip-body anim-chip relative w-[40px] sm:w-[46px] h-[30px] sm:h-[36px] rounded-lg overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[2px] p-1">
                    {[...Array(9)].map((_,i) => (
                      <div key={i} className="chip-cell rounded-[1px]" />
                    ))}
                  </div>
                  <div className="chip-contact absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                  w-[18px] sm:w-[22px] h-[13px] sm:h-[16px] rounded-[3px] border-[1.5px]" />
                </div>
                <span className="text-[12px] sm:text-[15px] font-semibold tracking-[.22em]"
                      style={{ fontFamily:"'JetBrains Mono',monospace",
                               color: showDetails ? "rgba(255,255,255,.92)" : "rgba(255,255,255,.70)",
                               textShadow:"0 1px 8px rgba(0,0,0,.4)" }}>
                  {showDetails ? "1234  5678  9012  0123" : "••••  ••••  ••••  0123"}
                </span>
              </div>

              {/* BOTTOM ROW */}
              <div className="flex items-end justify-between gap-3 sm:gap-5 flex-wrap">
                <div className="flex gap-6 sm:gap-10 items-end flex-wrap">
                  <div>
                    <p className="m-0 text-[7px] sm:text-[9px] text-white/40 tracking-[.16em] uppercase mb-1">Account Holder</p>
                    <p className="m-0 text-[12px] sm:text-[15px] font-extrabold text-white tracking-widest uppercase"
                       style={{ textShadow:"0 1px 12px rgba(255,255,255,.25)" }}>
                      {userName}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="m-0 text-[7px] sm:text-[9px] text-white/40 tracking-[.16em] uppercase mb-1">Account Balance</p>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <p className="balance-text m-0 text-[20px] sm:text-[30px] font-extrabold text-white tracking-tight transition-all duration-300">
                        {showDetails ? "₹ 50,000" : "₹ •••••"}
                      </p>
                      {showDetails && (
                        <div className="trend-badge flex items-center gap-1 px-2 py-1 rounded-md border">
                          <TrendingUp size={9} className="text-green-300" />
                          <span className="text-[8px] font-bold text-green-300">+2.4%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 sm:gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <div className="mc-red    w-[28px] sm:w-[34px] h-[28px] sm:h-[34px] rounded-full" />
                      <div className="mc-orange  w-[28px] sm:w-[34px] h-[28px] sm:h-[34px] rounded-full -ml-2 sm:-ml-3" />
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="show-btn flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-[9px] rounded-[10px]
                               text-[10px] sm:text-[12px] font-bold text-white/85 tracking-wide
                               border border-white/[.22] backdrop-blur-md
                               transition-all duration-200"
                  >
                    {showDetails ? <EyeOff size={11} className="sm:w-[13px] sm:h-[13px]"/> : <Eye size={11} className="sm:w-[13px] sm:h-[13px]"/>}
                    <span className="hidden sm:inline">{showDetails ? "Hide Details" : "Show Details"}</span>
                    <span className="sm:hidden">{showDetails ? "Hide" : "Show"}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── QUICK ACTIONS ── */}
        <div className="anim-fade-up-1 mb-6 sm:mb-7">
          <div className="flex justify-between items-center mb-3 sm:mb-4 px-0 sm:px-1">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-wide">Quick Actions</h3>
            <button className="text-[11px] sm:text-[13px] font-semibold text-blue-500 flex items-center gap-1 hover:text-blue-600 transition-colors">
              View all <ChevronRight size={14}/>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-4">
            {quickActions.slice(0,4).map((item,i) => {
              const Icon = item.icon;
              return (
                <div key={`q-${i}`} className={tileBase()}
                  onClick={()=>navigate(item.path)}>
                  <div className={`w-12 sm:w-14 h-12 sm:h-14 rounded-[18px] flex items-center justify-center mb-2 sm:mb-3 transition-all duration-200 ${item.bg}`}>
                    <Icon size={22} className={`${item.iconColor} sm:w-[26px] sm:h-[26px]`} strokeWidth={2.1}/>
                  </div>
                  <p className="text-[11px] sm:text-[13px] font-bold text-blue-950 leading-snug">{item.name}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {quickActions.slice(4,8).map((item,i) => {
              const Icon = item.icon;
              return (
                <div key={`q-${i+4}`} className={tileBase()}
                  onClick={()=>navigate(item.path)}>
                  <div className={`w-12 sm:w-14 h-12 sm:h-14 rounded-[18px] flex items-center justify-center mb-2 sm:mb-3 transition-all duration-200 ${item.bg}`}>
                    <Icon size={22} className={`${item.iconColor} sm:w-[26px] sm:h-[26px]`} strokeWidth={2.1}/>
                  </div>
                  <p className="text-[11px] sm:text-[13px] font-bold text-blue-950 leading-snug">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* ── RECENT TRANSACTIONS ── */}
        <div className="anim-fade-up-3 pb-6 sm:pb-8">
          <div className="txns-wrap backdrop-blur-[18px] rounded-[18px] sm:rounded-[22px] border border-white/80 overflow-hidden">

            <div className="flex justify-between items-center px-4 sm:px-8 py-4 sm:py-5 border-b border-slate-100/80">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-wide">Recent Transactions</h3>
              <button onClick={()=>navigate("/transactions")}
                className="text-[11px] sm:text-[13px] font-semibold text-blue-500 flex items-center gap-1 hover:text-blue-600 transition-colors">
                <span className="hidden sm:inline">View All</span>
                <span className="sm:hidden">All</span>
                <ChevronRight size={14}/>
              </button>
            </div>

            <div className="overflow-x-auto overflow-y-auto max-h-[340px]">
              <table className="w-full text-center text-sm">
                <thead className="sticky top-0 z-10 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950">
                  <tr>
                    <th className="px-3 sm:px-6 py-2 sm:py-3.5 text-[9px] sm:text-[11px] font-bold text-white tracking-[.16em] uppercase">SR NO</th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3.5 text-[9px] sm:text-[11px] font-bold text-white tracking-[.16em] uppercase">Transaction</th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3.5 text-[9px] sm:text-[11px] font-bold text-white tracking-[.16em] uppercase">Type</th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3.5 text-[9px] sm:text-[11px] font-bold text-white tracking-[.16em] uppercase hidden sm:table-cell">Date & Time</th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3.5 text-[9px] sm:text-[11px] font-bold text-white tracking-[.16em] uppercase hidden sm:table-cell">Status</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3.5 text-[9px] sm:text-[11px] font-bold text-white tracking-[.16em] uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTxns.map((txn, i) => {
                    const Icon = txn.icon;
                    const isC = txn.type === "credit";
                    return (
                      <tr key={i} className="border-b border-slate-200 hover:bg-blue-50 transition">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-[11px] sm:text-[13px] font-bold text-black">
                          {String(i + 1).padStart(2)}
                        </td>
                        <td className="px-2 sm:px-4 py-3 sm:py-4 text-center">
                          <div className="flex items-center justify-center gap-2 sm:gap-3">
                            <div className={`w-7 sm:w-9 h-7 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0
                              ${isC ? "bg-emerald-100" : "bg-red-100"}`}>
                              <Icon size={14} className={`${isC ? "text-emerald-600" : "text-red-600"} sm:w-4 sm:h-4`} strokeWidth={2}/>
                            </div>
                            <span className="text-[10px] sm:text-[14px] font-semibold text-slate-800 whitespace-nowrap">{txn.name}</span>
                          </div>
                        </td>
                        <td className="px-2 sm:px-4 py-3 sm:py-4">
                          <span className={`text-[9px] sm:text-[12px] font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full
                            ${isC ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
                            {isC ? "▲ Cr" : "▼ Dr"}
                          </span>
                        </td>
                        <td className="px-2 sm:px-4 py-3 sm:py-4 text-[9px] sm:text-[13px] text-slate-500 font-medium hidden sm:table-cell">{txn.date}</td>
                        <td className="px-2 sm:px-4 py-3 sm:py-4 hidden sm:table-cell">
                          <span className="text-[9px] sm:text-[12px] font-semibold text-emerald-600">Success</span>
                        </td>
                        <td className={`px-3 sm:px-6 py-3 sm:py-4 text-[11px] sm:text-[15px] font-bold ${isC ? "text-emerald-600" : "text-red-600"}`}>
                          {txn.amount}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center px-4 sm:px-8 py-2 sm:py-3 border-t border-slate-100/80 text-[10px] sm:text-[12px]"
                 style={{ background:"rgba(241,245,255,0.70)" }}>
              <span className="text-slate-400 font-medium">Showing {recentTxns.length} of {recentTxns.length}</span>
              <span className="text-slate-400 font-medium hidden sm:inline">Last updated: Today</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}