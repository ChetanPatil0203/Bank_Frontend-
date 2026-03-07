

export default function AccountDetails() {

  // Dummy Data
  const accountData = {
    name: "Bhushan Patil",
    accountNumber: "XXXXXX4589",
    accountType: "Saving Account",
    branch: "Pune Main Branch",
    ifsc: "SBIN0004589",

    gender: "Male",
    maritalStatus: "Unmarried",
    dob: "12-05-2002",
    fatherName: "Ramesh Patil",

    mobile: "9876543210",
    email: "bhushan@gmail.com",

    aadhaar: "XXXX XXXX 4589",
    pan: "ABCDE1234F",

    status: "Active"
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8">

        {/* Header */}
        <div className="text-center pb-5 mb-8">
          <h2 className="text-3xl font-bold text-blue-900">
            Account Details
          </h2>
        </div>

        {/* Basic Info */}
        <Section title="Basic Account Information">
          <Detail label="Account Holder Name" value={accountData.name} />
          <Detail label="Account Number" value={accountData.accountNumber} />
          <Detail label="Account Type" value={accountData.accountType} />
          <Detail label="Branch Name" value={accountData.branch} />
          <Detail label="IFSC Code" value={accountData.ifsc} />
          <Detail label="Account Status" value={accountData.status} />
        </Section>

        {/* Personal Info */}
        <Section title="Personal Information">
          <Detail label="Gender" value={accountData.gender} />
          <Detail label="Marital Status" value={accountData.maritalStatus} />
          <Detail label="Date Of Birth" value={accountData.dob} />
          <Detail label="Father Name" value={accountData.fatherName} />
        </Section>

        {/* Contact Info */}
        <Section title="Contact Information">
          <Detail label="Mobile Number" value={accountData.mobile} />
          <Detail label="Email Address" value={accountData.email} />
        </Section>

        {/* KYC Info */}
        <Section title="KYC Information">
          <Detail label="Aadhaar Number" value={accountData.aadhaar} />
          <Detail label="PAN Number" value={accountData.pan} />
        </Section>

      </div>
    </div>
  );
}


/* ---------- Section ---------- */

function Section({ title, children }) {
  return (
    <div className="p-6 mb-6">
      <h3 className="text-xl font-semibold text-blue-900 mb-5">
        {title}
      </h3>

      <div className="grid md:grid-cols-2 gap-5">
        {children}
      </div>
    </div>
  );
}


/* ---------- Detail ---------- */

function Detail({ label, value }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  );
}
