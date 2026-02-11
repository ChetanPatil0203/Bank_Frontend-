import { RotateCw } from "lucide-react";
import { useState } from "react";

export default function DepositMoney() {

  const generateCaptcha = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

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

    if (!formData.agree) {
      alert("Accept Terms & Conditions");
      return;
    }

    if (formData.captchaInput !== captcha) {
      alert("Invalid Captcha");
      return;
    }

    alert("Deposit Successful ✅");
    setCaptcha(generateCaptcha());
  };

  return (
    <div className="min-h-screen py-12 px-4">

      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-10">

        {/* HEADER */}
        <div className="text-center mb-10 border-b pb-6">
          <h2 className="text-2xl font-medium text-blue-900">
            Deposit Money
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* ACCOUNT DETAILS */}
          <Section title="Account Details">

            <Input label="Account Number" name="accountNumber" handleChange={handleChange}/>
            <Input label="Account Holder Name" name="accountHolder" handleChange={handleChange}/>

            <Select
              label="Account Type"
              name="accountType"
              options={["Saving","Current"]}
              handleChange={handleChange}
            />

            <Input label="Branch Name" name="branch" handleChange={handleChange}/>

          </Section>

          {/* DEPOSIT DETAILS */}
          <Section title="Deposit Details">

            <Input label="Deposit Amount" name="amount" handleChange={handleChange}/>

            <Select
              label="Deposit Mode"
              name="depositMode"
              options={["Cash","UPI","Online Transfer"]}
              handleChange={handleChange}
            />

            <Input
              label="Deposit Date"
              type="date"
              name="depositDate"
              handleChange={handleChange}
            />

          </Section>

          {/* CONTACT */}
          <Section title="Depositor Contact">
            <Input
              label="Mobile Number"
              name="depositorMobile"
              handleChange={handleChange}
            />
          </Section>

          {/* ADDITIONAL DETAILS */}
          <Section title="Additional Details">

            <Select
              label="Receipt Preference"
              name="receiptPreference"
              options={["SMS","Email","Printed Receipt"]}
              handleChange={handleChange}
            />

            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="label-style">
                Remark <span className="text-red-500">*</span>
              </label>

              <textarea
                name="remark"
                onChange={handleChange}
                className="input-style h-24"
                required
              />
            </div>

          </Section>

          {/* CAPTCHA */}
          <div className="bg-gray-50 p-6 rounded-xl border">
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
                className="text-blue-600 font-medium"
              >
                
                <RotateCw/>
                
        
              </button>
            </div>

            <div className="mt-4">
              <label className="label-style">
                Enter Captcha <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="captchaInput"
                onChange={handleChange}
                className="input-style"
                required
              />
            </div>
          </div>

          {/* TERMS */}
          <div className="flex gap-3 items-start">
            <input type="checkbox" name="agree" onChange={handleChange}/>
            <p className="text-sm text-gray-600">
              I confirm that the provided information is correct.
            </p>
          </div>

         {/* SUBMIT */}
<div className="flex justify-center pt-4">
  <button className="px-10 py-3 bg-blue-800 text-white rounded-md font-medium text-base 
                 shadow-md hover:shadow-lg 
                transition-all tracking-wide">
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
    <div className="border rounded-xl p-6 bg-white">
      <h3 className="text-xl font-semibold text-blue-900 mb-5 border-b pb-2">
        {title}
      </h3>

      <div className="grid md:grid-cols-2 gap-5">
        {children}
      </div>
    </div>
  );
}

function Input({ label, type="text", name, handleChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="label-style">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        type={type}
        name={name}
        onChange={handleChange}
        className="input-style"
        required
      />
    </div>
  );
}

function Select({ label, name, options, handleChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="label-style">
        {label} <span className="text-red-500">*</span>
      </label>

      <select
        name={name}
        onChange={handleChange}
        className="input-style"
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
