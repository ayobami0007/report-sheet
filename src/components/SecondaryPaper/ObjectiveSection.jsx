// src/components/secondary/ObjectiveSection.jsx
//
// Secondary-specific question card:
//   - Short options → all on one line: "1. text  (a) opt  (b) opt  (c) opt  (d) opt"
//   - Long options  → question on own line, options in 2-col grid below
// HeadingCard and PassageCard are imported from shared (DRY).

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

      <div className="flex flex-col sm:flex-row sm:gap-3">
        <textarea
          className={`${inputClass} resize-none sm:flex-[2]`}
          value={q.text}
          onChange={e => onUpdate(q.id, "text", e.target.value)}
          placeholder={`Question ${questionNumber}…`}
          rows={3}
        />
        <div className="flex flex-col gap-1.5 mt-2 sm:mt-0 sm:flex-[3]">
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
      </div>

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
