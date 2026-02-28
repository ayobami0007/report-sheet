// // src/pages/ExamPaperPage.jsx

// import { useState, useEffect, useCallback } from "react";
// import { loadDraft, saveDraft, clearDraft } from "../constants/Storage";
// import BuilderLayout from "../components/exam/BuilderLayout";

// // ── Factories ─────────────────────────────────────────────────────────────────
// export const createEmptyObjective = () => ({
//   id: Date.now() + Math.random(),
//   type: "question",
//   text: "",
//   options: ["", "", "", ""],
//   answer: "A",
// });

// export const createSectionHeading = () => ({
//   id: Date.now() + Math.random(),
//   type: "heading",
//   title: "",
//   subtitle: "",
// });

// export const createPassage = () => ({
//   id: Date.now() + Math.random(),
//   type: "passage",
//   title: "",
//   text: "",
// });

// const createEmptyTheory = (extraFields = {}) => ({
//   id: Date.now() + Math.random(),
//   text: "",
//   marks: "",
//   ...extraFields,
// });

// // ── Page ──────────────────────────────────────────────────────────────────────
// export default function ExamPaperPage({ config }) {
//   const {
//     storageKey,
//     schoolName,
//     schoolMotto,
//     schoolAddress,
//     classPlaceholder,
//     defaultInstructions,
//     theoryExtraFields,
//     ObjectiveSectionComponent,
//     TheorySectionComponent,
//     PreviewLayoutComponent,
//   } = config;

//   const INITIAL_STATE = {
//     subject: "",
//     classLevel: "",
//     term: "",
//     session: "",
//     timeAllowed: "",
//     instructions: defaultInstructions,
//     objectives: [createEmptyObjective()],
//     theories: [createEmptyTheory(theoryExtraFields)],
//   };

//   const [exam, setExam] = useState(() => loadDraft(storageKey) || INITIAL_STATE);
//   const [mode, setMode] = useState("builder");
//   const [hasDraft, setHasDraft] = useState(!!loadDraft(storageKey));

//   useEffect(() => {
//     saveDraft(storageKey, exam);
//     setHasDraft(true);
//   }, [exam, storageKey]);

//   const updateField = useCallback((field, value) => {
//     setExam(prev => ({ ...prev, [field]: value }));
//   }, []);

//   // ── Objective handlers ────────────────────────────────────────────────────
//   const addObjective = useCallback(() => {
//     setExam(prev => ({ ...prev, objectives: [...prev.objectives, createEmptyObjective()] }));
//   }, []);

//   const addSectionHeading = useCallback(() => {
//     setExam(prev => ({ ...prev, objectives: [...prev.objectives, createSectionHeading()] }));
//   }, []);

//   const addPassage = useCallback(() => {
//     setExam(prev => ({ ...prev, objectives: [...prev.objectives, createPassage()] }));
//   }, []);

//   const removeObjective = useCallback((id) => {
//     setExam(prev => ({ ...prev, objectives: prev.objectives.filter(q => q.id !== id) }));
//   }, []);

//   const updateObjective = useCallback((id, field, value) => {
//     setExam(prev => ({
//       ...prev,
//       objectives: prev.objectives.map(q => q.id === id ? { ...q, [field]: value } : q),
//     }));
//   }, []);

//   const updateObjectiveOption = useCallback((id, optionIndex, value) => {
//     setExam(prev => ({
//       ...prev,
//       objectives: prev.objectives.map(q => {
//         if (q.id !== id) return q;
//         const options = [...q.options];
//         options[optionIndex] = value;
//         return { ...q, options };
//       }),
//     }));
//   }, []);

//   // ── Theory handlers ───────────────────────────────────────────────────────
//   const addTheory = useCallback(() => {
//     setExam(prev => ({
//       ...prev,
//       theories: [...prev.theories, createEmptyTheory(theoryExtraFields)],
//     }));
//   }, [theoryExtraFields]);

//   const removeTheory = useCallback((id) => {
//     setExam(prev => ({ ...prev, theories: prev.theories.filter(q => q.id !== id) }));
//   }, []);

//   const updateTheory = useCallback((id, field, value) => {
//     setExam(prev => ({
//       ...prev,
//       theories: prev.theories.map(q => q.id === id ? { ...q, [field]: value } : q),
//     }));
//   }, []);

//   // ── Print ─────────────────────────────────────────────────────────────────
//   const handlePrint = useCallback(() => {
//     window.print();
//     setTimeout(() => {
//       clearDraft(storageKey);
//       setHasDraft(false);
//     }, 1000);
//   }, [storageKey]);

//   // ── Reset ─────────────────────────────────────────────────────────────────
//   const handleReset = useCallback(() => {
//     if (window.confirm("Clear all data and start a fresh exam paper?")) {
//       clearDraft(storageKey);
//       setExam(INITIAL_STATE);
//       setMode("builder");
//       setHasDraft(false);
//     }
//   }, [storageKey]);

//   // ── Preview mode ──────────────────────────────────────────────────────────
//   if (mode === "preview") {
//     return (
//       <PreviewLayoutComponent
//         exam={exam}
//         onBack={() => setMode("builder")}
//         onPrint={handlePrint}
//       />
//     );
//   }

//   return (
//     <BuilderLayout
//       schoolName={schoolName}
//       schoolMotto={schoolMotto}
//       schoolAddress={schoolAddress}
//       classPlaceholder={classPlaceholder}
//       exam={exam}
//       hasDraft={hasDraft}
//       updateField={updateField}
//       addObjective={addObjective}
//       addSectionHeading={addSectionHeading}
//       addPassage={addPassage}
//       removeObjective={removeObjective}
//       updateObjective={updateObjective}
//       updateObjectiveOption={updateObjectiveOption}
//       addTheory={addTheory}
//       removeTheory={removeTheory}
//       updateTheory={updateTheory}
//       ObjectiveSectionComponent={ObjectiveSectionComponent}
//       TheorySectionComponent={TheorySectionComponent}
//       onPreview={() => setMode("preview")}
//       onReset={handleReset}
//     />
//   );
// }



// src/pages/ExamPaperPage.jsx

import { useState, useEffect, useCallback, useMemo } from "react";
import { loadDraft, saveDraft, clearDraft } from "../constants/Storage";
import BuilderLayout from "../components/exam/BuilderLayout";

// ── Factories ─────────────────────────────────────────────────────────────────
export const createEmptyObjective = () => ({
  id: Date.now() + Math.random(),
  type: "question",
  text: "",
  options: ["", "", "", ""],
  answer: "A",
});

export const createSectionHeading = () => ({
  id: Date.now() + Math.random(),
  type: "heading",
  title: "",
  subtitle: "",
});

export const createPassage = () => ({
  id: Date.now() + Math.random(),
  type: "passage",
  title: "",
  text: "",
});

const createEmptyTheory = (extraFields = {}) => ({
  id: Date.now() + Math.random(),
  text: "",
  marks: "",
  ...extraFields,
});

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ExamPaperPage({ config }) {
  const {
    storageKey,
    schoolName,
    schoolMotto,
    schoolAddress,
    classPlaceholder,
    defaultInstructions,
    theoryExtraFields,
    ObjectiveSectionComponent,
    TheorySectionComponent,
    PreviewLayoutComponent,
  } = config;

  const INITIAL_STATE = useMemo(() => ({
    subject: "",
    classLevel: "",
    term: "",
    session: "",
    timeAllowed: "",
    instructions: defaultInstructions,
    objectives: [createEmptyObjective()],
    theories: [createEmptyTheory(theoryExtraFields)],
    // paste mode content
    inputMode: "build",           // "build" | "paste"
    pasteObjectives: "",
    pasteTheory: "",
  }), [defaultInstructions, theoryExtraFields]);

  const [exam, setExam] = useState(() => loadDraft(storageKey) || INITIAL_STATE);
  const [mode, setMode] = useState("builder");
  const [hasDraft, setHasDraft] = useState(!!loadDraft(storageKey));

  useEffect(() => {
    saveDraft(storageKey, exam);
    setHasDraft(true);
  }, [exam, storageKey]);

  const updateField = useCallback((field, value) => {
    setExam(prev => ({ ...prev, [field]: value }));
  }, []);

  // ── Input mode toggle ─────────────────────────────────────────────────────
  const setInputMode = useCallback((inputMode) => {
    setExam(prev => ({ ...prev, inputMode }));
  }, []);

  // ── Objective handlers ────────────────────────────────────────────────────
  const addObjective = useCallback(() => {
    setExam(prev => ({ ...prev, objectives: [...prev.objectives, createEmptyObjective()] }));
  }, []);

  const addSectionHeading = useCallback(() => {
    setExam(prev => ({ ...prev, objectives: [...prev.objectives, createSectionHeading()] }));
  }, []);

  const addPassage = useCallback(() => {
    setExam(prev => ({ ...prev, objectives: [...prev.objectives, createPassage()] }));
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
    setExam(prev => ({
      ...prev,
      theories: [...prev.theories, createEmptyTheory(theoryExtraFields)],
    }));
  }, [theoryExtraFields]);

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
      clearDraft(storageKey);
      setHasDraft(false);
    }, 1000);
  }, [storageKey]);

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    if (window.confirm("Clear all data and start a fresh exam paper?")) {
      clearDraft(storageKey);
      setExam(INITIAL_STATE);
      setMode("builder");
      setHasDraft(false);
    }
  }, [storageKey, INITIAL_STATE]);

  // ── Preview mode ──────────────────────────────────────────────────────────
  if (mode === "preview") {
    return (
      <PreviewLayoutComponent
        exam={exam}
        onBack={() => setMode("builder")}
        onPrint={handlePrint}
      />
    );
  }

  return (
    <BuilderLayout
      schoolName={schoolName}
      schoolMotto={schoolMotto}
      schoolAddress={schoolAddress}
      classPlaceholder={classPlaceholder}
      exam={exam}
      hasDraft={hasDraft}
      updateField={updateField}
      setInputMode={setInputMode}
      addObjective={addObjective}
      addSectionHeading={addSectionHeading}
      addPassage={addPassage}
      removeObjective={removeObjective}
      updateObjective={updateObjective}
      updateObjectiveOption={updateObjectiveOption}
      addTheory={addTheory}
      removeTheory={removeTheory}
      updateTheory={updateTheory}
      ObjectiveSectionComponent={ObjectiveSectionComponent}
      TheorySectionComponent={TheorySectionComponent}
      onPreview={() => setMode("preview")}
      onReset={handleReset}
    />
  );
}
