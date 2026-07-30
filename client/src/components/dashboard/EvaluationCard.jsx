const ScoreBar = ({ label, value }) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span className="font-medium text-gray-700">
          {label}
        </span>

        <span className="font-semibold text-blue-600">
          {value}/10
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{
            width: `${value * 10}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

const EvaluationCard = ({
  evaluation,
  onNextQuestion,
  isLastQuestion,
}) => {
  if (!evaluation) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🤖 AI Evaluation
      </h2>

      {/* Overall Score */}

      <div className="text-center mb-8">

        <p className="text-gray-500 text-lg">
          Overall Score
        </p>

        <h1 className="text-6xl font-bold text-blue-600 mt-2">
          {evaluation.overallScore}/10
        </h1>

      </div>

      {/* Individual Scores */}

      <div className="space-y-5">

        <ScoreBar
          label="Technical Accuracy"
          value={evaluation.technicalAccuracy}
        />

        <ScoreBar
          label="Communication"
          value={evaluation.communication}
        />

        <ScoreBar
          label="Confidence"
          value={evaluation.confidence}
        />

        <ScoreBar
          label="Completeness"
          value={evaluation.completeness}
        />

      </div>

      {/* Strengths */}

      <div className="mt-8">

        <h3 className="text-lg font-semibold text-green-700 mb-3">
          ✅ Strengths
        </h3>

        <ul className="list-disc ml-6 space-y-2 text-gray-700">

          {evaluation.strengths?.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}

        </ul>

      </div>

      {/* Improvements */}

      <div className="mt-8">

        <h3 className="text-lg font-semibold text-red-600 mb-3">
          📈 Areas for Improvement
        </h3>

        <ul className="list-disc ml-6 space-y-2 text-gray-700">

          {evaluation.improvements?.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}

        </ul>

      </div>

      {/* Ideal Answer */}

      <div className="mt-8">

        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          💡 Ideal Answer
        </h3>

        <div className="bg-gray-100 rounded-lg p-4 border whitespace-pre-line leading-7">
          {evaluation.idealAnswer}
        </div>

      </div>

      {/* Next Question */}

      <div className="flex justify-end mt-8">

        <button
          onClick={onNextQuestion}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          {isLastQuestion
            ? "Finish Interview"
            : "Next Question"}
        </button>

      </div>

    </div>
  );
};

export default EvaluationCard;