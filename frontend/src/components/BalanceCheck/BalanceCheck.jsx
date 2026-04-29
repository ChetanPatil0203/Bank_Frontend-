import { useState, useContext } from "react";
import { getBalance } from "../../utils/apiServices";
import { LanguageContext } from "../../context/LanguageContext";
import { jsPDF } from "jspdf";
import { 
  Download, Wallet, CreditCard, User, Landmark, 
  ChevronDown, CheckCircle2, ShieldCheck, ArrowRight,
  Info, Loader
} from "lucide-react";

export default function BalanceCheck() {
  const { t } = useContext(LanguageContext);

  const [formData, setFormData] = useState({
    accountNumber: "",
    accountHolder: "",
    accountType: "",
  });

  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBalance(null);

    try {
      const response = await getBalance();
      if (response.ok && response.data.success) {
        setBalance(response.data.balance);
      } else {
        setError(response.data.message || "Failed to fetch balance.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.setTextColor(15, 31, 75);
    doc.text("PAYZEN BANK", 105, 20, null, null, "center");
    
    doc.setFontSize(14);
    doc.setTextColor(100);
    doc.text("Account Statement (Summary)", 105, 30, null, null, "center");
    
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 45);
    doc.text(`Account Holder: ${formData.accountHolder || "N/A"}`, 20, 55);
    doc.text(`Account Number: ${formData.accountNumber.replace(/.(?=.{4})/g, '*') || "N/A"}`, 20, 65);
    doc.text(`Account Type: ${formData.accountType || "N/A"}`, 20, 75);
    
    doc.setLineWidth(0.2);
    doc.line(20, 85, 190, 85);
    
    doc.setFontSize(16);
    doc.setTextColor(16, 185, 129);
    doc.text(`Available Balance: ₹ ${balance?.toLocaleString()}`, 20, 95);
    
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("This is a computer generated statement and does not require a physical signature.", 105, 120, null, null, "center");
    
    doc.save(`Payzen_Statement_${formData.accountNumber.slice(-4) || 'Stmt'}.pdf`);
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-white font-[Inter,sans-serif]">
      
      <div 
        className="w-full mx-auto bg-white shadow-lg rounded-xl border border-gray-100"
        style={{ maxWidth: 768, padding: "clamp(14px, 4vw, 20px)", boxSizing: "border-box" }}
      >

        {/* HEADER SECTION - Same as OpenAccount */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
             <Wallet size={28} className="text-blue-600" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-blue-900 leading-tight">
            {t("balance_check")}
          </h2>
          <p className="text-gray-500 mt-1 text-xs font-medium">
            {t("secure_portal")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <Section title="Account Identification">
            <Field label={t("account_number")}>
              <IconInput icon={<CreditCard size={14}/>}>
                <input type="text" name="accountNumber" value={formData.accountNumber}
                  onChange={handleChange} required placeholder="Enter your account number"/>
              </IconInput>
            </Field>

            <Field label={t("account_holder")}>
              <IconInput icon={<User size={14}/>}>
                <input type="text" name="accountHolder" value={formData.accountHolder}
                  onChange={handleChange} required placeholder="Enter full name"/>
              </IconInput>
            </Field>

            <Field label={t("account_type")}>
              <IconInput icon={<Landmark size={14}/>}>
                <select name="accountType" value={formData.accountType} onChange={handleChange} required>
                  <option value="">{t("select_account_type")}</option>
                  <option>{t("saving_account")}</option>
                  <option>{t("current_account")}</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
              </IconInput>
            </Field>
          </Section>

          <button 
            type="submit"
            disabled={loading}
            style={{
              height: 48,
              borderRadius: 12,
              border: "none",
              background: loading
                ? "#94a3b8"
                : "linear-gradient(180deg, #1e3a7b 0%, #152d68 60%, #0f1f4d 100%)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: loading ? "none" : "0 4px 16px rgba(15,31,75,0.35)",
              transition: "all 0.2s",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader size={16} className="animate-spin" />
                <span>{t("checking_btn")}</span>
              </div>
            ) : (
              <>
                <span>{t("check_balance_btn")}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

          {error && (
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg text-xs font-medium bg-red-50 border border-red-200 text-red-700">
               <Info size={15} className="mt-0.5 flex-shrink-0" />
               <span>{error}</span>
            </div>
          )}

        </form>

        {/* BALANCE DISPLAY SECTION */}
        {balance !== null && (
          <div 
            className="mt-6 p-6 sm:p-8 bg-[#0f1f4d] border border-white/10 rounded-2xl text-center
            relative overflow-hidden shadow-xl
            transform transition-all duration-700 
            translate-y-6 opacity-0 animate-[slideUp_0.7s_forwards]"
          >
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl -mr-12 -mt-12" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl -ml-12 -mb-12" />
            
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-3 relative z-10">Total Available Balance</p>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight relative z-10 flex items-center justify-center gap-1.5">
              <span className="text-blue-400 text-xl font-medium mt-1">₹</span>
              {balance.toLocaleString()}
            </h3>
            
            <div className="mt-5 flex items-center justify-center gap-2.5 py-1.5 px-4 bg-white/5 rounded-full w-fit mx-auto border border-white/5 relative z-10">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Verified Live</span>
            </div>
            
            <button 
              onClick={downloadPDF}
              className="mt-6 w-full flex items-center justify-center gap-2.5 py-3.5 bg-white hover:bg-gray-50 text-[#0f1f4d] rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-lg relative z-10"
            >
              <Download size={18} />
              {t("download_statement")}
            </button>
          </div>
        )}

      </div>

      <style>
        {`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        `}
      </style>

    </div>
  );
}

/* ── Reusable layout components (Matching OpenAccount) ── */

function Section({ title, children }) {
  return (
    <div className="rounded-2xl p-4 sm:p-5 bg-slate-50/50 border border-slate-100">
      <h3 className="text-[11px] sm:text-xs font-black text-blue-900/50 uppercase tracking-[0.2em] mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">{children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
    </div>
  );
}

function IconInput({ icon, children }) {
  return (
    <div className="relative flex items-center group">
      <span className="absolute left-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none text-base z-10">{icon}</span>
      <div className="w-full
        [&>input]:rounded-2xl [&>input]:pl-10 [&>input]:pr-4 [&>input]:py-3.5
        [&>input]:bg-white [&>input]:border-2 [&>input]:border-slate-100 [&>input]:w-full
        [&>input]:focus:ring-4 [&>input]:focus:ring-blue-500/10 [&>input]:focus:border-blue-500
        [&>input]:outline-none [&>input]:text-sm [&>input]:font-medium [&>input]:transition-all
        [&>select]:rounded-2xl [&>select]:pl-10 [&>select]:pr-4 [&>select]:py-3.5
        [&>select]:bg-white [&>select]:border-2 [&>select]:border-slate-100 [&>select]:w-full
        [&>select]:focus:ring-4 [&>select]:focus:ring-blue-500/10 [&>select]:focus:border-blue-500
        [&>select]:outline-none [&>select]:text-sm [&>select]:font-medium [&>select]:appearance-none [&>select]:transition-all">
        {children}
      </div>
    </div>
  );
}
