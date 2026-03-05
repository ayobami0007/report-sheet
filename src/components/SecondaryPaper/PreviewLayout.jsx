

// import SCHOOL from "../../constants/school";

// export default function SecondaryPreviewLayout({
//   exam,
//   objectiveImageCards,
//   theoryImageCards,
//   pasteObjectiveImages,
//   pasteTheoryImages,
//   onBack,
//   onPrint
// }) {
//   let qNum = 0;
//   const isPaste = exam.inputMode === "paste";

//   return (
//     <>
//       <style>{`
//         @media print {
//           @page { size: A4; margin: 18mm 20mm; }
//           body { background: white !important; }
//           .no-print { display: none !important; }
//           * { page-break-inside: avoid; }
//           .a4-paper {
//             box-shadow: none !important;
//             max-width: none !important;
//             width: 100% !important;
//             min-height: unset !important;
//             padding: 0 !important;
//             border-radius: 0 !important;
//           }
//         }
//       `}</style>

//       <div className="min-h-screen bg-neutral-600">
//         <div className="no-print sticky top-0 z-50 bg-stone-900 text-stone-100 flex items-center justify-between px-4 py-2.5 shadow-xl">
//           <button onClick={onBack} className="text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition">← Back to Editor</button>
//           <span className="font-serif text-base">Preview</span>
//           <button onClick={onPrint} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-900 hover:bg-amber-400 transition">🖨 Print / Save PDF</button>
//         </div>

//         <div className="p-4 sm:p-8 flex justify-center">
//           <div
//             className="a4-paper bg-white w-full max-w-[794px] min-h-[1123px] p-12 shadow-2xl"
//             style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: "13px", color: "#111", lineHeight: "1.6" }}
//           >
//             {/* School Header */}
//             <div style={{ textAlign: "center", marginBottom: "10px" }}>
//               <p style={{ fontSize: "17px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>{SCHOOL.name}</p>
//               <p style={{ fontSize: "10.5px", color: "#555", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "2px" }}>{SCHOOL.motto}</p>
//               <p style={{ fontSize: "10.5px", color: "#666", marginBottom: "8px" }}>{SCHOOL.address}</p>
//               <hr style={{ borderTop: "2.5px solid #111", margin: "5px 0 3px" }} />
//               <hr style={{ borderTop: "1px solid #111", margin: "0 0 7px" }} />
//               <p style={{ fontSize: "13px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
//                 {exam.term} Examination — {exam.session}
//               </p>
//             </div>

//             {/* Exam Meta */}
//             <table style={{ width: "100%", borderCollapse: "collapse", margin: "7px 0", fontSize: "12px" }}>
//               <tbody>
//                 <tr>
//                   <td style={{ padding: "2px 0", width: "50%" }}><strong>Subject:</strong> {exam.subject}</td>
//                   <td style={{ padding: "2px 0" }}><strong>Class:</strong> {exam.classLevel}</td>
//                 </tr>
//                 <tr>
//                   <td style={{ padding: "2px 0" }}><strong>Time Allowed:</strong> {exam.timeAllowed}</td>
//                   <td style={{ padding: "2px 0" }}><strong>Date:</strong> ____________________</td>
//                 </tr>
//               </tbody>
//             </table>

//             {exam.instructions && (
//               <div style={{ background: "#f8f8f8", border: "1px solid #ddd", padding: "5px 10px", fontSize: "11.5px", margin: "7px 0", borderRadius: "2px" }}>
//                 <strong>Instructions:</strong> {exam.instructions}
//               </div>
//             )}

//             <hr style={{ borderTop: "2px solid #111", margin: "9px 0" }} />

//             {/* ── Section A ─────────────────────────────────────────── */}
//             <section style={{ marginBottom: "12px" }}>
//               <p style={{ fontSize: "12.5px", fontWeight: "700", textTransform: "uppercase", textAlign: "center", letterSpacing: "0.5px", marginBottom: "2px" }}>
//                 SECTION A — OBJECTIVES
//               </p>
//               <p style={{ fontSize: "11px", textAlign: "center", fontStyle: "italic", color: "#555", marginBottom: "10px" }}>
//                 Choose the correct answer from the options provided.
//               </p>

//               {isPaste ? (
//                 // ── Paste mode ───────────────────────────────────────
//                 <>
//                   {/* Render pasted text with images injected after their question numbers */}
//                   {renderPasteWithImages(exam.pasteObjectives, pasteObjectiveImages)}
//                 </>
//               ) : (
//                 // ── Build mode ───────────────────────────────────────
//                 exam.objectives.map((item, idx) => {
//                   // Image cards that go after this item
//                   const imagesAfter = (objectiveImageCards || []).filter(img => img.afterIdx === idx);

//                   if (item.type === "heading") {
//                     return (
//                       <div key={item.id}>
//                         <div style={{ textAlign: "center", margin: "14px 0 4px" }}>
//                           {item.title && <p style={{ fontSize: "12.5px", fontStyle: "italic", fontWeight: "600" }}>{item.title}</p>}
//                           {item.subtitle && <p style={{ fontSize: "11.5px", fontStyle: "italic", color: "#333" }}>{item.subtitle}</p>}
//                         </div>
//                         {imagesAfter.map(img => <PrintImage key={img.id} src={img.src} />)}
//                       </div>
//                     );
//                   }
//                   if (item.type === "passage") {
//                     return (
//                       <div key={item.id}>
//                         <div style={{ margin: "8px 0 10px", pageBreakInside: "avoid" }}>
//                           {item.title && <p style={{ fontSize: "12.5px", fontWeight: "700", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "5px" }}>{item.title}</p>}
//                           <p style={{ fontSize: "12.5px", textAlign: "justify", lineHeight: "1.7" }}>{item.text}</p>
//                         </div>
//                         {imagesAfter.map(img => <PrintImage key={img.id} src={img.src} />)}
//                       </div>
//                     );
//                   }

//                   qNum++;
//                   const opts = item.options;
//                   const allShort = opts.every(o => (o || "").length <= 20);
//                   return (
//                     <div key={item.id} style={{ marginBottom: "6px", pageBreakInside: "avoid" }}>
//                       {allShort ? (
//                         <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 10px", alignItems: "baseline" }}>
//                           <span style={{ fontWeight: "700", flexShrink: 0 }}>{qNum}.</span>
//                           <span style={{ flex: "1 1 140px" }}>{item.text || `[Question ${qNum}]`}</span>
//                           {opts.map((opt, oi) => (
//                             <span key={oi} style={{ whiteSpace: "nowrap", flexShrink: 0 }}>({["a", "b", "c", "d"][oi]}) {opt || "—"}</span>
//                           ))}
//                         </div>
//                       ) : (
//                         <div>
//                           <div style={{ display: "flex", gap: "4px", marginBottom: "3px" }}>
//                             <span style={{ fontWeight: "700", flexShrink: 0 }}>{qNum}.</span>
//                             <span>{item.text || `[Question ${qNum}]`}</span>
//                           </div>
//                           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px 24px", paddingLeft: "16px", fontSize: "12px" }}>
//                             {opts.map((opt, oi) => (<span key={oi}>({["a", "b", "c", "d"][oi]}) {opt || "—"}</span>))}
//                           </div>
//                         </div>
//                       )}
//                       {imagesAfter.map(img => <PrintImage key={img.id} src={img.src} />)}
//                     </div>
//                   );
//                 })
//               )}
//             </section>

//             <hr style={{ borderTop: "1.5px solid #111", margin: "10px 0" }} />

//             {/* ── Section B ─────────────────────────────────────────── */}
//             <section>
//               <p style={{ fontSize: "12.5px", fontWeight: "700", textTransform: "uppercase", textAlign: "center", letterSpacing: "0.5px", marginBottom: "2px" }}>
//                 SECTION B — THEORY
//               </p>
//               <p style={{ fontSize: "11px", textAlign: "center", fontStyle: "italic", color: "#555", marginBottom: "10px" }}>
//                 Answer any THREE questions from this section.
//               </p>

//               {isPaste ? (
//                 <>{renderPasteWithImages(exam.pasteTheory, pasteTheoryImages)}</>
//               ) : (
//                 <ol style={{ listStyle: "decimal", paddingLeft: "18px" }}>
//                   {exam.theories.map((q, idx) => {
//                     const imagesAfter = (theoryImageCards || []).filter(img => img.afterIdx === idx);
//                     return (
//                       <li key={q.id} style={{ marginBottom: "10px", pageBreakInside: "avoid" }}>
//                         <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
//                           <span style={{ flex: 1 }}>{q.text || `[Question ${idx + 1}]`}</span>
//                           {q.marks && <span style={{ fontSize: "11.5px", color: "#555", whiteSpace: "nowrap", fontStyle: "italic" }}>({q.marks} marks)</span>}
//                         </div>
//                         {imagesAfter.map(img => <PrintImage key={img.id} src={img.src} />)}
//                       </li>
//                     );
//                   })}
//                 </ol>
//               )}
//             </section>

//             <div style={{ textAlign: "center", marginTop: "28px", fontSize: "11.5px", color: "#777", fontStyle: "italic", paddingTop: "10px", borderTop: "1px solid #ddd" }}>
//               — End of Examination —
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // ── Helpers ───────────────────────────────────────────────────────────────────

// // Renders a plain image block in the print layout
// function PrintImage({ src }) {
//   return (
//     <div style={{ margin: "6px 0 8px", paddingLeft: "0" }}>
//       <img src={src} alt="diagram" style={{ maxWidth: "60%", height: "auto", display: "block" }} />
//     </div>
//   );
// }

// // For paste mode: splits pasted text by question number and injects images after their question
// function renderPasteWithImages(pasteText, images) {
//   if (!images || images.length === 0) {
//     return (
//       <div style={{ fontSize: "12.5px", lineHeight: "1.8", whiteSpace: "pre-wrap", fontFamily: "'Times New Roman', Times, serif" }}>
//         {pasteText || ""}
//       </div>
//     );
//   }

//   // Split text into lines, find where each question starts
//   const lines = (pasteText || "").split("\n");
//   const questionLineRegex = /^\s*(\d+)[.)]\s/;
//   const result = [];
//   let currentQNum = null;
//   let buffer = [];

//   const flushBuffer = (qNum) => {
//     if (buffer.length === 0) return;
//     result.push(
//       <div key={`text-${qNum}-${result.length}`} style={{ fontSize: "12.5px", lineHeight: "1.8", whiteSpace: "pre-wrap", fontFamily: "'Times New Roman', Times, serif" }}>
//         {buffer.join("\n")}
//       </div>
//     );
//     // Inject images that go after this question number
//     const imgsAfter = (images || []).filter(img => Number(img.afterQuestion) === Number(qNum));
//     imgsAfter.forEach(img => {
//       result.push(<PrintImage key={img.id} src={img.src} />);
//     });
//     buffer = [];
//   };

//   lines.forEach((line, i) => {
//     const match = line.match(questionLineRegex);
//     if (match) {
//       flushBuffer(currentQNum);
//       currentQNum = Number(match[1]);
//     }
//     buffer.push(line);
//   });
//   flushBuffer(currentQNum);

//   return <>{result}</>;
// }


// src/components/SecondaryPaper/PreviewLayout.jsx
//
// Auto-shrinks font size to fit content within 2 A4 pages (front + back).
// Options always print inline: 1. question  (a) opt  (b) opt  (c) opt  (d) opt

import { useRef, useState, useLayoutEffect } from "react";
import SCHOOL from "../../constants/school";
import { formatPastedQuestions } from "../../utils/formatPaste";

const MAX_HEIGHT = 2 * 1123; // 2 A4 pages in px
const START_FONT = 13;       // start at 13px
const MIN_FONT = 7;          // never go below 7px
const STEP = 0.5;            // shrink by 0.5px each iteration

export default function SecondaryPreviewLayout({
  exam,
  objectiveImageCards,
  theoryImageCards,
  pasteObjectiveImages,
  pasteTheoryImages,
  onBack,
  onPrint
}) {
  const contentRef = useRef(null);
  const [fontSize, setFontSize] = useState(START_FONT);
  const [tooSmall, setTooSmall] = useState(false);

  // Auto-shrink: after every render, check height and shrink if needed
  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const height = contentRef.current.scrollHeight;
    if (height > MAX_HEIGHT && fontSize > MIN_FONT) {
      const next = Math.max(MIN_FONT, fontSize - STEP);
      setFontSize(next);
      setTooSmall(next <= 9);
    }
  }, [fontSize, exam]);

  const isPaste = exam.inputMode === "paste";
  let qNum = 0;

  return (
    <>
      <style>{`
      @media print {
  @page { size: A4; margin: 12mm 15mm; }
  body { background: white !important; overflow: visible !important; }
  .no-print { display: none !important; }
  * { overflow: visible !important; }
  .a4-paper {
    box-shadow: none !important;
    max-width: none !important;
    width: 100% !important;
    height: auto !important;
    min-height: unset !important;
    overflow: visible !important;
    padding: 0 !important;
    border-radius: 0 !important;
  }
}
      `}</style>

      <div className="min-h-screen bg-neutral-600">
        {/* Toolbar */}
        <div className="no-print sticky top-0 z-50 bg-stone-900 text-stone-100 flex items-center justify-between px-4 py-2.5 shadow-xl">
          <button onClick={onBack} className="text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition">← Back to Editor</button>
          <div className="flex flex-col items-center">
            <span className="font-serif text-base">Preview</span>
            <span className="text-[10px] text-stone-400">Font: {fontSize}px</span>
          </div>
          <button onClick={onPrint} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-900 hover:bg-amber-400 transition">🖨 Print / Save PDF</button>
        </div>

        {/* Warning if font got very small */}
        {tooSmall && (
          <div className="no-print bg-amber-500 text-stone-900 text-xs text-center py-2 px-4 font-semibold">
            ⚠️ Font shrunk to {fontSize}px to fit 2 pages — consider reducing the number of questions.
          </div>
        )}

        <div className="p-4 sm:p-8 flex justify-center">
          <div
            ref={contentRef}
            className="a4-paper bg-white w-full max-w-[1100px] p-4 shadow-2xl"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: `${fontSize}px`,
              color: "#111",
              lineHeight: "1.5",
            }}
          >
            {/* ── School Header ────────────────────────────────────── */}
            <div style={{ textAlign: "center", marginBottom: "8px" }}>
              <p style={{ fontSize: `${fontSize + 4}px`, fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>
                {SCHOOL.name}
              </p>
              <p style={{ fontSize: `${fontSize - 2}px`, color: "#555", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "2px" }}>
                {SCHOOL.motto}
              </p>
              <p style={{ fontSize: `${fontSize - 2}px`, color: "#666", marginBottom: "6px" }}>{SCHOOL.address}</p>
              <hr style={{ borderTop: "2.5px solid #111", margin: "4px 0 2px" }} />
              <hr style={{ borderTop: "1px solid #111", margin: "0 0 5px" }} />
              <p style={{ fontSize: `${fontSize}px`, fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {exam.term} Examination — {exam.session}
              </p>
            </div>

            {/* ── Exam Meta ────────────────────────────────────────── */}
            <table style={{ width: "100%", borderCollapse: "collapse", margin: "5px 0", fontSize: `${fontSize - 1}px` }}>
              <tbody>
                <tr>
                  <td style={{ padding: "1px 0", width: "50%" }}><strong>Subject:</strong> {exam.subject}</td>
                  <td style={{ padding: "1px 0" }}><strong>Class:</strong> {exam.classLevel}</td>
                </tr>
                <tr>
                  <td style={{ padding: "1px 0" }}><strong>Time Allowed:</strong> {exam.timeAllowed}</td>
                  <td style={{ padding: "1px 0" }}><strong>Date:</strong> ____________________</td>
                </tr>
              </tbody>
            </table>

            {/* ── Instructions ─────────────────────────────────────── */}
            {exam.instructions && (
              <div style={{ background: "#f8f8f8", border: "1px solid #ddd", padding: "3px 8px", fontSize: `${fontSize - 1}px`, margin: "5px 0", borderRadius: "2px" }}>
                <strong>Instructions:</strong> {exam.instructions}
              </div>
            )}

            <hr style={{ borderTop: "2px solid #111", margin: "6px 0" }} />

            {/* ── Section A ─────────────────────────────────────────── */}
            <section style={{ marginBottom: "8px" }}>
              <p style={{ fontSize: `${fontSize - 0.5}px`, fontWeight: "700", textTransform: "uppercase", textAlign: "center", letterSpacing: "0.5px", marginBottom: "1px" }}>
                SECTION A — OBJECTIVES
              </p>
              <p style={{ fontSize: `${fontSize - 2}px`, textAlign: "center", fontStyle: "italic", color: "#555", marginBottom: "6px" }}>
                Choose the correct answer from the options provided.
              </p>

              {isPaste ? (
                <>{renderPasteWithImages(exam.pasteObjectives, pasteObjectiveImages, fontSize)}</>
              ) : (
                exam.objectives.map((item, idx) => {
                  const imagesAfter = (objectiveImageCards || []).filter(img => img.afterIdx === idx);

                  if (item.type === "heading") {
                    return (
                      <div key={item.id}>
                        <div style={{ textAlign: "center", margin: "8px 0 3px" }}>
                          {item.title && <p style={{ fontSize: `${fontSize - 0.5}px`, fontStyle: "italic", fontWeight: "600" }}>{item.title}</p>}
                          {item.subtitle && <p style={{ fontSize: `${fontSize - 1}px`, fontStyle: "italic", color: "#333" }}>{item.subtitle}</p>}
                        </div>
                        {imagesAfter.map(img => <PrintImage key={img.id} src={img.src} />)}
                      </div>
                    );
                  }
                  if (item.type === "passage") {
                    return (
                      <div key={item.id}>
                        <div style={{ margin: "5px 0 6px", pageBreakInside: "avoid" }}>
                          {item.title && <p style={{ fontSize: `${fontSize - 0.5}px`, fontWeight: "700", textAlign: "center", textTransform: "uppercase", marginBottom: "3px" }}>{item.title}</p>}
                          <p style={{ fontSize: `${fontSize}px`, textAlign: "justify", lineHeight: "1.6" }}>{item.text}</p>
                        </div>
                        {imagesAfter.map(img => <PrintImage key={img.id} src={img.src} />)}
                      </div>
                    );
                  }

                  // ── Question: always inline ──────────────────────
                  qNum++;
                  const opts = item.options.filter(o => o && o.trim());
                  return (
                    <div key={item.id} style={{ marginBottom: "3px", pageBreakInside: "avoid", display: "flex", flexWrap: "wrap", gap: "2px 8px", alignItems: "baseline" }}>
                      <span style={{ fontWeight: "700", flexShrink: 0 }}>{qNum}.</span>
                      <span style={{ flex: "1 1 120px" }}>{item.text || `[Question ${qNum}]`}</span>
                      {opts.map((opt, oi) => (
                        <span key={oi} style={{ whiteSpace: "nowrap", flexShrink: 0 }}>
                          ({["a", "b", "c", "d"][oi]}) {opt}
                        </span>
                      ))}
                      {imagesAfter.map(img => <PrintImage key={img.id} src={img.src} />)}
                    </div>
                  );
                })
              )}
            </section>

            <hr style={{ borderTop: "1.5px solid #111", margin: "6px 0" }} />

            {/* ── Section B ─────────────────────────────────────────── */}
            <section>
              <p style={{ fontSize: `${fontSize - 0.5}px`, fontWeight: "700", textTransform: "uppercase", textAlign: "center", letterSpacing: "0.5px", marginBottom: "1px" }}>
                SECTION B — THEORY
              </p>
              <p style={{ fontSize: `${fontSize - 2}px`, textAlign: "center", fontStyle: "italic", color: "#555", marginBottom: "6px" }}>
                Answer any THREE questions from this section.
              </p>

              {isPaste ? (
                <>{renderPasteWithImages(exam.pasteTheory, pasteTheoryImages, fontSize)}</>
              ) : (
                <ol style={{ listStyle: "decimal", paddingLeft: "16px", margin: 0 }}>
                  {exam.theories.map((q, idx) => {
                    const imagesAfter = (theoryImageCards || []).filter(img => img.afterIdx === idx);
                    return (
                      <li key={q.id} style={{ marginBottom: "5px", pageBreakInside: "avoid" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                          <span style={{ flex: 1 }}>{q.text || `[Question ${idx + 1}]`}</span>
                          {q.marks && <span style={{ fontSize: `${fontSize - 1.5}px`, color: "#555", whiteSpace: "nowrap", fontStyle: "italic" }}>({q.marks} marks)</span>}
                        </div>
                        {imagesAfter.map(img => <PrintImage key={img.id} src={img.src} />)}
                      </li>
                    );
                  })}
                </ol>
              )}
            </section>

            {/* ── Footer ───────────────────────────────────────────── */}
            {/* <div style={{ textAlign: "center", marginTop: "16px", fontSize: `${fontSize - 1.5}px`, color: "#777", fontStyle: "italic", paddingTop: "8px", borderTop: "1px solid #ddd" }}>
              — End of Examination —
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function PrintImage({ src }) {
  return (
    <div style={{ margin: "4px 0 6px" }}>
      <img src={src} alt="diagram" style={{ maxWidth: "60%", height: "auto", display: "block" }} />
    </div>
  );
}

function renderPasteWithImages(pasteText, images, fontSize) {
  if (!images || images.length === 0) {
    return (
      <div style={{ fontSize: `${fontSize}px`, lineHeight: "1.6", whiteSpace: "pre-wrap", fontFamily: "'Times New Roman', Times, serif" }}>
       {formatPastedQuestions(pasteText || "")}
      </div>
    );
  }

 const lines = formatPastedQuestions(pasteText || "").split("\n");
  const questionLineRegex = /^\s*(\d+)[.)]\s/;
  const result = [];
  let currentQNum = null;
  let buffer = [];

  const flushBuffer = (qNum) => {
    if (buffer.length === 0) return;
    result.push(
      <div key={`text-${qNum}-${result.length}`} style={{ fontSize: `${fontSize}px`, lineHeight: "1.6", whiteSpace: "pre-wrap", fontFamily: "'Times New Roman', Times, serif" }}>
        {buffer.join("\n")}
      </div>
    );
    const imgsAfter = (images || []).filter(img => Number(img.afterQuestion) === Number(qNum));
    imgsAfter.forEach(img => result.push(<PrintImage key={img.id} src={img.src} />));
    buffer = [];
  };

  lines.forEach((line) => {
    const match = line.match(questionLineRegex);
    if (match) { flushBuffer(currentQNum); currentQNum = Number(match[1]); }
    buffer.push(line);
  });
  flushBuffer(currentQNum);

  return <>{result}</>;
}
