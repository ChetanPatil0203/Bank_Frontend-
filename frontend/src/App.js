import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import { LanguageProvider } from "./context/LanguageContext";

import HeaderSection from "./components/HeaderSection/HeaderSection.jsx";
import Sidebar from "./components/Dashboard/Dashboard.jsx";
import CreateAccount from "./components/CreateAccount/CreateAccount.jsx";
import Login from "./components/Login/Login.jsx";
import Transactions from "./components/Transaction/Transaction.jsx";
import Logout from "./components/Logout/Logout.jsx";
import OpenAccount from "./components/OpenAccount/OpenAccount.jsx";
import ProfilePage from "./components/Profile/Profile.jsx";
import HelpSupport from "./components/HelpSupport/HelpSupport.jsx";
import KYCPage from "./components/kyc/kyc.jsx";
import DashboardHome from "./components/DashboardHome/DashboardHome.jsx";
import Registration from "./components/Registration/Registration.jsx";
import AccountDetails from "./components/AccountDetail/AccountDetails.jsx";
import Settings from "./components/Setting/Setting.jsx";
import SplashScreen from "./components/SplashScreen/SplashScreen.jsx";
import ForgotPassword from "./components/Forgot/Forgot.jsx";
import DashboarPage from "./components/AdminDashboad/admindashboard.jsx";
import AdminLogin from "./components/AdminLogin/adminlogin.jsx";
import AdminLogout from "./components/Adminlogout/adminlogout.jsx";
import AIChat from "./components/AIChat/AIChat.jsx";
import MoneyTransfer from "./components/MoneyTransfer/MoneyTransfer.jsx";
import BalanceCheck from "./components/BalanceCheck/BalanceCheck.jsx";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const noLayoutPages = ["/", "/login", "/registration", "/forgot", "/adminlogin", "/adminlogout"];
  const showLayout = !noLayoutPages.includes(location.pathname) &&
    !location.pathname.startsWith("/admindashboard")

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex flex-col overflow-hidden">
      <style>{`
        body { margin: 0; padding: 0; overflow: hidden; width: 100%; height: 100vh; font-family: 'Inter', sans-serif; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
      
      {/* 1. TOP HEADER (Full Width) */}
      {showLayout && (
        <div className="flex-shrink-0 z-50">
          <HeaderSection sidebarOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        </div>
      )}

      <AIChat />

      {/* 2. MAIN BODY (Sidebar + Content) */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* SIDEBAR */}
        {showLayout && (
          <div className={`flex-shrink-0 transition-all duration-[280ms] ease-in-out z-40
            ${sidebarOpen ? "w-[230px]" : "w-[60px]"}`}>
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          </div>
        )}

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#f8fafc] relative">
          <div className={showLayout ? "p-4 md:p-8 max-w-[1600px] mx-auto" : "w-full"}>
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<SplashScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/adminlogin" element={<AdminLogin />} />

              {/* Protected Pages */}
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/deposit" element={<MoneyTransfer />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/open-account" element={<OpenAccount />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/details" element={<AccountDetails />} />
              <Route path="/balance-check" element={<BalanceCheck />} />
              <Route path="/kyc" element={<KYCPage />} />
              <Route path="/helpsupport" element={<HelpSupport />} />
              <Route path="/setting" element={<Settings />} />
              <Route path="/logout" element={<Logout />} />

              <Route path="/admindashboard" element={<Navigate to="/admindashboard/dashboard" replace />} />
              <Route path="/admindashboard/*" element={<DashboarPage />} />
              <Route path="/adminlogout" element={<AdminLogout />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;