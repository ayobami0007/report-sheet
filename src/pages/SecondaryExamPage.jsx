// src/pages/SecondaryExamPage.jsx
//
// Secondary school entry point.
// This file only defines config — zero logic lives here.

import SCHOOL from "../constants/School";
import { STORAGE_KEYS } from "../constants/Storage";
import ExamPaperPage from "./ExamPaperPage";
import ObjectiveSectionComponent from "../components/SecondaryPaper/ObjectiveSection";
import TheorySectionComponent from "../components/SecondaryPaper/TheorySection";
import PreviewLayoutComponent from "../components/SecondaryPaper/PreviewLayout";

const SEC_CONFIG = {
  storageKey:           STORAGE_KEYS.secondary,
  schoolName:           SCHOOL.name,
  schoolMotto:          SCHOOL.motto,
  schoolAddress:        SCHOOL.address,
  classPlaceholder:     "e.g. JSS 2A",
  defaultInstructions:  "Answer ALL objective questions.",
  theoryExtraFields:    {},                   // secondary theory has no extra fields
  ObjectiveSectionComponent,
  TheorySectionComponent,
  PreviewLayoutComponent,
};

export default function SecondaryExamPage() {
  return <ExamPaperPage config={SEC_CONFIG} />;
}
