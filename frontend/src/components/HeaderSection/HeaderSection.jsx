import { Bell, ChevronDown } from "lucide-react";

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
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          height: 62,
          position: "relative",
        }}
      >
        {/* LEFT */}
        <div style={{ width: 40 }} />

        {/* CENTER TITLE */}
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: 0.3,
              whiteSpace: "nowrap",
            }}
          >
            State Bank Of India
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 11,
              marginTop: 1,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Secure Banking Portal
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>

          {/* Notification Bell */}
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
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
            }
          >
            <Bell size={18} />
            <span
              style={{
                position: "absolute",
                top: 7,
                right: 7,
                width: 7,
                height: 7,
                background: "#f87171",
                borderRadius: "50%",
                border: "1.5px solid #0f1f4d",
              }}
            />
          </button>

          {/* Profile Pill Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#5b4ec2",
              padding: "6px 14px 6px 6px",
              borderRadius: 40,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-1px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid rgba(255,255,255,0.6)",
              }}
            />
            {/* Name */}
            <span
              style={{
                color: "#ffffff",
                fontWeight: 600,
                fontSize: 14,
                whiteSpace: "nowrap",
              }}
            >
              Bhushan
            </span>

            {/* Dropdown Arrow */}
            <ChevronDown size={16} color="#ffffff" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderSection;