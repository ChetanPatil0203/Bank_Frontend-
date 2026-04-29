import { Bell, Menu, X, Trash2, CheckCircle2, AlertCircle, Info, Clock } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { getNotifications, markNotificationRead, deleteNotification } from "../../utils/apiServices";

function HeaderSection({ onMenuClick, sidebarOpen }) {
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get user info from localStorage
  const payzenUser = JSON.parse(localStorage.getItem("payzen_user") || "{}");
  const userName = payzenUser?.name || "User";
  const userId = payzenUser?.id;

  // Build avatar initials
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const fetchNotifications = useCallback(async () => {
    if (!userId) {
      console.warn("[Header] No userId found in localStorage");
      return;
    }
    console.log(`[Header] Fetching notifications for userId: ${userId}`);
    const { ok, data } = await getNotifications(userId);
    if (ok && data.success) {
      console.log(`[Header] Found ${data.notifications.length} notifications`);
      setNotifications(data.notifications);
    } else {
      console.error("[Header] Failed to fetch notifications", data);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
    
    // Close dropdown on outside click
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userId, fetchNotifications]);

  const handleMarkAsRead = async (id) => {
    const { ok } = await markNotificationRead(id);
    if (ok) {
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const { ok } = await deleteNotification(id);
    if (ok) {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={16} className="text-emerald-400" />;
      case 'warning': return <AlertCircle size={16} className="text-amber-400" />;
      case 'error': return <X size={16} className="text-rose-400" />;
      default: return <Info size={16} className="text-blue-400" />;
    }
  };

  const getTimeAgo = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    // Fallback for cases where server/client time are out of sync
    if (diffInSeconds < 0) return 'Just now';
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <header
      className={`
        sticky top-0 z-40
        border-b border-white/[.08]
        shadow-[0_2px_16px_rgba(0,0,0,0.3)]
        bg-[linear-gradient(90deg,#1e3a7b_0%,#152d68_50%,#0f1f4d_100%)]
        font-[Inter,sans-serif]
        w-full
      `}
    >
      <style>{`
        @keyframes hdrShimmer { 0%{background-position:0% center} 100%{background-position:200% center} }
        
        @keyframes bell-pulse {
          0% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(56, 189, 248, 0)); }
          50% { transform: scale(1.1); filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.7)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(56, 189, 248, 0)); }
        }
        
        @keyframes badge-pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.8); }
          70% { transform: scale(1.2); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        .animate-bell-infinite {
          animation: bell-pulse 2s infinite ease-in-out;
        }
        
        .animate-badge-infinite {
          animation: badge-pulse 1.8s infinite ease-in-out;
        }

        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .notification-dropdown { animation: slideDown 0.2s ease-out; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
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
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`relative flex items-center 
                         cursor-pointer transition-all duration-300 p-2
                         ${isDropdownOpen ? 'text-white' : 'text-white/75 hover:text-white'}
                         ${unreadCount > 0 ? 'animate-bell-infinite' : ''}`}
            >
              <Bell size={17} className={unreadCount > 0 ? "fill-white/20" : ""} />
              {unreadCount > 0 && (
                <span className="absolute -top-[4px] -right-[4px] md:-top-[5px] md:-right-[5px]
                                 min-w-[15px] h-[15px] px-1
                                 flex items-center justify-center
                                 rounded-full bg-red-500 text-white text-[9px] font-bold
                                 border-[1.5px] border-[#0f1f4d]
                                 animate-badge-infinite
                                 shadow-[0_0_12px_rgba(239,68,68,0.8)]">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isDropdownOpen && (
              <div className="notification-dropdown absolute right-0 mt-3 w-[280px] md:w-[320px] 
                              bg-[#152d68] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                
                {/* Header */}
                <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                  <h3 className="text-white text-sm font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                      {unreadCount} New
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="py-10 flex flex-col items-center justify-center text-white/40 gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <Bell size={18} />
                      </div>
                      <p className="text-[11px] font-medium">No notifications yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id}
                          onClick={() => handleMarkAsRead(notif.id)}
                          className={`px-4 py-3 flex gap-3 transition-colors cursor-pointer group
                                     ${notif.is_read ? 'opacity-60 grayscale-[0.3]' : 'bg-white/[0.03] hover:bg-white/[0.06]'}`}
                        >
                          <div className="mt-0.5">
                            {getTypeIcon(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <p className={`text-[12px] font-semibold truncate ${notif.is_read ? 'text-white/70' : 'text-white'}`}>
                                {notif.title}
                              </p>
                              <button 
                                onClick={(e) => handleDelete(e, notif.id)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                              >
                                <Trash2 size={12} className="text-white/40 hover:text-red-400" />
                              </button>
                            </div>
                            <p className="text-[11px] text-white/50 leading-relaxed mt-0.5 line-clamp-2">
                              {notif.message}
                            </p>
                            <div className="flex items-center gap-1 mt-2 text-white/30">
                              <Clock size={10} />
                              <span className="text-[9px] font-medium">{getTimeAgo(notif.created_at)}</span>
                            </div>
                          </div>
                          {!notif.is_read && (
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="px-4 py-2 bg-white/5 border-t border-white/10 flex justify-center">
                    <button 
                      onClick={() => setIsDropdownOpen(false)}
                      className="text-[10px] text-white/40 hover:text-white font-medium transition-colors"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Pill */}
          <div className="flex items-center gap-[8px] md:gap-[10px]
                          px-2 md:px-3 py-[5px] md:py-[6px]
                          rounded-full cursor-pointer
                          transition-all duration-200 hover:-translate-y-px">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full
                            flex items-center justify-center flex-shrink-0 select-none
                            bg-[linear-gradient(135deg,#a78bfa_0%,#7c3aed_100%)]
                            border-2 border-white/60
                            shadow-[0_2px_8px_rgba(124,58,237,0.45)]">
              <span className="text-white text-[10px] md:text-[11px] font-extrabold tracking-[0.04em] leading-none">
                {initials}
              </span>
            </div>
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