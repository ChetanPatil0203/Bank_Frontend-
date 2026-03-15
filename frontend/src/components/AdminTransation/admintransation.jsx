// AdminTransactionManager.jsx

import { useState } from "react";
import {
  Search, TrendingUp, TrendingDown, CheckCircle, XCircle, User,
} from "lucide-react";

const C = {
  navy: "#0f1f4b", bg: "#f0f4ff", card: "#ffffff",
  text: "#1e293b", muted: "#64748b", border: "#e2e8f0",
  accent: "#3b82f6", green: "#10b981", red: "#ef4444",
  gold: "#f59e0b", purple: "#8b5cf6",
};

const ALL_ACCOUNTS = [
  { id: "ACC001", holder: "Chetan Patil",   account: "482910372846", type: "Savings", balance: 124500, ifsc: "PYZN0001", branch: "Nashik Main",  status: "Active"   },
  { id: "ACC002", holder: "Rohit Sharma",   account: "193847562031", type: "Current", balance: 380200, ifsc: "PYZN0001", branch: "Nashik Main",  status: "Active"   },
  { id: "ACC003", holder: "Priya Desai",    account: "847291038475", type: "Savings", balance: 45000,  ifsc: "PYZN0002", branch: "Pune Central", status: "Inactive" },
  { id: "ACC004", holder: "Amit Joshi",     account: "302948172635", type: "Savings", balance: 92750,  ifsc: "PYZN0001", branch: "Nashik Main",  status: "Active"   },
  { id: "ACC005", holder: "Sneha Kulkarni", account: "719283047561", type: "Current", balance: 215300, ifsc: "PYZN0003", branch: "Mumbai West",  status: "Active"   },
  { id: "ACC006", holder: "Vikas Nair",     account: "583920174628", type: "Savings", balance: 12400,  ifsc: "PYZN0002", branch: "Pune Central", status: "Closed"   },
];

function formatINR(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

function Badge({ status }) {
  const map = {
    Active:   { bg: "#dcfce7", color: "#15803d" },
    Inactive: { bg: "#fef9c3", color: "#854d0e" },
    Closed:   { bg: "#fee2e2", color: "#b91c1c" },
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
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,31,75,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: C.card, borderRadius: 20, width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(15,31,75,0.2)", border: `1px solid ${C.border}` }}>
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
  const [query, setQuery]         = useState("");
  const [searched, setSearched]   = useState(false);
  const [results, setResults]     = useState([]);
  const [selected, setSelected]   = useState(null);
  const [modal, setModal]         = useState(null); // "options" | "deposit" | "withdraw" | "success"
  const [amount, setAmount]       = useState("");
  const [note, setNote]           = useState("");
  const [txnType, setTxnType]     = useState("");
  const [error, setError]         = useState("");
  const [accounts, setAccounts]   = useState(ALL_ACCOUNTS);
  const [lastTxn, setLastTxn]     = useState(null);

  // ── Search ──
  function handleSearch() {
    if (!query.trim()) return;
    const res = accounts.filter(a =>
      a.holder.toLowerCase().includes(query.toLowerCase()) ||
      a.account.includes(query)
    );
    setResults(res);
    setSearched(true);
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
    setTxnType(type);
    setAmount("");
    setNote("");
    setError("");
    setModal(type); // "deposit" | "withdraw"
  }

  // ── Submit Transaction ──
  function handleSubmit() {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("कृपया valid amount टाका.");
      return;
    }
    const amt = Number(amount);

    if (txnType === "withdraw") {
      if (amt > selected.balance) {
        setError(`Insufficient balance! Available: ${formatINR(selected.balance)}`);
        return;
      }
    }

    // Update balance
    const updatedAccounts = accounts.map(a => {
      if (a.id !== selected.id) return a;
      return {
        ...a,
        balance: txnType === "deposit"
          ? a.balance + amt
          : a.balance - amt,
      };
    });

    const updatedSelected = updatedAccounts.find(a => a.id === selected.id);

    setAccounts(updatedAccounts);
    setSelected(updatedSelected);
    setLastTxn({
      type: txnType,
      amount: amt,
      prevBalance: txnType === "deposit" ? updatedSelected.balance - amt : updatedSelected.balance + amt,
      newBalance: updatedSelected.balance,
      holder: selected.holder,
      account: selected.account,
      note: note,
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    });

    setError("");
    setModal("success");
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: 0 }}>Transaction Manager</h2>
        <p style={{ fontSize: 13, color: C.muted, margin: "4px 0 0" }}>Account search करा आणि Deposit / Withdraw करा</p>
      </div>

      {/* ── Search Box ── */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(15,31,75,0.07)", border: `1px solid ${C.border}`, marginBottom: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
          Account Search
        </p>
        <div style={{ display: "flex", gap: 10 }}>
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
            style={{ padding: "11px 24px", borderRadius: 10, border: "none", background: C.navy, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}
          >
            <Search size={14} /> Search
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
              <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                {results.length} Result{results.length > 1 ? "s" : ""} Found — Account वर Click करा
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {results.map(acc => (
                  <div
                    key={acc.id}
                    onClick={() => acc.status !== "Closed" && handleSelectAccount(acc)}
                    style={{
                      background: C.card,
                      borderRadius: 14,
                      padding: "18px 20px",
                      border: `1.5px solid ${C.border}`,
                      boxShadow: "0 2px 8px rgba(15,31,75,0.06)",
                      cursor: acc.status === "Closed" ? "not-allowed" : "pointer",
                      opacity: acc.status === "Closed" ? 0.6 : 1,
                      transition: "all 0.15s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 12,
                    }}
                    onMouseEnter={e => { if (acc.status !== "Closed") e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.boxShadow = "0 4px 16px rgba(59,130,246,0.15)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "0 2px 8px rgba(15,31,75,0.06)"; }}
                  >
                    {/* Left — Avatar + Info */}
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(135deg, #1e3a7b, #3b82f6)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                        {acc.holder.charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 800, color: C.text, margin: 0 }}>{acc.holder}</p>
                        <p style={{ fontSize: 12, color: C.muted, margin: "2px 0 0", fontFamily: "monospace" }}>{acc.account}</p>
                        <p style={{ fontSize: 11, color: C.muted, margin: "2px 0 0" }}>{acc.type} • {acc.branch}</p>
                      </div>
                    </div>

                    {/* Right — Balance + Status */}
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 20, fontWeight: 800, color: C.green, margin: 0 }}>{formatINR(acc.balance)}</p>
                      <p style={{ fontSize: 11, color: C.muted, margin: "2px 0 6px" }}>Current Balance</p>
                      <Badge status={acc.status} />
                    </div>
                  </div>
                ))}
              </div>
              {results.some(a => a.status === "Closed") && (
                <p style={{ fontSize: 12, color: C.muted, margin: "10px 0 0" }}>
                  ⚠️ Closed accounts वर transaction करता येत नाही.
                </p>
              )}
            </div>
          )}
        </>
      )}

      {/* ════════════════════════
          MODAL 1 — OPTIONS
      ════════════════════════ */}
      {modal === "options" && selected && (
        <Modal title="Transaction करा" onClose={() => setModal(null)}>
          {/* Account Info Card */}
          <div style={{ background: "#f8faff", borderRadius: 12, padding: 16, marginBottom: 20, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#1e3a7b,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff" }}>
                {selected.holder.charAt(0)}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 800, color: C.text, margin: 0 }}>{selected.holder}</p>
                <p style={{ fontSize: 12, color: C.muted, margin: 0, fontFamily: "monospace" }}>{selected.account}</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>Available Balance</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: C.green }}>{formatINR(selected.balance)}</span>
            </div>
          </div>

          {/* 2 Big Buttons */}
          <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
            Transaction Type निवडा
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {/* Deposit Button */}
            <button
              onClick={() => openForm("deposit")}
              style={{ flex: 1, padding: "20px 16px", borderRadius: 14, border: `2px solid #bbf7d0`, background: "#f0fdf4", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#dcfce7"; e.currentTarget.style.borderColor = C.green; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#f0fdf4"; e.currentTarget.style.borderColor = "#bbf7d0"; }}
            >
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TrendingUp size={22} color={C.green} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 800, color: C.green }}>Deposit</span>
              <span style={{ fontSize: 11, color: "#15803d", opacity: 0.8 }}>Amount Add करा</span>
            </button>

            {/* Withdraw Button */}
            <button
              onClick={() => openForm("withdraw")}
              style={{ flex: 1, padding: "20px 16px", borderRadius: 14, border: `2px solid #fecaca`, background: "#fef2f2", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.borderColor = C.red; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.borderColor = "#fecaca"; }}
            >
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TrendingDown size={22} color={C.red} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 800, color: C.red }}>Withdraw</span>
              <span style={{ fontSize: 11, color: "#b91c1c", opacity: 0.8 }}>Amount काढा</span>
            </button>
          </div>
        </Modal>
      )}

      {/* ════════════════════════════
          MODAL 2 — DEPOSIT / WITHDRAW FORM
      ════════════════════════════ */}
      {(modal === "deposit" || modal === "withdraw") && selected && (
        <Modal
          title={modal === "deposit" ? "📥 Deposit" : "📤 Withdraw"}
          onClose={() => { setModal("options"); setError(""); }}
        >
          {/* Mini Account Info */}
          <div style={{ background: "#f8faff", borderRadius: 10, padding: "12px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${C.border}` }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: 0 }}>{selected.holder}</p>
              <p style={{ fontSize: 11, color: C.muted, margin: "2px 0 0", fontFamily: "monospace" }}>{selected.account}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 11, color: C.muted, margin: 0 }}>Balance</p>
              <p style={{ fontSize: 16, fontWeight: 800, color: C.green, margin: 0 }}>{formatINR(selected.balance)}</p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: C.red, fontWeight: 600 }}>
              ⚠️ {error}
            </div>
          )}

          {/* Amount Input */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              Amount (₹) <span style={{ color: C.red }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16, fontWeight: 700, color: modal === "deposit" ? C.green : C.red }}>₹</span>
              <input
                type="number"
                placeholder="0"
                value={amount}
                onChange={e => { setAmount(e.target.value); setError(""); }}
                autoFocus
                style={{ width: "100%", boxSizing: "border-box", paddingLeft: 28, paddingRight: 12, paddingTop: 12, paddingBottom: 12, border: `2px solid ${modal === "deposit" ? "#bbf7d0" : "#fecaca"}`, borderRadius: 10, fontSize: 20, fontWeight: 800, color: modal === "deposit" ? C.green : C.red, outline: "none", background: modal === "deposit" ? "#f0fdf4" : "#fef2f2", fontFamily: "inherit" }}
              />
            </div>
          </div>

          {/* Live Preview */}
          {amount && !isNaN(amount) && Number(amount) > 0 && (
            <div style={{ background: "#f8faff", borderRadius: 10, padding: 14, marginBottom: 16, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>Current Balance</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{formatINR(selected.balance)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{modal === "deposit" ? "Deposit Amount" : "Withdraw Amount"}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: modal === "deposit" ? C.green : C.red }}>
                  {modal === "deposit" ? "+" : "-"}{formatINR(Number(amount))}
                </span>
              </div>
              <div style={{ height: 1, background: C.border, margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: C.text, textTransform: "uppercase", letterSpacing: "0.05em" }}>New Balance</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: modal === "deposit" ? C.green : (selected.balance - Number(amount) < 0 ? C.red : C.text) }}>
                  {formatINR(modal === "deposit"
                    ? selected.balance + Number(amount)
                    : selected.balance - Number(amount)
                  )}
                </span>
              </div>
              {modal === "withdraw" && selected.balance - Number(amount) < 0 && (
                <p style={{ fontSize: 11, color: C.red, fontWeight: 700, margin: "8px 0 0" }}>⚠️ Insufficient balance!</p>
              )}
            </div>
          )}

          {/* Note */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              Note (Optional)
            </label>
            <input
              placeholder="e.g. Cash payment, Salary credit..."
              value={note}
              onChange={e => setNote(e.target.value)}
              style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", background: "#f8faff", fontFamily: "inherit" }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => { setModal("options"); setError(""); }}
              style={{ flex: 1, padding: "11px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: "#fff", color: C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              style={{ flex: 2, padding: "11px", borderRadius: 10, border: "none", background: modal === "deposit" ? C.green : C.red, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              {modal === "deposit"
                ? <><TrendingUp size={15} /> Deposit Confirm</>
                : <><TrendingDown size={15} /> Withdraw Confirm</>
              }
            </button>
          </div>
        </Modal>
      )}

      {/* ════════════════════════
          MODAL 3 — SUCCESS
      ════════════════════════ */}
      {modal === "success" && lastTxn && (
        <Modal title="" onClose={() => { setModal(null); }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: lastTxn.type === "deposit" ? "#dcfce7" : "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              {lastTxn.type === "deposit"
                ? <TrendingUp size={28} color={C.green} />
                : <TrendingDown size={28} color={C.red} />
              }
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>
              {lastTxn.type === "deposit" ? "Deposit Successful!" : "Withdrawal Successful!"}
            </h3>
            <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>{lastTxn.time} — Admin द्वारे processed</p>
          </div>

          {/* Transaction Summary */}
          <div style={{ background: "#f8faff", borderRadius: 12, padding: 16, marginBottom: 20, border: `1px solid ${C.border}` }}>
            {[
              ["Account Holder", lastTxn.holder],
              ["Account No.",    lastTxn.account],
              ["Transaction",    (lastTxn.type === "deposit" ? "+" : "-") + formatINR(lastTxn.amount)],
              ["Previous Bal.",  formatINR(lastTxn.prevBalance)],
              ["New Balance",    formatINR(lastTxn.newBalance)],
              ...(lastTxn.note ? [["Note", lastTxn.note]] : []),
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                <span style={{
                  fontSize: 13, fontWeight: 700,
                  color: k === "Transaction" ? (lastTxn.type === "deposit" ? C.green : C.red)
                       : k === "New Balance" ? C.green : C.text,
                  fontFamily: k === "Account No." ? "monospace" : "inherit",
                }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Done + New Transaction */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => { setModal("options"); setAmount(""); setNote(""); }}
              style={{ flex: 1, padding: "11px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: "#fff", color: C.text, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
            >
              New Transaction
            </button>
            <button
              onClick={() => setModal(null)}
              style={{ flex: 1, padding: "11px", borderRadius: 10, border: "none", background: C.navy, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
            >
              Done
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}