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
    <>
      {showLayout && <HeaderSection sidebarOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />}
      <AIChat />
      <div className="flex">
        {showLayout && <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />}
        <div 
          className={showLayout 
            ? `transition-all duration-[280ms] ease-in-out w-full p-0 md:p-6 ${sidebarOpen ? "md:ml-[230px]" : "md:ml-[60px]"}`
            : "w-full"
          }
        >

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
      </div>
    </>
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