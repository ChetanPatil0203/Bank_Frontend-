import { useState, useRef, useEffect } from "react";
import { X, PenLine } from "lucide-react";

export default function OpenAccountPage() {

  const [formData, setFormData] = useState({
    fullName:"",
    fatherName:"",
    dob:"",
    gender:"",
    mobile:"",
    email:"",
    address:"",
    aadhaar:"",
    pan:"",
    accountType:"",
    branch:"",
    nomineeName:"",
    nomineeRelation:"",
    agree:false,
  });

  const [photo, setPhoto] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [savedSignature, setSavedSignature] = useState(null);

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) return alert("Accept Terms & Conditions");
    alert("Account Application Submitted Successfully ✅");
  };

  const isPDF = photo && photo.type === "application/pdf";

  /* Signature Canvas Setup */
  useEffect(() => {
    if (showSignatureModal && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
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
        x:(e.touches[0].clientX-rect.left)*scaleX,
        y:(e.touches[0].clientY-rect.top)*scaleY
      };
    }
    return {
      x:(e.clientX-rect.left)*scaleX,
      y:(e.clientY-rect.top)*scaleY
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

  const stopDrawing = () => { isDrawing.current = false; };

  const clearCanvas = () => {
    canvasRef.current.getContext("2d").clearRect(0,0,460,180);
  };

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

          <Section title="Account Details">
            <Select label="Account Type" name="accountType"
              options={["Saving Account","Current Account"]}
              handleChange={handleChange}/>
            <Input label="Preferred Branch" name="branch" handleChange={handleChange}/>
          </Section>

          <Section title="Nominee Details">
            <Input label="Nominee Name" name="nomineeName" handleChange={handleChange}/>
            <Input label="Relation with Nominee" name="nomineeRelation" handleChange={handleChange}/>
          </Section>

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

          <div className="flex gap-2 items-start">
            <input type="checkbox" name="agree" onChange={handleChange} required/>
            <p className="text-xs text-gray-600">
              I confirm that all provided details are correct. <span className="text-red-500">*</span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowSignatureModal(true)}
            className="flex items-center gap-2 px-5 py-2 bg-white border border-blue-700 text-blue-800 rounded-full"
          >
            <PenLine size={15}/>
            {savedSignature ? "Edit Signature" : "Add Signature"}
          </button>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white font-semibold rounded-xl py-3"
          >
            Open Account
          </button>

        </form>
      </div>
    </div>
  );
}

/* ---------- reusable components ---------- */

function Section({ title, children }) {
  return (
    <div className="rounded-xl p-3 bg-gray-50">
      <h3 className="text-base font-semibold text-blue-900 mb-2">{title}</h3>
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
        {options.map(opt => <option key={opt}>{opt}</option>)}
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