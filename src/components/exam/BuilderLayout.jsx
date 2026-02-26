// src/components/builder/BuilderLayout.jsx
// Pure UI. All state and handlers come from ExamPaperPage via props.

import SCHOOL from "../../constants/School";
import { inputClass } from "../../constants/Inputclass";
import Field from "./Field"
import TheorySection from "./TheorySection"
import ObjectiveSection from "./ObjectiveSection"


export default function BuilderLayout({
  exam,
  hasDraft,
  updateField,
  addObjective,
  removeObjective,
  updateObjective,
  updateObjectiveOption,
  addTheory,
  removeTheory,
  updateTheory,
  onPreview,
  onReset,
}) {
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
              <span className="text-[11px] text-green-400 bg-green-400/10 px-2.5 py-0.5 rounded-full">
                ● Draft saved
              </span>
            )}
            <button
              onClick={onReset}
              className="text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition"
            >
              Reset
            </button>
            <button
              onClick={onPreview}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-900 hover:bg-amber-400 transition"
            >
              Preview →
            </button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-2xl mx-auto px-4 py-4 pb-20 flex flex-col gap-4">

        {/* ── School Banner (read-only) ──────────────────────────────── */}
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 text-center">
          <p className="font-serif text-xl mb-1">{SCHOOL.name}</p>
          <p className="text-xs tracking-widest text-amber-300 uppercase mb-1">{SCHOOL.motto}</p>
          <p className="text-xs text-stone-400">{SCHOOL.address}</p>
        </div>

        {/* ── Exam Details ──────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-serif text-xl mb-4 text-stone-800">Exam Details</h2>
          <div className="grid grid-cols-2 gap-3 mb-3 max-[400px]:grid-cols-1">
            <Field label="Subject" required>
              <input
                className={inputClass}
                value={exam.subject}
                onChange={e => updateField("subject", e.target.value)}
                placeholder="e.g. Mathematics"
              />
            </Field>
            <Field label="Class" required>
              <input
                className={inputClass}
                value={exam.classLevel}
                onChange={e => updateField("classLevel", e.target.value)}
                placeholder="e.g. JSS 2A"
              />
            </Field>
            <Field label="Term" required>
              <select
                className={inputClass}
                value={exam.term}
                onChange={e => updateField("term", e.target.value)}
              >
                <option value="">Select term</option>
                <option>First Term</option>
                <option>Second Term</option>
                <option>Third Term</option>
              </select>
            </Field>
            <Field label="Session" required>
              <input
                className={inputClass}
                value={exam.session}
                onChange={e => updateField("session", e.target.value)}
                placeholder="e.g. 2024/2025"
              />
            </Field>
            <Field label="Time Allowed" required>
              <input
                className={inputClass}
                value={exam.timeAllowed}
                onChange={e => updateField("timeAllowed", e.target.value)}
                placeholder="e.g. 2 Hours"
              />
            </Field>
          </div>
          <Field label="Instructions to Students">
            <textarea
              className={`${inputClass} resize-y`}
              value={exam.instructions}
              onChange={e => updateField("instructions", e.target.value)}
              rows={2}
            />
          </Field>
        </section>

        {/* ── Section A: Objectives ──────────────────────────────────── */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-serif text-xl text-stone-800">Section A — Objectives</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {exam.objectives.length} question{exam.objectives.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={addObjective}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition whitespace-nowrap"
            >
              + Add
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {exam.objectives.map((q, idx) => (
              <ObjectiveSection
                key={q.id}
                q={q}
                idx={idx}
                onUpdate={updateObjective}
                onUpdateOption={updateObjectiveOption}
                onRemove={removeObjective}
                canRemove={exam.objectives.length > 1}
              />
            ))}
          </div>
        </section>

        {/* ── Section B: Theory ─────────────────────────────────────── */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-serif text-xl text-stone-800">Section B — Theory</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {exam.theories.length} question{exam.theories.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={addTheory}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition whitespace-nowrap"
            >
              + Add
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {exam.theories.map((q, idx) => (
              <TheorySection
                key={q.id}
                q={q}
                idx={idx}
                onUpdate={updateTheory}
                onRemove={removeTheory}
                canRemove={exam.theories.length > 1}
              />
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ────────────────────────────────────────────── */}
        <button
          onClick={onPreview}
          className="w-full max-w-sm mx-auto block bg-stone-900 text-stone-100 font-semibold text-base py-4 rounded-2xl hover:bg-stone-800 transition"
        >
          Preview Exam Paper →
        </button>
      </main>
    </div>
  );
}
