import { useState, useEffect, useContext } from "react";
import { getProfile, updateProfile, getPreferences, updatePreferences, changePassword, getLoginActivity } from "../../utils/apiServices";
import { LanguageContext } from "../../context/LanguageContext";

import { User, Shield, Bell, Key, Mail, Phone, MapPin, CheckCircle, Smartphone, CreditCard, Gift, Lock, Calendar, Globe } from "lucide-react";

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
  name:    { labelKey: "full_name",      type: "text",  icon: User,      bg: "bg-blue-50",   color: "text-blue-600"   },
  email:   { labelKey: "email",          type: "email", icon: Mail,      bg: "bg-violet-50", color: "text-violet-600" },
  phone:   { labelKey: "phone",          type: "tel",   icon: Phone,     bg: "bg-green-50",  color: "text-green-600"  },
  dob:     { labelKey: "dob",            type: "date",  icon: Calendar,  bg: "bg-orange-50", color: "text-orange-500" },
  address: { labelKey: "address",        type: "text",  icon: MapPin,    bg: "bg-rose-50",   color: "text-rose-600"   },
};

const NOTIF_META = {
  email:        { labelKey: "email_notif",  descKey: "email_notif_desc",        icon: Mail,       iconBg: "bg-blue-100",   iconTx: "text-blue-600",   badgeKey: "recommended" },
  sms:          { labelKey: "sms_alerts",   descKey: "sms_alerts_desc",         icon: Smartphone, iconBg: "bg-green-100",  iconTx: "text-green-600",  badgeKey: ""            },
  push:         { labelKey: "push_notif",   descKey: "push_notif_desc",           icon: Bell,       iconBg: "bg-violet-100", iconTx: "text-violet-600", badgeKey: ""            },
  transactions: { labelKey: "trans_alerts", descKey: "trans_alerts_desc",         icon: CreditCard, iconBg: "bg-amber-100",  iconTx: "text-amber-600",  badgeKey: "important"   },
  offers:       { labelKey: "offers_promo", descKey: "offers_promo_desc",         icon: Gift,       iconBg: "bg-pink-100",   iconTx: "text-pink-600",   badgeKey: ""            },
  security:     { labelKey: "security_alerts", descKey: "security_alerts_desc",   icon: Shield,     iconBg: "bg-red-100",    iconTx: "text-red-600",    badgeKey: "critical"    },
};

export default function Setting() {
  const { language, toggleLanguage, t } = useContext(LanguageContext);
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
    { id: "profile",       label: t("profile"),        icon: User,   activeCls: "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105",    hoverCls: "hover:bg-blue-50",    iconActiveCls: "text-white", iconInactiveCls: "text-blue-500"    },
    { id: "security",      label: t("security"),       icon: Shield, activeCls: "bg-red-500 text-white shadow-lg shadow-red-200 scale-105",     hoverCls: "hover:bg-red-50",     iconActiveCls: "text-white", iconInactiveCls: "text-red-500"     },
    { id: "notifications", label: t("notifications"),  icon: Bell,   activeCls: "bg-violet-600 text-white shadow-lg shadow-violet-200 scale-105", hoverCls: "hover:bg-violet-50",  iconActiveCls: "text-white", iconInactiveCls: "text-violet-500"  },
    { id: "preferences",   label: t("preferences"),    icon: Globe,  activeCls: "bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105", hoverCls: "hover:bg-emerald-50", iconActiveCls: "text-white", iconInactiveCls: "text-emerald-500" },
  ];

  // ── Edit Profile ──────────────────────────────────────────────────────────
  if (editing && tab === "profile") {
    return (
      <div className="min-h-screen py-3 px-3 bg-white">
        <div className="w-full">
          <div className="mb-4">
            <h1 className="text-lg font-black text-slate-800">{t("edit_profile")}</h1>
            <p className="text-xs text-slate-400 mt-0.5">{t("update_profile_info")}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white">
              <div>
                <h2 className="text-sm font-black text-slate-900">{t("profile_info")}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{t("edit_profile_details")}</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {Object.entries(PROFILE_META).map(([key, meta]) => (
                <div key={key} className="flex items-start gap-4 px-4 sm:px-6 py-4">
                  <div className={`w-10 h-10 rounded-xl ${meta.bg} ${meta.color} flex items-center justify-center shrink-0 mt-1 shadow-sm`}>
                    <Ico icon={meta.icon} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{t(meta.labelKey)}</p>
                    <input
                      type={meta.type}
                      value={editData[key] || ""}
                      onChange={e => setEditData(p => ({ ...p, [key]: e.target.value }))}
                      placeholder={t(meta.labelKey)}
                      className="w-full text-xs font-semibold text-slate-800 bg-transparent border-0 outline-none mt-0.5 p-0 placeholder-slate-400"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 sm:px-5 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Ico icon={Shield} size={11} /> {t("data_encrypted_secure")}
              </p>
              <div className="flex gap-2">
                <button onClick={cancelEdit} disabled={isLoading} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg text-xs active:scale-[0.98] transition-all disabled:opacity-50">
                  {t("cancel")}
                </button>
                <button onClick={saveEdit} disabled={isLoading} className="px-4 py-2 bg-gradient-to-b from-[#1e3a7b] to-[#0f1f4d] text-white font-semibold rounded-lg flex items-center gap-1.5 text-xs active:scale-[0.98] transition-all disabled:opacity-50">
                  {isLoading ? t("saving") : editSaved ? <><Ico icon={CheckCircle} size={13} /> {t("saved")}</> : t("save_changes")}
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
          <h1 className="text-lg font-black text-slate-800">{t("settings")}</h1>
          <p className="text-xs text-slate-400 mt-0.5">{t("manage_account_pref")}</p>
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
                <h2 className="text-sm font-black text-slate-900">{t("profile_info")}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{t("profile")}</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {Object.entries(PROFILE_META).map(([key, meta]) => (
                <div key={key} className="flex items-center gap-4 px-4 sm:px-6 py-4">
                  <div className={`w-10 h-10 rounded-xl ${meta.bg} ${meta.color} flex items-center justify-center shrink-0 shadow-sm`}>
                    <Ico icon={meta.icon} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{t(meta.labelKey)}</p>
                    <p className="text-xs font-semibold text-slate-800 truncate mt-0.5">{profileValues[key] || "Loading..."}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 sm:px-5 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Ico icon={Shield} size={11} /> {t("data_encrypted_secure")}
              </p>
              <div className="flex gap-2">
                <button onClick={openEdit} disabled={isLoading} className="px-4 py-2 bg-gradient-to-b from-[#1e3a7b] to-[#0f1f4d] text-white font-semibold rounded-lg text-xs active:scale-[0.98] transition-all disabled:opacity-50">
                  {t("edit_profile")}
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
                  <h2 className="text-sm font-black text-slate-900">{t("security_settings")}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{t("manage_acc_protection")}</p>
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
                    <p className="text-xs font-bold text-slate-800">{t("change_password")}</p>
                    <p className="text-xs text-slate-400">{t("update_pwd_regularly")}</p>
                  </div>
                </div>
                <button onClick={() => { setShowPwd(v => !v); setPwdMsg(null); }}
                  className="px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-lg active:scale-[0.98] transition-all">
                  {showPwd ? t("cancel") : t("change")}
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
                      { k: "old",     l: t("current_pwd") },
                      { k: "new",     l: t("new_pwd")      },
                      { k: "confirm", l: t("confirm_pwd")  },
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
                    {isLoading ? t("updating") : t("update_pwd_btn")}
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-4 sm:px-5 py-3 border-b border-slate-100">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">{t("recent_activity")}</h3>
                </div>
                <div className="divide-y divide-slate-100">
                    {activity.length > 0 ? activity.map((act) => (
                        <div key={act.id} className="px-4 sm:px-5 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${act.status === 'Success' ? 'bg-green-500' : 'bg-red-500'}`} />
                                <div>
                                    <p className="text-xs font-bold text-slate-800">{act.status === 'Success' ? t("success_login") : t("failed_login")}</p>
                                    <p className="text-[10px] text-slate-400">{act.time} · IP: {act.ip}</p>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="px-4 sm:px-5 py-8 text-center text-xs text-slate-400">
                            {t("no_recent_activity")}
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
                <h2 className="text-sm font-black text-slate-900">{t("notif_pref")}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{t("control_alerts")}</p>
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
                        <p className="text-xs font-bold text-slate-800">{t(item.labelKey)}</p>
                        {item.badgeKey && (
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide ${
                            item.badgeKey === "critical"  ? "bg-red-100 text-red-600"     :
                            item.badgeKey === "important" ? "bg-amber-100 text-amber-600" :
                                                           "bg-blue-100 text-blue-600"
                          }`}>{t(item.badgeKey)}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{t(item.descKey)}</p>
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
                {isLoading ? t("saving") : notifSaved ? <><Ico icon={CheckCircle} size={12} /> {t("saved")}!</> : t("save_pref_btn")}
              </button>
            </div>
          </div>
        )}

        {/* ── Preferences Tab ── */}
        {tab === "preferences" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white">
              <div>
                <h2 className="text-sm font-black text-slate-900">{t("preferences")}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{t("manage_lang_pref")}</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                <Ico icon={Globe} size={16} />
              </div>
            </div>

            <div className="px-4 sm:px-6 py-4 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                    <Ico icon={Globe} size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{t("language")}</p>
                    <p className="text-xs text-slate-500">{t("choose_lang")}</p>
                  </div>
                </div>
                
                <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                  <button 
                    onClick={() => toggleLanguage('en')}
                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${language === 'en' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {t("english")}
                  </button>
                  <button 
                    onClick={() => toggleLanguage('mr')}
                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${language === 'mr' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {t("marathi")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}