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
<<<<<<< Updated upstream
    <div className="min-h-screen py-6 px-4 bg-gray-50">

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        {/* HEADER */}
        <div className="text-center mb-2">
          <h2 className="text-xl font-semibold text-blue-900 leading-tight">
=======
    <div className="min-h-screen py-12 px-4 bg-gray-100">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-10">

        {/* HEADER */}
        <div className="text-center mb-10 pb-6">
          <h2 className="text-2xl font-medium text-blue-900">
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
          {/* ADDITIONAL */}
>>>>>>> Stashed changes
          <Section title="Additional Details">
            <Select label="Receipt Preference" name="receiptPreference" options={["SMS","Email","Printed Receipt"]} handleChange={handleChange}/>
            <Textarea label="Remark" name="remark" handleChange={handleChange}/>
          </Section>

          {/* CAPTCHA */}
<<<<<<< Updated upstream
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-base font-semibold text-blue-900 mb-2 leading-tight">
              Security Verification
            </h3>

            <div className="flex items-center gap-3">
              <div className="bg-gray-200 px-4 py-1 text-lg font-bold tracking-widest rounded-lg">
                {captcha}
              </div>
              <button type="button" onClick={() => setCaptcha(generateCaptcha())} className="text-blue-600">
=======
          <div className="p-6 bg-white">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Security Verification
            </h3>

            <div className="flex items-center gap-4">
              <div className="bg-gray-200 px-5 py-2 text-xl font-bold tracking-widest rounded-lg">
                {captcha}
              </div>

              <button
                type="button"
                onClick={() => setCaptcha(generateCaptcha())}
                className="text-blue-600"
              >
>>>>>>> Stashed changes
                <RotateCw/>
              </button>
            </div>

<<<<<<< Updated upstream
            <div className="mt-3">
              <label className="text-sm font-medium text-gray-700">
                Enter Captcha <span className="text-red-500">*</span>
              </label>
=======
            <div className="mt-4">
              <label className="font-medium">
                Enter Captcha <span className="text-red-500">*</span>
              </label>

>>>>>>> Stashed changes
              <input
                type="text"
                name="captchaInput"
                onChange={handleChange}
<<<<<<< Updated upstream
                className="rounded-xl p-2 bg-white border w-full focus:ring-2 focus:ring-blue-500 outline-none"
=======
                className="rounded-xl p-3 w-full bg-gray-50 mt-1
                focus:ring-2 focus:ring-blue-500 outline-none"
>>>>>>> Stashed changes
                required
              />
            </div>
          </div>

          <div className="flex gap-2 items-start">
            <input type="checkbox" name="agree" onChange={handleChange}/>
<<<<<<< Updated upstream
            <p className="text-xs text-gray-600">
=======
            <p className="text-sm text-gray-600">
>>>>>>> Stashed changes
              I confirm that the provided information is correct.
            </p>
          </div>

<<<<<<< Updated upstream
          <div className="flex justify-center">
            <button className="  w-full md:w-32 
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
            shadow-lg">
=======
          {/* SUBMIT */}
          <div className="flex justify-center pt-4">
            <button
              className="px-12 py-3 bg-blue-800 text-white rounded-full font-medium tracking-wide"
            >
>>>>>>> Stashed changes
              Deposit
            </button>
          </div>

        </form>
      </div>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    </div>
  );
}

<<<<<<< Updated upstream
/* ---------- Reusable Components ---------- */

function Section({ title, children }) {
  return (
    <div className="rounded-xl p-3 bg-gray-50">
      <h3 className="text-base font-semibold text-blue-900 mb-1 leading-tight">
        {title}
      </h3>
      <div className="grid md:grid-cols-2 gap-3">
=======
/* ---------- COMPONENTS ---------- */

function Section({ title, children }) {
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-blue-900 mb-5">
        {title}
      </h3>

      <div className="grid md:grid-cols-2 gap-5">
>>>>>>> Stashed changes
        {children}
      </div>
    </div>
  );
}

function Input({ label, type="text", name, handleChange }) {
  return (
<<<<<<< Updated upstream
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
=======
    <div>
      <label className="font-medium">
        {label} <span className="text-red-500">*</span>
      </label>

>>>>>>> Stashed changes
      <input
        type={type}
        name={name}
        onChange={handleChange}
<<<<<<< Updated upstream
        className="rounded-xl p-2 bg-white border focus:ring-2 focus:ring-blue-500 outline-none"
=======
        className="rounded-xl p-3 w-full bg-gray-50 mt-1
        focus:ring-2 focus:ring-blue-500 outline-none"
>>>>>>> Stashed changes
        required
      />
    </div>
  );
}

function Select({ label, name, options, handleChange }) {
  return (
<<<<<<< Updated upstream
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        name={name}
        onChange={handleChange}
        className="rounded-xl p-2 bg-white border focus:ring-2 focus:ring-blue-500 outline-none"
=======
    <div>
      <label className="font-medium">
        {label} <span className="text-red-500">*</span>
      </label>

      <select
        name={name}
        onChange={handleChange}
        className="rounded-xl p-3 w-full bg-gray-50 mt-1
        focus:ring-2 focus:ring-blue-500 outline-none"
>>>>>>> Stashed changes
        required
      >
        <option value="">Select {label}</option>

        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function Textarea({ label, name, handleChange }) {
  return (
<<<<<<< Updated upstream
    <div className="flex flex-col gap-1 md:col-span-2">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <textarea
        name={name}
        onChange={handleChange}
        className="rounded-xl p-2 bg-white border h-20 focus:ring-2 focus:ring-blue-500 outline-none"
=======
    <div className="md:col-span-2">
      <label className="font-medium">
        {label} <span className="text-red-500">*</span>
      </label>

      <textarea
        name={name}
        onChange={handleChange}
        className="rounded-xl p-3 w-full bg-gray-50 mt-1 h-24
        focus:ring-2 focus:ring-blue-500 outline-none"
>>>>>>> Stashed changes
        required
      />
    </div>
  );
}