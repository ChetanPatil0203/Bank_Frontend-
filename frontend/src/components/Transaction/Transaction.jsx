import { useState } from "react";
import {
  Wallet,
  Search,
  Calendar,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";

export default function TransactionHistory() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const currentBalance = "₹45,800";

  const transactions = [
    { id: 1, type: "Deposit", amount: "₹10,000", date: "2026-02-05", time: "10:45 AM", status: "Success", user: "Chetan Patil" },
    { id: 2, type: "Withdraw", amount: "₹2,500", date: "2026-02-04", time: "03:20 PM", status: "Success", user: "Chetan Patil" },
    { id: 3, type: "Deposit", amount: "₹5,000", date: "2026-02-02", time: "11:10 AM", status: "Success", user: "Rahul Sharma" },
  ];

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.type.toLowerCase().includes(search.toLowerCase()) ||
      txn.user.toLowerCase().includes(search.toLowerCase());

    const matchesDate = dateFilter === "" || txn.date === dateFilter;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* BALANCE CARD */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-6 flex justify-between items-center shadow-lg mb-6">
          <div>
            <p className="text-sm opacity-80">Current Balance</p>
            <h2 className="text-3xl font-bold">{currentBalance}</h2>
          </div>
          <Wallet size={42} />
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center border rounded-xl px-4 py-3 bg-white shadow-sm">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by user or type..."
              className="ml-2 w-full bg-transparent outline-none text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center border rounded-xl px-4 py-3 bg-white shadow-sm">
            <Calendar size={18} className="text-gray-400" />
            <input
              type="date"
              className="ml-2 w-full bg-transparent outline-none text-gray-700"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>

        {/* TRANSACTIONS */}
        <div className="bg-white rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-xl font-semibold text-blue-900 border-b pb-2 mb-4">
            Recent Transactions
          </h3>

          <div className="space-y-3">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex justify-between items-center p-4 rounded-xl border hover:shadow-lg transition bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${txn.type === "Deposit" ? "bg-green-100" : "bg-red-100"}`}>
                      {txn.type === "Deposit" ? (
                        <ArrowDownCircle size={22} className="text-green-600" />
                      ) : (
                        <ArrowUpCircle size={22} className="text-red-600" />
                      )}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">{txn.type}</p>
                      <p className="text-sm text-gray-500">{txn.date} • {txn.time}</p>
                      <p className="text-sm text-gray-600">User: <span className="font-medium">{txn.user}</span></p>
                    </div>
                  </div>

                  <div className={`text-lg font-bold ${txn.type === "Deposit" ? "text-green-600" : "text-red-600"}`}>
                    {txn.type === "Deposit" ? "+ " : "- "} {txn.amount}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-6">
                No transactions found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
