import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Logout() {
  const navigate = useNavigate();

  function handleLogout() {
    // localStorage clear करा जर token/user data असेल तर
    localStorage.clear();
    navigate("/adminlogin");
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#f0f4ff", fontFamily: "'DM Sans','Segoe UI',sans-serif"
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: "48px 40px", maxWidth: 420, width: "100%",
        boxShadow: "0 8px 40px rgba(15,31,75,0.10)", border: "1px solid #e2e8f0", textAlign: "center"
      }}>

        {/* Icon */}
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "#fef2f2", display: "flex", alignItems: "center",
          justifyContent: "center", margin: "0 auto 20px"
        }}>
          <LogOut size={32} color="#ef4444" />
        </div>

        {/* Title */}
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e293b", margin: "0 0 8px" }}>
          Logging Out?
        </h2>
        <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 32px", lineHeight: 1.6 }}>
          Are you sure you want to logout from your <strong>PayZen</strong> account?
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              flex: 1, padding: "12px", borderRadius: 10,
              border: "1.5px solid #e2e8f0", background: "#fff",
              color: "#64748b", fontSize: 14, fontWeight: 700, cursor: "pointer"
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            style={{
              flex: 1, padding: "12px", borderRadius: 10,
              border: "none", background: "#ef4444",
              color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8
            }}
          >
            <LogOut size={16} />  Logout
          </button>
        </div>

        {/* Footer note */}
        <p style={{ fontSize: 12, color: "#94a3b8", margin: "20px 0 0" }}>
          Your session will be cleared securely.
        </p>
      </div>
    </div>
  );
}