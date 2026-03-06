import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, KeyRound, ShieldCheck } from "lucide-react";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'DM Sans',sans-serif;}
    @keyframes spin      {to{transform:rotate(360deg)}}
    @keyframes twinkle   {0%,100%{opacity:.1;transform:scale(1)}50%{opacity:.85;transform:scale(1.5)}}
    @keyframes floatOrb  {0%,100%{transform:translate(0,0)}33%{transform:translate(22px,-14px)}66%{transform:translate(-12px,10px)}}
    @keyframes cardIn    {from{opacity:0;transform:translateY(22px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes stepIn    {from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes shake     {0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}
    @keyframes dotPulse  {0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}
    @keyframes floatUp   {0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
    @keyframes coinOrbit {0%{transform:rotate(0deg) translateX(115px) rotate(0deg)}100%{transform:rotate(360deg) translateX(115px) rotate(-360deg)}}
    @keyframes coin2     {0%{transform:rotate(125deg) translateX(88px) rotate(-125deg)}100%{transform:rotate(485deg) translateX(88px) rotate(-485deg)}}
    @keyframes coin3     {0%{transform:rotate(245deg) translateX(132px) rotate(-245deg)}100%{transform:rotate(605deg) translateX(132px) rotate(-605deg)}}
    @keyframes scan      {0%{top:-5%}100%{top:105%}}
    @keyframes glowPulse {0%,100%{opacity:.35}50%{opacity:.7}}
    @keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}
    .card-in {animation:cardIn .6s cubic-bezier(.16,1,.3,1) forwards}
    .step-in {animation:stepIn .35s cubic-bezier(.16,1,.3,1) forwards}
    .shk     {animation:shake .4s ease}
    .gp      {animation:glowPulse 2.8s ease-in-out infinite}

    /* Input with icon */
    .pz-in {
      width:100%; background:rgba(15,25,65,.55);
      border:1px solid rgba(99,179,237,.2); border-radius:10px;
      padding:13px 16px 13px 42px;
      color:#e2e8f0; font-size:14px; outline:none;
      transition:all .2s; font-family:'DM Sans',sans-serif;
    }
    .pz-in:focus {
      border-color:rgba(124,58,237,.65);
      background:rgba(20,35,85,.8);
      box-shadow:0 0 0 3px rgba(124,58,237,.15);
    }
    .pz-in::placeholder{color:rgba(148,163,184,.4);}
    .pz-in.no-icon { padding-left: 16px; }

    /* Input icon left */
    .in-icon {
      position:absolute; left:13px; top:50%; transform:translateY(-50%);
      pointer-events:none; transition:color .2s;
      display:flex; align-items:center; color:rgba(124,58,237,.65);
    }

    .pz-btn{transition:all .2s;border:none;cursor:pointer;font-family:'Syne',sans-serif;}
    .pz-btn:hover:not(:disabled){filter:brightness(1.1);transform:translateY(-1px);}
    .pz-btn:active:not(:disabled){transform:scale(.98);}
    .eye{background:none;border:none;cursor:pointer;color:rgba(148,163,184,.55);transition:color .2s;display:flex;align-items:center;}
    .eye:hover{color:#a78bfa;}
    .back-l{background:none;border:none;color:rgba(148,163,184,.55);cursor:pointer;font-size:13px;font-family:'DM Sans',sans-serif;transition:color .2s;}
    .back-l:hover{color:#a78bfa;}
    .rs-l{background:none;border:none;color:#7c3aed;cursor:pointer;font-size:12px;font-family:'DM Sans',sans-serif;transition:color .2s;}
    .rs-l:hover{color:#a78bfa;}
    .lang-opt{display:block;width:100%;padding:9px 16px;border:none;font-size:13px;font-weight:600;cursor:pointer;text-align:left;font-family:'DM Sans',sans-serif;transition:background .15s;}
  `}</style>
);

function Stars() {
  const st = Array.from({length:95},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,s:Math.random()*2+.3,d:Math.random()*5,dur:Math.random()*3+2,b:Math.random()>.9}));
  return (
    <div style={{position:"fixed",inset:0,overflow:"hidden",zIndex:0,pointerEvents:"none"}}>
      {st.map(s=>(
        <div key={s.id} style={{position:"absolute",left:`${s.x}%`,top:`${s.y}%`,width:s.s,height:s.s,borderRadius:"50%",background:s.b?"#38bdf8":"#e2e8f0",boxShadow:s.b?`0 0 ${s.s*5}px #38bdf8`:"none",animation:`twinkle ${s.dur}s ${s.d}s ease-in-out infinite`}}/>
      ))}
      {[{x:5,y:10,sz:350,c:"rgba(30,58,138,.18)",d:14},{x:65,y:50,sz:280,c:"rgba(91,33,182,.12)",d:18},{x:30,y:70,sz:240,c:"rgba(6,78,59,.1)",d:12}].map((o,i)=>(
        <div key={i} style={{position:"absolute",left:`${o.x}%`,top:`${o.y}%`,width:o.sz,height:o.sz,borderRadius:"50%",background:`radial-gradient(circle,${o.c},transparent 70%)`,filter:"blur(50px)",animation:`floatOrb ${o.d}s ${i*4}s ease-in-out infinite`}}/>
      ))}
    </div>
  );
}

function BankBuilding() {
  return (
    <div style={{position:"relative",width:280,height:300,margin:"0 auto"}}>
      <div className="gp" style={{position:"absolute",bottom:18,left:"50%",transform:"translateX(-50%)",width:200,height:35,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(56,189,248,.22),transparent 70%)",filter:"blur(10px)"}}/>
      {[{a:"coinOrbit 8s linear infinite"},{a:"coin2 11s linear infinite"},{a:"coin3 13s linear infinite"}].map((c,i)=>(
        <div key={i} style={{position:"absolute",top:"40%",left:"50%",width:26,height:26,marginLeft:-13,marginTop:-13,animation:c.a}}>
          <div style={{width:26,height:26,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,#fbbf24,#b45309)",boxShadow:"0 0 8px rgba(251,191,36,.5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:"#fff",fontFamily:"'Syne',sans-serif"}}>₹</div>
        </div>
      ))}
      <svg viewBox="0 0 240 275" fill="none" style={{width:"100%",height:"100%",animation:"floatUp 5s ease-in-out infinite"}}>
        <ellipse cx="120" cy="262" rx="88" ry="7" fill="rgba(56,189,248,.15)"/>
        <rect x="15" y="252" width="210" height="11" rx="3" fill="rgba(56,189,248,.22)" stroke="rgba(56,189,248,.38)" strokeWidth=".5"/>
        <rect x="28" y="241" width="184" height="12" rx="2" fill="rgba(56,189,248,.17)" stroke="rgba(56,189,248,.32)" strokeWidth=".5"/>
        <rect x="42" y="230" width="156" height="12" rx="2" fill="rgba(56,189,248,.13)" stroke="rgba(56,189,248,.28)" strokeWidth=".5"/>
        <rect x="52" y="118" width="136" height="115" rx="2" fill="rgba(12,28,80,.75)" stroke="rgba(56,189,248,.38)" strokeWidth="1"/>
        {[63,80,97,114,131,148,165].map((x,i)=>(
          <rect key={i} x={x} y="123" width="7" height="110" rx="1" fill="rgba(56,189,248,.1)" stroke="rgba(56,189,248,.28)" strokeWidth=".4"/>
        ))}
        {[0,1,2].map(r=>[0,1,2,3,4].map(c=>(
          <rect key={`${r}${c}`} x={62+c*22} y={135+r*27} width="13" height="17" rx="1" fill="rgba(56,189,248,.07)" stroke="rgba(56,189,248,.22)" strokeWidth=".4"/>
        )))}
        <rect x="100" y="192" width="40" height="43" rx="2" fill="rgba(56,189,248,.13)" stroke="rgba(56,189,248,.38)" strokeWidth=".7"/>
        <circle cx="120" cy="215" r="2.5" fill="#38bdf8" style={{filter:"drop-shadow(0 0 3px #38bdf8)"}}/>
        <polygon points="46,120 120,73 194,120" fill="rgba(12,28,80,.85)" stroke="rgba(56,189,248,.48)" strokeWidth="1"/>
        <polygon points="60,120 120,82 180,120" fill="rgba(56,189,248,.07)" stroke="rgba(56,189,248,.28)" strokeWidth=".5"/>
        <line x1="120" y1="73" x2="120" y2="44" stroke="rgba(56,189,248,.55)" strokeWidth="1.5"/>
        <polygon points="120,44 143,53 120,62" fill="#38bdf8" opacity=".65"/>
        <text x="120" y="183" textAnchor="middle" fill="rgba(56,189,248,.48)" fontSize="6" fontFamily="'DM Sans',sans-serif" fontWeight="600" letterSpacing="2">PAYZEN BANK</text>
        {[15,52,89,126,163,200,225].map((x,i)=>(
          <circle key={i} cx={x} cy="264" r="1.8" fill="rgba(56,189,248,.35)"/>
        ))}
        <line x1="15" y1="264" x2="225" y2="264" stroke="rgba(56,189,248,.18)" strokeWidth=".5" strokeDasharray="4 3"/>
      </svg>
      <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
        <div style={{position:"absolute",left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(56,189,248,.35),transparent)",animation:"scan 3.5s linear infinite"}}/>
      </div>
    </div>
  );
}

export default function ForgotPassword() {
  const [step,setStep]         = useState(1);
  const [email,setEmail]       = useState("");
  const [otp,setOtp]           = useState(["","","","","",""]);
  const [newP,setNewP]         = useState("");
  const [conP,setConP]         = useState("");
  const [showN,setShowN]       = useState(false);
  const [showC,setShowC]       = useState(false);
  const [err,setErr]           = useState("");
  const [suc,setSuc]           = useState("");
  const [load,setLoad]         = useState(false);
  const [cardIn,setCardIn]     = useState(false);
  const [focusIdx,setFocusIdx] = useState(-1);
  const [lang,setLang]         = useState("EN");
  const [showL,setShowL]       = useState(false);
  const refs = [useRef(),useRef(),useRef(),useRef(),useRef(),useRef()];
  const navigate = useNavigate();

  useEffect(()=>{setTimeout(()=>setCardIn(true),200);},[]);
  const filled = otp.filter(d=>d!=="").length;

  const chOtp=(i,v)=>{ if(!/^\d?$/.test(v)) return; const n=[...otp];n[i]=v;setOtp(n); if(v&&i<5) refs[i+1].current.focus(); };
  const kyOtp=(i,e)=>{ if(e.key==="Backspace"&&!otp[i]&&i>0){const n=[...otp];n[i-1]="";setOtp(n);refs[i-1].current.focus();} };

  const sendOtp=async()=>{
    if(!email.trim()){setErr("Email required ⚠️");return;}
    if(!email.includes("@")){setErr("Valid email enter करा ⚠️");return;}
    setLoad(true);setErr("");setSuc("");
    try{
      const r=await(await fetch("http://localhost:5000/api/v1/auth/send-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:email.trim().toLowerCase()})})).json();
      if(r.success){setSuc("OTP पाठवला ✅ Email वर 6-digit OTP आला आहे");setTimeout(()=>{setSuc("");setStep(2);},1500);}
      else setErr(r.message||"Account सापडला नाही ❌");
    }catch{setErr("❌ Server connect नाही झाला.");}finally{setLoad(false);}
  };

  const verOtp=async()=>{
    const code=otp.join("");
    if(code.length<6){setErr("6-digit OTP enter करा ⚠️");return;}
    setLoad(true);setErr("");setSuc("");
    try{
      const r=await(await fetch("http://localhost:5000/api/v1/auth/verify-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:email.trim().toLowerCase(),otp:code})})).json();
      if(r.success){setSuc("OTP Verified ✅");setTimeout(()=>{setSuc("");setStep(3);},1000);}
      else{setErr(r.message||"Invalid OTP ❌");setOtp(["","","","","",""]);refs[0].current.focus();}
    }catch{setErr("❌ Server connect नाही झाला.");}finally{setLoad(false);}
  };

  const reset=async()=>{
    if(!newP||!conP){setErr("सगळे fields भरा ⚠️");return;}
    if(newP.length<6){setErr("Password कमीत कमी 6 characters असावा ⚠️");return;}
    if(newP!==conP){setErr("Passwords match नाही ❌");return;}
    setLoad(true);setErr("");setSuc("");
    try{
      const r=await(await fetch("http://localhost:5000/api/v1/auth/reset-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:email.trim().toLowerCase(),newPass:newP,confirmPass:conP})})).json();
      if(r.success){setSuc("Password Reset Successful ✅");setTimeout(()=>navigate("/login"),2000);}
      else setErr(r.message||"काहीतरी चूक झाली ❌");
    }catch{setErr("❌ Server connect नाही झाला.");}finally{setLoad(false);}
  };

  const steps=["Email","OTP","Reset"];
  const SP=()=><div style={{width:15,height:15,borderRadius:"50%",border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",animation:"spin .7s linear infinite"}}/>;

  const btnStyle=(active=true)=>({
    width:"100%",padding:"13px",borderRadius:10,
    background:active?"linear-gradient(135deg,#7c3aed,#6d28d9)":"rgba(124,58,237,.22)",
    color:"#fff",fontSize:15,fontWeight:700,letterSpacing:.2,
    boxShadow:active?"0 5px 20px rgba(124,58,237,.4)":"none",
    display:"flex",alignItems:"center",justifyContent:"center",gap:8,
    opacity:(!active||load)?.6:1,cursor:(!active||load)?"not-allowed":"pointer",
    transition:"all .3s",
  });

  return (
    <>
      <G/>
      <Stars/>

      {/* Language dropdown */}
      <div style={{position:"fixed",top:18,right:24,zIndex:100}}>
        <div style={{position:"relative"}}>
          <button onClick={()=>setShowL(!showL)} style={{background:"rgba(12,22,58,.8)",border:"1px solid rgba(99,179,237,.22)",borderRadius:8,padding:"6px 14px",color:"#e2e8f0",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"'DM Sans',sans-serif"}}>
            {lang}<svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,.45)" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          {showL&&(
            <div style={{position:"absolute",top:"calc(100% + 5px)",right:0,minWidth:80,background:"rgba(8,18,50,.97)",backdropFilter:"blur(16px)",border:"1px solid rgba(99,179,237,.18)",borderRadius:10,overflow:"hidden",boxShadow:"0 8px 24px rgba(0,0,0,.5)"}}>
              {["EN","मर","हिं","ગુ"].map(l=>(
                <button key={l} className="lang-opt" onClick={()=>{setLang(l);setShowL(false);}} style={{background:l===lang?"rgba(124,58,237,.2)":"transparent",color:l===lang?"#a78bfa":"rgba(255,255,255,.65)"}}>
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Page */}
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#030C20 0%,#06152E 45%,#091E3E 100%)",position:"relative",zIndex:1,padding:"20px 16px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:56,width:"100%",maxWidth:1060,flexWrap:"wrap"}}>

          {/* LEFT */}
          <div style={{flex:"0 0 auto",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:24,minWidth:260}}>
            <BankBuilding/>
            <div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:24,background:"linear-gradient(90deg,#38bdf8,#7c3aed)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:-0.5,marginBottom:6}}>
                Your Trusted Bank
              </h3>
              <p style={{color:"rgba(148,163,184,.5)",fontSize:10,letterSpacing:"3px",textTransform:"uppercase",fontWeight:600}}>
                SECURE · SMART · BANKING
              </p>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className={cardIn?"card-in":""} style={{flex:"0 0 auto",width:"100%",maxWidth:390}}>
            <div style={{background:"rgba(9,18,52,.85)",backdropFilter:"blur(22px)",border:"1px solid rgba(99,179,237,.17)",boxShadow:"0 24px 65px rgba(0,0,0,.6),inset 0 1px 0 rgba(99,179,237,.1)",borderRadius:16,padding:"34px 30px",color:"#e2e8f0",position:"relative",overflow:"hidden"}}>

              <div style={{position:"absolute",top:0,left:"10%",right:"10%",height:1,background:"linear-gradient(90deg,transparent,rgba(56,189,248,.45),rgba(124,58,237,.38),transparent)"}}/>

              {/* Brand */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:9,marginBottom:18}}>
                <div style={{width:34,height:34,borderRadius:9,background:"linear-gradient(135deg,#7c3aed,#6366f1)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(124,58,237,.4)"}}>
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="white" strokeWidth="1.8" fill="none"/><polyline points="9 22 9 12 15 12 15 22" stroke="white" strokeWidth="1.8"/></svg>
                </div>
                <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14,letterSpacing:2,color:"#e2e8f0"}}>PAYZEN BANK</span>
              </div>

              {/* Title */}
              <div style={{textAlign:"center",marginBottom:22}}>
                <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:25,letterSpacing:-.5,marginBottom:5}}>Forgot Password</h2>
                <p style={{color:"rgba(148,163,184,.55)",fontSize:13}}>Reset your account securely</p>
              </div>

              {/* Steps */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,marginBottom:22}}>
                {steps.map((lbl,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:7}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:28,height:28,borderRadius:"50%",fontSize:11,fontWeight:700,transition:"all .3s",
                      background:step===i+1?"linear-gradient(135deg,#7c3aed,#6366f1)":step>i+1?"linear-gradient(135deg,#10b981,#059669)":"rgba(255,255,255,.08)",
                      color:(step===i+1||step>i+1)?"#fff":"rgba(255,255,255,.3)",
                      boxShadow:step===i+1?"0 4px 12px rgba(124,58,237,.5)":"none",
                    }}>{step>i+1?"✓":i+1}</div>
                    <span style={{fontSize:11,fontWeight:500,color:step===i+1?"#e2e8f0":"rgba(148,163,184,.38)",transition:"color .3s"}}>{lbl}</span>
                    {i<2&&<div style={{width:18,height:2,borderRadius:99,transition:"background .4s",background:step>i+1?"linear-gradient(90deg,#10b981,#059669)":"rgba(255,255,255,.1)"}}/>}
                  </div>
                ))}
              </div>

              {/* ══════════════════════════════════
                  STEP 1 — Email + Mail Icon
              ══════════════════════════════════ */}
              {step===1&&(
                <div className="step-in">
                  <div style={{marginBottom:15}}>
                    <label style={{display:"block",fontSize:13,fontWeight:600,color:"rgba(226,232,240,.75)",marginBottom:7}}>
                      Email Address <span style={{color:"#f87171"}}>*</span>
                    </label>
                    {/* Input with Mail icon */}
                    <div style={{position:"relative"}}>
                      <span className="in-icon">
                        <Mail size={16} />
                      </span>
                      <input
                        type="email" placeholder="Enter Email Address" className="pz-in"
                        value={email}
                        onChange={e=>{setEmail(e.target.value);setErr("");}}
                        onKeyDown={e=>e.key==="Enter"&&sendOtp()}
                      />
                    </div>
                  </div>
                  <button onClick={sendOtp} disabled={load} className="pz-btn" style={btnStyle()}>
                    {load?<><SP/> Sending OTP...</>:<><Mail size={16}/> Send OTP</>}
                  </button>
                </div>
              )}

              {/* ══════════════════════════════════
                  STEP 2 — OTP Boxes + KeyRound icon
              ══════════════════════════════════ */}
              {step===2&&(
                <div className="step-in">
                  {/* OTP header with icon */}
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,marginBottom:13}}>
                    <KeyRound size={16} style={{color:"rgba(124,58,237,.8)"}}/>
                    <label style={{fontSize:13,fontWeight:600,color:"rgba(226,232,240,.75)"}}>
                      Enter 6-digit OTP <span style={{color:"#f87171"}}>*</span>
                    </label>
                  </div>

                  {/* OTP Boxes */}
                  <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:16}}>
                    {otp.map((d,i)=>(
                      <div key={i} onClick={()=>refs[i].current.focus()}
                        style={{position:"relative",width:46,height:52,cursor:"text"}}>
                        <div style={{
                          position:"absolute",inset:0,borderRadius:12,
                          background:"rgba(15,25,65,.55)",
                          border:`2px solid ${focusIdx===i?"rgba(124,58,237,.7)":"rgba(99,179,237,.2)"}`,
                          boxShadow:focusIdx===i?"0 0 0 3px rgba(124,58,237,.15)":"none",
                          transition:"border-color .2s, box-shadow .2s",
                          display:"flex",alignItems:"center",justifyContent:"center",
                        }}>
                          {d ? (
                            <div style={{width:9,height:9,borderRadius:"50%",background:"#e2e8f0",boxShadow:"0 0 6px rgba(226,232,240,.6)"}}/>
                          ) : focusIdx===i ? (
                            <div style={{width:2,height:22,background:"#818cf8",borderRadius:1,animation:"cursorBlink 1s step-end infinite"}}/>
                          ) : null}
                        </div>
                        <input
                          ref={refs[i]} type="text" inputMode="numeric" maxLength={1} value={d}
                          onChange={e=>{chOtp(i,e.target.value);setErr("");}}
                          onKeyDown={e=>kyOtp(i,e)}
                          onFocus={()=>setFocusIdx(i)} onBlur={()=>setFocusIdx(-1)}
                          style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0,cursor:"text",zIndex:10,fontSize:16,background:"transparent",border:"none",outline:"none"}}
                        />
                      </div>
                    ))}
                  </div>

                  <p style={{textAlign:"center",color:"rgba(148,163,184,.48)",fontSize:12,marginBottom:3}}>
                    {filled===0?"Enter the 6-digit code":filled<6?`${filled} of 6 entered`:"✅ All digits entered"}
                  </p>
                  <p style={{textAlign:"center",color:"rgba(148,163,184,.48)",fontSize:12,marginBottom:13}}>
                    OTP sent to <span style={{color:"rgba(226,232,240,.65)",fontWeight:600}}>{email}</span>
                  </p>
                  <p style={{textAlign:"center",marginBottom:14}}>
                    <button className="rs-l" onClick={()=>{setStep(1);setOtp(["","","","","",""]);setErr("");}}>
                      OTP नाही आला? Resend करा ↩
                    </button>
                  </p>
                  <button onClick={verOtp} disabled={load||filled<6} className="pz-btn" style={btnStyle(filled===6)}>
                    {load?<><SP/> Verifying...</>:<><ShieldCheck size={16}/> Verify OTP</>}
                  </button>
                </div>
              )}

              {/* ══════════════════════════════════
                  STEP 3 — New & Confirm Password + Lock Icons
              ══════════════════════════════════ */}
              {step===3&&(
                <div className="step-in">

                  {/* New Password */}
                  <div style={{marginBottom:13}}>
                    <label style={{display:"block",fontSize:13,fontWeight:600,color:"rgba(226,232,240,.75)",marginBottom:7}}>
                      New Password <span style={{color:"#f87171"}}>*</span>
                    </label>
                    <div style={{position:"relative"}}>
                      {/* Left Lock Icon */}
                      <span className="in-icon">
                        <Lock size={16} />
                      </span>
                      <input
                        type={showN?"text":"password"} placeholder="Enter New Password"
                        className="pz-in" style={{paddingRight:42}}
                        value={newP} onChange={e=>{setNewP(e.target.value);setErr("");}}
                      />
                      {/* Right Eye Toggle */}
                      <button className="eye" onClick={()=>setShowN(!showN)}
                        style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)"}}>
                        {showN ? <EyeOff size={17}/> : <Eye size={17}/>}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div style={{marginBottom:5}}>
                    <label style={{display:"block",fontSize:13,fontWeight:600,color:"rgba(226,232,240,.75)",marginBottom:7}}>
                      Confirm Password <span style={{color:"#f87171"}}>*</span>
                    </label>
                    <div style={{position:"relative"}}>
                      {/* Left Lock Icon */}
                      <span className="in-icon">
                        <Lock size={16} />
                      </span>
                      <input
                        type={showC?"text":"password"} placeholder="Re-enter New Password"
                        className="pz-in" style={{paddingRight:42}}
                        value={conP} onChange={e=>{setConP(e.target.value);setErr("");}}
                      />
                      {/* Right Eye Toggle */}
                      <button className="eye" onClick={()=>setShowC(!showC)}
                        style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)"}}>
                        {showC ? <EyeOff size={17}/> : <Eye size={17}/>}
                      </button>
                    </div>

                    {/* Password match indicator */}
                    {conP&&(
                      <div style={{display:"flex",alignItems:"center",gap:6,marginTop:7}}>
                        <div style={{width:7,height:7,borderRadius:"50%",background:newP===conP?"#10b981":"#ef4444",boxShadow:newP===conP?"0 0 6px #10b981":"0 0 6px #ef4444"}}/>
                        <span style={{fontSize:12,color:newP===conP?"#6ee7b7":"#fca5a5"}}>
                          {newP===conP?"Passwords match ✓":"Passwords don't match"}
                        </span>
                      </div>
                    )}
                  </div>

                  <button onClick={reset} disabled={load} className="pz-btn" style={{...btnStyle(),marginTop:16}}>
                    {load?<><SP/> Resetting...</>:<><ShieldCheck size={16}/> Reset Password</>}
                  </button>
                </div>
              )}

              {/* Error / Success */}
              {err&&<div className="shk" style={{marginTop:13,padding:"10px 13px",borderRadius:9,background:"rgba(239,68,68,.07)",border:"1px solid rgba(239,68,68,.24)",color:"#fca5a5",fontSize:13,textAlign:"center"}}>{err}</div>}
              {suc&&<div style={{marginTop:13,padding:"10px 13px",borderRadius:9,background:"rgba(16,185,129,.07)",border:"1px solid rgba(16,185,129,.24)",color:"#6ee7b7",fontSize:13,textAlign:"center"}}>{suc}</div>}

              {/* OR */}
              <div style={{display:"flex",alignItems:"center",gap:10,margin:"17px 0 13px"}}>
                <div style={{flex:1,height:1,background:"rgba(99,179,237,.1)"}}/>
                <span style={{color:"rgba(148,163,184,.38)",fontSize:11,fontWeight:600,letterSpacing:2}}>OR</span>
                <div style={{flex:1,height:1,background:"rgba(99,179,237,.1)"}}/>
              </div>

              <p style={{textAlign:"center",fontSize:13,color:"rgba(148,163,184,.5)"}}>
                Remember your password?{" "}
                <button onClick={()=>navigate("/login")} style={{background:"none",border:"none",color:"#7c3aed",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>
                  Login here
                </button>
              </p>

              {step>1&&(
                <div style={{textAlign:"center",marginTop:10}}>
                  <button className="back-l" onClick={()=>{setStep(step-1);setErr("");setSuc("");}}>← Back</button>
                </div>
              )}

              <div style={{position:"absolute",bottom:0,left:"20%",right:"20%",height:1,background:"linear-gradient(90deg,transparent,rgba(124,58,237,.28),transparent)"}}/>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}