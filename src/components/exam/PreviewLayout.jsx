// src/components/preview/PreviewLayout.jsx
// Renders the A4-formatted exam paper preview + handles print layout.
// The <style> tag at the top injects @media print rules that Tailwind can't handle.
// Pure UI — no state, no logic.

import SCHOOL from "../../constants/School";

export default function PreviewLayout({ exam, onBack, onPrint }) {
  return (
    <>
      {/* ── Print-only CSS (Tailwind cannot do @page or @media print cleanly) ── */}
      <style>{`
        @media print {
          @page { size: A4; margin: 20mm; }
          body { background: white !important; }
          .no-print { display: none !important; }
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

        {/* ── Toolbar (hidden on print) ────────────────────────────────── */}
        <div className="no-print sticky top-0 z-50 bg-stone-900 text-stone-100 flex items-center justify-between px-4 py-2.5 shadow-xl">
          <button
            onClick={onBack}
            className="text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition"
          >
            ← Back to Editor
          </button>
          <span className="font-serif text-base">Preview</span>
          <button
            onClick={onPrint}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-900 hover:bg-amber-400 transition"
          >
            🖨 Print / Save PDF
          </button>
        </div>

        {/* ── A4 Paper ─────────────────────────────────────────────────── */}
        <div className="p-4 sm:p-8 flex justify-center">
          <div
            className="a4-paper bg-white w-full max-w-[794px] min-h-[1123px] p-12 shadow-2xl"
            style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: "13px", color: "#111", lineHeight: "1.5" }}
          >
            {/* School Header */}
            <div className="text-center mb-4">
              <p style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>
                {SCHOOL.name}
              </p>
              <p style={{ fontSize: "11px", color: "#555", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "3px" }}>
                {SCHOOL.motto}
              </p>
              <p style={{ fontSize: "11px", color: "#666", marginBottom: "10px" }}>
                {SCHOOL.address}
              </p>
              <hr style={{ borderTop: "2px solid #111", margin: "8px 0" }} />
              <p style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {exam.term} Examination — {exam.session}
              </p>
            </div>

            {/* Meta table */}
            <table style={{ width: "100%", borderCollapse: "collapse", margin: "10px 0", fontSize: "12.5px" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "3px 0", width: "50%" }}><strong>Subject:</strong> {exam.subject}</td>
                  <td style={{ padding: "3px 0", width: "50%" }}><strong>Class:</strong> {exam.classLevel}</td>
                </tr>
                <tr>
                  <td style={{ padding: "3px 0" }}><strong>Time Allowed:</strong> {exam.timeAllowed}</td>
                  <td style={{ padding: "3px 0" }}><strong>Date:</strong> ____________________</td>
                </tr>
              </tbody>
            </table>

            {/* Name & Score */}
            <div style={{ display: "flex", justifyContent: "space-between", margin: "8px 0", fontSize: "12.5px" }}>
              <span>Name: ____________________________________________</span>
              <span>Score: ___________</span>
            </div>

            {/* Instructions */}
            {exam.instructions && (
              <div style={{ background: "#f8f8f8", border: "1px solid #ddd", padding: "8px 12px", fontSize: "12px", margin: "8px 0", borderRadius: "3px" }}>
                <strong>Instructions:</strong> {exam.instructions}
              </div>
            )}

            <hr style={{ borderTop: "2px solid #111", margin: "10px 0" }} />

            {/* Section A */}
            {exam.objectives.length > 0 && (
              <section style={{ margin: "14px 0" }}>
                <p style={{ fontSize: "13px", fontWeight: "700", textTransform: "uppercase", textAlign: "center", letterSpacing: "0.5px", marginBottom: "4px" }}>
                  SECTION A — OBJECTIVES
                </p>
                <p style={{ fontSize: "11.5px", textAlign: "center", fontStyle: "italic", color: "#555", marginBottom: "10px" }}>
                  Choose the correct answer from the options provided.
                </p>
                <ol style={{ listStyle: "decimal", paddingLeft: "20px" }}>
                  {exam.objectives.map((q, idx) => (
                    <li key={q.id} style={{ marginBottom: "12px" }}>
                      <span style={{ display: "block", marginBottom: "4px", fontSize: "13px" }}>
                        {q.text || `[Question ${idx + 1}]`}
                      </span>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 16px", paddingLeft: "4px", fontSize: "12.5px" }}>
                        {q.options.map((opt, oi) => (
                          <span key={oi} style={{ display: "block" }}>
                            {["A", "B", "C", "D"][oi]}. {opt || "—"}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <hr style={{ borderTop: "1px solid #111", margin: "10px 0" }} />

            {/* Section B */}
            {exam.theories.length > 0 && (
              <section style={{ margin: "14px 0" }}>
                <p style={{ fontSize: "13px", fontWeight: "700", textTransform: "uppercase", textAlign: "center", letterSpacing: "0.5px", marginBottom: "4px" }}>
                  SECTION B — THEORY
                </p>
                <p style={{ fontSize: "11.5px", textAlign: "center", fontStyle: "italic", color: "#555", marginBottom: "10px" }}>
                  Answer any THREE questions from this section.
                </p>
                <ol style={{ listStyle: "decimal", paddingLeft: "20px" }}>
                  {exam.theories.map((q, idx) => (
                    <li key={q.id} style={{ marginBottom: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginBottom: "8px" }}>
                        <span style={{ flex: 1, fontSize: "13px" }}>{q.text || `[Question ${idx + 1}]`}</span>
                        {q.marks && (
                          <span style={{ fontSize: "12px", color: "#555", whiteSpace: "nowrap", fontStyle: "italic" }}>
                            ({q.marks} marks)
                          </span>
                        )}
                      </div>
                      {/* Answer lines */}
                      {[...Array(5)].map((_, i) => (
                        <div key={i} style={{ borderBottom: "1px solid #bbb", marginBottom: "10px", height: "10px" }} />
                      ))}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Footer */}
            <div style={{ textAlign: "center", marginTop: "32px", fontSize: "12px", color: "#777", fontStyle: "italic", paddingTop: "12px", borderTop: "1px solid #ddd" }}>
              — End of Examination —
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
