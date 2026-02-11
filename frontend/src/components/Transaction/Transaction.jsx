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
    {
      id: 1,
      type: "Deposit",
      amount: "₹10,000",
      date: "2026-02-05",
      time: "10:45 AM",
      status: "Success",
      user: "Chetan Patil",
    },
    {
      id: 2,
      type: "Withdraw",
      amount: "₹2,500",
      date: "2026-02-04",
      time: "03:20 PM",
      status: "Success",
      user: "Chetan Patil",
    },
    {
      id: 3,
      type: "Deposit",
      amount: "₹5,000",
      date: "2026-02-02",
      time: "11:10 AM",
      status: "Success",
      user: "Rahul Sharma",
    },
  ];

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.type.toLowerCase().includes(search.toLowerCase()) ||
      txn.user.toLowerCase().includes(search.toLowerCase());

    const matchesDate = dateFilter === "" || txn.date === dateFilter;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* MAIN CARD */}
        <div className="bg-white shadow-xl rounded-3xl p-6 space-y-6">
          {/* TOP BALANCE */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Current Balance</p>
              <h2 className="text-3xl font-bold">{currentBalance}</h2>
            </div>
            <Wallet size={42} />
          </div>

          {/* FILTER SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Box */}
            <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-50">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search by user or type..."
                className="ml-2 w-full bg-transparent outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Date Filter */}
            <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-50">
              <Calendar size={18} className="text-gray-500" />
              <input
                type="date"
                className="ml-2 w-full bg-transparent outline-none"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>

          {/* TRANSACTION LIST */}
          <div>
            <h3 className="text-xl font-semibold text-blue-900 mb-4 border-b pb-2">
              Recent Transactions
            </h3>

            <div className="space-y-3">
              {filteredTransactions.map((txn) => (
                <div
                  key={txn.id}
                  className="border rounded-xl p-4 flex justify-between items-center bg-white hover:shadow-lg transition"
                >
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-full ${
                        txn.type === "Deposit"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {txn.type === "Deposit" ? (
                        <ArrowDownCircle
                          className="text-green-600"
                          size={22}
                        />
                      ) : (
                        <ArrowUpCircle className="text-red-600" size={22} />
                      )}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {txn.type}
                      </p>
                      <p className="text-sm text-gray-500">
                        {txn.date} • {txn.time}
                      </p>
                      <p className="text-sm text-gray-600">
                        User:{" "}
                        <span className="font-medium">{txn.user}</span>
                      </p>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div
                    className={`text-lg font-bold ${
                      txn.type === "Deposit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {txn.type === "Deposit" ? "+ " : "- "} {txn.amount}
                  </div>
                </div>
              ))}

              {filteredTransactions.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No transactions found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
