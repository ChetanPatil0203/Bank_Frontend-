import { 
  Eye, EyeOff, ArrowDownToLine, ArrowUpFromLine, 
  UserCircle, BookUser, CheckCircle, 
  Receipt, Headset, Wallet,
  Plane, Hotel, ShoppingBag, TvMinimal
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardHome() {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const quickActions = [
    { name: "Deposit Money", icon: <ArrowDownToLine size={28} />, path: "/deposit" },
    { name: "Withdraw", icon: <ArrowUpFromLine size={28} />, path: "/withdraw" },
    { name: "My Profile", icon: <UserCircle size={28} />, path: "/profile" },
    { name: "View Account", icon: <BookUser size={28} />, path: "/balance" },
    { name: "KYC Verification", icon: <CheckCircle size={28} />, path: "/kyc" },
    { name: "Transactions", icon: <Receipt size={28} />, path: "/transactions" },
    { name: "Help & Support", icon: <Headset size={28} />, path: "/helpsupport" },
    { name: "My Wallet", icon: <Wallet size={28} />, path: "/wallet" },
  ];

  const shoppingActions = [
    { name: "Book Flights", icon: <Plane size={28} />, path: "/flights" },
    { name: "Book Hotels", icon: <Hotel size={28} />, path: "/hotels" },
    { name: "Shop & Earn", icon: <ShoppingBag size={28} />, path: "/shop" },
    { name: "Entertainment", icon: <TvMinimal size={28} />, path: "/entertainment" },
  ];

  return (
    <div className="min-h-screen p-8 flex justify-center">
      <div className="w-full max-w-4xl">

        <h1 className="text-2xl font-semibold mb-6">
          ACCOUNT OVERVIEW
        </h1>

        {/* ===== BANK CARD (UNCHANGED) ===== */}
        <div className="bg-gradient-to-b from-[#0047AB]/90 to-[#0047AB]/70  
                        rounded-2xl shadow-xl p-6 text-white mb-8">

          <div className="mb-6">
            <h2 className="text-gray-200 font-medium">
              My Saving A/C
            </h2>

            <p className="text-lg font-semibold tracking-wider">
              {showDetails ? "1234 5678 9012 0123" : "XXXXXXXX 123"}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-200">Account Balance</p>
              <p className="text-2xl font-bold">
                {showDetails ? "₹ 50,000" : "₹ *****"}
              </p>
            </div>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 bg-white text-blue-700 
                         px-4 py-2 rounded-lg font-semibold 
                         hover:bg-gray-100 transition"
            >
              {showDetails ? "Hide" : "Show"}
              {showDetails ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* ===== QUICK ACTIONS ===== */}
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="bg-white rounded-xl shadow p-5 flex flex-col 
                         items-center justify-center text-center hover:shadow-md 
                         transition cursor-pointer"
            >
              <div className="bg-blue-50 text-blue-600 p-4 rounded-full mb-2">
                {item.icon}
              </div>
              <p className="text-sm font-semibold">{item.name}</p>
            </div>
          ))}
        </div>

        {/* ===== SHOPPING (SAME DESIGN + CLICKABLE) ===== */}
        <h2 className="text-lg font-semibold mb-4">Shopping</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {shoppingActions.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="bg-white rounded-xl shadow p-5 flex flex-col 
                         items-center justify-center text-center hover:shadow-md 
                         transition cursor-pointer"
            >
              <div className="bg-blue-50 text-blue-600 p-4 rounded-full mb-2">
                {item.icon}
              </div>
              <p className="text-sm font-semibold">{item.name}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default DashboardHome;
