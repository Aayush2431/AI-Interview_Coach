import { EXPECTED_SKILLS } from "../../config/atsKeywords.js";
import { SKILL_ALIASES } from "../skillAliases.js";

/**
 * Detects all expected skills using aliases.
 */

export function detectSkills(resumeText) {
  const matchedSkills = [];
  const missingSkills = [];

  EXPECTED_SKILLS.forEach((skill) => {
    const aliases =
      SKILL_ALIASES[skill.toLowerCase()] || [
        skill.toLowerCase(),
      ];

    const found = aliases.some((alias) =>
      resumeText.includes(alias.toLowerCase())
    );

    if (found) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  return {
    matchedSkills,
    missingSkills,
  };
}