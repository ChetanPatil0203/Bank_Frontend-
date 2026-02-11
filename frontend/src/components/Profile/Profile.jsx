import { Check, Pencil, Save } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [edit, setEdit] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Chetan Patil",
    mobile: "9876543210",
    email: "chetan@gmail.com",
    address: "Jalgaon, Maharashtra",
    accountNumber: "123456789012",
    accountType: "Saving",
    branch: "Jalgaon Main Branch",
    ifsc: "SBIN0001234",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">

      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8 
                      transform transition-all duration-700
                      translate-y-10 opacity-0 animate-[slideUp_0.7s_forwards]">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b pb-5 mb-6 gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
              className="w-20 h-20 rounded-full border shadow-md"
            />
            <div>
              <h2 className="text-2xl font-semibold text-blue-900">{profile.fullName}</h2>
              <p className="text-gray-500 text-sm">Account No: {profile.accountNumber}</p>
            </div>
          </div>

          <button
            onClick={() => setEdit(!edit)}
            className={`px-5 py-2 flex items-center gap-2 justify-center 
                        font-medium text-base rounded-full shadow-md hover:shadow-xl 
                        transition-all tracking-wide
                        ${edit ? "bg-green-600 text-white" : "bg-blue-800 text-white"}`}
          >
            {edit ? <Save size={18} /> : <Pencil size={18} />}
            {edit ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* PERSONAL DETAILS */}
        <Section title="Personal Details">
          <Input label="Full Name" name="fullName" value={profile.fullName} edit={edit} handleChange={handleChange}/>
          <Input label="Mobile" name="mobile" value={profile.mobile} edit={edit} handleChange={handleChange}/>
          <Input label="Email" name="email" value={profile.email} edit={edit} handleChange={handleChange}/>
          <Textarea label="Address" name="address" value={profile.address} edit={edit} handleChange={handleChange}/>
        </Section>

        {/* ACCOUNT DETAILS */}
        <Section title="Account Details">
          <DisplayInput label="Account Number" value={profile.accountNumber}/>
          <DisplayInput label="Account Type" value={profile.accountType}/>
          <DisplayInput label="Branch" value={profile.branch}/>
          <DisplayInput label="IFSC Code" value={profile.ifsc}/>
        </Section>

      </div>

      {/* Tailwind animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-[slideUp_0.7s_forwards] { animation: slideUp 0.7s forwards; }
      `}</style>
    </div>
  );
}

/* ---------- Components ---------- */

function Section({ title, children }) {
  return (
    <div className="mt-6 border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-xl font-semibold text-blue-900 mb-4">{title}</h3>
      <div className="grid md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Input({ label, name, value, edit, handleChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      {edit ? (
        <input
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
        />
      ) : (
        <p className="bg-gray-50 border rounded-xl p-3">{value}</p>
      )}
    </div>
  );
}

function DisplayInput({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <p className="bg-gray-50 border rounded-xl p-3">{value}</p>
    </div>
  );
}

function Textarea({ label, name, value, edit, handleChange }) {
  return (
    <div className="flex flex-col gap-1 md:col-span-2">
      <label className="text-sm text-gray-600">{label}</label>
      {edit ? (
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 h-24 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
        />
      ) : (
        <p className="bg-gray-50 border rounded-xl p-3">{value}</p>
      )}
    </div>
  );
}
