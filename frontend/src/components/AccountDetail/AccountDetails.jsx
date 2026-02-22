import { ArrowDownToLine, ArrowDownToLineIcon, Landmark } from "lucide-react";
import jsPDF from "jspdf";

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

  // ✅ FUNCTION INSIDE COMPONENT (FIXED)
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Account Details", 20, 20);

    doc.setFontSize(12);

    const data = [
      ["Name", accountData.name],
      ["Account Number", accountData.accountNumber],
      ["Account Type", accountData.accountType],
      ["Branch", accountData.branch],
      ["IFSC", accountData.ifsc],
      ["Mobile", accountData.mobile],
      ["Email", accountData.email],
      ["Aadhaar", accountData.aadhaar],
      ["PAN", accountData.pan],
      ["Status", accountData.status],
    ];

    let y = 40;
    data.forEach(([label, value]) => {
      doc.text(`${label}: ${value}`, 20, y);
      y += 10;
    });

    doc.save("Account_Details.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-6 shadow-sm">

        {/* HEADER */}
        <div className="relative mb-6">

          {/* Center Title */}
          <h2 className="text-2xl font-semibold text-blue-900 text-center">
            Account Details
          </h2>

          {/* Download Button */}
        <button
  onClick={downloadPDF}
  className="absolute right-0 top-0 w-full md:w-40 bg-[#6F5FE7] 
             hover:bg-[#5b4ec2] text-white font-semibold 
             rounded-xl py-3.5 transition-all 
             transform active:scale-[0.98] shadow-lg"
>
  <ArrowDownToLineIcon className="w-5 h-5 inline mr-2" />
  Download PDF
</button>
        </div>

        {/* Basic Info */}
        <Section title="Account Information">
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
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-3">
        {title}
      </h3>

      <div className="grid md:grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  );
}

/* ---------- Detail ---------- */

function Detail({ label, value }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg border">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-base font-semibold text-gray-800 leading-tight">
        {value}
      </p>
    </div>
  );
}