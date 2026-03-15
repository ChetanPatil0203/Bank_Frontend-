import { useState, useEffect } from "react";
import { LogOut, Loader2, CheckCircle, Shield, X } from "lucide-react";
import { logoutUser } from "../../utils/apiServices";
import { useNavigate } from "react-router-dom";

// Toast Component
function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3
      bg-white border border-green-100 shadow-lg rounded-xl px-4 py-3
      animate-[slideIn_0.3s_ease]">
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <div className="bg-green-100 p-1.5 rounded-full">
        <CheckCircle size={16} className="text-green-600" />
      </div>
      <p className="text-sm font-medium text-gray-700">{message}</p>
      <button onClick={onClose} className="text-gray-300 hover:text-gray-500 ml-1">
        <X size={14} />
      </button>
    </div>
  );
}

export default function LogoutPage() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
    } catch (e) {}
    finally {
      localStorage.removeItem("payzen_token");
      localStorage.removeItem("payzen_user");
      setLoading(false);
      setShowToast(true);
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-slate-100 to-blue-50">

      {showToast && (
        <Toast
          message="Logged out successfully!"
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="max-w-sm w-full bg-white shadow-2xl rounded-2xl overflow-hidden">

        <div className="h-2 bg-gradient-to-r from-red-400 to-red-600" />

        <div className="p-8 text-center">

          <div className="flex justify-center mb-5">
            <div className="bg-red-50 p-4 rounded-full border-4 border-red-100">
              <LogOut size={40} className="text-red-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Confirm Logout
          </h2>

          <p className="text-gray-400 mt-2 text-sm leading-relaxed">
            Are you sure you want to logout?<br />
            Your session will be ended securely.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">

            <button
              onClick={handleCancel}
              disabled={loading}
              className="w-full border-2 border-gray-200 py-3 rounded-xl
                font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300
                transition-all disabled:opacity-50 text-sm"
            >
              Cancel
            </button>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full bg-red-500 text-white py-3 rounded-xl
                font-semibold hover:bg-red-600 active:scale-[0.98]
                transition-all disabled:opacity-60 flex items-center
                justify-center gap-2 text-sm shadow-md shadow-red-200"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut size={18} />
                  Logout
                </>
              )}
            </button>

          </div>

          <p className="text-xs text-gray-300 mt-5">
            🔒 Your data is safe & session will be cleared
          </p>

        </div>
      </div>
    </div>
  );
}