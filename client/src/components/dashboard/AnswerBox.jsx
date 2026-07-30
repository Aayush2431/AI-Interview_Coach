import { useState } from "react";

const AnswerBox = ({
  onSubmit,
  loading,
  disabled,
}) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    if (!answer.trim()) {
      alert("Please enter your answer before submitting.");
      return;
    }

    onSubmit(answer);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">

      <h3 className="text-xl font-semibold mb-4">
        Your Answer
      </h3>

      <textarea
        rows={8}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={disabled}
        placeholder="Write your answer here..."
        className="w-full border rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />

      <div className="flex justify-between items-center mt-3">

        <span className="text-sm text-gray-500">
          {answer.length} characters
        </span>

        <button
          onClick={handleSubmit}
          disabled={loading || disabled}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading
            ? "🤖 AI is analyzing your answer..."
            : "Submit Answer"}
        </button>

      </div>
    </div>
  );
};

export default AnswerBox;