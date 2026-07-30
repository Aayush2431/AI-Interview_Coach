/**
 * Builds one searchable string from the parsed resume.
 * Every ATS evaluator should use this function.
 */

export function buildResumeText(parsedData, parsedText = "") {
  return (
    JSON.stringify(parsedData) +
    " " +
    parsedText
  ).toLowerCase();
}