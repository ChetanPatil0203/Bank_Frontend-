import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HeaderSection from "./components/HeaderSection.jsx";
import Sidebar from "./components/Dashboard.jsx";

const Home = () => <h2 className="p-6">Dashboard Page</h2>;
const Profile = () => <h2 className="p-6">My Profile Page</h2>;
const Accounts = () => <h2 className="p-6">Accounts Page</h2>;
const Cards = () => <h2 className="p-6">Cards Page</h2>;
const Transactions = () => <h2 className="p-6">Transactions Page</h2>;
const Settings = () => <h2 className="p-6">Settings Page</h2>;

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
            <Route path="/profile" element={<Profile />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
