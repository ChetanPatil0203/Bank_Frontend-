import { useState } from "react";
import {
  Eye, CheckCircle, XCircle, Trash2, Clock, Plus, Search, UserPlus,
  CreditCard, CheckCircle2, PauseCircle, Ban
} from "lucide-react";

const C = {
  navy: "#0f1f4b", bg: "#f0f4ff", card: "#ffffff",
  text: "#1e293b", muted: "#64748b", border: "#e2e8f0",
  accent: "#3b82f6", green: "#10b981", red: "#ef4444",
  gold: "#f59e0b", purple: "#8b5cf6",
};

const ACCOUNTS = [
  { id: "ACC001", holder: "Chetan Patil", account: "482910372846", type: "Savings", balance: "₹1,24,500", ifsc: "PYZN0001", branch: "Nashik Main", opened: "12 Jan 2025", status: "Active" },
  { id: "ACC002", holder: "Rohit Sharma", account: "193847562031", type: "Current", balance: "₹3,80,200", ifsc: "PYZN0001", branch: "Nashik Main", opened: "03 Feb 2025", status: "Active" },
  { id: "ACC003", holder: "Priya Desai", account: "847291038475", type: "Savings", balance: "₹45,000", ifsc: "PYZN0002", branch: "Pune Central", opened: "27 Feb 2025", status: "Inactive" },
  { id: "ACC004", holder: "Amit Joshi", account: "302948172635", type: "Savings", balance: "₹92,750", ifsc: "PYZN0001", branch: "Nashik Main", opened: "15 Mar 2025", status: "Active" },
  { id: "ACC005", holder: "Sneha Kulkarni", account: "719283047561", type: "Current", balance: "₹2,15,300", ifsc: "PYZN0003", branch: "Mumbai West", opened: "01 Apr 2025", status: "Active" },
  { id: "ACC006", holder: "Vikas Nair", account: "583920174628", type: "Savings", balance: "₹12,400", ifsc: "PYZN0002", branch: "Pune Central", opened: "18 Apr 2025", status: "Closed" },
];

const RESPONSIVE_STYLES = `
  @media (max-width: 768px) {


    .stats-grid { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
    .stat-card-wrap { 
      border: 1px solid #f1f5f9 !important;

      border-radius: 18px !important;
      padding: 14px !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 8px !important;
      transition: all 0.3s ease !important;
      box-shadow: 0 4px 20px -4px rgba(0,0,0,0.05) !important;
      width: 100% !important;
      max-width: none !important;
    }
  }
  @media (min-width: 1024px) {
    .stat-card-wrap {
      flex: 1 1 calc(16.66% - 9px) !important;
      max-width: calc(16.66% - 9px) !important;
      min-width: 120px !important;
    }
  }
  @media (min-width: 769px) and (max-width: 1023px) {
    .stat-card-wrap {
      flex: 1 1 calc(33.33% - 8px) !important;
      max-width: calc(33.33% - 8px) !important;
      min-width: 140px !important;
    }
  }




    .stat-card-wrap:hover {
      transform: translateY(-5px) !important;
      box-shadow: 0 12px 40px -12px rgba(0,0,0,0.12) !important;
    }
    .stat-card-wrap.blue:hover { border-color: #3b82f6 !important; }
    .stat-card-wrap.green:hover { border-color: #10b981 !important; }
    .stat-card-wrap.gold:hover { border-color: #f59e0b !important; }
    .stat-card-wrap.red:hover { border-color: #ef4444 !important; }



    .header-row { flex-direction: column !important; align-items: stretch !important; }
    .tab-search-row { flex-direction: column !important; align-items: stretch !important; gap: 16px !important; }
    .search-box-wrap { max-width: none !important; }
    .tabs-wrap { overflow-x: auto !important; padding-bottom: 4px !important; display: flex !important; flex-wrap: nowrap !important; width: 100% !important; -webkit-overflow-scrolling: touch; }
    .tabs-wrap button { flex-shrink: 0 !important; white-space: nowrap !important; }

    .modal-container { padding: 10px !important; }
    .modal-content { max-width: 95% !important; border-radius: 16px !important; }
    .table-to-hide { display: none !important; }
    .cards-to-show {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 10px !important;
    }


    .mobile-card { 
      background: #fff !important; 
      border: 1px solid #e2e8f0 !important; 
      border-radius: 12px !important; 
      padding: 10px !important; 
      flex: none !important;
      width: 100% !important;
      max-width: none !important;
      box-sizing: border-box !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important;
    }


  }
  @media (min-width: 769px) {
    .cards-to-show { display: none !important; }
  }

  @media (max-width: 480px) {
    .stat-card-wrap { flex: 1 1 100% !important; }
  }
`;


const PENDING_REQUESTS = [
  { id: "REQ001", name: "Rahul Mehta", email: "rahul@gmail.com", type: "Savings", applied: "10 Mar 2026", kyc: "Verified" },
  { id: "REQ002", name: "Pooja Singh", email: "pooja@gmail.com", type: "Current", applied: "11 Mar 2026", kyc: "Verified" },
  { id: "REQ003", name: "Karan Deshmukh", email: "karan@gmail.com", type: "Savings", applied: "12 Mar 2026", kyc: "Pending" },
  { id: "REQ004", name: "Neha Patil", email: "neha@gmail.com", type: "Savings", applied: "13 Mar 2026", kyc: "Verified" },
];

const NEW_ACCOUNT_REQUESTS = [
  { id: "NAR001", name: "Arjun Bhosale", email: "arjun@gmail.com", phone: "9823456781", type: "Savings", reason: "Personal savings", applied: "14 Mar 2026", kyc: "Verified" },
  { id: "NAR002", name: "Divya Shinde", email: "divya@gmail.com", phone: "9712345678", type: "Current", reason: "Business transactions", applied: "14 Mar 2026", kyc: "Pending" },
  { id: "NAR003", name: "Mahesh Gaikwad", email: "mahesh@gmail.com", phone: "9654321987", type: "Savings", reason: "Salary account", applied: "15 Mar 2026", kyc: "Verified" },
  { id: "NAR004", name: "Anjali Patil", email: "anjali@gmail.com", phone: "9876543210", type: "Savings", reason: "Student account", applied: "15 Mar 2026", kyc: "Verified" },
  { id: "NAR005", name: "Rohan Kulkarni", email: "rohan@gmail.com", phone: "9988776655", type: "Current", reason: "Freelance payments", applied: "15 Mar 2026", kyc: "Pending" },
];

function Badge({ status }) {
  const map = {
    Active: { bg: "#dcfce7", color: "#15803d" },
    Inactive: { bg: "#fef9c3", color: "#854d0e" },
    Closed: { bg: "#fee2e2", color: "#b91c1c" },
    Verified: { bg: "#dcfce7", color: "#15803d" },
    Pending: { bg: "#fef9c3", color: "#854d0e" },
    Rejected: { bg: "#fee2e2", color: "#b91c1c" },
  };
  const s = map[status] || { bg: "#f1f5f9", color: "#475569" };
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      fontSize: 10,
      fontWeight: 800,
      padding: "2px 8px",
      borderRadius: 99,
      letterSpacing: "0.04em",
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      height: 20,
      boxSizing: "border-box"
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, display: "inline-block" }} />
      {status}
    </span>
  );
}


const TH = ({ children, center }) => (
  <th style={{ padding: "12px 16px", textAlign: center ? "center" : "left", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", background: "#f8faff", whiteSpace: "nowrap", borderBottom: `1px solid ${C.border}` }}>{children}</th>
);
const TD = ({ children, center }) => (
  <td style={{ padding: "13px 16px", fontSize: 13, color: C.text, borderBottom: "1px solid #f1f5f9", whiteSpace: "nowrap", textAlign: center ? "center" : "left" }}>{children}</td>
);

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-container" style={{ position: "fixed", inset: 0, background: "rgba(15,31,75,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div className="modal-content" style={{ background: C.card, borderRadius: 20, width: "100%", maxWidth: 520, boxShadow: "0 20px 60px rgba(15,31,75,0.2)", border: `1px solid ${C.border}` }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: C.text }}>{title}</h3>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.muted }}>✕</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, type = "text", value, onChange, options }) {
  const base = { width: "100%", padding: "10px 12px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", background: "#f8faff", fontFamily: "inherit", boxSizing: "border-box" };
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>{label}</label>
      {options
        ? <select value={value} onChange={onChange} style={base}>{options.map(o => <option key={o}>{o}</option>)}</select>
        : <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={base} />
      }
    </div>
  );
}

export default function AccountsView() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [narSearch, setNarSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedNar, setSelectedNar] = useState(null);
  const [accounts, setAccounts] = useState(ACCOUNTS);
  const [requests, setRequests] = useState(PENDING_REQUESTS);
  const [newReqs, setNewReqs] = useState(NEW_ACCOUNT_REQUESTS);
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "Savings", branch: "Nashik Main" });

  const filtered = accounts.filter(a =>
    a.holder.toLowerCase().includes(search.toLowerCase()) ||
    a.account.includes(search)
  );

  const filteredNar = newReqs.filter(r =>
    r.name.toLowerCase().includes(narSearch.toLowerCase()) ||
    r.email.toLowerCase().includes(narSearch.toLowerCase())
  );

  function handleToggle(acc) {
    if (acc.status === "Closed") return;
    setAccounts(prev => prev.map(a =>
      a.id === acc.id ? { ...a, status: a.status === "Active" ? "Inactive" : "Active" } : a
    ));
    setModal(null);
  }

  function handleClose(acc) {
    setAccounts(prev => prev.map(a =>
      a.id === acc.id ? { ...a, status: "Closed" } : a
    ));
    setModal(null);
  }

  function handleApprove(req) {
    const newAcc = {
      id: `ACC00${accounts.length + 1}`,
      holder: req.name,
      account: Math.floor(Math.random() * 9e11 + 1e11).toString(),
      type: req.type, balance: "₹0", ifsc: "PYZN0001", branch: "Nashik Main",
      opened: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Active",
    };
    setAccounts(prev => [...prev, newAcc]);
    setRequests(prev => prev.filter(r => r.id !== req.id));
  }

  function handleReject(req) {
    setRequests(prev => prev.filter(r => r.id !== req.id));
  }

  function handleNarApprove(req) {
    const newAcc = {
      id: `ACC00${accounts.length + 1}`,
      holder: req.name,
      account: Math.floor(Math.random() * 9e11 + 1e11).toString(),
      type: req.type, balance: "₹0", ifsc: "PYZN0001", branch: "Nashik Main",
      opened: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Active",
    };
    setAccounts(prev => [...prev, newAcc]);
    setNewReqs(prev => prev.filter(r => r.id !== req.id));
    setModal(null);
  }

  function handleNarReject(req) {
    setNewReqs(prev => prev.filter(r => r.id !== req.id));
    setModal(null);
  }

  function handleCreate() {
    if (!form.name || !form.email) return;
    const newAcc = {
      id: `ACC00${accounts.length + 1}`,
      holder: form.name,
      account: Math.floor(Math.random() * 9e11 + 1e11).toString(),
      type: form.type, balance: "₹0", ifsc: "PYZN0001", branch: form.branch,
      opened: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Active",
    };
    setAccounts(prev => [...prev, newAcc]);
    setForm({ name: "", email: "", phone: "", type: "Savings", branch: "Nashik Main" });
    setModal(null);
  }

  const TABS = [
    { id: "all", label: "All Accounts", count: accounts.length },
    { id: "new", label: "New Account Requests", count: newReqs.length },
    { id: "pending", label: "Pending Requests", count: requests.length },
  ];

  return (
    <div>


      <style>{RESPONSIVE_STYLES}</style>
      {/* Header */}
      <div className="mb-3">
        <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: 0 }}>Accounts Management</h2>
      </div>

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setModal("create")} style={{ display: "flex", alignItems: "center", gap: 8, background: C.navy, color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(15,31,75,0.15)" }}>
          <Plus size={15} /> Create New Account
        </button>
      </div>


      <div className="stats-grid" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>


        {[
          { label: "Total Accounts", value: accounts.length, color: C.accent, icon: CreditCard, border: "hover:border-blue-500", bgColor: "bg-blue-500/10", borderColor: "border-blue-200", },
          { label: "Active", value: accounts.filter(a => a.status === "Active").length, color: C.green, icon: CheckCircle2, border: "hover:border-emerald-500", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-200", },
          { label: "Inactive", value: accounts.filter(a => a.status === "Inactive").length, color: C.gold, icon: PauseCircle, border: "hover:border-amber-500", bgColor: "bg-amber-500/10", borderColor: "border-amber-200", },
          { label: "Closed", value: accounts.filter(a => a.status === "Closed").length, color: C.red, icon: Ban, border: "hover:border-red-500", bgColor: "bg-red-500/10", borderColor: "border-red-200", },
          { label: "New Requests", value: newReqs.length, color: C.accent, icon: UserPlus, border: "hover:border-blue-500", bgColor: "bg-blue-500/10", borderColor: "border-blue-200", },
          { label: "Pending", value: requests.length, color: C.purple, icon: Clock, border: "hover:border-violet-500", bgColor: "bg-violet-500/10", borderColor: "border-violet-200", },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={`stat-card-wrap ${s.bgColor} border ${s.borderColor} ${s.border}`} style={{
              borderRadius: 18,
              padding: "14px 16px",
              boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              transition: "all 0.3s ease",
              boxSizing: "border-box",
            }}>




              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: 11, color: C.muted, margin: 0, fontWeight: 800, letterSpacing: "0.02em" }}>{s.label}</p>

                <div style={{ width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>
                  <Icon size={22} />

                </div>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: 0, trackingTight: "-0.02em" }}>{s.value}</h3>


            </div>
          );
        })}
      </div>

      {/* Tabs and Search Row */}
      <div className="tab-search-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>




        <div className="tabs-wrap" style={{ display: "flex", gap: 6, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 4, width: "fit-content" }}>

          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "7px 18px", borderRadius: 8, border: "none", background: tab === t.id ? C.navy : "transparent", color: tab === t.id ? "#fff" : C.muted, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6 }}>
              {t.label}
              <span style={{ background: tab === t.id ? "rgba(255,255,255,0.2)" : C.border, color: tab === t.id ? "#fff" : C.muted, fontSize: 10, fontWeight: 800, padding: "1px 7px", borderRadius: 99 }}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* Unified Search Bar on the Right */}
        <div className="search-box-wrap" style={{ position: "relative", width: "100%", maxWidth: "320px", flexShrink: 0 }}>



          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: C.muted }} />
          <input
            value={tab === "all" ? search : narSearch}
            onChange={e => tab === "all" ? setSearch(e.target.value) : setNarSearch(e.target.value)}
            placeholder={tab === "all" ? "Search by name or account no..." : "Search by name or email..."}
            style={{ width: "100%", boxSizing: "border-box", paddingLeft: 32, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", background: C.card, fontFamily: "inherit" }}
          />
        </div>
      </div>

      {/* TAB 1 — ALL ACCOUNTS */}
      {tab === "all" && (
        <>
          {/* Search box removed from here and moved to top row */}
          <div className="table-to-hide" style={{ background: C.card, borderRadius: 16, boxShadow: "0 2px 12px rgba(15,31,75,0.07)", border: `1px solid ${C.border}`, overflow: "hidden" }}>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "linear-gradient(to right, #1e3a8a, #153e75, #0f172a)" }}>
                    {["#", "Account Holder", "Account No.", "Type", "Balance", "Branch", "Opened", "Status", "Actions"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                    ))}
                  </tr>


                </thead>

                <tbody>
                  {filtered.map((a, i) => (
                    <tr key={a.id}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8faff"}
                      onMouseLeave={e => e.currentTarget.style.background = ""}
                    >
                      <TD><span style={{ color: C.muted, fontWeight: 600 }}>{i + 1}</span></TD>
                      <TD><span style={{ fontWeight: 700 }}>{a.holder}</span></TD>
                      <TD><span style={{ fontFamily: "monospace", fontSize: 12, color: C.accent, fontWeight: 600 }}>{a.account}</span></TD>
                      <TD>{a.type}</TD>
                      <TD><span style={{ fontWeight: 700, color: C.green }}>{a.balance}</span></TD>
                      <TD><span style={{ color: C.muted }}>{a.branch}</span></TD>
                      <TD><span style={{ color: C.muted }}>{a.opened}</span></TD>
                      <TD><Badge status={a.status} /></TD>
                      <TD center>
                        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                          <button onClick={() => { setSelected(a); setModal("details"); }}
                            style={{ background: "#eff6ff", color: C.accent, border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                            <Eye size={12} /> View
                          </button>
                          {a.status !== "Closed" && (
                            <button onClick={() => { setSelected(a); setModal("toggle"); }}
                              style={{ background: a.status === "Active" ? "#fef9c3" : "#dcfce7", color: a.status === "Active" ? "#854d0e" : "#15803d", border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                              {a.status === "Active" ? <><XCircle size={12} /> Deactivate</> : <><CheckCircle size={12} /> Activate</>}
                            </button>
                          )}
                          {a.status !== "Closed" && (
                            <button onClick={() => { setSelected(a); setModal("close"); }}
                              style={{ background: "#fee2e2", color: C.red, border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                              <Trash2 size={12} /> Close
                            </button>
                          )}
                        </div>
                      </TD>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="cards-to-show">
            {filtered.map(a => (
              <div key={a.id} className="mobile-card" style={{ padding: "14px", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 20 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: C.accent, letterSpacing: "0.05em", background: "rgba(59,130,246,0.1)", padding: "2px 8px", borderRadius: 5, height: 20, display: "flex", alignItems: "center", boxSizing: "border-box" }}>{a.id}</span>
                  <Badge status={a.status} />
                </div>

                <div style={{ padding: "4px 0" }}>
                  <h4 style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 800, color: C.text }}>{a.holder}</h4>
                  <p style={{ margin: 0, fontSize: 11, color: C.muted, fontWeight: 600 }}>
                    A/C: <span style={{ fontFamily: "monospace", color: C.text }}>{a.account}</span>
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: "auto" }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: C.green }}>{a.balance}</span>
                  <button onClick={() => { setSelected(a); setModal("details"); }}
                    style={{ border: "none", background: "#eff6ff", color: C.accent, padding: "5px 10px", borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                    View
                  </button>

                </div>
              </div>
            ))}
          </div>


        </>
      )}

      {/* TAB 2 — NEW ACCOUNT REQUESTS */}
      {tab === "new" && (
        <>
          {newReqs.length > 0 && (
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "12px 18px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#92400e" }}>
              <UserPlus size={16} color={C.gold} />
              <span><strong>{newReqs.length} new account request{newReqs.length > 1 ? "s" : ""}</strong> waiting for your approval.</span>
            </div>
          )}
          {/* Search box removed from here and moved to top row */}
          <div style={{ background: C.card, borderRadius: 16, boxShadow: "0 2px 12px rgba(15,31,75,0.07)", border: `1px solid ${C.border}`, overflow: "hidden" }}>
            {filteredNar.length === 0 ? (
              <div style={{ padding: 60, textAlign: "center", color: C.muted, fontSize: 14 }}>
                <UserPlus size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>No new account requests</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "linear-gradient(to right, #1e3a8a, #153e75, #0f172a)" }}>
                      {["#", "Name", "Email", "Phone", "Account Type", "Reason", "Applied On", "KYC Status", "Actions"].map(h => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                      ))}
                    </tr>


                  </thead>

                  <tbody>
                    {filteredNar.map((r, i) => (
                      <tr key={r.id}
                        onMouseEnter={e => e.currentTarget.style.background = "#f8faff"}
                        onMouseLeave={e => e.currentTarget.style.background = ""}
                      >
                        <TD><span style={{ color: C.muted, fontWeight: 600 }}>{i + 1}</span></TD>
                        <TD><span style={{ fontWeight: 700 }}>{r.name}</span></TD>
                        <TD><span style={{ color: C.muted }}>{r.email}</span></TD>
                        <TD><span style={{ fontFamily: "monospace", fontSize: 12 }}>{r.phone}</span></TD>
                        <TD>
                          <span style={{ background: r.type === "Savings" ? "#eff6ff" : "#faf5ff", color: r.type === "Savings" ? C.accent : C.purple, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>
                            {r.type}
                          </span>
                        </TD>
                        <TD><span style={{ color: C.muted, maxWidth: 160, display: "inline-block", overflow: "hidden", textOverflow: "ellipsis" }}>{r.reason}</span></TD>
                        <TD><span style={{ color: C.muted }}>{r.applied}</span></TD>
                        <TD><Badge status={r.kyc} /></TD>
                        <TD center>
                          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                            <button onClick={() => { setSelectedNar(r); setModal("nar-details"); }}
                              style={{ background: "#eff6ff", color: C.accent, border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                              <Eye size={12} /> View
                            </button>
                            <button onClick={() => { setSelectedNar(r); setModal("nar-approve"); }}
                              style={{ background: "#dcfce7", color: "#15803d", border: "none", borderRadius: 7, padding: "5px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                              <CheckCircle size={12} /> Approve
                            </button>
                            <button onClick={() => { setSelectedNar(r); setModal("nar-reject"); }}
                              style={{ background: "#fee2e2", color: C.red, border: "none", borderRadius: 7, padding: "5px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                              <XCircle size={12} /> Reject
                            </button>
                          </div>
                        </TD>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="cards-to-show">
            {filteredNar.map(a => (
              <div key={a.id} className="mobile-card" style={{ padding: "14px", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: C.accent, letterSpacing: "0.05em", background: "rgba(59,130,246,0.1)", padding: "2px 6px", borderRadius: 4 }}>{a.id}</span>
                  <Badge status={a.kyc} />
                </div>
                <div style={{ padding: "4px 0" }}>
                  <h4 style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 800, color: C.text }}>{a.name}</h4>
                  <p style={{ margin: 0, fontSize: 11, color: C.muted, fontWeight: 600 }}>{a.type} • {a.applied}</p>
                </div>
                <div style={{ display: "flex", gap: 6, borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: "auto" }}>
                  <button onClick={() => { setSelectedNar(a); setModal("nar-details"); }}
                    style={{ flex: 1, border: "none", background: "#eff6ff", color: C.accent, padding: "6px", borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                    Review
                  </button>
                  <button onClick={() => handleNarApprove(a)}
                    style={{ flex: 1, border: "none", background: "#dcfce7", color: "#15803d", padding: "6px", borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>

        </>
      )}

      {/* TAB 3 — PENDING REQUESTS */}
      {tab === "pending" && (
        <div style={{ background: C.card, borderRadius: 16, boxShadow: "0 2px 12px rgba(15,31,75,0.07)", border: `1px solid ${C.border}`, overflow: "hidden" }}>
          {requests.length === 0 ? (
            <div style={{ padding: 60, textAlign: "center", color: C.muted, fontSize: 14 }}>
              <Clock size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
              <p style={{ margin: 0, fontWeight: 600 }}>No pending requests</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <TH>#</TH><TH>Name</TH><TH>Email</TH><TH>Account Type</TH>
                    <TH>Applied On</TH><TH>KYC Status</TH><TH center>Actions</TH>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r, i) => (
                    <tr key={r.id}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8faff"}
                      onMouseLeave={e => e.currentTarget.style.background = ""}
                    >
                      <TD><span style={{ color: C.muted, fontWeight: 600 }}>{i + 1}</span></TD>
                      <TD><span style={{ fontWeight: 700 }}>{r.name}</span></TD>
                      <TD><span style={{ color: C.muted }}>{r.email}</span></TD>
                      <TD>{r.type}</TD>
                      <TD><span style={{ color: C.muted }}>{r.applied}</span></TD>
                      <TD><Badge status={r.kyc} /></TD>
                      <TD center>
                        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                          <button onClick={() => handleApprove(r)}
                            style={{ background: "#dcfce7", color: "#15803d", border: "none", borderRadius: 7, padding: "5px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                            <CheckCircle size={12} /> Approve
                          </button>
                          <button onClick={() => handleReject(r)}
                            style={{ background: "#fee2e2", color: C.red, border: "none", borderRadius: 7, padding: "5px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                            <XCircle size={12} /> Reject
                          </button>
                        </div>
                      </TD>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* MODALS */}

      {/* Create Account */}
      {modal === "create" && (
        <Modal title="➕ Create New Account" onClose={() => setModal(null)}>
          <Field label="Full Name" placeholder="e.g. Rahul Mehta" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <Field label="Email" placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" />
          <Field label="Phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <Field label="Account Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} options={["Savings", "Current"]} />
          <Field label="Branch" value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })} options={["Nashik Main", "Pune Central", "Mumbai West"]} />
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: "#fff", color: C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
            <button onClick={handleCreate} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: C.navy, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Create Account</button>
          </div>
        </Modal>
      )}

      {/* View Details */}
      {modal === "details" && selected && (
        <Modal title="🏦 Account Details" onClose={() => setModal(null)}>
          {[
            ["Account Holder", selected.holder],
            ["Account Number", selected.account],
            ["Account Type", selected.type],
            ["Balance", selected.balance],
            ["IFSC Code", selected.ifsc],
            ["Branch", selected.branch],
            ["Opened On", selected.opened],
            ["Status", selected.status],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</span>
              {k === "Status" ? <Badge status={v} /> : <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: k === "Account Number" || k === "IFSC Code" ? "monospace" : "inherit" }}>{v}</span>}
            </div>
          ))}
          <button onClick={() => setModal(null)} style={{ width: "100%", marginTop: 16, padding: "10px", borderRadius: 10, border: "none", background: C.navy, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Close</button>
        </Modal>
      )}

      {/* Toggle Active/Inactive */}
      {modal === "toggle" && selected && (
        <Modal title={selected.status === "Active" ? "⚠️ Deactivate Account" : "✅ Activate Account"} onClose={() => setModal(null)}>
          <p style={{ fontSize: 14, color: C.text, margin: "0 0 8px" }}>Are you sure you want to <strong>{selected.status === "Active" ? "deactivate" : "activate"}</strong> this account?</p>
          <p style={{ fontSize: 13, color: C.muted, margin: "0 0 20px" }}>Account Holder: <strong>{selected.holder}</strong><br />Account No: <span style={{ fontFamily: "monospace" }}>{selected.account}</span></p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: "#fff", color: C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
            <button onClick={() => handleToggle(selected)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: selected.status === "Active" ? C.gold : C.green, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              {selected.status === "Active" ? "Yes, Deactivate" : "Yes, Activate"}
            </button>
          </div>
        </Modal>
      )}

      {/* Close Account */}
      {modal === "close" && selected && (
        <Modal title="🚫 Close Account" onClose={() => setModal(null)}>
          <p style={{ fontSize: 14, color: C.text, margin: "0 0 8px" }}>Are you sure you want to <strong style={{ color: C.red }}>permanently close</strong> this account?</p>
          <p style={{ fontSize: 13, color: C.muted, margin: "0 0 20px" }}>Account Holder: <strong>{selected.holder}</strong><br />Account No: <span style={{ fontFamily: "monospace" }}>{selected.account}</span><br />Balance: <strong style={{ color: C.green }}>{selected.balance}</strong></p>
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: C.red, fontWeight: 600 }}>
            ⚠️ This action cannot be undone. The account will be permanently closed.
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: "#fff", color: C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
            <button onClick={() => handleClose(selected)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: C.red, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Yes, Close Account</button>
          </div>
        </Modal>
      )}

      {/* NAR View Details */}
      {modal === "nar-details" && selectedNar && (
        <Modal title="👤 New Account Request Details" onClose={() => setModal(null)}>
          {[
            ["Full Name", selectedNar.name],
            ["Email", selectedNar.email],
            ["Phone", selectedNar.phone],
            ["Account Type", selectedNar.type],
            ["Reason", selectedNar.reason],
            ["Applied On", selectedNar.applied],
            ["KYC Status", selectedNar.kyc],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</span>
              {k === "KYC Status" ? <Badge status={v} /> : <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: k === "Phone" ? "monospace" : "inherit" }}>{v}</span>}
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button onClick={() => handleNarApprove(selectedNar)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: C.green, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <CheckCircle size={14} /> Approve
            </button>
            <button onClick={() => handleNarReject(selectedNar)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: C.red, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <XCircle size={14} /> Reject
            </button>
          </div>
        </Modal>
      )}

      {/* NAR Approve */}
      {modal === "nar-approve" && selectedNar && (
        <Modal title="✅ Approve Account Request" onClose={() => setModal(null)}>
          <p style={{ fontSize: 14, color: C.text, margin: "0 0 8px" }}>Approve account request for <strong>{selectedNar.name}</strong>?</p>
          <p style={{ fontSize: 13, color: C.muted, margin: "0 0 20px" }}>Account Type: <strong>{selectedNar.type}</strong><br />Email: <strong>{selectedNar.email}</strong><br />KYC Status: <strong>{selectedNar.kyc}</strong></p>
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#15803d", fontWeight: 600 }}>
            ✅ A new {selectedNar.type} account will be created and activated immediately.
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: "#fff", color: C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
            <button onClick={() => handleNarApprove(selectedNar)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: C.green, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Yes, Approve</button>
          </div>
        </Modal>
      )}

      {/* NAR Reject */}
      {modal === "nar-reject" && selectedNar && (
        <Modal title="❌ Reject Account Request" onClose={() => setModal(null)}>
          <p style={{ fontSize: 14, color: C.text, margin: "0 0 8px" }}>Are you sure you want to <strong style={{ color: C.red }}>reject</strong> this request?</p>
          <p style={{ fontSize: 13, color: C.muted, margin: "0 0 20px" }}>Name: <strong>{selectedNar.name}</strong><br />Account Type: <strong>{selectedNar.type}</strong><br />Email: <strong>{selectedNar.email}</strong></p>
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: C.red, fontWeight: 600 }}>
            ⚠️ The request will be permanently removed.
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: "#fff", color: C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
            <button onClick={() => handleNarReject(selectedNar)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: C.red, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Yes, Reject</button>
          </div>
        </Modal>
      )}
    </div>
  );
}