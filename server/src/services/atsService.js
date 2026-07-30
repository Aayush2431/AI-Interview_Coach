import {
  buildResumeText,
} from "../utils/ats/resumeNormalizer.js";

import {
  detectSkills,
} from "../utils/ats/skillDetector.js";

import {
  calculateSkillScore,
  calculateCoverage,
} from "../utils/ats/scoreCalculator.js";

import {
  generateSkillSuggestions,
} from "../utils/ats/suggestionGenerator.js";

/**
 * Generates complete ATS report
 */

export const generateATSReport = async (
  parsedData,
  parsedText = ""
) => {
  const report = {
    score: 0,
    strengths: [],
    weakSections: [],
    missingKeywords: [],
    suggestions: [],
    coverage: {},
  };

  const resumeText = buildResumeText(
    parsedData,
    parsedText
  );

  const evaluators = [
    evaluateContact,
    evaluateSkills,
    evaluateProjects,
    evaluateExperience,
    evaluateEducation,
    evaluateCompleteness,
  ];

  evaluators.forEach((evaluator) => {
    const result = evaluator(
      parsedData,
      resumeText
    );

    report.score += result.score;

    report.strengths.push(
      ...result.strengths
    );

    report.weakSections.push(
      ...result.weakSections
    );

    report.missingKeywords.push(
      ...result.missingKeywords
    );

    report.suggestions.push(
      ...result.suggestions
    );

    if (result.coverage) {
      report.coverage = result.coverage;
    }
  });

  report.score = Math.min(report.score, 100);

  report.strengths = [...new Set(report.strengths)];

  report.weakSections = [
    ...new Set(report.weakSections),
  ];

  report.missingKeywords = [
    ...new Set(report.missingKeywords),
  ];

  report.suggestions = [
    ...new Set(report.suggestions),
  ];

  return report;
};

/**
 * CONTACT INFORMATION
 * Weight = 10
 */

function evaluateContact(parsedData) {
  let score = 0;

  const strengths = [];
  const weakSections = [];
  const suggestions = [];

  if (parsedData.name) score += 3;
  if (parsedData.email) score += 3;
  if (parsedData.phone) score += 4;

  if (score === 10) {
    strengths.push("Complete Contact Information");
  } else {
    weakSections.push("Contact Information");

    if (!parsedData.name)
      suggestions.push("Add your full name.");

    if (!parsedData.email)
      suggestions.push("Add a professional email.");

    if (!parsedData.phone)
      suggestions.push("Add your phone number.");
  }

  return {
    score,
    strengths,
    weakSections,
    missingKeywords: [],
    suggestions,
  };
}

/**
 * SKILLS
 * Weight = 30
 */

function evaluateSkills(
  parsedData,
  resumeText
) {
  const strengths = [];
  const weakSections = [];

  const {
    matchedSkills,
    missingSkills,
  } = detectSkills(resumeText);

  const score =
    calculateSkillScore(
      matchedSkills.length
    );

  const coverage =
    calculateCoverage(
      matchedSkills.length
    );

  if (
    coverage.percentage >= 60
  ) {
    strengths.push(
      "Strong Technical Skill Set"
    );
  } else if (
    coverage.percentage >= 35
  ) {
    strengths.push(
      "Good Technical Skill Coverage"
    );
  } else {
    weakSections.push(
      "Technical Skills"
    );
  }

  return {
    score,
    strengths,
    weakSections,
    missingKeywords: missingSkills,
    suggestions:
      generateSkillSuggestions(
        missingSkills
      ),
    coverage,
  };
}

/**
 * PROJECTS
 * Weight = 20
 */

function evaluateProjects(parsedData) {
  let score = 0;

  const strengths = [];
  const weakSections = [];
  const suggestions = [];

  const count =
    parsedData.projects?.length || 0;

  if (count >= 3)
    score = 20;
  else if (count === 2)
    score = 15;
  else if (count === 1)
    score = 10;

  if (count >= 2) {
    strengths.push(
      "Strong Project Portfolio"
    );
  } else {
    weakSections.push(
      "Projects"
    );

    suggestions.push(
      "Add more real-world projects demonstrating your skills."
    );
  }

  return {
    score,
    strengths,
    weakSections,
    missingKeywords: [],
    suggestions,
  };
}

/**
 * EXPERIENCE
 * Weight = 20
 */

function evaluateExperience(parsedData) {
  let score = 0;

  const strengths = [];
  const weakSections = [];
  const suggestions = [];

  const count =
    parsedData.experience?.length || 0;

  if (count >= 2)
    score = 20;
  else if (count === 1)
    score = 10;

  if (count > 0) {
    strengths.push(
      "Industry Experience"
    );
  } else {
    weakSections.push(
      "Experience"
    );

    suggestions.push(
      "Gain internship, freelance, or open-source experience."
    );
  }

  return {
    score,
    strengths,
    weakSections,
    missingKeywords: [],
    suggestions,
  };
}

/**
 * EDUCATION
 * Weight = 10
 */

function evaluateEducation(parsedData) {
  let score = 0;

  const strengths = [];
  const weakSections = [];
  const suggestions = [];

  if (
    parsedData.education?.length > 0
  ) {
    score = 10;

    strengths.push(
      "Educational Qualification Present"
    );
  } else {
    weakSections.push(
      "Education"
    );

    suggestions.push(
      "Include your educational qualifications."
    );
  }

  return {
    score,
    strengths,
    weakSections,
    missingKeywords: [],
    suggestions,
  };
}

/**
 * COMPLETENESS
 * Weight = 10
 */

function evaluateCompleteness(
  parsedData
) {
  const strengths = [];
  const weakSections = [];
  const suggestions = [];

  const sections = [
    parsedData.name,
    parsedData.email,
    parsedData.phone,
    parsedData.skills?.length,
    parsedData.projects?.length,
    parsedData.education?.length,
    parsedData.experience?.length,
  ];

  const completed =
    sections.filter(Boolean)
      .length;

  const score = Math.round(
    (completed /
      sections.length) *
      10
  );

  if (score >= 8) {
    strengths.push(
      "Well Structured Resume"
    );
  } else {
    weakSections.push(
      "Resume Completeness"
    );

    suggestions.push(
      "Complete all major sections of your resume."
    );
  }

  return {
    score,
    strengths,
    weakSections,
    missingKeywords: [],
    suggestions,
  };
}