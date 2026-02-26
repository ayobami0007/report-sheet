// src/components/builder/ObjectiveCard.jsx

import { inputClass } from "../../constants/Inputclass";

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function ObjectiveSection({ q, idx, onUpdate, onUpdateOption, onRemove, canRemove }) {
  return (
    <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full tracking-wide">
          Q{idx + 1}
        </span>
        {canRemove && (
          <button
            onClick={() => onRemove(q.id)}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition text-xs font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {/* Question text */}
      <textarea
        className={`${inputClass} mb-3 resize-none`}
        value={q.text}
        onChange={e => onUpdate(q.id, "text", e.target.value)}
        placeholder={`Enter question ${idx + 1}…`}
        rows={2}
      />

      {/* Options A – D */}
      <div className="flex flex-col gap-2 mb-3">
        {q.options.map((opt, oi) => (
          <div key={oi} className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-600 w-5 shrink-0">
              {OPTION_LABELS[oi]}.
            </span>
            <input
              className={inputClass}
              value={opt}
              onChange={e => onUpdateOption(q.id, oi, e.target.value)}
              placeholder={`Option ${OPTION_LABELS[oi]}`}
            />
          </div>
        ))}
      </div>

      {/* Correct answer selector */}
      <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-amber-100">
        <span className="text-xs font-semibold text-gray-400">Answer:</span>
        {OPTION_LABELS.map(l => (
          <button
            key={l}
            onClick={() => onUpdate(q.id, "answer", l)}
            className={`w-8 h-8 rounded-lg text-xs font-bold border transition
              ${q.answer === l
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}
          >
            {l}
          </button>
        ))}
        <span className="text-[10px] text-gray-300 ml-1">(not shown on paper)</span>
      </div>
    </div>
  );
}
