import { RotateCw } from "lucide-react";
import { useState } from "react";

export default function DepositMoney() {

  const generateCaptcha = () => Math.floor(1000 + Math.random() * 9000).toString();
  const [captcha, setCaptcha] = useState(generateCaptcha());

  const [formData, setFormData] = useState({
    accountNumber: "",
    accountHolder: "",
    branch: "",
    amount: "",
    depositMode: "",
    depositDate: "",
    depositorMobile: "",
    accountType: "",
    remark: "",
    receiptPreference: "",
    captchaInput: "",
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) return alert("Accept Terms & Conditions");
    if (formData.captchaInput !== captcha) return alert("Invalid Captcha");
    alert("Deposit Successful ✅");
    setCaptcha(generateCaptcha());
  };

  return (
    <div className="min-h-screen py-6 px-4 bg-gray-50">

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        {/* HEADER */}
        <div className="text-center mb-2">
          <h2 className="text-xl font-semibold text-blue-900 leading-tight">
            Deposit Money
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <Section title="Account Details">
            <Input label="Account Number" name="accountNumber" handleChange={handleChange}/>
            <Input label="Account Holder Name" name="accountHolder" handleChange={handleChange}/>
            <Select label="Account Type" name="accountType" options={["Saving","Current"]} handleChange={handleChange}/>
            <Input label="Branch Name" name="branch" handleChange={handleChange}/>
          </Section>

          <Section title="Deposit Details">
            <Input label="Deposit Amount" name="amount" handleChange={handleChange}/>
            <Select label="Deposit Mode" name="depositMode" options={["Cash","UPI","Online Transfer"]} handleChange={handleChange}/>
            <Input label="Deposit Date" type="date" name="depositDate" handleChange={handleChange}/>
          </Section>

          <Section title="Depositor Contact">
            <Input label="Mobile Number" name="depositorMobile" handleChange={handleChange}/>
          </Section>

          <Section title="Additional Details">
            <Select label="Receipt Preference" name="receiptPreference" options={["SMS","Email","Printed Receipt"]} handleChange={handleChange}/>
            <Textarea label="Remark" name="remark" handleChange={handleChange}/>
          </Section>

          {/* CAPTCHA */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-base font-semibold text-blue-900 mb-2 leading-tight">
              Security Verification
            </h3>

            <div className="flex items-center gap-3">
              <div className="bg-gray-200 px-4 py-1 text-lg font-bold tracking-widest rounded-lg">
                {captcha}
              </div>
              <button type="button" onClick={() => setCaptcha(generateCaptcha())} className="text-blue-600">
                <RotateCw/>
              </button>
            </div>

            <div className="mt-3">
              <label className="text-sm font-medium text-gray-700">
                Enter Captcha <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="captchaInput"
                onChange={handleChange}
                className="rounded-xl p-2 bg-white border w-full focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="flex gap-2 items-start">
            <input type="checkbox" name="agree" onChange={handleChange}/>
            <p className="text-xs text-gray-600">
              I confirm that the provided information is correct.
            </p>
          </div>

          <div className="flex justify-center">
            <button className="px-8 py-2 bg-blue-800 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition">
              Deposit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Section({ title, children }) {
  return (
    <div className="rounded-xl p-3 bg-gray-50">
      <h3 className="text-base font-semibold text-blue-900 mb-1 leading-tight">
        {title}
      </h3>
      <div className="grid md:grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  );
}

function Input({ label, type="text", name, handleChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        className="rounded-xl p-2 bg-white border focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
    </div>
  );
}

function Select({ label, name, options, handleChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        name={name}
        onChange={handleChange}
        className="rounded-xl p-2 bg-white border focus:ring-2 focus:ring-blue-500 outline-none"
        required
      >
        <option value="">Select {label}</option>
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function Textarea({ label, name, handleChange }) {
  return (
    <div className="flex flex-col gap-1 md:col-span-2">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <textarea
        name={name}
        onChange={handleChange}
        className="rounded-xl p-2 bg-white border h-20 focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
    </div>
  );
}