import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HeaderSection from "./components/HeaderSection.jsx";
import Sidebar from "./components/Dashboard.jsx";
import CreateAccount from "./components/CreateAccount.jsx";
import Login from "./components/Login.jsx";
import Deposit from "./components/Deposite.jsx";
import Withdraw from "./components/Withdraw.jsx";
import BalanceCheck from "./components/BalanceCheck.jsx";

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
            <Route path="/" element={<Home />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path ="/login" element={<Login/>} />
            <Route path ="/deposit" element={<Deposit/>} />
            <Route path="/withdraw" element={<Withdraw/>} />
            <Route path="balance" element={<BalanceCheck/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
