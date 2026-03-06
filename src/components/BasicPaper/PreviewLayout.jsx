

// import SCHOOL from "../../constants/School";

// export default function PrimaryPreviewLayout({ exam, onBack, onPrint }) {
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
//           <button onClick={onBack} className="text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition">
//             ← Back to Editor
//           </button>
//           <span className="font-serif text-base">Preview</span>
//           <button onClick={onPrint} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-900 hover:bg-amber-400 transition">
//             🖨 Print / Save PDF
//           </button>
//         </div>

//         <div className="p-4 sm:p-8 flex justify-center">
//           <div
//             className="a4-paper bg-white w-full max-w-[794px] min-h-[1123px] p-12 shadow-2xl"
//             style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: "13px", color: "#111", lineHeight: "1.6" }}
//           >
//             {/* School Header */}
//             <div style={{ textAlign: "center", marginBottom: "10px" }}>
//               <p style={{ fontSize: "17px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>
//                 {SCHOOL.primaryName}
//               </p>
//               <p style={{ fontSize: "10.5px", color: "#555", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "2px" }}>
//                 {SCHOOL.motto}
//               </p>
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
//                 <tr>
//                   <td style={{ padding: "2px 0" }}><strong>Name:</strong> ____________________________</td>
//                   <td style={{ padding: "2px 0" }}><strong>Score:</strong> ____________</td>
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
//                 // ── Paste mode: render as-is ─────────────────────────
//                 <div style={{ fontSize: "12.5px", lineHeight: "1.8", whiteSpace: "pre-wrap", fontFamily: "'Times New Roman', Times, serif" }}>
//                   {exam.pasteObjectives || ""}
//                 </div>
//               ) : (
//                 // ── Build mode: render cards ─────────────────────────
//                 exam.objectives.map((item) => {
//                   if (item.type === "heading") {
//                     return (
//                       <div key={item.id} style={{ textAlign: "center", margin: "14px 0 4px" }}>
//                         {item.title && <p style={{ fontSize: "12.5px", fontStyle: "italic", fontWeight: "600" }}>{item.title}</p>}
//                         {item.subtitle && <p style={{ fontSize: "11.5px", fontStyle: "italic", color: "#333" }}>{item.subtitle}</p>}
//                       </div>
//                     );
//                   }
//                   if (item.type === "passage") {
//                     return (
//                       <div key={item.id} style={{ margin: "8px 0 10px", pageBreakInside: "avoid" }}>
//                         {item.title && (
//                           <p style={{ fontSize: "12.5px", fontWeight: "700", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "5px" }}>
//                             {item.title}
//                           </p>
//                         )}
//                         <p style={{ fontSize: "12.5px", textAlign: "justify", lineHeight: "1.7" }}>{item.text}</p>
//                       </div>
//                     );
//                   }
//                   qNum++;
//                   return (
//                     <div key={item.id} style={{ marginBottom: "8px", pageBreakInside: "avoid" }}>
//                       <div style={{ display: "flex", gap: "4px", alignItems: "baseline" }}>
//                         <span style={{ fontWeight: "700", flexShrink: 0 }}>{qNum}.</span>
//                         <span style={{ flex: 1 }}>
//                           {item.text || `[Question ${qNum}]`}&nbsp;
//                           <span style={{ letterSpacing: "2px" }}>__________</span>
//                         </span>
//                       </div>
//                       <div style={{ paddingLeft: "18px", fontSize: "12px", marginTop: "2px", display: "flex", gap: "18px", flexWrap: "wrap" }}>
//                         {item.options.map((opt, oi) => (
//                           <span key={oi} style={{ whiteSpace: "nowrap" }}>
//                             {["A", "B", "C", "D"][oi]}. {opt || "—"}
//                           </span>
//                         ))}
//                       </div>
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
//                 // ── Paste mode: render as-is ─────────────────────────
//                 <div style={{ fontSize: "12.5px", lineHeight: "1.8", whiteSpace: "pre-wrap", fontFamily: "'Times New Roman', Times, serif" }}>
//                   {exam.pasteTheory || ""}
//                 </div>
//               ) : (
//                 // ── Build mode: render cards ─────────────────────────
//                 <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
//                   {exam.theories.map((q, idx) => (
//                     <li key={q.id} style={{ marginBottom: "14px", pageBreakInside: "avoid" }}>
//                       {q.blankPosition === "before" ? (
//                         <>
//                           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "3px" }}>
//                             <span>
//                               <strong>{idx + 1}.</strong>&nbsp;
//                               <span style={{ letterSpacing: "2px" }}>________________________________________________</span>
//                             </span>
//                             {q.marks && <span style={{ fontSize: "11.5px", color: "#555", whiteSpace: "nowrap", fontStyle: "italic" }}>({q.marks} marks)</span>}
//                           </div>
//                           <div style={{ paddingLeft: "18px", fontSize: "12.5px" }}>{q.text || `[Question ${idx + 1}]`}</div>
//                         </>
//                       ) : (
//                         <>
//                           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "3px" }}>
//                             <span style={{ flex: 1 }}><strong>{idx + 1}.</strong>&nbsp;{q.text || `[Question ${idx + 1}]`}</span>
//                             {q.marks && <span style={{ fontSize: "11.5px", color: "#555", whiteSpace: "nowrap", fontStyle: "italic" }}>({q.marks} marks)</span>}
//                           </div>
//                           <div style={{ paddingLeft: "18px", letterSpacing: "2px", fontSize: "12.5px" }}>
//                             ________________________________________________
//                           </div>
//                         </>
//                       )}
//                     </li>
//                   ))}
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


// src/components/BasicPaper/PreviewLayout.jsx

import SCHOOL from "../../constants/School";
import { formatPastedQuestionsPrimary } from "../../utils/formatPaste";
export default function PrimaryPreviewLayout({
  exam,
  objectiveImageCards,
  theoryImageCards,
  pasteObjectiveImages,
  pasteTheoryImages,
  onBack,
  onPrint
}) {
  let qNum = 0;
  const isPaste = exam.inputMode === "paste";

  return (
    <>
      <style>{`
       @media print {
  @page { size: A4; margin: 4mm  4mm; }
  body { background: white !important; overflow: visible !important; }
  .no-print { display: none !important; }
  * { overflow: visible !important;  padding: 0 !important; margin: 0 !important; }
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
        <div className="no-print sticky top-0 z-50 bg-stone-900 text-stone-100 flex items-center justify-between px-4 py-2.5 shadow-xl">
          <button onClick={onBack} className="text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition">← Back to Editor</button>
          <span className="font-serif text-base">Preview</span>
          <button onClick={onPrint} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-900 hover:bg-amber-400 transition">🖨 Print / Save PDF</button>
        </div>

        <div className="p-4 sm:p-8 flex justify-center">
          <div
            className="a4-paper bg-white w-full max-w-[1100px] min-h-[1123px] p-2 shadow-2xl"
            style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: "16px", color: "#111", lineHeight: "1.6" }}
          >
            {/* School Header */}
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <p style={{ fontSize: "17px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>{SCHOOL.primaryName}</p>
              <p style={{ fontSize: "10.5px", color: "#555", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "2px" }}>{SCHOOL.motto}</p>
              <p style={{ fontSize: "10.5px", color: "#666", marginBottom: "8px" }}>{SCHOOL.address}</p>
              <hr style={{ borderTop: "2.5px solid #111", margin: "5px 0 3px" }} />
              <hr style={{ borderTop: "1px solid #111", margin: "0 0 7px" }} />
              <p style={{ fontSize: "13px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {exam.term} Examination — {exam.session}
              </p>
            </div>

            {/* Exam Meta */}
            <table style={{ width: "100%", borderCollapse: "collapse", margin: "7px 0", fontSize: "12px" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "2px 0", width: "50%" }}><strong>Subject:</strong> {exam.subject}</td>
                  <td style={{ padding: "2px 0" }}><strong>Class:</strong> {exam.classLevel}</td>
                </tr>
                <tr>
                  <td style={{ padding: "2px 0" }}><strong>Time Allowed:</strong> {exam.timeAllowed}</td>
                  <td style={{ padding: "2px 0" }}><strong>Date:</strong> ____________________</td>
                </tr>
                <tr>
                  <td style={{ padding: "2px 0" }} colSpan={2}><strong>Name:</strong> ___________________________________________________________________</td>
                </tr>
              </tbody>
            </table>

            {exam.instructions && (
              <div style={{ background: "#f8f8f8", border: "1px solid #ddd", padding: "5px 10px", fontSize: "11.5px", margin: "7px 0", borderRadius: "2px" }}>
                <strong>Instructions:</strong> {exam.instructions}
              </div>
            )}

            <hr style={{ borderTop: "2px solid #111", margin: "9px 0" }} />

            {/* ── Section A ─────────────────────────────────────────── */}
            <section style={{ marginBottom: "12px" }}>
              <p style={{ fontSize: "12.5px", fontWeight: "700", textTransform: "uppercase", textAlign: "center", letterSpacing: "0.5px", marginBottom: "2px" }}>
                SECTION A — OBJECTIVES
              </p>
              <p style={{ fontSize: "11px", textAlign: "center", fontStyle: "italic", color: "#555", marginBottom: "10px" }}>
                Choose the correct answer from the options provided.
              </p>

              {isPaste ? (
                <>{renderPasteWithImages(exam.pasteObjectives, pasteObjectiveImages)}</>
              ) : (
                exam.objectives.map((item, idx) => {
                  const imagesAfter = (objectiveImageCards || []).filter(img => img.afterIdx === idx);

                  if (item.type === "heading") {
                    return (
                      <div key={item.id}>
                        <div style={{ textAlign: "center", margin: "14px 0 4px" }}>
                          {item.title && <p style={{ fontSize: "12.5px", fontStyle: "italic", fontWeight: "600" }}>{item.title}</p>}
                          {item.subtitle && <p style={{ fontSize: "11.5px", fontStyle: "italic", color: "#333" }}>{item.subtitle}</p>}
                        </div>
                        {imagesAfter.map(img => <PrintImage key={img.id} src={img.src} />)}
                      </div>
                    );
                  }
                  if (item.type === "passage") {
                    return (
                      <div key={item.id}>
                        <div style={{ margin: "8px 0 10px", pageBreakInside: "avoid" }}>
                          {item.title && <p style={{ fontSize: "12.5px", fontWeight: "700", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "5px" }}>{item.title}</p>}
                          <p style={{ fontSize: "12.5px", textAlign: "justify", lineHeight: "1.7" }}>{item.text}</p>
                        </div>
                        {imagesAfter.map(img => <PrintImage key={img.id} src={img.src} />)}
                      </div>
                    );
                  }

                  qNum++;
                  return (
                    <div key={item.id} style={{ marginBottom: "8px", pageBreakInside: "avoid" }}>
                      <div style={{ display: "flex", gap: "4px", alignItems: "baseline" }}>
                        <span style={{ fontWeight: "700", flexShrink: 0 }}>{qNum}.</span>
                        <span style={{ flex: 1 }}>
                          {item.text || `[Question ${qNum}]`}&nbsp;
                          <span style={{ letterSpacing: "2px" }}>__________</span>
                        </span>
                      </div>
                      <div style={{ paddingLeft: "18px", fontSize: "12px", marginTop: "2px", display: "flex", gap: "18px", flexWrap: "wrap" }}>
                        {item.options.map((opt, oi) => (
                          <span key={oi} style={{ whiteSpace: "nowrap" }}>{["A", "B", "C", "D"][oi]}. {opt || "—"}</span>
                        ))}
                      </div>
                      {imagesAfter.map(img => <PrintImage key={img.id} src={img.src} />)}
                    </div>
                  );
                })
              )}
            </section>

            <hr style={{ borderTop: "1.5px solid #111", margin: "10px 0" }} />

            {/* ── Section B ─────────────────────────────────────────── */}
            <section>
              <p style={{ fontSize: "12.5px", fontWeight: "700", textTransform: "uppercase", textAlign: "center", letterSpacing: "0.5px", marginBottom: "2px" }}>
                SECTION B — THEORY
              </p>
              <p style={{ fontSize: "11px", textAlign: "center", fontStyle: "italic", color: "#555", marginBottom: "10px" }}>
                Answer any THREE questions from this section.
              </p>

              {isPaste ? (
                <>{renderPasteWithImages(exam.pasteTheory, pasteTheoryImages)}</>
              ) : (
                <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {exam.theories.map((q, idx) => {
                    const imagesAfter = (theoryImageCards || []).filter(img => img.afterIdx === idx);
                    return (
                      <li key={q.id} style={{ marginBottom: "14px", pageBreakInside: "avoid" }}>
                        {q.blankPosition === "before" ? (
                          <>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "3px" }}>
                              <span><strong>{idx + 1}.</strong>&nbsp;<span style={{ letterSpacing: "2px" }}>________________________________________________</span></span>
                              {q.marks && <span style={{ fontSize: "11.5px", color: "#555", whiteSpace: "nowrap", fontStyle: "italic" }}>({q.marks} marks)</span>}
                            </div>
                            <div style={{ paddingLeft: "18px", fontSize: "12.5px" }}>{q.text || `[Question ${idx + 1}]`}</div>
                          </>
                        ) : (
                          <>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "3px" }}>
                              <span style={{ flex: 1 }}><strong>{idx + 1}.</strong>&nbsp;{q.text || `[Question ${idx + 1}]`}</span>
                              {q.marks && <span style={{ fontSize: "11.5px", color: "#555", whiteSpace: "nowrap", fontStyle: "italic" }}>({q.marks} marks)</span>}
                            </div>
                            <div style={{ paddingLeft: "18px", letterSpacing: "2px", fontSize: "12.5px" }}>________________________________________________</div>
                          </>
                        )}
                        {imagesAfter.map(img => <PrintImage key={img.id} src={img.src} />)}
                      </li>
                    );
                  })}
                </ol>
              )}
            </section>

            {/* <div style={{ textAlign: "center", marginTop: "28px", fontSize: "11.5px", color: "#777", fontStyle: "italic", paddingTop: "10px", borderTop: "1px solid #ddd" }}>
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
    <div style={{ margin: "6px 0 8px" }}>
      <img src={src} alt="diagram" style={{ maxWidth: "60%", height: "auto", display: "block" }} />
    </div>
  );
}
function renderPasteWithImages(pasteText, images) {
  if (!images || images.length === 0) {
    return (
      <div style={{ fontSize: "15px", lineHeight: "1.8", whiteSpace: "pre-wrap", fontFamily: "'Times New Roman', Times, serif" }}>
        {formatPastedQuestionsPrimary(pasteText || "")}
      </div>
    );
  }

  const lines = formatPastedQuestionsPrimary(pasteText || "").split("\n");
  const questionLineRegex = /^\s*(\d+)[.)]\s/;
  const result = [];
  let currentQNum = null;
  let buffer = [];

  const flushBuffer = (qNum) => {
    if (buffer.length === 0) return;
    result.push(
      <div key={`text-${qNum}-${result.length}`} style={{ fontSize: "15px", lineHeight: "1.8", whiteSpace: "pre-wrap", fontFamily: "'Times New Roman', Times, serif" }}>
        {buffer.join("\n")}
      </div>
    );
    const imgsAfter = (images || []).filter(img => Number(img.afterQuestion) === Number(qNum));
    imgsAfter.forEach(img => {
      result.push(<PrintImage key={img.id} src={img.src} />);
    });
    buffer = [];
  };

  lines.forEach((line) => {
    const match = line.match(questionLineRegex);
    if (match) {
      flushBuffer(currentQNum);
      currentQNum = Number(match[1]);
    }
    buffer.push(line);
  });
  flushBuffer(currentQNum);

  return <>{result}</>;
}

