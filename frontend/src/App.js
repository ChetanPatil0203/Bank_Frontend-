import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import jsPDF from "jspdf";

import HeaderSection from "./components/HeaderSection/HeaderSection.jsx";
import Sidebar from "./components/Dashboard/Dashboard.jsx";
import CreateAccount from "./components/CreateAccount/CreateAccount.jsx";
import Login from "./components/Login/Login.jsx";
import Deposit from "./components/Deposite/Deposite.jsx";
import Withdraw from "./components/Withdraw/Withdraw.jsx";
import Transactions from "./components/Transaction/Transaction.jsx";
import Logout from "./components/Logout/Logout.jsx";
import OpenAccount from "./components/OpenAccount/OpenAccount.jsx";
import ProfilePage from "./components/Profile/Profile.jsx";
import HelpSupport from "./components/HelpSupport/HelpSupport.jsx"
import KYCPage from "./components/kyc/kyc.jsx";
import DashboardHome from "./components/DashboardHome/DashboardHome.jsx";
import Registration from "./components/Registration/Registration.jsx";
import AccountDetails from"./components/AccountDetail/AccountDetails.jsx"
import Settings from"./components/Setting/Setting.jsx"


function AppContent() {
  const location = useLocation();
  
  // Pages जिथे Header आणि Sidebar नको आहेत
  const noLayoutPages = ["/", "/login"];
  const showLayout = !noLayoutPages.includes(location.pathname);

  return (
    <>
      {showLayout && <HeaderSection />}

      <div className="flex">
        {showLayout && <Sidebar />}

        {/* Main content area */}
        <div className={showLayout ? "ml-64 w-full p-6" : "w-full"}>
          <Routes>
            <Route path="/" element={<Registration/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/deposit" element={<Deposit/>} />
            <Route path="/withdraw" element={<Withdraw/>} />
            <Route path="/details" element={<AccountDetails/>} />
            <Route path="/transactions" element={<Transactions/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/open-account" element={<OpenAccount/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/helpsupport" element={<HelpSupport/>}/>
            <Route path="/setting" element={<Settings/>}/>
            <Route path="/kyc" element={<KYCPage/>}/>
            <Route path="/flights" element={<h2>Flights Page</h2>} />
            <Route path="/hotels" element={<h2>Hotels Page</h2>} />
            <Route path="/shop" element={<h2>Shop & Earn Page</h2>} />  
            <Route path="/entertainment" element={<h2>Entertainment Page</h2>} />
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