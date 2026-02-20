  import { Bell, User, Menu } from "lucide-react";
  import { useNavigate } from "react-router-dom";

  function HeaderSection({ onMenuClick, sidebarOpen }) {
    const navigate = useNavigate();

    return (
      <header
        className={`bg-[#f8f4e8] text-black shadow-md sticky top-0 z-40 border-b
        transition-all duration-300 ${
          sidebarOpen ? "ml-[240px]" : "ml-0"
        }`}
        
      >
        <div className="w-full px-8 py-4 flex items-center justify-between">

          {/* LEFT - Menu + Profile */}
          <div className="flex items-center gap-3">
            <Menu 
              size={24} 
              className="cursor-pointer text-[#0047AB]"
              onClick={onMenuClick} 
            />
          </div>
          
            <div className="flex items-center gap-2">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500/75 to-purple-700/85 text-white 
                            flex items-center justify-center font-semibold text-base shadow-xl border border-white/30 backdrop-blur-sm">
              BP
            </div>
              <span className="font-medium text-gray-800">
                Hello, Bhushan
              </span>
            </div>
    

          {/* CENTER TITLE */}
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-[#0047AB]">
              State Bank Of India
            </h1>
          </div>

          {/* RIGHT - Login + Bell */}
          <div className="flex items-center gap-4">

            <div className="relative">
              <Bell
                size={22}
                className="cursor-pointer text-gray-700 hover:text-[#0047AB] transition"
              />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>

          </div>
        </div>
      </header>
    );
  }

  export default HeaderSection;
