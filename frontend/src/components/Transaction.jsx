import { FileDown, Clock, CreditCard } from "lucide-react";

export default function Transactions({ sidebarOpen = true }) {

  // 5 Dummy Real-Time Records
  const transactions = [
    {
      id: "TXN1001",
      date: "08-02-2026",
      time: "10:32 AM",
      type: "Deposit",
      amount: 5000,
      balance: 15000,
      status: "Success",
    },
    {
      id: "TXN1002",
      date: "08-02-2026",
      time: "11:10 AM",
      type: "Withdraw",
      amount: 2000,
      balance: 13000,
      status: "Success",
    },
    {
      id: "TXN1003",
      date: "08-02-2026",
      time: "12:05 PM",
      type: "Deposit",
      amount: 3000,
      balance: 16000,
      status: "Success",
    },
    {
      id: "TXN1004",
      date: "08-02-2026",
      time: "01:20 PM",
      type: "Withdraw",
      amount: 1000,
      balance: 15000,
      status: "Success",
    },
    {
      id: "TXN1005",
      date: "08-02-2026",
      time: "02:45 PM",
      type: "Deposit",
      amount: 4000,
      balance: 19000,
      status: "Success",
    },
  ];

  const downloadPDF = () => {
    alert("PDF Download will be generated here (Backend integration needed)");
  };

  return (
    <div
      className={`mt-12 px-6 transition-all duration-300 ${
        sidebarOpen ? "ml-64" : "ml-20"
      }`}
    >
      <div className="bg-white/80 backdrop-blur-lg border border-blue-200 shadow-2xl rounded-2xl p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <CreditCard size={32} className="text-blue-700" />
            <h2 className="text-2xl font-bold text-blue-900">
              Transaction Statement
            </h2>
          </div>

          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-lg"
          >
            <FileDown size={20} />
            Download PDF
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-50">
              <tr>
                <th className="p-3 text-left">Txn ID</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Amount (₹)</th>
                <th className="p-3 text-left">Balance (₹)</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-t hover:bg-blue-50">
                  <td className="p-3 font-medium">{txn.id}</td>
                  <td className="p-3">{txn.date}</td>
                  <td className="p-3 flex items-center gap-1">
                    <Clock size={16} className="text-gray-500" />
                    {txn.time}
                  </td>
                  <td className="p-3">{txn.type}</td>
                  <td className="p-3 font-semibold">₹ {txn.amount}</td>
                  <td className="p-3 font-semibold">₹ {txn.balance}</td>
                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
