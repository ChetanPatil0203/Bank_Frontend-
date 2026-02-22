import { Bell, ChevronDown } from "lucide-react";

function HeaderSection({ onMenuClick, sidebarOpen }) {
  return (
    <header
      className={`sticky top-0 z-40 border-b border-white/[.08] shadow-[0_2px_16px_rgba(0,0,0,0.3)]
        transition-[margin-left] duration-[280ms] ease-in-out
        ${sidebarOpen ? "ml-[230px] w-[calc(100%-230px)]" : "ml-[60px] w-[calc(100%-60px)]"}
        bg-[linear-gradient(90deg,#1e3a7b_0%,#152d68_50%,#0f1f4d_100%)]
        font-[Inter,sans-serif]`}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="flex items-center justify-between px-7 h-[62px] relative">

        {/* LEFT spacer */}
        <div className="w-10" />

        {/* CENTER TITLE */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <div className="text-white text-[17px] font-bold tracking-[0.3px] whitespace-nowrap">
            PayZen
          </div>
          <div className="text-white/35 text-[11px] mt-px tracking-[0.08em] uppercase">
            Secure Banking Portal
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* Notification Bell */}
          <button
            className="relative flex items-center rounded-lg px-[9px] py-[7px] cursor-pointer
                       transition-all duration-200
                       bg-white/[.08] hover:bg-white/[.15]
                       border border-white/[.12]
                       text-white/75"
          >
            <Bell size={18} />
            <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] rounded-full
                             bg-red-400 border-[1.5px] border-[#0f1f4d]" />
          </button>

          {/* Profile Pill */}
          <div
            className="flex items-center gap-[10px] px-3 py-[6px] rounded-full cursor-pointer
                       transition-all duration-200 hover:-translate-y-px
                      "
          >
            {/* BP Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 select-none
                         bg-[linear-gradient(135deg,#a78bfa_0%,#7c3aed_100%)]
                         border-2 border-white/60
                         shadow-[0_2px_8px_rgba(124,58,237,0.45)]"
            >
              <span className="text-white text-[11px] font-extrabold tracking-[0.04em] leading-none">
                BP
              </span>
            </div>

            {/* Welcome, Bhushan — single line */}
            <span className="text-white text-[13px] font-medium whitespace-nowrap">
              Hello,{" "}
              <span className="font-bold">Bhushan</span>
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}

export default HeaderSection;