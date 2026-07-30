import { EXPECTED_SKILLS } from "../../config/atsKeywords.js";

/**
 * Calculates ATS score for technical skills.
 */

export function calculateSkillScore(matchedCount) {
  return Math.round(
    (matchedCount / EXPECTED_SKILLS.length) * 30
  );
}

/**
 * Returns percentage of skills covered.
 */

export function calculateCoverage(matchedCount) {
  const percentage = Math.round(
    (matchedCount / EXPECTED_SKILLS.length) * 100
  );

  return {
    matched: matchedCount,
    total: EXPECTED_SKILLS.length,
    percentage,
  };
}