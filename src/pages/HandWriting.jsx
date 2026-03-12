// // src/pages/HandwritingPage.jsx
// //
// // Handwriting practice sheet builder.
// // Teacher types a sentence, app renders it in dotted trace font
// // with ruled lines below for student practice.

// import { useState, useCallback } from "react";
// import SCHOOL from "../constants/School";
// import { inputClass } from "../constants/Inputclass";

// // ── Preview ───────────────────────────────────────────────────────────────────
// function HandwritingPreview({ data, onBack, onPrint }) {
//     const lineCount = 20; // number of ruled lines

//     return (
//         <>
//             <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Foundation:wght@400;500;600;700&display=swap');

//         @media print {
//           @page { size: A4; margin: 4mm 4mm; }
//           body { background: white !important; overflow: visible !important; }
//           .no-print { display: none !important; }
//           * { overflow: visible !important; }
//           .hw-paper {
//             box-shadow: none !important;
//             max-width: none !important;
//             width: 100% !important;
//             height: auto !important;
//             min-height: unset !important;
//             overflow: visible !important;
//             padding: 0 !important;
//             border-radius: 0 !important;
//           }
//         }

//         .trace-text {
//           font-family: 'Edu NSW ACT Foundation', cursive;
//           font-size: 52px;
//           line-height: 1.2;
//           color: #bbb;
//           letter-spacing: 2px;
//           word-break: break-word;
//         }

//         .ruled-line {
//           border-bottom: 1.5px solid #222;
//           margin-bottom: 0;
//           position: relative;
//         }

//         .ruled-line::before {
//           content: '';
//           display: block;
//           border-bottom: 1px solid #ddd;
//           margin-bottom: 10px;
//         }

//         .ruled-line-wrapper {
//           height: 36px;
//           border-bottom: 1.8px solid #333;
//           position: relative;
//         }

//         .ruled-line-wrapper::after {
//           content: '';
//           position: absolute;
//           bottom: 16px;
//           left: 0;
//           right: 0;
//           border-bottom: 1px dashed #ccc;
//         }
//       `}</style>

//             <div className="min-h-screen bg-neutral-600">
//                 <div className="no-print sticky top-0 z-50 bg-stone-900 text-stone-100 flex items-center justify-between px-4 py-2.5 shadow-xl">
//                     <button onClick={onBack} className="text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition">← Back to Editor</button>
//                     <span className="font-serif text-base">Preview</span>
//                     <button onClick={onPrint} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-900 hover:bg-amber-400 transition">🖨 Print / Save PDF</button>
//                 </div>

//                 <div className="p-4 sm:p-8 flex justify-center">
//                     <div
//                         className="hw-paper bg-white w-full max-w-[794px] p-8 shadow-2xl"
//                         style={{ fontFamily: "'Times New Roman', Times, serif", color: "#111" }}
//                     >
//                         {/* School Header */}
//                         <div style={{ textAlign: "center", marginBottom: "10px" }}>
//                             <p style={{ fontSize: "15px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>
//                                 {data.schoolType === "primary" ? SCHOOL.primaryName : SCHOOL.name}
//                             </p>
//                             <p style={{ fontSize: "10px", color: "#555", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1px" }}>{SCHOOL.motto}</p>
//                             <p style={{ fontSize: "10px", color: "#666", marginBottom: "6px" }}>{SCHOOL.address}</p>
//                             <hr style={{ borderTop: "2px solid #111", margin: "4px 0 2px" }} />
//                             <hr style={{ borderTop: "1px solid #111", margin: "0 0 6px" }} />
//                             <p style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase" }}>
//                                 {data.term} Examination ({data.session})
//                             </p>
//                         </div>

//                         {/* Meta */}
//                         <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "8px", fontSize: "12px" }}>
//                             <tbody>
//                                 <tr>
//                                     <td style={{ padding: "2px 0" }} ><strong>SUBJECT:</strong> {data.subject || "HAND WRITING"}</td>

//                                     <td style={{ padding: "2px 0" }} ><strong>CLASS:</strong> {data.classLevel}</td>
//                                 </tr>
//                                 <tr>
//                                     <td style={{ padding: "2px 0", width: "100%" }} colSpan={2}>
//                                         <strong>NAME:</strong>
//                                         <span style={{ display: "inline-block", borderBottom: "1px solid #111", width: "calc(80% - 50px)", verticalAlign: "bottom" }} />
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>

//                         <hr style={{ borderTop: "1.5px solid #111", margin: "" }} />

//                         {/* Trace sentence */}
//                         {data.sentence && (
//                             <div style={{ marginBottom: "12px", borderBottom: "1.8px solid #333", paddingBottom: "2px" }}>
//                                 <p className="trace-text">{data.sentence}</p>
//                             </div>
//                         )}

//                         {/* Ruled lines */}
//                         <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
//                             {Array.from({ length: lineCount }).map((_, i) => (
//                                 <div key={i} className="ruled-line-wrapper" />
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// // ── Builder ───────────────────────────────────────────────────────────────────
// export default function Handwriting() {
//     const [mode, setMode] = useState("builder");
//     const [data, setData] = useState({
//         schoolType: "primary",
//         classLevel: "",
//         term: "1st Term",
//         session: "2025/2026",
//         subject: "HAND WRITING",
//         sentence: "",
//     });

//     const update = useCallback((field, value) => {
//         setData(prev => ({ ...prev, [field]: value }));
//     }, []);

//     const handlePrint = useCallback(() => {
//         window.print();
//     }, []);

//     if (mode === "preview") {
//         return (
//             <HandwritingPreview
//                 data={data}
//                 onBack={() => setMode("builder")}
//                 onPrint={handlePrint}
//             />
//         );
//     }

//     return (
//         <div className="flex flex-col min-h-screen bg-stone-100">
//             {/* Header */}
//             <header className="sticky top-0 z-50 bg-stone-900 text-stone-100 h-14 flex items-center px-4 shadow-lg">
//                 <div className="w-full max-w-2xl mx-auto flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                         <span className="text-lg">✏️</span>
//                         <span className="font-serif text-lg tracking-wide">Handwriting Builder</span>
//                     </div>
//                     <button
//                         onClick={() => setMode("preview")}
//                         className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-900 hover:bg-amber-400 transition"
//                     >
//                         Preview →
//                     </button>
//                 </div>
//             </header>

//             <main className="w-full max-w-2xl mx-auto px-4 py-4 pb-20 flex flex-col gap-4">

//                 {/* School Banner */}
//                 <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 text-center">
//                     <p className="font-serif text-xl mb-1">Handwriting Practice Sheet</p>
//                     <p className="text-xs text-stone-400">For primary school use</p>
//                 </div>

//                 {/* Details */}
//                 <section className="bg-white rounded-2xl p-5 shadow-sm">
//                     <h2 className="font-serif text-xl mb-4 text-stone-800">Sheet Details</h2>
//                     <div className="grid grid-cols-2 gap-3 max-[400px]:grid-cols-1">

//                         <div className="col-span-2">
//                             <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1 block">School</label>
//                             <div className="flex gap-2">
//                                 <button
//                                     onClick={() => update("schoolType", "primary")}
//                                     className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${data.schoolType === "primary" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500"}`}
//                                 >
//                                     Primary
//                                 </button>
//                                 <button
//                                     onClick={() => update("schoolType", "secondary")}
//                                     className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${data.schoolType === "secondary" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500"}`}
//                                 >
//                                     Secondary
//                                 </button>
//                             </div>
//                         </div>

//                         <div>
//                             <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1 block">Class</label>
//                             <input className={inputClass} value={data.classLevel} onChange={e => update("classLevel", e.target.value)} placeholder="e.g. Basic 1" />
//                         </div>

//                         <div>
//                             <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1 block">Subject</label>
//                             <input className={inputClass} value={data.subject} onChange={e => update("subject", e.target.value)} placeholder="HAND WRITING" />
//                         </div>

//                         <div>
//                             <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1 block">Term</label>
//                             <select className={inputClass} value={data.term} onChange={e => update("term", e.target.value)}>
//                                 <option>1st Term</option>
//                                 <option>2nd Term</option>
//                                 <option>3rd Term</option>
//                             </select>
//                         </div>

//                         <div>
//                             <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1 block">Session</label>
//                             <input className={inputClass} value={data.session} onChange={e => update("session", e.target.value)} placeholder="2025/2026" />
//                         </div>
//                     </div>
//                 </section>

//                 {/* Sentence */}
//                 <section className="bg-white rounded-2xl p-5 shadow-sm">
//                     <h2 className="font-serif text-xl mb-1 text-stone-800">Practice Sentence</h2>
//                     <p className="text-xs text-gray-400 mb-3">This will appear in dotted trace handwriting font at the top of the sheet.</p>
//                     <input
//                         className={inputClass}
//                         value={data.sentence}
//                         onChange={e => update("sentence", e.target.value)}
//                         placeholder="e.g. Lion is a dangerous animal"
//                     />
//                     {data.sentence && (
//                         <div className="mt-4 p-4 bg-stone-50 rounded-xl border border-stone-100">
//                             <p className="text-xs text-stone-400 mb-2">Preview:</p>
//                             <p style={{
//                                 fontFamily: "'Edu NSW ACT Foundation', cursive",
//                                 fontSize: "20px",
//                                 color: "#bbb",
//                                 letterSpacing: "2px"
//                             }}>
//                                 {data.sentence}
//                             </p>
//                             <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Foundation:wght@400;700&display=swap" />
//                         </div>
//                     )}
//                 </section>

//                 <button
//                     onClick={() => setMode("preview")}
//                     className="w-full max-w-sm mx-auto block bg-stone-900 text-stone-100 font-semibold text-base py-4 rounded-2xl hover:bg-stone-800 transition"
//                 >
//                     Preview Sheet →
//                 </button>
//             </main>
//         </div>
//     );
// }


// src/pages/HandwritingPage.jsx
// Primary school handwriting practice sheet builder.
// Two modes: Sentence (trace a full sentence) and Letters (column-per-letter grid)

import { useState, useCallback } from "react";
import SCHOOL from "../constants/School";
import { inputClass } from "../constants/Inputclass";

const PRINT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Foundation:wght@400;700&display=swap');
  @media print {
    @page { size: A4; margin: 4mm 4mm; }
    body { background: white !important; overflow: visible !important; }
    .no-print { display: none !important; }
    * { overflow: visible !important; padding: 0 !important; margin: 0 !important; }
    .hw-paper {
      box-shadow: none !important;
      max-width: none !important;
      width: 100% !important;
      height: auto !important;
      min-height: unset !important;
      overflow: visible !important;
      border-radius: 0 !important;
    }
  }
  .trace-text {
    font-family: 'Edu NSW ACT Foundation', cursive;
    color: #bbb;
    letter-spacing: 2px;
    word-break: break-word;
  }
  .ruled-line-wrapper {
    height: 48px;
    border-bottom: 1.8px solid #333;
    position: relative;
  }
  .ruled-line-wrapper::after {
    content: '';
    position: absolute;
    bottom: 16px;
    left: 0; right: 0;
    border-bottom: 1px dashed #ccc;
  }
`;

// ── Shared Header ─────────────────────────────────────────────────────────────
function SheetHeader({ data }) {
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <p style={{ fontSize: "15px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>
          {SCHOOL.primaryName}
        </p>
        <p style={{ fontSize: "10px", color: "#555", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1px" }}>{SCHOOL.motto}</p>
        <p style={{ fontSize: "10px", color: "#666", marginBottom: "5px" }}>{SCHOOL.address}</p>
        <hr style={{ borderTop: "2px solid #111", margin: "3px 0 2px" }} />
        <hr style={{ borderTop: "1px solid #111", margin: "0 0 5px" }} />
        <p style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase" }}>
          {data.term} Examination ({data.session})
        </p>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "6px", fontSize: "12px" }}>
        <tbody>
          <tr>
            <td style={{ padding: "2px 0" }} colSpan={2}><strong>NAME:</strong> _________________________________________________________________</td>
          </tr>
          <tr>
            <td style={{ padding: "2px 0", width: "50%" }}><strong>CLASS:</strong> {data.classLevel}</td>
            <td style={{ padding: "2px 0" }}><strong>SUBJECT:</strong> {data.subject || "HAND WRITING"}</td>
          </tr>
        </tbody>
      </table>
      <hr style={{ borderTop: "1.5px solid #111", margin: "5px 0 8px" }} />
    </>
  );
}

// ── Sentence Preview ──────────────────────────────────────────────────────────
function SentencePreview({ data, onBack, onPrint }) {
  const lineCount = 18;
  return (
    <>
      <style>{PRINT_STYLES}</style>
      <div className="min-h-screen bg-neutral-600">
        <div className="no-print sticky top-0 z-50 bg-stone-900 text-stone-100 flex items-center justify-between px-4 py-2.5 shadow-xl">
          <button onClick={onBack} className="text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition">← Back</button>
          <span className="font-serif text-base">Preview</span>
          <button onClick={onPrint} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-900 hover:bg-amber-400 transition">🖨 Print / Save PDF</button>
        </div>
        <div className="p-4 sm:p-8 flex justify-center">
          <div className="hw-paper bg-white w-full max-w-[794px] p-6 shadow-2xl" style={{ fontFamily: "'Times New Roman', Times, serif", color: "#111" }}>
            <SheetHeader data={data} />
            {data.sentence && (
              <div style={{ marginBottom: "10px", borderBottom: "1.8px solid #333", paddingBottom: "6px" }}>
                <p className="trace-text" style={{ fontSize: "48px", lineHeight: "1.2" }}>{data.sentence}</p>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {Array.from({ length: lineCount }).map((_, i) => (
                <div key={i} className="ruled-line-wrapper" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Letters Preview ───────────────────────────────────────────────────────────
function LettersPreview({ data, onBack, onPrint }) {
  const cols = data.columns || [];
  const rowCount = 6;

  return (
    <>
      <style>{PRINT_STYLES}</style>
      <div className="min-h-screen bg-neutral-600">
        <div className="no-print sticky top-0 z-50 bg-stone-900 text-stone-100 flex items-center justify-between px-4 py-2.5 shadow-xl">
          <button onClick={onBack} className="text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition">← Back</button>
          <span className="font-serif text-base">Preview</span>
          <button onClick={onPrint} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-900 hover:bg-amber-400 transition">🖨 Print / Save PDF</button>
        </div>
        <div className="p-4 sm:p-8 flex justify-center">
          <div className="hw-paper bg-white w-full max-w-[794px] p-6 shadow-2xl" style={{ fontFamily: "'Times New Roman', Times, serif", color: "#111" }}>
            <SheetHeader data={data} />

            <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols.length}, 1fr)`, border: "1.5px solid #333", height: "900px" }}>
              {cols.map((col, ci) => (
                <div
                  key={ci}
                  style={{
                    borderRight: ci < cols.length - 1 ? "1.5px solid #333" : "none",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Letter at top */}
                  <div style={{ borderBottom: "1.5px solid #333", display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 0" }}>
                    <p className="trace-text" style={{ fontSize: "80px", lineHeight: "1", margin: 0 }}>{col || "?"}</p>
                  </div>

                  {/* Practice rows */}
                  {Array.from({ length: rowCount }).map((_, ri) => (
                    <div
                      key={ri}
                      style={{
                        flex: 1,
                        borderBottom: ri < rowCount - 1 ? "1px solid #ccc" : "none",
                        position: "relative",
                      }}
                    >
                      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, borderTop: "1px dashed #ddd" }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Builder ──────────────────────────────────────────────────────────────
export default function HandwritingPage() {
  const [mode, setMode] = useState("builder");
  const [sheetMode, setSheetMode] = useState("sentence");
  const [data, setData] = useState({
    classLevel: "",
    term: "1st Term",
    session: "2025/2026",
    subject: "HAND WRITING",
    sentence: "",
    columns: ["A", "B", "C"],
  });

  const update = useCallback((field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateColumn = useCallback((idx, value) => {
    setData(prev => {
      const columns = [...prev.columns];
      columns[idx] = value;
      return { ...prev, columns };
    });
  }, []);

  const addColumn = () => {
    if (data.columns.length >= 4) return;
    setData(prev => ({ ...prev, columns: [...prev.columns, ""] }));
  };

  const removeColumn = (idx) => {
    if (data.columns.length <= 2) return;
    setData(prev => ({ ...prev, columns: prev.columns.filter((_, i) => i !== idx) }));
  };

  const handlePrint = useCallback(() => { window.print(); }, []);

  if (mode === "preview") {
    return sheetMode === "sentence"
      ? <SentencePreview data={data} onBack={() => setMode("builder")} onPrint={handlePrint} />
      : <LettersPreview data={data} onBack={() => setMode("builder")} onPrint={handlePrint} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-stone-100">
      <header className="sticky top-0 z-50 bg-stone-900 text-stone-100 h-14 flex items-center px-4 shadow-lg">
        <div className="w-full max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">✏️</span>
            <span className="font-serif text-lg tracking-wide">Handwriting Builder</span>
          </div>
          <button onClick={() => setMode("preview")} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-900 hover:bg-amber-400 transition">
            Preview →
          </button>
        </div>
      </header>

      <main className="w-full max-w-2xl mx-auto px-4 py-4 pb-20 flex flex-col gap-4">

        <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 text-center">
          <p className="font-serif text-xl mb-1">Handwriting Practice Sheet</p>
          <p className="text-xs text-stone-400">Supreme Kiddies Nursery & Primary School</p>
        </div>

        {/* Mode toggle */}
        <div className="bg-white rounded-2xl p-2 shadow-sm flex gap-2">
          <button
            onClick={() => setSheetMode("sentence")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${sheetMode === "sentence" ? "bg-stone-900 text-white" : "text-stone-500 hover:bg-stone-50"}`}
          >
            ✍️ Sentence
          </button>
          <button
            onClick={() => setSheetMode("letters")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${sheetMode === "letters" ? "bg-stone-900 text-white" : "text-stone-500 hover:bg-stone-50"}`}
          >
            🔡 Letters / Numbers
          </button>
        </div>

        {/* Sheet Details */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-serif text-xl mb-4 text-stone-800">Sheet Details</h2>
          <div className="grid grid-cols-2 gap-3 max-[400px]:grid-cols-1">
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1 block">Class</label>
              <input className={inputClass} value={data.classLevel} onChange={e => update("classLevel", e.target.value)} placeholder="e.g. KG 1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1 block">Subject</label>
              <input className={inputClass} value={data.subject} onChange={e => update("subject", e.target.value)} placeholder="HAND WRITING" />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1 block">Term</label>
              <select className={inputClass} value={data.term} onChange={e => update("term", e.target.value)}>
                <option>1st Term</option>
                <option>2nd Term</option>
                <option>3rd Term</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1 block">Session</label>
              <input className={inputClass} value={data.session} onChange={e => update("session", e.target.value)} placeholder="2025/2026" />
            </div>
          </div>
        </section>

        {/* Sentence mode inputs */}
        {sheetMode === "sentence" && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-serif text-xl mb-1 text-stone-800">Practice Sentence</h2>
            <p className="text-xs text-gray-400 mb-3">Appears in dotted trace font. Student traces then practices on ruled lines below.</p>
            <input
              className={inputClass}
              value={data.sentence}
              onChange={e => update("sentence", e.target.value)}
              placeholder="e.g. Lion is a dangerous animal"
            />
            {data.sentence && (
              <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-xs text-stone-400 mb-1">Font preview:</p>
                <p style={{ fontFamily: "'Edu NSW ACT Foundation', cursive", fontSize: "24px", color: "#bbb", letterSpacing: "2px" }}>
                  {data.sentence}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Letters mode inputs */}
        {sheetMode === "letters" && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-serif text-xl mb-1 text-stone-800">Letters / Numbers</h2>
            <p className="text-xs text-gray-400 mb-3">Each gets its own column with practice boxes. Min 2, max 4 columns.</p>
            <div className="flex flex-col gap-2 mb-3">
              {data.columns.map((col, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs text-stone-400 w-16 shrink-0">Column {idx + 1}</span>
                  <input
                    className={`${inputClass} flex-1`}
                    value={col}
                    onChange={e => updateColumn(idx, e.target.value)}
                    placeholder={`e.g. ${["A", "B", "C", "D"][idx] || "?"}`}
                    maxLength={3}
                  />
                  {data.columns.length > 2 && (
                    <button onClick={() => removeColumn(idx)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 text-xs font-bold shrink-0">✕</button>
                  )}
                </div>
              ))}
            </div>
            {data.columns.length < 4 && (
              <button onClick={addColumn} className="text-xs font-bold px-3 py-2 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 transition w-full">
                + Add Column
              </button>
            )}
          </section>
        )}

        <button onClick={() => setMode("preview")} className="w-full max-w-sm mx-auto block bg-stone-900 text-stone-100 font-semibold text-base py-4 rounded-2xl hover:bg-stone-800 transition">
          Preview Sheet →
        </button>
      </main>
    </div>
  );
}