import { Bell, LogIn, ShieldCheck, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HeaderSection() {

  const navigate = useNavigate();

  return (
    <header className="bg-[#0047AB] text-white shadow-md sticky top-0 z-50">

      <div className="w-full px-10 py-8 relative flex items-center">

        {/* CENTER TITLE */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
            State Bank Of India
          </h1>

          <p className="text-sm md:text-base opacity-90 mt-1">
            Secure • Trusted • Banking Services
          </p>
        </div>

        {/* RIGHT CORNER */}
        <div className="ml-auto flex items-center gap-6 pr-2">

          {/* LOGIN (Professional) */}
          <div
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 cursor-pointer
                       bg-white/10 px-4 py-2 rounded-full
                       hover:bg-white/20 transition"
          >
            <User size={20} />
            <span className="text-sm font-semibold hidden md:block">
              Login
            </span>
          </div>

          {/* NOTIFICATION */}
          <Bell
            size={24}
            className="cursor-pointer hover:text-gray-200 transition"
          />

        </div>

      </div>

    </header>
  );
}

export default HeaderSection;
