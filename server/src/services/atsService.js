import { EXPECTED_SKILLS } from "../config/atsKeywords.js";

/**
 * Generates complete ATS report
 */
export const generateATSReport = async (parsedData) => {
  const report = {
    score: 0,
    strengths: [],
    weakSections: [],
    missingKeywords: [],
    suggestions: []
  };

  const evaluators = [
    evaluateContact,
    evaluateSkills,
    evaluateProjects,
    evaluateExperience,
    evaluateEducation,
    evaluateCompleteness
  ];

  evaluators.forEach((evaluator) => {
    const result = evaluator(parsedData);

    report.score += result.score;

    report.strengths.push(...result.strengths);
    report.weakSections.push(...result.weakSections);
    report.missingKeywords.push(...result.missingKeywords);
    report.suggestions.push(...result.suggestions);
  });

  report.score = Math.min(report.score, 100);

  report.strengths = [...new Set(report.strengths)];
  report.weakSections = [...new Set(report.weakSections)];
  report.missingKeywords = [...new Set(report.missingKeywords)];
  report.suggestions = [...new Set(report.suggestions)];

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
    suggestions
  };
}

/**
 * SKILLS
 * Weight = 30
 */
function evaluateSkills(parsedData) {
  const strengths = [];
  const weakSections = [];
  const suggestions = [];

  const resumeSkills = (parsedData.skills || []).map((skill) =>
    skill.toLowerCase().trim()
  );

  const matchedSkills = EXPECTED_SKILLS.filter((skill) =>
    resumeSkills.includes(skill.toLowerCase())
  );

  const missingKeywords = EXPECTED_SKILLS.filter(
    (skill) => !resumeSkills.includes(skill.toLowerCase())
  );

  const score = Math.round(
    (matchedSkills.length / EXPECTED_SKILLS.length) * 30
  );

  if (matchedSkills.length >= 8) {
    strengths.push("Strong Technical Skills");
  } else {
    weakSections.push("Technical Skills");
    suggestions.push(
      "Include more relevant technical skills for software engineering roles."
    );
  }

  return {
    score,
    strengths,
    weakSections,
    missingKeywords,
    suggestions
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

  const count = parsedData.projects?.length || 0;

  if (count >= 3) score = 20;
  else if (count === 2) score = 15;
  else if (count === 1) score = 10;

  if (count >= 2) {
    strengths.push("Strong Project Portfolio");
  } else {
    weakSections.push("Projects");
    suggestions.push(
      "Add more real-world projects demonstrating your skills."
    );
  }

  return {
    score,
    strengths,
    weakSections,
    missingKeywords: [],
    suggestions
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

  const count = parsedData.experience?.length || 0;

  if (count >= 2) score = 20;
  else if (count === 1) score = 10;

  if (count > 0) {
    strengths.push("Industry Experience");
  } else {
    weakSections.push("Experience");
    suggestions.push(
      "Gain internship, freelance, or open-source experience."
    );
  }

  return {
    score,
    strengths,
    weakSections,
    missingKeywords: [],
    suggestions
  };
}

/**
 * EDUCATION
 * Weight = 10
 */
function evaluateEducation(parsedData) {
  const strengths = [];
  const weakSections = [];
  const suggestions = [];

  let score = 0;

  if (parsedData.education?.length > 0) {
    score = 10;
    strengths.push("Educational Qualification Present");
  } else {
    weakSections.push("Education");
    suggestions.push(
      "Include your educational qualifications."
    );
  }

  return {
    score,
    strengths,
    weakSections,
    missingKeywords: [],
    suggestions
  };
}

/**
 * COMPLETENESS
 * Weight = 10
 */
function evaluateCompleteness(parsedData) {
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
    parsedData.experience?.length
  ];

  const completedSections = sections.filter(Boolean).length;

  const score = Math.round(
    (completedSections / sections.length) * 10
  );

  if (score >= 8) {
    strengths.push("Well Structured Resume");
  } else {
    weakSections.push("Resume Completeness");
    suggestions.push(
      "Complete all major sections of your resume."
    );
  }

  return {
    score,
    strengths,
    weakSections,
    missingKeywords: [],
    suggestions
  };
}