import { useState } from "react";
import { LogOut, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Logout({ sidebarOpen = true }) {
  const [showPopup, setShowPopup] = useState(false); //FIX HERE
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");

    // Optional real logout logic
    localStorage.removeItem("token");
    sessionStorage.clear();

    alert("You have been logged out successfully!");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div
      className={`flex justify-center mt-16 px-4 transition-all duration-300 ${
        sidebarOpen ? "ml-64" : "ml-20"
      }`}
    >
      {/* Logout Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative text-center">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
            >
              <X size={22} />
            </button>

            <LogOut size={50} className="mx-auto text-blue-700 mb-3" />

            <h3 className="text-xl font-semibold text-blue-900">
              Confirm Logout
            </h3>

            <p className="text-gray-600 text-sm mt-2">
              Are you sure you want to log out?
            </p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Logout UI */}
      <div className="bg-white/80 backdrop-blur-lg border border-blue-200 shadow-2xl rounded-2xl p-10 w-full max-w-2xl text-center">
        <LogOut size={40} className="mx-auto text-blue-700 mb-2" />
        <h2 className="text-2xl font-bold text-blue-900">Logout Page</h2>
        <p className="text-gray-600 mt-2">
          Click the button below to logout securely.
        </p>

        <button
          onClick={() => setShowPopup(true)}
          className="mt-6 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition shadow-lg"
        >
          Logout Now
        </button>
      </div>
    </div>
  );
}
