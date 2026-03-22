import { useState } from "react";

/* ─── SVG Icon Helper ─────────────────────────────────────── */
function Ico({ path, size = 18, cls = "" }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"
      className={cls}
    >
      <path d={path} />
    </svg>
  );
}

const P = {
  user:   "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  bell:   "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  help:   "M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01",
  chevR:  "M9 18l6-6-6-6",
  back:   "M15 18l-6-6 6-6",
  lock:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v4M12 16h.01",
  key:    "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4",
  mail:   "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  phone:  "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a2 2 0 011.93-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.91 14a16 16 0 006.29 6.29",
  map:    "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 10a1 1 0 110-2 1 1 0 010 2z",
  sms:    "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  push:   "M12 2a10 10 0 00-7.35 16.76L3 21l2.24-1.65A10 10 0 1012 2z",
  credit: "M1 4h22v16H1zM1 10h22",
  gift:   "M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7a5 2.5 0 010-5 5 2.5 0 010 5M12 7a5 2.5 0 000-5 5 2.5 0 000 5",
  eye:    "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z",
  device: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  check:  "M20 6L9 17l-5-5",
  cal:    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  addr:   "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10",
};

/* ─── Toggle Switch ──────────────────────────────────────── */
function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none shrink-0 ${
        on ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
          on ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function Setting() {
  const [tab, setTab] = useState("profile");
  const [detailKey, setDetailKey] = useState(null);
  const [editVal, setEditVal] = useState("");
  const [fieldSaved, setFieldSaved] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [pwd, setPwd] = useState({ old: "", new: "", confirm: "" });
  const [pwdMsg, setPwdMsg] = useState(null);
  const [notifSaved, setNotifSaved] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const [profile, setProfile] = useState({
    name:    { label: "Full Name",     value: "Chetan Patil",           type: "text",  icon: P.user,  color: "text-blue-600",   bg: "bg-blue-50"   },
    email:   { label: "Email Address", value: "Chetan@example.com",     type: "email", icon: P.mail,  color: "text-violet-600", bg: "bg-violet-50" },
    phone:   { label: "Phone Number",  value: "+91 89563 20427",         type: "tel",   icon: P.phone, color: "text-green-600",  bg: "bg-green-50"  },
    dob:     { label: "Date of Birth", value: "2006-03-02",              type: "date",  icon: P.cal,   color: "text-orange-500", bg: "bg-orange-50" },
    address: { label: "Address",       value: "Pune, Maharashtra, India", type: "text",  icon: P.addr,  color: "text-rose-600",   bg: "bg-rose-50"   },
  });

  const [notifs, setNotifs] = useState({
    email:        { label: "Email Notifications",  desc: "Get account updates via email",       icon: P.mail,   iconBg: "bg-blue-100",   iconTx: "text-blue-600",   on: true,  badge: "Recommended" },
    sms:          { label: "SMS Alerts",           desc: "Receive SMS for every transaction",   icon: P.sms,    iconBg: "bg-green-100",  iconTx: "text-green-600",  on: true,  badge: ""            },
    push:         { label: "Push Notifications",   desc: "Browser and app push alerts",         icon: P.push,   iconBg: "bg-violet-100", iconTx: "text-violet-600", on: false, badge: ""            },
    transactions: { label: "Transaction Alerts",   desc: "Every debit and credit notification", icon: P.credit, iconBg: "bg-amber-100",  iconTx: "text-amber-600",  on: true,  badge: "Important"   },
    offers:       { label: "Offers & Promotions",  desc: "Banking deals and offers",            icon: P.gift,   iconBg: "bg-pink-100",   iconTx: "text-pink-600",   on: false, badge: ""            },
    security:     { label: "Security Alerts",      desc: "Login attempts & security warnings",  icon: P.shield, iconBg: "bg-red-100",    iconTx: "text-red-600",    on: true,  badge: "Critical"    },
  });

  /* ── Handlers ── */
  const openDetail  = (key) => { setEditVal(profile[key].value); setDetailKey(key); setFieldSaved(false); };
  const saveDetail  = () => {
    setProfile(p => ({ ...p, [detailKey]: { ...p[detailKey], value: editVal } }));
    setFieldSaved(true);
    setTimeout(() => { setFieldSaved(false); setDetailKey(null); }, 1200);
  };
  const toggleNotif = (k) => setNotifs(p => ({ ...p, [k]: { ...p[k], on: !p[k].on } }));
  const saveNotif   = () => { setNotifSaved(true);   setTimeout(() => setNotifSaved(false),   1800); };
  const saveProfile = () => { setProfileSaved(true); setTimeout(() => setProfileSaved(false), 1800); };
  const updatePwd   = () => {
    if (!pwd.old || !pwd.new || !pwd.confirm) { setPwdMsg({ ok: false, text: "All fields are required."      }); return; }
    if (pwd.new !== pwd.confirm)              { setPwdMsg({ ok: false, text: "New passwords do not match."   }); return; }
    setPwdMsg({ ok: true, text: "Password updated successfully!" });
    setPwd({ old: "", new: "", confirm: "" });
    setTimeout(() => { setPwdMsg(null); setShowPwd(false); }, 2000);
  };

  /* ── Tab Config with individual colors ── */
  const tabs = [
    { id: "profile",       label: "Profile",        icon: P.user,   activeBg: "bg-blue-600",    inactiveIcon: "text-blue-500",    hoverBg: "hover:bg-blue-50"    },
    { id: "security",      label: "Security",        icon: P.shield, activeBg: "bg-red-500",     inactiveIcon: "text-red-500",     hoverBg: "hover:bg-red-50"     },
    { id: "notifications", label: "Notifications",   icon: P.bell,   activeBg: "bg-violet-600",  inactiveIcon: "text-violet-500",  hoverBg: "hover:bg-violet-50"  },
    { id: "help",          label: "Help & Support",  icon: P.help,   activeBg: "bg-emerald-600", inactiveIcon: "text-emerald-500", hoverBg: "hover:bg-emerald-50" },
  ];

  /* ══ DETAIL EDIT PAGE ════════════════════════════════════ */
  if (detailKey) {
    const f = profile[detailKey];
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Header */}
          <div className="px-6 py-7 bg-gradient-to-br from-blue-700 to-blue-500 text-white">
            <button
              onClick={() => setDetailKey(null)}
              className="flex items-center gap-1.5 text-blue-200 hover:text-white text-xs font-semibold mb-5 transition-colors"
            >
              <Ico path={P.back} size={14} /> Back to Settings
            </button>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${f.bg} ${f.color} flex items-center justify-center`}>
                <Ico path={f.icon} size={22} />
              </div>
              <div>
                <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Editing</p>
                <h2 className="text-xl font-bold mt-0.5">{f.label}</h2>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="px-6 py-7">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              {f.label}
            </label>
            <input
              autoFocus
              type={f.type}
              value={editVal}
              onChange={e => setEditVal(e.target.value)}
              className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 bg-slate-50 focus:bg-white focus:outline-none transition-all"
            />
            <p className="text-xs text-slate-400 mt-2">
              Current: <span className="text-slate-600 font-semibold">{f.value}</span>
            </p>
            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setDetailKey(null)}
                className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveDetail}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  fieldSaved ? "bg-green-500 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {fieldSaved ? <><Ico path={P.check} size={15} /> Saved!</> : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ══ MAIN PAGE ═══════════════════════════════════════════ */
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-800">Settings</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your account preferences</p>
        </div>

        {/* ── TAB BAR ── */}
        <div className="flex flex-wrap gap-2 bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm mb-6 w-fit">
          {tabs.map(t => {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? `${t.activeBg} text-white shadow-md scale-105`
                    : `text-slate-500 ${t.hoverBg} hover:text-slate-800`
                }`}
              >
                <Ico
                  path={t.icon}
                  size={14}
                  cls={isActive ? "text-white" : t.inactiveIcon}
                />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ════ PROFILE TAB ════ */}
        {tab === "profile" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white">
              <div>
                <h2 className="text-base font-black text-slate-900">Profile Information</h2>
                <p className="text-xs text-slate-400 mt-0.5">Click any row to edit your details</p>
              </div>

            </div>

            {/* Field Rows */}
            <div className="divide-y divide-slate-100">
              {Object.entries(profile).map(([key, f]) => (
                <button
                  key={key}
                  onClick={() => openDetail(key)}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-blue-50 transition-colors text-left group"
                >
                  <div className={`w-9 h-9 rounded-xl ${f.bg} ${f.color} flex items-center justify-center shrink-0`}>
                    <Ico path={f.icon} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{f.label}</p>
                    <p className="text-sm font-semibold text-slate-800 truncate mt-0.5">{f.value}</p>
                  </div>
                  <span className="text-slate-300 group-hover:text-blue-500 transition-colors">
                    <Ico path={P.chevR} size={16} />
                  </span>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Ico path={P.shield} size={12} cls="text-slate-400" />
                Your data is encrypted and secure.
              </p>
              <button
                onClick={saveProfile}
                className="w-full md:w-40
                  bg-[linear-gradient(180deg,#1e3a7b_0%,#152d68_60%,#0f1f4d_100%)]
                  hover:bg-[#5b4ec2]
                  text-white
                  font-semibold
                  rounded-xl
                  py-3.5
                  flex items-center
                  justify-center
                  gap-2
                  transition-all
                  transform
                  active:scale-[0.98]
                  shadow-lg"
              >
                {profileSaved ? "Saved" : "Save Profile"}
              </button>
            </div>
          </div>
        )}

        {/* ════ SECURITY TAB ════ */}
        {tab === "security" && (
          <div className="flex flex-col gap-4">

            {/* Password Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-red-50 to-white">
                <div>
                  <h2 className="text-base font-black text-slate-900">Security Settings</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Manage your account protection</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-500 flex items-center justify-center">
                  <Ico path={P.shield} size={18} />
                </div>
              </div>

              {/* Change Password Row */}
              <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Ico path={P.key} size={17} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Change Password</p>
                    <p className="text-xs text-slate-400">Update your login password regularly</p>
                  </div>
                </div>
                <button
                  onClick={() => { setShowPwd(v => !v); setPwdMsg(null); }}
                  className="text-xs font-bold px-4 py-2
                  bg-amber-500
                  text-white
                  font-semibold
                  rounded-xl
                  py-3.5
                  flex items-center
                  justify-center
                  gap-2
                  transition-all
                  transform
                  active:scale-[0.98]
                  shadow-lg"
                >
                  {showPwd ? "Cancel" : "Change"}
                </button>
              </div>

              {/* Password Form */}
              {showPwd && (
                <div className="px-6 pb-6 pt-5 border-t border-slate-100">
                  {pwdMsg && (
                    <div className={`mb-5 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                      pwdMsg.ok
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-600 border border-red-200"
                    }`}>
                      <Ico path={pwdMsg.ok ? P.check : P.lock} size={13} />
                      {pwdMsg.text}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { k: "old",     l: "Current Password" },
                      { k: "new",     l: "New Password"      },
                      { k: "confirm", l: "Confirm Password"  },
                    ].map(({ k, l }) => (
                      <div key={k}>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                          {l}
                        </label>
                        <input
                          type="password"
                          value={pwd[k]}
                          onChange={e => setPwd(p => ({ ...p, [k]: e.target.value }))}
                          placeholder="••••••••"
                          className="w-full border-2 border-slate-200 focus:border-red-400 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none transition-all"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={updatePwd}
                    className="mt-4 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs font-black rounded-xl transition-all"
                  >
                    Update Password
                  </button>
                </div>
              )}
            </div>

            {/* Security Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: P.shield, label: "Two-Factor Auth",   status: "Enabled",   dot: "bg-green-500",  iconBg: "bg-green-50",  iconTx: "text-green-600"  },
                { icon: P.device, label: "Device Management", status: "2 Devices", dot: "bg-blue-500",   iconBg: "bg-blue-50",   iconTx: "text-blue-600"   },
                { icon: P.eye,    label: "Login Alerts",       status: "Active",    dot: "bg-indigo-500", iconBg: "bg-indigo-50", iconTx: "text-indigo-600" },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl ${c.iconBg} ${c.iconTx} flex items-center justify-center mb-3`}>
                    <Ico path={c.icon} size={17} />
                  </div>
                  <p className="text-xs font-black text-slate-700">{c.label}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                    <span className="text-[11px] text-slate-400 font-semibold">{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ NOTIFICATIONS TAB ════ */}
        {tab === "notifications" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-violet-50 to-white">
              <div>
                <h2 className="text-base font-black text-slate-900">Notification Preferences</h2>
                <p className="text-xs text-slate-400 mt-0.5">Control what alerts you receive</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
                <Ico path={P.bell} size={18} />
              </div>
            </div>

            {/* Notification Rows */}
            <div className="divide-y divide-slate-100">
              {Object.entries(notifs).map(([key, item]) => (
                <div key={key} className="px-6 py-4 flex items-center justify-between hover:bg-violet-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-xl ${item.iconBg} ${item.iconTx} flex items-center justify-center shrink-0`}>
                      <Ico path={item.icon} size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-800">{item.label}</p>
                        {item.badge && (
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide ${
                            item.badge === "Critical"  ? "bg-red-100 text-red-600"     :
                            item.badge === "Important" ? "bg-amber-100 text-amber-600" :
                                                         "bg-blue-100 text-blue-600"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <Toggle on={item.on} onChange={() => toggleNotif(key)} />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end bg-slate-50">
              <button
                onClick={saveNotif}
                className={`px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                  notifSaved ? "bg-green-500 text-white" : "bg-violet-600 hover:bg-violet-700 text-white"
                }`}
              >
                {notifSaved ? <><Ico path={P.check} size={13} /> Saved!</> : "Save Preferences"}
              </button>
            </div>
          </div>
        )}

        {/* ════ HELP TAB ════ */}
        {tab === "help" && (
          <div className="flex flex-col gap-4">

            {/* Contact Cards */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white">
                <div>
                  <h2 className="text-base font-black text-slate-900">Help and Support</h2>
                  <p className="text-xs text-slate-400 mt-0.5">We are here to help you 24/7</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Ico path={P.help} size={18} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-5">
                {[
                  { icon: P.phone, label: "Call Us",       val: "1800-11-2211",      sub: "Toll Free · 24/7",    iconBg: "bg-blue-600",    tx: "text-blue-600"    },
                  { icon: P.mail,  label: "Email Support", val: "support@payzen.in", sub: "Reply within 24 hrs", iconBg: "bg-emerald-500", tx: "text-emerald-600" },
                  { icon: P.sms,   label: "Live Chat",     val: "Talk to an agent",  sub: "Avg wait < 2 min",    iconBg: "bg-violet-600",  tx: "text-violet-600"  },
                  { icon: P.map,   label: "Find Branch",   val: "Nearest branch",    sub: "View on map",         iconBg: "bg-rose-500",    tx: "text-rose-600"    },
                ].map((c, i) => (
                  <button
                    key={i}
                    className="text-left p-5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all group"
                  >
                    <div className={`w-11 h-11 rounded-xl ${c.iconBg} flex items-center justify-center text-white shadow mb-4`}>
                      <Ico path={c.icon} size={19} />
                    </div>
                    <p className={`text-sm font-black ${c.tx}`}>{c.label}</p>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5">{c.val}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{c.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-800">Frequently Asked Questions</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  "How to reset my Internet Banking password?",
                  "How to update my registered mobile number?",
                  "How to block my ATM or Debit card instantly?",
                  "How to apply for a new debit card?",
                  "How to set or change my UPI PIN?",
                ].map((q, i) => (
                  <button
                    key={i}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-emerald-50 transition-colors group"
                  >
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">
                      {q}
                    </span>
                    <span className="text-slate-300 group-hover:text-emerald-500 transition-colors ml-4 shrink-0">
                      <Ico path={P.chevR} size={15} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}