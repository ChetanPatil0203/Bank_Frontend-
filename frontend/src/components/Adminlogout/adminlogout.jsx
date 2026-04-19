import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Logout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/adminlogin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff] px-4 py-6 sm:py-8 font-sans">
      <div className="bg-white rounded-2xl p-6 sm:p-12 w-full max-w-sm sm:max-w-md shadow-xl border border-slate-200 text-center">

        {/* Icon */}
        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
          <LogOut size={30} className="text-red-500" />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-2">
          Logging Out?
        </h2>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Are you sure you want to logout from your{" "}
          <strong className="text-slate-700">PayZen</strong> account?
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3 rounded-xl border border-slate-200 bg-white text-slate-500 text-sm font-bold hover:bg-slate-50 transition-colors active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>

        {/* Footer note */}
        <p className="text-xs text-slate-400 mt-5">
          Your session will be cleared securely.
        </p>
      </div>
    </div>
  );
}