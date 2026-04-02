import { useState, useEffect } from "react";
import {
  User, Phone, Lock, Send, AlertTriangle, Landmark,
  ShieldCheck, Headphones, CheckCircle2, RefreshCw,
  Clock, LifeBuoy, Info, LogIn, DollarSign,
  PiggyBank, Settings, Zap
} from "lucide-react";

const ISSUE_TYPES = [
  { value: "login",       label: "Login Problem",    Icon: LogIn,      desc: "Password reset, 2FA, access" },
  { value: "transaction", label: "Transaction Issue", Icon: DollarSign, desc: "Failed payments, wrong amount" },
  { value: "deposit",     label: "Deposit Issue",     Icon: PiggyBank,  desc: "Funds not credited, delays" },
  { value: "account",     label: "Account Problem",   Icon: User,       desc: "Profile, KYC, account freeze" },
  { value: "technical",   label: "Technical Error",   Icon: Settings,   desc: "App crashes, bugs, errors" },
  { value: "fraud",       label: "Fraud / Dispute",   Icon: Zap,        desc: "Unauthorized transactions" },
];

const PRIORITY_MAP = {
  fraud:       { label: "Critical", color: "#ef4444", bg: "#fef2f2" },
  transaction: { label: "High",     color: "#f59e0b", bg: "#fffbeb" },
  deposit:     { label: "High",     color: "#f59e0b", bg: "#fffbeb" },
  login:       { label: "Medium",   color: "#3b82f6", bg: "#eff6ff" },
  account:     { label: "Medium",   color: "#3b82f6", bg: "#eff6ff" },
  technical:   { label: "Low",      color: "#10b981", bg: "#f0fdf4" },
};

function generateTicket() {
  return "TKT-" + Date.now().toString().slice(-6);
}

export default function HelpSupport() {
  const [step, setStep]           = useState(1);
  const [formData, setFormData]   = useState({ fullName: "", accountNumber: "", contactNumber: "", issueType: "", subject: "", description: "" });
  const [errors, setErrors]       = useState({});
  const [touched, setTouched]     = useState({});
  const [ticket, setTicket]       = useState("");
  const [charCount, setCharCount] = useState(0);
  const [animIn, setAnimIn]       = useState(false);

  useEffect(() => { setTimeout(() => setAnimIn(true), 50); }, []);

  const validate = (data) => {
    const e = {};
    if (!data.fullName.trim())                    e.fullName      = "Full name is required";
    else if (data.fullName.trim().length < 3)     e.fullName      = "Name must be at least 3 characters";
    if (!data.accountNumber.trim())               e.accountNumber = "Account number is required";
    else if (data.accountNumber.length < 9)       e.accountNumber = "Enter valid account number";
    if (!data.contactNumber.trim())               e.contactNumber = "Contact number is required";
    else if (data.contactNumber.length !== 10)    e.contactNumber = "Must be exactly 10 digits";
    if (!data.issueType)                          e.issueType     = "Please select an issue type";
    if (!data.description.trim())                 e.description   = "Description is required";
    else if (data.description.trim().length < 20) e.description   = "Provide at least 20 characters";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "accountNumber" || name === "contactNumber") && !/^\d*$/.test(value)) return;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (name === "description") setCharCount(value.length);
    if (touched[name]) setErrors((p) => ({ ...p, [name]: validate(updated)[name] }));
  };

  const handleBlur = (name) => {
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validate(formData)[name] }));
  };

  const handleIssueSelect = (val) => {
    const updated = { ...formData, issueType: val };
    setFormData(updated);
    setTouched((p) => ({ ...p, issueType: true }));
    setErrors((p) => ({ ...p, issueType: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const e2 = validate(formData);
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;
    setTicket(generateTicket());
    setStep(2);
  };

  const priority = PRIORITY_MAP[formData.issueType] || null;

  /* ── SUCCESS SCREEN ── */
  if (step === 2) {
    return (
      <div className="min-h-screen py-4 px-3 bg-white">
        <style>{animCSS}</style>
        <div className="w-full bg-white shadow-lg rounded-xl p-5 border border-gray-100 fadeIn text-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={34} className="text-[#0f1f4b]" />
          </div>
          <h2 className="text-lg font-semibold text-blue-900 mb-1">Request Submitted</h2>
          <p className="text-xs text-gray-500 mb-5 leading-relaxed">
            Our support team will contact you within <strong>24–48 hours</strong> on your registered number.
          </p>
          <div className="bg-blue-50 border border-dashed border-blue-200 rounded-lg p-4 mb-4">
            <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Ticket Number</span>
            <span className="text-xl font-bold text-blue-900 font-mono tracking-widest">{ticket}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-5 text-left">
            {[
              { label: "Name",     value: formData.fullName },
              { label: "Issue",    value: ISSUE_TYPES.find(i => i.value === formData.issueType)?.label || "—" },
              { label: "Contact",  value: formData.contactNumber },
              { label: "Priority", value: priority?.label || "—", color: priority?.color },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-gray-50 rounded-lg p-2.5">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-xs font-semibold" style={{ color: color || "#1e293b" }}>{value}</p>
              </div>
            ))}
          </div>
          <button
            className="bg-[#0f1f4b] text-white text-xs font-semibold py-2.5 px-6 rounded-lg flex items-center gap-2 mx-auto"
            onClick={() => {
              setStep(1);
              setFormData({ fullName: "", accountNumber: "", contactNumber: "", issueType: "", subject: "", description: "" });
              setTouched({});
              setErrors({});
              setCharCount(0);
            }}
          >
            <RefreshCw size={12} /> Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  /* ── MAIN FORM ── */
  return (
    <div className="min-h-screen py-4 px-3 bg-white">
      <style>{animCSS}</style>

      <div className={`w-full bg-white shadow-lg rounded-xl p-5 border border-gray-100 ${animIn ? "fadeIn" : ""}`}>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#0f1f4b] to-[#1e40af] flex-shrink-0">
              <Headphones size={18} color="white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-blue-900 leading-tight">Help & Support</h2>
              <p className="text-xs text-gray-500">Customer Assistance & Issue Resolution</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
            <span className="liveDot w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            <span className="text-xs font-semibold text-green-700">Live Support</span>
          </div>
        </div>

        {/* INFO STRIP */}
        <div className="flex flex-wrap gap-2 bg-slate-50 border border-gray-100 rounded-xl px-3 py-2.5 mb-4">
          {[
            { Icon: Clock,       text: "Avg response: 2 hrs" },
            { Icon: Phone,       text: "1800-XXX-XXXX" },
            { Icon: ShieldCheck, text: "100% Secure" },
          ].map(({ Icon, text }, i) => (
            <div key={i} className="flex items-center gap-1.5 flex-1 min-w-[90px]">
              <Icon size={13} className="text-slate-400 flex-shrink-0" />
              <span className="text-xs text-slate-500 font-medium">{text}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">

          {/* SECTION 1: CUSTOMER DETAILS */}
          <Section title="Customer Details" Icon={User} step="1">
            <Field
              label="Full Name" name="fullName" placeholder="Enter full name"
              value={formData.fullName} onChange={handleChange} onBlur={() => handleBlur("fullName")}
              error={touched.fullName && errors.fullName} required Icon={User}
            />
            <Field
              label="Account Number" name="accountNumber" placeholder="Enter account number"
              value={formData.accountNumber} onChange={handleChange} onBlur={() => handleBlur("accountNumber")}
              error={touched.accountNumber && errors.accountNumber} required Icon={Landmark} maxLength={18}
            />
            <Field
              label="Contact Number" name="contactNumber" placeholder="Enter contact number"
              value={formData.contactNumber} onChange={handleChange} onBlur={() => handleBlur("contactNumber")}
              error={touched.contactNumber && errors.contactNumber} required Icon={Phone} maxLength={10}
            />
          </Section>

          {/* SECTION 2: ISSUE TYPE */}
          <Section title="Issue Type" Icon={LifeBuoy} step="2">
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              {ISSUE_TYPES.map((issue) => (
                <IssueCard
                  key={issue.value}
                  issue={issue}
                  selected={formData.issueType === issue.value}
                  onSelect={() => handleIssueSelect(issue.value)}
                />
              ))}
            </div>
            {touched.issueType && errors.issueType && (
              <p className="col-span-2 text-xs text-red-500 font-medium flex items-center gap-1 mt-0.5">
                <AlertTriangle size={11} /> {errors.issueType}
              </p>
            )}
            {formData.issueType && priority && (
              <div
                className="col-span-2 flex items-center gap-2 px-3 py-2 rounded-lg border flex-wrap"
                style={{ background: priority.bg, borderColor: priority.color + "40" }}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: priority.color }} />
                <span className="text-xs font-semibold" style={{ color: priority.color }}>Priority: {priority.label}</span>
                <span className="text-xs text-gray-500">
                  {priority.label === "Critical" ? "— Team notified immediately"
                    : priority.label === "High" ? "— Response within 4 hours"
                    : "— Response within 24 hours"}
                </span>
              </div>
            )}
          </Section>

          {/* SECTION 3: ISSUE DETAILS */}
          <Section title="Issue Details" Icon={Info} step="3">
            <Field
              label="Issue Subject" name="subject" placeholder="Enter issue subject"
              value={formData.subject} onChange={handleChange}
            />
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-gray-700">
                  Issue Description <span className="text-red-500">*</span>
                </label>
                <span className={`text-xs ${charCount > 450 ? "text-red-400" : "text-gray-400"}`}>{charCount}/500</span>
              </div>
              <textarea
                name="description"
                placeholder="Describe your issue"
                value={formData.description}
                onChange={handleChange}
                onBlur={() => handleBlur("description")}
                maxLength={500}
                rows={4}
                className={`border rounded-lg p-2.5 w-full h-20 bg-white text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-colors
                  ${touched.description && errors.description ? "border-red-400" : "border-gray-200"}`}
              />
              {touched.description && errors.description && (
                <p className="text-xs text-red-500 font-medium mt-1 flex items-center gap-1">
                  <AlertTriangle size={11} /> {errors.description}
                </p>
              )}
            </div>
          </Section>

          {/* DISCLAIMER */}
          <div className="flex items-start gap-2.5 bg-slate-50 border border-gray-100 rounded-lg px-3 py-2.5">
            <Lock size={13} className="text-slate-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-500 leading-relaxed m-0">
              Your information is encrypted and secure. We will never share your data with third parties.
              By submitting, you agree to our{" "}
              <span className="text-blue-600 cursor-pointer underline">Privacy Policy</span>.
            </p>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-center pt-1">
            <button
              type="submit"
              className="w-full md:w-48
                bg-[linear-gradient(180deg,#1e3a7b_0%,#152d68_60%,#0f1f4d_100%)]
                hover:opacity-90 text-white font-semibold rounded-lg py-3
                flex items-center justify-center gap-2
                transition-all active:scale-[0.98] shadow-md text-sm"
            >
              <Send size={14} />
              Submit Request
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* ── SECTION COMPONENT ── */
function Section({ title, Icon, step, children }) {
  return (
    <div className="rounded-lg p-3 bg-gray-50">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-5 h-5 rounded-full bg-[#0f1f4b] flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold" style={{ fontSize: 10 }}>{step}</span>
        </div>
        <Icon size={14} className="text-blue-900" />
        <h3 className="text-sm font-semibold text-blue-900">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  );
}

/* ── INPUT FIELD COMPONENT ── */
function Field({ label, name, placeholder, value, onChange, onBlur, error, required, Icon, maxLength }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        )}
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={() => { setFocused(false); onBlur && onBlur(); }}
          onFocus={() => setFocused(true)}
          maxLength={maxLength}
          className={`border rounded-lg p-2 bg-white text-xs w-full outline-none transition-all
            ${Icon ? "pl-7" : "pl-2.5"}
            ${error
              ? "border-red-400 focus:ring-2 focus:ring-red-100"
              : "border-gray-200 focus:ring-2 focus:ring-blue-500"}`}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 font-medium flex items-center gap-1">
          <AlertTriangle size={10} /> {error}
        </p>
      )}
    </div>
  );
}

/* ── ISSUE CARD COMPONENT ── */
function IssueCard({ issue, selected, onSelect }) {
  const { Icon } = issue;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left w-full cursor-pointer transition-all relative
        ${selected
          ? "border-blue-500 bg-blue-50 shadow-sm shadow-blue-100"
          : "border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm"}`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
        ${selected ? "bg-blue-100" : "bg-gray-100"}`}>
        <Icon size={15} className={selected ? "text-blue-700" : "text-gray-500"} />
      </div>
      <div>
        <p className={`text-xs font-semibold m-0 ${selected ? "text-blue-700" : "text-slate-700"}`}>{issue.label}</p>
        <p className="text-xs text-gray-400 m-0 mt-0.5 leading-tight">{issue.desc}</p>
      </div>
      {selected && (
        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
          <CheckCircle2 size={10} color="white" />
        </div>
      )}
    </button>
  );
}

/* ── ANIMATION CSS ── */
const animCSS = `
  .fadeIn { animation: fadeSlideIn 0.35s ease both; }
  @keyframes fadeSlideIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .liveDot { animation: pulse 1.8s infinite; }
`;