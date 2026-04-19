import { Bell, Menu } from "lucide-react";

function HeaderSection({ onMenuClick, sidebarOpen }) {

  // Get user name from localStorage
  const payzenUser = JSON.parse(localStorage.getItem("payzen_user") || "{}");
  const userName = payzenUser?.name || "User";

  // Build avatar initials (e.g. "Chetan Patil" → "CP")
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header
      className={`
        sticky top-0 z-40
        border-b border-white/[.08]
        shadow-[0_2px_16px_rgba(0,0,0,0.3)]
        bg-[linear-gradient(90deg,#1e3a7b_0%,#152d68_50%,#0f1f4d_100%)]
        font-[Inter,sans-serif]
        transition-[margin-left,width] duration-[280ms] ease-in-out
        ml-0 w-full
        md:${sidebarOpen ? "ml-[230px] w-[calc(100%-230px)]" : "ml-[60px] w-[calc(100%-60px)]"}
      `}
    >
      <style>{`
        @keyframes hdrShimmer { 0%{background-position:0% center} 100%{background-position:200% center} }
        @keyframes hdrUlGrow  { from{width:0} to{width:100%} }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="flex items-center justify-between px-4 md:px-7 h-[56px] md:h-[62px] relative">

        {/* LEFT — hamburger on mobile, spacer on desktop */}
        <div className="w-10 flex items-center">
          <button
            onClick={onMenuClick}
            className="md:hidden flex items-center justify-center
                       w-9 h-9 rounded-lg
                       bg-white/[.08] hover:bg-white/[.15]
                       border border-white/[.12]
                       text-white/75 cursor-pointer
                       transition-colors duration-200"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* CENTER — SplashScreen style PayZen name */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">

          {/* Pay + Zen — exact same as SplashScreen */}
          <div style={{ display:"flex", alignItems:"baseline", gap:2 }}>
            <span style={{
              fontFamily: "Georgia, serif",
              fontSize: 20,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: -1,
              lineHeight: 1,
              textShadow: "0 0 30px rgba(255,255,255,0.15)",
            }}>Pay</span>
            <span style={{
              fontFamily: "Georgia, serif",
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: -1,
              lineHeight: 1,
              backgroundImage: "linear-gradient(135deg, #38bdf8 0%, #818cf8 45%, #38bdf8 90%)",
              backgroundSize: "200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "hdrShimmer 3s linear infinite",
            }}>Zen</span>
          </div>

          {/* Subtitle — hidden on xs */}
          <div
            className="hidden sm:block"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 8,
              fontWeight: 500,
              letterSpacing: "2.2px",
              textTransform: "uppercase",
              color: "rgba(148,163,184,0.4)",
              marginTop: 4,
              whiteSpace: "nowrap",
            }}
          >
            Secure · Smart · Banking
          </div>

        </div>

        {/* RIGHT — notification + profile */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* Notification Bell */}
          <button
            className="relative flex items-center rounded-lg
                       px-[8px] py-[6px] md:px-[9px] md:py-[7px]
                       cursor-pointer transition-all duration-200
                       bg-white/[.08] hover:bg-white/[.15]
                       border border-white/[.12] text-white/75"
          >
            <Bell size={17} />
            <span className="absolute top-[6px] right-[6px] md:top-[7px] md:right-[7px]
                             w-[6px] h-[6px] md:w-[7px] md:h-[7px]
                             rounded-full bg-red-400 border-[1.5px] border-[#0f1f4d]" />
          </button>

          {/* Profile Pill */}
          <div className="flex items-center gap-[8px] md:gap-[10px]
                          px-2 md:px-3 py-[5px] md:py-[6px]
                          rounded-full cursor-pointer
                          transition-all duration-200 hover:-translate-y-px">

            {/* Avatar initials */}
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full
                            flex items-center justify-center flex-shrink-0 select-none
                            bg-[linear-gradient(135deg,#a78bfa_0%,#7c3aed_100%)]
                            border-2 border-white/60
                            shadow-[0_2px_8px_rgba(124,58,237,0.45)]">
              <span className="text-white text-[10px] md:text-[11px] font-extrabold tracking-[0.04em] leading-none">
                {initials}
              </span>
            </div>

            {/* Hello name — hidden on xs, visible from sm up */}
            <span className="hidden sm:inline text-white text-[13px] font-medium whitespace-nowrap">
              Hello, <span className="font-bold">{userName}</span>
            </span>

          </div>
        </div>

      </div>
    </header>
  );
}

export default HeaderSection;