// src/pages/ExamPaperPage.jsx
// Single source of truth — all state and business logic lives here.
// Builder and Preview are pure UI components that receive data via props.

import { useState, useEffect, useCallback } from "react";
import { loadDraft, saveDraft, clearDraft } from "../constants/Storage"
import BuilderLayout from "../components/exam/BuilderLayout";
import PreviewLayout from "../components/exam/PreviewLayout";

// ── Factories ─────────────────────────────────────────────────────────────────
const createEmptyObjective = () => ({
  id: Date.now() + Math.random(),
  text: "",
  options: ["", "", "", ""],
  answer: "A",
});

const createEmptyTheory = () => ({
  id: Date.now() + Math.random(),
  text: "",
  marks: "",
});

// ── Default state ─────────────────────────────────────────────────────────────
const INITIAL_STATE = {
  subject: "",
  classLevel: "",
  term: "",
  session: "",
  timeAllowed: "",
  instructions: "Answer ALL objective questions and any THREE theory questions.",
  objectives: [createEmptyObjective()],
  theories: [createEmptyTheory()],
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Exam() {
  const [exam, setExam] = useState(() => loadDraft() || INITIAL_STATE);
  const [mode, setMode] = useState("builder"); // "builder" | "preview"
  const [hasDraft, setHasDraft] = useState(!!loadDraft());

  // Auto-save on every exam change
  useEffect(() => {
    saveDraft(exam);
    setHasDraft(true);
  }, [exam]);

  // ── Field updater ─────────────────────────────────────────────────────────
  const updateField = useCallback((field, value) => {
    setExam(prev => ({ ...prev, [field]: value }));
  }, []);

  // ── Objective handlers ────────────────────────────────────────────────────
  const addObjective = useCallback(() => {
    setExam(prev => ({ ...prev, objectives: [...prev.objectives, createEmptyObjective()] }));
  }, []);

  const removeObjective = useCallback((id) => {
    setExam(prev => ({ ...prev, objectives: prev.objectives.filter(q => q.id !== id) }));
  }, []);

  const updateObjective = useCallback((id, field, value) => {
    setExam(prev => ({
      ...prev,
      objectives: prev.objectives.map(q => q.id === id ? { ...q, [field]: value } : q),
    }));
  }, []);

  const updateObjectiveOption = useCallback((id, optionIndex, value) => {
    setExam(prev => ({
      ...prev,
      objectives: prev.objectives.map(q => {
        if (q.id !== id) return q;
        const options = [...q.options];
        options[optionIndex] = value;
        return { ...q, options };
      }),
    }));
  }, []);

  // ── Theory handlers ───────────────────────────────────────────────────────
  const addTheory = useCallback(() => {
    setExam(prev => ({ ...prev, theories: [...prev.theories, createEmptyTheory()] }));
  }, []);

  const removeTheory = useCallback((id) => {
    setExam(prev => ({ ...prev, theories: prev.theories.filter(q => q.id !== id) }));
  }, []);

  const updateTheory = useCallback((id, field, value) => {
    setExam(prev => ({
      ...prev,
      theories: prev.theories.map(q => q.id === id ? { ...q, [field]: value } : q),
    }));
  }, []);

  // ── Print ─────────────────────────────────────────────────────────────────
  const handlePrint = useCallback(() => {
    window.print();
    setTimeout(() => {
      clearDraft();
      setHasDraft(false);
    }, 1000);
  }, []);

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    if (window.confirm("Clear all data and start a fresh exam paper?")) {
      clearDraft();
      setExam(INITIAL_STATE);
      setMode("builder");
      setHasDraft(false);
    }
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  if (mode === "preview") {
    return (
      <PreviewLayout
        exam={exam}
        onBack={() => setMode("builder")}
        onPrint={handlePrint}
      />
    );
  }

  return (
    <BuilderLayout
      exam={exam}
      hasDraft={hasDraft}
      updateField={updateField}
      addObjective={addObjective}
      removeObjective={removeObjective}
      updateObjective={updateObjective}
      updateObjectiveOption={updateObjectiveOption}
      addTheory={addTheory}
      removeTheory={removeTheory}
      updateTheory={updateTheory}
      onPreview={() => setMode("preview")}
      onReset={handleReset}
    />
  );
}
