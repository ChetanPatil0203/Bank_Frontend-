import { useState, useEffect } from "react";
import {
  Wallet, Search, Calendar, ArrowDownCircle, ArrowUpCircle,
  TrendingUp, ChevronRight
} from "lucide-react";
// Import your new function from apiServices
import { getMyTransactions } from "../../utils/apiServices";

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
  const [search, setSearch]         = useState("");
  const [dateFilter, setDateFilter] = useState("");
  
  // New states for backend data
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance]           = useState(0);


  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLES;
    document.head.appendChild(el);
    
    // Fetch data
    fetchData();

    return () => document.head.removeChild(el);
  }, []);

  const fetchData = async () => {
    try {
      const res = await getMyTransactions();
      if (res.success) {
        setTransactions(res.data.transactions || []);
        setBalance(res.data.balance || 0);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const filteredTransactions = transactions.filter((txn) => {
    const typeLabel = txn.type === "Deposit" ? "Deposit" : "Withdraw";
    const matchesSearch =
      typeLabel.toLowerCase().includes(search.toLowerCase()) ||
      (txn.note && txn.note.toLowerCase().includes(search.toLowerCase()));
    const matchesDate = dateFilter === "" || txn.date === dateFilter;
    return matchesSearch && matchesDate;
  });

  const totalDeposit  = transactions.filter(t => t.type === "Deposit").length;
  const totalWithdraw = transactions.filter(t => t.type === "Withdraw").length;

  return (
    <div className="min-h-screen py-3 px-3 bg-white"
         style={{ fontFamily:"'Sora','DM Sans',sans-serif" }}>

      {/* Ambient blobs */}
      <div className="fixed -top-32 left-[5%] w-[480px] h-[480px] rounded-full bg-indigo-400/10 blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-[3%] w-[400px] h-[400px] rounded-full bg-blue-300/10 blur-3xl pointer-events-none -z-10" />

      <div className="w-full">

        {/* PAGE TITLE */}
        <div className="txn-card-in mb-4 px-1">
          <h2 className="text-lg font-extrabold text-slate-800 tracking-[.10em] uppercase">
            Transaction History
          </h2>
          <p className="text-[12px] text-slate-400 mt-0.5 font-medium">All your account activity in one place</p>
        </div>

        {/* ── BALANCE CARD ── */}
        <div className="txn-card-in mb-6">
          <div className="balance-card-bg rounded-3xl p-[1.5px] shadow-xl shadow-blue-900/20">
            <div className="relative rounded-[23px] overflow-hidden px-6 py-6 sm:py-8">
              <div className="bal-glow-tr absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none" />
              <div className="bal-glow-bl absolute -bottom-10 left-[20%] w-48 h-48 rounded-full pointer-events-none" />
              
              <div className="relative flex flex-col gap-6">
                <div>
                  <p className="text-[10px] sm:text-[11px] text-white/50 tracking-[0.2em] font-black uppercase mb-2">Total Balance</p>
                  <p className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-none"
                     style={{ textShadow:"0 4px 32px rgba(255,255,255,0.2)" }}>
                    ₹{balance.toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="flex flex-col items-center justify-center p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                    <ArrowDownCircle size={18} className="text-emerald-400 mb-1.5" />
                    <p className="text-lg font-black text-white leading-none">{totalDeposit}</p>
                    <p className="text-[9px] text-white/40 font-black uppercase tracking-widest mt-1">In</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                    <ArrowUpCircle size={18} className="text-rose-400 mb-1.5" />
                    <p className="text-lg font-black text-white leading-none">{totalWithdraw}</p>
                    <p className="text-[9px] text-white/40 font-black uppercase tracking-widest mt-1">Out</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                    <Wallet size={18} className="text-blue-300 mb-1.5" />
                    <p className="text-lg font-black text-white leading-none">{transactions.length}</p>
                    <p className="text-[9px] text-white/40 font-black uppercase tracking-widest mt-1">Total</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FILTERS ── */}
        <div className="txn-fade-1 grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-4">
          <div className="filter-wrap flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 border border-white/80 backdrop-blur-sm">
            <Search size={15} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by note or type..."
              className="w-full bg-transparent outline-none text-[13px] text-slate-700 placeholder:text-slate-400 font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-wrap flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 border border-white/80 backdrop-blur-sm">
            <Calendar size={15} className="text-slate-400 flex-shrink-0" />
            <input
              type="date"
              className="w-full bg-transparent outline-none text-[13px] text-slate-700 font-medium"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>

        {/* ── TRANSACTIONS TABLE ── */}
        <div className="txn-fade-2 glass-wrap backdrop-blur-[18px] rounded-[16px] border border-white/80 overflow-hidden">
          <div className="flex justify-between items-center px-5 py-3 border-b border-slate-100/80">
            <h3 className="text-[15px] font-extrabold text-slate-800 tracking-wide">Recent Transactions</h3>
            <span className="text-[11px] font-semibold text-blue-500 flex items-center gap-1">
              {filteredTransactions.length} records <ChevronRight size={12}/>
            </span>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto overflow-y-auto max-h-[360px]">
            <table className="w-full min-w-[700px] text-center">
              <thead className="sticky top-0 z-10 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950">
                <tr>
                  <th className="px-4 py-2.5 text-[10px] font-bold text-white tracking-[.16em] uppercase">SR NO</th>
                  <th className="px-3 py-2.5 text-[10px] font-bold text-white tracking-[.16em] uppercase">Type</th>
                  <th className="px-3 py-2.5 text-[10px] font-bold text-white tracking-[.16em] uppercase">Note</th>
                  <th className="px-3 py-2.5 text-[10px] font-bold text-white tracking-[.16em] uppercase">Date & Time</th>
                  <th className="px-3 py-2.5 text-[10px] font-bold text-white tracking-[.16em] uppercase">Status</th>
                  <th className="px-4 py-2.5 text-[10px] font-bold text-white tracking-[.16em] uppercase">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((txn, idx) => {
                    const isDeposit = txn.type === "Deposit";
                    return (
                      <tr key={txn.id || idx} className="border-b border-slate-100/70 txn-row"
                          style={{ background: idx % 2 === 0 ? "rgba(255,255,255,0.55)" : "rgba(240,244,255,0.55)" }}>
                        <td className="px-4 py-3 text-[11px] font-bold text-black">{String(idx + 1).padStart(2, '0')}</td>
                        <td className="px-3 py-3">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${isDeposit ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}`}>
                            {isDeposit ? "▲ Deposit" : "▼ Withdraw"}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-[12px] font-semibold text-slate-700">{txn.note || "—"}</td>
                        <td className="px-3 py-3 text-[12px] text-slate-600 font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          {txn.date} • {txn.time}
                        </td>
                        <td className="px-3 py-3"><span className="text-[11px] font-semibold text-emerald-600">Success</span></td>
                        <td className="px-4 py-3">
                          <span className={`text-[13px] font-extrabold ${isDeposit ? "text-emerald-600" : "text-red-600"}`}>
                            {isDeposit ? "+" : "−"} ₹{txn.amount.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-10">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2">
                        <Search size={18} className="text-slate-400" />
                      </div>
                      <p className="text-slate-500 font-semibold text-sm">No transactions found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden flex flex-col divide-y divide-slate-100 max-h-[500px] overflow-y-auto overscroll-contain">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((txn, idx) => {
                const isDeposit = txn.type === "Deposit";
                return (
                  <div key={txn.id || idx} className="p-4 bg-white hover:bg-slate-50 active:bg-slate-100 transition-colors">
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm
                          ${isDeposit ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                          {isDeposit ? <ArrowDownCircle size={20} /> : <ArrowUpCircle size={20} />}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[13px] font-black text-slate-800 truncate leading-tight mb-1">{txn.note || "General Transaction"}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{txn.date} · {txn.time}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-[16px] font-black ${isDeposit ? "text-emerald-600" : "text-rose-600"}`}>
                          {isDeposit ? "+" : "−"} ₹{txn.amount.toLocaleString()}
                        </p>
                        <p className="text-[9px] font-black text-emerald-500/80 uppercase tracking-tighter">Success</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-20 text-center px-6">
                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <TrendingUp size={24} className="text-slate-300" />
                </div>
                <p className="text-[13px] font-black text-slate-400 uppercase tracking-[0.2em]">No Matches Found</p>
                <p className="text-xs text-slate-300 mt-2">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center px-5 py-2 border-t border-slate-100/80"
               style={{ background:"rgba(241,245,255,0.70)" }}>
            <span className="text-[11px] text-slate-400 font-medium">Showing {filteredTransactions.length} records</span>
            <span className="text-[11px] text-slate-400 font-medium">Last updated: Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}
