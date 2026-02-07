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
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Create Account", icon: <UserPlus size={20} />, path: "/create-account" },
    { name: "Open Account", icon: <UserCheck size={20} />, path: "/open-account" },
    { name: "Deposit", icon: <CreditCard size={20} />, path: "/deposit" },
    { name: "Withdraw", icon: <Activity size={20} />, path: "/withdraw" },
    { name: "Transactions", icon: <Activity size={20} />, path: "/transactions" },
    { name: "Balance Check", icon: <CheckCircle size={20} />, path: "/balance" },
    { name: "Login", icon: <LogIn size={20} />, path: "/login" },
    { name: "Logout", icon: <LogOut size={20} />, path: "/logout" },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-[#0047AB]/90 to-[#0047AB]/70 backdrop-blur-md border-r border-white/20 shadow-lg p-6 flex flex-col text-white z-50">
      
      {/* Logo */}
      <div className="text-center mb-8">
        <Wallet size={36} className="mx-auto mb-2" />
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
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
