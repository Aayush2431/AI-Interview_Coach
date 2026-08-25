import { useEffect, useState } from "react";
import atsService from "../../services/atsService";

const ATSReportCard = ({ resumeId, onGenerateInterview }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Get score interpretation
   */
  const getScoreInfo = (score) => {
    if (score >= 85) {
      return {
        label: "Excellent ATS Score",
        description:
          "Your resume is highly optimized for ATS systems.",
      };
    }

    if (score >= 70) {
      return {
        label: "Good ATS Score",
        description:
          "Your resume has good ATS compatibility but still has room for improvement.",
      };
    }

    if (score >= 50) {
      return {
        label: "Average ATS Score",
        description:
          "Your resume needs some improvements to perform better in ATS screening.",
      };
    }

    return {
      label: "Needs Improvement",
      description:
        "Your resume needs significant improvements for better ATS compatibility.",
    };
  };

  /**
   * Fetch ATS report whenever resumeId changes
   */
  useEffect(() => {
    if (!resumeId) {
      setReport(null);
      setError("");
      return;
    }

    const fetchATSReport = async () => {
      try {
        setLoading(true);
        setError("");
        setReport(null);

        const response = await atsService.getATSReport(resumeId);

        setReport(response.data);
      } catch (error) {
        console.error("ATS Report Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to generate ATS report."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchATSReport();
  }, [resumeId]);

  /**
   * No resume uploaded
   */
  if (!resumeId) {
    return (
      <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-3xl">
            📊
          </div>

          <h2 className="text-2xl font-bold text-white">
            ATS Analysis
          </h2>
        </div>

        <p className="text-gray-400">
          Upload your resume to generate an ATS compatibility
          report.
        </p>
      </div>
    );
  }

  /**
   * Loading state
   */
  if (loading) {
    return (
      <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">
            📊
          </div>

          <h2 className="text-2xl font-bold text-white">
            ATS Analysis
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center py-10">

          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-5" />

          <p className="text-white font-semibold">
            Analyzing your resume...
          </p>

          <p className="text-gray-400 text-sm mt-2">
            Our ATS engine is evaluating your resume.
          </p>

        </div>
      </div>
    );
  }

  /**
   * Error state
   */
  if (error) {
    return (
      <div className="bg-slate-800 rounded-3xl p-8 border border-red-500/50 shadow-xl">

        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">
            ⚠️
          </div>

          <h2 className="text-2xl font-bold text-white">
            ATS Analysis
          </h2>
        </div>

        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-300">
            {error}
          </p>
        </div>

      </div>
    );
  }

  /**
   * No report available
   */
  if (!report) {
    return null;
  }

  const scoreInfo = getScoreInfo(report.score);

  return (
    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl">

      {/* --------------------------------------------- */}
      {/* Header */}
      {/* --------------------------------------------- */}

      <div className="flex items-center gap-3 mb-8">

        <div className="text-3xl">
          📊
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            ATS Analysis
          </h2>

          <p className="text-gray-400 text-sm">
            Resume compatibility analysis
          </p>
        </div>

      </div>


      {/* --------------------------------------------- */}
      {/* Score Section */}
      {/* --------------------------------------------- */}

      <div className="flex flex-col items-center justify-center py-6">

        <div className="w-44 h-44 rounded-full border-8 border-blue-500 flex flex-col items-center justify-center">

          <span className="text-5xl font-extrabold text-white">
            {report.score}
          </span>

          <span className="text-gray-400 text-sm">
            out of 100
          </span>

        </div>

        <h3 className="text-2xl font-bold text-white mt-6 text-center">
          {scoreInfo.label}
        </h3>

        <p className="text-gray-400 text-center max-w-xl mt-2">
          {scoreInfo.description}
        </p>

      </div>


      {/* --------------------------------------------- */}
      {/* Strengths + Weak Sections */}
      {/* --------------------------------------------- */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        {/* Strengths */}

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">

          <h3 className="text-xl font-bold text-green-400 mb-4">
            ✓ Strengths
          </h3>

          {report.strengths?.length > 0 ? (

            <div className="space-y-3">

              {report.strengths.map((strength, index) => (
                <div
                  key={index}
                  className="bg-green-500/10 border border-green-500/20 rounded-xl p-4"
                >
                  <p className="text-green-300">
                    {strength}
                  </p>
                </div>
              ))}

            </div>

          ) : (

            <p className="text-gray-400">
              No major strengths detected.
            </p>

          )}

        </div>


        {/* Weak Sections */}

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">

          <h3 className="text-xl font-bold text-yellow-400 mb-4">
            ⚠ Weak Sections
          </h3>

          {report.weakSections?.length > 0 ? (

            <div className="space-y-3">

              {report.weakSections.map((section, index) => (
                <div
                  key={index}
                  className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4"
                >
                  <p className="text-yellow-300">
                    {section}
                  </p>
                </div>
              ))}

            </div>

          ) : (

            <p className="text-gray-400">
              No weak sections detected.
            </p>

          )}

        </div>

      </div>


      {/* --------------------------------------------- */}
      {/* Missing Keywords */}
      {/* --------------------------------------------- */}

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 mt-6">

        <h3 className="text-xl font-bold text-red-400 mb-4">
          Missing Keywords
        </h3>

        {report.missingKeywords?.length > 0 ? (

          <div className="flex flex-wrap gap-3">

            {report.missingKeywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg text-sm"
              >
                {keyword}
              </span>
            ))}

          </div>

        ) : (

          <p className="text-green-400">
            ✓ No major missing keywords detected.
          </p>

        )}

      </div>


      {/* --------------------------------------------- */}
      {/* Suggestions */}
      {/* --------------------------------------------- */}

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 mt-6">

        <h3 className="text-xl font-bold text-blue-400 mb-4">
          💡 Suggestions
        </h3>

        {report.suggestions?.length > 0 ? (

          <div className="space-y-3">

            {report.suggestions.map((suggestion, index) => (

              <div
                key={index}
                className="flex gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4"
              >

                <div className="w-7 h-7 min-w-[28px] rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>

                <p className="text-gray-300">
                  {suggestion}
                </p>

              </div>

            ))}

          </div>

        ) : (

          <p className="text-green-400">
            ✓ Your resume looks good. No major suggestions.
          </p>

        )}

      </div>


      {/* --------------------------------------------- */}
      {/* Interview CTA */}
      {/* --------------------------------------------- */}

      <div className="mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6">

        <div className="flex flex-col md:flex-row items-center justify-between gap-5">

          <div>

            <h3 className="text-xl font-bold text-white">
              Ready to practice?
            </h3>

            <p className="text-gray-400 mt-1">
              Generate a personalized AI interview based on your resume.
            </p>

          </div>

          <button
            onClick={onGenerateInterview}
            disabled={!onGenerateInterview}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition whitespace-nowrap"
          >
            Generate Interview
          </button>

        </div>

      </div>

    </div>
  );
};

export default ATSReportCard;