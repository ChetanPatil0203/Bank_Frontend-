import { useState, useRef, useEffect } from "react";
import { X, PenLine } from "lucide-react";

export default function OpenAccount() {

  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    aadhaar: "",
    pan: "",
    accountType: "",
    branch: "",
    nomineeName: "",
    nomineeRelation: "",
    agree: false,
  });

  const [photo, setPhoto] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // Signature states
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [savedSignature, setSavedSignature] = useState(null);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) return alert("Accept Terms & Conditions");
    alert("Account Application Submitted ✅");
  };

  const isPDF = photo && photo.type === "application/pdf";

  // ---- Signature Canvas Logic ----
  useEffect(() => {
    if (showSignatureModal && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#1d4ed8";
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
  }, [showSignatureModal]);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    isDrawing.current = true;
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    setSavedSignature(dataUrl);
    setShowSignatureModal(false);
  };

  const cancelSignature = () => {
    setShowSignatureModal(false);
  };

  return (
    <div className="min-h-screen py-6 px-4 bg-gray-50">

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 transition-all duration-500">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-blue-900">Open New Account</h2>
          <p className="text-gray-500 text-sm">Secure Banking Registration Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <Section title="Personal Details">
            <Input label="Full Name" name="fullName" handleChange={handleChange}/>
            <Input label="Father Name" name="fatherName" handleChange={handleChange}/>
            <Input label="Date of Birth" type="date" name="dob" handleChange={handleChange}/>
            <Select label="Gender" name="gender" options={["Male","Female","Other"]} handleChange={handleChange}/>
          </Section>

          <Section title="Contact Details">
            <Input label="Mobile Number" name="mobile" handleChange={handleChange}/>
            <Input label="Email Address" type="email" name="email" handleChange={handleChange}/>
            <Textarea label="Residential Address" name="address" handleChange={handleChange}/>
          </Section>

          <Section title="KYC Verification">
            <Input label="Aadhaar Number" name="aadhaar" handleChange={handleChange}/>
            <Input label="PAN Number" name="pan" handleChange={handleChange}/>
          </Section>

          <div className="rounded-xl p-4 bg-gray-50">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              Upload Photo / Document <span className="text-red-500">*</span>
            </h3>
            <div className="relative flex items-center">
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="rounded-xl p-3 w-full bg-white border focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              {photo && (
                <button
                  type="button"
                  onClick={() => setShowImageModal(true)}
                  className="absolute right-4 text-blue-700 text-sm font-medium"
                >
                  View
                </button>
              )}
            </div>
          </div>

          <Section title="Account Details">
            <Select label="Account Type" name="accountType" options={["Saving Account","Current Account"]} handleChange={handleChange}/>
            <Input label="Preferred Branch" name="branch" handleChange={handleChange}/>
          </Section>

          <Section title="Nominee Details">
            <Input label="Nominee Name" name="nomineeName" handleChange={handleChange}/>
            <Input label="Relation with Nominee" name="nomineeRelation" handleChange={handleChange}/>
          </Section>

          <div className="flex gap-2 items-start">
            <input type="checkbox" name="agree" onChange={handleChange}/>
            <p className="text-xs text-gray-600">
              I confirm that all provided details are correct.
            </p>
          </div>

          {/* BOTTOM: Submit + Signature */}
          <div className="flex items-center justify-between pt-2">

            {/* Signature area - bottom left */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSignatureModal(true)}
                className="flex items-center gap-2 px-5 py-2 bg-white border border-blue-700 text-blue-800 rounded-full text-sm font-medium shadow-sm hover:bg-blue-50 transition"
              >
                <PenLine size={15} />
                {savedSignature ? "Edit Signature" : "Add Signature"}
              </button>
              {savedSignature && (
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1 bg-white shadow-sm">
                  <img src={savedSignature} alt="Signature" className="h-8 w-auto object-contain" />
                  <button
                    type="button"
                    onClick={() => setSavedSignature(null)}
                    className="text-gray-400 hover:text-red-500 transition ml-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Submit - bottom right */}
            <button
              type="submit"
              className="px-8 py-2 bg-blue-800 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition"
            >
              Open Account
            </button>
          </div>

        </form>
      </div>

      {/* IMAGE/PDF MODAL */}
      {showImageModal && photo && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="relative w-full max-w-4xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
            >
              <X size={22} className="text-gray-800" />
            </button>
            <div className="w-full h-full overflow-auto p-6">
              {isPDF ? (
                <iframe
                  src={URL.createObjectURL(photo)}
                  className="w-full h-full border-0"
                  title="PDF Document"
                />
              ) : (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Uploaded"
                  className="w-full h-auto object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* SIGNATURE MODAL */}
      {showSignatureModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={cancelSignature}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PenLine size={18} className="text-blue-800" />
                <h3 className="text-base font-semibold text-blue-900">Draw Your Signature</h3>
              </div>
              <button
                onClick={cancelSignature}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-xs text-gray-500 mb-3">Use your mouse or finger to sign below</p>

            {/* Canvas */}
            <div className="border-2 border-dashed border-blue-200 rounded-xl overflow-hidden bg-gray-50 relative">
              <canvas
                ref={canvasRef}
                width={460}
                height={180}
                className="w-full touch-none cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              <span className="absolute bottom-2 right-3 text-xs text-gray-300 select-none">Sign here</span>
            </div>

            {/* Clear */}
            <div className="flex justify-end mt-2 mb-4">
              <button
                type="button"
                onClick={clearCanvas}
                className="text-xs text-gray-400 hover:text-red-500 transition underline"
              >
                Clear
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={cancelSignature}
                className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveSignature}
                className="px-6 py-2 rounded-full bg-blue-800 text-white text-sm font-medium shadow hover:shadow-md hover:bg-blue-900 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Section({ title, children }) {
  return (
    <div className="rounded-xl p-3 bg-gray-50">
      <h3 className="text-base font-semibold text-blue-900 mb-1 leading-tight">
        {title}
      </h3>
      <div className="grid md:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function Input({ label, type="text", name, handleChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        className="rounded-xl p-2 bg-white border focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
    </div>
  );
}

function Select({ label, name, options, handleChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        name={name}
        onChange={handleChange}
        className="rounded-xl p-2 bg-white border focus:ring-2 focus:ring-blue-500 outline-none"
        required
      >
        <option value="">Select {label}</option>
        {options.map((opt) => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function Textarea({ label, name, handleChange }) {
  return (
    <div className="flex flex-col gap-1 md:col-span-2">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <textarea
        name={name}
        onChange={handleChange}
        className="rounded-xl p-2 bg-white border h-20 focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
    </div>
  );
}