import { useState, useEffect } from "react";
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

const BASE_URL = "http://localhost:5000/api/v1/admin";

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
  @media (min-width: 769px) {
    .cards-to-show { display: none !important; }
  }
  @media (max-width: 480px) {
    .stat-card-wrap { flex: 1 1 100% !important; }
  }
`;

function Badge({ status }) {
  const map = {
    Active: { bg: "#dcfce7", color: "#15803d" },
    Inactive: { bg: "#fef9c3", color: "#854d0e" },
    Closed: { bg: "#fee2e2", color: "#b91c1c" },
    Verified: { bg: "#dcfce7", color: "#15803d" },
    Approved: { bg: "#dcfce7", color: "#15803d" },
    Pending: { bg: "#fef9c3", color: "#854d0e" },
    Rejected: { bg: "#fee2e2", color: "#b91c1c" },
    Uploaded: { bg: "#dcfce7", color: "#15803d" },
    Missing: { bg: "#fee2e2", color: "#b91c1c" },
  };
  const s = map[status] || { bg: "#f1f5f9", color: "#475569" };
  return (
    <span style={{
      background: s.bg, color: s.color, fontSize: 10, fontWeight: 800,
      padding: "2px 8px", borderRadius: 99, letterSpacing: "0.04em",
      display: "inline-flex", alignItems: "center", gap: 4, height: 20, boxSizing: "border-box"
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

function Modal({ title, onClose, children, wide }) {
  return (
    <div className="modal-container" style={{ position: "fixed", inset: 0, background: "rgba(15,31,75,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, overflowY: "auto" }}>
      <div className="modal-content" style={{ background: C.card, borderRadius: 20, width: "100%", maxWidth: wide ? 680 : 520, boxShadow: "0 20px 60px rgba(15,31,75,0.2)", border: `1px solid ${C.border}`, maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: C.text }}>{title}</h3>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.muted }}>✕</button>
        </div>
        <div style={{ padding: 24, overflowY: "auto" }}>{children}</div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 800, color: C.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10, marginTop: 18, paddingBottom: 6, borderBottom: `2px solid ${C.accent}`, display: "inline-block" }}>
      {children}
    </div>
  );
}

function DetailRow({ label, value, mono, badge }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0, marginRight: 12 }}>{label}</span>
      {badge
        ? <Badge status={value} />
        : <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: mono ? "monospace" : "inherit", textAlign: "right" }}>{value || "—"}</span>
      }
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
  
  const [accounts, setAccounts] = useState([]);
  const [requests, setRequests] = useState([]); // Currently merging all requests here
  const [newReqs, setNewReqs] = useState([]);
  
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "Savings", branch: "Nashik Main" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [accRes, reqRes] = await Promise.all([
        fetch(`${BASE_URL}/accounts`),
        fetch(`${BASE_URL}/requests`)
      ]);
      const accData = await accRes.json();
      const reqData = await reqRes.json();
      
      if (accData.success) {
        setAccounts(accData.data.map(a => ({
          ...a,
          holder: a.bank_holder_name,
          account: a.account_number,
          balance: "₹" + a.balance.toLocaleString(),
          opened: new Date(a.opened_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        })));
      }
      
      if (reqData.success) {
        const mapped = reqData.data.map(r => ({
          ...r,
          name: r.bank_holder_name,
          phone: r.mobile,
          applied: new Date(r.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          kyc: r.status === 'Pending' ? 'Pending' : 'Verified'
        }));
        setNewReqs(mapped.filter(r => r.status === 'Pending'));
        setRequests(mapped.filter(r => r.status === 'Pending')); // Merging pending into both for user UI
      }
    } catch (err) { console.error(err); }
  };

  const filtered = accounts.filter(a =>
    a.holder.toLowerCase().includes(search.toLowerCase()) ||
    a.account.includes(search)
  );

  const filteredNar = newReqs.filter(r =>
    r.name.toLowerCase().includes(narSearch.toLowerCase()) ||
    r.email.toLowerCase().includes(narSearch.toLowerCase())
  );

  async function handleToggle(acc) {
    if (acc.status === "Closed") return;
    try {
      const res = await fetch(`${BASE_URL}/accounts/${acc.id}/toggle`, { method: 'POST' });
      if (res.ok) fetchData();
    } catch (err) { }
    setModal(null);
  }

  async function handleClose(acc) {
    try {
      const res = await fetch(`${BASE_URL}/accounts/${acc.id}/close`, { method: 'POST' });
      if (res.ok) fetchData();
    } catch (err) { }
    setModal(null);
  }

  async function handleApprove(req) {
    try {
      const res = await fetch(`${BASE_URL}/requests/${req.id}/approve`, { method: 'POST' });
      if (res.ok) fetchData();
    } catch (err) { }
  }

  async function handleReject(req) {
    try {
      const res = await fetch(`${BASE_URL}/requests/${req.id}/reject`, { method: 'POST' });
      if (res.ok) fetchData();
    } catch (err) { }
  }

  async function handleNarApprove(req) {
    await handleApprove(req);
    setModal(null);
  }

  async function handleNarReject(req) {
    await handleReject(req);
    setModal(null);
  }

  function handleCreate() {
    // Basic manual creation logic can be added later if backend supports it
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

      {/* Stats */}
      <div className="stats-grid" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        {[
          { label: "Total Accounts", value: accounts.length, color: C.accent, icon: CreditCard, bgColor: "bg-blue-500/10", borderColor: "border-blue-200" },
          { label: "Active", value: accounts.filter(a => a.status === "Active").length, color: C.green, icon: CheckCircle2, bgColor: "bg-emerald-500/10", borderColor: "border-emerald-200" },
          { label: "Inactive", value: accounts.filter(a => a.status === "Inactive").length, color: C.gold, icon: PauseCircle, bgColor: "bg-amber-500/10", borderColor: "border-amber-200" },
          { label: "Closed", value: accounts.filter(a => a.status === "Closed").length, color: C.red, icon: Ban, bgColor: "bg-red-500/10", borderColor: "border-red-200" },
          { label: "New Requests", value: newReqs.length, color: C.accent, icon: UserPlus, bgColor: "bg-blue-500/10", borderColor: "border-blue-200" },
          { label: "Pending", value: requests.length, color: C.purple, icon: Clock, bgColor: "bg-violet-500/10", borderColor: "border-violet-200" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={`stat-card-wrap ${s.bgColor} border ${s.borderColor}`} style={{ borderRadius: 18, padding: "14px 16px", boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 8, transition: "all 0.3s ease", boxSizing: "border-box" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: 11, color: C.muted, margin: 0, fontWeight: 800, letterSpacing: "0.02em" }}>{s.label}</p>
                <div style={{ width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>
                  <Icon size={22} />
                </div>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: C.text, margin: 0 }}>{s.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Tabs and Search */}
      <div className="tab-search-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div className="tabs-wrap" style={{ display: "flex", gap: 6, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 4, width: "fit-content" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "7px 18px", borderRadius: 8, border: "none", background: tab === t.id ? C.navy : "transparent", color: tab === t.id ? "#fff" : C.muted, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6 }}>
              {t.label}
              <span style={{ background: tab === t.id ? "rgba(255,255,255,0.2)" : C.border, color: tab === t.id ? "#fff" : C.muted, fontSize: 10, fontWeight: 800, padding: "1px 7px", borderRadius: 99 }}>{t.count}</span>
            </button>
          ))}
        </div>
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
                    <tr key={a.id} onMouseEnter={e => e.currentTarget.style.background = "#f8faff"} onMouseLeave={e => e.currentTarget.style.background = ""}>
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
                          <button onClick={() => { setSelected(a); setModal("details"); }} style={{ background: "#eff6ff", color: C.accent, border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                            <Eye size={12} /> View
                          </button>
                          {a.status !== "Closed" && (
                            <button onClick={() => { setSelected(a); setModal("toggle"); }} style={{ background: a.status === "Active" ? "#fef9c3" : "#dcfce7", color: a.status === "Active" ? "#854d0e" : "#15803d", border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                              {a.status === "Active" ? <><XCircle size={12} /> Deactivate</> : <><CheckCircle size={12} /> Activate</>}
                            </button>
                          )}
                          {a.status !== "Closed" && (
                            <button onClick={() => { setSelected(a); setModal("close"); }} style={{ background: "#fee2e2", color: C.red, border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
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
        </>
      )}

      {/* TAB 2 — NEW ACCOUNT REQUESTS */}
      {tab === "new" && (
        <>
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
                      <tr key={r.id}>
                        <TD>{i + 1}</TD>
                        <TD><span style={{ fontWeight: 700 }}>{r.name}</span></TD>
                        <TD>{r.email}</TD>
                        <TD>{r.phone}</TD>
                        <TD>{r.account_type}</TD>
                        <TD>{r.reason || "—"}</TD>
                        <TD>{r.applied}</TD>
                        <TD><Badge status={r.kyc} /></TD>
                        <TD center>
                          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                            <button onClick={() => { setSelectedNar(r); setModal("nar-details"); }} style={{ background: "#eff6ff", color: C.accent, border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>View</button>
                            <button onClick={() => handleNarApprove(r)} style={{ background: "#dcfce7", color: "#15803d", border: "none", borderRadius: 7, padding: "5px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Approve</button>
                            <button onClick={() => handleNarReject(r)} style={{ background: "#fee2e2", color: C.red, border: "none", borderRadius: 7, padding: "5px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Reject</button>
                          </div>
                        </TD>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
                  <tr><TH>#</TH><TH>Name</TH><TH>Email</TH><TH>Account Type</TH><TH>Applied On</TH><TH center>Actions</TH></tr>
                </thead>
                <tbody>
                  {requests.map((r, i) => (
                    <tr key={r.id}>
                      <TD>{i + 1}</TD>
                      <TD><span style={{ fontWeight: 700 }}>{r.name}</span></TD>
                      <TD>{r.email}</TD>
                      <TD>{r.account_type}</TD>
                      <TD>{r.applied}</TD>
                      <TD center>
                        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                          <button onClick={() => handleApprove(r)} style={{ background: "#dcfce7", color: "#15803d", border: "none", borderRadius: 7, padding: "5px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Approve</button>
                          <button onClick={() => handleReject(r)} style={{ background: "#fee2e2", color: C.red, border: "none", borderRadius: 7, padding: "5px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Reject</button>
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

      {/* ─────────── MODALS ─────────── */}
      {modal === "details" && selected && (
        <Modal title="🏦 Account Details" onClose={() => setModal(null)}>
          <DetailRow label="Account Holder" value={selected.holder} />
          <DetailRow label="Account Number" value={selected.account} mono />
          <DetailRow label="Account Type" value={selected.type} />
          <DetailRow label="Balance" value={selected.balance} />
          <DetailRow label="IFSC Code" value={selected.ifsc} mono />
          <DetailRow label="Status" value={selected.status} badge />
          <button onClick={() => setModal(null)} style={{ width: "100%", marginTop: 16, padding: "10px", borderRadius: 10, border: "none", background: C.navy, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Close</button>
        </Modal>
      )}

      {modal === "toggle" && selected && (
        <Modal title={selected.status === "Active" ? "⚠️ Deactivate Account" : "✅ Activate Account"} onClose={() => setModal(null)}>
          <p>Confirm status change for <strong>{selected.holder}</strong>?</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px", background: "#fff", borderRadius: 10, border: "1px solid #ccc" }}>Cancel</button>
            <button onClick={() => handleToggle(selected)} style={{ flex: 1, padding: "10px", background: C.navy, color: "#fff", borderRadius: 10, border: "none" }}>Confirm</button>
          </div>
        </Modal>
      )}

      {modal === "close" && selected && (
        <Modal title="🚫 Close Account" onClose={() => setModal(null)}>
          <p>Permanently close account for <strong>{selected.holder}</strong>?</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: "10px", background: "#fff", borderRadius: 10, border: "1px solid #ccc" }}>Cancel</button>
            <button onClick={() => handleClose(selected)} style={{ flex: 1, padding: "10px", background: C.red, color: "#fff", borderRadius: 10, border: "none" }}>Yes, Close</button>
          </div>
        </Modal>
      )}

      {modal === "nar-details" && selectedNar && (
        <Modal title="👤 Request Details" onClose={() => setModal(null)} wide>
           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
            <DetailRow label="Full Name" value={selectedNar.name} />
            <DetailRow label="Father's Name" value={selectedNar.father_name} />
            <DetailRow label="Phone" value={selectedNar.phone} />
            <DetailRow label="Email" value={selectedNar.email} />
            <DetailRow label="Aadhaar" value={selectedNar.aadhaar} mono />
            <DetailRow label="PAN" value={selectedNar.pan} mono />
            <DetailRow label="Type" value={selectedNar.account_type} />
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={() => handleNarApprove(selectedNar)} style={{ flex: 1, padding: "10px", background: C.green, color: "#fff", borderRadius: 10, border: "none" }}>Approve</button>
            <button onClick={() => handleNarReject(selectedNar)} style={{ flex: 1, padding: "10px", background: C.red, color: "#fff", borderRadius: 10, border: "none" }}>Reject</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
