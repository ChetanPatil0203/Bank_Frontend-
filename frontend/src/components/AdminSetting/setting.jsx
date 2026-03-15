// AdminSettings.jsx

import { useState } from "react";
import {
  User, Lock, Bell, Shield, Globe, Palette,
  Save, Eye, EyeOff, CheckCircle, AlertTriangle,
  Mail, Phone, MapPin, Camera, LogOut,
} from "lucide-react";

const C = {
  navy: "#0f1f4b", bg: "#f0f4ff", card: "#ffffff",
  text: "#1e293b", muted: "#64748b", border: "#e2e8f0",
  accent: "#3b82f6", green: "#10b981", red: "#ef4444",
  gold: "#f59e0b",
};

const TABS = [
  { id: "profile",       label: "Profile",        icon: User       },
  { id: "security",      label: "Security",        icon: Lock       },
  { id: "notifications", label: "Notifications",   icon: Bell       },
  { id: "preferences",   label: "Preferences",     icon: Palette    },
  { id: "system",        label: "System",          icon: Shield     },
];

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-5">
      <h3 className="text-sm font-extrabold text-[#0f1f4b] uppercase tracking-widest pb-2 border-b-2 border-slate-100">
        {title}
      </h3>
      {subtitle && <p className="text-xs text-slate-400 mt-1.5">{subtitle}</p>}
    </div>
  );
}

function InputField({ label, placeholder, type = "text", value, onChange, icon: Icon, disabled, hint }) {
  return (
    <div className="mb-4">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none transition-all
            ${disabled ? "bg-slate-50 cursor-not-allowed text-slate-400" : "bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"}`}
        />
      </div>
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div className="flex-1 pr-4">
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0 ${checked ? "bg-[#0f1f4b]" : "bg-slate-200"}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${checked ? "left-5" : "left-0.5"}`} />
      </button>
    </div>
  );
}

function SaveButton({ onClick, saved }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
        saved
          ? "bg-green-500 text-white"
          : "bg-[#0f1f4b] text-white hover:opacity-90"
      }`}
    >
      {saved ? <><CheckCircle size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
    </button>
  );
}

// ── PROFILE TAB ──
function ProfileTab() {
  const [form, setForm] = useState({
    name:     "Admin User",
    email:    "admin@payzen.com",
    phone:    "9800000001",
    address:  "PayZen HQ, Nashik - 422001",
    role:     "Super Admin",
    adminId:  "ADM-001",
  });
  const [saved, setSaved] = useState(false);

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div>
      {/* Avatar Section */}
      <div className="flex items-center gap-5 mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0f1f4b] to-blue-500 flex items-center justify-center text-white text-2xl font-extrabold flex-shrink-0">
            AD
          </div>
          <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#0f1f4b] rounded-full flex items-center justify-center border-2 border-white hover:opacity-90">
            <Camera size={12} color="white" />
          </button>
        </div>
        <div>
          <p className="text-base font-extrabold text-slate-800">{form.name}</p>
          <p className="text-sm text-slate-500">{form.email}</p>
          <span className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {form.role}
          </span>
        </div>
      </div>

      <SectionTitle title="Personal Information" subtitle="Update your personal details here." />

      <div className="grid grid-cols-2 gap-x-4">
        <InputField label="Full Name"  value={form.name}    onChange={f("name")}    icon={User}   placeholder="Admin name" />
        <InputField label="Admin ID"   value={form.adminId} onChange={f("adminId")} icon={Shield} disabled hint="Admin ID cannot be changed" />
        <InputField label="Email"      value={form.email}   onChange={f("email")}   icon={Mail}   type="email" placeholder="admin@payzen.com" />
        <InputField label="Phone"      value={form.phone}   onChange={f("phone")}   icon={Phone}  placeholder="10-digit number" />
      </div>
      <InputField label="Address" value={form.address} onChange={f("address")} icon={MapPin} placeholder="Office address" />
      <InputField label="Role"    value={form.role}    onChange={f("role")}    icon={User}   disabled hint="Role is assigned by the system" />

      <div className="flex justify-end mt-2">
        <SaveButton onClick={handleSave} saved={saved} />
      </div>
    </div>
  );
}

// ── SECURITY TAB ──
function SecurityTab() {
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [show, setShow]           = useState({ current: false, newPass: false, confirm: false });
  const [error, setError]         = useState("");
  const [saved, setSaved]         = useState(false);
  const [twoFa, setTwoFa]         = useState(true);
  const [sessionAlert, setSessionAlert] = useState(true);

  const p = (key) => (e) => setPasswords({ ...passwords, [key]: e.target.value });

  function handleSave() {
    if (!passwords.current) { setError("Please enter your current password."); return; }
    if (passwords.newPass.length < 8) { setError("New password must be at least 8 characters."); return; }
    if (passwords.newPass !== passwords.confirm) { setError("New passwords do not match."); return; }
    setError("");
    setSaved(true);
    setPasswords({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setSaved(false), 2500);
  }

  const PasswordField = ({ label, field }) => (
    <div className="mb-4">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1.5">{label}</label>
      <div className="relative">
        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type={show[field] ? "text" : "password"}
          value={passwords[field]}
          onChange={p(field)}
          placeholder="••••••••"
          className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        <button
          onClick={() => setShow({ ...show, [field]: !show[field] })}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {show[field] ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <SectionTitle title="Change Password" subtitle="Use a strong password that you don't use elsewhere." />

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-sm text-red-700 font-semibold">
          <AlertTriangle size={15} /> {error}
        </div>
      )}

      <PasswordField label="Current Password" field="current" />
      <PasswordField label="New Password"     field="newPass" />
      <PasswordField label="Confirm New Password" field="confirm" />

      {/* Password Strength */}
      {passwords.newPass && (
        <div className="mb-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Password Strength</p>
          <div className="flex gap-1">
            {[1,2,3,4].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${
                passwords.newPass.length >= i * 3
                  ? i <= 1 ? "bg-red-400" : i <= 2 ? "bg-yellow-400" : i <= 3 ? "bg-blue-400" : "bg-green-500"
                  : "bg-slate-200"
              }`} />
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {passwords.newPass.length < 4 ? "Weak" : passwords.newPass.length < 7 ? "Fair" : passwords.newPass.length < 10 ? "Good" : "Strong"}
          </p>
        </div>
      )}

      <div className="flex justify-end mb-8">
        <SaveButton onClick={handleSave} saved={saved} />
      </div>

      <SectionTitle title="Security Settings" subtitle="Manage your account security preferences." />
      <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2 mb-6">
        <Toggle label="Two-Factor Authentication" description="Require OTP at every login for extra security." checked={twoFa} onChange={setTwoFa} />
        <Toggle label="Login Session Alerts" description="Receive email alerts on new logins." checked={sessionAlert} onChange={setSessionAlert} />
      </div>

      {/* Active Sessions */}
      <SectionTitle title="Active Sessions" subtitle="Manage devices currently logged in." />
      <div className="space-y-3">
        {[
          { device: "Chrome — Windows 11", location: "Nashik, MH", time: "Active now", current: true },
          { device: "Mobile — Android",    location: "Pune, MH",   time: "2 hours ago", current: false },
        ].map((s, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.current ? "bg-green-500" : "bg-slate-300"}`} />
              <div>
                <p className="text-sm font-bold text-slate-700">{s.device}</p>
                <p className="text-xs text-slate-400">{s.location} · {s.time}</p>
              </div>
            </div>
            {s.current
              ? <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Current</span>
              : <button className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1"><LogOut size={12} /> Revoke</button>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

// ── NOTIFICATIONS TAB ──
function NotificationsTab() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    emailTxn:       true,
    emailKyc:       true,
    emailLogin:     true,
    emailReports:   false,
    pushTxn:        true,
    pushKyc:        true,
    pushSystem:     false,
    smsAlerts:      true,
    weeklyReport:   true,
    monthlyReport:  false,
  });

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const Section = ({ title, keys }) => (
    <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2 mb-5">
      <p className="text-xs font-extrabold text-[#0f1f4b] uppercase tracking-widest py-3 border-b border-slate-100">{title}</p>
      {keys.map(([key, label, desc]) => (
        <Toggle key={key} label={label} description={desc} checked={settings[key]} onChange={() => toggle(key)} />
      ))}
    </div>
  );

  return (
    <div>
      <SectionTitle title="Notification Preferences" subtitle="Choose how and when you want to be notified." />

      <Section title="Email Notifications" keys={[
        ["emailTxn",     "Transaction Alerts",      "Email on every deposit or withdrawal"],
        ["emailKyc",     "KYC Status Updates",       "Email when KYC is approved or rejected"],
        ["emailLogin",   "Login Alerts",             "Email on every new admin login"],
        ["emailReports", "Weekly Reports",           "Receive weekly summary reports via email"],
      ]} />

      <Section title="Push Notifications" keys={[
        ["pushTxn",    "Transaction Alerts",   "Real-time alerts for transactions"],
        ["pushKyc",    "KYC Updates",          "Instant notifications for KYC activity"],
        ["pushSystem", "System Alerts",        "Alerts for system errors or downtime"],
      ]} />

      <Section title="SMS & Reports" keys={[
        ["smsAlerts",     "SMS Alerts",         "Critical alerts via SMS"],
        ["weeklyReport",  "Weekly Report",      "Auto-send weekly summary report"],
        ["monthlyReport", "Monthly Report",     "Auto-send monthly analytics report"],
      ]} />

      <div className="flex justify-end">
        <SaveButton onClick={handleSave} saved={saved} />
      </div>
    </div>
  );
}

// ── PREFERENCES TAB ──
function PreferencesTab() {
  const [saved, setSaved]       = useState(false);
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Asia/Kolkata (IST)");
  const [currency, setCurrency] = useState("INR — Indian Rupee");
  const [dateFormat, setDateFormat] = useState("DD MMM YYYY");
  const [theme, setTheme]       = useState("light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [denseTable, setDenseTable] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const SelectField = ({ label, value, onChange, options }) => (
    <div className="mb-4">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1.5">{label}</label>
      <select
        value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div>
      <SectionTitle title="Regional Settings" subtitle="Configure language, timezone and display formats." />
      <div className="grid grid-cols-2 gap-x-4">
        <SelectField label="Language" value={language} onChange={setLanguage} options={["English", "Hindi", "Marathi"]} />
        <SelectField label="Currency" value={currency} onChange={setCurrency} options={["INR — Indian Rupee", "USD — US Dollar", "EUR — Euro"]} />
        <SelectField label="Timezone" value={timezone} onChange={setTimezone} options={["Asia/Kolkata (IST)", "UTC", "Asia/Dubai"]} />
        <SelectField label="Date Format" value={dateFormat} onChange={setDateFormat} options={["DD MMM YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]} />
      </div>

      <SectionTitle title="Appearance" subtitle="Customize the look and feel of the admin panel." />

      {/* Theme Selector */}
      <div className="mb-5">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-2">Theme</label>
        <div className="flex gap-3">
          {[
            { id: "light", label: "Light", emoji: "☀️" },
            { id: "dark",  label: "Dark",  emoji: "🌙" },
            { id: "auto",  label: "Auto",  emoji: "⚙️" },
          ].map(t => (
            <button
              key={t.id} onClick={() => setTheme(t.id)}
              className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border-2 transition-all text-sm font-bold ${
                theme === t.id
                  ? "border-[#0f1f4b] bg-[#0f1f4b] text-white"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
              }`}
            >
              <span className="text-xl">{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2 mb-6">
        <Toggle label="Collapse Sidebar by Default"  description="Start with the sidebar collapsed on every login." checked={sidebarCollapsed} onChange={setSidebarCollapsed} />
        <Toggle label="Dense Table View"             description="Show more rows per page in all tables." checked={denseTable} onChange={setDenseTable} />
      </div>

      <div className="flex justify-end">
        <SaveButton onClick={handleSave} saved={saved} />
      </div>
    </div>
  );
}

// ── SYSTEM TAB ──
function SystemTab() {
  const [saved, setSaved]             = useState(false);
  const [maintenanceMode, setMaintenance] = useState(false);
  const [debugMode, setDebugMode]     = useState(false);
  const [autoBackup, setAutoBackup]   = useState(true);
  const [apiLogs, setApiLogs]         = useState(true);
  const [backupFreq, setBackupFreq]   = useState("Daily");
  const [sessionTimeout, setSessionTimeout] = useState("30 Minutes");
  const [showConfirm, setShowConfirm] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div>
      <SectionTitle title="System Configuration" subtitle="Manage core system settings." />

      {/* Maintenance Mode Warning */}
      {maintenanceMode && (
        <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-300 rounded-xl px-4 py-3 mb-4 text-sm text-yellow-800 font-semibold">
          <AlertTriangle size={16} className="text-yellow-500 flex-shrink-0" />
          <span>Maintenance mode is <strong>ON</strong> — users cannot access the portal.</span>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2 mb-5">
        <Toggle label="Maintenance Mode"   description="Temporarily disable user access to the portal." checked={maintenanceMode} onChange={setMaintenance} />
        <Toggle label="Debug Mode"         description="Enable detailed error logs for development." checked={debugMode}      onChange={setDebugMode}      />
        <Toggle label="Auto Backup"        description="Automatically backup database on schedule." checked={autoBackup}     onChange={setAutoBackup}     />
        <Toggle label="API Request Logs"   description="Log all API requests for monitoring." checked={apiLogs}        onChange={setApiLogs}        />
      </div>

      <SectionTitle title="Backup & Session" subtitle="Configure backup schedule and session settings." />
      <div className="grid grid-cols-2 gap-x-4 mb-5">
        <div className="mb-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1.5">Backup Frequency</label>
          <select value={backupFreq} onChange={e => setBackupFreq(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
            {["Hourly", "Daily", "Weekly", "Monthly"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1.5">Session Timeout</label>
          <select value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
            {["15 Minutes", "30 Minutes", "1 Hour", "2 Hours", "Never"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* System Info */}
      <SectionTitle title="System Information" />
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-6">
        {[
          ["Application Version", "PayZen Admin v2.1.0"],
          ["Database",            "PostgreSQL 15.2"],
          ["Server",              "Node.js 20 LTS"],
          ["Last Backup",         "15 Mar 2026, 02:00 AM"],
          ["Uptime",              "99.98% (Last 30 days)"],
          ["Environment",         "Production"],
        ].map(([k, v], i) => (
          <div key={k} className={`flex justify-between items-center px-5 py-3 ${i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{k}</span>
            <span className="text-sm font-bold text-slate-700 font-mono">{v}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        {/* Danger Zone */}
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 border border-red-200 text-sm font-bold rounded-xl hover:bg-red-100 transition-colors"
        >
          <AlertTriangle size={14} /> Clear All Logs
        </button>
        <SaveButton onClick={handleSave} saved={saved} />
      </div>

      {/* Confirm Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-[#0f1f4b]/50 z-[1000] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-slate-200 p-6">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={22} className="text-red-500" />
            </div>
            <h3 className="text-base font-extrabold text-slate-800 text-center mb-2">Clear All Logs?</h3>
            <p className="text-sm text-slate-500 text-center mb-6">
              This will permanently delete all system logs. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-500 text-sm font-bold rounded-xl hover:bg-slate-50">
                Cancel
              </button>
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600">
                Yes, Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ──
export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  const VIEWS = {
    profile:       <ProfileTab />,
    security:      <SecurityTab />,
    notifications: <NotificationsTab />,
    preferences:   <PreferencesTab />,
    system:        <SystemTab />,
  };

  return (
    <div className="font-sans">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-slate-800">Settings</h2>
        <p className="text-sm text-slate-500 mt-1">Manage your admin account and system preferences</p>
      </div>

      <div className="flex gap-6 items-start">

        {/* Sidebar Tabs */}
        <div className="w-52 flex-shrink-0 bg-white border border-slate-200 rounded-2xl p-2 sticky top-4">
          {TABS.map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all mb-1 last:mb-0 ${
                  isActive
                    ? "bg-[#0f1f4b] text-white"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 min-w-0">
          {VIEWS[activeTab]}
        </div>
      </div>
    </div>
  );
}