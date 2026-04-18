import { useState, useEffect } from "react";
import {
  User, Phone, Lock, Send, AlertTriangle, Landmark,
  ShieldCheck, Headphones, CheckCircle2, RefreshCw,
  Clock, LifeBuoy, Info, LogIn, DollarSign,
  PiggyBank, Settings, Zap, History, ChevronRight,
  ArrowLeft, MessageSquare
} from "lucide-react";

import { createSupportTicket, getMyTickets, getTicketDetails, addTicketMessage } from "../../utils/apiServices";

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

const STATUS_COLORS = {
  open: "text-amber-700 bg-amber-100",
  "in-progress": "text-blue-700 bg-blue-100",
  resolved: "text-emerald-700 bg-emerald-100",
  closed: "text-gray-600 bg-gray-100",
};

export default function HelpSupport() {
  const [activeTab, setActiveTab] = useState("new"); // 'new' or 'history'
  const [step, setStep]           = useState(1);
  const [formData, setFormData]   = useState({ fullName: "", accountNumber: "", contactNumber: "", issueType: "", subject: "", description: "" });
  const [errors, setErrors]       = useState({});
  const [touched, setTouched]     = useState({});
  const [ticket, setTicket]       = useState("");
  const [charCount, setCharCount] = useState(0);
  const [animIn, setAnimIn]       = useState(false);
  const [loading, setLoading]     = useState(false);

  // History states
  const [history, setHistory]     = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [replyMsg, setReplyMsg]   = useState("");

  useEffect(() => { setTimeout(() => setAnimIn(true), 50); }, []);

  useEffect(() => {
    if (activeTab === "history") {
       fetchHistory();
    }
  }, [activeTab]);

  const fetchHistory = async () => {
    setHistoryLoading(true);
    const res = await getMyTickets();
    if (res.ok) setHistory(res.data.tickets);
    setHistoryLoading(false);
  };

  const fetchTicketDetails = async (id) => {
    setLoading(true);
    const res = await getTicketDetails(id);
    if (res.ok) setSelectedTicket(res.data.data);
    setLoading(false);
  };

  const handleSendFollowUp = async () => {
    if (!replyMsg.trim()) return;
    const res = await addTicketMessage(selectedTicket.id, replyMsg);
    if (res.ok) {
        setReplyMsg("");
        fetchTicketDetails(selectedTicket.id);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const e2 = validate(formData);
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;

    setLoading(true);
    const priority = PRIORITY_MAP[formData.issueType]?.label.toLowerCase() || 'medium';
    
    const res = await createSupportTicket({
        ...formData,
        priority
    });

    setLoading(false);
    if (res.ok) {
        setTicket(res.data.ticket.ticket_number);
        setStep(2);
    } else {
        alert(res.data.message || "Something went wrong. Please try again.");
    }
  };

  const priority = PRIORITY_MAP[formData.issueType] || null;

  /* ── TICKET LIST VIEW ── */
  const renderHistory = () => (
    <div className="space-y-4 fadeIn">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2">
            <History size={16} /> Your Request History
        </h3>
        <button onClick={fetchHistory} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500">
            <RefreshCw size={14} className={historyLoading ? "animate-spin" : ""} />
        </button>
      </div>

      {historyLoading ? (
        <div className="py-12 text-center text-slate-400 text-xs animate-pulse">Loading tickets...</div>
      ) : history.length === 0 ? (
        <div className="py-16 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Info size={24} className="text-slate-400" />
            </div>
            <p className="text-xs font-semibold text-slate-500">No support requests found.</p>
            <button onClick={() => setActiveTab("new")} className="mt-3 text-xs text-blue-600 font-bold hover:underline">Submit Your First Request</button>
        </div>
      ) : (
        <div className="grid gap-3">
            {history.map(t => (
                <div 
                    key={t.id} 
                    onClick={() => fetchTicketDetails(t.id)}
                    className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group"
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{t.ticket_number}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${STATUS_COLORS[t.status]}`}>
                            {t.status}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs font-bold text-slate-800 mb-0.5">{t.subject || t.issue_type}</p>
                            <p className="text-[11px] text-slate-500">{new Date(t.created_at).toLocaleDateString()}</p>
                        </div>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );

  /* ── TICKET DETAIL VIEW ── */
  const renderDetail = () => (
    <div className="fadeIn space-y-4">
        <div className="flex items-center gap-3 mb-4 sticky top-0 bg-white py-2 z-10 border-b">
            <button onClick={() => setSelectedTicket(null)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500">
                <ArrowLeft size={16} />
            </button>
            <div>
                <h3 className="text-sm font-bold text-blue-900">{selectedTicket.ticket_number}</h3>
                <p className="text-[11px] text-slate-500">{selectedTicket.subject}</p>
            </div>
            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${STATUS_COLORS[selectedTicket.status]}`}>
                {selectedTicket.status}
            </span>
        </div>

        <div className="space-y-4">
            {/* ORIGINAL DESCRIPTION */}
            <div className="flex flex-col items-start max-w-[90%]">
                <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-xs text-slate-800 shadow-sm border border-slate-200">
                    <p className="font-bold text-blue-900 mb-1">Your Inquiry</p>
                    {selectedTicket.description}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 ml-1">{new Date(selectedTicket.created_at).toLocaleString()}</span>
            </div>

            {/* CONVERSATION */}
            {selectedTicket.messages?.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.sender_role === 'admin' ? 'items-end' : 'items-start'} max-w-[90%] ${m.sender_role === 'admin' ? 'ml-auto' : ''}`}>
                    <div className={`p-3 rounded-2xl shadow-sm text-xs ${
                        m.sender_role === 'admin' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                    }`}>
                        <p className="font-bold mb-1 opacity-80">{m.sender_role === 'admin' ? 'Support Team' : 'You'}</p>
                        {m.message}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 mx-1">{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            ))}
        </div>

        {/* REPLY BOX */}
        {selectedTicket.status !== 'closed' && (
            <div className="mt-8 relative">
                <textarea 
                    placeholder="Type a follow-up message..."
                    value={replyMsg}
                    onChange={e => setReplyMsg(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pr-12 text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all h-20"
                />
                <button 
                    onClick={handleSendFollowUp}
                    disabled={!replyMsg.trim() || loading}
                    className="absolute right-3 bottom-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-md"
                >
                    <Send size={14} />
                </button>
            </div>
        )}
    </div>
  );

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
          <div className="flex flex-col gap-2">
            <button
                className="bg-[#0f1f4b] text-white text-xs font-semibold py-2.5 px-6 rounded-lg flex items-center justify-center gap-2"
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
            <button
                className="text-blue-600 text-xs font-bold py-2 underline"
                onClick={() => {
                    setStep(1);
                    setFormData({ fullName: "", accountNumber: "", contactNumber: "", issueType: "", subject: "", description: "" });
                    setActiveTab("history");
                }}
            >
                View Request History
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── MAIN LAYOUT ── */
  return (
    <div className="min-h-[85vh] py-4 px-2 sm:px-6 bg-white relative">
      <style>{animCSS}</style>

      {/* TAB SWITCHER */}
      <div className="flex justify-center mb-6">
        <div className="bg-slate-100 p-1 rounded-xl flex gap-1 shadow-inner border border-slate-200">
            <button 
                onClick={() => { setActiveTab("new"); setSelectedTicket(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'new' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
                <Headphones size={14} /> New Request
            </button>
            <button 
                onClick={() => { setActiveTab("history"); setSelectedTicket(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'history' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
                <History size={14} /> My History
            </button>
        </div>
      </div>

      <div className={`w-full max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-5 sm:p-7 border border-gray-100 ${animIn ? "fadeIn" : ""}`}>
        
        {activeTab === "history" ? (
            selectedTicket ? renderDetail() : renderHistory()
        ) : (
            <>
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#0f1f4b] to-[#1e40af] flex-shrink-0 shadow-lg shadow-blue-100">
                            <Headphones size={22} color="white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-blue-950 leading-tight">Help & Support</h2>
                            <p className="text-xs text-gray-500">Customer Assistance & Issue Resolution</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                        <span className="liveDot w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                        <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Live Support</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
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
                            className="col-span-2 flex items-center gap-2 px-3 py-2 rounded-xl border flex-wrap"
                            style={{ background: priority.bg, borderColor: priority.color + "40" }}
                        >
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: priority.color }} />
                            <span className="text-xs font-semibold" style={{ color: priority.color }}>Priority: {priority.label}</span>
                            <span className="text-[11px] text-gray-500">
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
                            <span className={`text-[10px] font-bold ${charCount > 450 ? "text-red-400" : "text-gray-400"}`}>{charCount}/500</span>
                        </div>
                        <textarea
                            name="description"
                            placeholder="Describe your issue in detail..."
                            value={formData.description}
                            onChange={handleChange}
                            onBlur={() => handleBlur("description")}
                            maxLength={500}
                            rows={4}
                            className={`border rounded-xl p-3 w-full h-24 bg-white text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all
                            ${touched.description && errors.description ? "border-red-400 bg-red-50/10" : "border-gray-200"}`}
                        />
                        {touched.description && errors.description && (
                            <p className="text-xs text-red-500 font-medium mt-1 flex items-center gap-1">
                                <AlertTriangle size={11} /> {errors.description}
                            </p>
                        )}
                        </div>
                    </Section>

                    {/* DISCLAIMER */}
                    <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                        <Lock size={15} className="text-slate-400 mt-0.5 flex-shrink-0" />
                        <p className="text-[11px] text-gray-500 leading-relaxed m-0">
                        Your information is encrypted and secure. We will never share your data with third parties.
                        By submitting, you agree to our <span className="text-blue-600 font-bold cursor-pointer underline">Privacy Policy</span> and <span className="text-blue-600 font-bold cursor-pointer underline">Terms</span>.
                        </p>
                    </div>

                    {/* SUBMIT */}
                    <div className="flex justify-center pt-2">
                        <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-64
                            bg-[linear-gradient(180deg,#1e3a7b_0%,#152d68_60%,#0f1f4d_100%)]
                            hover:opacity-95 text-white font-bold rounded-xl py-3.5
                            flex items-center justify-center gap-3
                            transition-all active:scale-[0.98] shadow-[0_4px_12px_rgba(15,31,75,0.2)] text-sm
                            disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                        {loading ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
                        {loading ? "Submitting..." : "Submit Request"}
                        </button>
                    </div>
                </form>
            </>
        )}
      </div>
      
      {/* FLOATING CHAT BUTTON (Visual only for now) */}
      <div className="fixed bottom-6 right-6 group">
          <div className="absolute -top-12 -left-24 bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Need instant help?
          </div>
          <button onClick={() => setActiveTab("new")} className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xl hover:bg-blue-700 hover:scale-110 transition-all">
              <MessageSquare size={24} />
          </button>
      </div>
    </div>
  );
}

/* ── SECTION COMPONENT ── */
function Section({ title, Icon, step, children }) {
  return (
    <div className="rounded-2xl p-4 sm:p-5 bg-slate-50 border border-slate-100">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-6 h-6 rounded-full bg-[#0f1f4b] flex items-center justify-center flex-shrink-0 shadow-md">
          <span className="text-white font-black" style={{ fontSize: 11 }}>{step}</span>
        </div>
        <Icon size={16} className="text-blue-900" />
        <h3 className="text-sm font-extrabold text-blue-900 uppercase tracking-tight">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

/* ── INPUT FIELD COMPONENT ── */
function Field({ label, name, placeholder, value, onChange, onBlur, error, required, Icon, maxLength }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-bold text-slate-700 px-0.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
        )}
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={() => onBlur && onBlur()}
          maxLength={maxLength}
          className={`border rounded-xl p-3 bg-white text-xs w-full outline-none transition-all shadow-sm
            ${Icon ? "pl-10" : "pl-3.5"}
            ${error
              ? "border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/10"
              : "border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400"}`}
        />
      </div>
      {error && (
        <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 px-1">
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
      className={`flex items-center gap-3.5 p-3 rounded-2xl border text-left w-full cursor-pointer transition-all relative
        ${selected
          ? "border-blue-500 bg-blue-50/50 shadow-md shadow-blue-100"
          : "border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm"}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors
        ${selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-bold m-0 transition-colors ${selected ? "text-blue-900" : "text-slate-800"}`}>{issue.label}</p>
        <p className="text-[10px] text-gray-400 m-0 mt-0.5 leading-tight truncate">{issue.desc}</p>
      </div>
      {selected && (
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shadow-lg border-2 border-white">
          <CheckCircle2 size={12} color="white" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

/* ── ANIMATION CSS ── */
const animCSS = `
  .fadeIn { animation: fadeSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
  @keyframes fadeSlideIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .liveDot { animation: pulse 1.8s infinite; }
`;