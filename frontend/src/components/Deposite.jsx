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
    <div className="min-h-screen bg-gray-100 py-12 px-4">

      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-10">

        {/* HEADER */}
        <div className="text-center mb-10 border-b pb-6">
          <h2 className="text-4xl font-bold text-blue-900">
            Deposit Money
          </h2>
          <p className="text-gray-500 mt-2">
            Secure Transaction Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* ACCOUNT DETAILS */}
          <Section title="Account Details">
            <Input name="accountNumber" placeholder="Account Number" handleChange={handleChange}/>
            <Input name="accountHolder" placeholder="Account Holder Name" handleChange={handleChange}/>

            <select name="accountType" onChange={handleChange} className="input-style">
              <option value="">Select Account Type</option>
              <option>Saving</option>
              <option>Current</option>
            </select>

            <Input name="branch" placeholder="Branch Name" handleChange={handleChange}/>
          </Section>

          {/* DEPOSIT DETAILS */}
          <Section title="Deposit Details">
            <Input name="amount" placeholder="Deposit Amount" handleChange={handleChange}/>

            <select name="depositMode" onChange={handleChange} className="input-style">
              <option value="">Deposit Mode</option>
              <option>Cash</option>
              <option>UPI</option>
              <option>Online Transfer</option>
            </select>

            <Input type="date" name="depositDate" handleChange={handleChange}/>
          </Section>

          {/* CONTACT */}
          <Section title="Depositor Contact">
            <Input name="depositorMobile" placeholder="Mobile Number" handleChange={handleChange}/>
          </Section>

          {/* ADDITIONAL DETAILS */}
          <Section title="Additional Details">

            <select
              name="receiptPreference"
              onChange={handleChange}
              className="input-style"
            >
              <option value="">Receipt Preference</option>
              <option>SMS</option>
              <option>Email</option>
              <option>Printed Receipt</option>
            </select>

            <textarea
              name="remark"
              placeholder="Remark (Optional)"
              onChange={handleChange}
              className="input-style md:col-span-2 h-24"
            />

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
                Refresh
              </button>
            </div>

            <input
              type="text"
              name="captchaInput"
              placeholder="Enter Captcha"
              onChange={handleChange}
              className="input-style mt-4"
              required
            />
          </div>

          {/* TERMS */}
          <div className="flex gap-3 items-start">
            <input type="checkbox" name="agree" onChange={handleChange}/>
            <p className="text-sm text-gray-600">
              I confirm that the provided information is correct.
            </p>
          </div>

          {/* SUBMIT */}
          <button className="w-full bg-blue-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-800 transition">
            Submit Deposit
          </button>

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

function Input({ type="text", name, placeholder, handleChange }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      className="input-style border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
      required
    />
  );
}
