import { useState, useRef, useEffect } from "react";
import { PenLine, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { openAccount } from "../../utils/apiServices";

/* ── SUCCESS POPUP ── */
function SuccessPopup({ data }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(10,20,50,0.75)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, overflow: "hidden",
        maxWidth: 440, width: "100%",
        boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
        animation: "popIn 0.45s cubic-bezier(.22,1,.36,1)",
      }}>

        {/* Top dark navy banner */}
        <div style={{
          background: "linear-gradient(135deg, #0d1b3e 0%, #1a2f5e 50%, #0f2460 100%)",
          padding: "36px 32px 32px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
          <div style={{ position:"absolute", bottom:-30, left:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.03)" }}/>

          {/* Simple green checkmark — centered */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom: 16, position:"relative", zIndex:1 }}>
            <CheckCircle size={52} color="#4ade80" strokeWidth={1.8} style={{ filter: "drop-shadow(0 0 12px rgba(74,222,128,0.4))" }}/>
          </div>

          <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, position:"relative", zIndex:1 }}>
            Account Opened Successfully
          </p>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: 0, position:"relative", zIndex:1 }}>
            Welcome, {data.bank_holder_name}
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 8, position:"relative", zIndex:1 }}>
            Your bank account is now active and ready to use.
          </p>
        </div>

        {/* Account details — light section */}
        <div style={{ padding: "24px 28px", background: "#f8f9fc" }}>

          {/* Account number — no icon */}
          <div style={{
            background: "#fff", border: "1.5px solid #e2e8f0",
            borderRadius: 14, padding: "14px 18px", marginBottom: 12,
          }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
              Account Number
            </p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#0d1b3e", fontFamily: "monospace", letterSpacing: 3 }}>
              {data.account_number}
            </p>
          </div>

          {/* IFSC + Type row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:12, padding:"12px 14px" }}>
              <p style={{ fontSize:10, fontWeight:600, color:"#94a3b8", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>IFSC Code</p>
              <p style={{ fontSize:14, fontWeight:600, color:"#1e293b", fontFamily:"monospace" }}>{data.ifsc}</p>
            </div>
            <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:12, padding:"12px 14px" }}>
              <p style={{ fontSize:10, fontWeight:600, color:"#94a3b8", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Account Type</p>
              <p style={{ fontSize:14, fontWeight:600, color:"#1e293b" }}>{data.account_type}</p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes popIn { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function OpenAccountPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bank_holder_name: "", father_name: "", dob: "", gender: "",
    mobile: "", email: "", address: "", aadhaar: "", pan: "",
    account_type: "", branch: "", nominee_name: "", nominee_relation: "",
    agree: false,
  });

  const [successData, setSuccessData]               = useState(null);
  const [photo, setPhoto]                           = useState(null);
  const [savedSignature, setSavedSignature]         = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [loading, setLoading]                       = useState(false);
  const [alert, setAlert]                           = useState({ show: false, type: "", msg: "" });

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  // Pre-fill from localStorage
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("payzen_user") || "{}");
      setFormData(prev => ({
        ...prev,
        bank_holder_name: user.name          || "",
        mobile:           user.mobile        || "",
        email:            user.email         || "",
        gender:           user.gender        || "",
        dob:              user.date_of_birth || "",
      }));
    } catch {}
  }, []);

  // Signature canvas setup
  useEffect(() => {
    if (showSignatureModal && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.strokeStyle = "#1d4ed8";
      ctx.lineWidth   = 2.2;
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";
    }
  }, [showSignatureModal]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleAadhaar = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12);
    setFormData({ ...formData, aadhaar: value });
  };

  const handlePan = (e) => {
    const value = e.target.value.toUpperCase().slice(0, 10);
    setFormData({ ...formData, pan: value });
  };

  const showAlertMsg = (type, msg) => {
    setAlert({ show: true, type, msg });
    if (type === "error") setTimeout(() => setAlert({ show: false }), 4000);
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) { showAlertMsg("error", "Please accept the Terms & Conditions"); return; }
    if (formData.aadhaar.length !== 12) { showAlertMsg("error", "Aadhaar number must be exactly 12 digits"); return; }
    if (formData.pan.length !== 10)     { showAlertMsg("error", "PAN number must be exactly 10 characters"); return; }

    setLoading(true);
    setAlert({ show: false });

    const res = await openAccount({
      bank_holder_name: formData.bank_holder_name,
      father_name:      formData.father_name,
      dob:              formData.dob,
      gender:           formData.gender,
      mobile:           formData.mobile,
      email:            formData.email,
      address:          formData.address,
      aadhaar:          formData.aadhaar,
      pan:              formData.pan,
      account_type:     formData.account_type,
      branch:           formData.branch,
      nominee_name:     formData.nominee_name,
      nominee_relation: formData.nominee_relation,
    });

    setLoading(false);

    if (res.ok && res.data.success) {
      localStorage.setItem("payzen_account", JSON.stringify(res.data.data));
      setSuccessData(res.data.data);
      setTimeout(() => navigate("/dashboard"), 3500);
    } else {
      showAlertMsg("error", res.data.message || "Something went wrong. Please try again.");
    }
  };

  // Signature drawing
  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width, sy = canvas.height / rect.height;
    if (e.touches) return { x: (e.touches[0].clientX - rect.left) * sx, y: (e.touches[0].clientY - rect.top) * sy };
    return { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy };
  };
  const startDrawing = (e) => {
    e.preventDefault();
    const p = getPos(e, canvasRef.current);
    canvasRef.current.getContext("2d").beginPath();
    canvasRef.current.getContext("2d").moveTo(p.x, p.y);
    isDrawing.current = true;
  };
  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const p = getPos(e, canvasRef.current);
    canvasRef.current.getContext("2d").lineTo(p.x, p.y);
    canvasRef.current.getContext("2d").stroke();
  };
  const stopDrawing   = () => { isDrawing.current = false; };
  const clearCanvas   = () => canvasRef.current.getContext("2d").clearRect(0, 0, 460, 180);
  const saveSignature = () => { setSavedSignature(canvasRef.current.toDataURL("image/png")); setShowSignatureModal(false); };

  return (
    <>
      {successData && <SuccessPopup data={successData} />}

      <div className="min-h-screen py-6 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">

          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-blue-900">Open New Account</h2>
            <p className="text-gray-500 text-sm">Secure Banking Registration Portal</p>
          </div>

          {alert.show && (
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-5 text-sm font-medium
              ${alert.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"}`}>
              {alert.type === "success" ? <CheckCircle size={18}/> : <AlertCircle size={18}/>}
              {alert.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Personal Details */}
            <Section title="Personal Details">
              <Field label="Full Name (Bank Holder)">
                <input type="text" name="bank_holder_name" value={formData.bank_holder_name}
                  onChange={handleChange} required placeholder="Enter full name"
                  className="rounded-xl p-2 bg-white border w-full focus:ring-2 focus:ring-blue-500 outline-none"/>
              </Field>
              <Field label="Father Name">
                <input type="text" name="father_name" value={formData.father_name}
                  onChange={handleChange} required placeholder="Enter father's name"
                  className="rounded-xl p-2 bg-white border w-full focus:ring-2 focus:ring-blue-500 outline-none"/>
              </Field>
              <Field label="Date of Birth">
                <input type="date" name="dob" value={formData.dob}
                  onChange={handleChange} required
                  className="rounded-xl p-2 bg-white border w-full focus:ring-2 focus:ring-blue-500 outline-none"/>
              </Field>
              <Field label="Gender">
                <select name="gender" value={formData.gender} onChange={handleChange} required
                  className="rounded-xl p-2 bg-white border w-full focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Select Gender</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </Field>
            </Section>

            {/* Contact Details */}
            <Section title="Contact Details">
              <Field label="Mobile Number">
                <input type="tel" name="mobile" value={formData.mobile}
                  onChange={handleChange} required placeholder="10-digit mobile number"
                  maxLength={10}
                  className="rounded-xl p-2 bg-white border w-full focus:ring-2 focus:ring-blue-500 outline-none"/>
              </Field>
              <Field label="Email Address">
                <input type="email" name="email" value={formData.email}
                  onChange={handleChange} required placeholder="your@email.com"
                  className="rounded-xl p-2 bg-white border w-full focus:ring-2 focus:ring-blue-500 outline-none"/>
              </Field>
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Residential Address <span className="text-red-500">*</span></label>
                <textarea name="address" value={formData.address} onChange={handleChange} required
                  placeholder="Enter your full address"
                  className="rounded-xl p-2 bg-white border h-20 w-full focus:ring-2 focus:ring-blue-500 outline-none"/>
              </div>
            </Section>

            {/* KYC Verification */}
            <Section title="KYC Verification">
              <Field label="Aadhaar Number">
                <input type="text" name="aadhaar" value={formData.aadhaar}
                  onChange={handleAadhaar} required
                  placeholder="123456789012" maxLength={12}
                  className="rounded-xl p-2 bg-white border w-full focus:ring-2 focus:ring-blue-500 outline-none tracking-widest"/>
              </Field>
              <Field label="PAN Number">
                <input type="text" name="pan" value={formData.pan}
                  onChange={handlePan} required
                  placeholder="ABCDE1234F" maxLength={10}
                  className="rounded-xl p-2 bg-white border w-full focus:ring-2 focus:ring-blue-500 outline-none tracking-widest uppercase"/>
              </Field>
            </Section>

            {/* Account Details */}
            <Section title="Account Details">
              <Field label="Account Type">
                <select name="account_type" value={formData.account_type} onChange={handleChange} required
                  className="rounded-xl p-2 bg-white border w-full focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Select Account Type</option>
                  <option>Saving Account</option>
                  <option>Current Account</option>
                </select>
              </Field>
              <Field label="Preferred Branch">
                <input type="text" name="branch" value={formData.branch}
                  onChange={handleChange} required placeholder="e.g. Nashik Main Branch"
                  className="rounded-xl p-2 bg-white border w-full focus:ring-2 focus:ring-blue-500 outline-none"/>
              </Field>
            </Section>

            {/* Nominee Details */}
            <Section title="Nominee Details">
              <Field label="Nominee Name">
                <input type="text" name="nominee_name" value={formData.nominee_name}
                  onChange={handleChange} required placeholder="Enter nominee full name"
                  className="rounded-xl p-2 bg-white border w-full focus:ring-2 focus:ring-blue-500 outline-none"/>
              </Field>
              <Field label="Relation with Nominee">
                <input type="text" name="nominee_relation" value={formData.nominee_relation}
                  onChange={handleChange} required placeholder="e.g. Father, Mother, Spouse"
                  className="rounded-xl p-2 bg-white border w-full focus:ring-2 focus:ring-blue-500 outline-none"/>
              </Field>
            </Section>

            {/* Photo Upload */}
            <div className="rounded-xl p-4 bg-gray-50">
              <h3 className="text-base font-semibold text-blue-900 mb-3">
                Upload Photo / Document <span className="text-red-500">*</span>
              </h3>
              <input type="file" accept="image/*,application/pdf"
                onChange={e => setPhoto(e.target.files[0])}
                className="rounded-xl p-3 w-full bg-white border" required/>
            </div>

            {/* Terms */}
            <div className="flex gap-2 items-start">
              <input type="checkbox" name="agree" onChange={handleChange} className="mt-1" required/>
              <p className="text-xs text-gray-600">
                I confirm that all the information provided is accurate and correct.{" "}
                <span className="text-red-500">*</span>
              </p>
            </div>

            {/* Signature */}
            <button type="button" onClick={() => setShowSignatureModal(true)}
              className="flex items-center gap-2 px-5 py-2 bg-white border border-blue-700 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-50 transition-all">
              <PenLine size={15}/>
              {savedSignature ? "Edit Signature" : "Add Signature"}
            </button>

            {savedSignature && (
              <div className="border rounded-xl p-3 bg-gray-50 inline-block">
                <p className="text-xs text-gray-500 mb-1">Your Signature:</p>
                <img src={savedSignature} alt="signature" className="h-14"/>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold
                rounded-xl py-3 flex items-center justify-center gap-2
                disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg">
              {loading
                ? <><Loader size={18} className="animate-spin"/> Opening Account...</>
                : "Open Account"}
            </button>

          </form>
        </div>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Draw Your Signature</h3>
            <canvas ref={canvasRef} width={460} height={180}
              className="border-2 border-dashed border-blue-300 rounded-xl w-full cursor-crosshair bg-blue-50"
              onMouseDown={startDrawing} onMouseMove={draw}
              onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
              onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}/>
            <div className="flex gap-3 mt-4">
              <button onClick={clearCanvas}
                className="flex-1 py-2 border border-gray-300 rounded-xl text-gray-600 text-sm hover:bg-gray-50">
                Clear
              </button>
              <button onClick={() => setShowSignatureModal(false)}
                className="flex-1 py-2 border border-red-300 rounded-xl text-red-500 text-sm hover:bg-red-50">
                Cancel
              </button>
              <button onClick={saveSignature}
                className="flex-1 py-2 bg-blue-900 rounded-xl text-white text-sm font-semibold hover:bg-blue-800">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Reusable Components ── */
function Section({ title, children }) {
  return (
    <div className="rounded-xl p-4 bg-gray-50">
      <h3 className="text-base font-semibold text-blue-900 mb-3">{title}</h3>
      <div className="grid md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}