const QuestionCard = ({
  question,
  current,
  total,
}) => {
  const progress = (current / total) * 100;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">
          Interview Question
        </h2>

        <span className="text-sm font-medium text-blue-600">
          Question {current} of {total}
        </span>
      </div>

      {/* Progress Bar */}

      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>

      {/* Question */}

      <div className="bg-gray-50 border rounded-lg p-5">
        <p className="text-lg text-gray-800 leading-8">
          {question}
        </p>
      </div>

    </div>
  );
};

export default QuestionCard;