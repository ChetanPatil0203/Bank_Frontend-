import { useState } from "react";
import { CreditCard, Wallet, X } from "lucide-react";

export default function BalanceCheck({ sidebarOpen = true }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const fakeBalance = 12500; // 👉 Backend मधून येईल
      setBalance(fakeBalance);
      setShowPopup(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div
      className={`flex justify-center mt-16 px-4 transition-all duration-300 ${
        sidebarOpen ? "ml-64" : "ml-20"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-lg border border-blue-200 shadow-2xl rounded-2xl p-10 w-full max-w-2xl space-y-6"
      >
        <div className="text-center">
          <CreditCard size={40} className="mx-auto text-blue-700 mb-2" />
          <h2 className="text-2xl font-bold text-blue-900">
            Check Account Balance
          </h2>
        </div>

        <label className="block text-gray-800 font-medium mb-1">
          Account Number
        </label>
        <input
          type="number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Enter account number"
          required
          className="w-full border border-blue-300 rounded-2xl p-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-2xl py-3 font-medium hover:bg-blue-700 transition"
        >
          {loading ? "Checking..." : "Check Balance"}
        </button>
      </form>

      {/* POPUP MODAL */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative text-center">
            
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
            >
              <X size={22} />
            </button>

            <Wallet size={50} className="mx-auto text-blue-700 mb-3" />

            <h3 className="text-xl font-semibold text-blue-900">
              Account Balance
            </h3>

            <p className="text-3xl font-bold text-green-600 mt-3">
              ₹ {balance}
            </p>

            <p className="text-gray-600 text-sm mt-2">
              Account No: {accountNumber}
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
