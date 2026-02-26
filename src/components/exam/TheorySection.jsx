// src/components/builder/TheoryCard.jsx

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
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Question text */}
      <textarea
        className={`${inputClass} resize-none`}
        value={q.text}
        onChange={e => onUpdate(q.id, "text", e.target.value)}
        placeholder={`Enter theory question ${idx + 1}…`}
        rows={3}
      />
    </div>
  );
}
