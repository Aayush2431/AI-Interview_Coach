import { useEffect, useState } from "react";
import atsService from "../../services/atsService";

const ATSReportCard = ({ resumeId }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!resumeId) return;

    const fetchATSReport = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await atsService.getATSReport(resumeId);

        setReport(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch ATS report."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchATSReport();
  }, [resumeId]);

  return (
    <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">

      <h2 className="text-2xl font-bold text-white mb-6">
        ATS Analysis
      </h2>

      {!resumeId && (
        <p className="text-gray-400">
          Upload a resume to view your ATS report.
        </p>
      )}

      {loading && (
        <p className="text-blue-400">
          Generating ATS Report...
        </p>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-red-300">
          {error}
        </div>
      )}

      {report && (
        <>
          <div className="mb-6">
            <h3 className="text-5xl font-bold text-blue-400">
              {report.score}%
            </h3>

            <p className="text-gray-400">
              ATS Compatibility Score
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              Strengths
            </h3>

            <ul className="space-y-2">
              {report.strengths.map((item, index) => (
                <li key={index} className="text-white">
                  ✅ {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-red-400 mb-3">
              Missing Keywords
            </h3>

            <ul className="space-y-2">
              {report.missingKeywords.map((item, index) => (
                <li key={index} className="text-white">
                  ❌ {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">
              Suggestions
            </h3>

            <ul className="space-y-2">
              {report.suggestions.map((item, index) => (
                <li key={index} className="text-white">
                  💡 {item}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ATSReportCard;