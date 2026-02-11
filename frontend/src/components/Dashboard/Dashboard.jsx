import {
  LayoutDashboard,
  UserPlus,
  UserCheck,
  Wallet,
  CreditCard,
  Activity,
  CheckCircle,
  LogIn,
  LogOut,
  CircleUserRound,
  ArrowLeftRight,
  Headphones,
  BadgeCheckIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Dashboard() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true); // Sidebar open/close state

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "My Profile", icon: <CircleUserRound size={20} />, path: "/profile" },
    { name: "Open New Account", icon: <UserCheck size={20} />, path: "/open-account" },
    { name: "Deposit Money", icon: <CreditCard size={20} />, path: "/deposit" },
    { name: "Withdraw Money", icon: < Wallet size={20} />, path: "/withdraw" },
    { name: "KYC Verification", icon: <BadgeCheckIcon size={20} />, path:"/kyc"},
    { name: "Transaction History", icon: <ArrowLeftRight size={20} />, path: "/transactions" },
    { name: "Account Balance", icon: <CheckCircle size={20} />, path: "/balance" },
    { name: "Help & Support", icon: <Headphones size={20} />, path: "/helpsupport" },
    { name: "Logout", icon: <LogOut size={20} />, path: "/logout" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-blue-900 text-white px-5 py-2 rounded-lg backdrop-blur-md border-r border-white/20 shadow-lg p-4 flex flex-col text-white z-50 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleSidebar}
          className="text-white p-2 rounded-md hover:bg-white/20 transition"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Logo */}
      <div
        className={`flex flex-col items-center mb-8 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <Wallet size={36} className="mb-2" />
        <h2 className="text-lg font-semibold">SBI Banking</h2>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              location.pathname === item.path
                ? "bg-white/20 text-white font-semibold"
                : "text-white hover:bg-white/10"
            }`}
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </Link>
          
        ))}
      </nav>
    </aside>
  );
}

export default Dashboard;