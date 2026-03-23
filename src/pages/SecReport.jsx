import { useState, useCallback } from "react";
import InputField from "../components/common/result/InputField";
import TextArea from "../components/common/result/TextArea";
import ScoreInput from "../components/common/result/ScoreInput";

// ── Grading Scale Data ──────────────────────────────────────────
const GRADING_SCALE = [
  { grade: "A1", range: "75 – 100", color: "text-green-700" },
  { grade: "B2", range: "70 – 74",  color: "text-green-600" },
  { grade: "B3", range: "65 – 69",  color: "text-lime-600"  },
  { grade: "C4", range: "60 – 64",  color: "text-yellow-600"},
  { grade: "C5", range: "55 – 59",  color: "text-yellow-600"},
  { grade: "C6", range: "50 – 54",  color: "text-orange-500"},
  { grade: "D7", range: "45 – 49",  color: "text-orange-600"},
  { grade: "E8", range: "40 – 44",  color: "text-red-500"   },
  { grade: "F9", range: "0 – 39",   color: "text-red-700"   },
];

// ── Grade Calculator ────────────────────────────────────────────
function getGrade(total) {
  if (total === "" || total === null || isNaN(total)) return "–";
  const n = Number(total);
  if (n >= 75) return "A1";
  if (n >= 70) return "B2";
  if (n >= 65) return "B3";
  if (n >= 60) return "C4";
  if (n >= 55) return "C5";
  if (n >= 50) return "C6";
  if (n >= 45) return "D7";
  if (n >= 40) return "E8";
  return "F9";
}

// ── Empty Subject Factory ───────────────────────────────────────
const emptySubject = () => ({
  id: Date.now() + Math.random(),
  name: "",
  ca1: "",
  ca2: "",
  exam: "",
  position: "",
  remarks: "",
});

// ── Main Component ──────────────────────────────────────────────
export default function SecReport() {
  const [student, setStudent] = useState({
    name: "", class: "", term: "", session: "",
    overallPosition: "", outOf: "",
    timesOpened: "", timesPresent: "",
    nextFees: "", resumptionDate: "",
    teacherComment: "", principalComment: "",
  });

  const [subjects, setSubjects] = useState([
    { ...emptySubject(), name: "Mathematics" },
    { ...emptySubject(), name: "English Language" },
    { ...emptySubject(), name: "Basic Science" },
  ]);

  // ── Handlers ──────────────────────────────────────────────────
  const updateStudent = (field) => (e) =>
    setStudent((s) => ({ ...s, [field]: e.target.value }));

  const addSubject = () =>
    setSubjects((prev) => [...prev, emptySubject()]);

  const removeSubject = (id) =>
    setSubjects((prev) => prev.filter((s) => s.id !== id));

  const updateSubject = useCallback((id, field, value) => {
    if ((field === "ca1" || field === "ca2") && value !== "" && Number(value) > 20) return;
    if (field === "exam" && value !== "" && Number(value) > 60) return;
    setSubjects((prev) =>
      prev.map((s) => (s.id !== id ? s : { ...s, [field]: value }))
    );
  }, []);

  // ── Score & Summary Calculators ───────────────────────────────
  const calcTotal = (s) => {
    const ca1  = parseFloat(s.ca1)  || 0;
    const ca2  = parseFloat(s.ca2)  || 0;
    const exam = parseFloat(s.exam) || 0;
    if (!s.ca1 && !s.ca2 && !s.exam) return "";
    return Math.min(ca1 + ca2 + exam, 100);
  };

  const computeSummary = () => {
    const scored = subjects
      .map((s) => calcTotal(s))
      .filter((t) => t !== "" && t !== null && t !== undefined);
    if (scored.length === 0) return null;
    const totalObtained   = scored.reduce((sum, t) => sum + t, 0);
    const totalObtainable = scored.length * 100;
    const percentage      = ((totalObtained / totalObtainable) * 100).toFixed(1);
    const overallGrade    = getGrade(Number(percentage));
    return { totalObtained, totalObtainable, percentage, overallGrade };
  };

  const summary = computeSummary();

  // ── Print Handler ─────────────────────────────────────────────
  const handlePrint = () => {
    const mainEl = document.getElementById("main-content");
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: "instant" });
    window.scrollTo({ top: 0, behavior: "instant" });
    setTimeout(() => window.print(), 300);
  };

  // ── JSX ───────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+3:wght@400;600&display=swap');

        * { box-sizing: border-box; }
        body { font-family: 'Source Sans 3', sans-serif; }

        @media print {
          @page { size: A3 portrait; margin: 0; }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .no-print { display: none !important; }

          .min-h-screen {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .print-container {
  zoom: 0.79;
  padding: 0 !important;
  margin: 0 auto !important;
  box-shadow: none !important;
  border: none !important;
  border-radius: 0 !important;
  max-width: 100% !important;
  width: 100% !important;
}

          input {
            border: none !important;
            border-bottom: 1px solid #999 !important;
            border-radius: 0 !important;
            padding: 8px 2px !important;
            font-size: 18px !important;
font-weight: 700 !important; 
            background: transparent !important;
          }

          textarea {
            border: none !important;
            border-bottom: 1px solid #999 !important;
            font-size: 18px !important;
            background: transparent !important;
            font-weight: 700 !important; 
            resize: none !important;
          }

          table  { font-size: 18px !important; font-weight: 700 !important;  }
          th, td { padding: 3px 4px !important; font-weight: 700 !important;  }

          .header-logo   { width: 55px !important; height: 55px !important; }
          .school-title  { font-size: 18px !important; }
          .school-subtitle { font-size: 9px !important; }
          .section-header { font-size: 11px !important; }
          .grade-box     { font-size: 9px !important; }
          .sig-line      { margin-top: 16px !important; }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 py-6 px-3 print:bg-white print:p-0">

        {/* ── Top Action Bar ── */}
        <div className="no-print flex justify-end items-center max-w-5xl mx-auto mb-4 gap-3">
          <button
            onClick={addSubject}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition"
          >
            + Add Subject
          </button>
          <button
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition"
          >
            🖨 Print / Save PDF
          </button>
        </div>

        {/* ── Main Document ── */}
        <div className="print-container max-w-5xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden border border-blue-100 print:shadow-none print:rounded-none print:border-0">

          {/* School Header */}
          <div className="bg-blue-900 text-white px-6 py-5 flex items-center gap-5 print:px-4 print:py-3">
            <div className="header-logo w-20 h-20 rounded-full bg-white border-4 border-yellow-400 flex flex-col items-center justify-center text-blue-900 flex-shrink-0">
              <span className="text-2xl leading-none">🎓</span>
              <span className="text-[7px] font-black uppercase tracking-tight mt-0.5 text-center leading-tight">SEC</span>
            </div>
            <div className="flex-1 text-center">
              <p className="school-title text-2xl font-black tracking-wide uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                Supreme College
              </p>
              <p className="school-subtitle text-yellow-300 italic text-sm mt-0.5 tracking-wide">
                "Knowledge is the key to success"
              </p>
              <div className="mt-1.5 text-blue-200 text-xs flex flex-wrap justify-center gap-x-4 gap-y-0.5">
                <span>📍 131, Opomalu Street, Ilorin, Kwara State</span>
                <span>📞 +234 803 344 2192</span>
                <span>✉ supremecollege@gmail.com</span>
              </div>
            </div>
            
          </div>

          {/* Title Bar */}
          <div className="bg-yellow-400 text-blue-900 text-center font-black text-base uppercase tracking-widest py-1.5 print:py-1 print:text-xs">
            Student Academic Report Sheet
          </div>

          <div className="p-5 print:p-3 space-y-4">

            {/* ── Student Information ── */}
            <div className="border border-blue-200 rounded-lg overflow-hidden print:rounded-none">
              <div className="section-header bg-blue-900 text-white text-xs font-bold uppercase px-3 py-1.5 tracking-widest">
                Student Information
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3">
                {[
                  ["Student's Full Name", "name",            "text",   "col-span-2 md:col-span-2"],
                  ["Class / Form",        "class",           "text",   ""],
                  ["Term",                "term",            "text",   ""],
                  ["Academic Session",    "session",         "text",   ""],
                  ["Overall Position",    "overallPosition", "text",   ""],
                  ["Out of (Total Students)", "outOf",       "number", ""],
                ].map(([label, field, type, colClass]) => (
                  <div key={field} className={colClass}>
                    <InputField
                      label={label}
                      value={student[field]}
                      onChange={updateStudent(field)}
                      placeholder={label}
                      type={type}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Subjects Table ── */}
            <div className="border border-blue-200 rounded-lg overflow-hidden print:rounded-none">
              <div className="section-header bg-blue-900 text-white text-xs font-bold uppercase px-3 py-1.5 tracking-widest flex justify-between items-center">
                <span>Academic Performance</span>
                <button
                  onClick={addSubject}
                  className="no-print bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-0.5 rounded hover:bg-yellow-300 transition"
                >
                  + Add Row
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-blue-800 text-white text-xs uppercase">
                      <th className="text-left px-3 py-2 border-r border-blue-600 min-w-[140px]">Subject</th>
                      <th className="px-2 py-2 border-r border-blue-600 w-16">CA1 <span className="font-normal opacity-75">/20</span></th>
                      <th className="px-2 py-2 border-r border-blue-600 w-16">CA2 <span className="font-normal opacity-75">/20</span></th>
                      <th className="px-2 py-2 border-r border-blue-600 w-16">Exam <span className="font-normal opacity-75">/60</span></th>
                      <th className="px-2 py-2 border-r border-blue-600 w-16 bg-blue-900">Total <span className="font-normal opacity-75">/100</span></th>
                      <th className="px-2 py-2 border-r border-blue-600 w-14 bg-blue-900">Grade</th>
                      <th className="px-2 py-2 border-r border-blue-600 w-20">Position</th>
                      <th className="px-2 py-2 min-w-[130px]">Remarks</th>
                      <th className="no-print px-1 py-2 w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((s, idx) => {
                      const total   = calcTotal(s);
                      const grade   = total !== "" ? getGrade(total) : "–";
                      const isBad   = ["F9", "E8", "D7"].includes(grade);
                      const isGood  = ["A1", "B2", "B3"].includes(grade);
                      return (
                        <tr key={s.id} className={`border-t border-blue-100 ${idx % 2 === 0 ? "bg-white" : "bg-blue-50/30"}`}>

                          {/* Subject Name */}
                          <td className="px-2 py-1.5 border-r border-blue-100">
                            <ScoreInput
                              value={s.name}
                              onChange={(e) => updateSubject(s.id, "name", e.target.value)}
                              placeholder="Subject name"
                              type="text"
                            />
                          </td>

                          {/* CA1, CA2, Exam */}
                          {["ca1", "ca2", "exam"].map((field) => (
                            <td key={field} className="px-2 py-1.5 border-r border-blue-100">
                              <ScoreInput
                                value={s[field]}
                                onChange={(e) => updateSubject(s.id, field, e.target.value)}
                                max={field === "exam" ? 60 : 20}
                                placeholder="–"
                              />
                            </td>
                          ))}

                          {/* Total */}
                          <td className={`px-2 py-1.5 border-r border-blue-100 text-center font-bold text-sm ${isGood ? "text-green-700" : isBad ? "text-red-600" : "text-blue-900"}`}>
                            {total !== "" ? total : "–"}
                          </td>

                          {/* Grade */}
                          <td className={`px-2 py-1.5 border-r border-blue-100 text-center font-bold text-sm ${isGood ? "text-green-700 bg-green-50" : isBad ? "text-red-600 bg-red-50" : "text-blue-800"}`}>
                            {grade}
                          </td>

                          {/* Position */}
                          <td className="px-2 py-1.5 border-r border-blue-100">
                            <ScoreInput
                              value={s.position}
                              onChange={(e) => updateSubject(s.id, "position", e.target.value)}
                              placeholder="–"
                              type="text"
                            />
                          </td>

                          {/* Remarks */}
                          <td className="px-2 py-1.5">
                            <ScoreInput
                              value={s.remarks}
                              onChange={(e) => updateSubject(s.id, "remarks", e.target.value)}
                              placeholder="Teacher's remark"
                              type="text"
                            />
                          </td>

                          {/* Remove Button */}
                          <td className="no-print px-1 py-1.5 text-center">
                            <button
                              onClick={() => removeSubject(s.id)}
                              className="text-red-400 hover:text-red-600 text-lg leading-none transition"
                              title="Remove subject"
                            >
                              ×
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Attendance | Comments | Next Term ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Attendance */}
              <div className="border border-blue-200 rounded-lg overflow-hidden print:rounded-none">
                <div className="section-header bg-blue-900 text-white text-xs font-bold uppercase px-3 py-1.5 tracking-widest">
                  Attendance
                </div>
                <div className="p-3 space-y-2">
                  <InputField
                    label="Times School Opened"
                    value={student.timesOpened}
                    onChange={updateStudent("timesOpened")}
                    placeholder="e.g. 90"
                    type="number"
                  />
                  <InputField
                    label="Times Present"
                    value={student.timesPresent}
                    onChange={updateStudent("timesPresent")}
                    placeholder="e.g. 85"
                    type="number"
                  />
                  <div className="text-xs text-blue-600 font-medium border-t border-blue-100 pt-2 mt-1">
                    Attendance %:{" "}
                    <span className="font-bold text-blue-900">
                      {student.timesOpened && student.timesPresent
                        ? `${((+student.timesPresent / +student.timesOpened) * 100).toFixed(1)}%`
                        : "–"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="border border-blue-200 rounded-lg overflow-hidden print:rounded-none">
                <div className="section-header bg-blue-900 text-white text-xs font-bold uppercase px-3 py-1.5 tracking-widest">
                  Comments
                </div>
                <div className="p-3 space-y-2">
                  <TextArea
                    label="Class Teacher's Comment"
                    value={student.teacherComment}
                    onChange={updateStudent("teacherComment")}
                    placeholder="Enter comment..."
                    rows={2}
                  />
                  <TextArea
                    label="Principal's Comment"
                    value={student.principalComment}
                    onChange={updateStudent("principalComment")}
                    placeholder="Enter comment..."
                    rows={2}
                  />
                </div>
              </div>

              {/* Next Term */}
              <div className="border border-blue-200 rounded-lg overflow-hidden print:rounded-none">
                <div className="section-header bg-blue-900 text-white text-xs font-bold uppercase px-3 py-1.5 tracking-widest">
                  Next Term Info
                </div>
                <div className="p-3 space-y-2">
                  <InputField
                    label="School Fees (₦)"
                    value={student.nextFees}
                    onChange={updateStudent("nextFees")}
                    placeholder="e.g. 50,000"
                  />
                  <InputField
                    label="Resumption Date"
                    value={student.resumptionDate}
                    onChange={updateStudent("resumptionDate")}
                    placeholder="e.g. Jan 8, 2025"
                  />
                </div>
              </div>
            </div>

            {/* ── Overall Performance Summary ── */}
            {summary && (
              <div className="border border-blue-200 rounded-lg overflow-hidden print:rounded-none">
                <div className="section-header bg-blue-900 text-white text-xs font-bold uppercase px-3 py-1.5 tracking-widest">
                  Overall Performance Summary
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-blue-100">
                  {[
                    ["Total Marks Obtained",   `${summary.totalObtained}`,   "text-blue-900"],
                    ["Total Marks Obtainable", `${summary.totalObtainable}`, "text-blue-900"],
                    ["Overall Percentage",     `${summary.percentage}%`,     "text-blue-800"],
                    ["Overall Grade",          summary.overallGrade,
                      ["A1","B2","B3"].includes(summary.overallGrade) ? "text-green-600" :
                      ["F9","E8","D7"].includes(summary.overallGrade) ? "text-red-600"   : "text-orange-500"
                    ],
                  ].map(([label, value, color]) => (
                    <div key={label} className="flex flex-col items-center justify-center py-4 px-3 bg-white text-center">
                      <span className={`text-2xl font-black ${color}`}>{value}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Grading Scale ── */}
            <div className="border border-blue-200 rounded-lg overflow-hidden print:rounded-none">
              <div className="section-header grade-box bg-blue-900 text-white text-xs font-bold uppercase px-3 py-1.5 tracking-widest">
                Grading Scale
              </div>
              <div className="grade-box p-2 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5 text-xs">
                {GRADING_SCALE.map(({ grade, range, color }) => (
                  <div key={grade} className="border border-blue-100 rounded px-2 py-1.5 text-center bg-white shadow-sm print:rounded-none print:border-gray-200">
                    <div className={`font-black text-base leading-none ${color}`}>{grade}</div>
                    <div className="text-gray-500 text-[10px] mt-0.5 leading-tight">{range}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Signatures ── */}
            <div className="grid grid-cols-2 gap-8 pt-2 print:gap-6">
              {[
                ["Class Teacher", "Stamp & Signature"],
                ["Principal",     "Stamp & Signature"],
              ].map(([title, sub]) => (
                <div key={title} className="sig-line">
                  <div className="border-b-2 border-blue-900 pb-10 print:pb-6"></div>
                  <p className="text-xs font-bold text-blue-900 mt-1">{title}</p>
                  <p className="text-[10px] text-gray-400">{sub}</p>
                </div>
              ))}
            </div>

            {/* ── Footer ── */}
            <div className="text-center text-[10px] text-gray-400 border-t border-blue-100 pt-2 mt-1">
              Supreme College — Printed on{" "}
              {new Date().toLocaleDateString("en-NG", { day: "2-digit", month: "long", year: "numeric" })}
              {" · "}This result is only valid with the school seal.
            </div>

          </div>
        </div>

        {/* ── Mobile FAB Buttons ── */}
        <div className="no-print fixed bottom-5 right-5 flex flex-col gap-2 z-50">
          <button
            onClick={addSubject}
            className="bg-blue-700 text-white text-sm font-bold px-4 py-3 rounded-full shadow-xl hover:bg-blue-800 transition"
          >
            ＋ Subject
          </button>
          <button
            onClick={handlePrint}
            className="bg-green-600 text-white text-sm font-bold px-4 py-3 rounded-full shadow-xl hover:bg-green-700 transition"
          >
            🖨 Print
          </button>
        </div>

      </div>
    </>
  );
}
