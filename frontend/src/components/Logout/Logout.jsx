import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // 👉 Clear LocalStorage / Token here
    localStorage.clear();

    // 👉 Redirect to Login
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">

        {/* ICON */}
        <div className="flex justify-center mb-5">
          <LogOut size={60} className="text-red-500" />
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-800">
          Confirm Logout
        </h2>

        <p className="text-gray-500 mt-2">
          Are you sure you want to logout from your account?
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">

          {/* CANCEL */}
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}
