// import { useState, useRef, useEffect } from "react";
// import logo from "../assets/logo.png"
// import FormInput from "../components/common/FormInput";


// export default function BasicReport() {
//   const [studentName, setStudentName] = useState("");
//   const [className, setClassName] = useState("");
//   const [term, setTerm] = useState("");
//   const [session, setSession] = useState("");
//   const [position, setPosition] = useState("");
//   const [outOf, setOutOf] = useState("");
//   const [subjects, setSubjects] = useState([
//     { name: "Mathematics", test1: 0, test2: 0, exam: 0 },
//   ]);


//   const scrollRef = useRef(null)

//   const [showLeft, setShowLeft] = useState(false);
//   const [showRight, setShowRight] = useState(true);

//   useEffect(() => {
//     const el = scrollRef.current;

//     const handleScroll = () => {
//       if (!el) return;

//       setShowLeft(el.scrollLeft > 0);
//       setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
//     };

//     if (el) {
//       el.addEventListener("scroll", handleScroll);
//       handleScroll(); // run once on load
//     }

//     return () => {
//       if (el) el.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleRemove = (indexToRemove) => {
//     setSubjects((prev) =>
//       prev.filter((_, index) => index !== indexToRemove)
//     )
//   }


//   const handleChange = (index, field, value) => {
//     const updated = [...subjects];

//     if (field === "name") {
//       updated[index][field] = value;
//     } else {
//       let numericValue = Number(value) || 0;

//       if (field === "test1" || field === "test2") {
//         numericValue = Math.min(numericValue, 20);
//       }

//       if (field === "exam") {
//         numericValue = Math.min(numericValue, 60);
//       }

//       updated[index][field] = numericValue;
//     }

//     setSubjects(updated);
//   };


//   const addSubject = () => {
//     setSubjects([...subjects, { name: "", test1: 0, test2: 0, exam: 0 }]);
//   };

//   const calculateTotal = (sub) => sub.test1 + sub.test2 + sub.exam;

//   const [gradingScale, setGradingScale] = useState([
//     { grade: "A", min: 70 },
//     { grade: "B", min: 60 },
//     { grade: "C", min: 50 },
//     { grade: "D", min: 45 },
//     { grade: "F", min: 0 },
//   ]);

//   const calculateGrade = (score) => {
//     const sortedScale = [...gradingScale].sort((a, b) => b.min - a.min);

//     for (let scale of sortedScale) {
//       if (score >= scale.min) {
//         return scale.grade;
//       }
//     }
//     return "F";
//   };






//   const totalObtained = subjects.reduce((sum, sub) => sum + calculateTotal(sub), 0);
//   const totalPossible = subjects.length * 100;
//   const overallAverage =
//     totalPossible > 0
//       ? (totalObtained / totalPossible) * 100
//       : 0;


//   const finalGrade = calculateGrade(overallAverage);


//   return (
//     <div className="w-full mx-auto max-w-5xl shadow-lg rounded-md overflow-hidden bg-gray-100 p-3 sm:p-6">
//       <div className="report-card" id="report-card">

//         <div className="bg-white border-t-8 border-blue-900 rounded-t-md p-4 flex items-center">
//           <img src={logo} alt="Supreme Schools" className="w-28 h-24 mr-4" />
//           <div>
//             <h3 className="font-bold sm:text-xl lg:text-3xl text-blue-900">Supreme Kiddies Nursery & primary School</h3>
//             <h4 className="text-xl text-red-600">Report Card</h4>
//           </div>
//         </div>

//         {/* Student Info */}
//         <div className="bg-gray-50 rounded-md p-6 mt-6 shadow-sm">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div>

//               <FormInput
//                 label="Student Name:"
//                 value={studentName}
//                 onChange={(e) => setStudentName(e.target.value)}

//               />
//             </div>
//             <div>

//              <FormInput
//                 label="Class/Grade:"
//                 value={className}
//                 onChange={(e) => setClassName(e.target.value)}

//               />
              
//             </div>
//             <div>

            
//              <FormInput
//                 label="Term/Semester:"
//                 value={term}
//                 onChange={(e) => setTerm(e.target.value)}

//               />
           
//             </div>
//             <div>
//              <FormInput
//                 label="Session:"
//                 value={session}
//                 onChange={(e) => setSession(e.target.value)}

//               />
            
           
//             </div>
//             <div>

//             <FormInput
//                 label="Position:"
//                 value={session}
//                 onChange={(e) => setPosition(e.target.value)}

//               />
            
         
//             </div>
//             <div>
//               <FormInput
//                 label="Out of:"
//                 value={outOf}
//                  onChange={(e) => setOutOf(e.target.value)}

//               />
             
//             </div>
//           </div>
//         </div>

//         {/* Subjects Table */}

//         <div className="flex justify-end mt-8">
//           <button
//             onClick={addSubject}
//             className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 print:hidden"
//           >
//             + Add Subject
//           </button>
//         </div>


//         <div className="relative">

//           <div ref={scrollRef} className="overflow-x-auto">

//             <table className=" w-full  mt-2 table-auto border-collapse">
//               <thead className="">
//                 <tr className="   bg-blue-100 text-left">
//                   <th className="  p-2   w-40 ">Subject</th>
//                   <th className="  p-2 bg-blue-50">Test 1</th>
//                   <th className=" p-2 bg-blue-50">Test 2</th>
//                   <th className=" p-2 bg-blue-50">Exam</th>
//                   <th className=" p-2 bg-blue-50">Total</th>
//                   <th className=" p-2">Total Obtainable</th>
//                   <th className=" p-2">Class Average</th>
//                   <th className=" p-2">1st Term</th>
//                   <th className=" p-2">2nd Term</th>
//                   <th className=" p-2">3rd Term</th>
//                   <th className=" p-2">Position</th>
//                   <th className=" p-2 bg-blue-50">Grade</th>
//                   <th className="p-2 print:hidden">Action</th>

//                 </tr>
//               </thead>
//               <tbody className="">
//                 {subjects.map((sub, index) => {
//                   const total = calculateTotal(sub);
//                   const grade = calculateGrade(total);
//                   return (
//                     <tr key={index} className="odd:bg-gray-50  mb-4 sm:mb-0 border p-2 rounded even:bg-white">
//                       {/* Subject Name */}
//                       <td className="p-2 font-bold  ">
//                         <input
//                           type="text"
//                           value={sub.name}
//                           onChange={(e) => handleChange(index, "name", e.target.value)}
//                           className="w-full bg-transparent border-b border-gray-300 focus:outline-none font-bold"
//                         />
//                       </td>

//                       {/* Current Scores Group */}
//                       <td className="p-2 bg-blue-50">
//                         <input
//                           type="number"
//                           max="20"
//                           min="0"
//                           value={sub.test1}
//                           onChange={(e) => handleChange(index, "test1", e.target.value)}
//                           className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
//                         />
//                       </td>
//                       <td className="p-2 bg-blue-50">
//                         <input
//                           type="number"
//                           max="20"
//                           min="0"
//                           value={sub.test2}
//                           onChange={(e) => handleChange(index, "test2", e.target.value)}
//                           className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
//                         />
//                       </td>
//                       <td className="p-2 bg-blue-50">
//                         <input
//                           type="number"
//                           max="60"
//                           min="0"
//                           value={sub.exam}
//                           onChange={(e) => handleChange(index, "exam", e.target.value)}
//                           className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
//                         />
//                       </td>
//                       <td className="p-2 bg-gray-100 text-center font-bold">{total}</td>

//                       {/* Other Fields */}
//                       <td className="p-2 text-center">100</td>
//                       <td className="p-2">
//                         <input
//                           type="text"
//                           placeholder="Enter Avg"
//                           className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
//                         />
//                       </td>
//                       <td className="p-2">
//                         <input
//                           type="text"
//                           placeholder="1st Term"
//                           className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
//                         />
//                       </td>
//                       <td className="p-2">
//                         <input
//                           type="text"
//                           placeholder="2nd Term"
//                           className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
//                         />
//                       </td>
//                       <td className="p-2">
//                         <input
//                           type="text"
//                           placeholder="3rd Term"
//                           className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
//                         />
//                       </td>
//                       <td className="p-2">
//                         <input
//                           type="text"
//                           placeholder="Position"
//                           className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
//                         />
//                       </td>

//                       {/* Grade */}
//                       <td className="p-2 bg-blue-50 text-center font-bold">{grade}</td>

//                       <td className="p-2 text-center">
//                         <button
//                           onClick={() => handleRemove(index)}
//                           className="text-red-500 hover:text-red-700 font-semibold print:hidden"
//                         >
//                           Cancel
//                         </button>
//                       </td>

//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>



//         </div>

//         <div className="flex justify-center gap-4 mt-4 print:hidden">
//           {showLeft && (
//             <button
//               onClick={() =>
//                 scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })
//               }
//               className="text-gray-500 text-2xl"
//             >
//               ←
//             </button>
//           )}
//           {showRight && (
//             <button
//               onClick={() =>
//                 scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })
//               }
//               className="text-gray-500 text-2xl"
//             >
//               →
//             </button>
//           )}
//         </div>




        
//         {/* <div className="mt-6 mx-auto w-3/4 bg-white shadow-md rounded p-4 flex justify-around items-center"> */}
//         <div className="mt-6 bg-white shadow-md w-3/4 mx-auto rounded p-4 flex flex-col sm:flex-row justify-between items-center gap-4">

//           <p className="text-lg font-semibold">Total: {totalObtained}/{totalPossible}</p>
//           <p className="text-lg font-semibold">Average: {overallAverage.toFixed(1)}%</p>
//           <p className={`text-2xl font-bold px-4 py-2 rounded 
//     ${finalGrade === "A" ? "bg-green-200 text-green-800" :
//               finalGrade === "C" ? "bg-yellow-200 text-yellow-800" :
//                 finalGrade === "F" ? "bg-red-200 text-red-800" : "bg-blue-200 text-blue-800"}`}>
//             {finalGrade}
//           </p>
//         </div>

//         {/* Footer Section */}
//         <div className="bg-gray-50  border-t-4 border-blue-900 p-8 mt-6 space-y-2">
//           {/* Signatures */}
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4
// ">

//             <div className="flex justify-center items-center">
//               <label className="text-gray-700 font-semibold">Teacher's Signature:</label>
//               <input
//                 type="text"

//                 // onChange={(e) => setSession(e.target.value)}
//                 className="w-24 bg-transparent border-b border-dashed border-gray-800 focus:outline-none text-center"
//               />
//             </div>

//             <div className="flex justify-center items-center">
//               <label className="text-gray-700 font-semibold"> Head Teacher's Signature and Stamp:</label>
//               <input
//                 type="text"


//                 className="w-24 bg-transparent border-b border-dashed border-gray-800 focus:outline-none text-center"
//               />
//             </div>
//           </div>

//           {/* Class Teacher Comment */}
//           {/* Comments Section */}
//           <div className="flex flex-col sm:flex-row justify-center items-center gap-4
// ">
//             {/* Class Teacher Comment */}
//             <div className="w-1/2">
//               <p className="text-gray-700 font-semibold">Class Teacher's Comment:</p>
//               <textarea
//                 placeholder="Enter comment..."
//                 className="border p-2 w-full rounded h-12 mt-2"
//               ></textarea>
//             </div>

//             {/* Head Teacher Remark */}
//             <div className="w-1/2">
//               <p className="text-gray-700 font-semibold">Head Teacher's Remark:</p>
//               <textarea
//                 placeholder="Enter remark..."
//                 className="border p-2 w-full rounded h-12 mt-2"
//               ></textarea>
//             </div>
//           </div>


//           {/* Attendance */}
//           <div className="flex flex-col sm:flex-row justify-between gap-4
// ">

//             <div className="flex items-center justify-center">
//               <label className="text-gray-700 font-semibold">No. of Times School Opened: </label>
//               <input
//                 type="text"

//                 // onChange={(e) => setSession(e.target.value)}
//                 className="w-24 bg-transparent border-b border-dashed border-gray-800 focus:outline-none text-center"
//               />
//             </div>
//             <div className="flex items-center justify-center">
//               <label className="text-gray-700 font-semibold">No. of Times Present: </label>
//               <input
//                 type="text"

//                 // onChange={(e) => setSession(e.target.value)}
//                 className="w-24 bg-transparent border-b border-dashed border-gray-800 focus:outline-none text-center"
//               />
//             </div>
//             {/* <p className="text-gray-700">No. of Times Present: ______</p> */}
//           </div>

//           {/* Next Term Info */}
//           <div className="flex flex-col sm:flex-row justify-between gap-4
// ">
//             {/* <p className="text-gray-700"> ____________</p> */}
//             <div className="flex items-center justify-center">
//               <label className="text-gray-700 font-semibold">Next Term Begins: </label>
//               <input
//                 type="text"

//                 // onChange={(e) => setSession(e.target.value)}
//                 className="w-24 bg-transparent border-b border-dashed border-gray-800 focus:outline-none text-center"
//               />
//             </div>
//             <div className="flex items-center justify-center">
//               <label className="text-gray-700 font-semibold">Next Term School Fees: </label>
//               <input
//                 type="text"

//                 // onChange={(e) => setSession(e.target.value)}
//                 className="w-24 bg-transparent border-b border-dashed border-gray-800 focus:outline-none text-center"
//               />
//             </div>
//             {/* <p className="text-gray-700">Next Term School Fees: ____________________</p> */}
//           </div>
//         </div>

//         <div className="flex justify-center mt-2">
//           <button
//             onClick={() => window.print()}
//             className="bg-blue-900 text-white px-4 py-2 rounded-md shadow hover:bg-blue-800 print:hidden mx-auto"
//           >
//             Print Report
//           </button>
//         </div>


//       </div>
//     </div>
//   );
// }


import { useState, useRef, useEffect } from "react";
import InputField from "../components/common/InputField";
import TextArea from "../components/common/TextArea";
import ScoreInput from "../components/common/ScoreInput";

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
  const [student, setStudent] = useState({
    name: "", class: "", term: "", session: "",
    position: "", outOf: "",
    timesOpened: "", timesPresent: "",
    nextTermBegins: "", nextTermFees: "",
    teacherComment: "", headTeacherRemark: "",
    teacherSignature: "", headTeacherSignature: "",
  });

  const [subjects, setSubjects] = useState([
    { ...emptySubject(), name: "Mathematics" },
    { ...emptySubject(), name: "English Language" },
    { ...emptySubject(), name: "Basic Science" },
  ]);

  const scrollRef = useRef(null);
  const [showLeft,  setShowLeft]  = useState(false);
  const [showRight, setShowRight] = useState(true);

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

  const updateSubject = (id, field, value) => {
    if ((field === "test1" || field === "test2") && value !== "" && Number(value) > 20) return;
    if (field === "exam" && value !== "" && Number(value) > 60) return;
    setSubjects((prev) =>
      prev.map((s) => (s.id !== id ? s : { ...s, [field]: value }))
    );
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

  // ── Print ─────────────────────────────────────────────────────
  const handlePrint = () => {
    const mainEl = document.getElementById("main-content");
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: "instant" });
    window.scrollTo({ top: 0, behavior: "instant" });
    setTimeout(() => window.print(), 300);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&family=Lora:wght@700&display=swap');

        * { box-sizing: border-box; }
        body { font-family: 'Nunito', sans-serif; }

        @media print {
          @page { size: A3 portrait; margin: 0; }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print  { display: none !important; }
          .min-h-screen { background: white !important; padding: 0 !important; margin: 0 !important; }
          .print-wrap {
            font-size: 10px !important;
            max-width: 100% !important;
            width: 100% !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          input, textarea {
            border: none !important;
            border-bottom: 1px solid #aaa !important;
            border-radius: 0 !important;
            padding: 1px 2px !important;
            font-size: 10px !important;
            background: transparent !important;
          }
          table  { font-size: 10px !important; }
          th, td { padding: 2px 4px !important; }
          .school-name  { font-size: 20px !important; }
        }
      `}</style>

      {/* ── Page Wrapper ── */}
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 py-6 px-3 print:bg-white print:p-0">

        {/* ── Top Action Bar ── */}
        <div className="no-print flex justify-end max-w-5xl mx-auto mb-4 gap-3">
          <button onClick={addSubject} className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold px-4 py-2 rounded-lg shadow transition">
            + Add Subject
          </button>
          <button onClick={handlePrint} className="bg-blue-900 hover:bg-blue-800 text-white text-sm font-bold px-4 py-2 rounded-lg shadow transition">
            🖨 Print / Save PDF
          </button>
        </div>

        {/* ── Document Card ── */}
        <div className="print-wrap max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-pink-100">

          {/* ── School Header ── */}
          <div className="bg-blue-900 text-white px-6 pt-6 pb-4 print:px-4 print:pt-8 print:pb-3">
            {/* Pink accent stripe at very top */}
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

          {/* ── Title Bar — pink ── */}
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
                  ["Class / Grade",       "class",    "text",   ""],
                  ["Term / Semester",     "term",     "text",   ""],
                  ["Academic Session",    "session",  "text",   ""],
                  ["Position in Class",   "position", "text",   ""],
                  ["Out of (Students)",   "outOf",    "number", ""],
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

              {/* Scroll hint arrows */}
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

            {/* ── Attendance, Comments & Next Term ── */}
            <div className="border border-pink-200 rounded-lg overflow-hidden print:rounded-none">
              <SectionHeader>Attendance, Comments &amp; Next Term</SectionHeader>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5 bg-pink-50/10">

                <div className="space-y-2">
                  <p className="text-xs font-black text-blue-900 uppercase tracking-wider">📅 Attendance</p>
                  <InputField label="No. of Times School Opened" value={student.timesOpened} onChange={updateStudent("timesOpened")} placeholder="e.g. 90" type="number" />
                  <InputField label="No. of Times Present" value={student.timesPresent} onChange={updateStudent("timesPresent")} placeholder="e.g. 85" type="number" />
                  {student.timesOpened && student.timesPresent && (
                    <p className="text-xs text-pink-600 font-bold">
                      Attendance: {((+student.timesPresent / +student.timesOpened) * 100).toFixed(1)}%
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-black text-blue-900 uppercase tracking-wider">📆 Next Term Info</p>
                  <InputField label="Next Term Begins" value={student.nextTermBegins} onChange={updateStudent("nextTermBegins")} placeholder="e.g. Jan 8, 2025" />
                  <InputField label="Next Term School Fees (₦)" value={student.nextTermFees} onChange={updateStudent("nextTermFees")} placeholder="e.g. 30,000" />
                </div>

                <TextArea label="Class Teacher's Comment" value={student.teacherComment} onChange={updateStudent("teacherComment")} placeholder="Enter comment..." rows={3} />
                <TextArea label="Head Teacher's Remark" value={student.headTeacherRemark} onChange={updateStudent("headTeacherRemark")} placeholder="Enter remark..." rows={3} />

                <InputField label="Class Teacher's Signature" value={student.teacherSignature} onChange={updateStudent("teacherSignature")} placeholder="Sign here" />
                <InputField label="Head Teacher's Signature & Stamp" value={student.headTeacherSignature} onChange={updateStudent("headTeacherSignature")} placeholder="Sign here" />
              </div>
            </div>

            {/* ── Document Footer ── */}
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
          <button onClick={handlePrint} className="bg-blue-900 text-white text-sm font-bold px-4 py-3 rounded-full shadow-xl hover:bg-blue-800 transition">
            🖨 Print
          </button>
        </div>

      </div>
    </>
  );
}
