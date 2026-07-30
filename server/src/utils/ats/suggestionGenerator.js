/**
 * Generates ATS suggestions based on missing skills.
 */

export function generateSkillSuggestions(missingSkills) {
  const suggestions = [];

  if (missingSkills.length === 0) {
    return suggestions;
  }

  suggestions.push(
    "Include more industry-relevant technologies that align with your target job roles."
  );

  if (
    missingSkills.some((skill) =>
      ["Docker", "Kubernetes", "AWS", "Azure", "CI/CD"].includes(skill)
    )
  ) {
    suggestions.push(
      "Add cloud, DevOps, or deployment experience if you have practical exposure."
    );
  }

  if (
    missingSkills.some((skill) =>
      [
        "Operating System",
        "Computer Networks",
        "DBMS",
        "OOP",
        "DSA",
      ].includes(skill)
    )
  ) {
    suggestions.push(
      "Highlight computer science fundamentals through coursework, projects, or achievements."
    );
  }

  if (
    missingSkills.some((skill) =>
      [
        "TensorFlow",
        "PyTorch",
        "OpenCV",
        "Machine Learning",
        "Deep Learning",
        "NLP",
        "Generative AI",
        "LLM",
      ].includes(skill)
    )
  ) {
    suggestions.push(
      "Include AI/ML projects or coursework if you have relevant experience."
    );
  }

  if (
    missingSkills.some((skill) =>
      [
        "React",
        "Node.js",
        "Express.js",
        "REST API",
        "GraphQL",
      ].includes(skill)
    )
  ) {
    suggestions.push(
      "Showcase full-stack development projects using modern web technologies."
    );
  }

  return [...new Set(suggestions)];
}