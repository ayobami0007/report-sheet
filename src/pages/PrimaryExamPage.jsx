// src/pages/PrimaryExamPage.jsx
//
// Primary school entry point.
// This file only defines config — zero logic lives here.

import SCHOOL from "../constants/School";
import { STORAGE_KEYS } from "../constants/Storage";
import ExamPaperPage from "./ExamPaperPage";
import ObjectiveSectionComponent from "../components/BasicPaper/ObjectiveSection";
import TheorySectionComponent from "../components/BasicPaper/TheorySection";
import PreviewLayoutComponent from "../components/BasicPaper/PreviewLayout";

const PRIMARY_CONFIG = {
  storageKey:           STORAGE_KEYS.primary,
  schoolName:           SCHOOL.primaryName,
  schoolMotto:          SCHOOL.motto,
  schoolAddress:        SCHOOL.address,
  classPlaceholder:     "e.g. Primary 4A",
  defaultInstructions:  "Answer ALL objective questions.",
  theoryExtraFields:    { blankPosition: "after" },  // primary adds blank toggle
  ObjectiveSectionComponent,
  TheorySectionComponent,
  PreviewLayoutComponent,
};

export default function PrimaryExamPage() {
  return <ExamPaperPage config={PRIMARY_CONFIG} />;
}
