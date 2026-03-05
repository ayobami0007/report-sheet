// src/utils/formatPaste.js
//
// Formats pasted question text so that options A) B) C) D)
// are joined onto a single line instead of separate lines.
//
// Input:
//   1. Is 4 an even number?
//   A) Even
//   B) Odd
//   C) Even & Odd
//
// Output:
//   1. Is 4 an even number?
//   A) Even   B) Odd   C) Even & Odd

const OPTION_LINE_REGEX = /^(\(?\s*[A-Da-d]\s*[\).]\s*).+/;

export function formatPastedQuestions(raw) {
  if (!raw || !raw.trim()) return raw;

  const lines = raw.split("\n");
  const result = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (OPTION_LINE_REGEX.test(trimmed)) {
      const optionLines = [];
      while (i < lines.length && OPTION_LINE_REGEX.test(lines[i].trim())) {
        optionLines.push(lines[i].trim());
        i++;
      }
      // ✅ Join options onto the previous question line
      if (result.length > 0) {
        result[result.length - 1] = result[result.length - 1] + "   " + optionLines.join("   ");
      } else {
        result.push(optionLines.join("   "));
      }
    } else {
      result.push(line);
      i++;
    }
  }

  return result.join("\n");
}


// Add this at the bottom of your existing formatPaste.js
export function formatPastedQuestionsPrimary(raw) {
  if (!raw || !raw.trim()) return raw;

  const lines = raw.split("\n");
  const result = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (OPTION_LINE_REGEX.test(trimmed)) {
      const optionLines = [];
      while (i < lines.length && OPTION_LINE_REGEX.test(lines[i].trim())) {
        optionLines.push(lines[i].trim());
        i++;
      }
      result.push(optionLines.join("   "));
    } else {
      result.push(line);
      i++;
    }
  }

  return result.join("\n");
}