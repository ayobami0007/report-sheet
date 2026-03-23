

// import { useState, useRef, useEffect } from "react";
// import InputField from "../components/common/result/InputField";
// import TextArea from "../components/common/result/TextArea";
// import ScoreInput from "../components/common/result/ScoreInput";


// import html2canvas from "html2canvas-pro";
// import jsPDF from "jspdf";
// // ── Grading Scale ───────────────────────────────────────────────
// const GRADING_SCALE = [
//   { grade: "A", range: "70 – 100", color: "text-blue-800",   bg: "bg-blue-50"   },
//   { grade: "B", range: "60 – 69",  color: "text-pink-700",   bg: "bg-pink-50"   },
//   { grade: "C", range: "50 – 59",  color: "text-yellow-600", bg: "bg-yellow-50" },
//   { grade: "D", range: "45 – 49",  color: "text-orange-600", bg: "bg-orange-50" },
//   { grade: "F", range: "0 – 44",   color: "text-red-600",    bg: "bg-red-50"    },
// ];

// function getGrade(score) {
//   if (score >= 70) return "A";
//   if (score >= 60) return "B";
//   if (score >= 50) return "C";
//   if (score >= 45) return "D";
//   return "F";
// }

// function gradeColor(g) {
//   const found = GRADING_SCALE.find((s) => s.grade === g);
//   return found ? found.color : "text-gray-600";
// }
// function gradeBg(g) {
//   const found = GRADING_SCALE.find((s) => s.grade === g);
//   return found ? found.bg : "";
// }

// const emptySubject = () => ({
//   id: Date.now() + Math.random(),
//   name: "", test1: "", test2: "", exam: "",
//   classAvg: "", firstTerm: "", secondTerm: "", thirdTerm: "", position: "",
// });

// // ── Reusable Section Header ─────────────────────────────────────
// const SectionHeader = ({ children, action }) => (
//   <div className="bg-blue-900 text-white text-xs font-bold uppercase px-3 py-2 tracking-widest flex justify-between items-center rounded-t-lg print:rounded-none">
//     <span>{children}</span>
//     {action && action}
//   </div>
// );

// // ── Main Component ──────────────────────────────────────────────
// export default function PrimaryReport() {
//   const [student, setStudent] = useState({
//     name: "", class: "", term: "", session: "",
//     position: "", outOf: "",
//     timesOpened: "", timesPresent: "",
//     nextTermBegins: "", nextTermFees: "",
//     teacherComment: "", headTeacherRemark: "",
//     teacherSignature: "", headTeacherSignature: "",
//   });

//   const [subjects, setSubjects] = useState([
//     { ...emptySubject(), name: "Mathematics" },
//     { ...emptySubject(), name: "English Language" },
//     { ...emptySubject(), name: "Basic Science" },
//   ]);

//   const scrollRef = useRef(null);
//   const [showLeft,  setShowLeft]  = useState(false);
//   const [showRight, setShowRight] = useState(true);
//   const [isDownloading, setIsDownloading] = useState(false);

//   useEffect(() => {
//     const el = scrollRef.current;
//     const handleScroll = () => {
//       if (!el) return;
//       setShowLeft(el.scrollLeft > 0);
//       setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
//     };
//     if (el) { el.addEventListener("scroll", handleScroll); handleScroll(); }
//     return () => { if (el) el.removeEventListener("scroll", handleScroll); };
//   }, []);

//   // ── Handlers ──────────────────────────────────────────────────
//   const updateStudent = (field) => (e) =>
//     setStudent((s) => ({ ...s, [field]: e.target.value }));

//   const addSubject = () =>
//     setSubjects((prev) => [...prev, emptySubject()]);

//   const removeSubject = (id) =>
//     setSubjects((prev) => prev.filter((s) => s.id !== id));

//   const updateSubject = (id, field, value) => {
//     if ((field === "test1" || field === "test2") && value !== "" && Number(value) > 20) return;
//     if (field === "exam" && value !== "" && Number(value) > 60) return;
//     setSubjects((prev) =>
//       prev.map((s) => (s.id !== id ? s : { ...s, [field]: value }))
//     );
//   };

//   // ── Totals & Summary ──────────────────────────────────────────
//   const calcTotal = (s) => {
//     const t1   = parseFloat(s.test1) || 0;
//     const t2   = parseFloat(s.test2) || 0;
//     const exam = parseFloat(s.exam)  || 0;
//     if (!s.test1 && !s.test2 && !s.exam) return "";
//     return Math.min(t1 + t2 + exam, 100);
//   };

//   const scored          = subjects.map(calcTotal).filter((t) => t !== "");
//   const totalObtained   = scored.reduce((sum, t) => sum + t, 0);
//   const totalObtainable = scored.length * 100;
//   const overallAverage  = totalObtainable > 0
//     ? ((totalObtained / totalObtainable) * 100).toFixed(1) : "–";
//   const finalGrade = scored.length > 0 ? getGrade(Number(overallAverage)) : "–";

//   // ── Print ─────────────────────────────────────────────────────
//   const handlePrint = () => {
//     const mainEl = document.getElementById("main-content");
//     if (mainEl) mainEl.scrollTo({ top: 0, behavior: "instant" });
//     window.scrollTo({ top: 0, behavior: "instant" });
//     setTimeout(() => window.print(), 300);
//   };

// const handleDownload = async () => {
//   if (isDownloading) return;
//   setIsDownloading(true);

//   try {
//     await new Promise((resolve) => setTimeout(resolve, 800));

//     const element = document.querySelector(".print-wrap");
//     element.classList.remove("overflow-hidden");
//     element.style.width = "1400px";

//     const canvas = await html2canvas(element, {
//       scale: 1.5, // lower scale on mobile
//       useCORS: true,
//       scrollY: -window.scrollY, // fix mobile scroll offset
//       windowWidth: 1400,
//       backgroundColor: "#ffffff",
//       logging: false,
//       onclone: (clonedDoc) => {
//         clonedDoc.querySelectorAll("input, textarea").forEach((el) => {
//           const div = clonedDoc.createElement("div");
//           div.innerText = el.value || "";
//           div.style.cssText = `font-size: 14px; font-weight: 700; color: #1e3a8a; border-bottom: 1px solid #999; min-height: 24px; padding: 2px; width: 100%;`;
//           el.parentNode.replaceChild(div, el);
//         });
//       }
//     });

//     const imgData = canvas.toDataURL("image/jpeg", 1.0);
    
//     // destroy canvas after use to free memory
//     canvas.width = 0;
//     canvas.height = 0;

//     const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
//     pdf.addImage(imgData, "JPEG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
//     pdf.save("report-sheet.pdf");

//     element.style.width = "";
//     element.classList.add("overflow-hidden");

//   } catch (err) {
//     console.error("Download failed:", err);
//   }

//   setIsDownloading(false);
// };


// const zoom =
//   subjects.length <= 8  ? 0.95 :
//   subjects.length <= 10 ? 0.85 :
//   subjects.length <= 12 ? 0.80 :
//   subjects.length <= 14 ? 0.65 :
//   subjects.length <= 16 ? 0.62 :
//   0.60;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&family=Lora:wght@700&display=swap');

//         * { box-sizing: border-box; }
//         body { font-family: 'Nunito', sans-serif; }

//         @media print {
//           @page { size: A4 portrait; margin: 0; }
//           html, body {
//             margin: 0 !important;
//             padding: 0 !important;
//             -webkit-print-color-adjust: exact;
//             print-color-adjust: exact;
            
//           }

//           ::-webkit-scrollbar {
//   display: none !important;
// }
//           .no-print  { display: none !important; }
//           .min-h-screen { background: white !important; padding: 0 !important; margin: 0 !important; }
//           .print-wrap {
//           zoom: ${zoom};
//             font-size: 16px !important;
//             max-width: 100% !important;
//             width: 100% !important;
//             box-shadow: none !important;
//             border-radius: 0 !important;
//           }
//           input, textarea {
//             border: none !important;
//             border-bottom: 1px solid #aaa !important;
//             border-radius: 0 !important;
//             padding: 8px 2px !important;
//             font-size: 18px !important;
//            font-weight: 700 !important; 
//             background: transparent !important;
//           }
//           table  { font-size: 15px !important;   font-weight: 900 !important; }
//           th, td { padding: 2px 5px !important;   line-height: 1.2 !important; font-weight: 700 !important;  }
//           .school-name  { font-size: 20px   !important; }
//         }
//       `}</style>

//       {/* ── Page Wrapper ── */}
//       <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 py-6 px-3 print:bg-white print:p-0">

//         {/* ── Top Action Bar ── */}
//         <div className="no-print flex justify-end max-w-5xl mx-auto mb-4 gap-3">
//           <button onClick={addSubject} className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold px-4 py-2 rounded-lg shadow transition">
//             + Add Subject
//           </button>
//           <button onClick={handlePrint} className="bg-blue-900 hover:bg-blue-800 text-white text-sm font-bold px-4 py-2 rounded-lg shadow transition">
//             🖨 Print / Save PDF
//           </button>
//                  <button
//   onClick={handleDownload}
//   disabled={isDownloading}
//   className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition"
// >
//   {isDownloading ? "⏳ Downloading..." : "⬇ Download PDF"}
// </button>
//         </div>

//         {/* ── Document Card ── */}
//         <div className="print-wrap max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-pink-100">

//           {/* ── School Header ── */}
//           <div className="bg-blue-900 text-white px-6 pt-6 pb-4 print:px-4 print:pt-8 print:pb-3">
//             {/* Pink accent stripe at very top */}
//             <div className="h-2 bg-pink-500 -mx-6 -mt-6 mb-4 print:-mx-4" />
//             <div className="flex flex-col items-center text-center gap-2">
//               <div className="w-20 h-20 rounded-full bg-white border-4 border-pink-400 flex flex-col items-center justify-center text-blue-900 shadow-lg">
//                 <span className="text-3xl leading-none">🌟</span>
//                 <span className="text-[7px] font-black uppercase tracking-tight mt-0.5">SKS</span>
//               </div>
//               <div>
//                 <p className="school-name text-2xl font-black tracking-wide leading-tight" style={{ fontFamily: "'Lora', serif" }}>
//                   Supreme Kiddies Nursery &amp; Primary School
//                 </p>
//                 <p className="text-pink-300 italic text-sm mt-0.5">
//                   "Nurturing Young Minds for a Brighter Tomorrow"
//                 </p>
//                 <div className="mt-1.5 text-blue-200 text-xs flex flex-wrap justify-center gap-x-4 gap-y-0.5">
//                   <span>📍 131, Opomalu Street, Ilorin, Kwara State</span>
//                   <span>📞 +234 803 344 2192</span>
//                   <span>✉ supremekiddies@gmail.com</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── Title Bar — pink ── */}
//           <div className="bg-pink-500 text-white text-center font-black text-sm uppercase tracking-widest py-1.5 print:text-xs print:py-1">
//             🎓 Student Report Card
//           </div>

//           <div className="p-5 print:p-3 space-y-4">

//             {/* ── Student Information ── */}
//             <div className="border border-pink-200 rounded-lg overflow-hidden print:rounded-none">
//               <SectionHeader>Student Information</SectionHeader>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-pink-50/20">
//                 {[
//                   ["Student's Full Name", "name",     "text",   "col-span-2 md:col-span-2"],
//                   ["Class ",       "class",    "text",   ""],
//                   ["Term ",     "term",     "text",   ""],
//                   ["Academic Session",    "session",  "text",   ""],
//                   ["Position in Class",   "position", "text",   ""],
//                   ["Out of (Students)",   "outOf",    "number", ""],
//                 ].map(([label, field, type, colClass]) => (
//                   <div key={field} className={colClass}>
//                     <InputField label={label} value={student[field]} onChange={updateStudent(field)} placeholder={label} type={type} />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ── Subjects Table ── */}
//             <div className="border border-pink-200 rounded-lg overflow-hidden print:rounded-none">
//               <SectionHeader
//                 action={
//                   <button onClick={addSubject} className="no-print bg-pink-400 text-white text-xs font-bold px-2 py-0.5 rounded hover:bg-pink-300 transition">
//                     + Add Row
//                   </button>
//                 }
//               >
//                 Academic Performance
//               </SectionHeader>

//               {/* Scroll hint arrows */}
//               <div className="no-print flex justify-center gap-6 py-1.5 bg-pink-50 text-blue-900 text-xs font-bold">
//                 {showLeft  && <button onClick={() => scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })}>← Scroll Left</button>}
//                 {showRight && <button onClick={() => scrollRef.current.scrollBy({ left:  200, behavior: "smooth" })}>Scroll Right →</button>}
//               </div>

//               <div ref={scrollRef} className="overflow-x-auto">
//                 <table className="w-full text-sm border-collapse">
//                   <thead>
//                     <tr className="bg-blue-900 text-white text-xs uppercase">
//                       <th className="text-left px-3 py-2 border-r border-blue-700 min-w-[130px]">Subject</th>
//                       <th className="px-2 py-2 border-r border-blue-700 w-14 bg-blue-800">Test 1<br/><span className="font-normal opacity-75 normal-case">/20</span></th>
//                       <th className="px-2 py-2 border-r border-blue-700 w-14 bg-blue-800">Test 2<br/><span className="font-normal opacity-75 normal-case">/20</span></th>
//                       <th className="px-2 py-2 border-r border-blue-700 w-14 bg-blue-800">Exam<br/><span className="font-normal opacity-75 normal-case">/60</span></th>
//                       <th className="px-2 py-2 border-r border-blue-700 w-14 bg-pink-600">Total<br/><span className="font-normal opacity-75 normal-case">/100</span></th>
//                       <th className="px-2 py-2 border-r border-blue-700 w-16">Obtainable</th>
//                       <th className="px-2 py-2 border-r border-blue-700 w-16">Class Avg</th>
//                       <th className="px-2 py-2 border-r border-blue-700 w-16">1st Term</th>
//                       <th className="px-2 py-2 border-r border-blue-700 w-16">2nd Term</th>
//                       <th className="px-2 py-2 border-r border-blue-700 w-16">3rd Term</th>
//                       <th className="px-2 py-2 border-r border-blue-700 w-16">Position</th>
//                       <th className="px-2 py-2 border-r border-blue-700 w-14 bg-pink-600">Grade</th>
//                       <th className="no-print px-2 py-2 w-16">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {subjects.map((s, idx) => {
//                       const total = calcTotal(s);
//                       const grade = total !== "" ? getGrade(total) : "–";
//                       return (
//                         <tr key={s.id} className={`border-t border-pink-100 ${idx % 2 === 0 ? "bg-white" : "bg-pink-50/30"}`}>
//                           <td className="px-2 py-1.5 border-r border-pink-100">
//                             <ScoreInput value={s.name} onChange={(e) => updateSubject(s.id, "name", e.target.value)} placeholder="Subject name" type="text" />
//                           </td>
//                           <td className="px-2 py-1.5 border-r border-pink-100 bg-blue-50/40">
//                             <ScoreInput value={s.test1} onChange={(e) => updateSubject(s.id, "test1", e.target.value)} max={20} placeholder="–" />
//                           </td>
//                           <td className="px-2 py-1.5 border-r border-pink-100 bg-blue-50/40">
//                             <ScoreInput value={s.test2} onChange={(e) => updateSubject(s.id, "test2", e.target.value)} max={20} placeholder="–" />
//                           </td>
//                           <td className="px-2 py-1.5 border-r border-pink-100 bg-blue-50/40">
//                             <ScoreInput value={s.exam} onChange={(e) => updateSubject(s.id, "exam", e.target.value)} max={60} placeholder="–" />
//                           </td>
//                           <td className={`px-2 py-1.5 border-r border-pink-100 text-center font-black text-sm ${gradeColor(grade)}`}>
//                             {total !== "" ? total : "–"}
//                           </td>
//                           <td className="px-2 py-1.5 border-r border-pink-100 text-center text-gray-400 text-xs font-semibold">100</td>
//                           <td className="px-2 py-1.5 border-r border-pink-100">
//                             <ScoreInput value={s.classAvg} onChange={(e) => updateSubject(s.id, "classAvg", e.target.value)} placeholder="–" type="text" />
//                           </td>
//                           <td className="px-2 py-1.5 border-r border-pink-100">
//                             <ScoreInput value={s.firstTerm} onChange={(e) => updateSubject(s.id, "firstTerm", e.target.value)} placeholder="–" type="text" />
//                           </td>
//                           <td className="px-2 py-1.5 border-r border-pink-100">
//                             <ScoreInput value={s.secondTerm} onChange={(e) => updateSubject(s.id, "secondTerm", e.target.value)} placeholder="–" type="text" />
//                           </td>
//                           <td className="px-2 py-1.5 border-r border-pink-100">
//                             <ScoreInput value={s.thirdTerm} onChange={(e) => updateSubject(s.id, "thirdTerm", e.target.value)} placeholder="–" type="text" />
//                           </td>
//                           <td className="px-2 py-1.5 border-r border-pink-100">
//                             <ScoreInput value={s.position} onChange={(e) => updateSubject(s.id, "position", e.target.value)} placeholder="–" type="text" />
//                           </td>
//                           <td className={`px-2 py-1.5 border-r border-pink-100 text-center font-black text-sm ${gradeColor(grade)} ${gradeBg(grade)}`}>
//                             {grade}
//                           </td>
//                           <td className="no-print px-1 py-1.5 text-center">
//                             <button onClick={() => removeSubject(s.id)} className="text-red-400 hover:text-red-600 text-lg leading-none transition" title="Remove">×</button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* ── Overall Summary ── */}
//             {scored.length > 0 && (
//               <div className="border border-pink-200 rounded-lg overflow-hidden print:rounded-none">
//                 <SectionHeader>Overall Performance Summary</SectionHeader>
//                 <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-pink-100">
//                   {[
//                     ["Total Obtained",   `${totalObtained}`,   "text-blue-900"],
//                     ["Total Obtainable", `${totalObtainable}`, "text-blue-900"],
//                     ["Overall Average",  `${overallAverage}%`, "text-pink-600"],
//                     ["Final Grade", finalGrade,
//                       finalGrade === "A" ? "text-blue-700" :
//                       finalGrade === "F" ? "text-red-600"  : "text-pink-600"
//                     ],
//                   ].map(([label, value, color]) => (
//                     <div key={label} className="flex flex-col items-center justify-center py-4 px-3 bg-white text-center">
//                       <span className={`text-2xl font-black ${color}`}>{value}</span>
//                       <span className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">{label}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ── Grading Scale ── */}
//             <div className="border border-pink-200 rounded-lg overflow-hidden print:rounded-none">
//               <SectionHeader>Grading Scale</SectionHeader>
//               <div className="p-2 grid grid-cols-5 gap-1.5 text-xs">
//                 {GRADING_SCALE.map(({ grade, range, color, bg }) => (
//                   <div key={grade} className={`border border-pink-100 rounded px-2 py-2 text-center ${bg}`}>
//                     <div className={`font-black text-lg leading-none ${color}`}>{grade}</div>
//                     <div className="text-gray-500 text-[10px] mt-0.5">{range}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ── Attendance, Comments & Next Term ── */}
//      <div className="grid grid-cols-2 gap-2">

//   {/* Attendance */}
//   <div className="border border-pink-200 rounded-lg overflow-hidden print:rounded-none">
//     <SectionHeader>Attendance</SectionHeader>
//     <div className="p-2 flex gap-2">
//       <InputField
//         label="Opened"
//         value={student.timesOpened}
//         onChange={updateStudent("timesOpened")}
//         type="number"
//       />
//       <InputField
//         label="Present"
//         value={student.timesPresent}
//         onChange={updateStudent("timesPresent")}
//         type="number"
//       />
//     </div>
//   </div>

  

//   {/* Next Term */}
//   <div className="border border-pink-200 rounded-lg overflow-hidden print:rounded-none">
//     <SectionHeader>Next Term</SectionHeader>
//     <div className="p-2 flex gap-2">
//       <InputField
//         label="Resumption"
//         value={student.nextTermBegins}
//         onChange={updateStudent("nextTermBegins")}
//       />
//       <InputField
//         label="Fees"
//         value={student.nextTermFees}
//         onChange={updateStudent("nextTermFees")}
//       />
//     </div>
//   </div>

// </div>

// {/* Comments */}
//   <div className="border border-pink-200 rounded-lg overflow-hidden print:rounded-none">
//     <SectionHeader>Comments</SectionHeader>
//     <div className="p-2 flex gap-2">
//       <TextArea
//         label="Teacher"
//         value={student.teacherComment}
//         onChange={updateStudent("teacherComment")}
//         rows={1}
//       />
//       <TextArea
//         label="Head Teacher"
//         value={student.headTeacherRemark}
//         onChange={updateStudent("headTeacherRemark")}
//         rows={1}
//       />
//     </div>
//   </div>


//   {/* ── Signatures ── */}
// <div className="grid grid-cols-2 gap-8 pt-2">
//   <div>
//     <div className="border-b-2 border-blue-900 pb-8"></div>
//     <p className="text-xs font-bold text-blue-900 mt-1">Class Teacher</p>
//     <p className="text-[10px] text-gray-400">Signature</p>
//   </div>

//   <div>
//     <div className="border-b-2 border-blue-900 pb-8"></div>
//     <p className="text-xs font-bold text-blue-900 mt-1">Head Teacher</p>
//     <p className="text-[10px] text-gray-400">Signature & Stamp</p>
//   </div>
// </div>

//             {/* ── Document Footer ── */}
//             <div className="text-center text-[10px] text-gray-400 border-t border-pink-100 pt-2">
//               Supreme Kiddies Nursery &amp; Primary School — Printed on{" "}
//               {new Date().toLocaleDateString("en-NG", { day: "2-digit", month: "long", year: "numeric" })}
//               {" · "}This report card is only valid with the school stamp.
//             </div>

//           </div>
//         </div>

//         {/* ── Mobile FAB Buttons ── */}
//         <div className="no-print fixed bottom-5 right-5 flex flex-col gap-2 z-50">
//           <button onClick={addSubject} className="bg-pink-500 text-white text-sm font-bold px-4 py-3 rounded-full shadow-xl hover:bg-pink-600 transition">
//             ＋ Subject
//           </button>
//           <button onClick={handlePrint} className="bg-blue-900 text-white text-sm font-bold px-4 py-3 rounded-full shadow-xl hover:bg-blue-800 transition">
//             🖨 Print
//           </button>
//         </div>

//       </div>
//     </>
//   );
// }




import { useState, useRef, useEffect, useCallback } from "react";
import InputField from "../components/common/result/InputField";
import TextArea from "../components/common/result/TextArea";
import ScoreInput from "../components/common/result/ScoreInput";

import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

// ── Grading Scale ───────────────────────────────────────────────
const GRADING_SCALE = [
  { grade: "A", range: "70 – 100", color: "text-blue-800",   bg: "bg-blue-50"   },
  { grade: "B", range: "60 – 69",  color: "text-pink-700",   bg: "bg-pink-50"   },
  { grade: "C", range: "50 – 59",  color: "text-yellow-600", bg: "bg-yellow-50" },
  { grade: "D", range: "45 – 49",  color: "text-orange-600", bg: "bg-orange-50" },
  { grade: "F", range: "0 – 44",   color: "text-red-600",    bg: "bg-red-50"    },
];

function getGrade(score) {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 45) return "D";
  return "F";
}

function gradeColor(g) {
  const found = GRADING_SCALE.find((s) => s.grade === g);
  return found ? found.color : "text-gray-600";
}
function gradeBg(g) {
  const found = GRADING_SCALE.find((s) => s.grade === g);
  return found ? found.bg : "";
}

const emptySubject = () => ({
  id: Date.now() + Math.random(),
  name: "", test1: "", test2: "", exam: "",
  classAvg: "", firstTerm: "", secondTerm: "", thirdTerm: "", position: "",
});

// ── Reusable Section Header ─────────────────────────────────────
const SectionHeader = ({ children, action }) => (
  <div className="bg-blue-900 text-white text-xs font-bold uppercase px-3 py-2 tracking-widest flex justify-between items-center rounded-t-lg print:rounded-none">
    <span>{children}</span>
    {action && action}
  </div>
);

// ── Main Component ──────────────────────────────────────────────
export default function PrimaryReport() {
  // ── State with localStorage persistence ───────────────────────
  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem("pri-student");
    return saved ? JSON.parse(saved) : {
      name: "", class: "", term: "", session: "",
      position: "", outOf: "",
      timesOpened: "", timesPresent: "",
      nextTermBegins: "", nextTermFees: "",
      teacherComment: "", headTeacherRemark: "",
      teacherSignature: "", headTeacherSignature: "",
    };
  });

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("pri-subjects");
    return saved ? JSON.parse(saved) : [
      { ...emptySubject(), name: "Mathematics" },
      { ...emptySubject(), name: "English Language" },
      { ...emptySubject(), name: "Basic Science" },
    ];
  });

  const scrollRef = useRef(null);
  const [showLeft,  setShowLeft]  = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  // ── Persist to localStorage ───────────────────────────────────
  useEffect(() => {
    localStorage.setItem("pri-student", JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem("pri-subjects", JSON.stringify(subjects));
  }, [subjects]);

  // ── Scroll hint ───────────────────────────────────────────────
  useEffect(() => {
    const el = scrollRef.current;
    const handleScroll = () => {
      if (!el) return;
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    if (el) { el.addEventListener("scroll", handleScroll); handleScroll(); }
    return () => { if (el) el.removeEventListener("scroll", handleScroll); };
  }, []);

  // ── Handlers ──────────────────────────────────────────────────
  const updateStudent = (field) => (e) =>
    setStudent((s) => ({ ...s, [field]: e.target.value }));

  const addSubject = () =>
    setSubjects((prev) => [...prev, emptySubject()]);

  const removeSubject = (id) =>
    setSubjects((prev) => prev.filter((s) => s.id !== id));

  const updateSubject = useCallback((id, field, value) => {
    if ((field === "test1" || field === "test2") && value !== "" && Number(value) > 20) return;
    if (field === "exam" && value !== "" && Number(value) > 60) return;
    setSubjects((prev) =>
      prev.map((s) => (s.id !== id ? s : { ...s, [field]: value }))
    );
  }, []);

  // ── New Student ───────────────────────────────────────────────
  const handleNewStudent = () => {
    if (!window.confirm("Clear all data for a new student?")) return;
    localStorage.removeItem("pri-student");
    localStorage.removeItem("pri-subjects");
    window.location.reload();
  };

  // ── Totals & Summary ──────────────────────────────────────────
  const calcTotal = (s) => {
    const t1   = parseFloat(s.test1) || 0;
    const t2   = parseFloat(s.test2) || 0;
    const exam = parseFloat(s.exam)  || 0;
    if (!s.test1 && !s.test2 && !s.exam) return "";
    return Math.min(t1 + t2 + exam, 100);
  };

  const scored          = subjects.map(calcTotal).filter((t) => t !== "");
  const totalObtained   = scored.reduce((sum, t) => sum + t, 0);
  const totalObtainable = scored.length * 100;
  const overallAverage  = totalObtainable > 0
    ? ((totalObtained / totalObtainable) * 100).toFixed(1) : "–";
  const finalGrade = scored.length > 0 ? getGrade(Number(overallAverage)) : "–";

  // ── Dynamic zoom based on subject count ───────────────────────
  const zoom =
    subjects.length <= 6  ? 0.95 :
    subjects.length <= 8  ? 0.88 :
    subjects.length <= 10 ? 0.80 :
    subjects.length <= 12 ? 0.75 :
    subjects.length <= 14 ? 0.73 :
    subjects.length <= 16 ? 0.70 :
    subjects.length <= 18 ? 0.69 :
    0.69;

  // ── Print ─────────────────────────────────────────────────────
  const handlePrint = () => {
    const mainEl = document.getElementById("main-content");
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: "instant" });
    window.scrollTo({ top: 0, behavior: "instant" });
    setTimeout(() => window.print(), 300);
  };

  // ── Download PDF ──────────────────────────────────────────────
  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const element = document.querySelector(".print-wrap");
      element.classList.remove("overflow-hidden");
      element.style.width = "1400px";

      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        scrollY: -window.scrollY,
        windowWidth: 1400,
        backgroundColor: "#ffffff",
        logging: false,

        onclone: (clonedDoc) => {
          clonedDoc.querySelectorAll(".no-print").forEach((el) => {
  el.style.display = "none";
});
          clonedDoc.querySelectorAll("input, textarea").forEach((el) => {
            const div = clonedDoc.createElement("div");
            div.innerText = el.value || "";
            div.style.cssText = `font-size: 14px; font-weight: 700; color: #1e3a8a; border-bottom: 1px solid #999; min-height: 24px; padding: 2px; width: 100%;`;
            el.parentNode.replaceChild(div, el);
          });
        }
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      canvas.width = 0;
      canvas.height = 0;

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      pdf.addImage(imgData, "JPEG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save("report-sheet.pdf");

      element.style.width = "";
      element.classList.add("overflow-hidden");

    } catch (err) {
      console.error("Download failed:", err);
    }

    setIsDownloading(false);
  };

  // ── JSX ───────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&family=Lora:wght@700&display=swap');

        * { box-sizing: border-box; }
        body { font-family: 'Nunito', sans-serif; }

        @media print {
          @page { size: A4 portrait; margin: 0; }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          ::-webkit-scrollbar { display: none !important; }
          .no-print  { display: none !important; }
          .min-h-screen { background: white !important; padding: 0 !important; margin: 0 !important; }
          .print-wrap {
            zoom: ${zoom};
            font-size: 16px !important;
            max-width: 100% !important;
            width: 100% !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          input, textarea {
            border: none !important;
            border-bottom: 1px solid #aaa !important;
            border-radius: 0 !important;
            padding: 8px 2px !important;
            font-size: 18px !important;
            font-weight: 700 !important;
            background: transparent !important;
          }
          table  { font-size: 15px !important; font-weight: 900 !important; }
          th, td { padding: 2px 5px !important; line-height: 1.2 !important; font-weight: 700 !important; }
          .school-name  { font-size: 32px !important;  font-weight: 700}

          /* Extra compact for 14+ subjects */
          ${subjects.length >= 14 ? `
            .print-wrap .space-y-4 > * { margin-top: 4px !important; }
            th, td { padding: 1px 3px !important; line-height: 1.1 !important; }
            table { font-size: 13px !important; }
            input, textarea { padding: 2px !important; font-size: 13px !important; }
            .pb-8 { padding-bottom: 12px !important; }
          ` : ""}

          /* Ultra compact for 17+ subjects */
          ${subjects.length >= 17 ? `
            .print-wrap .space-y-4 > * { margin-top: 2px !important; }
            th, td { padding: 0px 2px !important; }
            table { font-size: 12px !important; }
            .py-4 { padding-top: 4px !important; padding-bottom: 4px !important; }
            .py-2 { padding-top: 2px !important; padding-bottom: 2px !important; }
          ` : ""}
        }
      `}</style>

      {/* ── Page Wrapper ── */}
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 py-6 px-3 print:bg-white print:p-0">

        {/* ── Top Action Bar ── */}
        <div className="no-print flex justify-end max-w-5xl mx-auto mb-4 gap-3 flex-wrap">
          <button onClick={handleNewStudent} className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition">
            🗑 New Student
          </button>
          <button onClick={addSubject} className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold px-4 py-2 rounded-lg shadow transition">
            + Add Subject
          </button>
          <button onClick={handlePrint} className="bg-blue-900 hover:bg-blue-800 text-white text-sm font-bold px-4 py-2 rounded-lg shadow transition">
            🖨 Print / Save PDF
          </button>
          <button onClick={handleDownload} disabled={isDownloading} className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition">
            {isDownloading ? "⏳ Downloading..." : "⬇ Download PDF"}
          </button>
        </div>

        {/* ── Document Card ── */}
        <div className="print-wrap max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-pink-100">

          {/* ── School Header ── */}
          <div className="bg-blue-900 text-white px-6 pt-6 pb-4 print:px-4 print:pt-8 print:pb-3">
            <div className="h-2 bg-pink-500 -mx-6 -mt-6 mb-4 print:-mx-4" />
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-pink-400 flex flex-col items-center justify-center text-blue-900 shadow-lg">
                <span className="text-3xl leading-none">🌟</span>
                <span className="text-[7px] font-black uppercase tracking-tight mt-0.5">SKS</span>
              </div>
              <div>
                <p className="school-name text-2xl font-black tracking-wide leading-tight" style={{ fontFamily: "'Lora', serif" }}>
                  Supreme Kiddies Nursery &amp; Primary School
                </p>
                <p className="text-pink-300 italic text-sm mt-0.5">
                  "Nurturing Young Minds for a Brighter Tomorrow"
                </p>
                <div className="mt-1.5 text-blue-200 text-xs flex flex-wrap justify-center gap-x-4 gap-y-0.5">
                  <span>📍 131, Opomalu Street, Ilorin, Kwara State</span>
                  <span>📞 +234 803 344 2192</span>
                  <span>✉ supremekiddies@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Title Bar ── */}
          <div className="bg-pink-500 text-white text-center font-black text-sm uppercase tracking-widest py-1.5 print:text-xs print:py-1">
            🎓 Student Report Card
          </div>

          <div className="p-5 print:p-3 space-y-4">

            {/* ── Student Information ── */}
            <div className="border border-pink-200 rounded-lg overflow-hidden print:rounded-none">
              <SectionHeader>Student Information</SectionHeader>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-pink-50/20">
                {[
                  ["Student's Full Name", "name",     "text",   "col-span-2 md:col-span-2"],
                  ["Class",              "class",    "text",   ""],
                  ["Term",               "term",     "text",   ""],
                  ["Academic Session",   "session",  "text",   ""],
                  ["Position in Class",  "position", "text",   ""],
                  ["Out of (Students)",  "outOf",    "number", ""],
                ].map(([label, field, type, colClass]) => (
                  <div key={field} className={colClass}>
                    <InputField label={label} value={student[field]} onChange={updateStudent(field)} placeholder={label} type={type} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Subjects Table ── */}
            <div className="border border-pink-200 rounded-lg overflow-hidden print:rounded-none">
              <SectionHeader
                action={
                  <button onClick={addSubject} className="no-print bg-pink-400 text-white text-xs font-bold px-2 py-0.5 rounded hover:bg-pink-300 transition">
                    + Add Row
                  </button>
                }
              >
                Academic Performance
              </SectionHeader>

              <div className="no-print flex justify-center gap-6 py-1.5 bg-pink-50 text-blue-900 text-xs font-bold">
                {showLeft  && <button onClick={() => scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })}>← Scroll Left</button>}
                {showRight && <button onClick={() => scrollRef.current.scrollBy({ left:  200, behavior: "smooth" })}>Scroll Right →</button>}
              </div>

              <div ref={scrollRef} className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-blue-900 text-white text-xs uppercase">
                      <th className="text-left px-3 py-2 border-r border-blue-700 min-w-[130px]">Subject</th>
                      <th className="px-2 py-2 border-r border-blue-700 w-14 bg-blue-800">Test 1<br/><span className="font-normal opacity-75 normal-case">/20</span></th>
                      <th className="px-2 py-2 border-r border-blue-700 w-14 bg-blue-800">Test 2<br/><span className="font-normal opacity-75 normal-case">/20</span></th>
                      <th className="px-2 py-2 border-r border-blue-700 w-14 bg-blue-800">Exam<br/><span className="font-normal opacity-75 normal-case">/60</span></th>
                      <th className="px-2 py-2 border-r border-blue-700 w-14 bg-pink-600">Total<br/><span className="font-normal opacity-75 normal-case">/100</span></th>
                      <th className="px-2 py-2 border-r border-blue-700 w-16">Obtainable</th>
                      <th className="px-2 py-2 border-r border-blue-700 w-16">Class Avg</th>
                      <th className="px-2 py-2 border-r border-blue-700 w-16">1st Term</th>
                      <th className="px-2 py-2 border-r border-blue-700 w-16">2nd Term</th>
                      <th className="px-2 py-2 border-r border-blue-700 w-16">3rd Term</th>
                      <th className="px-2 py-2 border-r border-blue-700 w-16">Position</th>
                      <th className="px-2 py-2 border-r border-blue-700 w-14 bg-pink-600">Grade</th>
                      <th className="no-print px-2 py-2 w-16">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((s, idx) => {
                      const total = calcTotal(s);
                      const grade = total !== "" ? getGrade(total) : "–";
                      return (
                        <tr key={s.id} className={`border-t border-pink-100 ${idx % 2 === 0 ? "bg-white" : "bg-pink-50/30"}`}>
                          <td className="px-2 py-1.5 border-r border-pink-100">
                            <ScoreInput value={s.name} onChange={(e) => updateSubject(s.id, "name", e.target.value)} placeholder="Subject name" type="text" />
                          </td>
                          <td className="px-2 py-1.5 border-r border-pink-100 bg-blue-50/40">
                            <ScoreInput value={s.test1} onChange={(e) => updateSubject(s.id, "test1", e.target.value)} max={20} placeholder="–" />
                          </td>
                          <td className="px-2 py-1.5 border-r border-pink-100 bg-blue-50/40">
                            <ScoreInput value={s.test2} onChange={(e) => updateSubject(s.id, "test2", e.target.value)} max={20} placeholder="–" />
                          </td>
                          <td className="px-2 py-1.5 border-r border-pink-100 bg-blue-50/40">
                            <ScoreInput value={s.exam} onChange={(e) => updateSubject(s.id, "exam", e.target.value)} max={60} placeholder="–" />
                          </td>
                          <td className={`px-2 py-1.5 border-r border-pink-100 text-center font-black text-sm ${gradeColor(grade)}`}>
                            {total !== "" ? total : "–"}
                          </td>
                          <td className="px-2 py-1.5 border-r border-pink-100 text-center text-gray-400 text-xs font-semibold">100</td>
                          <td className="px-2 py-1.5 border-r border-pink-100">
                            <ScoreInput value={s.classAvg} onChange={(e) => updateSubject(s.id, "classAvg", e.target.value)} placeholder="–" type="text" />
                          </td>
                          <td className="px-2 py-1.5 border-r border-pink-100">
                            <ScoreInput value={s.firstTerm} onChange={(e) => updateSubject(s.id, "firstTerm", e.target.value)} placeholder="–" type="text" />
                          </td>
                          <td className="px-2 py-1.5 border-r border-pink-100">
                            <ScoreInput value={s.secondTerm} onChange={(e) => updateSubject(s.id, "secondTerm", e.target.value)} placeholder="–" type="text" />
                          </td>
                          <td className="px-2 py-1.5 border-r border-pink-100">
                            <ScoreInput value={s.thirdTerm} onChange={(e) => updateSubject(s.id, "thirdTerm", e.target.value)} placeholder="–" type="text" />
                          </td>
                          <td className="px-2 py-1.5 border-r border-pink-100">
                            <ScoreInput value={s.position} onChange={(e) => updateSubject(s.id, "position", e.target.value)} placeholder="–" type="text" />
                          </td>
                          <td className={`px-2 py-1.5 border-r border-pink-100 text-center font-black text-sm ${gradeColor(grade)} ${gradeBg(grade)}`}>
                            {grade}
                          </td>
                          <td className="no-print px-1 py-1.5 text-center">
                            <button onClick={() => removeSubject(s.id)} className="text-red-400 hover:text-red-600 text-lg leading-none transition" title="Remove">×</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Overall Summary ── */}
            {scored.length > 0 && (
              <div className="border border-pink-200 rounded-lg overflow-hidden print:rounded-none">
                <SectionHeader>Overall Performance Summary</SectionHeader>
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-pink-100">
                  {[
                    ["Total Obtained",   `${totalObtained}`,   "text-blue-900"],
                    ["Total Obtainable", `${totalObtainable}`, "text-blue-900"],
                    ["Overall Average",  `${overallAverage}%`, "text-pink-600"],
                    ["Final Grade", finalGrade,
                      finalGrade === "A" ? "text-blue-700" :
                      finalGrade === "F" ? "text-red-600"  : "text-pink-600"
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
            <div className="border border-pink-200 rounded-lg overflow-hidden print:rounded-none">
              <SectionHeader>Grading Scale</SectionHeader>
              <div className="p-2 grid grid-cols-5 gap-1.5 text-xs">
                {GRADING_SCALE.map(({ grade, range, color, bg }) => (
                  <div key={grade} className={`border border-pink-100 rounded px-2 py-2 text-center ${bg}`}>
                    <div className={`font-black text-lg leading-none ${color}`}>{grade}</div>
                    <div className="text-gray-500 text-[10px] mt-0.5">{range}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Attendance & Next Term ── */}
            <div className="grid grid-cols-2 gap-2">
              <div className="border border-pink-200 rounded-lg overflow-hidden print:rounded-none">
                <SectionHeader>Attendance</SectionHeader>
                <div className="p-2 flex gap-2">
                  <InputField label="Opened" value={student.timesOpened} onChange={updateStudent("timesOpened")} type="number" />
                  <InputField label="Present" value={student.timesPresent} onChange={updateStudent("timesPresent")} type="number" />
                </div>
              </div>
              <div className="border border-pink-200 rounded-lg overflow-hidden print:rounded-none">
                <SectionHeader>Next Term</SectionHeader>
                <div className="p-2 flex gap-2">
                  <InputField label="Resumption" value={student.nextTermBegins} onChange={updateStudent("nextTermBegins")} />
                  <InputField label="Fees" value={student.nextTermFees} onChange={updateStudent("nextTermFees")} />
                </div>
              </div>
            </div>

            {/* ── Comments ── */}
            <div className="border border-pink-200 rounded-lg overflow-hidden print:rounded-none">
              <SectionHeader>Comments</SectionHeader>
              <div className="p-2 flex gap-2">
                <TextArea label="Teacher" value={student.teacherComment} onChange={updateStudent("teacherComment")} rows={1} />
                <TextArea label="Head Teacher" value={student.headTeacherRemark} onChange={updateStudent("headTeacherRemark")} rows={1} />
              </div>
            </div>

            {/* ── Signatures ── */}
            <div className="grid grid-cols-2 gap-8 pt-2">
              <div>
                <div className="border-b-2 border-blue-900 pb-8"></div>
                <p className="text-xs font-bold text-blue-900 mt-1">Class Teacher</p>
                <p className="text-[10px] text-gray-400">Signature</p>
              </div>
              <div>
                <div className="border-b-2 border-blue-900 pb-8"></div>
                <p className="text-xs font-bold text-blue-900 mt-1">Head Teacher</p>
                <p className="text-[10px] text-gray-400">Signature & Stamp</p>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="text-center text-[10px] text-gray-400 border-t border-pink-100 pt-2">
              Supreme Kiddies Nursery &amp; Primary School — Printed on{" "}
              {new Date().toLocaleDateString("en-NG", { day: "2-digit", month: "long", year: "numeric" })}
              {" · "}This report card is only valid with the school stamp.
            </div>

          </div>
        </div>

        {/* ── Mobile FAB Buttons ── */}
        <div className="no-print fixed bottom-5 right-5 flex flex-col gap-2 z-50">
          <button onClick={addSubject} className="bg-pink-500 text-white text-sm font-bold px-4 py-3 rounded-full shadow-xl hover:bg-pink-600 transition">
            ＋ Subject
          </button>
          <button onClick={handleDownload} disabled={isDownloading} className="bg-purple-600 text-white text-sm font-bold px-4 py-3 rounded-full shadow-xl hover:bg-purple-700 disabled:opacity-50 transition">
            {isDownloading ? "⏳..." : "⬇ Download"}
          </button>
          <button onClick={handlePrint} className="bg-blue-900 text-white text-sm font-bold px-4 py-3 rounded-full shadow-xl hover:bg-blue-800 transition">
            🖨 Print
          </button>
          <button onClick={handleNewStudent} className="bg-red-500 text-white text-sm font-bold px-4 py-3 rounded-full shadow-xl hover:bg-red-600 transition">
            🗑 New
          </button>
        </div>

      </div>
    </>
  );
}