import { Wallet } from "lucide-react";

export default function TransactionHistory() {

  const currentBalance = "₹45,800";

  const transactions = [
    {
      id: 1,
      type: "Deposit",
      amount: "₹10,000",
      date: "05 Feb 2026",
      time: "10:45 AM",
      status: "Success",
    },
    {
      id: 2,
      type: "Withdraw",
      amount: "₹2,500",
      date: "04 Feb 2026",
      time: "03:20 PM",
      status: "Success",
    },
    {
      id: 3,
      type: "Deposit",
      amount: "₹5,000",
      date: "02 Feb 2026",
      time: "11:10 AM",
      status: "Success",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">

      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-blue-900">
            Transaction History
          </h2>
          <p className="text-gray-500 mt-2">
            View all your account transactions
          </p>
        </div>

        {/* CURRENT BALANCE CARD */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-xl rounded-2xl p-6 flex justify-between items-center">

          {/* Balance Text */}
          <div>
            <h3 className="text-lg">Current Balance</h3>
            <p className="text-3xl font-bold mt-2">{currentBalance}</p>
          </div>

          {/* Icon */}
          <Wallet size={40} className="opacity-80" />

        </div>

        {/* TRANSACTION LIST */}
        <div className="bg-white shadow-xl rounded-2xl p-6">

          <h3 className="text-xl font-semibold text-blue-900 mb-6 border-b pb-3">
            Recent Transactions
          </h3>

          <div className="space-y-4">

            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="border rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"
              >

                {/* LEFT */}
                <div>
                  <p className="font-semibold text-gray-800">
                    {txn.type}
                  </p>

                  <p className="text-sm text-gray-500">
                    {txn.date} • {txn.time}
                  </p>

                  <p className="text-sm text-gray-500">
                    Status: {txn.status}
                  </p>
                </div>

                {/* RIGHT */}
                <div
                  className={`text-lg font-bold ${
                    txn.type === "Deposit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {txn.type === "Deposit" ? "+" : "-"} {txn.amount}
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}
