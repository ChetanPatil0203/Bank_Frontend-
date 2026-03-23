import { ArrowDownToLineIcon, CreditCard, User, Phone, Mail, MapPin, Shield, Users, Building2, Copy, CheckCheck, ChevronRight, BadgeCheck, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../utils/apiServices";
import jsPDF from "jspdf";

const PAYZEN_LOGO = "data:image/jpeg;base64,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";

export default function AccountDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedField, setCopiedField] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("payzen_user");
    if (!stored) { navigate("/login"); return; }
    getProfile().then(res => {
      if (res.ok && res.data.success) {
        setData(res.data.data);
      } else if (res.status === 401) {
        localStorage.removeItem("payzen_token");
        localStorage.removeItem("payzen_user");
        navigate("/login");
      }
      setLoading(false);
    }).catch(() => {
      try { setData(JSON.parse(localStorage.getItem("payzen_user"))); }
      catch { setError("Something went wrong."); }
      setLoading(false);
    });
  }, [navigate]);

  const copyToClipboard = (value, field) => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 2000);
    });
  };

  const downloadPDF = () => {
    if (!data) return;
    const acc = data.account || {};
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, H = 297;

    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.12 }));
    doc.addImage(PAYZEN_LOGO, "JPEG", W / 2 - 35, H / 2 - 35, 70, 70);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 36, 96);
    doc.setFontSize(75);
    doc.text("PayZen", W / 2, H / 2 - 5, { align: "center", angle: 45 });
    doc.restoreGraphicsState();

    doc.setFillColor(15, 36, 96);
    doc.rect(0, 0, W, 45, "F");
    const cx = 24, cy = 22, cr = 14;
    doc.setFillColor(25, 50, 115);
    doc.circle(cx, cy, cr, "F");
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.8);
    doc.circle(cx, cy, cr, "S");
    const logoSize = cr * 2 - 4;
    doc.addImage(PAYZEN_LOGO, "JPEG", cx - logoSize / 2, cy - logoSize / 2, logoSize, logoSize);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("PayZen Bank", 44, 17);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 200, 240);
    doc.text("Official Account Statement", 44, 24);
    doc.text("Secure  ·  Trusted  ·  Digital Banking", 44, 31);
    const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
    doc.setFontSize(8);
    doc.text(`Generated: ${today}`, W - 12, 22, { align: "right" });

    doc.setFillColor(240, 244, 255);
    doc.roundedRect(14, 51, W - 28, 20, 3, 3, "F");
    doc.setDrawColor(200, 210, 240);
    doc.setLineWidth(0.4);
    doc.roundedRect(14, 51, W - 28, 20, 3, 3, "S");
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("ACCOUNT NUMBER", 20, 58);
    doc.setTextColor(15, 36, 96);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(acc.account_number || "—", 20, 66);
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("IFSC CODE", 105, 58);
    doc.setTextColor(15, 36, 96);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(acc.ifsc || "—", 105, 66);
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("STATUS", 168, 58);
    doc.setFillColor(34, 197, 94);
    doc.circle(170, 64, 2.5, "F");
    doc.setTextColor(15, 36, 96);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(acc.status ? acc.status.toUpperCase() : "ACTIVE", 174, 65.5);

    let y = 78;
    const drawSection = (title, rows) => {
      if (y > 262) return;
      doc.setFillColor(15, 36, 96);
      doc.rect(14, y, W - 28, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "bold");
      doc.text(title.toUpperCase(), 18, y + 5.5);
      y += 8;
      const colW = (W - 28) / 2;
      rows.forEach((row, i) => {
        const col = i % 2;
        const rx = 14 + col * colW;
        if (col === 0) {
          const bg = Math.floor(i / 2) % 2 === 0 ? [255, 255, 255] : [248, 250, 255];
          doc.setFillColor(...bg);
          doc.rect(14, y, W - 28, 11, "F");
        }
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.2);
        doc.rect(rx, y, colW, 11, "S");
        doc.setTextColor(148, 163, 184);
        doc.setFontSize(6.5);
        doc.setFont("helvetica", "normal");
        doc.text(row[0], rx + 3, y + 4.5);
        doc.setTextColor(30, 41, 59);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text(String(row[1] || "—"), rx + 3, y + 9.5);
        if (col === 1) y += 11;
      });
      if (rows.length % 2 !== 0) y += 11;
      y += 5;
    };

    const maskAadhaar = (v) => v ? v.replace(/(\d{4})(\d{4})(\d{4})/, "XXXX XXXX $3") : "—";
    const maskPan = (v) => v ? "XXXXX" + v.slice(5) : "—";

    drawSection("Account Information", [
      ["Account Holder Name", data.name || acc.bank_holder_name],
      ["Account Type", acc.account_type],
      ["Branch Name", acc.branch],
      ["Account Status", acc.status ? acc.status.toUpperCase() : "ACTIVE"],
    ]);
    drawSection("Personal Information", [
      ["Gender", data.gender],
      ["Date of Birth", data.date_of_birth],
      ["Father Name", acc.father_name],
      ["Address", data.address],
    ]);
    drawSection("Contact Information", [
      ["Mobile Number", data.mobile],
      ["Email Address", data.email],
    ]);
    drawSection("KYC Information", [
      ["Aadhaar Number", maskAadhaar(acc.aadhaar)],
      ["PAN Number", maskPan(acc.pan)],
    ]);
    drawSection("Nominee Information", [
      ["Nominee Name", acc.nominee_name],
      ["Nominee Relation", acc.nominee_relation],
    ]);

    doc.setFillColor(15, 36, 96);
    doc.rect(0, H - 16, W, 16, "F");
    doc.setTextColor(180, 200, 240);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.text("PayZen Bank  ·  Secure Digital Banking  ·  This is a system-generated document.", W / 2, H - 8.5, { align: "center" });
    doc.text("For queries contact: support@payzenbank.com", W / 2, H - 3.5, { align: "center" });
    doc.save(`PayZen_Account_${acc.account_number || "Details"}.pdf`);
  };

  if (loading) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 16 }}>
      <div style={{ width: 40, height: 40, border: "3px solid #e2e8f0", borderTopColor: "#1e3a7b", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <p style={{ color: "#64748b", fontSize: 14, fontFamily: "Georgia, serif" }}>Loading account details...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (error) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#dc2626", fontFamily: "Georgia, serif" }}>
        <AlertCircle size={20} /> {error}
      </div>
    </div>
  );

  const acc = data?.account || null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .acct-card { animation: fadeSlideUp 0.5s ease both; }
        .acct-card:nth-child(2) { animation-delay: 0.07s; }
        .acct-card:nth-child(3) { animation-delay: 0.14s; }
        .acct-card:nth-child(4) { animation-delay: 0.21s; }
        .acct-card:nth-child(5) { animation-delay: 0.28s; }
        .copy-btn:hover { background: #f1f5f9 !important; }
        .dl-btn:hover { background: #162e66 !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,58,123,0.35) !important; }
        .detail-row:hover { background: #f8faff !important; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f0f4f8", fontFamily: "'DM Sans', sans-serif", padding: "28px 20px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* ── PAGE HEADER ── */}
          <div style={{ marginBottom: 28, animation: "fadeSlideUp 0.4s ease both" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4 }}>
                  PayZen Bank
                </p>
                <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: "#0f1e3c", margin: 0, lineHeight: 1.2 }}>
                  Account Details
                </h1>
              </div>

              <button
                onClick={downloadPDF}
                className="dl-btn"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "#1e3a7b", color: "#fff",
                  border: "none", borderRadius: 10, cursor: "pointer",
                  padding: "11px 20px", fontSize: 13, fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 4px 14px rgba(30,58,123,0.25)",
                  transition: "all 0.2s ease",
                }}
              >
                <ArrowDownToLineIcon size={15} />
                Download Statement
              </button>
            </div>
          </div>

          {!acc && (
            <div style={{ background: "#fff", borderRadius: 16, padding: "56px 32px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ width: 64, height: 64, background: "#f1f5f9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <CreditCard size={28} color="#94a3b8" />
              </div>
              <p style={{ color: "#64748b", fontSize: 15, marginBottom: 20 }}>No bank account linked to your profile.</p>
              <button
                onClick={() => navigate("/open-account")}
                style={{ background: "#1e3a7b", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
              >
                + Open New Account
              </button>
            </div>
          )}

          {acc && (
            <>
              {/* ── ACCOUNT CARD (Bank Card Style) ── */}
              <div style={{
                background: "linear-gradient(135deg, #0f1e3c 0%, #1e3a7b 50%, #2d52a8 100%)",
                borderRadius: 20, padding: "28px 32px", marginBottom: 24,
                boxShadow: "0 12px 40px rgba(15,30,60,0.28)",
                position: "relative", overflow: "hidden",
                animation: "fadeSlideUp 0.45s ease both",
              }}>
                {/* Decorative circles */}
                <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)", top: -60, right: -40 }} />
                <div style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.05)", bottom: -50, right: 80 }} />
                <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.04)", top: 20, right: 200 }} />

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
                    <div>
                      <p style={{ color: "rgba(180,200,240,0.7)", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Account Holder</p>
                      <p style={{ color: "#fff", fontSize: 20, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: 0 }}>{data.name || "—"}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        background: acc.status === "active" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                        color: acc.status === "active" ? "#4ade80" : "#f87171",
                        border: `1px solid ${acc.status === "active" ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`,
                        borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 600,
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: acc.status === "active" ? "#4ade80" : "#f87171" }} />
                        {acc.status ? acc.status.charAt(0).toUpperCase() + acc.status.slice(1) : "Active"}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                    <CardField label="Account Number" value={acc.account_number} onCopy={() => copyToClipboard(acc.account_number, "accno")} copied={copiedField === "accno"} />
                    <CardField label="IFSC Code" value={acc.ifsc} onCopy={() => copyToClipboard(acc.ifsc, "ifsc")} copied={copiedField === "ifsc"} />
                    <CardField label="Account Type" value={acc.account_type} />
                  </div>

                  <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ color: "rgba(180,200,240,0.6)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>Branch</p>
                      <p style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 500, margin: 0 }}>{acc.branch || "—"}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ color: "rgba(180,200,240,0.6)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>Bank</p>
                      <p style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 500, margin: 0, fontFamily: "'Playfair Display', serif" }}>PayZen Bank</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── SECTIONS GRID ── */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

                <InfoSection
                  title="Personal Information"
                  icon={<User size={15} />}
                  className="acct-card"
                  rows={[
                    { label: "Gender", value: data.gender },
                    { label: "Date of Birth", value: data.date_of_birth },
                    { label: "Father's Name", value: acc.father_name },
                  ]}
                />

                <InfoSection
                  title="Contact Information"
                  icon={<Phone size={15} />}
                  className="acct-card"
                  rows={[
                    { label: "Mobile Number", value: data.mobile, copy: true, field: "mobile", copiedField, onCopy: () => copyToClipboard(data.mobile, "mobile") },
                    { label: "Email Address", value: data.email, copy: true, field: "email", copiedField, onCopy: () => copyToClipboard(data.email, "email") },
                  ]}
                />

                <InfoSection
                  title="KYC Information"
                  icon={<Shield size={15} />}
                  className="acct-card"
                  badge={{ label: "KYC Verified", color: "green" }}
                  rows={[
                    {
                      label: "Aadhaar Number",
                      value: acc.aadhaar ? acc.aadhaar.replace(/(\d{4})(\d{4})(\d{4})/, "XXXX XXXX $3") : "—"
                    },
                    {
                      label: "PAN Number",
                      value: acc.pan ? "XXXXX" + acc.pan.slice(5) : "—"
                    },
                  ]}
                />

                <InfoSection
                  title="Nominee Information"
                  icon={<Users size={15} />}
                  className="acct-card"
                  rows={[
                    { label: "Nominee Name", value: acc.nominee_name },
                    { label: "Nominee Relation", value: acc.nominee_relation },
                  ]}
                />

              </div>

              {/* ── ADDRESS FULL WIDTH ── */}
              <div style={{ marginTop: 20, animation: "fadeSlideUp 0.5s ease both 0.35s", opacity: 0, animationFillMode: "forwards" }}>
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8edf5", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 30, height: 30, background: "#eff6ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#1e3a7b" }}>
                        <MapPin size={15} />
                      </div>
                      <span style={{ fontWeight: 600, color: "#0f1e3c", fontSize: 14, fontFamily: "'Playfair Display', serif" }}>Registered Address</span>
                    </div>
                  </div>
                  <div style={{ padding: "18px 20px" }}>
                    <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{data.address || "—"}</p>
                  </div>
                </div>
              </div>

              {/* ── DISCLAIMER ── */}
              <div style={{ marginTop: 24, padding: "14px 20px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, display: "flex", alignItems: "flex-start", gap: 10, animation: "fadeSlideUp 0.5s ease both 0.42s", opacity: 0, animationFillMode: "forwards" }}>
                <AlertCircle size={15} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ color: "#92400e", fontSize: 12, lineHeight: 1.6, margin: 0 }}>
                  Sensitive information such as Aadhaar and PAN numbers are partially masked for your security. For full details, visit your nearest PayZen Bank branch with valid ID proof.
                </p>
              </div>

            </>
          )}
        </div>
      </div>
    </>
  );
}

/* ── CARD FIELD (inside blue bank card) ── */
function CardField({ label, value, onCopy, copied }) {
  return (
    <div>
      <p style={{ color: "rgba(180,200,240,0.65)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>{label}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <p style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: 0, letterSpacing: "0.03em", fontFamily: "'DM Sans', monospace" }}>{value || "—"}</p>
        {onCopy && value && (
          <button
            onClick={onCopy}
            style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 5, padding: "3px 5px", cursor: "pointer", display: "flex", alignItems: "center", color: copied ? "#4ade80" : "rgba(255,255,255,0.6)", transition: "all 0.2s" }}
          >
            {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
          </button>
        )}
      </div>
    </div>
  );
}

/* ── INFO SECTION ── */
function InfoSection({ title, icon, rows, badge, className }) {
  return (
    <div
      className={className}
      style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8edf5", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
    >
      {/* Header */}
      <div style={{ padding: "15px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, background: "#eff6ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#1e3a7b" }}>
            {icon}
          </div>
          <span style={{ fontWeight: 600, color: "#0f1e3c", fontSize: 14, fontFamily: "'Playfair Display', serif" }}>{title}</span>
        </div>
        {badge && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            background: badge.color === "green" ? "#f0fdf4" : "#fef2f2",
            color: badge.color === "green" ? "#16a34a" : "#dc2626",
            border: `1px solid ${badge.color === "green" ? "#bbf7d0" : "#fecaca"}`,
            borderRadius: 20, padding: "3px 10px", fontSize: 10, fontWeight: 600,
          }}>
            <BadgeCheck size={11} /> {badge.label}
          </span>
        )}
      </div>

      {/* Rows */}
      <div>
        {rows.map((row, i) => (
          <div
            key={i}
            className="detail-row"
            style={{
              padding: "13px 20px",
              borderBottom: i < rows.length - 1 ? "1px solid #f8fafc" : "none",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              transition: "background 0.15s ease",
            }}
          >
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>{row.label}</p>
              <p style={{ fontSize: 14, color: "#1e293b", fontWeight: 600, margin: 0 }}>{row.value || "—"}</p>
            </div>
            {row.copy && row.value && (
              <button
                className="copy-btn"
                onClick={row.onCopy}
                style={{
                  background: "transparent", border: "1px solid #e2e8f0", borderRadius: 7,
                  padding: "5px 8px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 5,
                  color: row.copiedField === row.field ? "#16a34a" : "#64748b",
                  fontSize: 11, fontWeight: 500, transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {row.copiedField === row.field ? <><CheckCheck size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}