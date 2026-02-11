import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HeaderSection from "./components/HeaderSection/HeaderSection.jsx";
import Sidebar from "./components/Dashboard/Dashboard.jsx";
import CreateAccount from "./components/CreateAccount/CreateAccount.jsx";
import Login from "./components/Login/Login.jsx";
import Deposit from "./components/Deposite/Deposite.jsx";
import Withdraw from "./components/Withdraw/Withdraw.jsx";
import BalanceCheck from "./components/BalanceCheck/BalanceCheck.jsx";
import Transactions from "./components/Transaction/Transaction.jsx";
import Logout from "./components/Logout/Logout.jsx";
import OpenAccount from "./components/OpenAccount/OpenAccount.jsx";
import ProfilePage from "./components/Profile/Profile.jsx";
import HelpSupport from "./components/HelpSupport/HelpSupport.jsx"
import KYCPage from "./components/kyc/kyc.jsx";
import DashboardHome from "./components/DashboardHome/DashboardHome.jsx";



const Home = () => <h2 className="p-6">Dashboard Page</h2>;

function App() {
  return (
    <Router>
      <HeaderSection />

      <div className="flex">
        <Sidebar />

        {/* Main content area */}
        <div className="ml-64 w-full p-6">
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/deposit" element={<Deposit/>} />
      <Route path="/withdraw" element={<Withdraw/>} />
      <Route path="/balance" element={<BalanceCheck/>} />
      <Route path="/transactions" element={<Transactions/>} />
      <Route path="/logout" element={<Logout/>} />
      <Route path="/open-account" element={<OpenAccount/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/helpsupport" element={<HelpSupport/>}/>
      <Route path="/kyc" element={<KYCPage/>}/>
      <Route path="/flights" element={<h2>Flights Page</h2>} />
      <Route path="/hotels" element={<h2>Hotels Page</h2>} />
      <Route path="/shop" element={<h2>Shop & Earn Page</h2>} />  
      <Route path="/entertainment" element={<h2>Entertainment Page</h2>} />
    </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;
