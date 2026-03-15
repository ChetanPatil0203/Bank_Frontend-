import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";

import HeaderSection  from "./components/HeaderSection/HeaderSection.jsx";
import Sidebar        from "./components/Dashboard/Dashboard.jsx";
import CreateAccount  from "./components/CreateAccount/CreateAccount.jsx";
import Login          from "./components/Login/Login.jsx";
import Transactions   from "./components/Transaction/Transaction.jsx";
import Logout         from "./components/Logout/Logout.jsx";
import OpenAccount    from "./components/OpenAccount/OpenAccount.jsx";
import ProfilePage    from "./components/Profile/Profile.jsx";
import HelpSupport    from "./components/HelpSupport/HelpSupport.jsx";
import KYCPage        from "./components/kyc/kyc.jsx";
import DashboardHome  from "./components/DashboardHome/DashboardHome.jsx";
import Registration   from "./components/Registration/Registration.jsx";
import AccountDetails from "./components/AccountDetail/AccountDetails.jsx";
import Settings       from "./components/Setting/Setting.jsx";
import SplashScreen   from "./components/SplashScreen/SplashScreen.jsx";
import ForgotPassword from "./components/Forgot/Forgot.jsx";
import DashboarPage   from "./components/AdminDashboad/admindashboard.jsx";
import AdminLogin     from "./components/AdminLogin/adminlogin.jsx";
import AdminLogout    from "./components/Adminlogout/adminlogout.jsx";  // ← नवीन


function AppContent() {
  const location = useLocation();

  const noLayoutPages = ["/", "/login", "/registration", "/forgot", "/adminlogin", "/adminlogout"];
  const showLayout = !noLayoutPages.includes(location.pathname) &&
                     !location.pathname.startsWith("/admindashbord");

  return (
    <>
      {showLayout && <HeaderSection />}
      <div className="flex">
        {showLayout && <Sidebar />}
        <div className={showLayout ? "ml-64 w-full p-6" : "w-full"}>
          <Routes>
            {/* Public Pages */}
            <Route path="/"             element={<SplashScreen />} />
            <Route path="/login"        element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forgot"       element={<ForgotPassword />} />
            <Route path="/adminlogin"   element={<AdminLogin />} />

            {/* Protected Pages */}
            <Route path="/dashboard"      element={<DashboardHome />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/open-account"   element={<OpenAccount />} />
            <Route path="/profile"        element={<ProfilePage />} />
            <Route path="/transactions"   element={<Transactions />} />
            <Route path="/details"        element={<AccountDetails />} />
            <Route path="/kyc"            element={<KYCPage />} />
            <Route path="/helpsupport"    element={<HelpSupport />} />
            <Route path="/setting"        element={<Settings />} />
            <Route path="/logout"         element={<Logout />} />

            {/* Admin Logout — ← नवीन */}
            <Route path="/adminlogout"   element={<AdminLogout />} />

            <Route path="/admindashbord"    element={<Navigate to="/admindashbord/dashboard" replace />} />
            <Route path="/admindashbord/*"  element={<Navigate to="/admindashbord/dashboard" replace />} />

          </Routes>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;