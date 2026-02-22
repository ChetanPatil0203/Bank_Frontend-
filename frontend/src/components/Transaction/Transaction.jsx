import { useState, useEffect } from "react";
import {
  Wallet, Search, Calendar, ArrowDownCircle, ArrowUpCircle,
  TrendingUp, Filter, ChevronRight
} from "lucide-react";

/* ── Keyframes ── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes cardIn {
    from { opacity:0; transform:translateY(22px) scale(.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes shimmerSlide {
    0%   { transform: translateX(-120%) skewX(-12deg); }
    100% { transform: translateX(400%)  skewX(-12deg); }
  }
  .txn-card-in  { animation: cardIn  .55s cubic-bezier(.34,1.3,.64,1) both; }
  .txn-fade-1   { animation: fadeUp  .45s ease .10s both; }
  .txn-fade-2   { animation: fadeUp  .45s ease .20s both; }
  .txn-fade-3   { animation: fadeUp  .45s ease .30s both; }

  .balance-card-bg {
    background: linear-gradient(135deg, #1e3a7b 0%, #152d68 50%, #0f1f4d 100%);
    background-image:
      repeating-linear-gradient(110deg,transparent,transparent 28px,rgba(255,255,255,.018) 28px,rgba(255,255,255,.018) 29px),
      linear-gradient(135deg, #1e3a7b 0%, #152d68 50%, #0f1f4d 100%);
  }
  .balance-shimmer { animation: shimmerSlide 5s ease-in-out infinite; }
  .balance-shimmer-bar { background: linear-gradient(90deg,transparent 0%,rgba(255,255,255,.06) 50%,transparent 100%); }
  .bal-glow-tr { background: radial-gradient(circle,rgba(100,160,255,.14) 0%,transparent 65%); }
  .bal-glow-bl { background: radial-gradient(circle,rgba(80,120,255,.18) 0%,transparent 70%); }

  .txn-row {
    transition: all 0.20s cubic-bezier(.4,0,.2,1);
  }
  .txn-row:hover {
    transform: translateX(4px);
    box-shadow: 0 6px 24px rgba(30,64,175,.10);
    background: rgba(255,255,255,.95) !important;
  }

  .glass-wrap { background: rgba(255,255,255,.70); box-shadow: 0 4px 28px rgba(30,64,175,.09); }
  .filter-wrap { background: rgba(255,255,255,.80); box-shadow: 0 2px 12px rgba(30,64,175,.07); }
`;

export default function TransactionHistory() {
  const [search, setSearch]       = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLES;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const currentBalance = "₹45,800";

  const transactions = [
    { id:1, type:"Deposit",  amount:"₹10,000", date:"2026-02-05", time:"10:45 AM", status:"Success", user:"Chetan Patil" },
    { id:2, type:"Withdraw", amount:"₹2,500",  date:"2026-02-04", time:"03:20 PM", status:"Success", user:"Chetan Patil" },
    { id:3, type:"Deposit",  amount:"₹5,000",  date:"2026-02-02", time:"11:10 AM", status:"Success", user:"Rahul Sharma" },
  ];

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.type.toLowerCase().includes(search.toLowerCase()) ||
      txn.user.toLowerCase().includes(search.toLowerCase());
    const matchesDate = dateFilter === "" || txn.date === dateFilter;
    return matchesSearch && matchesDate;
  });

  const totalDeposit  = transactions.filter(t=>t.type==="Deposit").length;
  const totalWithdraw = transactions.filter(t=>t.type==="Withdraw").length;

  return (
    <div className="min-h-screen bg-[#f0f4ff] py-10 px-6"
         style={{ fontFamily:"'Sora','DM Sans',sans-serif" }}>

      {/* Ambient blobs */}
      <div className="fixed -top-32 left-[5%] w-[480px] h-[480px] rounded-full bg-indigo-400/10 blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-[3%] w-[400px] h-[400px] rounded-full bg-blue-300/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">

        {/* PAGE TITLE */}
        <div className="txn-card-in mb-6 px-1">
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-[.10em] uppercase">
            Transaction History
          </h2>
          <p className="text-[13px] text-slate-400 mt-1 font-medium">All your account activity in one place</p>
        </div>

        {/* ── BALANCE CARD ── */}
        <div className="txn-card-in mb-6">
          <div className="balance-card-bg rounded-[24px] p-[2px]"
               style={{ boxShadow:"" }}>
            <div className="relative rounded-[22px] overflow-hidden px-8 py-7">

              {/* texture */}
              <div className="bal-glow-tr absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none" />
              <div className="bal-glow-bl absolute -bottom-10 left-[20%] w-48 h-48 rounded-full pointer-events-none" />
              <div className="absolute inset-0 overflow-hidden rounded-[22px] pointer-events-none">
                <div className="balance-shimmer balance-shimmer-bar absolute top-0 left-0 w-[40%] h-full" />
              </div>

              <div className="relative flex justify-between items-center flex-wrap gap-6">

                {/* Left: balance */}
                <div>
                  <p className="text-[11px] text-white/45 tracking-[.18em] uppercase mb-2">Current Balance</p>
                  <p className="text-[38px] font-extrabold text-white tracking-tight leading-none"
                     style={{ textShadow:"0 2px 24px rgba(255,255,255,.18)", fontFamily:"'Sora',sans-serif" }}>
                    {currentBalance}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp size={12} className="text-green-300" />
                    <span className="text-[11px] text-green-300 font-semibold">+2.4% this month</span>
                  </div>
                </div>

                {/* Right: mini stats */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center px-5 py-3 rounded-[14px] border border-white/[.14]"
                       style={{ background:"rgba(255,255,255,.10)" }}>
                    <ArrowDownCircle size={20} className="text-green-300 mb-1" />
                    <p className="text-[22px] font-extrabold text-white leading-none">{totalDeposit}</p>
                    <p className="text-[10px] text-white/45 uppercase tracking-widest mt-1">Deposits</p>
                  </div>
                  <div className="flex flex-col items-center px-5 py-3 rounded-[14px] border border-white/[.14]"
                       style={{ background:"rgba(255,255,255,.10)" }}>
                    <ArrowUpCircle size={20} className="text-red-300 mb-1" />
                    <p className="text-[22px] font-extrabold text-white leading-none">{totalWithdraw}</p>
                    <p className="text-[10px] text-white/45 uppercase tracking-widest mt-1">Withdrawals</p>
                  </div>
                  <div className="flex flex-col items-center px-5 py-3 rounded-[14px] border border-white/[.14]"
                       style={{ background:"rgba(255,255,255,.10)" }}>
                    <Wallet size={20} className="text-blue-200 mb-1" />
                    <p className="text-[22px] font-extrabold text-white leading-none">{transactions.length}</p>
                    <p className="text-[10px] text-white/45 uppercase tracking-widest mt-1">Total</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FILTERS ── */}
        <div className="txn-fade-1 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="filter-wrap flex items-center gap-3 rounded-[14px] px-4 py-3 border border-white/80 backdrop-blur-sm">
            <Search size={17} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by user or type..."
              className="w-full bg-transparent outline-none text-[14px] text-slate-700 placeholder:text-slate-400 font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-wrap flex items-center gap-3 rounded-[14px] px-4 py-3 border border-white/80 backdrop-blur-sm">
            <Calendar size={17} className="text-slate-400 flex-shrink-0" />
            <input
              type="date"
              className="w-full bg-transparent outline-none text-[14px] text-slate-700 font-medium"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>

        {/* ── TRANSACTIONS TABLE ── */}
        <div className="txn-fade-2 glass-wrap backdrop-blur-[18px] rounded-[22px] border border-white/80 overflow-hidden">

          {/* Title bar */}
          <div className="flex justify-between items-center px-7 py-5 border-b border-slate-100/80">
            <h3 className="text-[18px] font-extrabold text-slate-800 tracking-wide">Recent Transactions</h3>
            <span className="text-[12px] font-semibold text-blue-500 flex items-center gap-1">
              {filteredTransactions.length} records <ChevronRight size={13}/>
            </span>
          </div>

      {/* Scrollable table */}
<div
  className="overflow-x-auto overflow-y-auto max-h-[360px]"
  style={{
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(30,58,123,0.25) rgba(240,244,255,0.60)",
  }}
>
  <table className="w-full min-w-[640px] text-center">

    {/* ── HEADER ── */}
    <thead className="sticky top-0 z-10 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950">
      <tr>
        <th className="px-6 py-3.5 text-[11px] font-bold text-white tracking-[.16em] uppercase">SR NO</th>
        <th className="px-4 py-3.5 text-[11px] font-bold text-white tracking-[.16em] uppercase">Type</th>
        <th className="px-4 py-3.5 text-[11px] font-bold text-white tracking-[.16em] uppercase">User</th>
        <th className="px-4 py-3.5 text-[11px] font-bold text-white tracking-[.16em] uppercase">Date & Time</th>
        <th className="px-4 py-3.5 text-[11px] font-bold text-white tracking-[.16em] uppercase">Status</th>
        <th className="px-6 py-3.5 text-[11px] font-bold text-white tracking-[.16em] uppercase">Amount</th>
      </tr>
    </thead>

    {/* ── ROWS ── */}
    <tbody>
      {filteredTransactions.length > 0 ? (
        filteredTransactions.map((txn, idx) => {
          const isDeposit = txn.type === "Deposit";

          return (
            <tr
              key={txn.id}
              className="border-b border-slate-100/70 transition-all duration-200"
              style={{
                background:
                  idx % 2 === 0
                    ? "rgba(255,255,255,0.55)"
                    : "rgba(240,244,255,0.55)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "rgba(219,234,254,0.70)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  idx % 2 === 0
                    ? "rgba(255,255,255,0.55)"
                    : "rgba(240,244,255,0.55)")
              }
            >
              {/* SR NO */}
              <td className="px-6 py-4 text-[12px] font-bold text-black">
                {String(idx + 1).padStart(2)}
              </td>

              {/* Type */}
              <td className="px-4 py-4">
                <div className="flex items-center justify-center gap-3">
  

                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full
                    ${isDeposit
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-red-500/10 text-red-600"
                      }`}
                  >
                    {isDeposit ? "▲ Deposit" : "▼ Withdraw"}
                  </span>
                </div>
              </td>

              {/* User */}
              <td className="px-4 py-4 text-[13px] font-semibold text-slate-700">
                {txn.user}
              </td>

              {/* Date & Time */}
              <td
                className="px-4 py-4 text-[13px] text-slate-600 font-medium"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {txn.date} • {txn.time}
              </td>

        {/* Status */}
            <td className="px-4 py-4">
              <span className="text-[12px] font-semibold text-emerald-600">
                Success
              </span>
            </td>

              {/* Amount */}
              <td className="px-6 py-4">
                <span
                  className={`text-[15px] font-extrabold px-3 py-1 rounded-lg
                  ${isDeposit
                      ? "text-emerald-600"
                      : "text-red-600"
                    }`}
                >
                  {isDeposit ? "+" : "−"} {txn.amount}
                </span>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={6} className="text-center py-14">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <Search size={22} className="text-slate-400" />
            </div>
            <p className="text-slate-500 font-semibold">
              No transactions found.
            </p>
            <p className="text-[12px] text-slate-400 mt-1">
              Try changing your search or date filter.
            </p>
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

          {/* Footer */}
          <div className="flex justify-between items-center px-7 py-3 border-t border-slate-100/80"
               style={{ background:"rgba(241,245,255,0.70)" }}>
            <span className="text-[12px] text-slate-400 font-medium">Showing {filteredTransactions.length} of {transactions.length} records</span>
            <span className="text-[12px] text-slate-400 font-medium">Last updated: Today</span>
          </div>

        </div>

      </div>
    </div>
  );
}