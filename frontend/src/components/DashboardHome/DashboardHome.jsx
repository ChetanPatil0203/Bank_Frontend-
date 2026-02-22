import {
  Eye, EyeOff, ArrowDownToLine, ArrowUpFromLine, UserCircle, BookUser,
  CheckCircle, Receipt, Headset, Wallet, Plane, Hotel, ShoppingBag,
  TvMinimal, TrendingUp, Bell, Settings, ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardHome() {
  const [showDetails, setShowDetails] = useState(false);
  const [activeCard, setActiveCard]   = useState(null);
  const [animIn, setAnimIn]           = useState(false);
  const navigate = useNavigate();

  useEffect(() => { setTimeout(() => setAnimIn(true), 80); }, []);

  const quickActions = [
    { name: "Deposit Money",    icon: ArrowDownToLine, path: "/deposit",      color: "#059669", bg: "rgba(5,150,105,0.11)",   glow: "rgba(5,150,105,0.22)" },
    { name: "Withdraw",         icon: ArrowUpFromLine, path: "/withdraw",     color: "#dc2626", bg: "rgba(220,38,38,0.10)",   glow: "rgba(220,38,38,0.20)" },
    { name: "My Profile",       icon: UserCircle,      path: "/profile",      color: "#7c3aed", bg: "rgba(124,58,237,0.10)",  glow: "rgba(124,58,237,0.20)" },
    { name: "View Account",     icon: BookUser,        path: "/balance",      color: "#0369a1", bg: "rgba(3,105,161,0.10)",   glow: "rgba(3,105,161,0.20)" },
    { name: "KYC Verification", icon: CheckCircle,     path: "/kyc",          color: "#16a34a", bg: "rgba(22,163,74,0.10)",   glow: "rgba(22,163,74,0.20)" },
    { name: "Transactions",     icon: Receipt,         path: "/transactions", color: "#b45309", bg: "rgba(180,83,9,0.10)",    glow: "rgba(180,83,9,0.20)" },
    { name: "Help & Support",   icon: Headset,         path: "/helpsupport",  color: "#0891b2", bg: "rgba(8,145,178,0.10)",   glow: "rgba(8,145,178,0.20)" },
    { name: "My Wallet",        icon: Wallet,          path: "/wallet",       color: "#9333ea", bg: "rgba(147,51,234,0.10)",  glow: "rgba(147,51,234,0.20)" },
  ];

  const shoppingActions = [
    { name: "Book Flights",  icon: Plane,       path: "/flights",       color: "#0369a1", bg: "rgba(3,105,161,0.10)",   glow: "rgba(3,105,161,0.20)",   desc: "Travel deals" },
    { name: "Book Hotels",   icon: Hotel,       path: "/hotels",        color: "#7c3aed", bg: "rgba(124,58,237,0.10)",  glow: "rgba(124,58,237,0.20)",  desc: "Top stays" },
    { name: "Shop & Earn",   icon: ShoppingBag, path: "/shop",          color: "#059669", bg: "rgba(5,150,105,0.10)",   glow: "rgba(5,150,105,0.20)",   desc: "Cashback" },
    { name: "Entertainment", icon: TvMinimal,   path: "/entertainment", color: "#dc2626", bg: "rgba(220,38,38,0.10)",   glow: "rgba(220,38,38,0.20)",   desc: "Stream & play" },
  ];

  const recentTxns = [
    { name: "Amazon Purchase", amount: "−₹2,450",  date: "Today, 2:34 PM", type: "debit",  icon: ShoppingBag },
    { name: "Salary Credit",   amount: "+₹85,000", date: "Yesterday",      type: "credit", icon: ArrowDownToLine },
    { name: "Hotel Booking",   amount: "−₹6,200",  date: "Feb 20",         type: "debit",  icon: Hotel },
    { name: "Flight Ticket",   amount: "−₹12,800", date: "Feb 18",         type: "debit",  icon: Plane },
  ];

  const cardStyle = (id) => ({
    background: activeCard === id ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.62)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1.5px solid rgba(255,255,255,0.82)",
    borderRadius: "18px",
    cursor: "pointer",
    transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
    transform: activeCard === id ? "translateY(-4px) scale(1.03)" : "translateY(0) scale(1)",
    boxShadow: activeCard === id
      ? "0 12px 36px rgba(30,64,175,0.14), 0 2px 8px rgba(0,0,0,0.06)"
      : "0 2px 14px rgba(30,64,175,0.07), 0 1px 3px rgba(0,0,0,0.04)",
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eef2ff 0%, #f0f9ff 40%, #fef9ee 75%, #f0fdf4 100%)",
      fontFamily: "'DM Sans','Segoe UI',sans-serif",
      color: "#1e293b",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Ambient blobs */}
      <div style={{ position:"fixed", top:"-120px", left:"8%",    width:"520px", height:"520px", background:"radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", bottom:"-60px", right:"4%", width:"460px", height:"460px", background:"radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", top:"38%",    left:"-100px", width:"380px", height:"380px", background:"radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)", pointerEvents:"none", zIndex:0 }} />

      {/* ── NAVBAR ── */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"16px 44px",
        background:"rgba(255,255,255,0.55)", backdropFilter:"blur(22px)", WebkitBackdropFilter:"blur(22px)",
        borderBottom:"1.5px solid rgba(255,255,255,0.75)",
        position:"sticky", top:0, zIndex:100,
        boxShadow:"0 1px 0 rgba(30,64,175,0.06)",
      }}>
        

        <h2 style={{ margin:0, fontSize:"16px", fontWeight:"800", color:"#1e3a8a", letterSpacing:"0.10em", textTransform:"uppercase" }}>
          Account Overview
        </h2>
      </div>

      {/* ── CONTENT ── */}
      <div style={{
        maxWidth:"1140px", margin:"0 auto", padding:"36px 40px",
        opacity: animIn ? 1 : 0, transition:"opacity 0.5s ease",
      }}>

        {/* ── BANK CARD ── */}
        <div style={{
          borderRadius:"26px", padding:"36px 44px", marginBottom:"32px",
          background:"linear-gradient(125deg, #1d4ed8 0%, #3b82f6 48%, #60a5fa 100%)",
          position:"relative", overflow:"hidden",
          boxShadow:"0 18px 64px rgba(29,78,216,0.28), 0 0 0 1.5px rgba(255,255,255,0.18)",
          opacity: animIn ? 1 : 0,
          transform: animIn ? "translateY(0)" : "translateY(18px)",
          transition:"all 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.06s",
        }}>
          {/* Shimmers */}
          <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"200px", height:"200px", background:"radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-40px", left:"30%", width:"160px", height:"160px", background:"radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:"50%", right:"260px", width:"300px", height:"300px", background:"radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)", pointerEvents:"none", transform:"translateY(-50%)" }} />

          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:"32px", flexWrap:"wrap" }}>
            {/* Left */}
            <div>
              <p style={{ margin:0, fontSize:"12px", color:"rgba(255,255,255,0.60)", letterSpacing:"0.12em", textTransform:"uppercase" }}>My Saving A/C</p>

              {/* Account number — transparent pill */}
              <div style={{
                display:"inline-block", marginTop:"10px",
                backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
                borderRadius:"10px", padding:"8px 18px",
              }}>
                <p style={{ margin:0, fontSize:"15px", color:"rgba(255,255,255,0.92)", fontWeight:"700", letterSpacing:"0.18em" }}>
                  {showDetails ? "1234 5678 9012 0123" : "XXXXXXXX 0123"}
                </p>
              </div>

              <div style={{ marginTop:"26px" }}>
                <p style={{ margin:0, fontSize:"11px", color:"rgba(255,255,255,0.50)", letterSpacing:"0.12em", textTransform:"uppercase" }}>Account Balance</p>

                {/* Balance — transparent pill */}
                <div style={{
                  display:"inline-block", marginTop:"10px",
                  backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)",
                  borderRadius:"14px", padding:"12px 24px",
                  boxShadow:"0 4px 20px rgba(0,0,0,0.08)",
                }}>
                  <p style={{ margin:0, fontSize:"38px", fontWeight:"800", color:"#fff", letterSpacing:"-0.02em", textShadow:"0 2px 24px rgba(255,255,255,0.18)" }}>
                    {showDetails ? "₹ 50,000" : "₹ *****"}
                  </p>
                </div>

                <div style={{ display:"flex", alignItems:"center", gap:"6px", marginTop:"10px" }}>
                  <TrendingUp size={13} color="#86efac" />
                  <span style={{ fontSize:"12px", color:"#86efac", fontWeight:"600" }}>+2.4% this month</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"24px" }}>
              <div style={{ display:"flex" }}>
                <div style={{ width:"38px", height:"38px", borderRadius:"50%", background:"rgba(239,68,68,0.85)", boxShadow:"0 3px 12px rgba(239,68,68,0.42)" }} />
                <div style={{ width:"38px", height:"38px", borderRadius:"50%", background:"rgba(251,146,60,0.85)", marginLeft:"-13px", boxShadow:"0 3px 12px rgba(251,146,60,0.38)" }} />
              </div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                style={{
                  display:"flex", alignItems:"center", gap:"9px",
                  background:"rgba(255,255,255,0.18)", backdropFilter:"blur(10px)",
                  border:"1.5px solid rgba(255,255,255,0.35)",
                  color:"#fff", padding:"11px 26px", borderRadius:"13px",
                  fontSize:"14px", fontWeight:"700", cursor:"pointer",
                  transition:"all 0.2s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.28)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
              >
                {showDetails ? <EyeOff size={15} /> : <Eye size={15} />}
                {showDetails ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>

        {/* ── QUICK ACTIONS — Row 1 (4) + Row 2 (4) ── */}
        <div style={{
          marginBottom:"28px",
          opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(16px)",
          transition:"all 0.5s ease 0.20s",
        }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
            <h3 style={{ margin:0, fontSize:"18px", fontWeight:"800", color:"#1e3a8a" }}>Quick Actions</h3>
            <button style={{ fontSize:"13px", color:"#3b82f6", background:"none", border:"none", cursor:"pointer", fontWeight:"600", display:"flex", alignItems:"center", gap:"4px" }}>
              View all <ChevronRight size={14} />
            </button>
          </div>

          {/* Row 1 */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"14px", marginBottom:"14px" }}>
            {quickActions.slice(0, 4).map((item, i) => {
              const Icon = item.icon;
              const id = `q-${i}`;
              return (
                <div
                  key={id}
                  onClick={() => navigate(item.path)}
                  onMouseEnter={() => setActiveCard(id)}
                  onMouseLeave={() => setActiveCard(null)}
                  style={{ ...cardStyle(id), padding:"26px 16px 22px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}
                >
                  <div style={{
                    width:"58px", height:"58px", borderRadius:"18px",
                    background: activeCard === id ? item.glow : item.bg,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    marginBottom:"14px",
                    boxShadow: activeCard === id ? `0 6px 24px ${item.glow}` : "none",
                    transition:"all 0.22s ease",
                  }}>
                    <Icon size={26} color={item.color} strokeWidth={2.1} />
                  </div>
                  <p style={{ margin:0, fontSize:"13px", fontWeight:"700", color:"#1e3a8a", lineHeight:"1.35" }}>{item.name}</p>
                </div>
              );
            })}
          </div>

          {/* Row 2 */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"14px" }}>
            {quickActions.slice(4, 8).map((item, i) => {
              const Icon = item.icon;
              const id = `q-${i + 4}`;
              return (
                <div
                  key={id}
                  onClick={() => navigate(item.path)}
                  onMouseEnter={() => setActiveCard(id)}
                  onMouseLeave={() => setActiveCard(null)}
                  style={{ ...cardStyle(id), padding:"26px 16px 22px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}
                >
                  <div style={{
                    width:"58px", height:"58px", borderRadius:"18px",
                    background: activeCard === id ? item.glow : item.bg,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    marginBottom:"14px",
                    boxShadow: activeCard === id ? `0 6px 24px ${item.glow}` : "none",
                    transition:"all 0.22s ease",
                  }}>
                    <Icon size={26} color={item.color} strokeWidth={2.1} />
                  </div>
                  <p style={{ margin:0, fontSize:"13px", fontWeight:"700", color:"#1e3a8a", lineHeight:"1.35" }}>{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── SHOPPING — 4 cards ── */}
        <div style={{
          marginBottom:"28px",
          opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(16px)",
          transition:"all 0.5s ease 0.30s",
        }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
            <h3 style={{ margin:0, fontSize:"18px", fontWeight:"800", color:"#1e3a8a" }}>Shopping</h3>
            <button style={{ fontSize:"13px", color:"#3b82f6", background:"none", border:"none", cursor:"pointer", fontWeight:"600", display:"flex", alignItems:"center", gap:"4px" }}>
              Explore <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"14px" }}>
            {shoppingActions.map((item, i) => {
              const Icon = item.icon;
              const id = `s-${i}`;
              return (
                <div
                  key={id}
                  onClick={() => navigate(item.path)}
                  onMouseEnter={() => setActiveCard(id)}
                  onMouseLeave={() => setActiveCard(null)}
                  style={{ ...cardStyle(id), padding:"26px 16px 22px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}
                >
                  <div style={{
                    width:"58px", height:"58px", borderRadius:"18px",
                    background: activeCard === id ? item.glow : item.bg,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    marginBottom:"14px",
                    boxShadow: activeCard === id ? `0 6px 24px ${item.glow}` : "none",
                    transition:"all 0.22s ease",
                  }}>
                    <Icon size={26} color={item.color} strokeWidth={2.1} />
                  </div>
                  <p style={{ margin:0, fontSize:"13px", fontWeight:"700", color:"#1e3a8a" }}>{item.name}</p>
                  <p style={{ margin:"5px 0 0", fontSize:"11px", color:"#94a3b8" }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RECENT TRANSACTIONS — full width ── */}
        <div style={{
          opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(16px)",
          transition:"all 0.5s ease 0.40s",
        }}>
          <div style={{
            background:"rgba(255,255,255,0.62)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)",
            borderRadius:"22px", border:"1.5px solid rgba(255,255,255,0.82)",
            boxShadow:"0 4px 26px rgba(30,64,175,0.08)", padding:"28px 32px",
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
              <h3 style={{ margin:0, fontSize:"18px", fontWeight:"800", color:"#1e3a8a" }}>Recent Transactions</h3>
              <button
                onClick={() => navigate("/transactions")}
                style={{ fontSize:"13px", color:"#3b82f6", background:"none", border:"none", cursor:"pointer", fontWeight:"600", display:"flex", alignItems:"center", gap:"4px" }}
              >
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:"12px" }}>
              {recentTxns.map((txn, i) => {
                const Icon = txn.icon;
                const isC = txn.type === "credit";
                return (
                  <div key={i} style={{
                    display:"flex", alignItems:"center", gap:"16px",
                    background:"rgba(255,255,255,0.58)", borderRadius:"14px",
                    padding:"16px 18px", border:"1.5px solid rgba(255,255,255,0.82)",
                  }}>
                    <div style={{
                      width:"46px", height:"46px", borderRadius:"14px", flexShrink:0,
                      background: isC ? "rgba(5,150,105,0.11)" : "rgba(220,38,38,0.10)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}>
                      <Icon size={20} color={isC ? "#059669" : "#dc2626"} strokeWidth={2} />
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ margin:0, fontSize:"14px", fontWeight:"700", color:"#1e293b" }}>{txn.name}</p>
                      <p style={{ margin:"3px 0 0", fontSize:"11px", color:"#94a3b8" }}>{txn.date}</p>
                    </div>
                    <p style={{
                      margin:0, fontSize:"15px", fontWeight:"800",
                      color: isC ? "#059669" : "#dc2626",
                      background: isC ? "rgba(5,150,105,0.09)" : "rgba(220,38,38,0.09)",
                      padding:"4px 12px", borderRadius:"8px",
                    }}>
                      {txn.amount}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ height:"32px" }} />
      </div>
    </div>
  );
}

export default DashboardHome;