import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard, CreditCard, ArrowLeftRight,
  FileText, LogOut, Bell, Menu, X,
  TrendingUp, TrendingDown, Settings,
} from "lucide-react";
import AccountsView from "../AdminAccount/AccountManagement.jsx";
import AdminTransactionManager from "../AdminTransation/admintransation.jsx";
import AdminKYC from "../AdminKYC/kyc.jsx";
import AdminSettings from "../AdminSetting/setting.jsx";

const TRANSACTIONS = [
  { id: "TXN001", user: "Chetan Patil",   type: "Credit", amount: "₹25,000",   date: "13 Mar 2026", status: "Success" },
  { id: "TXN002", user: "Rohit Sharma",   type: "Debit",  amount: "₹8,500",    date: "13 Mar 2026", status: "Success" },
  { id: "TXN003", user: "Priya Desai",    type: "Credit", amount: "₹1,20,000", date: "12 Mar 2026", status: "Pending" },
  { id: "TXN004", user: "Amit Joshi",     type: "Debit",  amount: "₹3,200",    date: "12 Mar 2026", status: "Failed"  },
  { id: "TXN005", user: "Sneha Kulkarni", type: "Credit", amount: "₹50,000",   date: "11 Mar 2026", status: "Success" },
];

const STAT_CARDS = [
  { label: "Total Users",        value: "12,480", emoji: "👤", color: "#3b82f6" },
  { label: "Total Accounts",     value: "9,341",  emoji: "💳", color: "#10b981" },
  { label: "Total Balance",      value: "₹84.2L", emoji: "💰", color: "#f59e0b" },
  { label: "Total Transactions", value: "3,892",  emoji: "🔄", color: "#8b5cf6" },
  { label: "Pending KYC",        value: "1,638",  emoji: "📄", color: "#ef4444" },
  { label: "Account Requests",   value: "247",    emoji: "🏦", color: "#f59e0b" },
];

const NAV = [
  { id: "dashboard",   label: "Dashboard",   icon: LayoutDashboard },
  { id: "accounts",    label: "Accounts",    icon: CreditCard      },
  { id: "txn-manager", label: "Transaction", icon: ArrowLeftRight  },
  { id: "kyc",         label: "KYC",         icon: FileText        },
  { id: "settings",    label: "Settings",    icon: Settings        },
];

const C = {
  navy: "#0f1f4b", bg: "#f0f4ff", card: "#ffffff",
  text: "#1e293b", muted: "#64748b", border: "#e2e8f0",
  accent: "#3b82f6", green: "#10b981", red: "#ef4444",
};

function Badge({ status }) {
  const map = {
    Success: { bg: "#dcfce7", color: "#15803d" },
    Pending: { bg: "#fef9c3", color: "#854d0e" },
    Failed:  { bg: "#fee2e2", color: "#b91c1c" },
  };
  const s = map[status] || { bg: "#f1f5f9", color: "#475569" };
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99, letterSpacing: "0.04em" }}>
      {status}
    </span>
  );
}

const TH = ({ children }) => (
  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", background: "#f8faff", whiteSpace: "nowrap", borderBottom: `1px solid ${C.border}` }}>{children}</th>
);
const TD = ({ children }) => (
  <td style={{ padding: "13px 16px", fontSize: 13, color: C.text, borderBottom: "1px solid #f1f5f9", whiteSpace: "nowrap" }}>{children}</td>
);

function DashboardView() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: 0 }}>Dashboard Overview</h2>
        <p style={{ fontSize: 13, color: C.muted, margin: "4px 0 0" }}>PayZen Bank — Admin Control Center</p>
      </div>

      <div style={{ display: "flex", flexDirection: "row", gap: 12, marginBottom: 28, flexWrap: "wrap", paddingBottom: 4 }}>
        {STAT_CARDS.map((s, i) => (
          <div key={i} style={{ background: C.card, borderRadius: 14, padding: "16px 14px", boxShadow: "0 2px 12px rgba(15,31,75,0.07)", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 8, flex: "1 1 160px", minWidth: 160, maxWidth: "calc(33% - 8px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontSize: 14, color: C.muted, margin: 0, fontWeight: 600 }}>{s.label}</p>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: s.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                {s.emoji}
              </div>
            </div>
            <p style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: 0 }}>Recent Transactions</h2>
        <p style={{ fontSize: 13, color: C.muted, margin: "4px 0 0" }}>Last 5 transactions across all accounts</p>
      </div>
      <div style={{ background: C.card, borderRadius: 16, boxShadow: "0 2px 12px rgba(15,31,75,0.07)", border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr><TH>Txn ID</TH><TH>User</TH><TH>Type</TH><TH>Amount</TH><TH>Date</TH><TH>Status</TH></tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map(t => (
                <tr key={t.id}
                  onMouseEnter={e => e.currentTarget.style.background = "#f8faff"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}
                >
                  <TD><span style={{ fontFamily: "monospace", color: C.accent, fontWeight: 600 }}>{t.id}</span></TD>
                  <TD>{t.user}</TD>
                  <TD>
                    <span style={{ color: t.type === "Credit" ? C.green : C.red, fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                      {t.type === "Credit" ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                      {t.type}
                    </span>
                  </TD>
                  <TD><span style={{ fontWeight: 700 }}>{t.amount}</span></TD>
                  <TD><span style={{ color: C.muted }}>{t.date}</span></TD>
                  <TD><Badge status={t.status} /></TD>
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
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'DM Sans','Segoe UI',sans-serif", background: C.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        @keyframes shimmer { 0%{background-position:0% center} 100%{background-position:200% center} }
      `}</style>

      {/* SIDEBAR */}
      <div style={{ width: sidebarOpen ? 240 : 0, minWidth: sidebarOpen ? 240 : 0, background: C.navy, display: "flex", flexDirection: "column", overflow: "hidden", transition: "width 0.3s ease, min-width 0.3s ease", position: "sticky", top: 0, height: "100vh", flexShrink: 0 }}>
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <svg width="52" height="52" viewBox="0 0 100 100" fill="none" style={{ marginBottom: 8 }}>
            <path d="M50 4 L90 26 L90 74 L50 96 L10 74 L10 26 Z" fill="rgba(29,78,216,0.35)" stroke="rgba(56,189,248,0.9)" strokeWidth="2.5" />
            <path d="M50 16 L80 32 L80 68 L50 84 L20 68 L20 32 Z" fill="rgba(37,99,235,0.15)" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
            {[[50,4],[90,26],[90,74],[50,96],[10,74],[10,26]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="3" fill="rgba(56,189,248,0.9)" />)}
            <text x="50" y="63" fontFamily="Georgia,serif" fontSize="34" fontWeight="900" fill="white" textAnchor="middle">P</text>
          </svg>
          <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 4 }}>
            <span style={{ fontFamily: "'Georgia',serif", fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: -1 }}>Pay</span>
            <span style={{ fontFamily: "'Georgia',serif", fontSize: 22, fontWeight: 900, letterSpacing: -1, background: "linear-gradient(135deg,#38bdf8,#818cf8)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 3s linear infinite" }}>Zen</span>
          </div>
          <div style={{ width: 80, height: 2, borderRadius: 99, background: "linear-gradient(90deg,#2563eb,#38bdf8,#818cf8)", marginBottom: 4 }} />
          <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: 0 }}>SECURE · SMART · BANKING</p>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0 8px", marginBottom: 8 }}>MAIN MENU</p>
          {NAV.map(n => {
            const Icon = n.icon;
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                onClick={() => navigate(`/admindeshbord/${n.id}`)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, border: "none", background: isActive ? "rgba(59,130,246,0.18)" : "transparent", color: isActive ? "#60a5fa" : "rgba(255,255,255,0.55)", fontSize: 14, fontWeight: isActive ? 700 : 500, cursor: "pointer", marginBottom: 2, transition: "all 0.15s", textAlign: "left", whiteSpace: "nowrap", borderLeft: isActive ? "3px solid #3b82f6" : "3px solid transparent" }}
              >
                <Icon size={17} />{n.label}
              </button>
            );
          })}
        </nav>

        {/* ← फक्त हे बदललं: /adminlogout */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={() => navigate("/adminlogout")}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, border: "none", background: "rgba(239,68,68,0.12)", color: "#fca5a5", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
          >
            <LogOut size={17} /> Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* HEADER */}
        <div style={{ background: C.navy, borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
          <button onClick={() => setSidebar(!sidebarOpen)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", padding: 6 }}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
              <span style={{ fontFamily: "'Georgia',serif", fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: -1 }}>Pay</span>
              <span style={{ fontFamily: "'Georgia',serif", fontSize: 22, fontWeight: 900, letterSpacing: -1, background: "linear-gradient(135deg,#38bdf8,#818cf8)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 3s linear infinite" }}>Zen</span>
            </div>
            <p style={{ fontSize: 8, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", margin: 0 }}>SECURE · SMART · BANKING</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 8, cursor: "pointer", position: "relative", display: "flex" }}>
              <Bell size={17} color="rgba(255,255,255,0.6)" />
              <span style={{ position: "absolute", top: 5, right: 5, width: 7, height: 7, borderRadius: "50%", background: "#ef4444", border: `1.5px solid ${C.navy}` }} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#1e3a7b,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>AD</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap" }}>Hello, Admin</span>
            </div>
          </div>
        </div>

        <div style={{ padding: 28, flex: 1, overflowY: "auto" }}>
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