// src/constants/Storage.js
// Shared storage utility for all exam paper pages.
// Pass a unique key per school to avoid draft collisions.

export const STORAGE_KEYS = {
  secondary: "exam_paper_draft_sec_v1",
  primary:   "exam_paper_draft_pri_v1",
};

export function loadDraft(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveDraft(key, state) {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {}
}

export function clearDraft(key) {
  localStorage.removeItem(key);
}
