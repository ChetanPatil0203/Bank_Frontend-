import { useState } from "react";
import {
  Search, TrendingUp, TrendingDown, User,
} from "lucide-react";
// apiServices मधून हे फंक्शन्स इम्पोर्ट करा
import { getAdminAccounts, processTransaction } from "../../utils/apiServices";

const C = {
  navy: "#0f1f4b", bg: "#f0f4ff", card: "#ffffff",
  text: "#1e293b", muted: "#64748b", border: "#e2e8f0",
  accent: "#3b82f6", green: "#10b981", red: "#ef4444",
  gold: "#f59e0b", purple: "#8b5cf6",
};

const RESPONSIVE_STYLES = `
  @media (max-width: 768px) {
    .header-row { flex-direction: column !important; align-items: stretch !important; }
    .search-row { flex-direction: column !important; align-items: stretch !important; gap: 8px !important; }
    .txn-results-grid { display: grid !important; grid-template-columns: 1fr !important; gap: 12px !important; }

    .txn-item { 
      flex: none !important; 
      width: 100% !important; 
      max-width: none !important;
      background: #fff !important;
      border: 1px solid #f1f5f9 !important;
      border-radius: 18px !important;
      padding: 16px !important;
      box-sizing: border-box !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      transition: all 0.3s ease !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03) !important;
    }
    .txn-item:hover {
      transform: translateY(-2px) !important;
    }
    .txn-item-right { 
      text-align: left !important; 
      width: 100% !important; 
      border-top: 1px solid #f1f5f9 !important; 
      padding-top: 12px !important; 
      margin-top: 8px !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
    }

    .modal-container { padding: 12px !important; }
    .modal-content { max-width: 96% !important; border-radius: 20px !important; }
    .options-btn-row { flex-direction: column !important; gap: 10px !important; }
  }
`;

function formatINR(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

function Badge({ status }) {
  const map = {
    Active: { bg: "#dcfce7", color: "#15803d" },
    Inactive: { bg: "#fef9c3", color: "#854d0e" },
    Closed: { bg: "#fee2e2", color: "#b91c1c" },
  };
  const s = map[status] || { bg: "#f1f5f9", color: "#475569" };
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>
      {status}
    </span>
  );
}

// ── Modal Wrapper ──
function Modal({ title, onClose, children }) {
  return (
    <div className="modal-container" style={{ position: "fixed", inset: 0, background: "rgba(15,31,75,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div className="modal-content" style={{ background: C.card, borderRadius: 20, width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(15,31,75,0.2)", border: `1px solid ${C.border}` }}>
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: C.text }}>{title}</h3>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16, color: C.muted }}>✕</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

export default function AdminTransactionManager() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null); // "options" | "deposit" | "withdraw" | "success"
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [txnType, setTxnType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastTxn, setLastTxn] = useState(null);

  // ── Search API Call ──
  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await getAdminAccounts(query);
      if (res.ok && res.data.success) {
        setResults(res.data.data);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    }
    setSearched(true);
    setLoading(false);
  }

  // ── Account Click → Options Modal ──
  function handleSelectAccount(acc) {
    setSelected(acc);
    setModal("options");
    setAmount("");
    setNote("");
    setError("");
  }

  // ── Open Txn Form ──
  function openForm(type) {
    setTxnType(type === "deposit" ? "Deposit" : "Withdraw");
    setAmount("");
    setNote("");
    setError("");
    setModal(type);
  }

  // ── Submit Transaction API Call ──
  async function handleSubmit() {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("कृपया valid amount टाका.");
      return;
    }
    
    setLoading(true);
    setError("");
    try {
      const res = await processTransaction({
        account_number: selected.account_number,
        type: txnType,
        amount: Number(amount),
        note: note
      });

      if (res.ok && res.data.success) {
        // Success: Update UI
        setLastTxn({
          ...res.data.transaction,
          holder: selected.bank_holder_name,
          prevBalance: selected.balance,
          newBalance: res.data.account.balance
        });
        setSelected(res.data.account);
        setResults(prev => prev.map(a => a.id === res.data.account.id ? res.data.account : a));
        setModal("success");
      } else {
        setError(res.data?.message || "Transaction failed.");
      }
    } catch (err) {
      setError("Server error आला. परत प्रयत्न करा.");
    }
    setLoading(false);
  }

  return (
    <div>
      <style>{RESPONSIVE_STYLES}</style>
      
      {/* Header */}
      <div className="mb-3">
        <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: 0 }}>Transaction Manager</h2>
        <p style={{ fontSize: 12, color: C.muted, margin: "2px 0 0" }}>Account search करा आणि Deposit / Withdraw करा</p>
      </div>

      {/* ── Search Box ── */}
      <div style={{ background: C.card, borderRadius: 16, padding: "16px 20px", boxShadow: "0 2px 12px rgba(15,31,75,0.07)", border: `1px solid ${C.border}`, marginBottom: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>Account Search</p>
        <div className="search-row" style={{ display: "flex", gap: 10 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.muted }} />
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setSearched(false); }}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="Account number किंवा Account holder name..."
              style={{ width: "100%", boxSizing: "border-box", paddingLeft: 36, paddingRight: 14, paddingTop: 11, paddingBottom: 11, border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", background: "#f8faff", fontFamily: "inherit" }}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            style={{ padding: "11px 24px", borderRadius: 10, border: "none", background: C.navy, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, whiteSpace: "nowrap", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Searching..." : <><Search size={14} /> Search</>}
          </button>
        </div>
      </div>

      {/* ── Search Results ── */}
      {searched && (
        <>
          {results.length === 0 ? (
            <div style={{ background: C.card, borderRadius: 16, padding: 48, textAlign: "center", border: `1px solid ${C.border}` }}>
              <User size={36} style={{ color: C.muted, opacity: 0.3, marginBottom: 12 }} />
              <p style={{ color: C.muted, fontWeight: 600, margin: 0 }}>कोणताही account सापडला नाही</p>
              <p style={{ color: C.muted, fontSize: 12, margin: "4px 0 0" }}>वेगळा name किंवा account number try करा</p>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                {results.length} Result{results.length > 1 ? "s" : ""} Found — Account वर Click करा
              </p>
              <div className="txn-results-grid" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                {results.map(acc => (
                  <div
                    key={acc.id}
                    onClick={() => acc.status !== "Closed" && handleSelectAccount(acc)}
                    className="txn-item"
                    style={{
                      background: C.card, borderRadius: 16, padding: "14px 16px", border: `1.5px solid #f1f5f9`,
                      boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)",
                      cursor: acc.status === "Closed" ? "not-allowed" : "pointer",
                      opacity: acc.status === "Closed" ? 0.6 : 1,
                      transition: "all 0.3s ease", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
                    }}
                    onMouseEnter={e => { if (acc.status !== "Closed") { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 12px 40px -12px rgba(0,0,0,0.12)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#f1f5f9"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px -4px rgba(0,0,0,0.05)"; }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(135deg, #1e3a7b, #3b82f6)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                        {acc.bank_holder_name.charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 800, color: C.text, margin: 0 }}>{acc.bank_holder_name}</p>
                        <p style={{ fontSize: 12, color: C.muted, margin: "2px 0 0", fontFamily: "monospace" }}>{acc.account_number}</p>
                        <p style={{ fontSize: 11, color: C.muted, margin: "2px 0 0" }}>{acc.account_type} • {acc.branch}</p>
                      </div>
                    </div>
                    <div className="txn-item-right" style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 20, fontWeight: 800, color: C.green, margin: 0 }}>{formatINR(acc.balance)}</p>
                      <p style={{ fontSize: 11, color: C.muted, margin: "2px 0 6px" }}>Current Balance</p>
                      <Badge status={acc.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* ════════════════════════
          MODAL 1 — OPTIONS
      ════════════════════════ */}
      {modal === "options" && selected && (
        <Modal title="Transaction करा" onClose={() => setModal(null)}>
          <div style={{ background: "#f8faff", borderRadius: 12, padding: 16, marginBottom: 20, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#1e3a7b,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff" }}>
                {selected.bank_holder_name.charAt(0)}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 800, color: C.text, margin: 0 }}>{selected.bank_holder_name}</p>
                <p style={{ fontSize: 12, color: C.muted, margin: 0, fontFamily: "monospace" }}>{selected.account_number}</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>Available Balance</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: C.green }}>{formatINR(selected.balance)}</span>
            </div>
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>Transaction Type निवडा</p>
          <div className="options-btn-row" style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => openForm("deposit")}
              style={{ flex: 1, padding: "20px 16px", borderRadius: 14, border: `2px solid #bbf7d0`, background: "#f0fdf4", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transition: "all 0.15s" }}
            >
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}><TrendingUp size={22} color={C.green} /></div>
              <span style={{ fontSize: 14, fontWeight: 800, color: C.green }}>Deposit</span>
            </button>
            <button
              onClick={() => openForm("withdraw")}
              style={{ flex: 1, padding: "20px 16px", borderRadius: 14, border: `2px solid #fecaca`, background: "#fef2f2", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transition: "all 0.15s" }}
            >
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}><TrendingDown size={22} color={C.red} /></div>
              <span style={{ fontSize: 14, fontWeight: 800, color: C.red }}>Withdraw</span>
            </button>
          </div>
        </Modal>
      )}

      {/* ════════════════════════════
          MODAL 2 — FORM (DEPOSIT/WITHDRAW)
      ════════════════════════════ */}
      {(modal === "deposit" || modal === "withdraw") && selected && (
        <Modal title={modal === "deposit" ? "📥 Deposit" : "📤 Withdraw"} onClose={() => { setModal("options"); setError(""); }}>
          {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: C.red, fontWeight: 600 }}>⚠️ {error}</div>}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Amount (₹)</label>
            <input
              type="number" value={amount} onChange={e => { setAmount(e.target.value); setError(""); }} placeholder="0" autoFocus
              style={{ width: "100%", boxSizing: "border-box", padding: "12px", border: `2px solid ${modal === "deposit" ? "#bbf7d0" : "#fecaca"}`, borderRadius: 10, fontSize: 20, fontWeight: 800, outline: "none", background: modal === "deposit" ? "#f0fdf4" : "#fef2f2" }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Note</label>
            <input placeholder="e.g. Cash payment..." value={note} onChange={e => setNote(e.target.value)} style={{ width: "100%", boxSizing: "border-box", padding: "10px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 13 }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => { setModal("options"); setError(""); }} style={{ flex: 1, padding: "11px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: "#fff", fontWeight: 700 }}>Back</button>
            <button onClick={handleSubmit} disabled={loading} style={{ flex: 2, padding: "11px", borderRadius: 10, border: "none", background: modal === "deposit" ? C.green : C.red, color: "#fff", fontWeight: 700, opacity: loading ? 0.7 : 1 }}>{loading ? "Processing..." : "Confirm"}</button>
          </div>
        </Modal>
      )}

      {/* ════════════════════════
          MODAL 3 — SUCCESS
      ════════════════════════ */}
      {modal === "success" && lastTxn && (
        <Modal title="" onClose={() => setModal(null)}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: lastTxn.type === "Deposit" ? "#dcfce7" : "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              {lastTxn.type === "Deposit" ? <TrendingUp size={28} color={C.green} /> : <TrendingDown size={28} color={C.red} />}
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text }}>Success!</h3>
            <p style={{ fontSize: 13, color: C.muted }}>Transaction यशस्वीरीत्या पूर्ण झाले.</p>
          </div>
          <div style={{ background: "#f8faff", borderRadius: 12, padding: 16, marginBottom: 20, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.muted }}>HOLDER</span>
              <span style={{ fontSize: 13, fontWeight: 700 }}>{lastTxn.holder}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.muted }}>AMOUNT</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: lastTxn.type === "Deposit" ? C.green : C.red }}>{formatINR(lastTxn.amount)}</span>
            </div>
             <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.muted }}>NEW BALANCE</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{formatINR(lastTxn.newBalance)}</span>
            </div>
          </div>
          <button onClick={() => setModal(null)} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: C.navy, color: "#fff", fontWeight: 700 }}>Done</button>
        </Modal>
      )}
    </div>
  );
}

