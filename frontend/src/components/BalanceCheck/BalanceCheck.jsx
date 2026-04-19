import { useState } from "react";

export default function BalanceCheck() {

  const [formData, setFormData] = useState({
    accountNumber: "",
    accountHolder: "",
    accountType: "",
  });

  const [balance, setBalance] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBalance("₹ 45,250.00");
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
            Check Balance
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base font-medium">
            Securely access your real-time account status
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="space-y-5">
            <Input
              label="Account Number"
              name="accountNumber"
              placeholder="0000 0000 0000 0000"
              handleChange={handleChange}
            />

            <Input
              label="Account Holder"
              name="accountHolder"
              placeholder="Your full name"
              handleChange={handleChange}
            />

            <div>
              <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">
                Account Type
              </label>

              <select
                name="accountType"
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-700 text-sm font-bold
                focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 outline-none transition-all appearance-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1em" }}
                required
              >
                <option value="">Select Account Type</option>
                <option>Saving Account</option>
                <option>Current Account</option>
              </select>
            </div>
          </div>

          <button 
            className="w-full py-4 bg-blue-900 hover:bg-blue-950 text-white rounded-2xl 
            font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all mt-4"
          >
            Check Balance
          </button>

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

/* ---------- Section ---------- */

function Section({ title, children }) {
  return (
    <div className="p-6 mb-6">
      <h3 className="text-xl font-semibold text-blue-900 mb-5">
        {title}
      </h3>

      <div className="grid md:grid-cols-2 gap-5">
        {children}
      </div>
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
