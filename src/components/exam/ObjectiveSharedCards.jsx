// src/components/shared/ObjectiveSharedCards.jsx
//
// HeadingCard and PassageCard are 100% identical between primary and secondary.
// Extracted here so both ObjectiveSection files import from one place (DRY).

import { inputClass } from "../../constants/Inputclass";

// ── Heading Card ──────────────────────────────────────────────────────────────
export function HeadingCard({ q, onUpdate, onRemove }) {
  return (
    <div className="bg-stone-100 border-2 border-dashed border-stone-300 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-stone-500 bg-stone-200 px-3 py-1 rounded-full uppercase tracking-wide">
          Section Heading
        </span>
        <button
          onClick={() => onRemove(q.id)}
          className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition text-xs font-bold"
        >✕</button>
      </div>
      <div className="flex flex-col gap-2">
        <input
          className={inputClass}
          value={q.title}
          onChange={e => onUpdate(q.id, "title", e.target.value)}
          placeholder="Heading title — e.g. Comprehension"
        />
        <input
          className={inputClass}
          value={q.subtitle}
          onChange={e => onUpdate(q.id, "subtitle", e.target.value)}
          placeholder="Subtitle — e.g. Read the following passage carefully and answer questions 1–5."
        />
      </div>
    </div>
  );
}

// ── Passage Card ──────────────────────────────────────────────────────────────
export function PassageCard({ q, onUpdate, onRemove }) {
  return (
    <div className="bg-blue-50/60 border-2 border-dashed border-blue-200 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wide">
          📄 Passage
        </span>
        <button
          onClick={() => onRemove(q.id)}
          className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition text-xs font-bold"
        >✕</button>
      </div>
      <div className="flex flex-col gap-2">
        <input
          className={inputClass}
          value={q.title}
          onChange={e => onUpdate(q.id, "title", e.target.value)}
          placeholder="Passage title (optional) — e.g. THE NEW PUPIL"
        />
        <textarea
          className={`${inputClass} resize-y`}
          value={q.text}
          onChange={e => onUpdate(q.id, "text", e.target.value)}
          placeholder="Paste or type the full passage text here…"
          rows={5}
        />
      </div>
      <p className="text-[11px] text-blue-400 mt-2">
        This passage will print above the questions that follow it.
      </p>
    </div>
  );
}
