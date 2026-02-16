import { useState, useRef, useEffect } from "react"; 
import logo from "./assets/logo.png"


export default function ReportCard() {
  const [studentName, setStudentName] = useState("");
  const [className, setClassName] = useState("");
  const [term, setTerm] = useState("");
  const [session, setSession] = useState("");
  const [position, setPosition] = useState("");
  const [outOf, setOutOf] = useState("");
  const [subjects, setSubjects] = useState([
    { name: "Mathematics", test1: 0, test2: 0, exam: 0 },
  ]);

  
const scrollRef = useRef(null)

const [showLeft, setShowLeft] = useState(false);
const [showRight, setShowRight] = useState(true);

useEffect(() => {
  const el = scrollRef.current;

  const handleScroll = () => {
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  if (el) {
    el.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on load
  }

  return () => {
    if (el) el.removeEventListener("scroll", handleScroll);
  };
}, []);

const handleRemove = (indexToRemove) => {
  setSubjects((prev) => 
  prev.filter((_, index)=> index !== indexToRemove)
)
} 


const handleChange = (index, field, value) => {
  const updated = [...subjects];

  if (field === "name") {
    updated[index][field] = value;
  } else {
    let numericValue = Number(value) || 0;

    if (field === "test1" || field === "test2") {
      numericValue = Math.min(numericValue, 20);
    }

    if (field === "exam") {
      numericValue = Math.min(numericValue, 60);
    }

    updated[index][field] = numericValue;
  }

  setSubjects(updated);
};


  const addSubject = () => {
    setSubjects([...subjects, { name: "", test1: 0, test2: 0, exam: 0 }]);
  };

  const calculateTotal = (sub) => sub.test1 + sub.test2 + sub.exam;

const [gradingScale, setGradingScale] = useState([
  { grade: "A", min: 70 },
  { grade: "B", min: 60 },
  { grade: "C", min: 50 },
  { grade: "D", min: 45 },
  { grade: "F", min: 0 },
]);

const calculateGrade = (score) => {
  const sortedScale = [...gradingScale].sort((a, b) => b.min - a.min);

  for (let scale of sortedScale) {
    if (score >= scale.min) {
      return scale.grade;
    }
  }
  return "F";
};


  



const totalObtained = subjects.reduce((sum, sub) => sum + calculateTotal(sub), 0);
const totalPossible = subjects.length * 100;
const overallAverage =
  totalPossible > 0
    ? (totalObtained / totalPossible) * 100
    : 0;


  const finalGrade = calculateGrade(overallAverage);


  return (
    <div className="w-full mx-auto max-w-5xl shadow-lg rounded-md overflow-hidden bg-gray-100 p-3 sm:p-6">
    <div  className="report-card" id="report-card">
  
      <div className="bg-white border-t-8 border-blue-900 rounded-t-md p-4 flex items-center">
  <img src={logo} alt="Supreme Schools" className="w-24 h-24 mr-4" />
  <div>
    <h3 className="font-bold text-4xl text-blue-900">Supreme Schools</h3>
    <h4 className="text-xl text-red-600">Report Card</h4>
  </div>
</div>

{/* Student Info */}
<div className="bg-gray-50 rounded-md p-6 mt-6 shadow-sm">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div>
      <label className="text-gray-700 font-semibold">Student Name:</label>
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="w-full bg-transparent border-b border-dashed border-gray-800 focus:outline-none"
      />
    </div>
    <div>
      <label className="text-gray-700 font-semibold">Class/Grade:</label>
      <input
        type="text"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        className="w-full bg-transparent border-b border-dashed border-gray-800 focus:outline-none"
      />
    </div>
    <div>
      <label className="text-gray-700 font-semibold">Term/Semester:</label>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full bg-transparent border-b border-dashed border-gray-800 focus:outline-none"
      />
    </div>
    <div>
      <label className="text-gray-700 font-semibold">Session:</label>
      <input
        type="text"
        value={session}
        onChange={(e) => setSession(e.target.value)}
        className="w-full bg-transparent border-b border-dashed border-gray-800 focus:outline-none"
      />
    </div>
    <div>
      <label className="text-gray-700 font-semibold">Position:</label>
      <input
        type="text"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="w-full bg-transparent border-b border-dashed border-gray-800 focus:outline-none"
      />
    </div>
    <div>
      <label className="text-gray-700 font-semibold">Out of:</label>
      <input
        type="text"
        value={outOf}
        onChange={(e) => setOutOf(e.target.value)}
        className="w-full bg-transparent border-b border-dashed border-gray-800 focus:outline-none"
      />
    </div>
  </div>
</div>

      {/* Subjects Table */}

      <div className="flex justify-end mt-8">
  <button
    onClick={addSubject}
    className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 print:hidden"
  >
    + Add Subject
  </button>
</div>


<div className="relative">
 
<div ref={scrollRef} className="overflow-x-auto">
  
<table className=" w-full  mt-2 table-fixed border-collapse">
  <thead className="">
    <tr className="   bg-blue-100 text-left">
      <th className="  p-2  min-w-[300px] ">Subject</th>
      <th className="  p-2 bg-blue-50">Test 1</th>
      <th className=" p-2 bg-blue-50">Test 2</th>
      <th className=" p-2 bg-blue-50">Exam</th>
      <th className=" p-2 bg-blue-50">Total</th>
      <th className=" p-2">Total Obtainable</th>
      <th className=" p-2">Class Average</th>
      <th className=" p-2">1st Term</th>
      <th className=" p-2">2nd Term</th>
      <th className=" p-2">3rd Term</th>
      <th className=" p-2">Position</th>
      <th className=" p-2 bg-blue-50">Grade</th>
      <th className="p-2 print:hidden">Action</th>

    </tr>
  </thead>
  <tbody className="">
    {subjects.map((sub, index) => {
      const total = calculateTotal(sub);
      const grade = calculateGrade(total);
      return (
        <tr key={index} className="odd:bg-gray-50  mb-4 sm:mb-0 border p-2 rounded even:bg-white">
          {/* Subject Name */}
          <td className="p-2 font-bold  w-[300px]">
            <input
              type="text"
              value={sub.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none font-bold"
            />
          </td>

          {/* Current Scores Group */}
          <td className="p-2 bg-blue-50">
            <input
              type="number"
              max="20"
              min="0"
              value={sub.test1}
              onChange={(e) => handleChange(index, "test1", e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
            />
          </td>
          <td className="p-2 bg-blue-50">
            <input
              type="number"
               max="20"
              min="0"
              value={sub.test2}
              onChange={(e) => handleChange(index, "test2", e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
            />
          </td>
          <td className="p-2 bg-blue-50">
            <input
              type="number"
               max="60"
              min="0"
              value={sub.exam}
              onChange={(e) => handleChange(index, "exam", e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
            />
          </td>
          <td className="p-2 bg-gray-100 text-center font-bold">{total}</td>

          {/* Other Fields */}
          <td className="p-2 text-center">100</td>
          <td className="p-2">
            <input
              type="text"
              placeholder="Enter Avg"
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
            />
          </td>
          <td className="p-2">
            <input
              type="text"
              placeholder="1st Term"
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
            />
          </td>
          <td className="p-2">
            <input
              type="text"
              placeholder="2nd Term"
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
            />
          </td>
          <td className="p-2">
            <input
              type="text"
              placeholder="3rd Term"
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
            />
          </td>
          <td className="p-2">
            <input
              type="text"
              placeholder="Position"
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none"
            />
          </td>

          {/* Grade */}
          <td className="p-2 bg-blue-50 text-center font-bold">{grade}</td>

          <td className="p-2 text-center">
  <button
    onClick={() => handleRemove(index)}
    className="text-red-500 hover:text-red-700 font-semibold print:hidden"
  >
    Cancel
  </button>
</td>

        </tr>
      );
    })}
  </tbody>
</table>
</div>

 <p className=" lg:hidden print:hidden"
>Scroll</p>

  {showLeft && (
    <button
      onClick={() =>
        scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })
      }
      className="sm:hidden absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 text-2xl pl-2 print:hidden"
    >
      ←
    </button>
  )}

  {showRight && (
    <button
      onClick={() =>
        scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })
      }
      className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 text-2xl pr-2 print:hidden"
    >
      →
    </button>
  )}

</div>
      {/* Add Subject Button */}
    {/* <div className="mt-6 mx-auto w-3/4 bg-white shadow-md rounded p-4 flex justify-around items-center"> */}
 <div className="mt-6 bg-white shadow-md w-3/4 mx-auto rounded p-4 flex flex-col sm:flex-row justify-between items-center gap-4">

  <p className="text-lg font-semibold">Total: {totalObtained}/{totalPossible}</p>
  <p className="text-lg font-semibold">Average: {overallAverage.toFixed(1)}%</p>
  <p className={`text-2xl font-bold px-4 py-2 rounded 
    ${finalGrade === "A" ? "bg-green-200 text-green-800" :
      finalGrade === "C" ? "bg-yellow-200 text-yellow-800" :
      finalGrade === "F" ? "bg-red-200 text-red-800" : "bg-blue-200 text-blue-800"}`}>
    {finalGrade}
  </p>
</div> 

        {/* Footer Section */}
<div className="bg-gray-50  border-t-4 border-blue-900 p-8 mt-6 space-y-2">
  {/* Signatures */}
  <div className="flex flex-col sm:flex-row justify-between items-center gap-4
">
   
        <div className="flex justify-center items-center">
      <label className="text-gray-700 font-semibold">Teacher's Signature:</label>
      <input
        type="text"
     
        // onChange={(e) => setSession(e.target.value)}
        className="w-24 bg-transparent border-b border-dashed border-gray-800 focus:outline-none text-center"
      />
    </div>
   
      <div className="flex justify-center items-center">
      <label className="text-gray-700 font-semibold"> Head Teacher's Signature:</label>
      <input
        type="text"
     
       
        className="w-24 bg-transparent border-b border-dashed border-gray-800 focus:outline-none text-center"
      />
    </div>
  </div>

  {/* Class Teacher Comment */}
 {/* Comments Section */}
<div className="flex flex-col sm:flex-row justify-center items-center gap-4
">
  {/* Class Teacher Comment */}
  <div className="w-1/2">
    <p className="text-gray-700 font-semibold">Class Teacher's Comment:</p>
    <textarea
      placeholder="Enter comment..."
      className="border p-2 w-full rounded h-12 mt-2"
    ></textarea>
  </div>

  {/* Head Teacher Remark */}
  <div className="w-1/2">
    <p className="text-gray-700 font-semibold">Head Teacher's Remark:</p>
    <textarea
      placeholder="Enter remark..."
      className="border p-2 w-full rounded h-12 mt-2"
    ></textarea>
  </div>
</div>


  {/* Attendance */}
  <div className="flex flex-col sm:flex-row justify-between gap-4
">
  
      <div className="flex items-center justify-center">
      <label className="text-gray-700 font-semibold">No. of Times School Opened: </label>
      <input
        type="text"
     
        // onChange={(e) => setSession(e.target.value)}
        className="w-24 bg-transparent border-b border-dashed border-gray-800 focus:outline-none text-center"
      />
    </div>
    <div className="flex items-center justify-center">
      <label className="text-gray-700 font-semibold">No. of Times Present: </label>
      <input
        type="text"
     
        // onChange={(e) => setSession(e.target.value)}
        className="w-24 bg-transparent border-b border-dashed border-gray-800 focus:outline-none text-center"
      />
    </div>
    {/* <p className="text-gray-700">No. of Times Present: ______</p> */}
  </div>

  {/* Next Term Info */}
  <div className="flex flex-col sm:flex-row justify-between gap-4
">
    {/* <p className="text-gray-700"> ____________</p> */}
    <div className="flex items-center justify-center">
      <label className="text-gray-700 font-semibold">Next Term Begins: </label>
      <input
        type="text"
     
        // onChange={(e) => setSession(e.target.value)}
        className="w-24 bg-transparent border-b border-dashed border-gray-800 focus:outline-none text-center"
      />
    </div>
    <div className="flex items-center justify-center">
      <label className="text-gray-700 font-semibold">Next Term School Fees: </label>
      <input
        type="text"
     
        // onChange={(e) => setSession(e.target.value)}
        className="w-24 bg-transparent border-b border-dashed border-gray-800 focus:outline-none text-center"
      />
    </div>
    {/* <p className="text-gray-700">Next Term School Fees: ____________________</p> */}
  </div>
</div>

<div className="flex justify-center mt-2">
 <button
  onClick={() => window.print()}
  className="bg-blue-900 text-white px-4 py-2 rounded-md shadow hover:bg-blue-800 print:hidden mx-auto"
>
  Print Report
</button>
</div>
 
  
   </div>
    </div>
  );
}
