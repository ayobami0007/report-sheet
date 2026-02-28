// src/components/primary/TheorySection.jsx
//
// Primary-specific: teacher toggles blankPosition per question.
//   "before" → blank line prints ABOVE the question text
//   "after"  → blank line prints BELOW the question text

import { inputClass } from "../../constants/Inputclass";

export default function TheorySection({ q, idx, onUpdate, onRemove, canRemove }) {
  return (
    <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full tracking-wide">
          Q{idx + 1}
        </span>
        <div className="flex items-center gap-2">
          <input
            className={`${inputClass} w-20 text-center`}
            value={q.marks}
            onChange={e => onUpdate(q.id, "marks", e.target.value)}
            placeholder="Marks"
            type="number"
            min="1"
          />
          {canRemove && (
            <button
              onClick={() => onRemove(q.id)}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition text-xs font-bold"
            >✕</button>
          )}
        </div>
      </div>

      {/* Question text */}
      <textarea
        className={`${inputClass} resize-none mb-3`}
        value={q.text}
        onChange={e => onUpdate(q.id, "text", e.target.value)}
        placeholder={`Enter theory question ${idx + 1}…`}
        rows={3}
      />

      {/* Blank line position toggle */}
      <div className="flex items-center gap-2 pt-3 border-t border-amber-100">
        <span className="text-xs font-semibold text-gray-400 shrink-0">Answer blank:</span>
        <div className="flex gap-1.5">
          <button
            onClick={() => onUpdate(q.id, "blankPosition", "before")}
            className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition
              ${q.blankPosition === "before"
                ? "bg-stone-900 text-white border-stone-900"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}
          >
            Blank before
          </button>
          <button
            onClick={() => onUpdate(q.id, "blankPosition", "after")}
            className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition
              ${q.blankPosition === "after"
                ? "bg-stone-900 text-white border-stone-900"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}
          >
            Blank after
          </button>
        </div>
        <span className="text-[10px] text-gray-300 ml-1">
          {q.blankPosition === "before" ? "_____ then question" : "question then _____"}
        </span>
      </div>
    </div>
  );
}
