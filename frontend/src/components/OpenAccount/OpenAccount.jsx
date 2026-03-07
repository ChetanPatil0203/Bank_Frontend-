import { useState, useRef, useEffect } from "react";
import { PenLine, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OpenAccountPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName:        "",
    fatherName:      "",
    dob:             "",
    gender:          "",
    mobile:          "",
    email:           "",
    address:         "",
    aadhaar:         "",
    pan:             "",
    accountType:     "",
    branch:          "",
    nomineeName:     "",
    nomineeRelation: "",
    agree:           false,
  });

  const [photo, setPhoto]                     = useState(null);
  const [savedSignature, setSavedSignature]   = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [loading, setLoading]                 = useState(false);
  const [alert, setAlert]                     = useState({ show: false, type: "", msg: "" });

  const canvasRef  = useRef(null);
  const isDrawing  = useRef(false);

  // ── Pre-fill from localStorage (login data) ──
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("payzen_user") || "{}");
      setFormData(prev => ({
        ...prev,
        fullName: user.name   || "",
        mobile:   user.mobile || "",
        email:    user.email  || "",
        gender:   user.gender || "",
      }));
    } catch {}
  }, []);

  // ── Signature canvas setup ──
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

  // ── Submit → API call ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) return showAlert("error", "Terms & Conditions accept करा");

    setLoading(true);
    setAlert({ show: false });

    try {
      const token = localStorage.getItem("payzen_token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/v1/account/open", {
        method:  "POST",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        // Account data localStorage मध्ये save करतो → Profile auto-fill होईल
        localStorage.setItem("payzen_account", JSON.stringify(data.account));

        showAlert("success", "Account successfully opened! 🎉");

        // 2 seconds नंतर profile वर navigate
        setTimeout(() => navigate("/profile"), 2000);
      } else {
        showAlert("error", data.message || "काहीतरी error झाला");
      }
    } catch {
      showAlert("error", "Server शी connect होत नाही. Backend चालू आहे का?");
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type, msg) => {
    setAlert({ show: true, type, msg });
    if (type === "error") setTimeout(() => setAlert({ show: false }), 4000);
  };

  // ── Signature drawing ──
  const getPos = (e, canvas) => {
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top)  * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const pos    = getPos(e, canvas);
    canvas.getContext("2d").beginPath();
    canvas.getContext("2d").moveTo(pos.x, pos.y);
    isDrawing.current = true;
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const pos    = getPos(e, canvas);
    canvas.getContext("2d").lineTo(pos.x, pos.y);
    canvas.getContext("2d").stroke();
  };

  const stopDrawing  = () => { isDrawing.current = false; };
  const clearCanvas  = () => canvasRef.current.getContext("2d").clearRect(0, 0, 460, 180);
  const saveSignature = () => {
    setSavedSignature(canvasRef.current.toDataURL("image/png"));
    setShowSignatureModal(false);
  };

  return (
    <div className="min-h-screen py-6 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-blue-900">Open New Account</h2>
          <p className="text-gray-500 text-sm">Secure Banking Registration Portal</p>
        </div>

        {/* Alert */}
        {alert.show && (
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-5 text-sm font-medium
            ${alert.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"}`}>
            {alert.type === "success"
              ? <CheckCircle size={18} />
              : <AlertCircle size={18} />}
            {alert.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Personal Details */}
          <Section title="Personal Details">
            <Input label="Full Name"     name="fullName"   value={formData.fullName}   handleChange={handleChange} />
            <Input label="Father Name"   name="fatherName" value={formData.fatherName} handleChange={handleChange} />
            <Input label="Date of Birth" name="dob"        value={formData.dob}        handleChange={handleChange} type="date" />
            <Select label="Gender" name="gender" value={formData.gender}
              options={["Male","Female","Other"]} handleChange={handleChange} />
          </Section>

          {/* Contact Details */}
          <Section title="Contact Details">
            <Input label="Mobile Number" name="mobile" value={formData.mobile} handleChange={handleChange} />
            <Input label="Email Address" name="email"  value={formData.email}  handleChange={handleChange} type="email" />
            <Textarea label="Residential Address" name="address" value={formData.address} handleChange={handleChange} />
          </Section>

          {/* KYC */}
          <Section title="KYC Verification">
            <Input label="Aadhaar Number" name="aadhaar" value={formData.aadhaar} handleChange={handleChange} />
            <Input label="PAN Number"     name="pan"     value={formData.pan}     handleChange={handleChange} />
          </Section>

          {/* Account Details */}
          <Section title="Account Details">
            <Select label="Account Type" name="accountType" value={formData.accountType}
              options={["Saving Account","Current Account"]} handleChange={handleChange} />
            <Input label="Preferred Branch" name="branch" value={formData.branch} handleChange={handleChange} />
          </Section>

          {/* Nominee */}
          <Section title="Nominee Details">
            <Input label="Nominee Name"          name="nomineeName"     value={formData.nomineeName}     handleChange={handleChange} />
            <Input label="Relation with Nominee" name="nomineeRelation" value={formData.nomineeRelation} handleChange={handleChange} />
          </Section>

          {/* Photo Upload */}
          <div className="rounded-xl p-4 bg-gray-50">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              Upload Photo / Document <span className="text-red-500">*</span>
            </h3>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="rounded-xl p-3 w-full bg-white border"
              required
            />
          </div>

          {/* Terms */}
          <div className="flex gap-2 items-start">
            <input type="checkbox" name="agree" onChange={handleChange} required />
            <p className="text-xs text-gray-600">
              मी confirm करतो की सगळी माहिती बरोबर आहे.{" "}
              <span className="text-red-500">*</span>
            </p>
          </div>

          {/* Signature */}
          <button
            type="button"
            onClick={() => setShowSignatureModal(true)}
            className="flex items-center gap-2 px-5 py-2 bg-white border border-blue-700 text-blue-800 rounded-full"
          >
            <PenLine size={15} />
            {savedSignature ? "Edit Signature" : "Add Signature"}
          </button>

          {savedSignature && (
            <div className="border rounded-xl p-3 bg-gray-50 inline-block">
              <p className="text-xs text-gray-500 mb-1">Your Signature:</p>
              <img src={savedSignature} alt="signature" className="h-14" />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold
              rounded-xl py-3 flex items-center justify-center gap-2
              disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {loading
              ? <><Loader size={18} className="animate-spin" /> Opening Account...</>
              : "Open Account"}
          </button>

        </form>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50
          flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Your Signature</h3>
            <canvas
              ref={canvasRef}
              width={460} height={180}
              className="border-2 border-dashed border-blue-300 rounded-xl w-full cursor-crosshair bg-blue-50"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
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
    </div>
  );
}

/* ── Reusable Components ── */

function Section({ title, children }) {
  return (
    <div className="rounded-xl p-3 bg-gray-50">
      <h3 className="text-base font-semibold text-blue-900 mb-2">{title}</h3>
      <div className="grid md:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function Input({ label, type = "text", name, value, handleChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type} name={name} value={value} onChange={handleChange}
        className="rounded-xl p-2 bg-white border focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
    </div>
  );
}

function Select({ label, name, value, options, handleChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <select name={name} value={value} onChange={handleChange}
        className="rounded-xl p-2 bg-white border focus:ring-2 focus:ring-blue-500 outline-none"
        required>
        <option value="">Select {label}</option>
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function Textarea({ label, name, value, handleChange }) {
  return (
    <div className="flex flex-col gap-1 md:col-span-2">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <textarea name={name} value={value} onChange={handleChange}
        className="rounded-xl p-2 bg-white border h-20 focus:ring-2 focus:ring-blue-500 outline-none"
        required />
    </div>
  );
}