import { useState, useContext } from "react";
import { getBalance } from "../../utils/apiServices";
import { LanguageContext } from "../../context/LanguageContext";
import { jsPDF } from "jspdf";
import { Download } from "lucide-react";

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
        setBalance(`₹ ${response.data.balance.toLocaleString()}`);
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
    doc.text(`Available Balance: ${balance}`, 20, 95);
    
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("This is a computer generated statement and does not require a physical signature.", 105, 120, null, null, "center");
    
    doc.save(`Payzen_Statement_${formData.accountNumber.slice(-4) || 'Stmt'}.pdf`);
  };

  return (
    <div className="min-h-screen py-6 sm:py-12 px-4 bg-slate-50 relative overflow-hidden" 
         style={{ fontFamily: "'Sora', sans-serif" }}>
      
      {/* Ambient background accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -ml-32 -mb-32 pointer-events-none" />

      <div 
        className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-2xl shadow-blue-900/5 relative z-10 border border-slate-100
        transform transition-all duration-700 
        translate-y-10 opacity-0 animate-[slideUp_0.7s_forwards]"
      >

        {/* HEADER */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m.599-1c.51-.51.901-1.141.901-1.854 0-1.105-1.343-2-3-2s-3 .895-3 2c0 .713.404 1.344.901 1.854M12 7a1 1 0 110-2h.01M12 17a1 1 0 110 2h.01" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t("balance_check")}
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base font-medium">
            Securely access your real-time account status
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="space-y-5">
            <Input
              label={t("account_number")}
              name="accountNumber"
              placeholder="0000 0000 0000 0000"
              handleChange={handleChange}
            />

            <Input
              label={t("account_holder")}
              name="accountHolder"
              placeholder="Your full name"
              handleChange={handleChange}
            />

            <div>
              <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">
                {t("account_type")}
              </label>

              <select
                name="accountType"
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-700 text-sm font-bold
                focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 outline-none transition-all appearance-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1em" }}
                required
              >
                <option value="">{t("select_account_type")}</option>
                <option>{t("saving_account")}</option>
                <option>{t("current_account")}</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-900 hover:bg-blue-950 disabled:bg-blue-700 text-white rounded-2xl 
            font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all mt-4"
          >
            {loading ? t("checking_btn") : t("check_balance_btn")}
          </button>

          {error && (
            <p className="text-red-600 text-sm font-medium mt-2 text-center">{error}</p>
          )}

        </form>

        {/* BALANCE DISPLAY */}
        {balance && (
          <div 
            className="mt-8 p-6 sm:p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-3xl text-center
            transform transition-all duration-700 
            translate-y-10 opacity-0 animate-[slideUp_0.7s_forwards] shadow-inner"
          >
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2">Available Balance</p>
            <h3 className="text-4xl sm:text-5xl font-black text-emerald-900 tracking-tighter">
              {balance}
            </h3>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Live from database</span>
            </div>
            
            <button 
              onClick={downloadPDF}
              className="mt-6 mx-auto flex items-center justify-center gap-2 py-3 px-6 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-bold text-sm shadow-sm transition-all hover:shadow-md active:scale-95"
            >
              <Download size={18} />
              {t("download_statement")}
            </button>
          </div>
        )}

      </div>

      {/* Animation */}
      <style>
        {`
        @keyframes slideUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        `}
      </style>

    </div>
  );
}



/* ---------- Input ---------- */

function Input({ label, type="text", name, placeholder, handleChange }) {
  return (
    <div>
      <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-700 text-sm font-bold placeholder:text-slate-400
        focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 outline-none transition-all"
        required
      />
    </div>
  );
}
