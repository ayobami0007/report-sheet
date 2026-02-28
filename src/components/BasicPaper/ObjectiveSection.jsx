// src/components/primary/ObjectiveSection.jsx
//
// Primary-specific question card:
//   Builder shows question text + 2x2 options grid.
//   Printed format:
//     1. question text __________
//        A. opt   B. opt   C. opt   D. opt
// HeadingCard and PassageCard imported from shared (DRY).

import { inputClass } from "../../constants/Inputclass";
import { HeadingCard, PassageCard } from "../exam/ObjectiveSharedCards";

const OPTION_LABELS = ["A", "B", "C", "D"];

function QuestionCard({ q, onUpdate, onUpdateOption, onRemove, canRemove, questionNumber }) {
  return (
    <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full tracking-wide">
          Q{questionNumber}
        </span>
        {canRemove && (
          <button
            onClick={() => onRemove(q.id)}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition text-xs font-bold"
          >✕</button>
        )}
      </div>

      {/* Question text */}
      <textarea
        className={`${inputClass} resize-none w-full mb-3`}
        value={q.text}
        onChange={e => onUpdate(q.id, "text", e.target.value)}
        placeholder={`Question ${questionNumber}…`}
        rows={2}
      />

      {/* Inline print preview hint */}
      <p className="text-[10px] text-gray-300 mb-2">
        Prints as:{" "}
        <span className="text-gray-400 font-medium">
          {questionNumber}. {q.text || "question text"} __________
        </span>
      </p>

      {/* Options — 2×2 grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {q.options.map((opt, oi) => (
          <div key={oi} className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-amber-600 w-4 shrink-0">
              {OPTION_LABELS[oi]}.
            </span>
            <input
              className={`${inputClass} py-2 text-sm`}
              value={opt}
              onChange={e => onUpdateOption(q.id, oi, e.target.value)}
              placeholder={`Option ${OPTION_LABELS[oi]}`}
            />
          </div>
        ))}
      </div>

      {/* Answer key */}
      <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-amber-100">
        <span className="text-xs font-semibold text-gray-400">Answer:</span>
        {OPTION_LABELS.map(l => (
          <button
            key={l}
            onClick={() => onUpdate(q.id, "answer", l)}
            className={`w-7 h-7 rounded-lg text-xs font-bold border transition
              ${q.answer === l
                ? "bg-stone-900 text-white border-stone-900"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}
          >{l}</button>
        ))}
        <span className="text-[10px] text-gray-300 ml-1">(not printed)</span>
      </div>
    </div>
  );
}

export default function ObjectiveSection({ q, idx, allItems, onUpdate, onUpdateOption, onRemove, canRemove }) {
  if (q.type === "heading") return <HeadingCard q={q} onUpdate={onUpdate} onRemove={onRemove} />;
  if (q.type === "passage") return <PassageCard q={q} onUpdate={onUpdate} onRemove={onRemove} />;

  const questionNumber = allItems
    .slice(0, idx + 1)
    .filter(item => item.type === "question")
    .length;

  return (
    <QuestionCard
      q={q}
      onUpdate={onUpdate}
      onUpdateOption={onUpdateOption}
      onRemove={onRemove}
      canRemove={canRemove}
      questionNumber={questionNumber}
    />
  );
}
