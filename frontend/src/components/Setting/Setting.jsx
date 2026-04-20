import { useState, useEffect } from "react";
import { getProfile, updateProfile, getPreferences, updatePreferences, changePassword, getLoginActivity } from "../../utils/apiServices";

import { User, Shield, Bell, Key, Mail, Phone, MapPin, CheckCircle, Smartphone, CreditCard, Gift, Lock, Calendar } from "lucide-react";

function Ico({ icon: Icon, size = 16, className = "" }) {
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}

function Toggle({ on, onChange, disabled = false }) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative w-12 h-6.5 rounded-full transition-all duration-300 focus:outline-none shrink-0 shadow-inner ${on ? "bg-blue-600 ring-4 ring-blue-50" : "bg-slate-200"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span
        className={`absolute top-1 left-1 w-4.5 h-4.5 rounded-full bg-white shadow-md transition-all duration-300 ${on ? "translate-x-5.5" : "translate-x-0"}`}
      />
    </button>
  );
}

const PROFILE_META = {
  name:    { label: "Full Name",      type: "text",  icon: User,      bg: "bg-blue-50",   color: "text-blue-600"   },
  email:   { label: "Email Address",  type: "email", icon: Mail,      bg: "bg-violet-50", color: "text-violet-600" },
  phone:   { label: "Phone Number",   type: "tel",   icon: Phone,     bg: "bg-green-50",  color: "text-green-600"  },
  dob:     { label: "Date of Birth",  type: "date",  icon: Calendar,  bg: "bg-orange-50", color: "text-orange-500" },
  address: { label: "Address",        type: "text",  icon: MapPin,    bg: "bg-rose-50",   color: "text-rose-600"   },
};

const NOTIF_META = {
  email:        { label: "Email Notifications",  desc: "Get account updates via email",        icon: Mail,       iconBg: "bg-blue-100",   iconTx: "text-blue-600",   badge: "Recommended" },
  sms:          { label: "SMS Alerts",           desc: "Receive SMS for every transaction",    icon: Smartphone, iconBg: "bg-green-100",  iconTx: "text-green-600",  badge: ""            },
  push:         { label: "Push Notifications",   desc: "Browser and app push alerts",          icon: Bell,       iconBg: "bg-violet-100", iconTx: "text-violet-600", badge: ""            },
  transactions: { label: "Transaction Alerts",   desc: "Every debit and credit notification",  icon: CreditCard, iconBg: "bg-amber-100",  iconTx: "text-amber-600",  badge: "Important"   },
  offers:       { label: "Offers & Promotions",  desc: "Banking deals and offers",             icon: Gift,       iconBg: "bg-pink-100",   iconTx: "text-pink-600",   badge: ""            },
  security:     { label: "Security Alerts",      desc: "Login attempts & security warnings",   icon: Shield,     iconBg: "bg-red-100",    iconTx: "text-red-600",    badge: "Critical"    },
};

export default function Setting() {
  const [tab, setTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [profileValues, setProfileValues] = useState({
    name:    "",
    email:   "",
    phone:   "",
    dob:     "",
    address: "",
  });

  const [notifToggles, setNotifToggles] = useState({
    email: true, sms: true, push: false, transactions: true, offers: false, security: true,
  });

  const [activity, setActivity] = useState([]);
  const [showPwd, setShowPwd] = useState(false);
  const [pwd, setPwd] = useState({ old: "", new: "", confirm: "" });
  const [pwdMsg, setPwdMsg] = useState(null);
  const [notifSaved, setNotifSaved] = useState(false);
  const [editSaved, setEditSaved] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    const profRes = await getProfile();
    const prefRes = await getPreferences();
    
    if (profRes.ok) {
        setProfileValues({
            name: profRes.data.data.name,
            email: profRes.data.data.email,
            phone: profRes.data.data.mobile,
            dob: profRes.data.data.date_of_birth,
            address: profRes.data.data.address || "",
        });
    }
    
    if (prefRes.ok) {
        setNotifToggles(prefRes.data.data);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    if (tab === "security") {
        fetchActivity();
    }
  }, [tab]);

  const fetchActivity = async () => {
    const res = await getLoginActivity();
    if (res.ok) {
        setActivity(res.data.data);
    }
  };

  const openEdit = () => {
    setEditData({ ...profileValues, mobile: profileValues.phone });
    setEditing(true);
  };

  const saveEdit = async () => {
    setIsLoading(true);
    const res = await updateProfile(editData);
    if (res.ok) {
        setProfileValues(prev => ({
            ...prev,
            ...res.data.data,
            phone: res.data.data.mobile // backend mobile -> frontend phone
        }));
        setEditSaved(true);
        setTimeout(() => { setEditSaved(false); setEditing(false); }, 1200);
    }
    setIsLoading(false);
  };

  const savePreferences = async () => {
    setIsLoading(true);
    const res = await updatePreferences(notifToggles);
    if (res.ok) {
        setNotifSaved(true);
        setTimeout(() => setNotifSaved(false), 1800);
    }
    setIsLoading(false);
  };

  const cancelEdit = () => { setEditing(false); setEditData({}); };

  const updatePwd = async () => {
    if (!pwd.old || !pwd.new || !pwd.confirm) { setPwdMsg({ ok: false, text: "All fields are required." }); return; }
    if (pwd.new !== pwd.confirm) { setPwdMsg({ ok: false, text: "New passwords do not match." }); return; }
    
    setIsLoading(true);
    const res = await changePassword({ oldPassword: pwd.old, newPassword: pwd.new });
    if (res.ok) {
        setPwdMsg({ ok: true, text: "Password updated successfully!" });
        setPwd({ old: "", new: "", confirm: "" });
        setTimeout(() => { setPwdMsg(null); setShowPwd(false); }, 2000);
    } else {
        setPwdMsg({ ok: false, text: res.data.message || "Error updating password." });
    }
    setIsLoading(false);
  };

  const tabs = [
    { id: "profile",       label: "Profile",        icon: User,   activeCls: "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105",    hoverCls: "hover:bg-blue-50",    iconActiveCls: "text-white", iconInactiveCls: "text-blue-500"    },
    { id: "security",      label: "Security",       icon: Shield, activeCls: "bg-red-500 text-white shadow-lg shadow-red-200 scale-105",     hoverCls: "hover:bg-red-50",     iconActiveCls: "text-white", iconInactiveCls: "text-red-500"     },
    { id: "notifications", label: "Notifications",  icon: Bell,   activeCls: "bg-violet-600 text-white shadow-lg shadow-violet-200 scale-105", hoverCls: "hover:bg-violet-50",  iconActiveCls: "text-white", iconInactiveCls: "text-violet-500"  },
  ];

  // ── Edit Profile ──────────────────────────────────────────────────────────
  if (editing && tab === "profile") {
    return (
      <div className="min-h-screen py-3 px-3 bg-white">
        <div className="w-full">
          <div className="mb-4">
            <h1 className="text-lg font-black text-slate-800">Edit Profile</h1>
            <p className="text-xs text-slate-400 mt-0.5">Update your profile information</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white">
              <div>
                <h2 className="text-sm font-black text-slate-900">Profile Information</h2>
                <p className="text-xs text-slate-400 mt-0.5">Edit your profile details</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {Object.entries(PROFILE_META).map(([key, meta]) => (
                <div key={key} className="flex items-start gap-4 px-4 sm:px-6 py-4">
                  <div className={`w-10 h-10 rounded-xl ${meta.bg} ${meta.color} flex items-center justify-center shrink-0 mt-1 shadow-sm`}>
                    <Ico icon={meta.icon} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{meta.label}</p>
                    <input
                      type={meta.type}
                      value={editData[key] || ""}
                      onChange={e => setEditData(p => ({ ...p, [key]: e.target.value }))}
                      placeholder={meta.label}
                      className="w-full text-xs font-semibold text-slate-800 bg-transparent border-0 outline-none mt-0.5 p-0 placeholder-slate-400"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 sm:px-5 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Ico icon={Shield} size={11} /> Your data is encrypted and secure.
              </p>
              <div className="flex gap-2">
                <button onClick={cancelEdit} disabled={isLoading} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg text-xs active:scale-[0.98] transition-all disabled:opacity-50">
                  Cancel
                </button>
                <button onClick={saveEdit} disabled={isLoading} className="px-4 py-2 bg-gradient-to-b from-[#1e3a7b] to-[#0f1f4d] text-white font-semibold rounded-lg flex items-center gap-1.5 text-xs active:scale-[0.98] transition-all disabled:opacity-50">
                  {isLoading ? "Saving..." : editSaved ? <><Ico icon={CheckCircle} size={13} /> Saved</> : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Page ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen py-3 px-3 bg-white">
      <div className="w-full">

        <div className="mb-4">
          <h1 className="text-lg font-black text-slate-800">Settings</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage your account preferences</p>
        </div>

        {/* Tab Bar */}
        <div className="flex flex-wrap gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-sm mb-4">
          {tabs.map(t => {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                disabled={isLoading}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  isActive ? t.activeCls : `text-slate-500 ${t.hoverCls} hover:text-slate-800`
                } disabled:opacity-50`}
              >
                <Ico icon={t.icon} size={13} className={isActive ? t.iconActiveCls : t.iconInactiveCls} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ── Profile Tab ── */}
        {tab === "profile" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white">
              <div>
                <h2 className="text-sm font-black text-slate-900">Profile Information</h2>
                <p className="text-xs text-slate-400 mt-0.5">Your profile details</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {Object.entries(PROFILE_META).map(([key, meta]) => (
                <div key={key} className="flex items-center gap-4 px-4 sm:px-6 py-4">
                  <div className={`w-10 h-10 rounded-xl ${meta.bg} ${meta.color} flex items-center justify-center shrink-0 shadow-sm`}>
                    <Ico icon={meta.icon} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{meta.label}</p>
                    <p className="text-xs font-semibold text-slate-800 truncate mt-0.5">{profileValues[key] || "Loading..."}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 sm:px-5 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Ico icon={Shield} size={11} /> Your data is encrypted and secure.
              </p>
              <div className="flex gap-2">
                <button onClick={openEdit} disabled={isLoading} className="px-4 py-2 bg-gradient-to-b from-[#1e3a7b] to-[#0f1f4d] text-white font-semibold rounded-lg text-xs active:scale-[0.98] transition-all disabled:opacity-50">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Security Tab ── */}
        {tab === "security" && (
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-red-50 to-white">
                <div>
                  <h2 className="text-sm font-black text-slate-900">Security Settings</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Manage your account protection</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-500 flex items-center justify-center shadow-sm">
                  <Ico icon={Shield} size={20} />
                </div>
              </div>

              <div className="px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Ico icon={Key} size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Change Password</p>
                    <p className="text-xs text-slate-400">Update your login password regularly</p>
                  </div>
                </div>
                <button onClick={() => { setShowPwd(v => !v); setPwdMsg(null); }}
                  className="px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-lg active:scale-[0.98] transition-all">
                  {showPwd ? "Cancel" : "Change"}
                </button>
              </div>

              {showPwd && (
                <div className="px-4 sm:px-5 pb-4 pt-3 border-t border-slate-100">
                  {pwdMsg && (
                    <div className={`mb-3 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                      pwdMsg.ok ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
                    }`}>
                      <Ico icon={pwdMsg.ok ? CheckCircle : Lock} size={12} />
                      {pwdMsg.text}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { k: "old",     l: "Current Password" },
                      { k: "new",     l: "New Password"      },
                      { k: "confirm", l: "Confirm Password"  },
                    ].map(({ k, l }) => (
                      <div key={k}>
                        <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{l}</label>
                        <input
                          type="password"
                          value={pwd[k]}
                          onChange={e => setPwd(p => ({ ...p, [k]: e.target.value }))}
                          placeholder="••••••••"
                          className="w-full border-2 border-slate-200 focus:border-red-400 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none transition-all"
                        />
                      </div>
                    ))}
                  </div>
                  <button onClick={updatePwd} disabled={isLoading} className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-all disabled:opacity-50">
                    {isLoading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-4 sm:px-5 py-3 border-b border-slate-100">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Recent Activity</h3>
                </div>
                <div className="divide-y divide-slate-100">
                    {activity.length > 0 ? activity.map((act) => (
                        <div key={act.id} className="px-4 sm:px-5 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${act.status === 'Success' ? 'bg-green-500' : 'bg-red-500'}`} />
                                <div>
                                    <p className="text-xs font-bold text-slate-800">{act.status} Login</p>
                                    <p className="text-[10px] text-slate-400">{act.time} · IP: {act.ip}</p>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="px-4 sm:px-5 py-8 text-center text-xs text-slate-400">
                            No recent activity found.
                        </div>
                    )}
                </div>
            </div>
          </div>
        )}

        {/* ── Notifications Tab ── */}
        {tab === "notifications" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-violet-50 to-white">
              <div>
                <h2 className="text-sm font-black text-slate-900">Notification Preferences</h2>
                <p className="text-xs text-slate-400 mt-0.5">Control what alerts you receive</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
                <Ico icon={Bell} size={16} />
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {Object.entries(NOTIF_META).map(([key, item]) => (
                <div key={key} className="px-4 sm:px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-10 h-10 rounded-xl ${item.iconBg} ${item.iconTx} flex items-center justify-center shrink-0 shadow-sm`}>
                      <Ico icon={item.icon} size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-xs font-bold text-slate-800">{item.label}</p>
                        {item.badge && (
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide ${
                            item.badge === "Critical"  ? "bg-red-100 text-red-600"     :
                            item.badge === "Important" ? "bg-amber-100 text-amber-600" :
                                                         "bg-blue-100 text-blue-600"
                          }`}>{item.badge}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <Toggle on={notifToggles[key]} disabled={isLoading} onChange={() => setNotifToggles(p => ({ ...p, [key]: !p[key] }))} />
                </div>
              ))}
            </div>

            <div className="px-4 sm:px-5 py-3 border-t border-slate-100 flex justify-end bg-slate-50">
              <button
                onClick={savePreferences}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  notifSaved ? "bg-green-500 text-white" : "bg-violet-600 hover:bg-violet-700 text-white"
                } disabled:opacity-50`}
              >
                {isLoading ? "Saving..." : notifSaved ? <><Ico icon={CheckCircle} size={12} /> Saved!</> : "Save Preferences"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}