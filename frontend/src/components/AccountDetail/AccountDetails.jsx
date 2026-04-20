import {
  ArrowDownToLineIcon, CreditCard, User, Phone,
  MapPin, Shield, Users, Copy, CheckCheck,
  BadgeCheck, AlertCircle
} from "lucide-react";
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

  /* ── Loading ── */
  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <div className="w-10 h-10 rounded-full border-[3px] border-slate-200 border-t-blue-900 animate-spin" />
      <p className="text-slate-500 text-sm font-serif">Loading account details...</p>
    </div>
  );

  /* ── Error ── */
  if (error) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="flex items-center gap-2.5 text-red-600 font-serif">
        <AlertCircle size={20} /> {error}
      </div>
    </div>
  );

  const acc = data?.account || null;

  return (
    <>
      {/* ── Global font + keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .acct-font { font-family: 'DM Sans', sans-serif; }
        .serif     { font-family: 'Playfair Display', Georgia, serif; }
        .acct-card { animation: fadeSlideUp 0.5s ease both; }
        .acct-card:nth-child(2) { animation-delay: 0.07s; }
        .acct-card:nth-child(3) { animation-delay: 0.14s; }
        .acct-card:nth-child(4) { animation-delay: 0.21s; }
        .acct-card:nth-child(5) { animation-delay: 0.28s; }
        .copy-btn:hover  { background: #f1f5f9 !important; }
        .dl-btn:hover    { background: #162e66 !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,58,123,0.35) !important; }
        .detail-row:hover { background: #f8faff; }
        .fade-in-1 { animation: fadeSlideUp 0.45s ease both; }
        .fade-in-2 { animation: fadeSlideUp 0.5s ease 0.35s both; opacity: 0; animation-fill-mode: forwards; }
        .fade-in-3 { animation: fadeSlideUp 0.5s ease 0.42s both; opacity: 0; animation-fill-mode: forwards; }
      `}</style>

      <div className="min-h-screen bg-slate-100 px-4 sm:px-6 py-6 sm:py-8 pb-12 acct-font">
        <div className="max-w-4xl mx-auto">

          {/* ── PAGE HEADER ── */}
          <div className="fade-in-1 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-blue-900/40 mb-1">
                  OFFICIAL RECORD
                </p>
                <h1 className="serif text-2xl sm:text-3xl font-extrabold text-[#0f1e3c] leading-tight m-0 tracking-tight">
                  Account Details
                </h1>
              </div>

              <button
                onClick={downloadPDF}
                className="dl-btn w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0f1e3c] text-white border-0 rounded-2xl cursor-pointer px-6 py-3.5 text-[13px] font-bold shadow-[0_10px_20px_rgba(15,30,60,0.2)] transition-all duration-300 acct-font hover:scale-[1.02] active:scale-95"
              >
                <ArrowDownToLineIcon size={16} />
                <span>Download Statement</span>
              </button>
            </div>
          </div>

          {/* ── NO ACCOUNT ── */}
          {!acc && (
            <div className="bg-white rounded-2xl p-10 sm:p-14 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard size={28} className="text-slate-400" />
              </div>
              <p className="text-slate-500 text-[15px] mb-5">No bank account linked to your profile.</p>
              <button
                onClick={() => navigate("/open-account")}
                className="bg-blue-900 text-white border-0 rounded-xl px-7 py-3 font-semibold text-sm cursor-pointer acct-font"
              >
                + Open New Account
              </button>
            </div>
          )}

          {acc && (
            <>
              {/* ── BANK CARD ── */}
              <div className="fade-in-1 relative rounded-2xl overflow-hidden mb-5 sm:mb-6 shadow-[0_12px_40px_rgba(15,30,60,0.28)] bg-gradient-to-br from-[#0f1e3c] via-[#1e3a7b] to-[#2d52a8] px-5 sm:px-8 py-6 sm:py-7">
                {/* Decorative circles */}
                <div className="absolute w-[200px] h-[200px] rounded-full bg-white/[0.04] -top-[60px] -right-10 pointer-events-none" />
                <div className="absolute w-[140px] h-[140px] rounded-full bg-white/[0.05] -bottom-[50px] right-20 pointer-events-none" />
                <div className="absolute w-20 h-20 rounded-full bg-white/[0.04] top-5 right-[200px] pointer-events-none" />

                <div className="relative z-10">
                  {/* Top: Name + Status */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6 sm:mb-7">
                    <div>
                      <p className="text-[10px] text-blue-200/70 font-semibold tracking-[0.12em] uppercase mb-1">
                        Account Holder
                      </p>
                      <p className="serif text-lg sm:text-xl font-bold text-white m-0">
                        {data.name || "—"}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold self-start border
                      ${acc.status === "active"
                        ? "bg-green-500/15 text-green-300 border-green-400/30"
                        : "bg-red-500/15 text-red-300 border-red-400/30"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${acc.status === "active" ? "bg-green-400" : "bg-red-400"}`} />
                      {acc.status ? acc.status.charAt(0).toUpperCase() + acc.status.slice(1) : "Active"}
                    </span>
                  </div>

                  {/* Account Fields — 2-col on mobile, 3-col on sm+ */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4 sm:gap-5">
                    <CardField
                      label="Account Number" value={acc.account_number}
                      onCopy={() => copyToClipboard(acc.account_number, "accno")}
                      copied={copiedField === "accno"}
                      className="col-span-2 sm:col-span-1"
                    />
                    <CardField
                      label="IFSC Code" value={acc.ifsc}
                      onCopy={() => copyToClipboard(acc.ifsc, "ifsc")}
                      copied={copiedField === "ifsc"}
                    />
                    <CardField label="Type" value={acc.account_type} />
                  </div>

                  {/* Bottom: Branch + Bank */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div>
                      <p className="text-[10px] text-blue-200/60 font-semibold tracking-[0.1em] uppercase mb-1">Branch</p>
                      <p className="text-slate-200 text-[13px] font-medium m-0">{acc.branch || "—"}</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-[10px] text-blue-200/60 font-semibold tracking-[0.1em] uppercase mb-1">Bank</p>
                      <p className="serif text-slate-200 text-[13px] font-medium m-0">PayZen Bank</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── INFO SECTIONS GRID ── */}
              {/* 2-col on md+, 1-col on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
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
                    { label: "Aadhaar Number", value: acc.aadhaar ? acc.aadhaar.replace(/(\d{4})(\d{4})(\d{4})/, "XXXX XXXX $3") : "—" },
                    { label: "PAN Number",     value: acc.pan ? "XXXXX" + acc.pan.slice(5) : "—" },
                  ]}
                />
                <InfoSection
                  title="Nominee Information"
                  icon={<Users size={15} />}
                  className="acct-card"
                  rows={[
                    { label: "Nominee Name",     value: acc.nominee_name },
                    { label: "Nominee Relation", value: acc.nominee_relation },
                  ]}
                />
              </div>

              {/* ── ADDRESS ── */}
              <div className="fade-in-2 mt-4 sm:mt-5">
                <div className="bg-white rounded-2xl border border-[#e8edf5] overflow-hidden shadow-sm">
                  <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
                    <div className="w-[30px] h-[30px] bg-blue-50 rounded-lg flex items-center justify-center text-blue-900 shrink-0">
                      <MapPin size={15} />
                    </div>
                    <span className="serif font-semibold text-[#0f1e3c] text-sm">Registered Address</span>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-slate-700 text-sm leading-relaxed m-0">{data.address || "—"}</p>
                  </div>
                </div>
              </div>

              {/* ── DISCLAIMER ── */}
              <div className="fade-in-3 mt-5 px-4 sm:px-5 py-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
                <AlertCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-amber-900 text-[12px] leading-relaxed m-0">
                  Sensitive information such as Aadhaar and PAN numbers are partially masked for your security.
                  For full details, visit your nearest PayZen Bank branch with valid ID proof.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

/* ── CARD FIELD — inside blue bank card ── */
function CardField({ label, value, onCopy, copied, className = "" }) {
  return (
    <div className={className}>
      <p className="text-[10px] text-blue-200/60 font-black uppercase tracking-[0.15em] mb-2">
        {label}
      </p>
      <div className="flex items-center gap-2">
        <p className="text-white text-sm sm:text-base font-black m-0 tracking-wider font-mono">
          {value || "—"}
        </p>
        {onCopy && value && (
          <button
            onClick={onCopy}
            className={`bg-white/10 border-0 rounded-lg w-7 h-7 cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-white/20 active:scale-90
              ${copied ? "text-emerald-400 bg-emerald-400/20" : "text-white/60"}`}
          >
            {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}

/* ── INFO SECTION ── */
function InfoSection({ title, icon, rows, badge, className }) {
  return (
    <div className={`${className} bg-white rounded-2xl border border-[#e8edf5] overflow-hidden shadow-sm`}>
      {/* Header */}
      <div className="px-5 py-[15px] border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[30px] bg-blue-50 rounded-lg flex items-center justify-center text-blue-900 shrink-0">
            {icon}
          </div>
          <span className="serif font-semibold text-[#0f1e3c] text-sm">{title}</span>
        </div>
        {badge && (
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[10px] font-semibold border
            ${badge.color === "green"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-600 border-red-200"}`}>
            <BadgeCheck size={11} /> {badge.label}
          </span>
        )}
      </div>

      {/* Rows */}
      <div>
        {rows.map((row, i) => (
          <div
            key={i}
            className={`detail-row px-5 py-[13px] flex justify-between items-center transition-colors duration-150
              ${i < rows.length - 1 ? "border-b border-slate-50" : ""}`}
          >
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-slate-400 font-medium mb-[3px] uppercase tracking-[0.06em]">
                {row.label}
              </p>
              <p className="text-sm text-slate-800 font-semibold m-0 truncate">
                {row.value || "—"}
              </p>
            </div>
            {row.copy && row.value && (
              <button
                className={`copy-btn ml-3 shrink-0 border border-slate-200 rounded-lg px-2 py-1.5 cursor-pointer
                  flex items-center gap-1.5 text-[11px] font-medium transition-all duration-150 bg-transparent acct-font
                  ${row.copiedField === row.field ? "text-green-600" : "text-slate-500"}`}
                onClick={row.onCopy}
              >
                {row.copiedField === row.field
                  ? <><CheckCheck size={12} /> Copied</>
                  : <><Copy size={12} /> Copy</>
                }
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}