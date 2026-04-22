import { Pencil, Save, CheckCircle, User, Phone, Mail, MapPin, Calendar, CreditCard, Hash, Landmark } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../utils/apiServices";

function getInitials(name) {
  if (!name) return "?";
  return name.trim().split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [edit, setEdit]       = useState(false);
  const [saving, setSaving]   = useState(false);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg]         = useState("");
  const [profile, setProfile] = useState({
    fullName: "", mobile: "", email: "",
    gender: "", date_of_birth: "", address: "",
  });
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("payzen_user");
    if (!stored) { navigate("/login"); return; }
    getProfile()
      .then(res => {
        if (res.ok && res.data.success) {
          const d = res.data.data;
          setProfile({
            fullName:      d.name          || "",
            mobile:        d.mobile        || "",
            email:         d.email         || "",
            gender:        d.gender        || "",
            date_of_birth: d.date_of_birth || "",
            address:       d.address       || "",
          });
          setAccount(d.account || null);
          localStorage.setItem("payzen_user", JSON.stringify(d));
        } else if (res.status === 401) {
          localStorage.removeItem("payzen_token");
          localStorage.removeItem("payzen_user");
          navigate("/login");
        }
        setLoading(false);
      })
      .catch(() => {
        const u = JSON.parse(stored);
        setProfile({
          fullName:      u.name          || "",
          mobile:        u.mobile        || "",
          email:         u.email         || "",
          gender:        u.gender        || "",
          date_of_birth: u.date_of_birth || "",
          address:       u.address       || "",
        });
        setLoading(false);
      });
  }, [navigate]);

  const handleSave = async () => {
    setSaving(true); setMsg("");
    const res = await updateProfile({ address: profile.address });
    if (res.ok && res.data.success) {
      const stored = JSON.parse(localStorage.getItem("payzen_user") || "{}");
      stored.address = profile.address;
      localStorage.setItem("payzen_user", JSON.stringify(stored));
      setMsg("success");
    } else {
      setMsg("error");
    }
    setSaving(false); setEdit(false);
    setTimeout(() => setMsg(""), 3000);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900"></div>
    </div>
  );

  const initials = getInitials(profile.fullName);

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6">

        {/* Toast */}
        {msg && (
          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-sm font-medium
            ${msg === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"}`}>
            <CheckCircle size={16}/>
            {msg === "success" ? "Profile updated successfully ✅" : "An error occurred ❌"}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar */}
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "linear-gradient(135deg, #1e3a7b, #2563eb)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 700, color: "#fff",
              border: "3px solid #e2e8f0",
              flexShrink: 0, userSelect: "none",
            }}
            className="sm:w-16 sm:h-16 sm:text-xl">
              {initials}
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-semibold text-blue-900 truncate">
                {profile.fullName || "—"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                {account ? `Account No: ${account.account_number}` : "Account: Not opened yet"}
              </p>
            </div>
          </div>

          <button
            onClick={() => edit ? handleSave() : setEdit(true)}
            disabled={saving}
            className="flex items-center gap-1.5 sm:gap-2 bg-[#1e3a7b] hover:bg-[#152d68]
              text-white font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm
              disabled:opacity-60 transition-all shadow-md flex-shrink-0">
            {edit ? <Save size={15}/> : <Pencil size={15}/>}
            <span className="hidden xs:inline sm:inline">
              {saving ? "Saving..." : edit ? "Save" : "Edit"}
            </span>
            <span className="xs:hidden sm:hidden">
              {saving ? "..." : edit ? "Save" : "Edit"}
            </span>
          </button>
        </div>

        {/* Personal Details */}
        <div className="flex items-center gap-2 mb-4">
          <User size={18} className="text-blue-900" />
          <h3 className="text-sm sm:text-base font-bold text-blue-900">Personal Details</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
          <Field label="Full Name"     value={profile.fullName} icon={<User size={14} />} />
          <Field label="Mobile"        value={profile.mobile} icon={<Phone size={14} />} />
          <Field label="Email"         value={profile.email} icon={<Mail size={14} />} />
          <Field label="Gender"        value={profile.gender} icon={<User size={14} />} />
          <Field label="Date of Birth" value={profile.date_of_birth} icon={<Calendar size={14} />} />

          {/* Address — editable */}
          <div className="col-span-1 sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
              <MapPin size={12} /> Address
            </label>
            {edit ? (
              <textarea
                value={profile.address}
                onChange={e => setProfile({ ...profile, address: e.target.value })}
                placeholder="Enter your address..."
                className="border-2 border-blue-50 bg-blue-50/20 rounded-2xl px-4 py-3 text-xs sm:text-sm h-24
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
              />
            ) : (
              <div className={`border border-gray-100 bg-gray-50/50 rounded-2xl px-4 py-3 text-xs sm:text-sm min-h-[50px]
                ${profile.address ? "text-gray-800 font-medium" : "text-gray-300 italic"}`}>
                {profile.address || "Address not added yet — click Edit to add"}
              </div>
            )}
          </div>
        </div>

        {/* Account Details */}
        <div className="flex items-center gap-2 mb-4">
          <CreditCard size={18} className="text-blue-900" />
          <h3 className="text-sm sm:text-base font-bold text-blue-900">Account Details</h3>
        </div>

        {!account ? (
          <div className="flex flex-col xs:flex-row items-center justify-between gap-4
            bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-6 shadow-sm">
            <div className="flex items-center gap-3 text-amber-800 text-xs sm:text-sm font-medium">
              <span className="text-2xl">🏦</span>
              <p>Bank account not opened yet. Please open a new account to start your services.</p>
            </div>
            <button
              onClick={() => navigate("/open-account")}
              className="w-full xs:w-auto text-xs font-black bg-amber-500 hover:bg-amber-600 active:scale-95
                text-white px-6 py-2.5 rounded-xl transition-all whitespace-nowrap shadow-md shadow-amber-200">
              CREATE ACCOUNT
            </button>
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Field label="Account Number" value={account?.account_number || ""} empty={!account} icon={<Hash size={14} />} />
          <Field label="Account Type"   value={account?.account_type   || ""} empty={!account} icon={<CreditCard size={14} />} />
          <Field label="Branch"         value={account?.branch         || ""} empty={!account} icon={<Landmark size={14} />} />
          <Field label="IFSC Code"      value={account?.ifsc           || ""} empty={!account} icon={<Hash size={14} />} />
          {account?.bank_holder_name && (
            <Field label="Account Holder" value={account.bank_holder_name} icon={<User size={14} />} />
          )}
        </div>

      </div>
    </div>
  );
}

function Field({ label, value, empty, icon }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
        {icon} {label}
      </label>
      <div className={`border border-gray-100 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium transition-all
        ${empty || !value
          ? "bg-gray-50 text-gray-300 italic"
          : "bg-gray-50 text-gray-800"}`}>
        {empty || !value ? "—" : value}
      </div>
    </div>
  );
}