import { Pencil, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
  });

  // Account details — localStorage मधून येतो (Open Account नंतर)
  const [account, setAccount] = useState(null);

  // ── Login नंतर localStorage मधून user data load करतो ──
  useEffect(() => {
    try {
      const stored = localStorage.getItem("payzen_user");
      if (!stored) {
        navigate("/login");
        return;
      }
      const user = JSON.parse(stored);
      setProfile({
        fullName: user.name    || "",
        mobile:   user.mobile  || "",
        email:    user.email   || "",
        address:  user.address || "",
      });
    } catch {
      navigate("/login");
    }

    // Account details check करतो
    try {
      const acc = localStorage.getItem("payzen_account");
      if (acc) setAccount(JSON.parse(acc));
    } catch {
      setAccount(null);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Save — address update localStorage मध्ये
  const handleSave = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("payzen_user") || "{}");
      stored.address = profile.address;
      localStorage.setItem("payzen_user", JSON.stringify(stored));
    } catch {}
    setEdit(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-6">

        {/* ── HEADER ── */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
              className="w-16 h-16 rounded-full border shadow-sm"
            />
            <div className="leading-tight">
              <h2 className="text-xl font-semibold text-blue-900">
                {profile.fullName || "—"}
              </h2>
              <p className="text-gray-500 text-sm">
                {account
                  ? `Account No: ${account.accountNumber}`
                  : "Account: Not opened yet"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => edit ? handleSave() : setEdit(true)}
            className={`
              w-full md:w-32
              bg-[linear-gradient(180deg,#1e3a7b_150%,#152d68_150%,#0f1f4d_150%)]
              hover:bg-[#5b4ec2]
              text-white font-semibold rounded-xl py-3.5
              flex items-center justify-center gap-2
              transition-all transform active:scale-[0.98] shadow-lg
            `}
          >
            {edit ? <Save size={18} /> : <Pencil size={18} />}
            {edit ? "Save" : "Edit"}
          </button>
        </div>

        {/* ── PERSONAL DETAILS ── */}
        <Section title="Personal Details">
          {/* Name, Email, Mobile — registration मधून आलेले, edit नाही */}
          <DisplayInput label="Full Name" value={profile.fullName} />
          <DisplayInput label="Mobile"    value={profile.mobile}   />
          <DisplayInput label="Email"     value={profile.email}    />

          {/* Address — edit करता येतो */}
          <Textarea
            label="Address"
            name="address"
            value={profile.address}
            edit={edit}
            handleChange={handleChange}
            placeholder="Enter your address..."
          />
        </Section>

        {/* ── ACCOUNT DETAILS ── */}
        <Section title="Account Details">
          {!account && (
            <div className="md:col-span-2 flex items-center justify-between
              bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-2">
              <div className="flex items-center gap-2 text-amber-700 text-sm">
                <span className="text-lg">🏦</span>
                <span>Bank account अजून open केलेला नाही.</span>
              </div>
              <button
                onClick={() => navigate("/open-account")}
                className="text-xs font-semibold bg-amber-500 hover:bg-amber-600
                  text-white px-4 py-2 rounded-lg transition-all"
              >
                + Open Account
              </button>
            </div>
          )}

          <DisplayInput
            label="Account Number"
            value={account?.accountNumber || ""}
            empty={!account}
          />
          <DisplayInput
            label="Account Type"
            value={account?.accountType || ""}
            empty={!account}
          />
          <DisplayInput
            label="Branch"
            value={account?.branch || ""}
            empty={!account}
          />
          <DisplayInput
            label="IFSC Code"
            value={account?.ifsc || ""}
            empty={!account}
          />
        </Section>

      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════════════════════════ */

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold text-blue-900 mb-3 border-b pb-1">
        {title}
      </h3>
      <div className="grid md:grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  );
}

function DisplayInput({ label, value, empty }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-600">{label}</label>
      <p className={`border rounded-lg px-3 py-2 text-sm
        ${empty ? "bg-gray-50 text-gray-300 italic" : "bg-gray-50 text-gray-800"}`}>
        {empty ? "—" : (value || "—")}
      </p>
    </div>
  );
}

function Textarea({ label, name, value, edit, handleChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1 md:col-span-2">
      <label className="text-xs text-gray-600">{label}</label>
      {edit ? (
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="border rounded-lg px-3 py-2 text-sm h-20
            focus:ring-1 focus:ring-blue-500 outline-none"
        />
      ) : (
        <p className={`border rounded-lg px-3 py-2 text-sm
          ${!value ? "bg-gray-50 text-gray-300 italic" : "bg-gray-50 text-gray-800"}`}>
          {value || "Address not added yet — click Edit to add"}
        </p>
      )}
    </div>
  );
}