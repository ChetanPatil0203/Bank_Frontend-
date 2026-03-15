import { ArrowDownToLineIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../utils/apiServices";
import jsPDF from "jspdf";

const PAYZEN_LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABpAJoDASIAAhEBAxEB/8QAHAABAAEFAQEAAAAAAAAAAAAAAAECAwQFBwYI/8QAPRAAAQMDAwEFBQMJCQAAAAAAAQACAwQFEQYSITEHExRBYSIyUXGBCHKRFSMzUnShorLBFjQ1N0J1grGz/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIDBAEFBv/EACkRAAICAQIEBQUBAAAAAAAAAAABAhEDITEEEkFREyIyYXEFFIGh8LH/2gAMAwEAAhEDEQA/AOFoiL7s8EIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAhERAEREAREQBERAERVNAK6lZwpRXAwLIpKGWpyY2AMb70jjhrfmSpKDexxyS3MNFvam32h9FTsoquR1cM993vsxP542Hy+uFqp6d8Mhjljcxw8iMLrxSjuRhlUtjHRXC0fBUOGFBqidkIiLh0IiICEREAREQBERAEREAWfardW3KV0NDA6Z7GGRwBAw0dTyVgLbWCSSOaYxvcwuppGnacZG3orMauVFWVyUW47lxkFHS8yuFXN+ow4jafU9XfTHzUzPmn29+/YxvuxtGA0ejR0VEPsxBwADiSM/gs2z22ru1cyiomxvqH+418zI9x+ALyAT6dV6MIRirMzfVmGWREY2lvrnJ+qq7yRkQjla2ogHQO52/I9QvTf2A1V4p9ILfC6pjZ3joW1sBkDfjtD84XmpWSwTPikY+KRji17XDBaR1BCl5J7OzkZ9mW4rca2dsVuzJK84bC8gOz6Hof3fJa6shlp55IJmFksbyx7T1BHBC21KSy4UkkZ2P7xpy0453LV17nOqJHuJc4vJJJ5JyseeCjsX45Sb9jGREWQ0BERAQiIgCIiAIiIAiIgC2lmP5yT9nk/lK1a2ljZJJLKI2OeW08hO0ZwNvVW4fUV5PSXWfoG/eP9Fs9MO26jtbvhWRH+MLVxe1EGtILgScfgsu1Vpt9dHVinhnfEQ5jZd2A4HIPskdF6i1RjndOjquqNQ2uwdoE93mbWVFaKIRxQsY1sfPmXl2f4ePVctvdwlut2qbjOGtkqJDIQOgz5LJ1HfZ77UtqaulpY5wA0viDgXAdAQXELVYLjgDJUYY1D5KcGNxinLcuQf32j++3+Zaqu/TP++VtqMF9yo44/bd3jRhozzuWpuAc2plY8FrmyEEHqDlZuJehtwvWjGREWE0hSoRAEUIuAlFCICUUIgJRQpwgCz7Xcay3SOloqh0L3xmNxGDlp6jlYOFUCFKDpkZRUlTNnHNTT8SAU8n6zRlh+Y8vp+CuyCWIN75u9jvdeDkH5HzWo3gLIpa6WnyGPBY73mOGWu+YWuHEVuVSx2ZhdEBncXemMK62KR8Qlmeympz0c7/V8h1cpqLjaGUVPJRUkgrjnvu9O6JnPGwef/LK1NRVSTyGSaV0jz5uOVOfELoVQxuWtUbNl0FBM2S1tMcrDkVEgBf9B0b+8+q1dZPLUTSTzPL5ZHl73HqSeSVbLx8VS45WWeRyL4Y1F3WpCKEVJaSihSgIRQiAlFCICUUIgKgpCgLIt9S+jrYauNkEj4nh7WzRNlY4jycxwLXD0IXGEWgFOMr6w7UqOhtPZroq+ac0Hpae7XSqp2z07LDTPFQHwvc5gBYS0EgcjBHxVPbp2MUGoL1Z6bQlptlqur4XyV8UeIYI4hja9zWg4O7IG1uTz8OPPj9Qg2uZUnf6NL4Z60fKOFSQurnsQ1B+SqK8R6j0zJaquo8MK0VE7Y4pNxYGv3RBzcvG3p164VrUnYpf7Bqy0aZueoNPRV93z4XDqlzCQcAFwh4yePP1wtK4rE3V/wAirwp9jlahevu0UWkKq5afY6zXq5NqGsNZDD4iGPGdzWd6wEuzweMcea315FJpvRzHXe3WuovdaD3TPAQt7kHzw1o6f9rXjipx5k9DHkzShLl5d3S1/tDmSL0NHpG5Tsou+qKOjlrsmlhqHOD5RjOQGtIHpkhVUui77PHWP7uni8HuErZJ25BAzjAzjI6E4HnlPDn2LlOL2Z5xFvLlpevorGy8ipoqqkc7Y51PLv2H4HjHXjglaJRlFx3JEooRcARQiHSUUIgJRQiAqCybfTPrK2GlifCx8rwxrppmxMBPm57iGtHqSAsYdFUFxg+se1/Ugj7E7DQ6Q7QbRT3e1MhdWx27UMUcz42Qua5rdkgL/ax7IznHGSvBfZkulgqNX3m7a21bPSV/h2eGlrLvJTtqDk7hI/eN+MN9knByeCuHBSFijwajieO9+vUveZuSlWx9Ua3vVquP2d7hpqHVWi33yOq7x1Nba6GCEtFQJcRB2zdhuORncQeSVYqe0q13P7P1v1fcmNk1VZ5H26jkd73iXR7O8Hx/Nu3nHmFxjsB/zk0x+2j+Urpn2tf8Np/99q//ADjWSWCMMscXd3f+r4ZasjcHP8HK+zOmtLauW93evo2vpifD081Qxj5JMZ3e0R9D8fkrdRTzX/VJuV/uFrgpc7i0XGF2GN6RtDXk8/1JXjXeSoK91ZFypUeZ4Pnc71f6OpX28xXqlt1zsl4s1FU07NskVayISRu4OWF7SeOeitWGvjqLbqN9ffrdPU10IjjkfLHD3jgxzeGkggZIAJAz1XMUU/uHdtFkIKCpHvqR1Mzsoq7e+vt4q3TGZsPi495aC09M9eDx1XglCKuc+avYkkSihFA6f//Z";

export default function AccountDetails() {
  const navigate  = useNavigate();
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("payzen_user");
    if (!stored) { navigate("/login"); return; }
    getProfile().then(res => {
      if (res.ok && res.data.success) {
        setData(res.data.data);
      } else if (res.status === 401) {
        localStorage.removeItem("payzen_token");
        localStorage.removeItem("payzen_user");
        navigate("/login");
      } else {
        setError("Failed to load account details.");
      }
      setLoading(false);
    }).catch(() => {
      try { setData(JSON.parse(localStorage.getItem("payzen_user"))); }
      catch { setError("Something went wrong."); }
      setLoading(false);
    });
  }, [navigate]);

  const downloadPDF = () => {
    if (!data) return;
    const acc = data.account || {};
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, H = 297;

    // ══════════════════════════════════════════
    // WATERMARK — drawn FIRST (behind everything)
    // ══════════════════════════════════════════
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.12 }));

    // Big logo watermark — center of page
    doc.addImage(PAYZEN_LOGO, "JPEG", W/2 - 35, H/2 - 35, 70, 70);

    // Diagonal text watermark
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 36, 96);
    doc.setFontSize(75);
    doc.text("PayZen", W/2, H/2 - 5, { align: "center", angle: 45 });

    doc.restoreGraphicsState();

    // ══════════════════════════════════════════
    // HEADER BANNER
    // ══════════════════════════════════════════
    doc.setFillColor(15, 36, 96);
    doc.rect(0, 0, W, 45, "F");

    // --- Circular clip for logo ---
    // Step 1: Draw dark navy filled circle (background of logo area)
    const cx = 24, cy = 22, cr = 14;
    doc.setFillColor(25, 50, 115);
    doc.circle(cx, cy, cr, "F");

    // Step 2: Draw white ring border
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.8);
    doc.circle(cx, cy, cr, "S");

    // Step 3: Place logo image INSIDE the circle (tight crop)
    // addImage does not clip, but we size it to fit within circle diameter
    const logoSize = cr * 2 - 4; // slightly smaller than circle
    doc.addImage(
      PAYZEN_LOGO, "JPEG",
      cx - logoSize/2,   // x
      cy - logoSize/2,   // y
      logoSize,          // width
      logoSize           // height
    );

    // Bank name + taglines
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("PayZen Bank", 44, 17);

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 200, 240);
    doc.text("Official Account Statement", 44, 24);
    doc.text("Secure  ·  Trusted  ·  Digital Banking", 44, 31);

    // Generated date — top right
    doc.setFontSize(8);
    doc.setTextColor(180, 200, 240);
    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit", month: "long", year: "numeric"
    });
    doc.text(`Generated: ${today}`, W - 12, 22, { align: "right" });

    // ══════════════════════════════════════════
    // ACCOUNT BADGE STRIP
    // ══════════════════════════════════════════
    doc.setFillColor(240, 244, 255);
    doc.roundedRect(14, 51, W - 28, 20, 3, 3, "F");
    doc.setDrawColor(200, 210, 240);
    doc.setLineWidth(0.4);
    doc.roundedRect(14, 51, W - 28, 20, 3, 3, "S");

    // Account Number
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("ACCOUNT NUMBER", 20, 58);
    doc.setTextColor(15, 36, 96);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(acc.account_number || "—", 20, 66);

    // IFSC
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("IFSC CODE", 105, 58);
    doc.setTextColor(15, 36, 96);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(acc.ifsc || "—", 105, 66);

    // Status
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("STATUS", 168, 58);
    doc.setFillColor(34, 197, 94);
    doc.circle(170, 64, 2.5, "F");
    doc.setTextColor(15, 36, 96);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(acc.status ? acc.status.toUpperCase() : "ACTIVE", 174, 65.5);

    // ══════════════════════════════════════════
    // SECTIONS
    // ══════════════════════════════════════════
    let y = 78;

    const drawSection = (title, rows) => {
      if (y > 262) return;
      // Section header
      doc.setFillColor(15, 36, 96);
      doc.rect(14, y, W - 28, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "bold");
      doc.text(title.toUpperCase(), 18, y + 5.5);
      y += 8;

      const colW = (W - 28) / 2;
      rows.forEach((row, i) => {
        const col = i % 2;
        const rx  = 14 + col * colW;
        if (col === 0) {
          const bg = Math.floor(i / 2) % 2 === 0 ? [255,255,255] : [248,250,255];
          doc.setFillColor(...bg);
          doc.rect(14, y, W - 28, 11, "F");
        }
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.2);
        doc.rect(rx, y, colW, 11, "S");

        doc.setTextColor(148, 163, 184);
        doc.setFontSize(6.5);
        doc.setFont("helvetica", "normal");
        doc.text(row[0], rx + 3, y + 4.5);

        doc.setTextColor(30, 41, 59);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text(String(row[1] || "—"), rx + 3, y + 9.5);

        if (col === 1) y += 11;
      });
      if (rows.length % 2 !== 0) y += 11;
      y += 5;
    };

    const maskAadhaar = (v) =>
      v ? v.replace(/(\d{4})(\d{4})(\d{4})/, "XXXX XXXX $3") : "—";
    const maskPan = (v) =>
      v ? "XXXXX" + v.slice(5) : "—";

    drawSection("Account Information", [
      ["Account Holder Name", data.name || acc.bank_holder_name],
      ["Account Type",        acc.account_type],
      ["Branch Name",         acc.branch],
      ["Account Status",      acc.status ? acc.status.toUpperCase() : "ACTIVE"],
    ]);
    drawSection("Personal Information", [
      ["Gender",        data.gender],
      ["Date of Birth", data.date_of_birth],
      ["Father Name",   acc.father_name],
      ["Address",       data.address],
    ]);
    drawSection("Contact Information", [
      ["Mobile Number", data.mobile],
      ["Email Address", data.email],
    ]);
    drawSection("KYC Information", [
      ["Aadhaar Number", maskAadhaar(acc.aadhaar)],
      ["PAN Number",     maskPan(acc.pan)],
    ]);
    drawSection("Nominee Information", [
      ["Nominee Name",     acc.nominee_name],
      ["Nominee Relation", acc.nominee_relation],
    ]);

    // ══════════════════════════════════════════
    // FOOTER
    // ══════════════════════════════════════════
    doc.setFillColor(15, 36, 96);
    doc.rect(0, H - 16, W, 16, "F");
    doc.setTextColor(180, 200, 240);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.text(
      "PayZen Bank  ·  Secure Digital Banking  ·  This is a system-generated document.",
      W/2, H - 8.5, { align: "center" }
    );
    doc.text(
      "For queries contact: support@payzenbank.com",
      W/2, H - 3.5, { align: "center" }
    );

    doc.save(`PayZen_Account_${acc.account_number || "Details"}.pdf`);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900"/>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center h-64 text-red-500 font-medium">{error}</div>
  );

  const acc = data?.account || null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-6 shadow-sm">

        <div className="relative mb-6 flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-blue-900 text-center">Account Details</h2>
          <button onClick={downloadPDF}
            className="absolute right-0 top-0 bg-blue-900 hover:bg-blue-800
              text-white font-semibold rounded-xl py-2.5 px-4
              flex items-center gap-2 transition-all text-sm shadow">
            <ArrowDownToLineIcon className="w-4 h-4"/>
            Download PDF
          </button>
        </div>

        {!acc && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-base mb-4">No bank account found.</p>
            <button onClick={() => navigate("/open-account")}
              className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-800">
              + Open New Account
            </button>
          </div>
        )}

        {acc && (
          <>
            <Section title="Account Information">
              <Detail label="Account Holder Name" value={data.name} />
              <Detail label="Account Number"      value={acc.account_number} />
              <Detail label="Account Type"        value={acc.account_type} />
              <Detail label="Branch Name"         value={acc.branch} />
              <Detail label="IFSC Code"           value={acc.ifsc} />
              <Detail label="Account Status"      value={acc.status}
                badge={acc.status === "active" ? "green" : "red"} />
            </Section>
            <Section title="Personal Information">
              <Detail label="Gender"        value={data.gender} />
              <Detail label="Date of Birth" value={data.date_of_birth} />
              <Detail label="Father Name"   value={acc.father_name} />
              <Detail label="Address"       value={data.address} />
            </Section>
            <Section title="Contact Information">
              <Detail label="Mobile Number" value={data.mobile} />
              <Detail label="Email Address" value={data.email} />
            </Section>
            <Section title="KYC Information">
              <Detail label="Aadhaar Number"
                value={acc.aadhaar
                  ? acc.aadhaar.replace(/(\d{4})(\d{4})(\d{4})/, "XXXX XXXX $3")
                  : "—"} />
              <Detail label="PAN Number"
                value={acc.pan ? "XXXXX" + acc.pan.slice(5) : "—"} />
            </Section>
            <Section title="Nominee Information">
              <Detail label="Nominee Name"     value={acc.nominee_name} />
              <Detail label="Nominee Relation" value={acc.nominee_relation} />
            </Section>
          </>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-3">{title}</h3>
      <div className="grid md:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function Detail({ label, value, badge }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg border">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      {badge ? (
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
          ${badge === "green" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
          {value ? value.charAt(0).toUpperCase() + value.slice(1) : "—"}
        </span>
      ) : (
        <p className="text-base font-semibold text-gray-800 leading-tight">{value || "—"}</p>
      )}
    </div>
  );
}