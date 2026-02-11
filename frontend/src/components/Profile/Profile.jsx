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
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-5">
          <div className="flex items-center gap-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
              className="w-20 h-20 rounded-full border"
            />

            <div>
              <h2 className="text-2xl font-bold text-blue-900">
                {profile.fullName}
              </h2>
              <p className="text-gray-500">
                Account No : {profile.accountNumber}
              </p>
            </div>
          </div>

          <button
            onClick={() => setEdit(!edit)}
            className="bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
          >
            {edit ? "Save" : "Edit Profile"}
          </button>
        </div>

        {/* PERSONAL DETAILS */}
        <Section title="Personal Details">
          <Input label="Full Name" name="fullName" value={profile.fullName} edit={edit} handleChange={handleChange}/>
          <Input label="Mobile" name="mobile" value={profile.mobile} edit={edit} handleChange={handleChange}/>
          <Input label="Email" name="email" value={profile.email} edit={edit} handleChange={handleChange}/>
          <Input label="Address" name="address" value={profile.address} edit={edit} handleChange={handleChange}/>
        </Section>

        {/* ACCOUNT DETAILS */}
        <Section title="Account Details">
          <Input label="Account Number" value={profile.accountNumber}/>
          <Input label="Account Type" value={profile.accountType}/>
          <Input label="Branch" value={profile.branch}/>
          <Input label="IFSC Code" value={profile.ifsc}/>
        </Section>

      </div>
    </div>
  );
}


/* ---------- Reusable Components ---------- */

function Section({ title, children }) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-blue-900 mb-4">
        {title}
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function Input({ label, name, value, edit, handleChange }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>

      {edit && name ? (
        <input
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mt-1"
        />
      ) : (
        <p className="border rounded-lg p-2 mt-1 bg-gray-50">
          {value}
        </p>
      )}
    </div>
  );
}
