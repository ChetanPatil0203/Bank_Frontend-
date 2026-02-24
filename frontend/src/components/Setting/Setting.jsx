import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   PAYZEN LOGO — Same as Login / Registration / Forgot / Sidebar
═══════════════════════════════════════════════════════════ */
function PayZenLogo() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .pzl-st-wrap { display: flex; flex-direction: column; align-items: center; padding: 16px 0 18px; }

        .pzl-st-icon-block { position: relative; width: 52px; height: 52px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; }

        .pzl-st-glow {
          position: absolute; inset: -10px; border-radius: 24px;
          background: radial-gradient(ellipse at center, #3b82f6 0%, #6366f1 40%, transparent 72%);
          opacity: 0.55; filter: blur(12px);
          animation: pzlStGlow 3s ease-in-out infinite;
        }
        @keyframes pzlStGlow {
          0%,100% { opacity: 0.45; transform: scale(1); }
          50%      { opacity: 0.7; transform: scale(1.08); }
        }

        .pzl-st-card {
          position: relative; z-index: 2;
          width: 52px; height: 52px; border-radius: 16px;
          background: linear-gradient(145deg, #1a2e6b 0%, #1e40af 45%, #2563eb 100%);
          box-shadow: 0 0 0 1px rgba(99,102,241,0.5), 0 6px 20px rgba(37,99,235,0.5), inset 0 1px 0 rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center; overflow: hidden;
          transition: transform 0.25s ease;
        }
        .pzl-st-card:hover { transform: scale(1.06) translateY(-1px); }

        .pzl-st-texture {
          position: absolute; inset: 0; border-radius: 16px;
          background: repeating-linear-gradient(-55deg, transparent, transparent 6px, rgba(255,255,255,0.025) 6px, rgba(255,255,255,0.025) 12px);
        }

        .pzl-st-dot {
          position: absolute; top: 7px; right: 7px; width: 6px; height: 6px;
          border-radius: 50%; background: #22d3ee; box-shadow: 0 0 6px #22d3ee; z-index: 4;
          animation: pzlStDot 2.2s ease-in-out infinite;
        }
        @keyframes pzlStDot { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

        .pzl-st-name { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; letter-spacing: -0.5px; line-height: 1; color: #1e3a7b; }
        .pzl-st-pay  { color: #1e3a7b; }
        .pzl-st-zen  { background: linear-gradient(90deg, #2563eb, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        .pzl-st-underline { height: 2px; width: 100%; border-radius: 99px; background: linear-gradient(90deg, #3b82f6, #a78bfa); margin-top: 3px; }

        .pzl-st-tag {
          font-family: 'DM Sans', sans-serif; font-size: 7px; font-weight: 500;
          letter-spacing: 2.2px; text-transform: uppercase; color: rgba(100,116,139,0.7);
          margin-top: 3px;
        }
      `}</style>

      <div className="pzl-st-wrap">
        <div className="pzl-st-icon-block">
          <div className="pzl-st-glow" />
          <div className="pzl-st-card">
            <div className="pzl-st-texture" />
            <div className="pzl-st-dot" />
            <svg viewBox="0 0 32 32" fill="none" style={{ width: 26, height: 26, position: "relative", zIndex: 3 }}>
              <path d="M16 2 L28 8.5 L28 23.5 L16 30 L4 23.5 L4 8.5 Z" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              <circle cx="16" cy="16" r="7" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
              <path d="M13.5 12.5 L13.5 19.5 M13.5 12.5 L17 12.5 Q19.5 12.5 19.5 14.5 Q19.5 16.5 17 16.5 L13.5 16.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <div className="pzl-st-name">
            <span className="pzl-st-pay">Pay</span>
            <span className="pzl-st-zen">Zen</span>
          </div>
          <div className="pzl-st-underline" />
          <div className="pzl-st-tag">SECURE · SMART · BANKING</div>
        </div>
      </div>
    </>
  );
}

const Setting = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    transactions: true,
    offers: false,
    security: true,
  });
  const [profileData, setProfileData] = useState({
    name: "Bhushan",
    email: "bhushan@example.com",
    phone: "+91 98765 43210",
    dob: "1995-06-15",
    address: "Pune, Maharashtra",
  });
  const [saved, setSaved] = useState(false);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [password, setPassword] = useState({ old: "", new: "", confirm: "" });
  const [passwordMsg, setPasswordMsg] = useState("");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const updatePassword = () => {
    if (!password.old || !password.new || !password.confirm) {
      setPasswordMsg("All fields required");
      return;
    }
    if (password.new !== password.confirm) {
      setPasswordMsg("Passwords do not match");
      return;
    }
    setPasswordMsg("✅ Password changed successfully!");
    setShowPasswordForm(false);
    setPassword({ old: "", new: "", confirm: "" });
  };

  const menuItems = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "help", label: "Help & Support", icon: "❓" },
  ];

  // Field label mapping for profile fields
  const profileFieldLabels = {
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    dob: "Date of Birth",
    address: "Address",
  };

  const profileFieldTypes = {
    name: "text",
    email: "email",
    phone: "tel",
    dob: "date",
    address: "text",
  };

  // Password field label mapping
  const passwordFieldLabels = {
    old: "Current Password",
    new: "New Password",
    confirm: "Confirm New Password",
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-6 gap-6">
      {/* SIDEBAR */}
      <div className="w-64 bg-white rounded-2xl shadow p-4 flex flex-col gap-4">
        <div className="border-b">
          <PayZenLogo />
        </div>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm mb-1 ${
                activeSection === item.id
                  ? "bg-blue-50 text-blue-800 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 bg-white rounded-2xl shadow p-6">

        {/* PROFILE SECTION */}
        {activeSection === "profile" && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-6">Profile Information</h2>
            <div className="grid grid-cols-1 gap-5">
              {Object.entries(profileData).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-1">
                  <label
                    htmlFor={`profile-${key}`}
                    className="text-sm font-medium text-gray-700"
                  >
                    {profileFieldLabels[key]}
                  </label>
                  <input
                    id={`profile-${key}`}
                    type={profileFieldTypes[key] || "text"}
                    value={value}
                    required
                    placeholder={`Enter ${profileFieldLabels[key]}`}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    className="border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleSave}
              className="mt-6 bg-blue-900 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-blue-800"
            >
              {saved ? "✅ Saved!" : "Save Changes"}
            </button>
          </div>
        )}

        {/* SECURITY SECTION */}
        {activeSection === "security" && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-6">Security Settings</h2>
            <div className="border rounded-xl p-4 flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-gray-800">Change Password</p>
                <p className="text-sm text-gray-500">Update your login password regularly</p>
              </div>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold px-4 py-2 rounded-lg"
              >
                {showPasswordForm ? "Close" : "Change"}
              </button>
            </div>

            {showPasswordForm && (
              <div className="border rounded-xl p-5 mt-2 bg-gray-50">
                <h3 className="font-semibold text-gray-700 mb-4">Update Password</h3>
                {passwordMsg && (
                  <div className="text-sm text-blue-700 bg-blue-50 rounded-lg px-3 py-2 mb-4">
                    {passwordMsg}
                  </div>
                )}
                <div className="flex flex-col gap-5">
                  {["old", "new", "confirm"].map((field) => (
                    <div key={field} className="flex flex-col gap-1">
                      <label
                        htmlFor={`pwd-${field}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        {passwordFieldLabels[field]}
                      </label>
                      <input
                        id={`pwd-${field}`}
                        type="password"
                        name={field}
                        value={password[field]}
                        required
                        placeholder={`Enter ${passwordFieldLabels[field]}`}
                        onChange={handlePasswordChange}
                        className="border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={updatePassword}
                  className="mt-5 bg-blue-900 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-800"
                >
                  Update Password
                </button>
              </div>
            )}
          </div>
        )}

        {/* NOTIFICATIONS SECTION */}
        {activeSection === "notifications" && (
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">🔔</span>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Notification Preferences</h2>
                <p className="text-sm text-gray-500">Control what alerts you receive</p>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {[
                { key: "email", label: "Email Notifications", desc: "Get updates via email", icon: "📧" },
                { key: "sms", label: "SMS Alerts", desc: "Receive SMS for transactions", icon: "💬" },
                { key: "push", label: "Push Notifications", desc: "Browser push alerts", icon: "📲" },
                { key: "transactions", label: "Transaction Alerts", desc: "Every debit/credit notification", icon: "💳" },
                { key: "offers", label: "Offers & Promotions", desc: "Banking offers and deals", icon: "🎁" },
                { key: "security", label: "Security Alerts", desc: "Login and security warnings", icon: "🛡️" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between border rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNotification(item.key)}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                      notifications[item.key] ? "bg-blue-900" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                        notifications[item.key] ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleSave}
              className="mt-5 bg-blue-900 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-blue-800"
            >
              {saved ? "✅ Saved!" : "Save Preferences"}
            </button>
          </div>
        )}

        {/* HELP SECTION */}
        {activeSection === "help" && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">❓</span>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Help & Support</h2>
                <p className="text-sm text-gray-500">We're here to help you</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { icon: "📞", title: "Call Us", desc: "1800-11-2211 (Toll Free)", color: "bg-blue-50" },
                { icon: "📧", title: "Email Support", desc: "support@sbi.co.in", color: "bg-green-50" },
                { icon: "💬", title: "Live Chat", desc: "Chat with our agent", color: "bg-yellow-50" },
                { icon: "📍", title: "Find Branch", desc: "Locate nearest SBI branch", color: "bg-red-50" },
              ].map((item) => (
                <div key={item.title} className={`${item.color} rounded-xl p-4 flex gap-3 items-start`}>
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-3">Frequently Asked Questions</h3>
              <div className="flex flex-col gap-2">
                {[
                  "How to reset my Internet Banking password?",
                  "How to update my mobile number?",
                  "How to block my ATM card?",
                  "How to apply for a new debit card?",
                ].map((q) => (
                  <div key={q} className="flex justify-between items-center border-b py-2 last:border-0">
                    <p className="text-sm text-gray-700">{q}</p>
                    <span className="text-gray-400 text-lg">›</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;