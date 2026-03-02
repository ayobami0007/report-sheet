// // src/components/secondary/PreviewLayout.jsx

// import SCHOOL from "../../constants/school";

// export default function SecondaryPreviewLayout({ exam, onBack, onPrint }) {
//   let qNum = 0;

//   return (
//     <>
//       <style>{`
//         @media print {
//           @page { size: A4; margin: 18mm 20mm; }
//           body { background: white !important; }
//           .no-print { display: none !important; }
//             * { page-break-inside: avoid; }
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
//                 {SCHOOL.name}
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
//               </tbody>
//             </table>

//             {exam.instructions && (
//               <div style={{ background: "#f8f8f8", border: "1px solid #ddd", padding: "5px 10px", fontSize: "11.5px", margin: "7px 0", borderRadius: "2px" }}>
//                 <strong>Instructions:</strong> {exam.instructions}
//               </div>
//             )}

//             <hr style={{ borderTop: "2px solid #111", margin: "9px 0" }} />

//             {/* Section A */}
//             {exam.objectives.length > 0 && (
//               <section style={{ marginBottom: "12px" }}>
//                 <p style={{ fontSize: "12.5px", fontWeight: "700", textTransform: "uppercase", textAlign: "center", letterSpacing: "0.5px", marginBottom: "2px" }}>
//                   SECTION A — OBJECTIVES
//                 </p>
//                 <p style={{ fontSize: "11px", textAlign: "center", fontStyle: "italic", color: "#555", marginBottom: "10px" }}>
//                   Choose the correct answer from the options provided.
//                 </p>

//                 {exam.objectives.map((item) => {
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
//                   const opts = item.options;
//                   const allShort = opts.every(o => (o || "").length <= 20);

//                   return (
//                     <div key={item.id} style={{ marginBottom: "6px", pageBreakInside: "avoid" }}>
//                       {allShort ? (
//                         <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 10px", alignItems: "baseline" }}>
//                           <span style={{ fontWeight: "700", flexShrink: 0 }}>{qNum}.</span>
//                           <span style={{ flex: "1 1 140px" }}>{item.text || `[Question ${qNum}]`}</span>
//                           {opts.map((opt, oi) => (
//                             <span key={oi} style={{ whiteSpace: "nowrap", flexShrink: 0 }}>
//                               ({["a", "b", "c", "d"][oi]}) {opt || "—"}
//                             </span>
//                           ))}
//                         </div>
//                       ) : (
//                         <div>
//                           <div style={{ display: "flex", gap: "4px", marginBottom: "3px" }}>
//                             <span style={{ fontWeight: "700", flexShrink: 0 }}>{qNum}.</span>
//                             <span>{item.text || `[Question ${qNum}]`}</span>
//                           </div>
//                           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px 24px", paddingLeft: "16px", fontSize: "12px" }}>
//                             {opts.map((opt, oi) => (
//                               <span key={oi}>({["a", "b", "c", "d"][oi]}) {opt || "—"}</span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </section>
//             )}

//             <hr style={{ borderTop: "1.5px solid #111", margin: "10px 0" }} />

//             {/* Section B */}
//             {exam.theories.length > 0 && (
//               <section>
//                 <p style={{ fontSize: "12.5px", fontWeight: "700", textTransform: "uppercase", textAlign: "center", letterSpacing: "0.5px", marginBottom: "2px" }}>
//                   SECTION B — THEORY
//                 </p>
//                 <p style={{ fontSize: "11px", textAlign: "center", fontStyle: "italic", color: "#555", marginBottom: "10px" }}>
//                   Answer any THREE questions from this section.
//                 </p>
//                 <ol style={{ listStyle: "decimal", paddingLeft: "18px" }}>
//                   {exam.theories.map((q, idx) => (
//                     <li key={q.id} style={{ marginBottom: "10px", pageBreakInside: "avoid" }}>
//                       <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
//                         <span style={{ flex: 1 }}>{q.text || `[Question ${idx + 1}]`}</span>
//                         {q.marks && (
//                           <span style={{ fontSize: "11.5px", color: "#555", whiteSpace: "nowrap", fontStyle: "italic" }}>
//                             ({q.marks} marks)
//                           </span>
//                         )}
//                       </div>
//                     </li>
//                   ))}
//                 </ol>
//               </section>
//             )}

//             <div style={{ textAlign: "center", marginTop: "28px", fontSize: "11.5px", color: "#777", fontStyle: "italic", paddingTop: "10px", borderTop: "1px solid #ddd" }}>
//               — End of Examination —
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


// src/components/SecondaryPaper/PreviewLayout.jsx

import SCHOOL from "../../constants/School";

export default function SecondaryPreviewLayout({ exam, onBack, onPrint }) {
  let qNum = 0;
  const isPaste = exam.inputMode === "paste";

  return (
    <>
      <style>{`
        @media print {
          @page { size: A4; margin: 18mm 20mm; }
          body { background: white !important; }
          .no-print { display: none !important; }
          * { page-break-inside: avoid; }
          .a4-paper {
            box-shadow: none !important;
            max-width: none !important;
            width: 100% !important;
            min-height: unset !important;
            padding: 0 !important;
            border-radius: 0 !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-neutral-600">
        <div className="no-print sticky top-0 z-50 bg-stone-900 text-stone-100 flex items-center justify-between px-4 py-2.5 shadow-xl">
          <button onClick={onBack} className="text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition">
            ← Back to Editor
          </button>
          <span className="font-serif text-base">Preview</span>
          <button onClick={onPrint} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-900 hover:bg-amber-400 transition">
            🖨 Print / Save PDF
          </button>
        </div>

        <div className="p-4 sm:p-8 flex justify-center">
          <div
            className="a4-paper bg-white w-full max-w-[794px] min-h-[1123px] p-12 shadow-2xl"
            style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: "13px", color: "#111", lineHeight: "1.6" }}
          >
            {/* School Header */}
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <p style={{ fontSize: "17px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>
                {SCHOOL.name}
              </p>
              <p style={{ fontSize: "10.5px", color: "#555", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "2px" }}>
                {SCHOOL.motto}
              </p>
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
                // ── Paste mode: render as-is ─────────────────────────
                <div style={{ fontSize: "12.5px", lineHeight: "1.8", whiteSpace: "pre-wrap", fontFamily: "'Times New Roman', Times, serif" }}>
                  {exam.pasteObjectives || ""}
                </div>
              ) : (
                // ── Build mode: render cards ─────────────────────────
                exam.objectives.map((item) => {
                  if (item.type === "heading") {
                    return (
                      <div key={item.id} style={{ textAlign: "center", margin: "14px 0 4px" }}>
                        {item.title && <p style={{ fontSize: "12.5px", fontStyle: "italic", fontWeight: "600" }}>{item.title}</p>}
                        {item.subtitle && <p style={{ fontSize: "11.5px", fontStyle: "italic", color: "#333" }}>{item.subtitle}</p>}
                      </div>
                    );
                  }
                  if (item.type === "passage") {
                    return (
                      <div key={item.id} style={{ margin: "8px 0 10px", pageBreakInside: "avoid" }}>
                        {item.title && (
                          <p style={{ fontSize: "12.5px", fontWeight: "700", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "5px" }}>
                            {item.title}
                          </p>
                        )}
                        <p style={{ fontSize: "12.5px", textAlign: "justify", lineHeight: "1.7" }}>{item.text}</p>
                      </div>
                    );
                  }
                  qNum++;
                  const opts = item.options;
                  const allShort = opts.every(o => (o || "").length <= 20);
                  return (
                    <div key={item.id} style={{ marginBottom: "6px", pageBreakInside: "avoid" }}>
                      {allShort ? (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 10px", alignItems: "baseline" }}>
                          <span style={{ fontWeight: "700", flexShrink: 0 }}>{qNum}.</span>
                          <span style={{ flex: "1 1 140px" }}>{item.text || `[Question ${qNum}]`}</span>
                          {opts.map((opt, oi) => (
                            <span key={oi} style={{ whiteSpace: "nowrap", flexShrink: 0 }}>
                              ({["a", "b", "c", "d"][oi]}) {opt || "—"}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <div style={{ display: "flex", gap: "4px", marginBottom: "3px" }}>
                            <span style={{ fontWeight: "700", flexShrink: 0 }}>{qNum}.</span>
                            <span>{item.text || `[Question ${qNum}]`}</span>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px 24px", paddingLeft: "16px", fontSize: "12px" }}>
                            {opts.map((opt, oi) => (
                              <span key={oi}>({["a", "b", "c", "d"][oi]}) {opt || "—"}</span>
                            ))}
                          </div>
                        </div>
                      )}
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
                // ── Paste mode: render as-is ─────────────────────────
                <div style={{ fontSize: "12.5px", lineHeight: "1.8", whiteSpace: "pre-wrap", fontFamily: "'Times New Roman', Times, serif" }}>
                  {exam.pasteTheory || ""}
                </div>
              ) : (
                // ── Build mode: render cards ─────────────────────────
                <ol style={{ listStyle: "decimal", paddingLeft: "18px" }}>
                  {exam.theories.map((q, idx) => (
                    <li key={q.id} style={{ marginBottom: "10px", pageBreakInside: "avoid" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                        <span style={{ flex: 1 }}>{q.text || `[Question ${idx + 1}]`}</span>
                        {q.marks && (
                          <span style={{ fontSize: "11.5px", color: "#555", whiteSpace: "nowrap", fontStyle: "italic" }}>
                            ({q.marks} marks)
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </section>

            <div style={{ textAlign: "center", marginTop: "28px", fontSize: "11.5px", color: "#777", fontStyle: "italic", paddingTop: "10px", borderTop: "1px solid #ddd" }}>
              — End of Examination —
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
