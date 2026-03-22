import { Pencil, Save, CheckCircle } from "lucide-react";
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
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        {/* Toast */}
        {msg && (
          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-sm font-medium
            ${msg === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"}`}>
            <CheckCircle size={16}/>
            {msg === "success" ? "Profile update झाला ✅" : "Error आला ❌"}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg, #1e3a7b, #2563eb)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, fontWeight: 700, color: "#fff",
              border: "3px solid #e2e8f0",
              flexShrink: 0, userSelect: "none",
            }}>
              {initials}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-900">{profile.fullName || "—"}</h2>
              <p className="text-sm text-gray-500">
                {account ? `Account No: ${account.account_number}` : "Account: Not opened yet"}
              </p>
            </div>
          </div>

          <button
            onClick={() => edit ? handleSave() : setEdit(true)}
            disabled={saving}
            className="flex items-center gap-2 bg-[#1e3a7b] hover:bg-[#152d68]
              text-white font-semibold px-5 py-2.5 rounded-xl
              disabled:opacity-60 transition-all shadow-md">
            {edit ? <Save size={16}/> : <Pencil size={16}/>}
            {saving ? "Saving..." : edit ? "Save" : "Edit"}
          </button>
        </div>

        {/* Personal Details */}
        <h3 className="text-base font-semibold text-blue-900 mb-3">Personal Details</h3>
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          <Field label="Full Name"     value={profile.fullName} />
          <Field label="Mobile"        value={profile.mobile} />
          <Field label="Email"         value={profile.email} />
          <Field label="Gender"        value={profile.gender} />
          <Field label="Date of Birth" value={profile.date_of_birth} />

          {/* Address — editable */}
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Address</label>
            {edit ? (
              <textarea
                value={profile.address}
                onChange={e => setProfile({ ...profile, address: e.target.value })}
                placeholder="Enter your address..."
                className="border rounded-xl px-3 py-2 text-sm h-20
                  focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            ) : (
              <div className={`border rounded-xl px-3 py-2 text-sm min-h-[44px]
                ${profile.address ? "text-gray-800" : "text-gray-300 italic"}`}>
                {profile.address || "Address not added yet — click Edit to add"}
              </div>
            )}
          </div>
        </div>

        {/* Account Details */}
        <h3 className="text-base font-semibold text-blue-900 mb-3">Account Details</h3>

        {!account ? (
          <div className="flex items-center justify-between
            bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-3">
            <div className="flex items-center gap-2 text-amber-700 text-sm">
              <span className="text-lg">🏦</span>
              <span>Bank account अजून open केलेला नाही.</span>
            </div>
            <button
              onClick={() => navigate("/open-account")}
              className="text-xs font-semibold bg-amber-500 hover:bg-amber-600
                text-white px-4 py-2 rounded-lg transition-all">
              + Open Account
            </button>
          </div>
        ) : null}

        <div className="grid md:grid-cols-2 gap-3">
          <Field label="Account Number" value={account?.account_number || ""} empty={!account} />
          <Field label="Account Type"   value={account?.account_type   || ""} empty={!account} />
          <Field label="Branch"         value={account?.branch         || ""} empty={!account} />
          <Field label="IFSC Code"      value={account?.ifsc           || ""} empty={!account} />
          {account?.bank_holder_name && (
            <Field label="Account Holder" value={account.bank_holder_name} />
          )}
        </div>

      </div>
    </div>
  );
}

function Field({ label, value, empty }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <div className={`border rounded-xl px-3 py-2 text-sm
        ${empty || !value
          ? "bg-gray-50 text-gray-300 italic"
          : "bg-gray-50 text-gray-800"}`}>
        {empty || !value ? "—" : value}
      </div>
    </div>
  );
}