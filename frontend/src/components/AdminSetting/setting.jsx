// AdminSettings.jsx

import { useState } from "react";
import {
  User, Lock, Bell, Shield, Globe, Palette,
  Save, Eye, EyeOff, CheckCircle, AlertTriangle,
  Mail, Phone, MapPin, Camera, LogOut, FileText
} from "lucide-react";

const C = {
  navy: "#0f1f4b", bg: "#f0f4ff", card: "#ffffff",
  text: "#1e293b", muted: "#64748b", border: "#e2e8f0",
  accent: "#3b82f6", green: "#10b981", red: "#ef4444",
  gold: "#f59e0b",
};

const TABS = [
  { id: "profile", label: "Profile", icon: User, activeBg: "bg-blue-600", hoverBg: "hover:bg-blue-50" },
  { id: "security", label: "Security", icon: Lock, activeBg: "bg-red-500", hoverBg: "hover:bg-red-50" },
  { id: "notifications", label: "Notifications", icon: Bell, activeBg: "bg-violet-600", hoverBg: "hover:bg-violet-50" },
  { id: "preferences", label: "Preferences", icon: Palette, activeBg: "bg-amber-500", hoverBg: "hover:bg-amber-50" },
  { id: "system", label: "System", icon: Shield, activeBg: "bg-[#0f1f4b]", hoverBg: "hover:bg-slate-50" },
];

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
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${saved
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
    name: "Admin User",
    email: "admin@payzen.com",
    phone: "9800000001",
    address: "PayZen HQ, Nashik - 422001",
    role: "Super Admin",
    adminId: "ADM-001",
  });
  const [saved, setSaved] = useState(false);

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const profileFields = [
    { label: "Full Name", value: form.name, key: "name", icon: User, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Admin ID", value: form.adminId, key: "adminId", icon: Shield, color: "text-slate-600", bg: "bg-slate-50", disabled: true, hint: "Admin ID cannot be changed" },
    { label: "Email Address", value: form.email, key: "email", icon: Mail, color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Phone Number", value: form.phone, key: "phone", icon: Phone, color: "text-green-600", bg: "bg-green-50" },
    { label: "Role", value: form.role, key: "role", icon: User, color: "text-orange-500", bg: "bg-orange-50", disabled: true, hint: "Role is system assigned" },
    { label: "Address", value: form.address, key: "address", icon: MapPin, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-black text-slate-900">Profile Information</h2>
          <p className="text-xs text-slate-400 mt-0.5">Your personal and administrative details</p>
        </div>
      </div>

      {/* Field Rows */}
      <div className="divide-y divide-slate-100">
        {profileFields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="w-full flex items-center gap-3 px-5 py-3 text-left group">
              <div className={`w-8 h-8 rounded-lg ${field.bg} ${field.color} flex items-center justify-center shrink-0`}>
                <Icon size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{field.label}</p>
                {field.disabled ? (
                  <p className="text-xs font-semibold text-slate-800 truncate mt-0.5">{field.value}</p>
                ) : (
                  <input
                    value={field.value}
                    onChange={f(field.key)}
                    className="w-full text-xs font-semibold text-slate-800 bg-transparent border-0 outline-none mt-0.5 p-0 focus:text-slate-900 placeholder-slate-400"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50">
        <p className="text-xs text-slate-400 flex items-center gap-1">
          <Shield size={11} className="text-slate-400" />
          Settings are secured and encrypted.
        </p>
        <div className="flex gap-2.5">
          <SaveButton onClick={handleSave} saved={saved} />
        </div>
      </div>
    </div>
  );
}

// ── SECURITY TAB ──
function SecurityTab() {
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [twoFa, setTwoFa] = useState(true);
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

  return (
    <div className="flex flex-col gap-4">
      {/* Password Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-red-50 to-white">
          <div>
            <h2 className="text-sm font-black text-slate-900">Security Settings</h2>
            <p className="text-xs text-slate-400 mt-0.5">Manage your account protection</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-red-100 text-red-500 flex items-center justify-center">
            <Shield size={16} />
          </div>
        </div>

        <div className="p-5">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-xs text-red-700 font-semibold">
              <AlertTriangle size={14} /> {error}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">

            {[
              { k: "current", l: "Current Password" },
              { k: "newPass", l: "New Password" },
              { k: "confirm", l: "Confirm Password" },
            ].map(({ k, l }) => (
              <div key={k}>
                <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">{l}</label>
                <div className="relative">
                  <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={show[k] ? "text" : "password"}
                    value={passwords[k]}
                    onChange={p(k)}
                    placeholder="••••••••"
                    className="w-full border border-slate-200 focus:border-red-400 rounded-lg px-8 py-2 text-xs bg-slate-50 focus:outline-none transition-all"
                  />
                  <button onClick={() => setShow({ ...show, [k]: !show[k] })} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {show[k] ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                <Lock size={15} />
              </div>
              <p className="text-xs font-bold text-slate-700">Keep your password secure</p>
            </div>
            <SaveButton onClick={handleSave} saved={saved} />
          </div>

          <div className="divide-y divide-slate-100">
            <Toggle label="Two-Factor Authentication" description="Require OTP at every login for extra security." checked={twoFa} onChange={setTwoFa} />
            <Toggle label="Login Session Alerts" description="Receive email alerts on new logins." checked={sessionAlert} onChange={setSessionAlert} />
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Active Sessions</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { device: "Chrome — Windows 11", location: "Nashik, MH", time: "Active now", current: true },
            { device: "Mobile — Android", location: "Pune, MH", time: "2 hours ago", current: false },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${s.current ? "bg-green-500" : "bg-slate-300"}`} />
                <div>
                  <p className="text-xs font-bold text-slate-700">{s.device}</p>
                  <p className="text-[10px] text-slate-400">{s.location} · {s.time}</p>
                </div>
              </div>
              {s.current
                ? <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase">Current</span>
                : <button className="text-[10px] font-black text-red-500 hover:text-red-700 flex items-center gap-1 uppercase tracking-wider"><LogOut size={11} /> Revoke</button>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── NOTIFICATIONS TAB ──
function NotificationsTab() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    emailTxn: true,
    emailKyc: true,
    emailLogin: true,
    emailReports: false,
    pushTxn: true,
    pushKyc: true,
    pushSystem: false,
    smsAlerts: true,
    weeklyReport: true,
    monthlyReport: false,
  });

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const notifItems = [
    ["emailTxn", "Transaction Alerts", "Email on every deposit or withdrawal", Mail, "bg-blue-100", "text-blue-600"],
    ["emailKyc", "KYC Status Updates", "Email when KYC is approved or rejected", User, "bg-green-100", "text-green-600"],
    ["emailLogin", "Login Alerts", "Email on every new admin login", Lock, "bg-red-100", "text-red-600"],
    ["pushTxn", "Push Alerts", "Real-time Alerts for Transaction", Bell, "bg-violet-100", "text-violet-600"],
    ["weeklyReport", "Weekly Report", "Auto-send weekly summary report", FileText, "bg-amber-100", "text-amber-600"],
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-violet-50 to-white">
        <div>
          <h2 className="text-sm font-black text-slate-900">Notification Preferences</h2>
          <p className="text-xs text-slate-400 mt-0.5">Control what alerts you receive</p>
        </div>
        <div className="w-9 h-9 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
          <Bell size={16} />
        </div>
      </div>

      {/* Row List */}
      <div className="divide-y divide-slate-100">
        {notifItems.map(([key, label, desc, Icon, bg, tx]) => (
          <div key={key} className="px-5 py-3 flex items-center justify-between hover:bg-violet-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${bg} ${tx} flex items-center justify-center shrink-0`}>
                <Icon size={15} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">{label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{desc}</p>
              </div>
            </div>
            <button
              onClick={() => toggle(key)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${settings[key] ? "bg-violet-600" : "bg-slate-200"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${settings[key] ? "left-5.5" : "left-0.5"}`} />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-100 flex justify-end bg-slate-50">
        <SaveButton onClick={handleSave} saved={saved} />
      </div>
    </div>
  );
}

// ── PREFERENCES TAB ──
function PreferencesTab() {
  const [saved, setSaved] = useState(false);
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Asia/Kolkata (IST)");
  const [currency, setCurrency] = useState("INR — Indian Rupee");
  const [dateFormat, setDateFormat] = useState("DD MMM YYYY");
  const [theme, setTheme] = useState("light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [denseTable, setDenseTable] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Regional Settings Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-amber-50 to-white">
          <div>
            <h2 className="text-sm font-black text-slate-900">Regional Settings</h2>
            <p className="text-xs text-slate-400 mt-0.5">Language, Timezone & Display formats</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
            <Globe size={16} />
          </div>
        </div>
        <div className="p-5 grid grid-cols-2 gap-4">


          {[
            { label: "Language", value: language, onChange: setLanguage, options: ["English", "Hindi", "Marathi"] },
            { label: "Currency", value: currency, onChange: setCurrency, options: ["INR — Indian Rupee", "USD — US Dollar", "EUR — Euro"] },
            { label: "Timezone", value: timezone, onChange: setTimezone, options: ["Asia/Kolkata (IST)", "UTC", "Asia/Dubai"] },
            { label: "Date Format", value: dateFormat, onChange: setDateFormat, options: ["DD MMM YYYY", "MM/DD/YYYY", "YYYY-MM-DD"] },
          ].map((s, i) => (
            <div key={i}>
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">{s.label}</label>
              <select value={s.value} onChange={e => s.onChange(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none bg-slate-50 focus:border-amber-400">
                {s.options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Appearance & Layout</h3>
        </div>
        <div className="p-5">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-3">System Theme</label>
          <div className="flex gap-3 mb-5">
            {[
              { id: "light", label: "Light", emoji: "☀️" },
              { id: "dark", label: "Dark", emoji: "🌙" },
            ].map(t => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${theme === t.id ? "border-amber-500 bg-amber-50 text-amber-700 font-bold" : "border-slate-100 text-slate-400 font-semibold"
                  }`}>
                <span className="text-base">{t.emoji}</span>
                <span className="text-xs uppercase tracking-wider">{t.label}</span>
              </button>
            ))}
          </div>
          <div className="divide-y divide-slate-100 border-t border-slate-100 mt-2">
            <Toggle label="Collapse Sidebar" description="Start with the sidebar minimized" checked={sidebarCollapsed} onChange={setSidebarCollapsed} />
            <Toggle label="Dense Table View" description="Show more rows per page in all tables" checked={denseTable} onChange={setDenseTable} />
          </div>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 flex justify-end bg-slate-50">
          <SaveButton onClick={handleSave} saved={saved} />
        </div>
      </div>
    </div>
  );
}

// ── SYSTEM TAB ──
function SystemTab() {
  const [saved, setSaved] = useState(false);
  const [maintenanceMode, setMaintenance] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [apiLogs, setApiLogs] = useState(true);
  const [backupFreq, setBackupFreq] = useState("Daily");
  const [sessionTimeout, setSessionTimeout] = useState("30 Minutes");

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* System Status Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div>
            <h2 className="text-sm font-black text-slate-900">System Configuration</h2>
            <p className="text-xs text-slate-400 mt-0.5">Core system settings and maintenance</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center">
            <Shield size={16} />
          </div>
        </div>
        <div className="p-5">
          {maintenanceMode && (
            <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-2.5 mb-4 text-xs text-yellow-800 font-semibold">
              <AlertTriangle size={14} className="text-yellow-500" />
              <span>Maintenance Mode is <strong>Active</strong>. User access is restricted.</span>
            </div>
          )}
          <div className="divide-y divide-slate-100">
            <Toggle label="Maintenance Mode" description="Temporarily disable user access" checked={maintenanceMode} onChange={setMaintenance} />
            <Toggle label="Auto Database Backup" description="Daily automated system backups" checked={autoBackup} onChange={setAutoBackup} />
            <Toggle label="API Monitor Logs" description="Record all system API requests" checked={apiLogs} onChange={setApiLogs} />
          </div>
        </div>
      </div>

      {/* System Info Grid */}
      <div className="grid grid-cols-2 gap-4">


        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Backup Frequency</label>
          <select value={backupFreq} onChange={e => setBackupFreq(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold bg-slate-50 focus:outline-none">
            {["Hourly", "Daily", "Weekly"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Session Timeout</label>
          <select value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold bg-slate-50 focus:outline-none">
            {["15 Mins", "30 Mins", "1 Hour"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {[
            ["App Version", "v2.1.0"],
            ["Database", "PostgreSQL 15"],
            ["Uptime", "99.9%"],
          ].map(([k, v], i) => (
            <div key={i} className="flex justify-between items-center px-5 py-2.5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{k}</span>
              <span className="text-xs font-bold text-slate-700 font-mono">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <SaveButton onClick={handleSave} saved={saved} />
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ──
export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  const VIEWS = {
    profile: <ProfileTab />,
    security: <SecurityTab />,
    notifications: <NotificationsTab />,
    preferences: <PreferencesTab />,
    system: <SystemTab />,
  };

  return (
    <div className="min-h-screen py-3 px-3 bg-white font-sans">
      <div className="w-full">
        {/* Page Title */}
        <div className="mb-4">
          <h1 className="text-lg font-black text-slate-800">Settings</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage your admin account and system preferences</p>
        </div>

        {/* Tab Bar (Horizontal) */}
        <div className="flex flex-nowrap overflow-x-auto lg:flex-wrap gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-sm mb-4 w-full md:w-fit no-scrollbar">

          {TABS.map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${isActive
                  ? `${t.activeBg} text-white shadow-md scale-105`
                  : `text-slate-500 ${t.hoverBg} hover:text-slate-800`
                  }`}
              >
                <Icon
                  size={13}
                  className={isActive ? "text-white" : ""}
                />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="w-full">
          {VIEWS[activeTab]}
        </div>
      </div>
    </div>
  );
}