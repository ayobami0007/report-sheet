    // src/constants/storage.js

const STORAGE_KEY = "exam_paper_draft_v1";

export function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveDraft(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function clearDraft() {
  localStorage.removeItem(STORAGE_KEY);
}
