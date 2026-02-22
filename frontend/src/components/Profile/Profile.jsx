import { Pencil, Save } from "lucide-react";
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">

          <div className="flex items-center gap-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
              className="w-16 h-16 rounded-full border shadow-sm"
            />
            <div className="leading-tight">
              <h2 className="text-xl font-semibold text-blue-900">
                {profile.fullName}
              </h2>
              <p className="text-gray-500 text-sm">
                Account No: {profile.accountNumber}
              </p>
            </div>
          </div>

        <button
          type="button"   
          onClick={() => setEdit(!edit)}
          className={`
            w-full md:w-32 
 bg-[linear-gradient(180deg,#1e3a7b_150%,#152d68_150%,#0f1f4d_150%)]
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
            shadow-lg
          `}
        >
          {edit ? <Save size={18} /> : <Pencil size={18} />}
          {edit ? "Save" : "Edit"}
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
    </div>
  );
}

/* ---------- Components ---------- */

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

function Input({ label, name, value, edit, handleChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-600">{label}</label>
      {edit ? (
        <input
          name={name}
          value={value}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 text-sm 
                     focus:ring-1 focus:ring-blue-500 outline-none"
        />
      ) : (
        <p className="bg-gray-50 border rounded-lg px-3 py-2 text-sm">
          {value}
        </p>
      )}
    </div>
  );
}

function DisplayInput({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-600">{label}</label>
      <p className="bg-gray-50 border rounded-lg px-3 py-2 text-sm">
        {value}
      </p>
    </div>
  );
}

function Textarea({ label, name, value, edit, handleChange }) {
  return (
    <div className="flex flex-col gap-1 md:col-span-2">
      <label className="text-xs text-gray-600">{label}</label>
      {edit ? (
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 text-sm h-20 
                     focus:ring-1 focus:ring-blue-500 outline-none"
        />
      ) : (
        <p className="bg-gray-50 border rounded-lg px-3 py-2 text-sm">
          {value}
        </p>
      )}
    </div>
  );
}