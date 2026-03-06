


// // src/components/exam/BuilderLayout.jsx

// import { inputClass } from "../../constants/Inputclass";
// import Field from "./Field";
// import { formatPastedQuestions } from "../../utils/formatPaste";

// export default function BuilderLayout({
//   schoolName,
//   schoolMotto,
//   schoolAddress,
//   classPlaceholder,
//   exam,
//   hasDraft,
//   updateField,
//   setInputMode,
//   addObjective,
//   addSectionHeading,
//   addPassage,
//   removeObjective,
//   updateObjective,
//   updateObjectiveOption,
//   addTheory,
//   removeTheory,
//   updateTheory,
//   ObjectiveSectionComponent,
//   TheorySectionComponent,
//   onPreview,
//   onReset,
// }) {
//   const questionCount = exam.objectives.filter(o => o.type === "question").length;
//   const isPaste = exam.inputMode === "paste";

//   return (
//     <div className="flex flex-col min-h-screen bg-stone-100">

//       {/* ── Sticky Header ─────────────────────────────────────────────── */}
//       <header className="sticky top-0 z-50 bg-stone-900 text-stone-100 h-14 flex items-center px-4 shadow-lg print:hidden">
//         <div className="w-full max-w-2xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <span className="text-lg">📝</span>
//             <span className="font-serif text-lg tracking-wide">Exam Builder</span>
//           </div>
//           <div className="flex items-center gap-2">
//             {hasDraft && (
//               <span className="text-[11px] text-green-400 bg-green-400/10 px-2.5 py-0.5 rounded-full">
//                 ● Draft saved
//               </span>
//             )}
//             <button
//               onClick={onReset}
//               className="text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition"
//             >
//               Reset
//             </button>
//             <button
//               onClick={onPreview}
//               className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-900 hover:bg-amber-400 transition"
//             >
//               Preview →
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="w-full max-w-2xl mx-auto px-4 py-4 pb-20 flex flex-col gap-4">

//         {/* ── School Banner ──────────────────────────────────────────── */}
//         <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 text-center">
//           <p className="font-serif text-xl mb-1">{schoolName}</p>
//           <p className="text-xs tracking-widest text-amber-300 uppercase mb-1">{schoolMotto}</p>
//           <p className="text-xs text-stone-400">{schoolAddress}</p>
//         </div>

//         {/* ── Exam Details ───────────────────────────────────────────── */}
//         <section className="bg-white rounded-2xl p-5 shadow-sm">
//           <h2 className="font-serif text-xl mb-4 text-stone-800">Exam Details</h2>
//           <div className="grid grid-cols-2 gap-3 mb-3 max-[400px]:grid-cols-1">
//             <Field label="Subject" required>
//               <input
//                 className={inputClass}
//                 value={exam.subject}
//                 onChange={e => updateField("subject", e.target.value)}
//                 placeholder="e.g. Mathematics"
//               />
//             </Field>
//             <Field label="Class" required>
//               <input
//                 className={inputClass}
//                 value={exam.classLevel}
//                 onChange={e => updateField("classLevel", e.target.value)}
//                 placeholder={classPlaceholder}
//               />
//             </Field>
//             <Field label="Term" required>
//               <select
//                 className={inputClass}
//                 value={exam.term}
//                 onChange={e => updateField("term", e.target.value)}
//               >
//                 <option value="">Select term</option>
//                 <option>First Term</option>
//                 <option>Second Term</option>
//                 <option>Third Term</option>
//               </select>
//             </Field>
//             <Field label="Session" required>
//               <input
//                 className={inputClass}
//                 value={exam.session}
//                 onChange={e => updateField("session", e.target.value)}
//                 placeholder="e.g. 2024/2025"
//               />
//             </Field>
//             <Field label="Time Allowed" required>
//               <input
//                 className={inputClass}
//                 value={exam.timeAllowed}
//                 onChange={e => updateField("timeAllowed", e.target.value)}
//                 placeholder="e.g. 2 Hours"
//               />
//             </Field>
//           </div>
//           <Field label="Instructions to Students">
//             <textarea
//               className={`${inputClass} resize-y`}
//               value={exam.instructions}
//               onChange={e => updateField("instructions", e.target.value)}
//               rows={2}
//             />
//           </Field>
//         </section>

//         {/* ── Input Mode Toggle ──────────────────────────────────────── */}
//         <div className="bg-white rounded-2xl p-2 shadow-sm flex gap-2">
//           <button
//             onClick={() => setInputMode("build")}
//             className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition
//               ${!isPaste
//                 ? "bg-stone-900 text-white"
//                 : "text-stone-500 hover:bg-stone-50"
//               }`}
//           >
//             ✏️ Build Mode
//           </button>
//           <button
//             onClick={() => setInputMode("paste")}
//             className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition
//               ${isPaste
//                 ? "bg-stone-900 text-white"
//                 : "text-stone-500 hover:bg-stone-50"
//               }`}
//           >
//             📋 Paste Mode
//           </button>
//         </div>

//         {isPaste ? (
//           <>
//             {/* ── Paste Mode ──────────────────────────────────────────── */}
//             <section className="bg-white rounded-2xl p-5 shadow-sm">
//               <h2 className="font-serif text-xl mb-1 text-stone-800">Section A — Objectives</h2>
//               <p className="text-xs text-gray-400 mb-3">Paste all your objective questions here exactly as they are.</p>
//               <textarea
//                 className={`${inputClass} resize-y w-full`}
//                 value={exam.pasteObjectives}
//                 onChange={e => updateField("pasteObjectives", formatPastedQuestions(e.target.value))}
//                 placeholder={`1. What is 2 + 2?\nA) 1  B) 4  C) 6\n\n2. What is 5 x 3?\nA) 10  B) 15  C) 20`}
//                 rows={12}
//               />
//             </section>

//             <section className="bg-white rounded-2xl p-5 shadow-sm">
//               <h2 className="font-serif text-xl mb-1 text-stone-800">Section B — Theory</h2>
//               <p className="text-xs text-gray-400 mb-3">Paste all your theory questions here exactly as they are.</p>
//               <textarea
//                 className={`${inputClass} resize-y w-full`}
//                 value={exam.pasteTheory}
//                 onChange={e => updateField("pasteTheory", e.target.value)}
//                 placeholder={`1. What is Air? ___\n2. Mention 3 sources of water\n1) __\n2) __\n3) __`}
//                 rows={10}
//               />
//             </section>
//           </>
//         ) : (
//           <>
//             {/* ── Build Mode: Objectives ─────────────────────────────── */}
//             <section className="bg-white rounded-2xl p-5 shadow-sm">
//               <div className="flex items-start justify-between mb-1">
//                 <div>
//                   <h2 className="font-serif text-xl text-stone-800">Section A — Objectives</h2>
//                   <p className="text-xs text-gray-400 mt-0.5">
//                     {questionCount} question{questionCount !== 1 ? "s" : ""}
//                   </p>
//                 </div>
//                 <div className="flex gap-1.5 shrink-0 flex-wrap justify-end">
//                   <button
//                     onClick={addSectionHeading}
//                     className="text-xs font-bold px-2.5 py-2 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 transition whitespace-nowrap"
//                   >
//                     + Heading
//                   </button>
//                   <button
//                     onClick={addPassage}
//                     className="text-xs font-bold px-2.5 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition whitespace-nowrap"
//                   >
//                     + Passage
//                   </button>
//                   <button
//                     onClick={addObjective}
//                     className="text-xs font-bold px-2.5 py-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition whitespace-nowrap"
//                   >
//                     + Question
//                   </button>
//                 </div>
//               </div>

//               <p className="text-[11px] text-gray-300 mb-4">
//                 Tip: Add a <span className="font-semibold text-stone-400">Heading</span> → then a{" "}
//                 <span className="font-semibold text-blue-400">Passage</span> → then your{" "}
//                 <span className="font-semibold text-amber-500">Questions</span> to create a comprehension section.
//               </p>

//               <div className="flex flex-col gap-3">
//                 {exam.objectives.map((q, idx) => (
//                   <ObjectiveSectionComponent
//                     key={q.id}
//                     q={q}
//                     idx={idx}
//                     allItems={exam.objectives}
//                     onUpdate={updateObjective}
//                     onUpdateOption={updateObjectiveOption}
//                     onRemove={removeObjective}
//                     canRemove={
//                       q.type !== "question" ||
//                       exam.objectives.filter(o => o.type === "question").length > 1
//                     }
//                   />
//                 ))}
//               </div>
//             </section>

//             {/* ── Build Mode: Theory ────────────────────────────────── */}
//             <section className="bg-white rounded-2xl p-5 shadow-sm">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h2 className="font-serif text-xl text-stone-800">Section B — Theory</h2>
//                   <p className="text-xs text-gray-400 mt-0.5">
//                     {exam.theories.length} question{exam.theories.length !== 1 ? "s" : ""}
//                   </p>
//                 </div>
//                 <button
//                   onClick={addTheory}
//                   className="text-xs font-bold px-3 py-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition whitespace-nowrap"
//                 >
//                   + Question
//                 </button>
//               </div>
//               <div className="flex flex-col gap-3">
//                 {exam.theories.map((q, idx) => (
//                   <TheorySectionComponent
//                     key={q.id}
//                     q={q}
//                     idx={idx}
//                     onUpdate={updateTheory}
//                     onRemove={removeTheory}
//                     canRemove={exam.theories.length > 1}
//                   />
//                 ))}
//               </div>
//             </section>
//           </>
//         )}

//         {/* ── Bottom CTA ────────────────────────────────────────────── */}
//         <button
//           onClick={onPreview}
//           className="w-full max-w-sm mx-auto block bg-stone-900 text-stone-100 font-semibold text-base py-4 rounded-2xl hover:bg-stone-800 transition"
//         >
//           Preview Exam Paper →
//         </button>
//       </main>
//     </div>
//   );
// }


// src/components/exam/BuilderLayout.jsx

import { useRef, useState } from "react";
import { inputClass } from "../../constants/Inputclass";
import Field from "./Field";


// ── Paste Mode Image Adder ────────────────────────────────────────────────────
// Teacher picks image + types "after which question" number
function PasteImageAdder({ images, onAdd, onRemove }) {
  const fileRef = useRef();
  const [pendingImage, setPendingImage] = useState(null);
  const [afterQ, setAfterQ] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { setPendingImage(reader.result); setShowForm(true); };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleConfirm = () => {
    if (!pendingImage || !afterQ.trim()) return;
    onAdd({ id: Date.now() + Math.random(), src: pendingImage, afterQuestion: Number(afterQ.trim()) });
    setPendingImage(null);
    setAfterQ("");
    setShowForm(false);
  };

  return (
    <div className="mt-3">
      {/* Existing images */}
      {images && images.length > 0 && (
        <div className="flex flex-col gap-2 mb-3">
          {images.map(img => (
            <div key={img.id} className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl p-2">
              <img src={img.src} alt="" className="w-14 h-14 object-contain rounded-lg border border-stone-200 bg-white shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-stone-600">After Question {img.afterQuestion}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Prints after Q{img.afterQuestion}</p>
              </div>
              <button onClick={() => onRemove(img.id)} className="w-6 h-6 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition text-xs font-bold shrink-0">✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Pending form */}
      {showForm && pendingImage && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-3">
          <img src={pendingImage} alt="preview" className="w-full max-h-40 object-contain rounded-lg mb-3 bg-white border border-blue-100" />
          <p className="text-xs font-semibold text-blue-700 mb-1">After which question should this image appear?</p>
          <input
            className={`${inputClass} mb-2`}
            value={afterQ}
            onChange={e => setAfterQ(e.target.value)}
            placeholder="e.g. 2"
            type="number"
            min="1"
          />
          <div className="flex gap-2">
            <button
              onClick={handleConfirm}
              disabled={!afterQ.trim()}
              className="flex-1 text-xs font-bold py-2 rounded-xl bg-stone-900 text-white disabled:opacity-40 transition"
            >
              ✓ Add after Q{afterQ || "?"}
            </button>
            <button
              onClick={() => { setPendingImage(null); setAfterQ(""); setShowForm(false); }}
              className="text-xs px-4 py-2 rounded-xl border border-stone-200 text-stone-500 hover:bg-stone-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <p className="text-[10px] text-amber-600 bg-amber-50 rounded-lg px-3 py-1.5 mb-2">
        ⚠️ Images are not saved in draft — re-upload if you reload the page.
      </p>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      <button
        onClick={() => fileRef.current.click()}
        className="text-xs font-bold px-3 py-2 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 transition w-full"
      >
        🖼 Add Image
      </button>
    </div>
  );
}

// ── Image Card (Build Mode) ───────────────────────────────────────────────────
// Appears as a card in the objectives/theory list just like HeadingCard or PassageCard
export function ImageCard({ img, onRemove }) {
  return (
    <div className="bg-purple-50/60 border-2 border-dashed border-purple-200 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wide">
          🖼 Image
        </span>
        <button
          onClick={() => onRemove(img.id)}
          className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition text-xs font-bold"
        >✕</button>
      </div>
      <img src={img.src} alt="question diagram" className="w-full max-h-48 object-contain rounded-xl border border-purple-100 bg-white" />
      <p className="text-[10px] text-purple-400 mt-2">This image will print here between questions.</p>
      <p className="text-[10px] text-amber-600 mt-1">⚠️ Not saved in draft — re-upload if you reload.</p>
    </div>
  );
}

// ── Main BuilderLayout ────────────────────────────────────────────────────────
export default function BuilderLayout({
  schoolName,
  schoolMotto,
  schoolAddress,
  classPlaceholder,
  exam,
  hasDraft,
  updateField,
  setInputMode,
  addObjective,
  addSectionHeading,
  addPassage,
  removeObjective,
  updateObjective,
  updateObjectiveOption,
  addTheory,
  removeTheory,
  updateTheory,
  // build mode image cards
  objectiveImageCards,
  theoryImageCards,
  addImageCard,
  removeImageCard,
  // paste mode images
  pasteObjectiveImages,
  pasteTheoryImages,
  addPasteImage,
  removePasteImage,
  ObjectiveSectionComponent,
  TheorySectionComponent,
  onPreview,
  onReset,
}) {
  const objFileRef = useRef();
  const theoryFileRef = useRef();
  const questionCount = exam.objectives.filter(o => o.type === "question").length;
  const isPaste = exam.inputMode === "paste";

  const handleBuildImagePick = (section, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      addImageCard(section, { id: Date.now() + Math.random(), src: reader.result });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-100">

      {/* ── Sticky Header ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-stone-900 text-stone-100 h-14 flex items-center px-4 shadow-lg print:hidden">
        <div className="w-full max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">📝</span>
            <span className="font-serif text-lg tracking-wide">Exam Builder</span>
          </div>
          <div className="flex items-center gap-2">
            {hasDraft && (
              <span className="text-[11px] text-green-400 bg-green-400/10 px-2.5 py-0.5 rounded-full">● Draft saved</span>
            )}
            <button onClick={onReset} className="text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition">Reset</button>
            <button onClick={onPreview} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-900 hover:bg-amber-400 transition">Preview →</button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-2xl mx-auto px-4 py-4 pb-20 flex flex-col gap-4">

        {/* ── School Banner ──────────────────────────────────────────── */}
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 text-center">
          <p className="font-serif text-xl mb-1">{schoolName}</p>
          <p className="text-xs tracking-widest text-amber-300 uppercase mb-1">{schoolMotto}</p>
          <p className="text-xs text-stone-400">{schoolAddress}</p>
        </div>

        {/* ── Exam Details ───────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-serif text-xl mb-4 text-stone-800">Exam Details</h2>
          <div className="grid grid-cols-2 gap-3 mb-3 max-[400px]:grid-cols-1">
            <Field label="Subject" required>
              <input className={inputClass} value={exam.subject} onChange={e => updateField("subject", e.target.value)} placeholder="e.g. Mathematics" />
            </Field>
            <Field label="Class" required>
              <input className={inputClass} value={exam.classLevel} onChange={e => updateField("classLevel", e.target.value)} placeholder={classPlaceholder} />
            </Field>
            <Field label="Term" required>
              <select className={inputClass} value={exam.term} onChange={e => updateField("term", e.target.value)}>
                <option value="">Select term</option>
                <option>First Term</option>
                <option>Second Term</option>
                <option>Third Term</option>
              </select>
            </Field>
            <Field label="Session" required>
              <input className={inputClass} value={exam.session} onChange={e => updateField("session", e.target.value)} placeholder="e.g. 2024/2025" />
            </Field>
            <Field label="Time Allowed" required>
              <input className={inputClass} value={exam.timeAllowed} onChange={e => updateField("timeAllowed", e.target.value)} placeholder="e.g. 2 Hours" />
            </Field>
          </div>
          <Field label="Instructions to Students">
            <textarea className={`${inputClass} resize-y`} value={exam.instructions} onChange={e => updateField("instructions", e.target.value)} rows={2} />
          </Field>
        </section>

        {/* ── Input Mode Toggle ──────────────────────────────────────── */}
        <div className="bg-white rounded-2xl p-2 shadow-sm flex gap-2">
          <button
            onClick={() => setInputMode("build")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${!isPaste ? "bg-stone-900 text-white" : "text-stone-500 hover:bg-stone-50"}`}
          >✏️ Build Mode</button>
          <button
            onClick={() => setInputMode("paste")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${isPaste ? "bg-stone-900 text-white" : "text-stone-500 hover:bg-stone-50"}`}
          >📋 Paste Mode</button>
        </div>

        {isPaste ? (
          <>
            {/* ── Paste Mode ──────────────────────────────────────────── */}
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-serif text-xl mb-1 text-stone-800">Section A — Objectives</h2>
              <p className="text-xs text-gray-400 mb-3">Paste all your objective questions here.</p>
              <textarea
                className={`${inputClass} resize-y w-full`}
                value={exam.pasteObjectives}
                onChange={e => updateField("pasteObjectives", (e.target.value))}
                placeholder={`1. What is 2 + 2?\nA) 1  B) 4  C) 6\n\n2. What is 5 x 3?\nA) 10  B) 15  C) 20`}
                rows={12}
              />
              <PasteImageAdder
                images={pasteObjectiveImages}
                onAdd={(img) => addPasteImage("objective", img)}
                onRemove={(id) => removePasteImage("objective", id)}
              />
            </section>

            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-serif text-xl mb-1 text-stone-800">Section B — Theory</h2>
              <p className="text-xs text-gray-400 mb-3">Paste all your theory questions here.</p>
              <textarea
                className={`${inputClass} resize-y w-full`}
                value={exam.pasteTheory}
                onChange={e => updateField("pasteTheory", e.target.value)}
                placeholder={`1. What is Air? ___\n2. Mention 3 sources of water\n1) __\n2) __\n3) __`}
                rows={10}
              />
              <PasteImageAdder
                images={pasteTheoryImages}
                onAdd={(img) => addPasteImage("theory", img)}
                onRemove={(id) => removePasteImage("theory", id)}
              />
            </section>
          </>
        ) : (
          <>
            {/* ── Build Mode: Objectives ─────────────────────────────── */}
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h2 className="font-serif text-xl text-stone-800">Section A — Objectives</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{questionCount} question{questionCount !== 1 ? "s" : ""}</p>
                </div>
                <div className="flex gap-1.5 shrink-0 flex-wrap justify-end">
                  <button onClick={addSectionHeading} className="text-xs font-bold px-2.5 py-2 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 transition whitespace-nowrap">+ Heading</button>
                  <button onClick={addPassage} className="text-xs font-bold px-2.5 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition whitespace-nowrap">+ Passage</button>
                  <button onClick={addObjective} className="text-xs font-bold px-2.5 py-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition whitespace-nowrap">+ Question</button>
                  {/* Build mode image button */}
                  <input ref={objFileRef} type="file" accept="image/*" className="hidden" onChange={e => handleBuildImagePick("objective", e)} />
                  <button
                    onClick={() => objFileRef.current.click()}
                    className="text-xs font-bold px-2.5 py-2 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition whitespace-nowrap"
                  >🖼 + Image</button>
                </div>
              </div>

              <p className="text-[11px] text-gray-300 mb-4">
                Tip: Add a <span className="font-semibold text-stone-400">Heading</span> → <span className="font-semibold text-blue-400">Passage</span> → <span className="font-semibold text-amber-500">Questions</span>. Use <span className="font-semibold text-purple-500">+ Image</span> to insert a diagram anywhere in the list.
              </p>

              <div className="flex flex-col gap-3">
                {exam.objectives.map((q, idx) => {
                  // Render any image cards that belong to this position
                  const imageCardsHere = (objectiveImageCards || []).filter(img => img.afterIdx === idx);
                  return (
                    <div key={q.id}>
                      <ObjectiveSectionComponent
                        q={q}
                        idx={idx}
                        allItems={exam.objectives}
                        onUpdate={updateObjective}
                        onUpdateOption={updateObjectiveOption}
                        onRemove={removeObjective}
                        canRemove={
                          q.type !== "question" ||
                          exam.objectives.filter(o => o.type === "question").length > 1
                        }
                      />
                      {imageCardsHere.map(img => (
                        <div className="mt-3" key={img.id}>
                          <ImageCard img={img} onRemove={(id) => removeImageCard("objective", id)} />
                        </div>
                      ))}
                    </div>
                  );
                })}
                {/* Images with no afterIdx (added at end) */}
                {(objectiveImageCards || []).filter(img => img.afterIdx === undefined).map(img => (
                  <ImageCard key={img.id} img={img} onRemove={(id) => removeImageCard("objective", id)} />
                ))}
              </div>
            </section>

            {/* ── Build Mode: Theory ────────────────────────────────── */}
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-serif text-xl text-stone-800">Section B — Theory</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{exam.theories.length} question{exam.theories.length !== 1 ? "s" : ""}</p>
                </div>
                <div className="flex gap-1.5 shrink-0 flex-wrap justify-end">
                  <button onClick={addTheory} className="text-xs font-bold px-3 py-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition whitespace-nowrap">+ Question</button>
                  <input ref={theoryFileRef} type="file" accept="image/*" className="hidden" onChange={e => handleBuildImagePick("theory", e)} />
                  <button
                    onClick={() => theoryFileRef.current.click()}
                    className="text-xs font-bold px-2.5 py-2 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition whitespace-nowrap"
                  >🖼 + Image</button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {exam.theories.map((q, idx) => {
                  const imageCardsHere = (theoryImageCards || []).filter(img => img.afterIdx === idx);
                  return (
                    <div key={q.id}>
                      <TheorySectionComponent
                        q={q}
                        idx={idx}
                        onUpdate={updateTheory}
                        onRemove={removeTheory}
                        canRemove={exam.theories.length > 1}
                      />
                      {imageCardsHere.map(img => (
                        <div className="mt-3" key={img.id}>
                          <ImageCard img={img} onRemove={(id) => removeImageCard("theory", id)} />
                        </div>
                      ))}
                    </div>
                  );
                })}
                {(theoryImageCards || []).filter(img => img.afterIdx === undefined).map(img => (
                  <ImageCard key={img.id} img={img} onRemove={(id) => removeImageCard("theory", id)} />
                ))}
              </div>
            </section>
          </>
        )}

        {/* ── Bottom CTA ────────────────────────────────────────────── */}
        <button onClick={onPreview} className="w-full max-w-sm mx-auto block bg-stone-900 text-stone-100 font-semibold text-base py-4 rounded-2xl hover:bg-stone-800 transition">
          Preview Exam Paper →
        </button>
      </main>
    </div>
  );
}
