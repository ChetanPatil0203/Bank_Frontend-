import { Bell, Menu, X } from "lucide-react";

function HeaderSection({ onMenuClick, sidebarOpen }) {
  return (
    <header
      style={{
        background: "linear-gradient(90deg, #1e3a7b 0%, #152d68 50%, #0f1f4d 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
        position: "sticky",
        top: 0,
        zIndex: 40,
        marginLeft: sidebarOpen ? 230 : 60,
        width: `calc(100% - ${sidebarOpen ? 230 : 60}px)`,
        transition: "margin-left 0.28s ease",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        height: 62,
      }}>

        {/* LEFT — Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}></div>

        {/* CENTER — Bank Title */}
        <div style={{ textAlign: "center", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <div style={{
            color: "#ffffff",
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: 0.3,
            whiteSpace: "nowrap",
          }}>
            State Bank Of India
          </div>
          <div style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: 11,
            marginTop: 1,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            Secure Banking Portal
          </div>
        </div>

        {/* RIGHT — Bell */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            style={{
              position: "relative",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 8,
              padding: "7px 9px",
              cursor: "pointer",
              color: "rgba(255,255,255,0.75)",
              display: "flex",
              alignItems: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >
            <Bell size={18} />
            {/* Red dot */}
            <span style={{
              position: "absolute",
              top: 7,
              right: 7,
              width: 7,
              height: 7,
              background: "#f87171",
              borderRadius: "50%",
              border: "1.5px solid #0f1f4d",
            }} />
          </button>
        </div>

      </div>
    </header>
  );
}

export default HeaderSection;