// AdminSettings.jsx

import { useState } from "react";
import {
  User, Lock, Bell, Shield, Globe, Palette,
  Save, Eye, EyeOff, CheckCircle, AlertTriangle,
  Mail, Phone, MapPin, LogOut, FileText
} from "lucide-react";

const TABS = [
  { id: "profile",       label: "Profile",       icon: User,    activeBg: "bg-blue-600",   hoverBg: "hover:bg-blue-50"   },
  { id: "security",      label: "Security",      icon: Lock,    activeBg: "bg-red-500",    hoverBg: "hover:bg-red-50"    },
  { id: "notifications", label: "Notifications", icon: Bell,    activeBg: "bg-violet-600", hoverBg: "hover:bg-violet-50" },
  { id: "preferences",   label: "Preferences",   icon: Palette, activeBg: "bg-amber-500",  hoverBg: "hover:bg-amber-50"  },
  { id: "system",        label: "System",        icon: Shield,  activeBg: "bg-slate-800",  hoverBg: "hover:bg-slate-50"  },
];

/* ── Toggle ── */
function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div className="flex-1 pr-4">
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-all duration-200 shrink-0 ${checked ? "bg-slate-800" : "bg-slate-200"}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${checked ? "left-5" : "left-0.5"}`} />
      </button>
    </div>
  );
}

/* ── Save Button ── */
function SaveButton({ onClick, saved }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
        saved ? "bg-green-500 text-white" : "bg-slate-800 text-white hover:opacity-90"
      }`}
    >
      {saved ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
    </button>
  );
}

/* ── Card wrapper ── */
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

/* ── Card Header ── */
function CardHead({ title, sub, gradientFrom = "from-slate-50", iconBg = "bg-slate-100", iconTx = "text-slate-600", Icon }) {
  return (
    <div className={`flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100 bg-gradient-to-r ${gradientFrom} to-white`}>
      <div>
        <h2 className="text-sm font-black text-slate-900">{title}</h2>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
      {Icon && (
        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${iconBg} ${iconTx} flex items-center justify-center shrink-0`}>
          <Icon size={16} />
        </div>
      )}
    </div>
  );
}

/* ── Card Footer ── */
function CardFoot({ left, right }) {
  return (
    <div className="px-4 sm:px-5 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
      {left && <div className="text-xs text-slate-400 flex items-center gap-1">{left}</div>}
      <div className="ml-auto">{right}</div>
    </div>
  );
}

// ── PROFILE TAB ──
function ProfileTab() {
  const [form, setForm] = useState({
    name:    "Admin User",
    email:   "admin@payzen.com",
    phone:   "9800000001",
    address: "PayZen HQ, Nashik - 422001",
    role:    "Super Admin",
    adminId: "ADM-001",
  });
  const [saved, setSaved] = useState(false);

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2500); }

  const profileFields = [
    { label: "Full Name",     key: "name",    Icon: User,   color: "text-blue-600",   bg: "bg-blue-50"   },
    { label: "Admin ID",      key: "adminId", Icon: Shield, color: "text-slate-600",  bg: "bg-slate-50",  disabled: true },
    { label: "Email Address", key: "email",   Icon: Mail,   color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Phone Number",  key: "phone",   Icon: Phone,  color: "text-green-600",  bg: "bg-green-50"  },
    { label: "Role",          key: "role",    Icon: User,   color: "text-orange-500", bg: "bg-orange-50", disabled: true },
    { label: "Address",       key: "address", Icon: MapPin, color: "text-rose-600",   bg: "bg-rose-50"   },
  ];

  return (
    <Card>
      <CardHead title="Profile Information" sub="Your personal and administrative details" />
      <div className="divide-y divide-slate-100">
        {profileFields.map(({ label, key, Icon, color, bg, disabled }) => (
          <div key={key} className="flex items-center gap-3 px-4 sm:px-5 py-3">
            <div className={`w-8 h-8 rounded-lg ${bg} ${color} flex items-center justify-center shrink-0`}>
              <Icon size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{label}</p>
              {disabled ? (
                <p className="text-xs font-semibold text-slate-500 mt-0.5">{form[key]}</p>
              ) : (
                <input
                  value={form[key]}
                  onChange={f(key)}
                  className="w-full text-xs font-semibold text-slate-800 bg-transparent border-0 outline-none mt-0.5 p-0 placeholder-slate-400"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <CardFoot
        left={<><Shield size={11} className="text-slate-400" /> Settings are secured and encrypted.</>}
        right={<SaveButton onClick={handleSave} saved={saved} />}
      />
    </Card>
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
    setError(""); setSaved(true);
    setPasswords({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHead title="Security Settings" sub="Manage your account protection"
          gradientFrom="from-red-50" iconBg="bg-red-100" iconTx="text-red-500" Icon={Shield} />
        <div className="p-4 sm:p-5">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 mb-4 text-xs text-red-700 font-semibold">
              <AlertTriangle size={13} /> {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {[
              { k: "current", l: "Current Password" },
              { k: "newPass", l: "New Password"     },
              { k: "confirm", l: "Confirm Password" },
            ].map(({ k, l }) => (
              <div key={k}>
                <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">{l}</label>
                <div className="relative">
                  <Lock size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={show[k] ? "text" : "password"}
                    value={passwords[k]}
                    onChange={p(k)}
                    placeholder="••••••••"
                    className="w-full border border-slate-200 focus:border-red-400 rounded-lg pl-8 pr-8 py-2 text-xs bg-slate-50 focus:outline-none transition-all"
                  />
                  <button onClick={() => setShow({ ...show, [k]: !show[k] })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {show[k] ? <EyeOff size={12} /> : <Eye size={12} />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                <Lock size={14} />
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
      </Card>

      {/* Active Sessions */}
      <Card>
        <div className="px-4 sm:px-5 py-3 border-b border-slate-100">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Active Sessions</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { device: "Chrome — Windows 11", location: "Nashik, MH", time: "Active now", current: true  },
            { device: "Mobile — Android",    location: "Pune, MH",   time: "2 hours ago", current: false },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between px-4 sm:px-5 py-3 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full shrink-0 ${s.current ? "bg-green-500" : "bg-slate-300"}`} />
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
      </Card>
    </div>
  );
}

// ── NOTIFICATIONS TAB ──
function NotificationsTab() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    emailTxn: true, emailKyc: true, emailLogin: true,
    pushTxn: true, weeklyReport: true,
  });

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2500); }

  const notifItems = [
    ["emailTxn",     "Transaction Alerts",  "Email on every deposit or withdrawal",    Mail,     "bg-blue-100",   "text-blue-600"   ],
    ["emailKyc",     "KYC Status Updates",  "Email when KYC is approved or rejected",  User,     "bg-green-100",  "text-green-600"  ],
    ["emailLogin",   "Login Alerts",        "Email on every new admin login",           Lock,     "bg-red-100",    "text-red-600"    ],
    ["pushTxn",      "Push Alerts",         "Real-time alerts for transactions",        Bell,     "bg-violet-100", "text-violet-600" ],
    ["weeklyReport", "Weekly Report",       "Auto-send weekly summary report",          FileText, "bg-amber-100",  "text-amber-600"  ],
  ];

  return (
    <Card>
      <CardHead title="Notification Preferences" sub="Control what alerts you receive"
        gradientFrom="from-violet-50" iconBg="bg-violet-100" iconTx="text-violet-600" Icon={Bell} />
      <div className="divide-y divide-slate-100">
        {notifItems.map(([key, label, desc, Icon, bg, tx]) => (
          <div key={key} className="px-4 sm:px-5 py-3 flex items-center justify-between gap-3 hover:bg-violet-50 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-8 h-8 rounded-lg ${bg} ${tx} flex items-center justify-center shrink-0`}>
                <Icon size={15} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800">{label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{desc}</p>
              </div>
            </div>
            <button
              onClick={() => toggle(key)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0 ${settings[key] ? "bg-violet-600" : "bg-slate-200"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${settings[key] ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
        ))}
      </div>
      <CardFoot right={<SaveButton onClick={handleSave} saved={saved} />} />
    </Card>
  );
}

// ── PREFERENCES TAB ──
function PreferencesTab() {
  const [saved, setSaved]                   = useState(false);
  const [language, setLanguage]             = useState("English");
  const [timezone, setTimezone]             = useState("Asia/Kolkata (IST)");
  const [currency, setCurrency]             = useState("INR — Indian Rupee");
  const [dateFormat, setDateFormat]         = useState("DD MMM YYYY");
  const [theme, setTheme]                   = useState("light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [denseTable, setDenseTable]         = useState(false);

  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2500); }

  const selects = [
    { label: "Language",    value: language,    onChange: setLanguage,    options: ["English", "Hindi", "Marathi"]                                  },
    { label: "Currency",    value: currency,    onChange: setCurrency,    options: ["INR — Indian Rupee", "USD — US Dollar", "EUR — Euro"]          },
    { label: "Timezone",    value: timezone,    onChange: setTimezone,    options: ["Asia/Kolkata (IST)", "UTC", "Asia/Dubai"]                      },
    { label: "Date Format", value: dateFormat,  onChange: setDateFormat,  options: ["DD MMM YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]                      },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Regional */}
      <Card>
        <CardHead title="Regional Settings" sub="Language, Timezone & Display formats"
          gradientFrom="from-amber-50" iconBg="bg-amber-100" iconTx="text-amber-600" Icon={Globe} />
        <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {selects.map((s, i) => (
            <div key={i}>
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">{s.label}</label>
              <select value={s.value} onChange={e => s.onChange(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none bg-slate-50 focus:border-amber-400">
                {s.options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      </Card>

      {/* Appearance */}
      <Card>
        <div className="px-4 sm:px-5 py-3 border-b border-slate-100">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Appearance & Layout</h3>
        </div>
        <div className="p-4 sm:p-5">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-3">System Theme</label>
          <div className="flex gap-3 mb-5">
            {[
              { id: "light", label: "Light", emoji: "☀️" },
              { id: "dark",  label: "Dark",  emoji: "🌙" },
            ].map(t => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                  theme === t.id
                    ? "border-amber-500 bg-amber-50 text-amber-700 font-bold"
                    : "border-slate-100 text-slate-400 font-semibold"
                }`}>
                <span className="text-base">{t.emoji}</span>
                <span className="text-xs uppercase tracking-wider">{t.label}</span>
              </button>
            ))}
          </div>
          <div className="divide-y divide-slate-100 border-t border-slate-100">
            <Toggle label="Collapse Sidebar"  description="Start with the sidebar minimized"       checked={sidebarCollapsed} onChange={setSidebarCollapsed} />
            <Toggle label="Dense Table View"  description="Show more rows per page in all tables"  checked={denseTable}       onChange={setDenseTable}       />
          </div>
        </div>
        <CardFoot right={<SaveButton onClick={handleSave} saved={saved} />} />
      </Card>
    </div>
  );
}

// ── SYSTEM TAB ──
function SystemTab() {
  const [saved, setSaved]               = useState(false);
  const [maintenanceMode, setMaintenance] = useState(false);
  const [autoBackup, setAutoBackup]     = useState(true);
  const [apiLogs, setApiLogs]           = useState(true);
  const [backupFreq, setBackupFreq]     = useState("Daily");
  const [sessionTimeout, setSessionTimeout] = useState("30 Mins");

  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2500); }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHead title="System Configuration" sub="Core system settings and maintenance"
          gradientFrom="from-slate-50" iconBg="bg-slate-900" iconTx="text-white" Icon={Shield} />
        <div className="p-4 sm:p-5">
          {maintenanceMode && (
            <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2.5 mb-4 text-xs text-yellow-800 font-semibold">
              <AlertTriangle size={13} className="text-yellow-500 shrink-0" />
              Maintenance Mode is <strong className="ml-1">Active</strong>. User access is restricted.
            </div>
          )}
          <div className="divide-y divide-slate-100">
            <Toggle label="Maintenance Mode"      description="Temporarily disable user access"  checked={maintenanceMode} onChange={setMaintenance} />
            <Toggle label="Auto Database Backup"  description="Daily automated system backups"   checked={autoBackup}      onChange={setAutoBackup}  />
            <Toggle label="API Monitor Logs"      description="Record all system API requests"   checked={apiLogs}         onChange={setApiLogs}     />
          </div>
        </div>
      </Card>

      {/* Config selects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "Backup Frequency", value: backupFreq,     onChange: setBackupFreq,     options: ["Hourly", "Daily", "Weekly"]          },
          { label: "Session Timeout",  value: sessionTimeout, onChange: setSessionTimeout, options: ["15 Mins", "30 Mins", "1 Hour"] },
        ].map((s, i) => (
          <Card key={i} className="p-4">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">{s.label}</label>
            <select value={s.value} onChange={e => s.onChange(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold bg-slate-50 focus:outline-none">
              {s.options.map(o => <option key={o}>{o}</option>)}
            </select>
          </Card>
        ))}
      </div>

      {/* Info rows */}
      <Card>
        <div className="divide-y divide-slate-100">
          {[
            ["App Version", "v2.1.0"],
            ["Database",    "PostgreSQL 15"],
            ["Uptime",      "99.9%"],
          ].map(([k, v], i) => (
            <div key={i} className="flex justify-between items-center px-4 sm:px-5 py-2.5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{k}</span>
              <span className="text-xs font-bold text-slate-700 font-mono">{v}</span>
            </div>
          ))}
        </div>
      </Card>

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
    profile:       <ProfileTab />,
    security:      <SecurityTab />,
    notifications: <NotificationsTab />,
    preferences:   <PreferencesTab />,
    system:        <SystemTab />,
  };

  return (
    <div className="min-h-screen py-4 px-3 sm:px-6 bg-white font-sans">
      <div className="w-full max-w-5xl mx-auto">
        {/* Page Title */}
        <div className="mb-4">
          <h1 className="text-lg font-black text-slate-800">Settings</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage your admin account and system preferences</p>
        </div>

        {/* Tab Bar */}
        <div className="flex flex-nowrap overflow-x-auto gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-sm mb-4 w-full scrollbar-none">
          {TABS.map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? `${t.activeBg} text-white shadow-md scale-105`
                    : `text-slate-500 ${t.hoverBg} hover:text-slate-800`
                }`}
              >
                <Icon size={13} className={isActive ? "text-white" : ""} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="w-full">
          {VIEWS[activeTab]}
        </div>
      </div>
    </div>
  );
}