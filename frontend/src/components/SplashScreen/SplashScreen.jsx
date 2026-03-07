import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {

const navigate = useNavigate();
const [progress,setProgress] = useState(0);
const [isMobile,setIsMobile] = useState(window.innerWidth < 768);
const speechRef = useRef(null);


/* SCREEN SIZE DETECT */

useEffect(()=>{

const handleResize = () =>{
setIsMobile(window.innerWidth < 768)
}

window.addEventListener("resize",handleResize)

return ()=> window.removeEventListener("resize",handleResize)

},[])



/* VOICE */

useEffect(()=>{

const speak = () => {

if("speechSynthesis" in window){

const msg = new SpeechSynthesisUtterance("Welcome to PayZen Bank");

const voices = window.speechSynthesis.getVoices();

msg.voice = voices.find(v => v.lang === "en-US");

msg.rate = 0.95;
msg.pitch = 1.15;

speechRef.current = msg;

window.speechSynthesis.speak(msg);

}

};

setTimeout(speak,1000);

return ()=> window.speechSynthesis.cancel();

},[]);



/* PROGRESS */

useEffect(()=>{

let val = 0;

const timer = setInterval(()=>{

val += 1.5;

setProgress(Math.min(val,100));

if(val >= 100){

clearInterval(timer);

setTimeout(()=>{

window.speechSynthesis.cancel();

navigate("/registration");

},500);

}

},40);

return ()=>clearInterval(timer);

},[navigate]);


const particles = Array.from({length:20});


/* RESPONSIVE VALUES */

const orbit1 = isMobile ? 260 : 360
const orbit2 = isMobile ? 200 : 270
const orbit3 = isMobile ? 140 : 185

const titleSize = isMobile ? 42 : 62
const logoSize = isMobile ? 70 : 100
const progressWidth = isMobile ? 180 : 220


return(

<div style={{
minHeight:"100vh",
display:"flex",
alignItems:"center",
justifyContent:"center",
position:"relative",
overflow:"hidden",
background:"linear-gradient(135deg,#03071e 0%,#05103a 40%,#0a0a2e 70%,#03071e 100%)",
fontFamily:"Georgia,serif",
padding:isMobile ? 20 : 0
}}>


{/* GRID */}

<div style={{
position:"absolute",
inset:0,
backgroundImage:"radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)",
backgroundSize:"32px 32px"
}}/>


{/* PARTICLES */}

{particles.map((_,i)=>(

<div
key={i}
style={{
position:"absolute",
width:3,
height:3,
borderRadius:"50%",
background:"#60a5fa",
top:`${Math.random()*100}%`,
left:`${Math.random()*100}%`,
opacity:0.6,
animation:"float 4s ease-in-out infinite"
}}
/>

))}



{/* CENTER */}

<div style={{
zIndex:5,
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
position:"relative"
}}>


{/* ORBIT */}

{[
{ sz: orbit1, spd: 24, rev: false, dot: 9 },
{ sz: orbit2, spd: 17, rev: true, dot: 7 },
{ sz: orbit3, spd: 11, rev: false, dot: 5 }
].map((r,i)=>(

<div key={i} style={{
position:"absolute",
borderRadius:"50%",
width:r.sz,
height:r.sz,
top:"50%",
left:"50%",
transform:"translate(-50%,-50%)",
border:"1px solid rgba(56,189,248,0.15)",
animation:`orbitSpin ${r.spd}s linear infinite ${r.rev?"reverse":"normal"}`
}}>

<div style={{
position:"absolute",
borderRadius:"50%",
width:r.dot,
height:r.dot,
background:"#38bdf8",
boxShadow:"0 0 14px #38bdf8",
top:`calc(-${r.dot/2}px)`,
left:"50%",
transform:"translateX(-50%)"
}}/>

</div>

))}



{/* LOGO */}

<div style={{
marginBottom:20,
animation:"hexFloat 5s ease-in-out infinite"
}}>

<svg width={logoSize} height={logoSize} viewBox="0 0 100 100">

<path
d="M50 4 L90 26 L90 74 L50 96 L10 74 L10 26 Z"
fill="rgba(29,78,216,0.2)"
stroke="rgba(56,189,248,0.8)"
strokeWidth="1.5"
/>

<text
x="50"
y="63"
fontSize="34"
fontWeight="900"
fill="white"
textAnchor="middle"
>
P
</text>

</svg>

</div>



{/* TITLE */}

<h1 style={{
fontSize:titleSize,
fontWeight:900,
letterSpacing:-3,
color:"#fff",
textAlign:"center"
}}>
Pay
<span style={{
background:"linear-gradient(135deg,#38bdf8,#818cf8)",
WebkitBackgroundClip:"text",
WebkitTextFillColor:"transparent"
}}>
Zen
</span>
</h1>



<p style={{
marginTop:16,
fontSize:isMobile ? 12 : 14,
textAlign:"center",
color:"rgba(180,210,255,0.5)"
}}>
Secure, intelligent banking <br/>
always at your fingertips.
</p>



{/* PROGRESS */}

<div style={{
marginTop:30,
width:progressWidth,
height:4,
background:"rgba(255,255,255,0.1)",
borderRadius:50,
overflow:"hidden"
}}>

<div style={{
width:`${progress}%`,
height:"100%",
background:"linear-gradient(90deg,#3b82f6,#a78bfa)"
}}/>

</div>

<p style={{
marginTop:8,
fontSize:11,
color:"rgba(255,255,255,0.3)"
}}>
{Math.round(progress)}%
</p>

</div>



<style>

{`

@keyframes orbitSpin{
from{transform:translate(-50%,-50%) rotate(0deg);}
to{transform:translate(-50%,-50%) rotate(360deg);}
}

@keyframes hexFloat{
0%,100%{transform:translateY(0);}
50%{transform:translateY(-12px);}
}

@keyframes float{
0%,100%{transform:translateY(0);}
50%{transform:translateY(-10px);}
}

`}

</style>

</div>

)

}